import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/* -------------------------------------------
   Small helpers
--------------------------------------------*/
const Pill = ({ children }) => (
  <div className="flex justify-center mb-8">
    <span
      className="inline-flex items-center gap-2 px-6 py-2 rounded-full
                 border-2 border-teal bg-navy/70 backdrop-blur
                 text-[12px] tracking-[0.25em] uppercase"
    >
      {children}
    </span>
  </div>
);

/* Keep disc 48x48 and logo ~44px inside so icons are larger */
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

/* -------------------------------------------
   Skills data (filenames must exist in /public)
--------------------------------------------*/
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

/* -------------------------------------------
   Projects
   (images must exist in /public/projects)
--------------------------------------------*/
const PROJECTS = [
  {
    num: "01",
    title: "DQ-AI — Data Quality Auditor",
    tagLine:
      "A free web app that speeds up data cleaning. Upload a CSV/XLSX, hit Run Audit, and get a structured HTML report showing missing values, duplicates, outliers, invalid emails/postcodes, rare categories, type drift, and more.",
    built: "Python, Dash, Pandas, Plotly",
    focus: "Data cleaning, quality assurance",
    images: ["/projects/dqai.png"], // image (we dropped live embed for mobile reliability)
    buttons: [{ label: "Open App", href: "https://dq-ai.onrender.com/" }],
  },
  {
    num: "02",
    title: "Logistics Performance Dashboard",
    tagLine:
      "An advanced logistics dashboard featuring a Python-powered recommendation tool. Analyses historical shipment data to recommend the most efficient carriers per route.",
    built: "Power BI, Python, DAX",
    focus: "KPI design, routing recommendations, stakeholder reporting",
    images: ["/projects/logistics.png", "/projects/logistics-2.png"],
  },
  {
    num: "03",
    title: "Automated Sales Report Generator",
    tagLine:
      "A Python script that automates the analysis workflow: load raw sales data, clean it, generate visuals, build a SARIMA forecast, and export a multi-page PDF report.",
    built: "Python, Pandas, Matplotlib, Statsmodels",
    focus: "Automation, forecasting, reproducible reporting",
    images: [
      "/projects/sales-report.png",
      "/projects/sales-report2.png",
      "/projects/sales-report3.png",
    ],
    buttons: [
      {
        label: "View on GitHub",
        href: "https://github.com/Shanlw440/Python-pdf",
      },
    ],
  },
  {
    num: "04",
    title: "SQL Customer Churn Analysis",
    tagLine:
      "A SQL deep-dive into telecom churn. Segments customers by contract type, services, and tenure to flag high-risk groups and build churn profiles for strategy.",
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

/* -------------------------------------------
   Certificates
   pngs show as thumbnails; pdfs are link buttons.
--------------------------------------------*/
const CERTS = [
  { type: "img", src: "/certificates/excel.png", alt: "Excel" },
  { type: "img", src: "/certificates/Excel_CodeCademy.png", alt: "Excel (Codecademy)" },
  { type: "img", src: "/certificates/powerbi.png", alt: "Power BI" },
  { type: "pdf", href: "/certificates/Powerbi.pdf", label: "Power BI (PDF)" },
  { type: "img", src: "/certificates/python.png", alt: "Python" },
  { type: "img", src: "/certificates/pythonda.png", alt: "Python for Data Analysis (img)" },
  { type: "pdf", href: "/certificates/Python_Essentials.pdf", label: "Python Essentials (PDF)" },
  { type: "pdf", href: "/certificates/Python_for_Data_Analysis.pdf", label: "Python for Data Analysis (PDF)" },
  { type: "img", src: "/certificates/SQL.png", alt: "SQL" },
  { type: "img", src: "/certificates/sql1.png", alt: "SQL (2)" },
  { type: "img", src: "/certificates/stats.png", alt: "Statistics" },
  { type: "img", src: "/certificates/tableau.png", alt: "Tableau" },
  { type: "pdf", href: "/certificates/Tableau.pdf", label: "Tableau (PDF)" },
  { type: "pdf", href: "/certificates/Essential_Statistics.pdf", label: "Essential Statistics (PDF)" },
  { type: "pdf", href: "/certificates/Excel.pdf", label: "Excel (PDF)" },
];

/* -------------------------------------------
   App
--------------------------------------------*/
export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-quart",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <div className="min-h-screen bg-navy text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-navy/95 backdrop-blur border-b border-ink">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex h-16 sm:h-20 items-center justify-between">
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
          {/* two columns from small screens up */}
          <div className="grid sm:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center" data-aos="fade-up">
            {/* LEFT */}
            <div className="relative order-1 sm:order-none">
              <div className="relative inline-block">
                <h1
                  className="font-extrabold leading-[0.9]
                             text-[clamp(46px,10vw,120px)]
                             font-[var(--font-display)] tracking-tight"
                >
                  SHANNON
                  <br />
                  <span className="text-teal">WISE</span>
                </h1>

                {/* badge above NNON */}
                <div className="absolute -top-10 sm:-top-12 right-0 sm:right-[12%]">
                  <span
                    className="px-5 py-2 rounded-full text-[11px] sm:text-[12px] tracking-[0.25em]
                               border-2 border-teal flex gap-1 items-center justify-center
                               bg-navy/70 backdrop-blur"
                  >
                    <span className="text-teal font-bold">DATA ANALYST</span>
                    <span className="text-white font-bold">PORTFOLIO</span>
                  </span>
                </div>
              </div>

              <p className="mt-8 sm:mt-10 text-[clamp(16px,2.2vw,22px)] text-white/80 max-w-2xl text-balance">
                Finding patterns in the noise, one dataset at a time.
              </p>
            </div>

            {/* RIGHT image */}
            <div className="flex justify-center sm:justify-end">
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

      {/* ====================== ABOUT ====================== */}
      <section id="about" className="border-t border-ink/30">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center" data-aos="fade-up">
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
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24" data-aos="fade-up">
          <Pill>TECHNICAL SKILLS</Pill>

          {/* 2 columns on small, 4 on large */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 relative">
            {/* Column 1 */}
            <div className="relative">
              <h3 className="text-teal font-extrabold text-3xl font-[var(--font-display)]">Programming</h3>
              <div className="text-white font-extrabold text-3xl font-[var(--font-display)] -mt-1">Languages</div>
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

            {/* Column 2 */}
            <div className="relative">
              <h3 className="text-teal font-extrabold text-3xl font-[var(--font-display)]">Data Analytic</h3>
              <div className="text-white font-extrabold text-3xl font-[var(--font-display)] -mt-1">Tools</div>
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

            {/* Column 3 */}
            <div className="relative">
              <h3 className="text-teal font-extrabold text-3xl font-[var(--font-display)]">Data Visualization</h3>
              <div className="text-white font-extrabold text-3xl font-[var(--font-display)] -mt-1">Tools</div>
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

            {/* Column 4 */}
            <div className="relative">
              <h3 className="text-teal font-extrabold text-3xl font-[var(--font-display)]">Data Analytic</h3>
              <div className="text-white font-extrabold text-3xl font-[var(--font-display)] -mt-1">Methods</div>
              <div className="mt-8 space-y-2.5 text-white/90 text-[15px]">
                {METHODS.map((m) => (
                  <div key={m}>{m}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Extras */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up">
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
          <Pill>NOTABLE PROJECTS</Pill>

          <div className="space-y-20">
            {PROJECTS.map((p) => (
              <article key={p.num} className="space-y-6" data-aos="fade-up">
                {/* header row */}
                <div className="flex items-baseline gap-4">
                  <div className="text-5xl sm:text-6xl font-extrabold text-white/95">{p.num}</div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[var(--font-display)] font-extrabold text-teal">
                    {p.title}
                  </h3>
                </div>

                {/* images */}
                {p.images?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {p.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={p.title}
                        className="mx-auto w-full rounded-2xl border border-white/10 object-contain
                                   max-w-[980px] sm:max-w-full"
                      />
                    ))}
                  </div>
                )}

                {/* description */}
                <p className="text-white/90 text-lg">{p.tagLine}</p>

                {/* built/focus */}
                <div className="text-white/90">
                  <span className="font-semibold">Built with:</span> {p.built}
                  <span className="mx-2"> | </span>
                  <span className="font-semibold">Focus:</span> {p.focus}
                </div>

                {/* buttons */}
                {p.buttons && p.buttons.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-3">
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
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24" data-aos="fade-up">
          <Pill>CERTIFICATES</Pill>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
            {CERTS.map((c, idx) =>
              c.type === "img" ? (
                <img
                  key={idx}
                  src={c.src}
                  alt={c.alt || "Certificate"}
                  className="w-full max-w-[220px] rounded-xl border border-white/10 object-contain"
                />
              ) : (
                <a
                  key={idx}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full max-w-[220px] rounded-xl border border-white/10 p-4 text-center
                             hover:bg-white/5 transition"
                >
                  {c.label || "View PDF"}
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* ====================== CONTACT ====================== */}
      <section id="contact" className="border-t border-ink/30">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24" data-aos="fade-up">
          <Pill>CONTACT</Pill>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h3 className="text-[clamp(28px,5.5vw,56px)] font-[var(--font-display)] font-extrabold leading-tight">
                Let’s <span className="text-teal">connect</span> and
                <br />
                <span className="text-teal">work together</span>!
              </h3>
              <p className="text-white/85 text-lg">
                Open to freelance and collaboration—drop me a line and let’s build something useful.
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-teal/20 flex items-center justify-center">✉️</span>
                  <a href="mailto:s.wise11@hotmail.co.uk" className="hover:text-teal">
                    s.wise11@hotmail.co.uk
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-teal/20 flex items-center justify-center">in</span>
                  <a
                    href="https://www.linkedin.com/in/shannonwise95"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-teal"
                  >
                    linkedin.com/in/shannonwise95
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.02]">
              <p className="text-white/80">
                Prefer email? I usually reply within a day. If you’d like a quick chat, send a note with a couple of
                time slots and I’ll share a calendar link.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
