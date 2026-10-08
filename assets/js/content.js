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
    /* 首頁大圖上的兩行文字。第二行留空就不顯示。 */
    heroTitle:    "你好，我是黎東源！",
    heroSubtitle: "Welcome to Lai Tung Yuen’s personal website!",
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
      id: "post-6",
      date: "2026-05-03",
      category: "Political Economy",
      tags: ["Political Economy", "Macro", "Austerity", "Latin America"],
      title: "Austerity, Credibility, and Stabilization: Assessing Javier Milei’s Economic Reforms in Argentina",
      excerpt: "By the end of 2023, Argentina’s macroeconomic crisis had reached a tipping point: triple-digit inflation, persistent fiscal deficits, and widespread public distrust of the peso.",
      body: [
        {
          p: [
            "By the end of 2023, Argentina’s macroeconomic crisis had reached a tipping point: triple-digit inflation, persistent fiscal deficits, and widespread public distrust of the peso combined to create an economic situation where conventional policy tools could no longer function effectively (OECD, 2025). It was amid this breakdown that Javier Milei, a self identified anarcho capitalist, secured the presidency with a pledge to drastically shrink the state. Soon after taking office, his government moved quickly to cut public spending, tighten monetary conditions, and expand deregulation. This shock therapy approach quickly divided observers. Supporters argued that only a sharp break from past policies could restore market and institutional credibility; critics, meanwhile, emphasized rising hardship and deprivation among vulnerable groups. What makes this debate difficult to resolve is that both sides can point to tangible early outcomes. By early 2025, fiscal balances and exchange rate spreads had improved noticeably, yet poverty had climbed sharply and real wages continued to decline. The central question is whether those improvements can translate into lasting stability once social and political strains are fully accounted for. This paper tests the claim that Milei’s reforms represent a successful stabilization program by reviewing fiscal, inflation, and exchange rate performance, while also weighing distributional pressures, institutional weaknesses, and external constraints that might undermine long term results.",
            "Argentina’s macroeconomic weaknesses did not emerge suddenly. For more than a decade, the central bank monetized fiscal shortfalls, allowing money supply growth to outstrip gains in real output. This pattern fed a self reinforcing cycle: households and businesses increasingly substituted away from pesos, anticipating further depreciation and inflation. As García and Saenz (2024) note, by late 2023 the gap between official and parallel exchange rates surpassed 100 percent, encouraging illegal arbitrage and hardening beliefs that the currency would continue to weaken. Repeated sovereign defaults left Argentina reliant on successive IMF programs, yet conditional lending rarely broke the cycle of crisis due to political resistance, policy reversals, and external shocks (Vreeland, 2007). When Milei took office, inflation expectations were effectively unanchored, creating a steep hurdle for any stabilization attempt.",
          ],
        },
        {
          figure: {
            src: "assets/img/art-ars-crisis.svg",
            alt: "示意圖：貨幣秩序逐步解體",
            caption: "示意圖。阿根廷長期的財政貨幣化與貨幣替代，使披索的價值基準逐步鬆動。",
            credit: "本文自製插圖 · 非數據圖表",
          },
        },
        {
          p: [
            "Scholarly debates about stabilization offer competing lenses through which to judge Milei’s agenda. The credibility centered framework (Calvo & Végh, 1999) stresses that temporary or weakly enforced adjustments fail to reset inflation expectations, whereas durable, rule bound policies can shift beliefs before actual price changes slow. Rodrik (2006) reinforces this logic by observing that global financial markets value policy consistency more than the specific details of reform. Frieden (1991) further adds that in financially open economies, credible domestic institutional limits are needed to curb exchange rate and capital flow volatility.",
            "Critical scholarship, by contrast, highlights the social and political dangers of orthodox austerity. Stiglitz (2002) and Babb (2005) show that front loaded fiscal consolidation disproportionately harms low income and informal populations, fueling unrest and eventual policy rollbacks. Vreeland (2007) demonstrates that IMF conditionality narrows domestic policy autonomy, while Moser and Sturm (2011) connect IMF lending requirements to fiscal conservatism that exacerbates income inequality. These two traditions yield contrasting expectations: credibility driven austerity may produce rapid nominal stabilization, but high social costs can erode political support and undo early progress. This paper engages both perspectives by evaluating Milei’s reforms against both nominal targets and real world social outcomes.",
          ],
        },
        {
          figure: {
            src: "assets/img/art-ars-balance.svg",
            alt: "示意圖：信譽收益與社會成本之間的權衡",
            caption: "示意圖。緊縮政策在名目穩定上的收益，與其社會成本之間的權衡。",
            credit: "本文自製插圖 · 非數據圖表",
          },
        },
        {
          p: [
            "The Milei administration’s central policies—deep spending cuts, an end to central bank financing of deficits, and faster price liberalization—brought measurable improvements in three nominal areas. First, Argentina reached a primary fiscal surplus of roughly 0.3 percent of GDP by early 2025, a striking turnaround from years of deficits often above 3 percent of GDP (Reuters, 2025). The surplus came from lower energy and transport subsidies, public sector staffing reductions, and frozen intergovernmental transfers. Importantly, ending fiscal monetization removed the main structural source of excess money growth, supplying the nominal anchor Calvo and Végh (1999) regard as vital to re anchoring inflation expectations.",
            "Second, monthly inflation slowed dramatically, from 25.5 percent in December 2023 to 2.7 percent by January 2025 (OECD, 2025). Although annual inflation remained above 100 percent due to base effects, the rapid deceleration weakened inertial price pressures. In line with credibility theory, shifting expectations appear to have altered how firms set prices and households negotiate wages, a psychological shift that usually precedes sustained disinflation.",
            "Third, the parallel exchange rate premium narrowed sharply from more than 100 percent to approximately 20 percent over the same period. This decline reflected stronger confidence in the official exchange rate, lower incentives for speculative arbitrage, some reversal of currency substitution, and reduced stress on international reserves. The convergence of exchange rates both reflected and reinforced fiscal and monetary restraint, demonstrating how credibility and demand discipline can reinforce one another.",
            "External credibility improved alongside domestic indicators. The IMF expressed approval in early 2024 and, by April 2026, reached an agreement to disburse roughly $1 billion in new funding, conditional on sustained fiscal discipline (IMF, 2024; Reuters, 2026). Sovereign bond spreads tightened, as markets priced in lower near term default risk. Although IMF support imposes policy constraints (Vreeland, 2007), it also serves as a stabilizing signal for investors and helps safeguard reserve levels during a fragile adjustment.",
          ],
        },
        {
          p: [
            "Nevertheless, focusing only on nominal stabilization masks severe distributional and real economic costs. Poverty rose from roughly 40 percent to nearly 53 percent within months of the reform launch (Le Monde, 2024). Subsidy reductions and public sector job cuts lowered real incomes sharply, with the heaviest burden falling on informal workers who lack social protection. Real wages declined, and demand for emergency food aid rose substantially. These outcomes match Stiglitz’s (2002) warning that austerity shifts adjustment costs onto the most vulnerable groups. While rising protests and falling approval ratings show public dissatisfaction, one must also recognize that unaddressed hyperinflation would have severely eroded low income purchasing power. The central policy shortcoming is not stabilization itself, but the lack of a strong, targeted social safety net to cushion adjustment hardships.",
            "Beyond rising poverty, real economic activity remains weak. Argentina’s GDP is projected to contract by 2.5 percent in 2024, with private investment staying subdued. Gains have been limited to nominal indicators—fiscal balances, inflation rates, and exchange rate expectations—while the real productive sector shows little sign of recovery.",
            "Longstanding vulnerabilities also persist. The signature campaign promise of full dollarization has been delayed indefinitely, creating uncertainty over the long term monetary regime. If political support weakens further, demand for dollars could rebound and widen exchange rate gaps again. As Frieden (1991) suggests, Argentina remains exposed to commodity price swings, changes in global interest rates, and sudden capital flow stops. Together with ongoing IMF conditionality, these factors mean current stability remains fragile and potentially reversible.",
          ],
        },
        {
          p: [
            "Overall, Milei’s reforms achieved rapid nominal stabilization in ways consistent with credibility centered theoretical expectations. Fiscal consolidation, disinflation, and exchange rate convergence all improved markedly, supporting the first part of this paper’s argument. At the same time, the absence of real recovery and the sharp rise in poverty confirm the second point: nominal stabilization does not guarantee inclusive, durable economic health. Confusing nominal progress with structural recovery risks misrepresenting the sustainability and fairness of the reform package. The gains achieved have corrected critical nominal imbalances but have not rebuilt an economic model that delivers broad based well being.",
            "In conclusion, this paper assesses the stabilization effects of Argentina’s economic reforms in the early period of Javier Milei’s administration. Available evidence shows that Argentina has achieved meaningful nominal improvements in fiscal balances, inflation dynamics, and exchange rate stability, while external credibility has also strengthened. At the same time, poverty has surged, the real economy remains weak, and external and institutional risks persist. Argentina’s experience suggests that austerity policies pursued to boost credibility can quickly improve nominal economic indicators but impose high social costs.",
          ],
        },
        {
          h: "References",
          ol: [
            "Babb, S. (2005). The social consequences of structural adjustment: Recent evidence and current debates. <i>Annual Review of Sociology, 31</i>, 199–222. https://doi.org/10.1146/annurev.soc.31.041304.122258",
            "Calvo, G. A., &amp; Végh, C. A. (1999). Inflation stabilization and BOP crises in developing countries. In J. B. Taylor &amp; M. Woodford (Eds.), <i>Handbook of macroeconomics</i> (Vol. 1, pp. 1531–1614). Elsevier. https://ideas.repec.org/p/nbr/nberwo/6925.html",
            "Frieden, J. A. (1991). Invested interests: The politics of national economic policies in a world of global finance. <i>International Organization, 45</i>(4), 425–451. https://doi.org/10.1017/S0020818300033178",
            "García, P., &amp; Saenz, M. (2024). Inflation dynamics in Argentina: Structural determinants and policy implications. arXiv. https://doi.org/10.48550/arXiv.2405.20822",
            "International Monetary Fund. (2024, February 23). Argentina: Statement by the First Deputy Managing Director. https://www.imf.org/en/news/articles/2024/02/23/pr2455-argentina-statement-by-the-first-deputy-managing-director",
            "Le Monde. (2024, December 30). With Javier Milei, a year of chainsaws and controlled inflation in Argentina. https://www.lemonde.fr/en/economy/article/2024/12/30/with-javier-milei-a-year-of-chainsaws-and-controlled-inflation-in-argentina_6736543_19.html",
            "Moser, C., &amp; Sturm, J.-E. (2011). Explaining IMF lending decisions after the Cold War. <i>The Review of International Organizations, 6</i>(3–4), 307–340. https://doi.org/10.1007/s11558-011-9120-y",
            "Organisation for Economic Co-operation and Development. (2025). <i>OECD economic surveys: Argentina 2025</i>. OECD Publishing. https://www.oecd.org/en/publications/2025/07/oecd-economic-surveys-argentina-2025_4a5ddf67",
            "Reuters. (2025, January 17). Argentina logs first financial surplus in 14 years. <i>Reuters</i>. https://www.reuters.com/world/americas/argentina-logs-first-financial-surplus-14-years-2024-2025-01-17/",
            "Reuters. (2026, April 16). Argentina reaches IMF staff deal, opening door to $1 billion in fresh funds. <i>Reuters</i>. https://www.reuters.com/world/americas/imf-reaches-agreement-with-argentina-unlock-1-billion-fresh-funds-2026-04-15/",
            "Rodrik, D. (2006). Goodbye Washington consensus, hello Washington confusion? <i>Journal of Economic Literature, 44</i>(4), 973–987. https://www.aeaweb.org/articles?id=10.1257/jel.44.4.973",
            "Stiglitz, J. E. (2002). <i>Globalization and its discontents</i>. W. W. Norton &amp; Company. https://wwnorton.com/books/globalization-and-its-discontents/",
            "Vreeland, J. R. (2007). <i>The International Monetary Fund: Politics of conditional lending</i>. Routledge. https://www.academia.edu/86514686/Vreeland_The_International_Monetary_Fund_Politics_of_Conditional_Lending_2007",
          ],
        },
      ]
    },
    {
      id: "post-5",
      date: "2026-08-20",
      category: "法制史",
      tags: ["法制史", "禮法合治", "儒家思想", "中國古代社會"],
      title: "禮法合治：中國古代禮制與法律關係的演變及其歷史作用",
      excerpt: "中華文明源遠流長、綿延不斷，在數千年的歷史發展進程中形成了獨具特色的社會治理體系。其中，禮制與法律是維護社會秩序、規範社會行為、調節社會關係的重要制度安排。",
      body: [
        {
          h: "摘要",
          p: [
            "中華文明源遠流長、綿延不斷，在數千年的歷史發展進程中形成了獨具特色的社會治理體系。其中，禮制與法律是維護社會秩序、規範社會行為、調節社會關係的重要制度安排。禮與法，一個側重於教化與規範，一個側重於強制與懲戒；一個深入社會倫理，一個體現國家權力。二者雖然在功能和表現形式上各有不同，但並非彼此割裂、相互對立，而是在中華文明長期發展過程中不斷互動、不斷融合，逐步形成了具有鮮明中國特色的禮法合治傳統。",
            "先秦時期，禮制主要建立在宗法關係和等級秩序基礎之上，法則隨著國家形態的發展逐漸成為國家治理的重要工具。秦朝以法治國，建立高度集中的國家治理體系，但其歷史興亡也使後世統治者進一步認識到，單純依靠刑罰和強制手段難以實現長治久安。漢代以後，隨著儒學逐步進入國家政治體系，禮與法開始更加緊密地結合，“引禮入法”成為中國古代法律發展的重要趨勢。至唐代，《唐律疏議》明確提出“德禮為政教之本，刑罰為政教之用”，禮法結合由此形成較為成熟的制度體系。宋元明清時期，這一傳統進一步向基層社會延伸，形成國家法律、社會倫理、家族規範相互聯繫的治理格局。",
            "中國古代禮法關係的演變，是中華文明在長期社會實踐中探索國家治理和社會秩序的重要成果。它說明，一個社會既需要明確的制度規範，也需要廣泛的倫理認同；既需要法律維護社會底線，也需要道德教化形成行為自覺。同時也應當看到，傳統禮法制度具有鮮明的等級性和身份差異，與現代社會所強調的平等、權利和法治原則存在明顯不同。因此，對中國古代禮法傳統，應當堅持歷史的、全面的、辯證的認識，在具體歷史條件中理解其形成原因、制度作用及其歷史侷限。",
            "關鍵詞： 禮制；法律；禮法合治；儒家思想；中國古代社會；社會治理",
          ],
        },
        {
          h: "一、引言：從禮與法理解中國古代社會秩序",
          p: [
            "中華民族在漫長曆史進程中創造了燦爛的文明，也形成了持續時間長、影響範圍廣的國家制度和社會秩序。如何治理國家、如何規範社會、如何處理人與人之間的關係，是任何文明發展都必須面對的基本問題。",
            "在中國古代社會，這一問題的重要答案之一，就是禮與法。今天我們理解“禮”，往往容易把它理解為禮貌、禮節和儀式。然而在中國古代，“禮”的含義遠比現代生活中的禮貌規範廣泛。它不僅規定個人應該如何行動，而且規定不同身份的人應該如何相處；不僅涉及婚喪嫁娶、祭祀等社會生活，也涉及君臣關係、父子關係以及政治秩序。因此，禮從來不是單純的儀式，而是傳統中國社會維持秩序的重要制度規範。法則主要依靠國家權力制定和實施，通過明確的規範以及相應的懲罰措施，對社會成員的行為進行約束。從表面來看，禮與法似乎屬於兩種不同的秩序體系：禮重教化，法重懲戒；禮重倫理，法重強制；禮深入社會生活，法體現國家權力。",
            "但是，縱觀中國古代社會發展的歷史進程，可以發現，禮與法並沒有長期停留在彼此分離的狀態，而是在社會發展和國家治理實踐中不斷髮生聯繫。特別是秦漢以後，隨著統一多民族國家不斷發展，國家治理面對的社會關係更加複雜。如何在國家法律與社會倫理之間建立聯繫，成為古代統治者必須面對的重要問題。從漢代開始，儒家思想逐步進入國家治理體系，禮的倫理原則開始更多地進入法律制度；到了唐代，禮與法的結合已經形成較為成熟的制度體系，併成為此後中國古代法律發展的重要傳統。",
            "因此，中國古代禮法關係值得關注的，並不是簡單判斷“禮好還是法好”，而是研究：",
            "中國古代為什麼逐步形成禮法結合的治理模式？這種制度在當時發揮了什麼作用？又具有怎樣的歷史侷限？",
            "本文認為，中國古代禮法關係經歷了從先秦禮制與法律各自發展，到秦漢以後禮法逐步融合，再到唐代禮法合治制度化的發展過程。這一過程既是中國古代國家治理不斷成熟的表現，也是中華文明長期歷史實踐的重要組成部分。",
          ],
        },
        {
          figure: {
            src: "assets/img/art-ding.jpg",
            alt: "青銅鼎，商代晚期（約公元前 1200–1100 年）。鼎是先秦最重要的禮器之一，也是身分與政權的象徵。",
            caption: "青銅鼎，商代晚期（約公元前 1200–1100 年）。鼎是先秦最重要的禮器之一，也是身分與政權的象徵。",
            credit: "克利夫蘭藝術博物館藏 · CC0",
          },
        },
        {
          h: "二、先秦時期：禮制與法律秩序的歷史形成",
        },
        {
          h3: "（一）禮制與社會秩序",
          p: [
            "中國古代禮制具有十分悠久的歷史。到了西周時期，禮已經成為維護政治和社會秩序的重要制度。《禮記》說：“夫禮者，所以定親疏，決嫌疑，別同異，明是非也。”<sup class=\"fnref\"><a href=\"#fn-1\" id=\"fnref-1\">1</a></sup>這句話揭示了禮的重要功能。禮首先解決的不是個人生活中的禮貌問題，而是社會關係問題。人與人之間如何區分親疏？不同身份之間如何相處？什麼行為符合社會規範？什麼行為破壞社會秩序？這些問題都需要通過禮加以規定。因此，禮實際上承擔著劃分社會關係和維護社會秩序的重要作用。西周社會建立在宗法制度和分封制度基礎之上。血緣關係、政治關係和社會身份緊密結合。在這一制度結構下，一個人的身份決定了其所承擔的義務，也決定了其應該遵守的行為規範。君臣有別，父子有親，長幼有序。禮正是在這樣的社會結構中發揮作用。由此可以看到，禮的核心並不僅僅是“形式”，而是“秩序”。它通過一整套社會規範，把人與人之間的關係固定下來，使社會成員能夠知道自己處在什麼位置、應該承擔什麼責任。",
          ],
        },
        {
          h3: "（二）法與國家權力的發展",
          p: [
            "與此同時，隨著國家組織不斷發展，法律逐步成為治理國家的重要工具。特別是在春秋戰國時期，社會發生深刻變化。舊有的宗法秩序受到衝擊，各諸侯國之間競爭日益激烈。國家需要更加有效地組織人口、徵收賦稅、動員軍隊和維護社會秩序。在這種情況下，傳統禮制已經難以單獨承擔全部國家治理功能。法律的重要性不斷上升。商鞅變法是其中最典型的例子。秦國通過改革戶籍、軍功、土地和刑罰制度，建立起更加嚴密的國家治理體系。法律開始更加直接地進入普通人的社會生活。<sup class=\"fnref\"><a href=\"#fn-2\" id=\"fnref-2\">2</a></sup>秦國最終統一六國，建立中國歷史上第一個統一的中央集權國家。秦朝的建立說明，法律與國家權力的結合具有強大的社會組織能力。但是，秦朝的迅速滅亡也留下了深刻歷史啟示。一個國家可以通過強有力的制度迅速建立秩序，但要實現長期穩定，僅僅依靠刑罰和強制並不充分。這成為後世國家治理不斷思考的重要問題。",
          ],
        },
        {
          h: "三、秦漢之變：禮與法關係的重要轉折",
          p: [
            "秦朝滅亡以後，漢朝建立。漢初統治者吸取秦朝歷史教訓，在政治實踐中採取較為寬緩的政策。隨著社會逐步恢復和發展，國家治理也進入新的階段。到了漢武帝時期，儒家思想逐漸成為國家政治思想的重要組成部分。<sup class=\"fnref\"><a href=\"#fn-3\" id=\"fnref-3\">3</a></sup>這一變化，對中國古代禮法關係產生了深遠影響。它並不是簡單地以儒家思想取代法律，而是推動法律與倫理之間形成更加緊密的聯繫。這正是中國古代禮法關係發生重大變化的重要歷史節點。",
          ],
        },
        {
          h3: "（一）禮進入國家治理",
          p: [
            "董仲舒是這一歷史進程中的重要思想人物。他對禮與法的關係進行了重新思考。在他的思想中，禮義與法制並不是完全對立的兩種東西。禮更多承擔倫理教化的作用，而法則成為維護秩序的制度手段。<sup class=\"fnref\"><a href=\"#fn-4\" id=\"fnref-4\">4</a></sup>這意味著，法律不再僅僅是國家強制力的體現，而開始具有更加鮮明的倫理基礎。從此，中國古代法律發展逐漸出現一個重要趨勢：法律開始越來越多地承擔維護倫理秩序的責任。這一趨勢後來被學者概括為“法律儒家化”或者“引禮入法”。所謂“引禮入法”，就是原本主要依靠禮制和倫理規範解決的社會關係，逐步被國家法律確認和保護。例如，父子關係、夫妻關係、宗族關係原本屬於社會倫理領域，但隨著禮法結合的發展，這些關係越來越多地受到國家法律的保護和規範。禮由此開始進入法律。法律也因此更加深入社會生活。",
          ],
        },
        {
          h3: "（二）春秋決獄：司法實踐中的禮法結合",
          p: [
            "漢代“春秋決獄”是觀察這一變化的重要窗口。所謂“春秋決獄”，就是在處理部分案件時參考儒家經典所體現的倫理原則。<sup class=\"fnref\"><a href=\"#fn-5\" id=\"fnref-5\">5</a></sup>其重要意義在於，它表明司法判斷開始更加關注行為人的身份、動機以及行為背後的倫理關係。這與秦代較為強調法律條文和刑罰的治理方式存在明顯差異。但是，我們也不能簡單地認為“春秋決獄”就是用儒家經典直接取代國家法律。相關研究指出，春秋決獄更多體現的是漢律與儒家經義之間的結合，是司法實踐中對法律原則與倫理原則進行協調的一種方式。因此，禮法結合不是一次性完成的制度革命，而是一個不斷發展的歷史過程。",
          ],
        },
        {
          figure: {
            src: "assets/img/art-tang.jpg",
            alt: "唐代仕女陶俑，約公元 700–750 年。唐代國家制度與社會生活高度發展，禮法合治在此趨於成熟。",
            caption: "唐代仕女陶俑，約公元 700–750 年。唐代國家制度與社會生活高度發展，禮法合治在此趨於成熟。",
            credit: "克利夫蘭藝術博物館藏 · CC0",
          },
        },
        {
          h: "四、唐代：禮法合治走向成熟",
          p: [
            "如果說漢代開啟了禮法融合的重要進程，那麼唐代則進一步將這一傳統制度化。唐代國家制度高度發展，中央集權進一步加強，法律體系也更加完備。《唐律疏議》是研究這一問題最重要的史料之一。其中有一句非常重要的話：“德禮為政教之本，刑罰為政教之用，猶昏曉陽秋相須而成者也。”<sup class=\"fnref\"><a href=\"#fn-6\" id=\"fnref-6\">6</a></sup>這句話可以說是中國古代禮法關係的高度概括。",
            "禮是根本，法是手段。禮與法並不是兩個互相排斥的體系，而是共同服務於國家治理。這說明，到了唐代，中國古代國家已經形成比較成熟的禮法合治思想。",
          ],
        },
        {
          h3: "（一）以禮定秩序，以法守底線",
          p: [
            "唐代法律制度的一個重要特點，就是大量法律規定與傳統倫理聯繫在一起。例如“十惡”制度。“十惡”既包括謀反、謀大逆等危害國家政治秩序的行為，也包括“不孝”“不義”等嚴重違背傳統倫理的行為。<sup class=\"fnref\"><a href=\"#fn-7\" id=\"fnref-7\">7</a></sup>這說明，在唐代法律觀念中，國家所需要保護的並不僅僅是政治秩序，同時也包括傳統社會的倫理秩序。一個人如果嚴重違反傳統倫理，就可能不只是受到道德譴責，也可能受到法律處罰。這就是禮進入法的重要表現。禮規定什麼是社會所認可的行為。法則規定嚴重破壞這種秩序之後需要承擔什麼責任。兩者相互配合，共同構成國家治理體系。",
          ],
        },
        {
          h3: "（二）家庭倫理與國家秩序",
          p: [
            "唐代禮法制度還特別重視家庭關係。中國古代社會以家庭為基本社會單位之一。父子、夫妻、兄弟之間的關係，不僅被視為私人關係，也被認為與社會整體秩序密切相關。因此，唐律對家庭關係進行了大量規定。這一制度安排體現了傳統中國社會的重要特點：家與國並不是截然分開的。家庭秩序被認為是社會秩序的基礎，而社會秩序又是國家穩定的重要條件。因此，維護家庭倫理也成為國家法律的重要任務。這正是中國古代禮法關係區別於現代法律制度的重要特點之一。",
          ],
        },
        {
          figure: {
            src: "assets/img/art-rites.jpg",
            alt: "《周禮》教授圖，明代（1638 年）。禮制透過家訓、族規、鄉約等形式持續向基層社會延伸。",
            caption: "《周禮》教授圖，明代（1638 年）。禮制透過家訓、族規、鄉約等形式持續向基層社會延伸。",
            credit: "克利夫蘭藝術博物館藏 · CC0",
          },
        },
        {
          h: "五、宋元明清：禮法秩序進一步深入社會",
          p: [
            "唐以後，中國社會繼續發展。宋代以後，理學興起，傳統倫理思想進一步深入社會基層。禮法關係也由國家制度逐漸向社會生活延伸。家訓、族規、鄉約等社會規範不斷發展。<sup class=\"fnref\"><a href=\"#fn-8\" id=\"fnref-8\">8</a></sup>這些制度雖然不完全等同於國家法律，但在實際社會生活中承擔了重要的秩序調節功能。這說明，中國古代國家治理並不是只有官府和法律。在國家法律之外，還存在大量社會規範。",
          ],
        },
        {
          h3: "（一）國家法律與社會倫理共同發揮作用",
          p: [
            "在傳統社會中，許多社會糾紛首先並不是通過官府解決。家庭內部的矛盾，可以由長輩調解；宗族內部的問題，可以通過族規處理；鄉里之間的糾紛，可以由地方人士調節。<sup class=\"fnref\"><a href=\"#fn-9\" id=\"fnref-9\">9</a></sup>只有當社會內部規範無法解決問題時，才進一步進入國家司法體系。因此，國家法律與社會倫理之間形成了相互配合的關係。國家法律確定底線。社會倫理調節日常關係。家庭和宗族承擔基層治理功能。<sup class=\"fnref\"><a href=\"#fn-10\" id=\"fnref-10\">10</a></sup>這使中國古代社會形成了比較複雜的多層次秩序結構。",
          ],
        },
        {
          h3: "（二）禮法制度的社會基礎",
          p: [
            "禮法之所以能夠長期存在，與中國古代社會的基本結構密切相關。傳統社會是一個以家庭、宗族和鄉里關係為重要紐帶的社會。人不是完全孤立的個人，而是處在複雜社會關係中的成員。<sup class=\"fnref\"><a href=\"#fn-11\" id=\"fnref-11\">11</a></sup>因此，人們不僅關心個人行為是否受到法律處罰，也十分重視行為是否符合家庭倫理、社會習俗以及身份規範。禮法制度正是建立在這種社會結構之上。從這個角度來看，禮法結合不是簡單的統治工具，也是一種傳統社會組織自身的歷史產物。當然，這並不意味著這種制度沒有問題。恰恰相反，它越深入社會，就越可能把傳統社會中的等級關係和身份差異固定下來。這也是理解其歷史侷限的重要方面。",
          ],
        },
        {
          h: "六、禮法秩序的等級性及其歷史侷限",
          p: [
            "研究中國古代禮法關係，必須堅持全面、客觀的態度。既要看到它維護社會秩序的一面，也要看到它自身存在的侷限。傳統禮制最明顯的特點之一，就是強調身份和等級。君臣、父子、夫妻、長幼之間存在明確的差序關係。<sup class=\"fnref\"><a href=\"#fn-12\" id=\"fnref-12\">12</a></sup>這種制度在傳統社會具有維持秩序的功能，但也意味著不同社會成員並不完全處於相同的制度位置。“刑不上大夫，禮不下庶人”這一說法，就是理解傳統禮法等級性的一個重要切入點。<sup class=\"fnref\"><a href=\"#fn-13\" id=\"fnref-13\">13</a></sup>但是，這句話不能簡單理解為“大夫犯罪不受法律處罰，普通人不需要遵守禮”。從具體制度來看，古代官員同樣可能受到刑罰。<sup class=\"fnref\"><a href=\"#fn-14\" id=\"fnref-14\">14</a></sup>更合理的理解，是不同社會身份的人受到不同形式的制度規範，其行為評價與社會身份之間存在密切聯繫。這與現代法律強調法律面前人人平等存在明顯區別。",
            "因此，我們今天研究傳統禮法制度，既不能因為它存在等級性就完全否認它的歷史作用，也不能因為它在歷史上長期存在，就忽視其制度侷限。歷史研究不是簡單地歌頌過去，也不是簡單地否定過去。真正重要的是認識歷史條件。古代社會面對的是古代社會的問題。現代社會面對的是現代社會的問題。不同社會所形成的制度，也必然帶有不同的時代烙印。",
          ],
        },
        {
          h: "七、為什麼中國古代形成了禮法合治？",
          p: [
            "回顧中國古代禮法關係的發展，可以發現，禮法結合具有深刻的歷史原因。",
            "第一，這是國家不斷發展壯大的客觀要求。國家規模不斷擴大，社會關係不斷複雜化，僅僅依靠血緣關係已經無法維持整個社會的秩序。法律需要進入社會。禮制也需要通過國家制度獲得更加穩定的保障。二者結合，成為國家治理髮展的重要結果。",
            "第二，這是吸取秦朝歷史經驗的重要結果。秦朝建立了強大的國家機器，但其統治時間相對短暫。漢代以後，統治者更加重視德治和教化。這並不是否定法律，而是認識到：國家治理不能只有懲罰，還必須有教化；不能只有制度約束，還必須形成社會倫理。禮與法正是在這一認識基礎上逐漸結合。",
            "第三，這是傳統社會結構決定的。中國古代長期形成了以家庭、宗族和鄉里為重要紐帶的社會結構。國家法律要進入社會，就必須與這些社會關係發生聯繫。因此，婚姻、家庭、宗族等倫理關係逐漸進入法律。禮也由此獲得了法律保障。",
            "第四，這是維護長期社會穩定的需要。任何一個長期存在的國家，都必須解決一個基本問題：如何使絕大多數社會成員在日常生活中形成比較穩定的行為預期？如果任何行為都需要國家強制力進行干預，那麼治理成本必然很高。禮的作用就在於，通過倫理、習慣和社會評價提前規範人的行為。法則在社會規範失效之後提供強制性保障。二者結合，就形成了一種具有較強社會滲透能力的治理模式。",
          ],
        },
        {
          h: "八、禮法合治的歷史作用",
          p: [
            "從歷史發展來看，禮法結合對於中國古代社會具有多方面影響。首先，它形成了比較穩定的社會行為規範。人們知道什麼行為受到社會認可，什麼行為會受到譴責，什麼行為會受到國家處罰。這種明確的行為預期，對於維護社會穩定具有重要意義。其次，它降低了社會治理成本。大量社會關係可以通過家庭、宗族、鄉里等社會組織進行調節，而不是所有問題都由國家司法機關處理。國家法律與社會倫理由此形成分工。而且，它加強了國家與社會之間的聯繫。法律並不是孤立存在的。當國家法律與社會倫理發生聯繫時，國家制度能夠更加深入普通人的生活。最後，它形成了具有中國特色的傳統治理經驗。禮與法並行、德與刑結合，是中國古代國家治理的重要特點之一。《唐律疏議》所謂“德禮為政教之本，刑罰為政教之用”，就是這一傳統的集中表達。",
          ],
        },
        {
          h: "九、歷史經驗與現實認識",
          p: [
            "如今研究中國古代禮法關係，並不是為了簡單回到傳統社會，更不是要把古代制度原封不動地搬到今天。歷史的真正價值，在於幫助我們認識規律。中國古代禮法關係的發展告訴我們，制度從來不是孤立存在的。一個社會的制度體系，要真正發揮作用，不僅需要國家權力和制度安排，也需要一定的社會基礎和價值認同。同時也應該看到，傳統禮法制度之所以能夠維持數千年，是因為它與當時的經濟結構、家庭結構、政治制度和社會倫理相適應。今天的社會已經發生深刻變化。現代社會強調公民權利、法律平等和現代法治，這些基本原則與傳統等級秩序存在根本區別。",
            "因此，對傳統文化必須堅持取其精華、去其糟粕的態度。既要看到中華傳統文化中重視責任、秩序、誠信、家庭倫理以及社會共同體的思想資源，也要認識到其中存在的等級觀念、身份差別等歷史侷限。只有把歷史經驗放在歷史條件中分析，才能真正做到尊重歷史、認識歷史、理解歷史。",
          ],
        },
        {
          h: "十、結語",
          p: [
            "中華文明綿延數千年，形成了豐富而深厚的制度文化傳統。禮與法，是其中十分重要的兩個方面。從先秦時期禮制與法律的形成，到秦漢時期禮法關係發生重大轉折，再到唐代禮法合治制度進一步成熟，以及宋元明清時期禮法秩序向社會基層不斷延伸，中國古代逐步形成了具有鮮明特色的社會治理傳統。這一歷史進程告訴我們：",
            "禮是社會倫理秩序的重要載體，法是國家強制秩序的重要保障；禮可以正人心、明規範，法可以定分止爭、維護底線。二者相互配合，共同構成中國古代社會長期運行的重要制度基礎。",
            "當然，歷史的發展從來不是一條直線。中國古代禮法制度既有維護社會秩序、穩定社會關係的一面，也有等級森嚴、身份差異明顯的一面。因此，我們不能簡單地用現代標準否定古代，也不能用古代經驗代替現代制度。真正科學的歷史認識，應當堅持從歷史事實出發，在歷史進程中理解制度，在具體條件下評價制度。中國古代禮法關係的演變，歸根到底，是中華文明長期面對社會治理問題並不斷探索解決方式的歷史過程。這種探索雖然產生於古代社會，卻留下了值得深入研究的歷史經驗。一個文明能夠綿延發展，離不開制度的支撐，也離不開社會成員對於共同規範的認同。從這個意義上看，研究中國古代禮制與法，不僅是研究過去的制度，更是在認識中華文明如何形成秩序、維護秩序和調整秩序。",
            "歷史已經證明，社會發展需要秩序，秩序需要制度，制度又必須植根於社會實際。這正是中國古代禮法關係留給我們的重要歷史啟示。",
          ],
        },
        {
          h: "註釋",
          ol: [
            "《禮記·曲禮上》，《十三經注疏》本。原文為：“夫禮者，所以定親疏，決嫌疑，別同異，明是非也。”《禮記·曲禮上》對禮的社會功能有較為明確的概括。 <a class=\"fnback\" href=\"#fnref-1\">↩</a>",
            "關於商鞅變法及秦國法制改革，可參見司馬遷：《史記》卷六十八《商君列傳》，北京：中華書局，1959年。 <a class=\"fnback\" href=\"#fnref-2\">↩</a>",
            "《漢書》卷六《武帝紀》、卷五十六《董仲舒傳》。關於漢武帝時期儒學與國家政治關係，可參見班固：《漢書》，北京：中華書局，1962年。 <a class=\"fnback\" href=\"#fnref-3\">↩</a>",
            "班固：《漢書》卷五十六《董仲舒傳》，北京：中華書局，1962年。 <a class=\"fnback\" href=\"#fnref-4\">↩</a>",
            "關於“春秋決獄”及其與漢律之間的關係，可參見高漢成：《“經義原則”還是“權變思維”：董仲舒春秋決獄司法功能重述》，《社會科學》2024年第9期。 <a class=\"fnback\" href=\"#fnref-5\">↩</a>",
            "長孫無忌等：《唐律疏議》卷一《名例律》，北京：中華書局，1983年。《唐律疏議》明確提出：“德禮為政教之本，刑罰為政教之用，猶昏曉陽秋相須而成者也。”該表述集中體現了唐代禮法關係的基本思想。 <a class=\"fnback\" href=\"#fnref-6\">↩</a>",
            "長孫無忌等：《唐律疏議》卷一《名例律》“十惡”條。關於唐律“十惡”制度及其所體現的禮法關係，可參見張晉藩：《中國法制史》，北京：中國政法大學出版社。 <a class=\"fnback\" href=\"#fnref-7\">↩</a>",
            "關於宋代以來家訓、族規、鄉約等社會規範的發展，可參見朱熹：《增損呂氏鄉約》；《朱子家禮》。呂氏鄉約及其後續發展表明，儒家倫理規範逐漸通過鄉約、家禮等形式進入基層社會生活。 <a class=\"fnback\" href=\"#fnref-8\">↩</a>",
            "關於傳統中國基層社會中家族、鄉里等社會組織發揮糾紛調節作用的情況，可參見瞿同祖：《中國法律與中國社會》，北京：商務印書館，2010年；費孝通：《鄉土中國》，北京：人民出版社，2008年。 <a class=\"fnback\" href=\"#fnref-9\">↩</a>",
            "瞿同祖：《中國法律與中國社會》，北京：商務印書館，2010年。 <a class=\"fnback\" href=\"#fnref-10\">↩</a>",
            "瞿同祖認為，中國傳統法律與中國社會的家庭結構、宗族關係以及社會身份具有密切聯繫。參見瞿同祖：《中國法律與中國社會》，北京：商務印書館，2010年。 <a class=\"fnback\" href=\"#fnref-11\">↩</a>",
            "《禮記·曲禮上》對於傳統禮制所規定的社會關係有較為明確的說明，如“君臣上下，父子兄弟，非禮不定”，體現出禮制對於身份關係和社會秩序的規範作用。 <a class=\"fnback\" href=\"#fnref-12\">↩</a>",
            "《禮記·曲禮上》：“刑不上大夫，禮不下庶人。”關於這一命題的具體含義，學界存在不同解釋。本文將其主要作為理解先秦禮法制度身份差序特徵的材料，而不將其簡單理解為貴族完全不受法律約束、庶人完全不受禮制規範。 <a class=\"fnback\" href=\"#fnref-13\">↩</a>",
            "《唐律疏議》卷一《名例律》載有“八議”制度，對具有特定身份的皇親、貴族及功臣等犯罪者規定了特殊的司法程序。這說明傳統法律並非簡單將特定身份者排除在法律之外，而是根據身份實行差別化的法律制度。 <a class=\"fnback\" href=\"#fnref-14\">↩</a>",
          ],
        },
      ]
    },
    {
      id: "post-4",
      date: "2026-09-11",
      category: "Law & Society",
      tags: ["Law & Society", "Political Economy", "Governance", "Institutions",
             "Law", "Political Philosophy", "Academic Writing", "Duke Kunshan University"],
      title: "Beyond Institutions: Who Will Restrain Power?",
      excerpt: "I'm pleased to share my latest article published as part of the ILMS Law & Society Series IV at Duke Kunshan University.",
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
          "The full piece is available here: <a href=\"https://mp.weixin.qq.com/s/QBh2dBbZnnqm-784HTGJ8w\" target=\"_blank\" rel=\"noopener\">Read the full article →</a>"
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
      body: [
        { h: "第一節小標題", p: ["段落內容待上傳。", "第二段內容。"] }
      ]
    },
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
