import React from "react";

/* ---------------- Icon disc: logo container ---------------- */
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

/* ---------------- Skills data ---------------- */
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

/* ---------------- Projects data ---------------- */
const PROJECTS = [
  {
    num: "01",
    title: "DQ-AI — Data Quality Auditor",
    tagLine:
      "A Streamlit-powered app that audits messy datasets for duplicates, missing values, schema drift, and anomalies.",
    built: "Python, Pandas, Streamlit",
    focus: "Data cleaning automation, anomaly detection",
    images: ["/projects/dqai.png"],
  },
  {
    num: "02",
    title: "Logistics Performance Dashboard",
    tagLine:
      "An advanced logistics dashboard featuring a Python-powered recommendation tool. Analyses historical shipment data to recommend the most efficient carriers per route.",
    built: "Power BI, Python, DAX",
    focus: "KPI design, routing recommendations, stakeholder reporting",
    images: ["/projects/logistics.png", "/projects/logistics-2.png"], // fixed
  },
  {
    num: "03",
    title: "Automated Sales Report Generator",
    tagLine:
      "Python script that converts raw CSV sales data into a styled PDF report, automatically generated and distributed.",
    built: "Python, Pandas, FPDF",
    focus: "Automation, reproducible reporting",
    images: [
      "/projects/sales-report.png",
      "/projects/sales-report2.png",
      "/projects/sales-report3.png",
    ],
    code: "https://github.com/Shanlw440/Python-pdf",
  },
  {
    num: "04",
    title: "SQL Customer Churn Analysis",
    tagLine:
      "SQL-based telecom churn analysis exploring patterns in cancellations. Visualised in Power BI for insights on customer retention.",
    built: "SQL, Power BI",
    focus: "Retention analytics, churn risk modelling",
    images: ["/projects/churn1.png", "/projects/churn2.png"],
    code: "https://github.com/Shanlw440/sql-telecom-churn-analysis",
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

      {/* HERO */}
      <section id="home" aria-label="Intro">
        <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-22 lg:py-28">
          {/* 2 columns from small screens */}
          <div className="flex flex-col sm:flex-row gap-10 lg:gap-14 items-center">
            {/* LEFT: badge + name */}
            <div className="relative order-2 sm:order-1 flex-1">
              <div className="relative inline-block">
                <h1
                  className="font-extrabold leading-[0.9] text-[clamp(46px,10vw,120px)]
                                 font-[var(--font-display)] tracking-tight text-center sm:text-left"
                >
                  SHANNON
                  <br />
                  <span className="text-teal">WISE</span>
                </h1>
                <div className="absolute -top-10 sm:-top-12 right-0 sm:right-[12%]">
                  <span
                    className="px-5 py-2 rounded-full text-[11px] sm:text-[12px] tracking-[0.25em]
                                 border-2 border-teal flex gap-1 items-center justify-center bg-navy/70 backdrop-blur"
                  >
                    <span className="text-teal font-bold">DATA ANALYST</span>
                    <span className="text-white font-bold">PORTFOLIO</span>
                  </span>
                </div>
              </div>
              <p className="mt-8 sm:mt-10 text-[clamp(16px,2.2vw,22px)] text-white/80 max-w-2xl text-balance text-center sm:text-left">
                Finding patterns in the noise, one dataset at a time.
              </p>
            </div>
            {/* RIGHT: portrait */}
            <div className="flex justify-center sm:justify-end order-1 sm:order-2">
              <img
                src="/shannon_circle_transparent.png"
                alt="Shannon Wise"
                className="w-[70vw] max-w-[320px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[520px] h-auto
                               drop-shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:-translate-x-2 lg:-translate-x-6"
              />
            </div>
          </div>
          <div className="flex justify-center pt-8 sm:pt-10 lg:pt-16">
            <span className="animate-bounce text-teal text-3xl" aria-hidden>
              ⌄
            </span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
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
                <span className="text-teal"> machine learning</span> can be applied to real-world challenges...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="border-t border-ink/30">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
          <div className="mb-10 flex justify-center">
            <span className="px-6 py-2 rounded-full border-2 border-teal bg-teal/10 text-white font-extrabold tracking-[0.28em] text-xs md:text-sm uppercase">
              Technical Skills
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-10 relative">
            {/* Languages */}
            <div className="relative">
              <h3 className="text-teal font-extrabold text-3xl">Programming</h3>
              <div className="text-white font-extrabold text-3xl -mt-1">Languages</div>
              <ul className="mt-8 space-y-6">
                {LANGUAGES.map((item) => (
                  <li key={item.label} className="flex items-center gap-4">
                    <IconDiscImg src={`/icons/${item.file}`} alt={item.label} />
                    <span className="text-lg">{item.label}</span>
                  </li>
                ))}
              </ul>
              <div className="hidden lg:block absolute right-[-20px] top-0 bottom-0 w-px bg-white/25" />
            </div>
            {/* Tools */}
            <div className="relative">
              <h3 className="text-teal font-extrabold text-3xl">Data Analytic</h3>
              <div className="text-white font-extrabold text-3xl -mt-1">Tools</div>
              <ul className="mt-8 space-y-6">
                {TOOLS.map((item) => (
                  <li key={item.label} className="flex items-center gap-4">
                    <IconDiscImg src={`/icons/${item.file}`} alt={item.label} />
                    <span className="text-lg">{item.label}</span>
                  </li>
                ))}
              </ul>
              <div className="hidden lg:block absolute right-[-20px] top-0 bottom-0 w-px bg-white/25" />
            </div>
            {/* Viz */}
            <div className="relative">
              <h3 className="text-teal font-extrabold text-3xl">Data Visualization</h3>
              <div className="text-white font-extrabold text-3xl -mt-1">Tools</div>
              <ul className="mt-8 space-y-6">
                {VIZ.map((item) => (
                  <li key={item.label} className="flex items-center gap-4">
                    <IconDiscImg src={`/icons/${item.file}`} alt={item.label} />
                    <span className="text-lg">{item.label}</span>
                  </li>
                ))}
              </ul>
              <div className="hidden lg:block absolute right-[-20px] top-0 bottom-0 w-px bg-white/25" />
            </div>
            {/* Methods */}
            <div className="relative">
              <h3 className="text-teal font-extrabold text-3xl">Data Analytic</h3>
              <div className="text-white font-extrabold text-3xl -mt-1">Methods</div>
              <div className="mt-8 space-y-2.5 text-white/90 text-[15px]">
                {METHODS.map((m) => (
                  <div key={m}>{m}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="border-t border-ink/30">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
          <div className="mb-14 text-center">
            <span className="px-6 py-2 rounded-full border-2 border-teal text-white font-bold tracking-[0.28em] text-xs md:text-sm uppercase">
              Notable Projects
            </span>
          </div>
          <div className="space-y-20">
            {PROJECTS.map((p) => (
              <div key={p.num} className="text-center">
                <h3 className="flex justify-center items-baseline gap-4 font-extrabold text-[28px] md:text-[36px]">
                  <span className="text-white text-4xl md:text-5xl">{p.num}</span>
                  <span className="text-teal uppercase">{p.title}</span>
                </h3>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
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
                <p className="mt-6 text-white/80 max-w-3xl mx-auto">{p.tagLine}</p>
                <p className="mt-2 text-sm text-white/60">
                  <span className="font-semibold text-white">Built with:</span> {p.built}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  <span className="font-semibold text-white">Focus:</span> {p.focus}
                </p>
                {p.code && (
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-4 px-5 py-2 rounded-full border-2 border-teal text-teal hover:bg-teal hover:text-navy transition"
                  >
                    View Code
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
{/* ====================== CERTIFICATES ====================== */}
<section id="certificates" className="border-t border-ink/30">
  <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24 text-center">
    {/* Pill */}
    <div className="mb-10 flex justify-center">
      <span className="px-6 py-2 rounded-full border-2 border-teal bg-teal/10 text-white font-extrabold tracking-[0.28em] text-xs md:text-sm uppercase">
        Certificates
      </span>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
      {/* Excel (PNG links to PDF) */}
      <a href="/certificates/Excel.pdf" target="_blank" rel="noopener noreferrer">
        <img src="/certificates/excel.png" alt="Excel Certificate" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
      </a>

      {/* Excel Codecademy (PNG only) */}
      <img src="/certificates/Excel_CodeCademy.png" alt="Excel Codecademy" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />

      {/* Power BI (PNG links to PDF) */}
      <a href="/certificates/Powerbi.pdf" target="_blank" rel="noopener noreferrer">
        <img src="/certificates/powerbi.png" alt="Power BI Certificate" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
      </a>

      {/* Python (PNG only) */}
      <img src="/certificates/python.png" alt="Python Certificate" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />

      {/* Python Essentials (PNG links to PDF) */}
      <a href="/certificates/Python_Essentials.pdf" target="_blank" rel="noopener noreferrer">
        <img src="/certificates/pythonda.png" alt="Python Essentials" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
      </a>

      {/* Python for Data Analysis (PNG links to PDF) */}
      <a href="/certificates/Python_for_Data_Analysis.pdf" target="_blank" rel="noopener noreferrer">
        <img src="/certificates/pythonda.png" alt="Python for Data Analysis" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
      </a>

      {/* SQL (PNGs only) */}
      <img src="/certificates/SQL.png" alt="SQL Certificate" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
      <img src="/certificates/sql1.png" alt="SQL Certificate 2" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />

      {/* Statistics (PNG links to PDF) */}
      <a href="/certificates/Essential_Statistics.pdf" target="_blank" rel="noopener noreferrer">
        <img src="/certificates/stats.png" alt="Essential Statistics" className="h-40 object-contain rounded-lg shadow-md hover:scale-105 transition" />
      </a>

      {/* Tableau (PNG links to PDF) */}
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
        {/* Email */}
        <a href="mailto:s.wise11@hotmail.co.uk" className="group flex items-center gap-4">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-teal text-white">
            {/* Mail icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"/>
            </svg>
          </span>
          <div>
            <div className="text-sm uppercase tracking-widest text-white/60">E-mail</div>
            <div className="text-lg font-semibold group-hover:text-teal transition">s.wise11@hotmail.co.uk</div>
          </div>
        </a>

        {/* LinkedIn */}
        <a href="https://www.linkedin.com/in/shannonwise95" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-teal text-white">
            {/* LinkedIn icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5zM.25 8.25h4.5v15.5H.25V8.25zM8.5 8.25h4.312v2.117h.062c.6-1.137 2.062-2.337 4.25-2.337 4.55 0 5.387 2.992 5.387 6.882v8.838h-4.5v-7.83c0-1.867-.033-4.267-2.6-4.267-2.6 0-3 2.03-3 4.127v7.97H8.5V8.25z"/>
            </svg>
          </span>
          <div>
            <div className="text-sm uppercase tracking-widest text-white/60">LinkedIn</div>
            <div className="text-lg font-semibold group-hover:text-teal transition">linkedin.com/in/shannonwise95</div>
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
          Open to <span className="text-teal font-semibold">freelance</span> and short-term contracts—dashboards, automation, and data products that people actually use.
        </p>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}