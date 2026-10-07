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

    // 導航品牌
    $$("[data-nav-brand]").forEach(el => { el.textContent = name; });

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

    // 品牌名
    const brand = $("[data-nav-brand]");
    if (brand && SITE.profile) brand.textContent = t(SITE.profile.name, "en");

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

  /* ---------- 首頁：三入口 ---------- */

  function renderEntries() {
    const grid = $("[data-entries]");
    if (!grid || !SITE.entries) return;
    grid.innerHTML = SITE.entries.map((e, i) => `
      <a class="entry reveal" href="${esc(e.href)}" data-delay="${i}">
        <div>
          <div class="entry__en">${esc(e.en)}</div>
          <div class="entry__tc">${esc(e.tc || "")}</div>
          <p class="entry__desc">${esc(e.desc || e.descEn || "")}</p>
        </div>
        <span class="entry__arrow">進入 ${arrowSvg}</span>
      </a>`).join("");
  }

  /* ---------- 關於我：簡歷 ---------- */

  function renderAbout() {
    const root = $("[data-about]");
    if (!root || !SITE.about) return;
    const a = SITE.about;

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

    // 時間軸
    const main = $("[data-about-sections]");
    if (!main) return;
    main.innerHTML = (a.sections || []).map(sec => `
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

    // 頁首
    const nameEl = $("[data-about-name]");
    if (nameEl) nameEl.textContent = t(SITE.profile.name, "en");
  }

  /* ---------- 學術成果 ---------- */

  function renderAcademics() {
    const list = $("[data-pubs]");
    if (!list || !SITE.publications) return;

    const sc = SITE.scholar || {};

    // 側欄卡片
    const card = $("[data-scholar-card]");
    if (card) {
      const p = SITE.profile;
      card.innerHTML = `
        <img class="scholar__avatar" src="${esc(p.avatar)}" alt="${esc(t(p.name, "en"))}">
        <div class="scholar__name">${esc(t(p.name, "en"))}</div>
        <div class="scholar__affil">${esc(t(p.affiliation, "en"))}</div>
        <div class="scholar__links">
          ${(p.links || []).map(l => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join("")}
        </div>
        <table class="stats">
          <caption>Citations</caption>
          <tbody>
            <tr><th>Cited by</th><td>${esc(sc.stats ? sc.stats.citations : 0)}</td></tr>
            <tr><th>h-index</th><td>${esc(sc.stats ? sc.stats.hIndex : 0)}</td></tr>
            <tr><th>i10-index</th><td>${esc(sc.stats ? sc.stats.i10Index : 0)}</td></tr>
          </tbody>
        </table>
        ${(sc.interests && sc.interests.length) ? `
          <div style="margin-top:1.5rem">
            <div class="eyebrow">Research Interests</div>
            <div class="tags">${sc.interests.map(i => `<span class="tag">${esc(i)}</span>`).join("")}</div>
          </div>` : ""}`;
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

  function renderInsights() {
    const list = $("[data-posts]");
    if (!list || !SITE.insights) return;

    const cats = ["All", ...new Set(SITE.insights.map(p => p.category).filter(Boolean))];
    const bar = $("[data-filters]");
    if (bar) {
      bar.innerHTML = cats.map((c, i) =>
        `<button class="filter${i === 0 ? " is-active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`
      ).join("");
    }

    const draw = (cat) => {
      const items = SITE.insights.filter(p => cat === "All" || p.category === cat);
      if (!items.length) {
        list.innerHTML = `<div class="empty" style="grid-column:1/-1">尚無文章。內容待上傳。</div>`;
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

    draw("All");

    if (bar) {
      bar.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter");
        if (!btn) return;
        $$(".filter", bar).forEach(b => b.classList.toggle("is-active", b === btn));
        draw(btn.dataset.cat);
      });
    }
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
    const nameEl = $("[data-nav-brand]");
    if (nameEl) nameEl.textContent = t(SITE.profile.name, "en");

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
    renderEntries();
    renderAbout();
    renderAcademics();
    renderInsights();
    renderArticle();
    initReveal();
    initParallax();
    initProgress();
  });
})();
