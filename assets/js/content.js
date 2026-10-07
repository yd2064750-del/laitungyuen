/* ==========================================================================
   content.js — 全站内容数据源
   --------------------------------------------------------------------------
   這是整站唯一需要修改的檔案。
   把下方所有 "…" 或 標示「待上傳」的地方換成你的真實內容即可，
   頁面會自動渲染，不需要改動任何 HTML。
   ========================================================================== */

window.SITE = {

  /* ---------------------------------------------------------------
     1. 個人基本資料（導航、首頁、頁腳都會用到）
     --------------------------------------------------------------- */
  profile: {
    name:      { en: "Lai Tung Yuen",        zh: "黎東源" },
    /* 學術頁（Academics 作者卡）顯示的名字，留空則沿用 name */
    nameAcademic: "Dongyuan Li",
    /* 左側導覽列顯示的文字（可改成名字，或留空自動用 name） */
    navBrand:  "Home",
    /* 首頁大圖下方那行小字（role）已移除；
       若要恢復，加回 role: { en: "...", zh: "..." } 即可 */
    affiliation: { en: "Duke University", zh: "Duke Kunshan University" },
    email:     "dl437@duke.edu",
    location:  { en: "Hong Kong, Shanghai", zh: "東莞" },
    avatar:    "assets/img/avatar.jpg",
    heroImage: "assets/img/hero.jpg",
    /* 學術 / 社交連結，可自由增刪 */
    links: [
      { label: "Google Scholar", href: "#" },
      { label: "SSRN",           href: "#" },
      { label: "LinkedIn",       href: "https://www.linkedin.com/in/dongyuan-li-b3653a388" },
      { label: "CV (PDF)",       href: "#" }
    ]
  },

  /* ---------------------------------------------------------------
     2. 首頁三個入口（標題已定，描述可自行改寫）
     --------------------------------------------------------------- */
  entries: [
    {
      en: "About Me",
      tc: "關於我",
      href: "about.html",
      desc: "個人簡歷、教育背景與工作經歷。",
      descEn: "Biography, education and professional experience."
    },
    {
      en: "Academics",
      tc: "學術成果",
      href: "academics.html",
      desc: "已發表與工作論文，依年份排列。",
      descEn: "Publications and working papers."
    },
    {
      en: "Insights",
      tc: "我的視角",
      href: "insights.html",
      desc: "觀",
      descEn: "Notes and research on markets and investing."
    }
  ],

  /* ---------------------------------------------------------------
     3. 關於我 —— 簡歷
     sections 內每個 item 就是時間軸上的一條
     --------------------------------------------------------------- */
  about: {
    /* 自我介紹：每個字串是一個段落。zh 留空則只顯示英文。 */
    intro: {
      en: [
        "Dongyuan Li is an undergraduate student in the dual-bachelor's degree program of Duke University and Duke Kunshan University, pursuing a Bachelor of Arts in Quantitative Political Economy (Public Policy track).",
        "My academic and research interests center on the intersection of law, finance and policy: corporate governance and financial risk, financial regulation and securities law, law and economics, as well as political economy. I aim to understand legal and market issues from both policy-oriented and quantitative perspectives."
      ],
      zh: []
    },
    /* 側欄資訊卡已於 2026-10-08 移除（頁面改為大圖版型）。
       若要恢復，把 facts 內容加回來並在 about.html 掛上 data-about-facts */
    facts: [
      { label: "Name / 姓名",         value: "Lai Tung Yuen" },
      { label: "Affiliation / 單位",  value: "Duke University" },
      { label: "Field / 領域",        value: "Quantitative Political Economy" },
      { label: "Email",               value: "dl437@duke.edu", href: "mailto:dl437@duke.edu" },
      { label: "Location / 地點",     value: "Hong Kong · Shanghai" }
    ],
    /* 教育背景 / 工作經歷 —— 內容待補，先留空。
       要恢復時間軸時，在陣列裡加回物件即可，格式：
       { title: {en, zh}, items: [ { period, title:{en,zh}, sub:{en,zh}, desc:{en,zh}, bullets:[] } ] } */
    sections: []
  },

  /* ---------------------------------------------------------------
     4. 學術成果 —— Google Scholar 風格
     --------------------------------------------------------------- */
  scholar: {
    /* 引用統計 */
    stats: { citations: "0", hIndex: "0", i10Index: "0", since: "2023" },
    /* 研究興趣標籤 */
    interests: ["資產定價", "行為金融", "計量經濟學", "市場微觀結構"]
  },

  /* 論文列表：body 為內文區塊，留空則閱讀頁顯示「內容待上傳」 */
  publications: [
    {
      id: "pub-1",
      year: "2026",
      title: "Paper Title Goes Here: A Study of Asset Pricing",
      authors: ["Lai Tung Yuen", "Co-Author A", "Co-Author B"],
      venue: "Journal of Financial Economics",
      type: "Journal Article",
      citedBy: 0,
      tags: ["Asset Pricing", "Machine Learning"],
      pdf: "",
      link: "",
      abstract: "摘要待上傳。一兩句話說明這篇論文的研究問題、方法與主要發現。",
      body: []
    },
    {
      id: "pub-2",
      year: "2025",
      title: "Second Paper Title — Working Paper",
      authors: ["Lai Tung Yuen"],
      venue: "Working Paper",
      type: "Working Paper",
      citedBy: 0,
      tags: ["Behavioral Finance"],
      pdf: "",
      link: "",
      abstract: "摘要待上傳。",
      body: []
    },
    {
      id: "pub-3",
      year: "2025",
      title: "Third Paper Title — Conference Presentation",
      authors: ["Lai Tung Yuen", "Co-Author C"],
      venue: "Annual Meeting of the AFA",
      type: "Conference",
      citedBy: 0,
      tags: ["Market Microstructure"],
      pdf: "",
      link: "",
      abstract: "摘要待上傳。",
      body: []
    }
  ],

  /* ---------------------------------------------------------------
     5. Insights —— 投資研究文章
     --------------------------------------------------------------- */
  insights: [
    {
      id: "post-4",
      date: "2026-09-11",
      category: "Law & Society",
      tags: ["Law & Society", "Political Economy", "Governance", "Institutions",
             "Law", "Political Philosophy", "Academic Writing", "Duke Kunshan University"],
      title: "Beyond Institutions: Who Will Restrain Power?",
      excerpt: "I'm pleased to share my latest article published as part of the ILMS Law & Society Series IV at Duke Kunshan University.",
      readTime: "4 min",
      body: [
        { p: [
          "On August 31, Professor Yao Yang, Dean of the Di-shui-hu Advanced Finance Institute at Shanghai University of Finance and Economics, delivered a thought-provoking lecture at Duke Kunshan University titled “Rethinking Rule of Man.”"
        ]},
        { p: [
          "The lecture began with a fundamental question:"
        ], quote: "Can good institutions function effectively without good people?" },
        { p: [
          "Drawing on James Madison's Federalist No. 51, Oliver Hart's theory of incomplete contracts, and ideas from Confucian political thought, Professor Yao explored the limits of institutional design and the role of human judgment, character, and competence in governance."
        ]},
        { p: [
          "What I found particularly interesting was the tension between institutional constraints and individual discretion. Laws and institutions cannot anticipate every possible situation. At some point, governance depends on the people who interpret, implement, and operate those institutions."
        ]},
        { p: [
          "The discussion also introduced the concept of political meritocracy and raised a broader question: rather than viewing meritocracy and democracy as mutually exclusive, can modern democratic systems learn something from the emphasis on political competence and leadership selection?"
        ]},
        { p: [
          "I was honored to contribute to the ILMS Law & Society Series by writing this lecture recap. The experience also gave me an opportunity to think more deeply about the intersection of law, institutions, political economy, and governance."
        ]},
        { p: [
          "Many thanks to Professor Yao Yang, the Institute of Law, Markets and Society (ILMS) at Duke Kunshan University, and everyone who contributed to the event."
        ]},
        { h: "Read the full article", p: [
          "The full piece is available here: <a href=\"https://lnkd.in/gzjkZPb7\" target=\"_blank\" rel=\"noopener\">Read the full article →</a>"
        ]}
      ]
    },
    {
      id: "post-1",
      date: "2026-09-15",
      category: "Macro",
      tags: ["Macro", "Markets"],
      title: "文章標題一：關於市場週期的觀察",
      excerpt: "一段 1–2 句的摘要，讓讀者在列表頁就能判斷要不要點進來讀。",
      readTime: "8 min",
      body: [
        { h: "第一節小標題", p: ["段落內容待上傳。", "第二段內容。"] }
      ]
    },
    {
      id: "post-2",
      date: "2026-08-02",
      category: "Valuation",
      tags: ["Valuation"],
      title: "文章標題二：估值方法筆記",
      excerpt: "摘要待上傳。",
      readTime: "6 min",
      body: []
    },
    {
      id: "post-3",
      date: "2026-06-20",
      category: "Portfolio",
      tags: ["Portfolio"],
      title: "文章標題三：資產配置的思考",
      excerpt: "摘要待上傳。",
      readTime: "10 min",
      body: []
    }
  ],

  /* ---------------------------------------------------------------
     6. 研究領域（保留資料備用）
     對應的首頁區塊已於 2026-10-08 移除。要恢復的話：
     在 index.html 加回 <section class="research"> 區塊與 data-research 容器即可。
     --------------------------------------------------------------- */
  research: [
    { title: "Financial Regulation",  desc: "" },
    { title: "HFT & Market Fairness", desc: "" },
    { title: "Corporate Governance",  desc: "" },
    { title: "AI × Finance",          desc: "" }
  ],

  /* ---------------------------------------------------------------
     7. 點擊量統計（後台，只有站長看得到）
     endpoint：免費計數服務 abacus（免註冊、開放 CORS）
     statsKey：stats.html 的檢視密碼
     --------------------------------------------------------------- */
  tracking: {
    enabled: true,
    endpoint: "https://abacus.jasoncameron.dev",
    /* 命名空間＝計數的獨立空間。換一個字串就等於「歸零重算」 */
    namespace: "laitungyuen-site",
    /* stats.html 的檢視密碼，請自行改成你記得的字串 */
    statsKey: "dy2026"
  }
};
