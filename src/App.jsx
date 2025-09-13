import React from "react";

/* ---- Icon disc: keep disc 48x48, force logo 44x44 ---- */
function IconDiscImg({ src, alt = "" }) {
  return (
    <span className="shrink-0 w-12 h-12 rounded-full bg-teal flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="w-[44px] h-[44px] object-contain pointer-events-none select-none"
      />
    </span>
  );
}

/* ====================== DATA ====================== */
const LANGUAGES = [
  { label: "SQL", file: "sql.png" },
  { label: "Python", file: "python.png" },
];

const TOOLS = [
  { label: "Excel", file: "excel.png" },
  { label: "Google Sheets", file: "google-sheets.png" },
  { label: "VS Code", file: "vscode.png" },
  { label: "Power Query", file: "power-query.png" },
  { label: "Power Automate", file: "power-automate.png" },
];

const VIZ = [
  { label: "Tableau", file: "tableau.png" },
  { label: "Power BI", file: "powerbi.png" },
  { label: "Looker Studio", file: "looker.png" },
  { label: "Excel (dashboards)", file: "excel.png" },
];

const METHODS = [
  "Exploratory Data Analysis (EDA)",
  "Segmentation / Clustering",
  "Cohort Analysis",
  "Linear Regression",
  "Logistic Regression",
  "A/B Testing",
  "ANOVA & Post-Hoc T-Tests",
  "Time Series Forecasting",
  "Predictive Modelling",
];

const PROJECTS = [
  {
    num: "01",
    title: "DQ-AI — Data Quality Auditor",
    tagLine:
      "A free web app that speeds up data cleaning. Upload a CSV/XLSX, hit Run Audit, and get a structured HTML report showing missing values, duplicates, outliers, invalid emails/postcodes, rare categories, type drift, and more.",
    built: "Python, Dash, Pandas, Plotly",
    focus: "Data cleaning, quality assurance",
    images: ["/projects/dqai.png"],
    buttons: [{ label: "Open App", href: "https://dq-ai.onrender.com/" }],
  },
  {
    num: "02",
    title: "Logistics Performance Dashboard",
    tagLine:
      "An advanced logistics dashboard featuring a Python-powered recommendation tool. Analyses historical shipment data to recommend the most efficient carriers per route.",
    built: "Power BI, Python, DAX",
    focus: "KPI design, routing recommendations, stakeholder reporting",
    images: ["/projects/logistics.png", "/projects/logistics-2.png"], // fixed names
  },
  {
    num: "03",
    title: "Automated Sales Report Generator",
    tagLine:
      "A Python script that automates the analysis workflow: loads raw sales data, cleans it, generates visuals, fits a SARIMA forecast, and exports a multi-page PDF.",
    built: "Python, Pandas, Matplotlib, Statsmodels",
    focus: "Automation, forecasting, reporting",
    images: [
      "/projects/sales-report.png",
      "/projects/sales-report2.png",
      "/projects/sales-report3.png",
    ],
    buttons: [
      { label: "View on GitHub", href: "https://github.com/Shanlw440/Python-pdf" },
    ],
  },
  {
    num: "04",
    title: "SQL Customer Churn Analysis",
    tagLine:
      "A deep-dive into telecom churn. Segments customers by contract type, services, and tenure to flag high-risk groups and build churn profiles for strategy.",
    built: "SQL (SQLite/Postgres)",
    focus: "Churn analysis, segmentation, business storytelling",
    images: ["/projects/churn1.png", "/projects/churn2.png"],
    buttons: [
      {
        label: "View on GitHub",
        href: "https://github.com/Shanlw440/sql-telecom-churn-analysis",
      },
    ],
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-navy text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-navy/95 backdrop-blur border-b border-ink">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            <a href="#home" className="text-2xl font-extrabold tracking-tight">
              Shannon Wise
            </a>
            <nav className="hidden sm:flex items-center gap-12 text-[15px] font-semibold">
              <a href="#about" className="hover:text-teal">About Me</a>
              <a href="#skills" className="hover:text-teal">Skills</a>
              <a href="#projects" className="hover:text-teal">Projects</a>
              <a href="#certificates" className="hover:text-teal">Certificates</a>
              <a href="#contact" className="hover:text-teal">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* ====================== HERO ====================== */}
      <section id="home" aria-label="Intro">
        <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-22 lg:py-28">
          {/* On phone: 1 column but we control order so image shows first.
              From sm+: two columns. */}
          <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 lg:gap-14 items-center">
            {/* RIGHT image becomes FIRST on phones */}
            <div className="order-1 sm:order-2 flex justify-center sm:justify-end">
              <img
                src="/shannon_circle_transparent.png"
                alt="Shannon Wise"
                className="w-[78vw] max-w-[340px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[520px] h-auto
                           drop-shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:-translate-x-2 lg:-translate-x-6"
              />
            </div>

            {/* LEFT text becomes SECOND on phones */}
            <div className="order-2 sm:order-1 relative">
              <div className="relative inline-block">
                <h1
                  className="font-extrabold leading-[0.9]
                             text-[clamp(40px,10vw,120px)]
                             font-[var(--font-display)] tracking-tight"
                >
                  SHANNON
                  <br />
                  <span className="text-teal">WISE</span>
                </h1>

                {/* Badge:
                   - On phone: normal flow, centered below the name with spacing.
                   - From sm+: absolute over the “NNON” like before. */}
                <div className="mt-3 flex justify-center sm:mt-0 sm:block sm:absolute sm:-top-12 sm:right-[12%]">
                  <span
                    className="px-5 py-1.5 rounded-full text-[11px] tracking-[0.25em]
                               border-2 border-teal bg-navy/70 backdrop-blur
                               flex gap-1 items-center justify-center"
                  >
                    <span className="text-teal font-bold">DATA ANALYST</span>
                    <span className="text-white font-bold">PORTFOLIO</span>
                  </span>
                </div>
              </div>

              {/* Tagline centered on phone */}
              <p className="mt-6 sm:mt-10 text-[clamp(16px,2.2vw,22px)] text-white/80 max-w-2xl text-center sm:text-left">
                Finding patterns in the noise, one dataset at a time.
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center pt-8 sm:pt-10 lg:pt-16">
            <span className="animate-bounce text-teal text-3xl" aria-hidden>
              ⌄
            </span>
          </div>
        </div>
      </section>

      {/* ====================== ABOUT ====================== */}
      <section id="about" className="border-t border-ink/30">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex items-center">
              <h2 className="text-[clamp(36px,6.5vw,84px)] leading-[1] font-[var(--font-display)] font-extrabold">
                Hi, I’m <span className="text-teal">Shannon</span>!
              </h2>
            </div>
            <div className="text-[clamp(16px,1.6vw,18px)] leading-snug text-white/85 space-y-4">
              <p>
                I’m a <span className="text-teal">Data Analyst</span> in the
                <span className="text-teal"> telecoms industry</span>, where I transform complex datasets into insights
                that improve operations and strategy. My background spans
                <span className="text-teal"> logistics</span>,
                <span className="text-teal"> supply chain</span>, and
                <span className="text-teal"> sales analytics</span>, giving me the ability to connect data across
                different business functions and uncover the bigger picture.
              </p>
              <p>
                I’m especially interested in how <span className="text-teal">data science</span> and
                <span className="text-teal"> machine learning</span> can be applied to real-world challenges, from
                predicting trends to improving customer experiences. I’ve worked with
                <span className="text-teal"> automation</span>,
                <span className="text-teal"> advanced modelling</span>, and
                <span className="text-teal"> geospatial data</span>, and I’m always exploring ways to make analytics
                more <span className="text-teal">predictive</span>, <span className="text-teal">scalable</span>, and
                <span className="text-teal"> impactful</span>.
              </p>
              <p>
                What drives me is building solutions that people actually use:
                <span className="text-teal"> dashboards</span>,
                <span className="text-teal"> automated workflows</span>, and
                <span className="text-teal"> data products</span> that simplify decision-making and deliver measurable
                value. I’m keen to grow into roles that combine
                <span className="text-teal"> analytical rigour</span> with
                <span className="text-teal"> creative problem-solving</span>, using data not just to explain the past,
                but to shape the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== SKILLS ====================== */}
      <section id="skills" className="border-t border-ink/30">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
          {/* Centered pill with a touch more space on phone */}
          <div className="flex justify-center mb-10">
            <span className="px-6 py-2 rounded-full border-2 border-teal bg-teal/10 text-white font-extrabold tracking-[0.28em] text-xs md:text-sm uppercase">
              Technical Skills
            </span>
          </div>

          {/* On mobile: stacked rows with dividers. On lg+: 4 columns. */}
          <div className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-10">
            {/* Languages */}
            <div className="border-t border-white/15 pt-6 lg:border-0 lg:pt-0">
              <h3 className="text-teal font-extrabold text-3xl font-[var(--font-display)]">Programming</h3>
              <div className="text-white font-extrabold text-3xl font-[var(--font-display)] -mt-1">Languages</div>
              <ul className="mt-6 divide-y divide-white/10">
                {LANGUAGES.map((item) => (
                  <li key={item.label} className="flex items-center gap-4 py-3">
                    <IconDiscImg src={`/icons/${item.file}`} alt={item.label} />
                    <span className="text-lg">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="border-t border-white/15 pt-6 lg:border-0 lg:pt-0">
              <h3 className="text-teal font-extrabold text-3xl font-[var(--font-display)]">Data Analytic</h3>
              <div className="text-white font-extrabold text-3xl font-[var(--font-display)] -mt-1">Tools</div>
              <ul className="mt-6 divide-y divide-white/10">
                {TOOLS.map((item) => (
                  <li key={item.label} className="flex items-center gap-4 py-3">
                    <IconDiscImg src={`/icons/${item.file}`} alt={item.label} />
                    <span className="text-lg">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Viz */}
            <div className="border-t border-white/15 pt-6 lg:border-0 lg:pt-0">
              <h3 className="text-teal font-extrabold text-3xl font-[var(--font-display)]">Data Visualization</h3>
              <div className="text-white font-extrabold text-3xl font-[var(--font-display)] -mt-1">Tools</div>
              <ul className="mt-6 divide-y divide-white/10">
                {VIZ.map((item) => (
                  <li key={item.label} className="flex items-center gap-4 py-3">
                    <IconDiscImg src={`/icons/${item.file}`} alt={item.label} />
                    <span className="text-lg">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Methods */}
            <div className="border-t border-white/15 pt-6 lg:border-0 lg:pt-0">
              <h3 className="text-teal font-extrabold text-3xl font-[var(--font-display)]">Data Analytic</h3>
              <div className="text-white font-extrabold text-3xl font-[var(--font-display)] -mt-1">Methods</div>
              <div className="mt-6 divide-y divide-white/10">
                {METHODS.map((m) => (
                  <div key={m} className="py-2.5 text-white/90 text-[15px]">
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Extras */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-white/15 p-5">
              <div className="text-teal font-[var(--font-display)] font-extrabold text-xl">
                Data Science & ML
              </div>
              <ul className="mt-4 space-y-2 text-white/90">
                <li>scikit-learn (classification, regression, clustering)</li>
                <li>Feature engineering & model evaluation</li>
                <li>Hyperparameter tuning</li>
                <li>NLP basics (text cleaning, keyword extraction)</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/15 p-5">
              <div className="text-teal font-[var(--font-display)] font-extrabold text-xl">
                Data Collection
              </div>
              <ul className="mt-4 space-y-2 text-white/90">
                <li>Web scraping (Requests, BeautifulSoup, Selenium)</li>
                <li>APIs (REST/JSON, auth, pagination)</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/15 p-5">
              <div className="text-teal font-[var(--font-display)] font-extrabold text-xl">
                Databases & Platforms
              </div>
              <ul className="mt-4 space-y-2 text-white/90">
                <li>PostgreSQL / SQL Server</li>
                <li>Snowflake</li>
                <li>SharePoint / OneDrive data sources</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/15 p-5">
              <div className="text-teal font-[var(--font-display)] font-extrabold text-xl">
                Workflow & Collaboration
              </div>
              <ul className="mt-4 space-y-2 text-white/90">
                <li>Git & GitHub</li>
                <li>Jupyter / Notebooks</li>
                <li>Documentation & reproducibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== PROJECTS ====================== */}
      <section id="projects" className="border-t border-ink/30">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
          {/* Pill */}
          <div className="mb-10 flex justify-center">
            <span className="px-6 py-2 rounded-full border-2 border-teal text-white font-bold tracking-[0.28em] text-xs md:text-sm uppercase">
              Notable Projects
            </span>
          </div>

          <div className="space-y-20">
            {PROJECTS.map((p) => (
              <article key={p.num} className="space-y-6">
                {/* Number + Title */}
                <h3 className="flex justify-center items-baseline gap-4 font-extrabold text-[28px] md:text-[36px] text-center">
                  <span className="text-white text-4xl md:text-5xl">{p.num}</span>
                  <span className="text-teal uppercase">{p.title}</span>
                </h3>

                {/* Images */}
                {p.images?.length > 0 && (
                  <div className="mt-2 flex flex-wrap justify-center gap-4">
                    {p.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={p.title}
                        className="mx-auto w-full max-w-[980px] sm:max-w-[620px] md:max-w-[760px]
                                   rounded-2xl border border-white/10 object-contain"
                      />
                    ))}
                  </div>
                )}

                {/* Text */}
                <p className="mt-4 text-white/85 text-lg leading-relaxed text-center max-w-3xl mx-auto">
                  {p.tagLine}
                </p>
                <p className="mt-1 text-sm text-white/70 text-center">
                  <span className="font-semibold text-white/90">Built with:</span> {p.built}
                  <span className="mx-2">|</span>
                  <span className="font-semibold text-white/90">Focus:</span> {p.focus}
                </p>

                {/* Buttons */}
                {p.buttons && p.buttons.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-3 justify-center">
                    {p.buttons.map((b) => (
                      <a
                        key={b.href}
                        href={b.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-xl border border-white/20
                                   hover:border-white/40 hover:bg-white/5 transition"
                      >
                        {b.label}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== CERTIFICATES ====================== */}
      <section id="certificates" className="border-t border-ink/30">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24 text-center">
          <div className="mb-10 flex justify-center">
            <span className="px-6 py-2 rounded-full border-2 border-teal bg-teal/10 text-white font-extrabold tracking-[0.28em] text-xs md:text-sm uppercase">
              Certificates
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            <a href="/certificates/Excel.pdf" target="_blank" rel="noopener noreferrer">
              <img src="/certificates/excel.png" alt="Excel Certificate" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
            </a>
            <img src="/certificates/Excel_CodeCademy.png" alt="Excel Codecademy" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
            <a href="/certificates/Powerbi.pdf" target="_blank" rel="noopener noreferrer">
              <img src="/certificates/powerbi.png" alt="Power BI Certificate" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
            </a>
            <img src="/certificates/python.png" alt="Python Certificate" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
            <a href="/certificates/Python_Essentials.pdf" target="_blank" rel="noopener noreferrer">
              <img src="/certificates/pythonda.png" alt="Python Essentials" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
            </a>
            <a href="/certificates/Python_for_Data_Analysis.pdf" target="_blank" rel="noopener noreferrer">
              <img src="/certificates/pythonda.png" alt="Python for Data Analysis" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
            </a>
            <img src="/certificates/SQL.png" alt="SQL Certificate" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
            <img src="/certificates/sql1.png" alt="SQL Certificate 2" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
            <a href="/certificates/Essential_Statistics.pdf" target="_blank" rel="noopener noreferrer">
              <img src="/certificates/stats.png" alt="Statistics Certificate" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
            </a>
            <a href="/certificates/Tableau.pdf" target="_blank" rel="noopener noreferrer">
              <img src="/certificates/tableau.png" alt="Tableau Certificate" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
            </a>
          </div>
        </div>
      </section>

      {/* ====================== CONTACT ====================== */}
      <section id="contact" className="border-t border-ink/30">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
          {/* Pill */}
          <div className="mb-10 flex justify-center">
            <span className="px-6 py-2 rounded-full border-2 border-teal bg-teal/10 text-white font-extrabold tracking-[0.28em] text-xs md:text-sm uppercase">
              Contact
            </span>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left: methods */}
            <div className="space-y-8">
              <a href="mailto:s.wise11@hotmail.co.uk" className="group flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-teal text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
                  </svg>
                </span>
                <div>
                  <div className="text-sm uppercase tracking-widest text-white/60">E-mail</div>
                  <div className="text-lg font-semibold group-hover:text-teal transition">
                    s.wise11@hotmail.co.uk
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/shannonwise95"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4"
              >
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-teal text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5zM.25 8.25h4.5v15.5H.25V8.25zM8.5 8.25h4.312v2.117h.062c.6-1.137 2.062-2.337 4.25-2.337 4.55 0 5.387 2.992 5.387 6.882v8.838h-4.5v-7.83c0-1.867-.033-4.267-2.6-4.267-2.6 0-3 2.03-3 4.127v7.97H8.5V8.25z" />
                  </svg>
                </span>
                <div>
                  <div className="text-sm uppercase tracking-widest text-white/60">LinkedIn</div>
                  <div className="text-lg font-semibold group-hover:text-teal transition">
                    linkedin.com/in/shannonwise95
                  </div>
                </div>
              </a>
            </div>

            {/* Right: slogan */}
            <div className="text-left lg:text-right">
              <h3 className="font-[var(--font-display)] font-extrabold leading-[1.1] text-[clamp(32px,6vw,60px)]">
                <span className="text-white">Let’s </span>
                <span className="text-teal">connect</span>
                <span className="text-white"> and </span>
                <span className="text-teal">work together</span>
                <span className="text-white">!</span>
              </h3>
              <p className="mt-4 text-white/75 text-lg max-w-xl lg:ml-auto">
                Open to <span className="text-teal font-semibold">freelance</span> and short-term
                contract projects—dashboards, automation, and data products that people actually use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
