#!/usr/bin/env python3
"""
把當前 git 倉庫的內容整批推送到 GitHub（走 GitHub REST API，不需要 git push）。

用途：某些網路環境無法連線 github.com，但仍可連線 api.github.com，
      此時用官方 REST API 直接建立 commit 即可完成部署。

用法：
    export GH_TOKEN=ghp_xxxxxxxxxxxx      # 需要 repo 權限（Public repo 需 Contents: Read and write）
    python3 tools/deploy_github.py

    # 首次部署時順便開啟 GitHub Pages：
    python3 tools/deploy_github.py --enable-pages
"""

import base64
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request

OWNER = "yd2064750-del"
REPO = "laitungyuen"
BRANCH = "main"
API = "https://api.github.com"


def api(method, path, payload=None):
    """呼叫 GitHub API，回傳 (status, json)。"""
    token = os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if not token:
        sys.exit("錯誤：請先設定環境變數 GH_TOKEN")

    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(API + path, data=data, method=method)
    req.add_header("Authorization", "Bearer " + token)
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    req.add_header("User-Agent", "deploy-script")
    if data:
        req.add_header("Content-Type", "application/json")

    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            raw = resp.read().decode()
            return resp.status, (json.loads(raw) if raw.strip() else {})
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode()
        try:
            return exc.code, json.loads(raw)
        except json.JSONDecodeError:
            return exc.code, {"message": raw}


def git_files():
    """列出 git 追蹤的所有檔案。"""
    out = subprocess.check_output(["git", "ls-files"], text=True)
    return [line for line in out.splitlines() if line.strip()]


def main():
    enable_pages = "--enable-pages" in sys.argv

    files = git_files()
    if not files:
        sys.exit("錯誤：git 倉庫裡沒有檔案")

    print(f"準備推送 {len(files)} 個檔案到 {OWNER}/{REPO} …")

    # 1. 建立 blob
    tree_entries = []
    for path in files:
        with open(path, "rb") as fh:
            content = base64.b64encode(fh.read()).decode()
        status, res = api("POST", f"/repos/{OWNER}/{REPO}/git/blobs",
                          {"content": content, "encoding": "base64"})
        if status != 201:
            sys.exit(f"建立 blob 失敗（{path}）：{status} {res.get('message')}")
        tree_entries.append({
            "path": path,
            "mode": "100644",
            "type": "blob",
            "sha": res["sha"],
        })
        print(f"  ✓ {path}")

    # 2. 建立 tree（沿用現有 tree 作為基底，避免刪掉其他分支內容）
    status, ref = api("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/{BRANCH}")
    parents = []
    if status == 200:
        parents = [ref["object"]["sha"]]

    payload = {"tree": tree_entries}
    status, tree = api("POST", f"/repos/{OWNER}/{REPO}/git/trees", payload)
    if status != 201:
        sys.exit(f"建立 tree 失敗：{status} {tree.get('message')}")

    # 3. 建立 commit
    message = subprocess.check_output(
        ["git", "log", "-1", "--pretty=%s"], text=True).strip() or "Update site"
    status, commit = api("POST", f"/repos/{OWNER}/{REPO}/git/commits", {
        "message": message,
        "tree": tree["sha"],
        "parents": parents,
    })
    if status != 201:
        sys.exit(f"建立 commit 失敗：{status} {commit.get('message')}")
    print(f"  ✓ commit {commit['sha'][:7]} — {message}")

    # 4. 更新（或建立）分支 ref
    if parents:
        status, res = api("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/{BRANCH}",
                          {"sha": commit["sha"], "force": False})
    else:
        status, res = api("POST", f"/repos/{OWNER}/{REPO}/git/refs",
                          {"ref": f"refs/heads/{BRANCH}", "sha": commit["sha"]})
    if status not in (200, 201):
        sys.exit(f"更新分支失敗：{status} {res.get('message')}")
    print(f"  ✓ {BRANCH} → {commit['sha'][:7]}")

    # 5. 開啟 GitHub Pages
    if enable_pages:
        status, res = api("POST", f"/repos/{OWNER}/{REPO}/pages",
                          {"source": {"branch": BRANCH, "path": "/"}})
        if status in (200, 201):
            print(f"  ✓ GitHub Pages 已開啟：{res.get('html_url')}")
        elif status == 409:
            print("  · GitHub Pages 本來就已開啟")
        else:
            print(f"  ! 開啟 Pages 失敗：{status} {res.get('message')}")
            print("    可手動到 Settings → Pages → Source 選 main / (root)")

    print(f"\n完成。倉庫：https://github.com/{OWNER}/{REPO}")
    print(f"網站（Pages 生效後約 1 分鐘）：https://{OWNER}.github.io/{REPO}/")


if __name__ == "__main__":
    main()
