# 個人網站 — 架構說明

簡潔、Apple 官網風格的個人學術／研究網站。**目前只有架構與版位，內容為佔位文字。**

---

## 一、檔案結構

```
/
├── index.html          首頁：Hero 大圖（螢幕上方 1/2）+ 三個入口
├── about.html          About Me：可滾動的簡歷（左側黏性資訊卡 + 右側時間軸）
├── academics.html      學術成果：Google Scholar 風格論文列表
├── insights.html       投資研究：卡片式文章列表 + 分類篩選
├── article.html        閱讀頁模板（論文與文章共用，靠 URL 參數決定讀取哪一篇）
│
└── assets/
    ├── css/style.css   全站樣式與設計系統（CSS 變數集中在檔案頂部）
    ├── js/content.js   ★ 全站內容資料來源 —— 只需要改這一個檔案
    ├── js/app.js       渲染邏輯與滾動動效
    └── img/
        ├── hero.jpg    首頁大圖
        └── avatar.jpg  學術頁頭像
```

---

## 二、頁面流程

```
           ┌──────────────────────────┐
           │  index.html              │
           │  ┌────────────────────┐  │
           │  │  Hero 圖片 50vh    │  │  ← 佔螢幕上方二分之一
           │  └────────────────────┘  │
           │  ABOUT ME   ACADEMICS …  │  ← 三個入口卡片
           └───────┬──────────┬───────┘
                   │          │
     ┌─────────────┘          └──────────────┐
     ▼                                       ▼
  about.html                          academics.html / insights.html
  （簡歷，可滾動）                      （列表）
                                              │ 點標題
                                              ▼
                              article.html?type=pub&id=pub-1     ← 論文全文
                              article.html?type=post&id=post-1   ← 文章全文
```

閱讀頁是**同一個模板**，靠 query string 決定內容：

| 參數 | 說明 | 範例 |
|---|---|---|
| `type` | `pub` = 學術論文、`post` = Insights 文章 | `type=pub` |
| `id` | 對應 `content.js` 裡的 `id` 欄位 | `id=pub-1` |

---

## 三、如何填內容（唯一需要動的檔案）

打開 `assets/js/content.js`，裡面對應五個區塊：

| 區塊 | 對應頁面 | 說明 |
|---|---|---|
| `profile` | 全站 | 名字、職稱、單位、Email、頭像、外部連結 |
| `entries` | 首頁 | 三個入口卡片的名稱與描述 |
| `about` | about.html | `intro` 自我介紹、`facts` 側欄、`sections` 時間軸 |
| `scholar` + `publications` | academics.html | 引用統計、研究興趣、論文列表 |
| `insights` | insights.html | 投資研究文章列表 |

### 新增一篇論文

在 `publications` 陣列裡加一個物件：

```js
{
  id: "pub-4",                       // 唯一，用來產生網址
  year: "2026",
  title: "論文標題",
  authors: ["Your Name", "合作者"],   // 你的名字會自動加粗
  venue: "Journal Name",
  type: "Journal Article",           // Journal Article / Working Paper / Conference
  citedBy: 0,
  tags: ["Asset Pricing"],
  pdf: "assets/pdf/pub-4.pdf",       // 可留空
  link: "https://…",                 // 可留空
  abstract: "摘要文字。",
  body: [                            // 全文區塊，留空陣列則顯示「內容待上傳」
    { h: "第一節", p: ["段落一。", "段落二。"] },
    { h: "第二節", p: ["段落…"], ul: ["要點一", "要點二"], quote: "引言" }
  ]
}
```

`body` 每個區塊支援：`h`（小標題）、`p`（段落陣列）、`ul`（要點陣列）、`quote`（引言）。

### 新增一篇文章

在 `insights` 陣列裡加一個物件，欄位為 `id / date / category / title / excerpt / readTime / body`，`body` 格式與論文相同。分類會自動出現在篩選列。

---

## 四、設計規範

| 項目 | 設定 |
|---|---|
| 英文 | Times New Roman，基準 **12pt** |
| 繁體中文 | 宋體（Songti TC）系，行高 1.8、字距略寬 |
| 主色 | 白 `#ffffff`、淺灰底 `#f5f5f7`、文字 `#1d1d1f`、連結 `#0066cc` |
| 圓角 | 18px（卡片）、10px（小元件） |
| 動效曲線 | `cubic-bezier(0.16, 1, 0.3, 1)`（Apple 常用） |
| 導航 | 48px 高、毛玻璃 `backdrop-filter: blur(20px)` |

所有顏色、字級、間距都定義在 `style.css` 最上方的 `:root`，改一處即全站生效。

### 已內建的滾動動畫

- **Hero 視差** — 首頁大圖隨滾動緩慢位移
- **入場浮現** — 元素進入視窗時淡入上移（`.reveal`）
- **逐項浮現** — 列表項目依序出現（`.stagger`）
- **閱讀進度條** — 子頁頂端細藍線
- **卡片抬升** — hover 時上移 6px + 陰影加深
- **Hero 縮放** — 首頁圖片載入時緩慢放大（Ken Burns）

若要關閉動效，使用者系統開啟「減少動態效果」時會自動停用。

---

## 五、本地預覽

```bash
cd 專案目錄
python3 -m http.server 8899
# 瀏覽 http://127.0.0.1:8899
```

直接雙擊 `index.html` 也能開，但 `article.html` 的 query string 在 `file://` 下同樣可用，所以兩者皆可。

---

## 六、待辦（內容上傳時）

- [ ] 補上 `index.html` 頁腳與各頁的 Email
- [ ] 補上 `profile.links` 的 Google Scholar / SSRN / LinkedIn 網址
- [ ] 上傳 CV PDF 至 `assets/cv.pdf`，並把導航列四個頁面的 `href="#"` 的 CV 連結改成該路徑
- [ ] 在 `content.js` 填入真實的簡歷、論文與文章
- [ ] 若要放論文 PDF，建立 `assets/pdf/` 目錄
