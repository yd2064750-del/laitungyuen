/* ==========================================================================
   app.js — 渲染 + 互動
   依賴 content.js（window.SITE）
   ========================================================================== */

(function () {
  "use strict";

  const SITE = window.SITE || {};
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- 工具 ---------- */

  // 轉義，用於標題等純文字欄位
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  // 雙語取值：{en, zh} → 依語系取字串。zh 為繁體。
  const t = (v, lang) => {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return (lang === "en" ? (v.en || v.zh) : (v.zh || v.en)) || "";
  };

  const initials = (name) => String(name || "")
    .split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();

  const authorLine = (authors, self) => (authors || []).map(a =>
    a === self ? `<strong>${esc(a)}</strong>` : esc(a)
  ).join(", ");

  const arrowSvg = `<svg viewBox="0 0 12 12" width="12" height="12" fill="none" aria-hidden="true">
      <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="currentColor" stroke-width="1.3"
        stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const backSvg = `<svg viewBox="0 0 12 12" fill="none" width="12" height="12" aria-hidden="true">
      <path d="M10 6H2M5.5 2.5 2 6l3.5 3.5" stroke="currentColor" stroke-width="1.3"
        stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  /* ---------- 全站共用外框（名稱、標題、頁腳） ---------- */

  function initChrome() {
    const p = SITE.profile || {};
    const name = t(p.name, "en");

    // 導航品牌（content.js 的 profile.navBrand，留空則用姓名）
    const brand = p.navBrand || name;
    $$("[data-nav-brand]").forEach(el => { el.textContent = brand; });

    // 頁腳姓名
    $$("[data-footer-name]").forEach(el => { el.textContent = name; });

    // 年份
    $$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

    // Email 連結
    $$("[data-email]").forEach(el => {
      el.textContent = p.email || "";
      el.href = "mailto:" + (p.email || "");
    });

    // 首頁大圖文字
    const heroName = $("[data-hero-name]");
    if (heroName) heroName.textContent = name;
    const heroRole = $("[data-hero-role]");
    if (heroRole) {
      const r = t(p.role, "zh");
      const rEn = t(p.role, "en");
      heroRole.textContent = rEn && r ? `${rEn} · ${r}` : (rEn || r);
      if (!heroRole.textContent) heroRole.remove();
    }

    // 分頁標題：<body data-page="About Me">
    if (document.body.hasAttribute("data-page")) {
      const page = document.body.getAttribute("data-page");
      document.title = page ? `${page} — ${name}` : `${name} — Personal Site`;
    }
  }

  /* ---------- 導航 ---------- */

  function initNav() {
    const nav = $(".nav");
    if (!nav) return;

    // 品牌名由 initChrome 統一處理（見 profile.navBrand）

    // 滾動狀態
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // 行動版選單
    const toggle = $(".nav__toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      $$(".nav__link", nav).forEach(a =>
        a.addEventListener("click", () => {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        })
      );
    }

    // 目前頁面高亮
    const page = (location.pathname.split("/").pop() || "index.html");
    $$(".nav__link").forEach(a => {
      const href = (a.getAttribute("href") || "").split("#")[0];
      if (href && href === page) a.classList.add("is-active");
    });
  }

  /* ---------- 滾動入場動畫 ---------- */

  function initReveal() {
    const targets = $$(".reveal, .stagger");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    targets.forEach(el => io.observe(el));
  }

  /* ---------- 首頁 Hero 視差 ---------- */

  function initParallax() {
    const media = $(".hero__media");
    if (!media) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (y < window.innerHeight) media.style.transform = `translate3d(0, ${y * 0.28}px, 0)`;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ---------- 閱讀進度條 ---------- */

  function initProgress() {
    const bar = $(".progress");
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      ticking = false;
    };
    update();
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------- 首頁資訊流（學術論文 + 投資研究，新的排前面） ---------- */

  function renderHomeFeed() {
    const el = $("[data-home-feed]");
    if (!el) return;

    const items = [];

    (SITE.publications || []).forEach(p => {
      items.push({
        type: "pub",
        id: p.id,
        sort: (p.year || "0000") + "-00-00",
        dateLabel: p.year || "",
        kind: p.type || "Publication",
        title: p.title,
        desc: p.abstract || ""
      });
    });

    (SITE.insights || []).forEach(p => {
      items.push({
        type: "post",
        id: p.id,
        sort: p.date || "0000-00-00",
        dateLabel: p.date || "",
        kind: p.category || "Insight",
        title: p.title,
        desc: p.excerpt || ""
      });
    });

    // 越新發布的排越上面
    items.sort((a, b) => String(b.sort).localeCompare(String(a.sort)));

    if (!items.length) {
      el.innerHTML = `<div class="empty">尚無內容。</div>`;
      return;
    }

    el.innerHTML = items.map((it, i) => `
      <a class="post reveal" href="article.html?type=${it.type}&id=${encodeURIComponent(it.id)}" data-delay="${i % 3}">
        <div class="post__meta">
          ${it.dateLabel ? `<span>${esc(it.dateLabel)}</span><span>·</span>` : ""}
          <span>${esc(it.kind)}</span>
        </div>
        <h3 class="post__title">${esc(it.title)}</h3>
        ${it.desc ? `<p class="post__excerpt">${esc(it.desc)}</p>` : ""}
        <div class="post__more">閱讀全文 ${arrowSvg}</div>
      </a>`).join("");
  }

  /* ---------- 關於我：簡歷 ---------- */

  function renderAbout() {
    const a = SITE.about;
    if (!a) return;

    // 側欄
    const side = $("[data-about-facts]");
    if (side) {
      side.innerHTML = (a.facts || []).map(f => `
        <dt>${esc(f.label)}</dt>
        <dd>${f.href ? `<a href="${esc(f.href)}">${esc(f.value)}</a>` : esc(f.value)}</dd>
      `).join("");
    }

    // 自我介紹（支援多段落：intro.en / intro.zh 可以是字串或字串陣列）
    const intro = $("[data-about-intro]");
    if (intro && a.intro) {
      const toArr = (v) => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
      const zh = toArr(a.intro.zh);
      const en = toArr(a.intro.en);
      const paras = zh.length ? zh : en;
      intro.innerHTML = paras.map(p => `<p>${esc(p)}</p>`).join("");
    }

    // 時間軸（about.sections 為空時整塊隱藏）
    const main = $("[data-about-sections]");
    if (!main) return;
    const wrap = $("[data-about-sections-wrap]") || main;
    const secs = a.sections || [];
    if (!secs.length) { wrap.hidden = true; return; }
    wrap.hidden = false;
    main.innerHTML = secs.map(sec => `
      <section class="section--tight reveal">
        <h2 style="font-size:var(--fs-xl);margin-bottom:1.75rem">
          ${esc(t(sec.title, "en"))}
          <span class="tc" style="display:block;font-size:var(--fs-sm);color:var(--text-2);letter-spacing:.12em;margin-top:.4rem">
            ${esc(t(sec.title, "zh"))}
          </span>
        </h2>
        <div class="timeline stagger">
          ${(sec.items || []).map(it => `
            <article class="tl-item">
              ${it.period ? `<div class="tl-item__period">${esc(it.period)}</div>` : ""}
              <h3 class="tl-item__title">${esc(t(it.title, "en"))}</h3>
              ${t(it.sub, "en") ? `<div class="tl-item__sub">${esc(t(it.sub, "en"))}</div>` : ""}
              ${t(it.desc, "zh") ? `<p class="tl-item__desc">${esc(t(it.desc, "zh"))}</p>` : ""}
              ${(it.bullets && it.bullets.length) ? `<ul>${it.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
            </article>`).join("")}
        </div>
      </section>`).join("");
  }

  /* ---------- 學術成果 ---------- */

  function renderAcademics() {
    const list = $("[data-pubs]");
    if (!list || !SITE.publications) return;

    // 側欄卡片
    const card = $("[data-scholar-card]");
    if (card) {
      const p = SITE.profile;
      const acadName = t(p.nameAcademic || p.name, "en");
      card.innerHTML = `
        <img class="scholar__avatar" src="${esc(p.avatar)}" alt="${esc(acadName)}">
        <div class="scholar__name">${esc(acadName)}</div>
        <div class="scholar__affil">${esc(t(p.affiliation, "en"))}</div>
        <div class="scholar__links">
          ${(p.links || []).map(l => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join("")}
        </div>`;
    }

    // 依年份分組
    const byYear = {};
    SITE.publications.forEach(p => {
      const y = p.year || "—";
      (byYear[y] = byYear[y] || []).push(p);
    });

    const self = t(SITE.profile.name, "en");
    let html = "";
    Object.keys(byYear).sort((a, b) => b.localeCompare(a)).forEach(year => {
      html += `<div class="year-divider">${esc(year)}</div>`;
      byYear[year].forEach(p => {
        const href = `article.html?type=pub&id=${encodeURIComponent(p.id)}`;
        html += `
          <article class="pub reveal">
            <a class="pub__title" href="${href}">${esc(p.title)}</a>
            <div class="pub__authors">${authorLine(p.authors, self)}</div>
            <div class="pub__venue">${esc(p.venue || "")}${p.venue && p.year ? ", " : ""}${esc(p.year || "")}</div>
            <div class="pub__meta">
              ${p.type ? `<span>${esc(p.type)}</span><span class="sep">·</span>` : ""}
              <span>Cited by ${esc(p.citedBy || 0)}</span>
            </div>
            ${(p.tags && p.tags.length) ? `<div class="pub__tags tags">${p.tags.map(x => `<span class="tag">${esc(x)}</span>`).join("")}</div>` : ""}
            <div class="pub__actions">
              <a href="${href}">Read ${arrowSvg}</a>
              ${p.pdf ? `<a href="${esc(p.pdf)}" target="_blank" rel="noopener">PDF</a>` : ""}
              ${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">Link</a>` : ""}
            </div>
          </article>`;
      });
    });
    list.innerHTML = html;
  }

  /* ---------- Insights ---------- */

  // 取一篇文章的標籤（沒有 tags 就退回 category）
  const itemTags = (p) => (p.tags && p.tags.length) ? p.tags : (p.category ? [p.category] : []);

  // 統計所有標籤出現的文章數，多的排前面
  function tagCounts() {
    const map = new Map();
    (SITE.insights || []).forEach(p => {
      new Set(itemTags(p)).forEach(t => map.set(t, (map.get(t) || 0) + 1));
    });
    return Array.from(map, ([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }

  function renderInsights() {
    const list = $("[data-posts]");
    if (!list || !SITE.insights) return;

    const bar = $("[data-tagbar]");
    const TOP_N = 5;               // 預設最多顯示 5 個標籤
    const tags = tagCounts();
    const maxCount = tags.length ? tags[0].count : 1;

    let active = null;             // 目前選取的標籤
    let panelOpen = false;         // 是否展開「全部標籤」
    let query = "";                // 標籤搜尋字串

    const searchSvg = `<svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="4.6" stroke="currentColor" stroke-width="1.4"/>
        <path d="M10.6 10.6 14 14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>`;

    /* --- 文章列表（新的排前面） --- */
    const ordered = [...SITE.insights]
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

    const drawPosts = () => {
      const items = ordered.filter(p => !active || itemTags(p).includes(active));
      if (!items.length) {
        list.innerHTML = `<div class="empty">這個標籤底下還沒有文章。</div>`;
        initReveal();
        return;
      }
      list.innerHTML = items.map((p, i) => `
        <a class="post reveal" href="article.html?type=post&id=${encodeURIComponent(p.id)}" data-delay="${i % 3}">
          <div class="post__meta">
            ${p.category ? `<span>${esc(p.category)}</span>` : ""}
            ${p.date ? `<span>·</span><span>${esc(p.date)}</span>` : ""}
          </div>
          <h3 class="post__title">${esc(p.title)}</h3>
          <p class="post__excerpt">${esc(p.excerpt || "")}</p>
          <div class="post__more">閱讀全文 ${arrowSvg}</div>
        </a>`).join("");
      initReveal();
    };

    /* --- 標籤列 --- */
    const drawTags = () => {
      if (!bar) return;

      const shown = tags.slice(0, TOP_N);
      const matched = query
        ? tags.filter(t => t.name.toLowerCase().includes(query.toLowerCase()))
        : tags;

      bar.innerHTML = `
        <div class="tagbar__row">
          ${shown.map(t => `
            <button class="tagpill${active === t.name ? " is-active" : ""}" data-tag="${esc(t.name)}">
              ${esc(t.name)}<span class="tagpill__n">${t.count}</span>
            </button>`).join("")}
          <button class="tagbar__search${panelOpen ? " is-active" : ""}" data-toggle
                  aria-expanded="${panelOpen}" title="搜尋標籤" aria-label="搜尋標籤">${searchSvg}</button>
        </div>
        <div class="tagpanel" ${panelOpen ? "" : "hidden"}>
          <input class="tagpanel__input" type="search" placeholder="搜尋標籤…"
                 value="${esc(query)}" aria-label="搜尋標籤">
          <div class="tagpanel__cloud">
            ${matched.length ? matched.map(t => {
              const scale = 0.92 + 0.38 * (t.count / maxCount);
              return `<button class="tagpill tagpill--cloud${active === t.name ? " is-active" : ""}"
                        data-tag="${esc(t.name)}" style="font-size:${scale.toFixed(2)}rem">
                        ${esc(t.name)}<span class="tagpill__n">${t.count}</span>
                      </button>`;
            }).join("") : `<p class="tagpanel__empty">沒有符合「${esc(query)}」的標籤。</p>`}
          </div>
          <p class="tagpanel__hint">標籤依文章數量排序，字越大表示文章越多。</p>
        </div>`;

      // 游標停在搜尋框時不要因為重繪而失焦
      if (panelOpen && query) {
        const input = $(".tagpanel__input", bar);
        if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
      }
    };

    const redraw = () => { drawTags(); drawPosts(); };

    if (bar) {
      bar.addEventListener("click", (e) => {
        const toggle = e.target.closest("[data-toggle]");
        if (toggle) { panelOpen = !panelOpen; drawTags(); return; }

        const pill = e.target.closest("[data-tag]");
        if (pill) {
          const name = pill.dataset.tag;
          active = (active === name) ? null : name;   // 再點一次取消篩選
          redraw();
        }
      });

      bar.addEventListener("input", (e) => {
        if (!e.target.classList.contains("tagpanel__input")) return;
        query = e.target.value;
        drawTags();
      });
    }

    redraw();
  }

  /* ---------- 點擊量記錄（後台統計用） ---------- */

  function recordView(kind, id) {
    const tr = SITE.tracking;
    if (!tr || !tr.enabled || !tr.endpoint) return;
    const url = `${tr.endpoint}/hit/${encodeURIComponent(tr.namespace)}/${encodeURIComponent(kind + "-" + id)}`;
    // 用 1×1 圖片送出，不阻塞頁面、不受 CORS 限制
    const img = new Image();
    img.src = url;
  }

  /* ---------- 後台統計（stats.html） ---------- */

  function renderStats() {
    const root = $("[data-stats]");
    if (!root) return;

    const tr = SITE.tracking || {};
    const gate = $("[data-stats-gate]");
    const body = $("[data-stats-body]");
    const form = $("[data-stats-form]");
    const err  = $("[data-stats-error]");

    const items = [
      ...(SITE.insights || []).map(p => ({
        kind: "post", id: p.id, group: "Insights", title: p.title, date: p.date || ""
      })),
      ...(SITE.publications || []).map(p => ({
        kind: "pub", id: p.id, group: "Academics", title: p.title, date: p.year || ""
      }))
    ];

    const readCount = async (key) => {
      try {
        const r = await fetch(`${tr.endpoint}/get/${encodeURIComponent(tr.namespace)}/${encodeURIComponent(key)}`);
        if (!r.ok) return 0;                       // 還沒有紀錄的項目會 404
        const j = await r.json();
        return Number(j.value) || 0;
      } catch (e) {
        return 0;
      }
    };

    const load = async () => {
      const table = $("[data-stats-table]");
      table.innerHTML = `<p class="muted small">讀取中…</p>`;

      const rows = await Promise.all(items.map(async it => ({
        ...it, count: await readCount(`${it.kind}-${it.id}`)
      })));
      rows.sort((a, b) => b.count - a.count);

      const total = rows.reduce((s, r) => s + r.count, 0);
      const sum = (g) => rows.filter(r => r.group === g).reduce((s, r) => s + r.count, 0);

      $("[data-stats-summary]").innerHTML = `
        <div class="statbox"><span class="statbox__n">${total}</span><span class="statbox__l">總點擊</span></div>
        <div class="statbox"><span class="statbox__n">${sum("Insights")}</span><span class="statbox__l">Insights</span></div>
        <div class="statbox"><span class="statbox__n">${sum("Academics")}</span><span class="statbox__l">Academics</span></div>`;

      table.innerHTML = rows.map(r => `
        <tr>
          <td class="stats-tb__n">${r.count}</td>
          <td>
            <span class="stats-tb__group">${esc(r.group)}</span>
            <a href="article.html?type=${r.kind}&id=${encodeURIComponent(r.id)}">${esc(r.title)}</a>
            ${r.date ? `<span class="stats-tb__date">${esc(r.date)}</span>` : ""}
          </td>
        </tr>`).join("");
    };

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const val = ($(".stats-gate__input", form) || {}).value || "";
        if (val === tr.statsKey) {
          try { sessionStorage.setItem("stats-unlocked", "1"); } catch (e2) {}
          gate.hidden = true;
          body.hidden = false;
          load();
        } else if (err) {
          err.textContent = "密碼不正確。";
        }
      });
    }

    let unlocked = false;
    try { unlocked = sessionStorage.getItem("stats-unlocked") === "1"; } catch (e) {}
    if (unlocked) { gate.hidden = true; body.hidden = false; load(); }
  }

  /* ---------- 閱讀頁（論文 / 文章共用） ---------- */

  function renderArticle() {
    const root = $("[data-article]");
    if (!root) return;

    const q = new URLSearchParams(location.search);
    const type = q.get("type") || "post";
    const id = q.get("id");
    const isPub = type === "pub";

    const src = isPub ? (SITE.publications || []) : (SITE.insights || []);
    const idx = src.findIndex(x => x.id === id);
    const item = idx >= 0 ? src[idx] : null;

    // 返回連結
    const back = $("[data-article-back]");
    if (back) {
      back.href = isPub ? "academics.html" : "insights.html";
      back.innerHTML = `${backSvg} ${isPub ? "返回學術成果 / Back to Academics" : "返回投資研究 / Back to Insights"}`;
    }

    if (!item) {
      root.innerHTML = `<div class="placeholder">找不到這篇內容。請確認連結是否正確。</div>`;
      document.title = "Not found";
      return;
    }

    document.title = `${item.title} — ${t(SITE.profile.name, "en")}`;

    // 記錄這次點擊（站長可在 stats.html 看到）
    recordView(isPub ? "pub" : "post", item.id);

    /* --- 頁首 --- */
    const self = t(SITE.profile.name, "en");
    const metaBits = isPub
      ? [authorLine(item.authors || [], self), item.venue, item.year].filter(Boolean)
      : [item.category, item.date, item.readTime].filter(Boolean);

    const head = $("[data-article-head]");
    if (head) {
      head.innerHTML = `
        <h1 class="reader__title">${esc(item.title)}</h1>
        <div class="reader__byline">
          ${metaBits.map((m, i) =>
            `${i ? `<span class="dot">·</span>` : ""}<span>${isPub && i === 0 ? m : esc(m)}</span>`
          ).join("")}
        </div>
        ${(item.tags && item.tags.length) ? `<div class="tags" style="margin-top:1rem">${item.tags.map(x => `<span class="tag">${esc(x)}</span>`).join("")}</div>` : ""}
        ${isPub ? `<div class="pub__actions" style="margin-top:1.25rem">
            ${item.pdf ? `<a href="${esc(item.pdf)}" target="_blank" rel="noopener">PDF</a>` : ""}
            ${item.link ? `<a href="${esc(item.link)}" target="_blank" rel="noopener">External Link</a>` : ""}
            ${item.citedBy != null ? `<span class="muted small">Cited by ${esc(item.citedBy)}</span>` : ""}
          </div>` : ""}`;
    }

    /* --- 內文 --- */
    const body = $("[data-article-body]");
    if (body) {
      let html = "";

      if (isPub && item.abstract) {
        html += `<h2>Abstract</h2><blockquote>${esc(item.abstract)}</blockquote>`;
      }

      const blocks = item.body || [];
      if (blocks.length) {
        html += blocks.map(b => {
          const h = b.h ? `<h2>${esc(b.h)}</h2>` : "";
          const paras = (b.p || []).map(p => `<p>${p}</p>`).join("");
          const list = (b.ul && b.ul.length) ? `<ul>${b.ul.map(li => `<li>${li}</li>`).join("")}</ul>` : "";
          const quote = b.quote ? `<blockquote>${b.quote}</blockquote>` : "";
          return h + paras + list + quote;
        }).join("");
      } else {
        // 有摘要但還沒有全文時，仍提示正文待上傳
        html += `<div class="placeholder">
          正文尚未上傳。<br>
          Open <code>assets/js/content.js</code> and fill in the <code>body</code> array of
          <code>${esc(item.id)}</code>.
        </div>`;
      }

      body.innerHTML = html;
    }

    /* --- 上一篇 / 下一篇 --- */
    const pager = $("[data-article-pager]");
    if (pager && idx >= 0) {
      const prev = src[idx - 1], next = src[idx + 1];
      const make = (it, dir) => it
        ? `<a class="pager__${dir}" href="article.html?type=${type}&id=${encodeURIComponent(it.id)}">
             <span class="pager__dir">${dir === "prev" ? "Previous" : "Next"}</span>${esc(it.title)}</a>`
        : `<span></span>`;
      pager.innerHTML = make(prev, "prev") + make(next, "next");
    }
  }

  /* ---------- 啟動 ---------- */

  document.addEventListener("DOMContentLoaded", () => {
    initChrome();
    initNav();
    renderHomeFeed();
    renderAbout();
    renderAcademics();
    renderInsights();
    renderArticle();
    renderStats();
    initReveal();
    initParallax();
    initProgress();
  });
})();
