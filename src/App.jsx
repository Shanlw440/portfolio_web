import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, NavLink, Link, useLocation } from "react-router-dom";

import ShapeGrid from "./components/animations/ShapeGrid";

import PythonTerminal from "./components/animations/PythonTerminal";

import LetterGlitch from "./components/animations/LetterGlitch";



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



/* Helper: responsive image sizing by count (desktop tuned) */

function projectImgClass(count) {

  if (count === 1) return "w-full lg:w-[75%]";        // Project 1 smaller on desktop

  if (count === 2) return "w-full sm:w-[48%] lg:w-[45%]"; // 2 images larger on desktop

  return "w-full sm:w-[48%] lg:w-[30%]";              // 3+ images

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

    title: "DQ-AI: Data Quality Auditor",

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

    images: ["/projects/logistics.png", "/projects/logistics-2.png"],

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

    built: "SQL, Power BI",

    focus: "Retention analytics, churn risk modelling",

    images: ["/projects/churn1.png", "/projects/churn2.png"],

    buttons: [

      {

        label: "View on GitHub",

        href: "https://github.com/Shanlw440/sql-telecom-churn-analysis",

      },

    ],

  },

];





const HOME_DESTINATIONS = [

  { title: "Tools", description: "Apps & automation", to: "/tools", icon: "code" },

  { title: "Projects", description: "Analytics & insights", to: "/projects", icon: "chart" },

  { title: "Experience", description: "Career & expertise", to: "/experience", icon: "briefcase" },

  { title: "CV", description: "Skills & certificates", to: "/cv", icon: "document" },

  { title: "Web Dev", description: "Websites I've built", to: "/web-development", icon: "monitor" },

  { title: "Contact", description: "Let's connect", to: "/contact", icon: "mail" },

];



function HomeNavIcon({ icon }) {

  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

  const content = {

    code: <><path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m14 4-4 16"/></>,

    chart: <><path d="M4 20V12"/><path d="M10 20V5"/><path d="M16 20v-8"/><path d="M22 20V8"/></>,

    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></>,

    document: <><path d="M6 3h8l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5"/><path d="M8 13h7M8 17h7"/></>,

    monitor: <><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 22h8m-4-4v4"/></>,

    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,

  };

  return <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" {...common}>{content[icon]}</svg>;

}



function HomePage() {

  return (

<section id="home" aria-label="Intro" className="relative isolate overflow-hidden bg-[#090713]">

        {/* Visible purple grid beneath the interactive ShapeGrid canvas. */}

        <div

          className="absolute inset-0 z-0 pointer-events-none"

          aria-hidden="true"

          style={{

            backgroundImage: "linear-gradient(rgba(122,64,170,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(122,64,170,0.16) 1px, transparent 1px)",

            backgroundSize: "45px 45px",

            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 80%, transparent 100%)",

            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 80%, transparent 100%)",

          }}

        />

        <div className="absolute inset-0 z-[1]" aria-hidden="true">

          <ShapeGrid

            shape="square" direction="diagonal" lineColor="#21152f"

            hoverColor="#a855f7" hoverFillColor="#7c3aed"

            fillOpacity={0.12} cellSize={45} speed={0.15}

            glow={0.5} trail={0.8} clickCascade rainbow={false}

          />

        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-20 lg:py-32 pointer-events-none">

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">

            <div className="text-center lg:text-left pointer-events-auto">

              <span className="inline-flex rounded-full border border-purple-400/60 px-4 py-2 text-[11px] font-bold tracking-[0.20em] text-purple-300 mb-6">

                DATA · AUTOMATION · INTELLIGENCE

              </span>

              <h1 className="font-extrabold leading-[0.94] text-[clamp(50px,6.8vw,104px)] font-[var(--font-display)] tracking-tight">

                SHANNON<br/><span className="text-[#b276ff]">WISE</span>

              </h1>

              <p className="mt-7 text-[clamp(18px,2vw,23px)] text-purple-100 font-medium">

                Data Analyst. Automation Builder. Problem Solver.

              </p>

              <p className="mt-4 text-[15px] lg:text-[17px] text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">

                If there's a smarter way to do it, I want to build it.

              </p>

              

            </div>

            <div className="pointer-events-auto w-full min-w-0 flex justify-center lg:justify-end">

              <PythonTerminal />

            </div>

          </div>

          {/* Six dedicated pages: this is navigation, not a page-scrolling menu. */}

          <div className="pointer-events-auto mx-auto mt-16 max-w-6xl border-t border-purple-400/15 pt-10 sm:mt-20">

            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">

              <div>

                <p className="tech-label text-purple-300">01 / NAVIGATION</p>

                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Explore <span className="text-[#b276ff]">the portfolio.</span></h2>

              </div>

              <p className="font-mono text-[11px] tracking-wide text-purple-300/80">SELECT A MODULE_</p>

            </div>

            <nav aria-label="Explore portfolio pages" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">

              {HOME_DESTINATIONS.map((item) => (

                <Link

                  key={item.to}

                  to={item.to}

                  className="group flex min-h-[145px] flex-col items-center justify-center rounded-2xl border border-purple-400/25 bg-[#1a102b]/90 px-3 py-5 text-center shadow-[0_12px_35px_rgba(0,0,0,.18)] transition duration-200 hover:-translate-y-1 hover:border-purple-300/75 hover:bg-[#29163e] hover:shadow-[0_0_35px_rgba(168,85,247,.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 sm:min-h-[165px]"

                >

                  <span className="mb-3 text-purple-300 transition group-hover:text-purple-200"><HomeNavIcon icon={item.icon}/></span>

                  <span className="text-sm font-bold text-white sm:text-base">{item.title} <span aria-hidden="true" className="text-purple-400 opacity-0 transition group-hover:opacity-100">↗</span></span>

                  <span className="mt-1 text-xs text-white/55">{item.description}</span>

                  <span className="mt-2 font-mono text-[10px] text-purple-300/70">{item.to}</span>

                </Link>

              ))}

            </nav>

          </div>

        </div>

      </section>

  );

}



function ToolsPage() {

  return (

<section id="tools" className="relative isolate scroll-mt-20 overflow-hidden border-t border-purple-500/15 bg-[#0b0717]">

        <div className="absolute inset-0 z-0" aria-hidden="true">

          <LetterGlitch

            glitchColors={["#a855f7", "#c084fc", "#67d9f0"]}

            baseColor="#6b528d"

            baseOpacity={0.12}

            glitchAmount={0.22}

            speed={0.5}

            flow={0.4}

            fontSize={13}

            density={0.75}

            centerFade={0.75}

            edgeFade={0.15}

            interactive

            clickEffect="tear"

          />

        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#0b0717]/45 via-[#0b0717]/20 to-[#0b0717]/85" aria-hidden="true" />

        <div className="pointer-events-none relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-24">

          <header className="pointer-events-auto max-w-3xl">

            <p className="tech-label text-purple-300">01 / applications</p>

            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Tools I've <span className="text-purple-400">Built.</span></h2>

            <p className="mt-4 max-w-2xl leading-relaxed text-white/70">Practical applications for cleaner data, faster workflows, and better decisions. Explore what's live now and what's coming next.</p>

            <p className="mt-4 font-mono text-xs text-emerald-300/90">SELECT * FROM tools WHERE status IN ('live', 'building');</p>

          </header>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <article className="pointer-events-auto flex h-full flex-col rounded-2xl border border-purple-400/45 bg-[#180e2b]/95 p-6 shadow-[0_15px_45px_rgba(0,0,0,.25)] backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:border-purple-300/80">

              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-300">● Live application</span>

              <h3 className="mt-4 text-xl font-bold text-white">DQ-AI Data Quality Auditor</h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">Audit CSV and Excel files for missing values, duplicates, outliers and validation issues.</p>

              <p className="mt-5 font-mono text-[11px] text-purple-200/80">Python / Dash / Pandas / Plotly</p>

              <a href="https://dq-ai.onrender.com/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-fit rounded-lg bg-purple-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300">Launch app ↗</a>

            </article>

            {[

              { name: "Spreadsheet Comparison", details: "Compare workbooks, detect changed records and export a clear differences report.", stack: "Python / Pandas / Excel" },

              { name: "GeoInsights", details: "Explore geographic patterns and postcode data through interactive maps.", stack: "Python / GeoPandas / Maps" },

              { name: "SQL Query Lab", details: "Experiment with queries and explore sample datasets directly in your browser.", stack: "SQL / DuckDB / React" },

            ].map((tool) => (

              <article key={tool.name} className="pointer-events-auto flex h-full flex-col rounded-2xl border border-purple-500/25 bg-[#160e27]/95 p-6 backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:border-purple-400/60">

                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-purple-300">◌ Planned build</span>

                <h3 className="mt-4 text-xl font-bold text-white">{tool.name}</h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{tool.details}</p>

                <p className="mt-5 font-mono text-[11px] text-purple-200/80">{tool.stack}</p>

                <span className="mt-4 inline-flex w-fit rounded-lg border border-purple-500/35 px-4 py-3 text-xs font-semibold text-purple-200">In development</span>

              </article>

            ))}

          </div>


        </div>

      </section>

  );

}



function AboutSection() {

  return (

<section id="about" className="border-t border-ink/30">

        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">

          <div className="grid gap-12 lg:grid-cols-2 items-center">

            <div className="flex items-center">

              <h2 className="text-[clamp(36px,6.5vw,84px)] leading-[1] font-[var(--font-display)] font-extrabold text-center lg:text-left">

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

  );

}



function SkillsSection() {

  return (

<section id="skills" className="border-t border-ink/30">

        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">

          {/* Pill */}

          <div className="flex justify-center mb-10">

            <span className="px-6 py-2 rounded-full border-2 border-teal bg-teal/10 text-white font-extrabold tracking-[0.28em] text-xs md:text-sm uppercase">

              Technical Skills

            </span>

          </div>



          {/* Mobile: rows with item dividers; Desktop: column separators */}

          <div className="lg:grid lg:grid-cols-4 lg:gap-10">

            {/* Languages */}

            <div className="border-t border-white/15 pt-6 lg:border-t-0 lg:pt-0 lg:border-r lg:border-white/15">

              <h3 className="text-teal font-extrabold text-3xl font-[var(--font-display)]">Programming</h3>

              <div className="text-white font-extrabold text-3xl font-[var(--font-display)] -mt-1">Languages</div>

              <ul className="mt-6 divide-y divide-white/10 lg:divide-y-0">

                {LANGUAGES.map((item) => (

                  <li key={item.label} className="flex items-center gap-4 py-3 lg:py-2">

                    <IconDiscImg src={`/icons/${item.file}`} alt={item.label} />

                    <span className="text-lg">{item.label}</span>

                  </li>

                ))}

              </ul>

            </div>



            {/* Tools */}

            <div className="border-t border-white/15 pt-6 lg:border-t-0 lg:pt-0 lg:border-r lg:border-white/15">

              <h3 className="text-teal font-extrabold text-3xl font-[var(--font-display)]">Data Analytic</h3>

              <div className="text-white font-extrabold text-3xl font-[var(--font-display)] -mt-1">Tools</div>

              <ul className="mt-6 divide-y divide-white/10 lg:divide-y-0">

                {TOOLS.map((item) => (

                  <li key={item.label} className="flex items-center gap-4 py-3 lg:py-2">

                    <IconDiscImg src={`/icons/${item.file}`} alt={item.label} />

                    <span className="text-lg">{item.label}</span>

                  </li>

                ))}

              </ul>

            </div>



            {/* Viz */}

            <div className="border-t border-white/15 pt-6 lg:border-t-0 lg:pt-0 lg:border-r lg:border-white/15">

              <h3 className="text-teal font-extrabold text-3xl font-[var(--font-display)]">Data Visualization</h3>

              <div className="text-white font-extrabold text-3xl font-[var(--font-display)] -mt-1">Tools</div>

              <ul className="mt-6 divide-y divide-white/10 lg:divide-y-0">

                {VIZ.map((item) => (

                  <li key={item.label} className="flex items-center gap-4 py-3 lg:py-2">

                    <IconDiscImg src={`/icons/${item.file}`} alt={item.label} />

                    <span className="text-lg">{item.label}</span>

                  </li>

                ))}

              </ul>

            </div>



            {/* Methods (no icons) */}

            <div className="border-t border-white/15 pt-6 lg:border-t-0 lg:pt-0">

              <h3 className="text-teal font-extrabold text-3xl font-[var(--font-display)]">Data Analytic</h3>

              <div className="text-white font-extrabold text-3xl font-[var(--font-display)] -mt-1">Methods</div>

              <div className="mt-6 divide-y divide-white/10 lg:divide-y-0">

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

  );

}



/* Project metadata lives separately from the original portfolio records,

   so all existing screenshots and GitHub links are retained. */

const PROJECT_GALLERY = [



  {

    num: "05", title: "Inventory Intelligence & Demand Forecasting",

    category: "Supply Chain", status: "Completed",

    summary: "Inventory / OS: an immersive warehouse explorer and live replenishment laboratory. Stress-test demand, lead times, safety stock and reorder decisions with transparent synthetic data.",

    built: "Interactive JavaScript · Inventory modelling · SVG digital twin", images: ["/projects/inventory-dashboard.png"],
    caseStudy: "/studies/inventory-intelligence/"

  },

  {

    num: "06", title: "Education Attendance & Attainment Insights",

    category: "Education", status: "Completed",

    summary: "Explore attendance patterns, attainment trends and gaps using published education statistics.",

    built: "Interactive JavaScript · DfE open data · Evidence-led storytelling", images: ["/projects/education-dashboard.png"],
    caseStudy: "/studies/attendance-gap/"

  },

  {

    num: "07", title: "NHS Waiting Times Intelligence",

    category: "NHS", status: "Completed",

    summary: "An interactive investigation into England's elective NHS waiting list, the 18-week standard, long waits, and why patient pathways are not individual patients.",

    built: "Interactive JavaScript · NHS England RTT · Evidence-led storytelling", images: ["/projects/nhs-dashboard.png"],
    caseStudy: "/studies/nhs-waiting-times/"

  },

  {

    num: "08", title: "Local Authority Insights",

    category: "Public Sector", status: "Completed",

    summary: "Place Intelligence: an interactive geospatial atlas with selectable local authorities, ONS Census density comparisons, and a hypothetical public service planning lab.",

    built: "Geospatial SVG · Census 2021 · JavaScript modelling", images: ["/projects/local-authority-preview.svg"],
    caseStudy: "/studies/local-authority-insights/"

  },

  {

    num: "09", title: "PokéLab: Snorlax vs Gengar",

    category: "Creative", status: "Completed",

    summary: "A playful Pokémon analytics lab featuring a six-axis radar, species base stat comparisons and your own interactive weighted scouting model.",

    built: "Data storytelling · Interactive SVG · JavaScript", images: ["/projects/pokelab-preview.svg"],
    caseStudy: "/studies/pokelab/"

  },

  ...PROJECTS.filter(project => project.num !== "01").map(project => ({

    ...project,

    category: project.num === "02" ? "Supply Chain": "Commercial",

    status: "Completed",

    summary: project.num === "02"

      ? "Operational KPIs and Python-powered carrier recommendations."

      : project.num === "03"

      ? "Automated reporting, visualisation and time-series forecasting."

      : "SQL segmentation and analysis of customer churn patterns."

  })),

];



const PROJECT_FILTERS = ["All", "Education", "NHS", "Public Sector", "Supply Chain", "Commercial", "Creative"];



function SqlCode({ query, finished }) {

  // Colour syntax without injecting HTML; every token is rendered as React text.

  const tokens = query.split(/(\bSELECT\b|\bFROM\b|\bWHERE\b|\bORDER BY\b|\bIN\b|\bASC\b|'[^']*'|portfolio\.projects)/gi);

  return <code className="block whitespace-pre-wrap break-words font-mono text-[12px] leading-7 sm:text-[14px]">

    {tokens.map((token, index) => {

      let colour = "text-[#e9e1f3]";

      if (/^(SELECT|FROM|WHERE|ORDER BY|IN|ASC)$/i.test(token)) colour = "text-[#c084fc] font-semibold";

      else if (token.startsWith("'")) colour = "text-[#ffc88c]";

      else if (token === "portfolio.projects") colour = "text-[#67d9f0]";

      return <span key={index} className={colour}>{token}</span>;

    })}

    {!finished && <span className="inline-block h-[1em] w-[7px] translate-y-[2px] bg-purple-400 animate-pulse" aria-hidden="true" />}

  </code>;

}



function ProjectsPage() {

  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (!preview) return;
    const dismiss = (event) => { if (event.key === "Escape") setPreview(null); };
    document.addEventListener("keydown", dismiss);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.body.style.overflow = oldOverflow;
    };
  }, [preview]);

  const [sector, setSector] = useState("All");

  const [typed, setTyped] = useState(0);

  const query = `SELECT project_name, sector, technology\nFROM portfolio.projects\n${sector === "All" ? "ORDER BY project_name ASC;": `WHERE sector = '${sector}'\nORDER BY project_name ASC;`}`;

  const visibleProjects = PROJECT_GALLERY.filter(project => sector === "All" || project.category === sector);



  useEffect(() => {

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) { setTyped(query.length); return; }

    setTyped(0);

    let count = 0;

    const timer = window.setInterval(() => {

      count = Math.min(count + 2, query.length);

      setTyped(count);

      if (count === query.length) window.clearInterval(timer);

    }, 22);

    return () => window.clearInterval(timer);

  }, [query]);



  const finished = typed >= query.length;

  return (

    <section id="projects" className="min-h-[calc(100vh-4rem)] bg-[#090713] text-white">

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 sm:py-20">

        <p className="tech-label text-purple-300">02 / DATA INTELLIGENCE</p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-6xl">Selected <span className="text-[#b276ff]">Projects.</span></h1>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-lg">Exploring data-driven solutions across education, healthcare, public services, supply chain and commercial analytics.</p>



        <div className="mt-9 overflow-hidden rounded-2xl border border-purple-500/35 bg-[#11101c] shadow-[0_22px_75px_rgba(0,0,0,.35)]">

          <div className="flex items-center justify-between border-b border-purple-400/15 bg-[#1b1528] px-4 py-3 sm:px-6">

            <div className="flex items-center gap-3"><span className="text-purple-300" aria-hidden="true">▣</span><span className="font-mono text-xs text-purple-200">portfolio.sql</span></div>

            <span className="font-mono text-[10px] tracking-widest text-purple-200/45">SQL EDITOR / READ ONLY</span>

          </div>

          <div className="flex min-h-36 gap-3 px-4 py-5 sm:gap-5 sm:px-6" aria-label="SQL query preview">

            <div aria-hidden="true" className="select-none whitespace-pre-line border-r border-purple-400/15 pr-3 text-right font-mono text-xs leading-7 text-white/25">01{"\n"}02{"\n"}03{"\n"}04</div>

            <div className="min-w-0 flex-1"><SqlCode query={query.slice(0,typed)} finished={finished}/></div>

          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-purple-400/15 px-4 py-3 sm:px-6">

            <span role="status" aria-live="polite" className={`font-mono text-[11px] ${finished ? "text-emerald-300": "text-purple-300"}`}>{finished ? `✓ Query complete · ${visibleProjects.length} ${visibleProjects.length === 1 ? "project": "projects"} found` : "› Executing query..."}</span>

            <span className="font-mono text-[10px] text-purple-300/60">PROJECT RESULTS ↓</span>

          </div>

        </div>



        <div className="mt-9 flex flex-wrap gap-2" role="group" aria-label="Filter projects by sector">

          {PROJECT_FILTERS.map(filter => <button

            key={filter} type="button" aria-pressed={sector === filter} onClick={() => setSector(filter)}

            className={`rounded-lg border px-3 py-2.5 font-mono text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 ${sector === filter ? "border-purple-400 bg-purple-600 text-white": "border-purple-500/30 bg-[#191125] text-purple-100/75 hover:border-purple-400 hover:bg-[#241536]"}`}

          >{filter}</button>)}

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-live="polite">

          {visibleProjects.map(project => <article key={project.num} className="group flex flex-col overflow-hidden rounded-2xl border border-purple-400/25 bg-[#170f25] transition duration-200 hover:-translate-y-1 hover:border-purple-400/70 hover:shadow-[0_20px_50px_rgba(104,44,172,.18)]">

            <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-purple-400/15 bg-[#0d0a17]">

              {project.images.length ? <button type="button" onClick={() => setPreview({src: project.images[0], title: project.title})} className="flex h-full w-full items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-purple-300" aria-label={`Expand ${project.title} image`}><img src={project.images[0]} alt={`${project.title} dashboard image`} loading="lazy" className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-[1.03]"/></button> : <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_center,rgba(118,55,177,.18),transparent_70%)] text-purple-300" aria-hidden="true"><svg viewBox="0 0 150 70" className="w-44 opacity-80" fill="none"><path d="M3 57L29 40L51 47L77 20L103 30L127 10L147 16" stroke="#B77AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 57L29 40L51 47L77 20L103 30L127 10L147 16V70H3Z" fill="#A855F7" fillOpacity=".09"/></svg><span className="font-mono text-xs tracking-widest">PROJECT CONCEPT</span></div>}

              <span className={`absolute right-3 top-3 rounded-md border px-2.5 py-1 font-mono text-[10px] ${project.status === "Completed" ? "border-emerald-400/40 bg-[#0e271f] text-emerald-200": "border-purple-400/35 bg-[#26153a] text-purple-200"}`}>{project.status === "Completed" ? "COMPLETED": "PLANNED"}</span>

            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">

              <div className="font-mono text-[11px] tracking-wide text-purple-300">{project.num} / {project.category.toUpperCase()}</div>

              <h2 className="mt-3 text-xl font-bold leading-snug text-white">{project.title}</h2>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">{project.summary}</p>

              <p className="mt-6 border-t border-white/10 pt-4 font-mono text-xs text-purple-200/80">{project.built}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.caseStudy && <a href={project.caseStudy} className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${project.num === "05" ? "border-lime-300/60 bg-lime-300/15 text-lime-100 hover:bg-lime-300/25" : project.num === "08" ? "border-orange-400/60 bg-orange-400/15 text-orange-100 hover:bg-orange-400/25" : project.num === "09" ? "border-pink-400/60 bg-pink-400/15 text-pink-100 hover:bg-pink-400/25" : project.category === "NHS" ? "border-sky-400/50 bg-sky-400/15 text-sky-100 hover:bg-sky-400/25" : "border-emerald-400/50 bg-emerald-400/15 text-emerald-100 hover:bg-emerald-400/25"}`}>Explore full case study ↗</a>}
                {project.buttons?.map(button => <a key={button.href} href={button.href} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-purple-400/40 px-3 py-2 text-sm font-semibold text-purple-100 hover:bg-purple-500/15">{button.label} ↗</a>)}
                {!project.caseStudy && !project.buttons?.length && <span className="w-fit rounded-lg border border-purple-500/20 px-3 py-2 font-mono text-[11px] text-white/45">Project overview</span>}
              </div>

            </div>

          </article>)}

        </div>


      </div>

      {preview && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-8" role="dialog" aria-modal="true" aria-label={`${preview.title} enlarged image`} onClick={() => setPreview(null)}>
        <div className="relative flex max-h-full w-full max-w-7xl flex-col gap-3" onClick={(event) => event.stopPropagation()}>
          <div className="flex items-center justify-between gap-4 text-white"><h2 className="min-w-0 truncate text-sm font-semibold sm:text-base">{preview.title}</h2><button type="button" onClick={() => setPreview(null)} autoFocus className="shrink-0 rounded-lg border border-purple-400/60 bg-[#22142f] px-4 py-2 text-sm font-semibold hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300" aria-label="Close enlarged image">Close ✕</button></div>
          <img src={preview.src} alt={`${preview.title} enlarged dashboard image`} className="max-h-[80vh] w-full rounded-lg object-contain" />
        </div>
      </div>}
    </section>

  );

}



const CERTIFICATE_ITEMS = [
  { name: 'Excel', image: '/certificates/excel.png', href: '/certificates/Excel.pdf' },
  { name: 'Excel, Codecademy', image: '/certificates/Excel_CodeCademy.png', href: '/certificates/Excel_CodeCademy.png' },
  { name: 'Power BI', image: '/certificates/powerbi.png', href: '/certificates/Powerbi.pdf' },
  { name: 'Python', image: '/certificates/python.png', href: '/certificates/python.png' },
  { name: 'Python Essentials', image: '/certificates/pythonda.png', href: '/certificates/Python_Essentials.pdf' },
  { name: 'Python for Data Analysis', image: '/certificates/pythonda.png', href: '/certificates/Python_for_Data_Analysis.pdf' },
  { name: 'SQL', image: '/certificates/SQL.png', href: '/certificates/SQL.png' },
  { name: 'SQL, additional training', image: '/certificates/sql1.png', href: '/certificates/sql1.png' },
  { name: 'Essential Statistics', image: '/certificates/stats.png', href: '/certificates/Essential_Statistics.pdf' },
  { name: 'Tableau', image: '/certificates/tableau.png', href: '/certificates/Tableau.pdf' },
];

function CertificatesSection() {
  return (
    <section id="certificates" className="relative z-10 scroll-mt-24 border-t border-purple-400/15">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-7 sm:pt-20">
        <p className="tech-label text-purple-300">CERTIFICATIONS / CONTINUOUS LEARNING</p>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Courses & <span className="text-[#b276ff]">certificates.</span></h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">A selection of completed professional development courses.</p>
        <div className="mt-9 grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {CERTIFICATE_ITEMS.map((certificate, index) => (
            <a key={`${certificate.name}-${index}`} href={certificate.href} target="_blank" rel="noopener noreferrer"
              className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-purple-400/40 bg-[#180d2a]/85 p-2.5 shadow-[0_0_16px_rgba(168,85,247,.10)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-[0_0_26px_rgba(168,85,247,.42),0_0_55px_rgba(126,48,210,.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300">
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-white/95">
                <img src={certificate.image} alt={`${certificate.name} certificate preview`} loading="lazy" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]" />
              </div>
              <div className="flex min-h-12 items-center justify-between gap-2 px-1 pt-2.5">
                <span className="text-xs font-semibold leading-4 text-purple-100">{certificate.name}</span>
                <span aria-hidden="true" className="shrink-0 text-purple-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {

  return (

<section id="experience" className="scroll-mt-20 border-t border-purple-500/15 bg-[#100a1e]">

        <div className="mx-auto max-w-6xl px-6 py-20">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-300">04 / Background</p>

          <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Professional <span className="text-purple-400">Experience.</span></h2>

          <p className="mt-4 max-w-2xl text-white/65">Supply chain, commercial analytics, reporting and automation. Detailed case studies and achievements are being prepared for this section.</p>

          <a href="/projects" className="mt-6 inline-block text-sm font-bold text-purple-300 hover:text-purple-200">Explore existing projects ↗</a>

        </div>

      </section>

  );

}



function CVAuroraBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{ background: 'linear-gradient(180deg, #10091d 0%, #090713 32%, #0c0718 67%, #090713 100%)' }}
    >
      <style>{`
        @keyframes cvAuroraDriftOne {
          0%, 100% { transform: translate3d(-8%, -2%, 0) rotate(-13deg) scale(1); }
          50% { transform: translate3d(18%, 9%, 0) rotate(8deg) scale(1.14); }
        }
        @keyframes cvAuroraDriftTwo {
          0%, 100% { transform: translate3d(12%, 4%, 0) rotate(18deg) scale(1.05); }
          50% { transform: translate3d(-16%, -9%, 0) rotate(-8deg) scale(.94); }
        }
        @keyframes cvAuroraDriftThree {
          0%, 100% { transform: translate3d(-10%, 7%, 0) scale(1); }
          50% { transform: translate3d(14%, -10%, 0) scale(1.17); }
        }
        .cv-aurora-one { animation: cvAuroraDriftOne 30s ease-in-out infinite; }
        .cv-aurora-two { animation: cvAuroraDriftTwo 37s ease-in-out infinite; }
        .cv-aurora-three { animation: cvAuroraDriftThree 43s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cv-aurora-one, .cv-aurora-two, .cv-aurora-three { animation: none !important; }
        }
        @media (max-width: 640px) {
          .cv-aurora-one, .cv-aurora-two, .cv-aurora-three { opacity: .65; }
        }
      `}</style>
      <div className="cv-aurora-one absolute -left-[18%] top-[-6%] h-[40%] w-[90%] rounded-full blur-[95px]"
           style={{ background: 'radial-gradient(ellipse, rgba(140,67,217,.25) 0%, rgba(91,38,143,.12) 42%, transparent 72%)' }} />
      <div className="cv-aurora-two absolute -right-[25%] top-[20%] h-[42%] w-[95%] rounded-full blur-[105px]"
           style={{ background: 'radial-gradient(ellipse, rgba(118,43,189,.24) 0%, rgba(170,72,173,.09) 42%, transparent 72%)' }} />
      <div className="cv-aurora-three absolute -left-[25%] top-[50%] h-[43%] w-[95%] rounded-full blur-[110px]"
           style={{ background: 'radial-gradient(ellipse, rgba(122,49,180,.23) 0%, rgba(62,30,120,.1) 44%, transparent 72%)' }} />
      <div className="cv-aurora-one absolute -right-[15%] bottom-[-6%] h-[33%] w-[85%] rounded-full blur-[100px]"
           style={{ background: 'radial-gradient(ellipse, rgba(116,46,184,.20) 0%, rgba(79,34,123,.08) 46%, transparent 73%)', animationDelay: '-15s' }} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,7,19,.30),transparent_45%,rgba(9,7,19,.16))]" />
    </div>
  );
}

function CVSection() {
  const roles = [
    {title: 'Supply Chain Commercial Analyst', company: 'Frontline Group', dates: 'May 2026 to present', points: [
      'Develop Python and Excel-based analytical workflows to consolidate, validate and reconcile large operational and commercial datasets.',
      'Build repeatable reporting and exception-checking processes that reduce manual work and improve confidence in outputs.',
      'Analyse cost, recharge and operational performance information, translating complex findings into practical stakeholder insights.'
    ]},
    {title: 'Field Data Analyst', company: 'CityFibre', dates: 'Mar 2025 to May 2026', points: [
      'Analysed operational and field-service information to support performance reporting and data quality.',
      'Produced KPI reporting and insights to help stakeholders identify issues and prioritise improvements.'
    ]},
    {title: 'Service Operations Manager (Data & Performance)', company: 'Gigaclear', dates: 'Jul 2023 to Feb 2025', points: [
      'Worked across service operations, reporting and performance improvement, using data to support operational decisions.',
      'Developed process improvements and collaborated with stakeholders across teams.'
    ]},
    {title: 'Supply Chain Executive', company: 'Thameen London', dates: 'Apr 2022 to Jul 2023', points: [
      'Supported supply chain planning, operational coordination and performance visibility.'
    ]},
    {title: 'Transport Controller', company: 'ASCO Group', dates: 'Apr 2020 to Mar 2022', points: [
      'Coordinated transport operations and monitored delivery and service performance.'
    ]},
    {title: 'Delivery Performance Coordinator', company: 'Gousto', dates: 'Aug 2018 to Apr 2020', points: [
      'Monitored delivery performance and supported service and logistics improvements.'
    ]}
  ];
  const strengths = [
    {name:'Python & automation',detail:'Pandas, validation, reconciliation and scheduled reporting'},
    {name:'Business intelligence',detail:'Power BI, DAX, data modelling and KPI reporting'},
    {name:'SQL & data',detail:'Querying, joins, data quality and exploratory analysis'},
    {name:'Power Platform',detail:'Power Apps, Power Automate and SharePoint workflows'},
    {name:'Reporting & analysis',detail:'Advanced Excel, Power Query, commercial and operational analysis'},
    {name:'Stakeholder delivery',detail:'Requirement gathering, clear communication and continuous improvement'}
  ];
  const [selected,setSelected] = useState(0);
  return <section id="cv" className="relative z-10 min-h-screen text-white">
    <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-7 sm:py-20">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div><p className="tech-label text-purple-300">04 / PROFESSIONAL PROFILE</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-6xl"><span className="text-[#b276ff]">EXPLORE MY CV</span></h1>
          <p className="mt-4 max-w-2xl text-base text-white/65">A closer look at the experience, technical skills and practical problem-solving behind my work.</p>
        </div>
        <a href="/Shannon_Wise_CV.pdf" download className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-500">↓ Download CV (PDF)</a>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_310px]">
        <div className="rounded-2xl border border-purple-400/25 bg-[#170f25] p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-purple-300">Professional summary</p>
          <h2 className="mt-4 text-2xl font-bold">Shannon Wise</h2>
          <p className="mt-1 text-sm font-semibold text-purple-200">Data Analytics · Business Intelligence · Automation</p>
          <p className="mt-5 leading-7 text-white/75">Supply Chain Commercial Analyst with experience across telecommunications, logistics, supply chain and operational performance. I combine data analysis with hands-on automation and reporting development, using Python, SQL, Power BI, Excel and the Power Platform to turn complex information into practical solutions. I enjoy improving processes, validating data and building reporting that makes decisions easier.</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-purple-200"><a className="hover:underline" href="mailto:s.wise11@hotmail.co.uk">s.wise11@hotmail.co.uk ↗</a><a className="hover:underline" href="https://www.linkedin.com/in/shannonwise95" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a className="hover:underline" href="https://github.com/Shanlw440" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
        </div>
        <div className="rounded-2xl border border-purple-400/25 bg-[#170f25] p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-purple-300">At a glance</p>
          <div className="mt-5 space-y-5"><div><p className="text-sm text-white/45">Current focus</p><p className="mt-1 font-semibold">Analytics & automation</p></div><div><p className="text-sm text-white/45">Experience</p><p className="mt-1 font-semibold">Operations · Telecoms · Supply chain</p></div><div><p className="text-sm text-white/45">Tools</p><p className="mt-1 font-semibold">Python · SQL · Power BI · Power Platform</p></div></div>
        </div>
      </div>
      <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div><p className="font-mono text-xs text-purple-300">CAREER / HISTORY</p><h2 className="mt-2 text-3xl font-bold">Professional <span className="text-[#b276ff]">experience.</span></h2>
          <div className="mt-7 space-y-4 border-l border-purple-400/35 pl-5 sm:pl-7">{roles.map((role,i)=><article key={role.title} className="relative rounded-xl border border-purple-400/20 bg-[#160e25] p-5 before:absolute before:-left-[26px] before:top-7 before:h-2.5 before:w-2.5 before:rounded-full before:bg-purple-400 sm:before:-left-[34px]">
            <p className="font-mono text-[11px] text-purple-300">{role.dates}</p><h3 className="mt-2 text-lg font-bold">{role.title}</h3><p className="mt-1 text-sm text-purple-200">{role.company}</p><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-white/70">{role.points.map(p=><li key={p}>{p}</li>)}</ul>
          </article>)}</div>
        </div>
        <div><p className="font-mono text-xs text-purple-300">CAPABILITIES / EXPLORER</p><h2 className="mt-2 text-3xl font-bold">Technical <span className="text-[#b276ff]">skills.</span></h2>
          <div className="mt-7 space-y-2" role="group" aria-label="Explore technical strengths">{strengths.map((s,i)=><button key={s.name} type="button" onClick={()=>setSelected(i)} aria-pressed={i===selected} className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${i===selected?'border-purple-400 bg-[#322045] text-white':'border-purple-400/20 bg-[#180f27] text-white/75 hover:border-purple-400/60'}`}>{s.name}</button>)}</div>
          <div className="mt-4 rounded-xl border border-purple-400/30 bg-[#0d0a17] p-5"><p className="font-mono text-xs text-emerald-300">✓ SKILL PROFILE LOADED</p><h3 className="mt-3 font-bold">{strengths[selected].name}</h3><p className="mt-2 text-sm leading-6 text-white/70">{strengths[selected].detail}</p></div>
          <div className="mt-9 rounded-xl border border-purple-400/20 bg-[#170f25] p-5"><h3 className="text-lg font-bold">Education & training</h3><p className="mt-3 text-sm font-semibold">BA (Hons), Performing Arts</p><p className="mt-1 text-sm text-white/65">Canterbury Christ Church University</p><p className="mt-4 text-sm leading-7 text-white/70">Professional training includes SQL, Excel, Python for Data Analysis, Power BI, Tableau and statistics.</p><Link to="/cv#certificates" className="mt-4 inline-block text-sm font-semibold text-purple-300 hover:text-purple-200">View certificates ↓</Link></div>
        </div>
      </div>
      <p className="mt-10 text-xs text-white/45">This public profile summarises responsibilities and transferable skills. Detailed internal business information is excluded.</p>
    </div>
  </section>;
}

const WEBDEV_SNIPPETS = {
  profile: [
    ['keyword', 'const'], ['plain', ' developer = {'],
    ['key', '  name'], ['plain', ': '], ['string', '"Shannon Wise"'], ['plain', ','],
    ['key', '  approach'], ['plain', ': '], ['string', '"Practical, thoughtful, mobile-first"'], ['plain', ','],
    ['key', '  interests'], ['plain', ': ['], ['string', '"Websites"'], ['plain', ', '], ['string', '"Apps"'], ['plain', ', '], ['string', '"Automation"'], ['plain', ']'],
    ['plain', '};']
  ],
  toolkit: [
    ['keyword', 'const'], ['plain', ' toolkit = {'],
    ['key', '  frontEnd'], ['plain', ': ['], ['string', '"React"'], ['plain', ', '], ['string', '"JavaScript"'], ['plain', ', '], ['string', '"Tailwind CSS"'], ['plain', '],'],
    ['key', '  analytics'], ['plain', ': ['], ['string', '"Python"'], ['plain', ', '], ['string', '"SQL"'], ['plain', ', '], ['string', '"Power BI"'], ['plain', '],'],
    ['key', '  workflow'], ['plain', ': '], ['string', '"Design → Build → Test → Improve"'],
    ['plain', '};']
  ],
  philosophy: [
    ['keyword', 'function'], ['plain', ' buildBetter(idea) {'],
    ['keyword', '  const'], ['plain', ' solution = understand(idea);'],
    ['plain', '  designForPeople(solution);'],
    ['plain', '  testAcrossDevices(solution);'],
    ['keyword', '  return'], ['plain', ' improve(solution);'],
    ['plain', '}']
  ],
};

function DeveloperCodePanel() {
  const [tab, setTab] = useState('profile');
  const previews = {
    profile: ["const developer = {", '  name: "Shannon Wise",', '  approach: "Practical, thoughtful, mobile-first",', '  interests: ["Websites", "Apps", "Automation"]', '};'],
    toolkit: ["const toolkit = {", '  frontEnd: ["React", "JavaScript", "Tailwind CSS"],', '  analytics: ["Python", "SQL", "Power BI"],', '  workflow: "Design → Build → Test → Improve"', '};'],
    philosophy: ['function buildBetter(idea) {', '  const solution = understand(idea);', '  designForPeople(solution);', '  testAcrossDevices(solution);', '  return improve(solution);', '}']
  };
  return <div className="min-w-0 overflow-hidden rounded-2xl border border-purple-400/35 bg-[#0e0b1a] shadow-[0_22px_70px_rgba(41,14,76,.42)]">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-400/20 bg-[#21142f] px-4 py-3">
      <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-400/75"/><span className="h-2.5 w-2.5 rounded-full bg-amber-400/75"/><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/75"/><span className="ml-2 font-mono text-xs text-purple-200">developer.js</span></div>
      <span className="font-mono text-[10px] text-purple-200/50">INTERACTIVE PROFILE</span>
    </div>
    <div className="flex gap-1 overflow-x-auto border-b border-purple-400/15 px-3 py-2" role="group" aria-label="Select developer profile code">
      {Object.keys(previews).map(name => <button key={name} onClick={()=>setTab(name)} aria-pressed={tab===name} className={`rounded-md px-3 py-2 font-mono text-xs capitalize transition ${tab===name?'bg-purple-500/25 text-purple-100':'text-white/55 hover:text-purple-200'}`}>{name}</button>)}
    </div>
    <div className="min-h-[255px] overflow-x-auto px-4 py-6 sm:px-6">
      <div aria-live="polite" className="space-y-1 font-mono text-[11px] leading-7 sm:text-xs">
        {previews[tab].map((line,i)=><div key={`${tab}-${i}`} className="flex gap-4"><span aria-hidden="true" className="w-5 shrink-0 select-none text-right text-purple-200/30">{String(i+1).padStart(2,'0')}</span><span className="whitespace-pre text-[#d7c1ec]">{line}</span></div>)}
      </div>
      <p className="mt-6 font-mono text-[11px] text-emerald-300">✓ ready to build</p>
    </div>
  </div>;
}

function WebCodeParticles() {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const symbols = ['</>', '{}', 'const', '=>', '<div>', 'React', 'CSS', '01', '[]', 'npm', 'JS', '&&'];
    const pointer = { x: -1000, y: -1000 };
    let particles = [];
    let w = 0;
    let h = 0;
    let frame = 0;
    let previous = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.5 : 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 640 ? 12 : Math.min(54, Math.max(20, Math.floor(w * h / 23000)));
      particles = Array.from({ length: count }, (_, i) => ({
        x: (Math.sin(i * 37.19) * 0.5 + 0.5) * w,
        y: (Math.sin(i * 91.73) * 0.5 + 0.5) * h,
        vx: Math.sin(i * 2.7) * 0.16,
        vy: -0.08 - (i % 5) * 0.025,
        glyph: symbols[i % symbols.length],
        size: 11 + (i % 4) * 2,
      }));
    };

    const track = e => { pointer.x = e.clientX; pointer.y = e.clientY; };
    const reset = () => { pointer.x = -1000; pointer.y = -1000; };
    const draw = (now = 0) => {
      if (!reduceMotion && now - previous < 32) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      previous = now;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        const distance = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        const near = distance < 145;
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -30) p.y = h + 30;
          if (p.x < -80) p.x = w + 40;
          if (p.x > w + 80) p.x = -40;
        }
        ctx.font = `${p.size}px ui-monospace, SFMono-Regular, Consolas, monospace`;
        ctx.fillStyle = near
          ? `rgba(190, 135, 255, ${0.32 + 0.34 * (1 - distance / 145)})`
          : (i % 7 === 0 ? 'rgba(103, 217, 240, 0.18)' : 'rgba(173, 118, 236, 0.15)');
        ctx.fillText(p.glyph, p.x, p.y);
      });
      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', track, { passive: true });
    window.addEventListener('blur', reset);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', track);
      window.removeEventListener('blur', reset);
    };
  }, []);

  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(123,45,190,.16),transparent_55%),radial-gradient(ellipse_at_10%_80%,rgba(76,30,127,.14),transparent_52%)]" />
    <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    <div className="absolute inset-0 bg-[#090713]/15" />
  </div>;
}

function WebDevPage() {
  return <div className="relative min-h-screen overflow-hidden bg-[#090713] text-white">
    <WebCodeParticles />
    <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:py-24">
      <p className="tech-label text-purple-300">05 / WEB DEVELOPMENT</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-6xl">Built for the <span className="text-[#b276ff]">web.</span></h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">I enjoy building websites and digital experiences that are clean, responsive and easy to use. Alongside my analytics work, I develop web skills through personal projects and interactive applications.</p>
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr]">
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-wider text-purple-300">DEVELOPER / PROFILE</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">From a blank page to <span className="text-[#b276ff]">something that actually works.</span></h2>
          <p className="mt-5 leading-7 text-white/70">My work sits at the intersection of analytics, automation and web development. I like understanding the problem first, then making something straightforward, responsive and easy to use.</p>
          <p className="mt-4 leading-7 text-white/70">Explore the code-style profile to see how I think about building websites and applications.</p>
          <div className="mt-7 flex flex-wrap gap-2">{['React', 'JavaScript', 'Tailwind CSS', 'Python', 'UX thinking'].map(t=><span key={t} className="rounded-md border border-purple-400/25 bg-purple-500/10 px-3 py-2 font-mono text-xs text-purple-200">{t}</span>)}</div>
        </div>
        <DeveloperCodePanel />
      </div>
      <div className="mt-20 border-t border-purple-400/20 pt-14">
        <p className="font-mono text-xs text-purple-300">FEATURED / WEBSITE</p>
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Shannon Wise <span className="text-[#b276ff]">Digital.</span></h2>
        <div className="mt-7 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          <article className="overflow-hidden rounded-2xl border border-purple-400/35 bg-[#1a1029]/90">
            <div className="relative flex min-h-[230px] flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_at_45%_45%,rgba(151,75,226,.29),transparent_60%)] p-8 sm:p-10">
              <p className="font-mono text-xs text-purple-300">LIVE WEBSITE / SHANNONWISEDIGITAL.CO.UK</p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Shannon Wise <span className="text-[#b276ff]">Digital</span></h3>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/65">Shannon Wise Digital is a side project where I design and build modern, mobile-friendly websites for small businesses.</p>
              <div className="mt-6"><a className="inline-flex rounded-lg bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-500" href="https://shannonwisedigital.co.uk/" target="_blank" rel="noopener noreferrer">Explore the live website ↗</a></div>
            </div>
          </article>
          <aside className="rounded-2xl border border-purple-400/25 bg-[#170f25]/95 p-6 sm:p-8">
            <p className="font-mono text-xs text-purple-300">DESIGN / APPROACH</p>
            <h3 className="mt-4 text-xl font-bold">Thoughtful, responsive design.</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">Clear navigation, responsive layouts and a straightforward experience for visitors on every screen size.</p>
            <a className="mt-6 inline-block text-sm font-semibold text-purple-300 hover:text-purple-100" href="https://shannonwisedigital.co.uk/" target="_blank" rel="noopener noreferrer">Visit Shannon Wise Digital ↗</a>
          </aside>
        </div>
      </div>
      <div className="mt-14 rounded-2xl border border-purple-400/20 bg-[#140e22]/85 p-6 sm:p-8">
        <p className="font-mono text-xs text-purple-300">ANOTHER BUILD / THIS PORTFOLIO</p>
        <h2 className="mt-3 text-xl font-bold">Shannon Wise Analytics</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">This portfolio is another hands-on web project, bringing together React, interactive interfaces, animations and data-focused storytelling.</p>
        <a href="https://github.com/Shanlw440/portfolio_web" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-semibold text-purple-300 hover:text-purple-100">View the portfolio repository ↗</a>
      </div>
    </div>
  </div>;
}

function ContactPage() {
  const [topic, setTopic] = useState('Something else');
  const [copied, setCopied] = useState(false);
  const email = 's.wise11@hotmail.co.uk';
  const subjects = {
    'Analytics & automation': 'Analytics & automation enquiry',
    'Web development': 'Web development enquiry',
    'Collaboration': 'Collaboration enquiry',
    'Something else': 'Hello Shannon',
  };
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(subjects[topic])}`;
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }
  return (
    <section id="contact" className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-[#090713] text-white">
      <style>{`
        @keyframes contactDrift { 0%,100% { transform:translate3d(0,0,0) scale(1); } 50% { transform:translate3d(5%, -7%, 0) scale(1.12); } }
        @keyframes contactPulse { 0%,100% { opacity:.28; transform:scale(.94); } 50% { opacity:.66; transform:scale(1.06); } }
        @keyframes contactTrace { 0% { stroke-dashoffset:120; opacity:0; } 20%,80% { opacity:.8; } 100% { stroke-dashoffset:0; opacity:0; } }
        .contact-ambient { animation:contactDrift 20s ease-in-out infinite; }
        .contact-halo { animation:contactPulse 7s ease-in-out infinite; transform-origin:center; }
        .contact-trace { stroke-dasharray:15 105; animation:contactTrace 7s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .contact-ambient,.contact-halo,.contact-trace { animation:none!important; } }
      `}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="contact-ambient absolute -left-[25%] top-[0%] h-[780px] w-[850px] rounded-full bg-[radial-gradient(circle,rgba(103,36,174,.21),transparent_70%)] blur-3xl" />
        <div className="contact-ambient absolute -right-[30%] bottom-[-22%] h-[850px] w-[950px] rounded-full bg-[radial-gradient(circle,rgba(125,55,210,.17),transparent_68%)] blur-3xl" style={{ animationDelay:'-10s' }} />
        <div className="absolute inset-0 opacity-[.13]" style={{backgroundImage:'linear-gradient(rgba(179,133,247,.10) 1px, transparent 1px),linear-gradient(90deg,rgba(179,133,247,.10) 1px,transparent 1px)',backgroundSize:'72px 72px',maskImage:'linear-gradient(to bottom,black,transparent 85%)'}} />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
          <div>
            <p className="tech-label text-purple-300">06 / GET IN TOUCH</p>
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">Let's make <span className="text-[#b276ff]">something work.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">Have a project, a question or just want to talk data, automation or web design? Drop me a message.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={mailHref} className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300">Send me an email ↗</a>
              <a href="https://www.linkedin.com/in/shannonwise95" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg border border-purple-400/45 bg-[#1a1128]/60 px-5 py-3 text-sm font-semibold text-purple-100 transition hover:border-purple-300 hover:bg-purple-500/15">Connect on LinkedIn ↗</a>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <a href="https://github.com/Shanlw440" target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-purple-400/25 bg-[#170f25]/80 p-5 transition hover:border-purple-300/70">
                <p className="font-mono text-[11px] tracking-wider text-purple-300">GITHUB / BUILDS</p>
                <p className="mt-2 text-lg font-bold text-white">Explore the code <span className="text-purple-300">↗</span></p>
                <p className="mt-2 text-sm text-white/55">Projects, experiments and repositories.</p>
              </a>
              <a href="https://shannonwisedigital.co.uk/" target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-purple-400/25 bg-[#170f25]/80 p-5 transition hover:border-purple-300/70">
                <p className="font-mono text-[11px] tracking-wider text-purple-300">SIDE PROJECT / WEB DESIGN</p>
                <p className="mt-2 text-lg font-bold text-white">Shannon Wise Digital <span className="text-purple-300">↗</span></p>
                <p className="mt-2 text-sm text-white/55">Mobile-friendly websites for small businesses.</p>
              </a>
            </div>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="contact-halo pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(ellipse,rgba(150,68,235,.17),transparent_68%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-purple-400/40 bg-[#140d23]/95 shadow-[0_25px_75px_rgba(32,10,65,.45)]">
              <div className="flex items-center justify-between border-b border-purple-400/20 bg-[#211431] px-5 py-4">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#ff8c98]"/><span className="h-2.5 w-2.5 rounded-full bg-[#f6ce8a]"/><span className="h-2.5 w-2.5 rounded-full bg-[#8ae8bd]"/><span className="ml-3 font-mono text-xs text-purple-200">contact.request</span></div>
                <span className="font-mono text-[10px] text-emerald-300">● READY</span>
              </div>
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <p className="font-mono text-[11px] tracking-wider text-purple-300">01 / CHOOSE A TOPIC</p>
                <div role="group" aria-label="Choose an email topic" className="mt-4 flex flex-wrap gap-2">
                  {Object.keys(subjects).map(item => <button key={item} type="button" onClick={() => setTopic(item)} aria-pressed={topic === item} className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300 ${topic===item?'border-purple-300 bg-purple-600/55 text-white':'border-purple-400/25 bg-[#20152e] text-white/70 hover:border-purple-300/60'}`}>{item}</button>)}
                </div>
                <div className="my-7 flex items-center justify-center py-2" aria-hidden="true">
                  <svg viewBox="0 0 360 105" className="h-auto w-full max-w-[370px]" fill="none">
                    <circle cx="180" cy="51" r="45" stroke="#9F66DD" strokeOpacity=".20"/><circle cx="180" cy="51" r="28" stroke="#9F66DD" strokeOpacity=".30"/>
                    <path d="M15 51H133M227 51H345" stroke="#A36DE3" strokeOpacity=".35"/>
                    <path d="M15 51H133M227 51H345" className="contact-trace" stroke="#CB9BFF" strokeWidth="2.5" strokeLinecap="round" />
                    <rect x="156" y="28" width="48" height="44" rx="10" fill="#2B1743" stroke="#B77AFF"/>
                    <path d="M163 38L180 51L197 38M162 39V60C162 63 164 65 167 65H193C196 65 198 63 198 60V39" stroke="#DBBCFF" strokeWidth="2" strokeLinejoin="round"/>
                    <circle cx="16" cy="51" r="4" fill="#A575F1"/><circle cx="345" cy="51" r="4" fill="#70D9EB"/>
                  </svg>
                </div>
                <p className="font-mono text-[11px] tracking-wider text-purple-300">02 / OPEN YOUR EMAIL APP</p>
                <div className="mt-3 rounded-lg border border-purple-400/20 bg-[#0e0b19] p-4">
                  <p className="text-[11px] text-white/45">To</p><p className="mt-1 break-all font-mono text-sm text-white/90">{email}</p>
                  <p className="mt-3 text-[11px] text-white/45">Subject</p><p className="mt-1 text-sm text-purple-200">{subjects[topic]}</p>
                </div>
                <a href={mailHref} className="mt-5 flex min-h-12 w-full items-center justify-center rounded-lg bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300">Compose email ↗</a>
                <button type="button" onClick={copyEmail} className="mt-3 min-h-11 w-full rounded-lg border border-purple-400/30 px-4 py-3 text-xs font-semibold text-purple-200 transition hover:border-purple-300/60">{copied ? '✓ Email copied' : 'Copy email address'}</button>
                <p className="mt-4 text-center text-xs leading-5 text-white/40">No account or form needed. This opens your email app.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 border-t border-purple-400/20 pt-7 text-center font-mono text-xs text-purple-200/50">GOOD IDEAS START WITH A CONVERSATION_</div>
      </div>
    </section>
  );
}

const EXPERIENCE_SKILLS = [

  {name:'Python & Automation', code:'python', items:['Data transformation and validation using Pandas','Automated reporting and repeatable workflows','Reconciliation and exception-checking tools']},

  {name:'Power BI & Reporting', code:'powerbi', items:['Dashboards built around operational and commercial KPIs','Data modelling and reporting for decision-makers','Turning complex outputs into understandable insights']},

  {name:'SQL & Data', code:'sql', items:['Querying, joining and organising datasets','Data quality checks and exploratory analysis','Translating business questions into useful analysis']},

  {name:'Power Platform', code:'powerplatform', items:['Power Apps request and approval workflows','SharePoint-backed data capture and role-based experiences','Power Automate process design and notifications']},

];



function AnalyticsWorkflow() {

  const stages = [

    { label: 'Collect', tech: 'Sources', icon: '▤', detail: 'Bring information together' },

    { label: 'Validate', tech: 'Quality', icon: '✓', detail: 'Check what can be trusted' },

    { label: 'Transform', tech: 'Python / SQL', icon: '{}', detail: 'Turn complexity into structure' },

    { label: 'Deliver', tech: 'Insights / Apps', icon: '▥', detail: 'Make results useful' },

  ];

  const [active, setActive] = useState(0);

  useEffect(() => {

    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => setActive(i => (i + 1) % stages.length), 2000);

    return () => window.clearInterval(id);

  }, []);

  return <div className="rounded-2xl border border-purple-400/35 bg-[#130d22]/95 p-5 shadow-[0_20px_80px_rgba(89,36,147,.19)] sm:p-6" aria-label="Analytics workflow demonstration">

    <div className="flex items-center justify-between gap-3 border-b border-purple-400/20 pb-4">

      <span className="font-mono text-[11px] tracking-wider text-purple-200">ANALYTICS / WORKFLOW</span>

      <span className="flex items-center gap-2 font-mono text-[10px] text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse"/>SYSTEM ACTIVE</span>

    </div>

    <div className="mt-6 grid grid-cols-2 gap-3">

      {stages.map((step, i) => <button key={step.label} type="button" onClick={() => setActive(i)} aria-pressed={active === i} className={`relative min-h-[118px] rounded-xl border p-4 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300 ${active === i ? 'border-purple-400 bg-[#302047] shadow-[0_0_25px_rgba(168,85,247,.2)]' : 'border-purple-400/20 bg-[#1b132c] hover:border-purple-400/60'}`}>

        <span className="font-mono text-xs text-purple-300">0{i+1} / {step.icon}</span>

        <span className="mt-3 block text-sm font-semibold text-white">{step.label}</span>

        <span className="mt-1 block font-mono text-[10px] text-purple-200/70">{step.tech}</span>

      </button>)}

    </div>

    <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-purple-400/15"><div className="h-full rounded-full bg-gradient-to-r from-purple-600 via-violet-400 to-cyan-300 transition-[width] duration-700" style={{width: `${(active+1)*25}%`}}/></div>

    <div className="mt-5 rounded-lg border border-emerald-400/15 bg-[#0b101b] px-4 py-3" aria-live="off">

      <p className="font-mono text-[11px] text-emerald-300">✓ {stages[active].label.toUpperCase()} / READY</p>

      <p className="mt-1 text-sm text-white/75">{stages[active].detail}</p>

    </div>

  </div>;

}



function SkillProfile({ selected }) {

  const profiles = {

    python: ['language: "Python"', 'speciality: "Automation"', 'methods: ["Pandas", "Validation", "Reporting"]'],

    powerbi: ['platform: "Power BI"', 'speciality: "Business intelligence"', 'methods: ["DAX", "KPI design", "Data modelling"]'],

    sql: ['language: "SQL"', 'speciality: "Analysis"', 'methods: ["Joins", "Queries", "Quality checks"]'],

    powerplatform: ['platform: "Power Platform"', 'speciality: "Application design"', 'methods: ["Power Apps", "SharePoint", "Automation"]'],

  };

  return <div className="overflow-hidden rounded-xl border border-purple-400/30 bg-[#0d0a17]">

    <div className="flex items-center justify-between border-b border-purple-400/20 bg-[#20152e] px-4 py-3 font-mono text-xs text-purple-200"><span>skills_profile.py</span><span>READ ONLY</span></div>

    <div className="overflow-x-auto p-4 font-mono text-xs leading-7 sm:p-6 sm:text-sm">

      <div className="text-purple-300">profile = {'{'}</div>

      <div className="pl-5 text-cyan-300">skill: <span className="text-amber-200">"{selected.name}"</span>,</div>

      {profiles[selected.code].map((line, i) => <div key={i} className="pl-5 text-cyan-300">{line.split(':')[0]}:<span className="text-amber-200">{line.substring(line.indexOf(':')+1)}</span>{i < 2 ? ',' : ''}</div>)}

      <div className="text-purple-300">{'}'}</div>


    </div>

  </div>;

}



function ExperiencePage() {

  const [skill, setSkill] = useState('python');

  const selected = EXPERIENCE_SKILLS.find(item => item.code === skill);

  return <div className="min-h-[calc(100vh-4rem)] bg-[#090713] text-white">

    <section id="about" className="relative isolate overflow-hidden border-b border-purple-500/15">

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(110,42,170,.14),transparent_65%)]"/>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-7 lg:grid-cols-[1.1fr_.9fr] lg:py-24">

        <div>

          <p className="tech-label text-purple-300">03 / ABOUT ME</p>

          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl">Turning <span className="text-[#b276ff]">“surely there's an easier way”</span> into something that actually works.</h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/75">I'm a Supply Chain Commercial Analyst with a background in operational reporting, commercial analysis and process improvement. My work combines analytics with technical problem-solving, using Python, SQL, Power BI and the Power Platform to turn complex information into practical solutions.</p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">I enjoy creating tools, automations and reports that make work clearer, faster and easier for the people using them. Whether it's improving a process, validating data or building something from scratch, I like work that has a clear purpose and a measurable outcome.</p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">I'm especially interested in environments where data can support better decisions, better services and better experiences for the people affected by them.</p>

          <div className="mt-6 inline-block max-w-full rounded-lg border border-purple-500/30 bg-[#1a1128] px-4 py-3 font-mono text-xs text-emerald-300 sm:text-sm"><span className="text-purple-300">while</span> problem_exists: find_a_better_way()</div>

          <div className="mt-7 flex flex-wrap gap-3"><Link to="/projects" className="rounded-lg bg-purple-600 px-5 py-3 text-sm font-bold hover:bg-purple-500">Explore projects ↗</Link><Link to="/cv" className="rounded-lg border border-purple-500/45 px-5 py-3 text-sm font-semibold text-purple-200 hover:bg-purple-500/10">View CV ↗</Link></div>

        </div>

        <AnalyticsWorkflow/>

      </div>

    </section>

    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:py-20">

      <p className="tech-label text-purple-300">CAREER / TIMELINE</p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Experience in <span className="text-[#b276ff]">practice.</span></h2>

      <p className="mt-3 max-w-2xl text-white/60">Selected responsibilities and capabilities. Confidential employer data and internal processes are not shown.</p>

      <div className="relative mt-9 space-y-5 border-l-2 border-purple-500/40 pl-6 sm:pl-9">

        <article className="rounded-2xl border border-purple-400/30 bg-[#1b112b] p-5 sm:p-7"><p className="font-mono text-xs text-emerald-300">2026 / PRESENT</p><h3 className="mt-2 text-xl font-bold">Supply Chain Commercial Analyst</h3><p className="mt-1 text-sm text-purple-200">Supply chain / commercial analytics</p><p className="mt-3 text-sm leading-relaxed text-white/70">Building reporting, automation and analysis that supports operational and commercial decision-making. Bringing information together from multiple sources, checking data quality and translating business requirements into practical outputs.</p><div className="mt-4 flex flex-wrap gap-2">{['Python automation','Data reconciliation','Reporting','Process improvement'].map(t=><span key={t} className="rounded-md border border-purple-400/25 px-3 py-1 font-mono text-[11px] text-purple-200">{t}</span>)}</div></article>

        <article className="rounded-2xl border border-purple-400/20 bg-[#150e23] p-5 sm:p-7"><p className="font-mono text-xs text-purple-300">EARLIER EXPERIENCE</p><h3 className="mt-2 text-xl font-bold">Data, operations & telecoms</h3><p className="mt-3 text-sm leading-relaxed text-white/70">Experience in operational reporting, data analysis and process improvement, with a focus on understanding business problems and communicating insights.</p><p className="mt-4 text-xs text-white/45">Specific roles and dates to be added after reviewing the final CV.</p></article>

      </div>

    </section>

    <section id="skills" className="border-t border-purple-500/15 bg-[#110a1d]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:py-20"><p className="tech-label text-purple-300">SKILLS / EXPLORER</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Explore my <span className="text-[#b276ff]">toolkit.</span></h2><div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Explore technical skills">{EXPERIENCE_SKILLS.map(item => <button key={item.code} type="button" aria-pressed={skill === item.code} onClick={() => setSkill(item.code)} className={`rounded-lg border px-4 py-3 font-mono text-xs transition ${skill === item.code ? 'border-purple-400 bg-purple-600 text-white' : 'border-purple-500/30 bg-[#1c122e] text-purple-100/80 hover:border-purple-400/70'}`}>{item.name}</button>)}</div><div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><SkillProfile selected={selected}/><div className="rounded-xl border border-purple-400/25 bg-[#1a102b] p-5 sm:p-6"><h3 className="text-xl font-semibold">{selected.name}</h3><p className="mt-2 text-sm text-white/50">Applied experience</p><ul className="mt-5 space-y-4">{selected.items.map(item => <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/80"><span className="text-emerald-300">✓</span>{item}</li>)}</ul></div></div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-7"><div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-purple-400/25 bg-[#1b102b] p-6 sm:p-8"><div><h2 className="text-2xl font-bold">Want the full background?</h2><p className="mt-2 text-sm text-white/65">Explore qualifications and certificates alongside my professional profile.</p></div><Link to="/cv" className="rounded-lg bg-purple-600 px-5 py-3 text-sm font-bold hover:bg-purple-500">Explore my CV ↗</Link></div></section>

  </div>;

}



function CVPage() { return <div className="relative isolate min-h-screen overflow-hidden bg-[#090713]"><CVAuroraBackground/><CVSection/><CertificatesSection/></div>; }

function ScrollManager() {

  const { pathname, hash } = useLocation();

  useEffect(() => {

    if (hash) {

      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());

    } else window.scrollTo(0, 0);

  }, [pathname, hash]);

  return null;

}





const MAIN_LINKS = [

  { label: "Home", href: "/" },

  { label: "Tools", href: "/tools" },

  { label: "Projects", href: "/projects" },

  { label: "Experience", href: "/experience" },

  { label: "CV", href: "/cv" },

  { label: "Web Dev", href: "/web-development" },

];

function Shell() {

  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (

    <div className="min-h-screen bg-[#090713] text-white">

      <ScrollManager />

      <header className="sticky top-0 z-50 border-b border-purple-500/15 bg-[#0b0717]/95 backdrop-blur-xl">

        <div className="mx-auto max-w-7xl px-5 sm:px-7">

          <div className="flex h-16 items-center justify-between gap-4">

            <NavLink to="/" className="shrink-0 text-lg font-extrabold tracking-tight text-white" aria-label="Shannon Wise Analytics home">SW<span className="text-purple-400">.</span><span className="hidden sm:inline text-sm font-semibold tracking-wide ml-2 text-white/80">ANALYTICS</span></NavLink>

            <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main navigation">

              {MAIN_LINKS.map(item => <NavLink key={item.href} to={item.href} end={item.href === '/'} className={({isActive}) => `text-[13px] font-semibold transition hover:text-purple-300 ${isActive ? 'text-purple-300' : 'text-white/70'}`}>{item.label}</NavLink>)}

            </nav>

            <NavLink to="/contact" className="hidden lg:inline-flex rounded-lg border border-purple-500/50 px-4 py-2 text-xs font-bold text-purple-200 transition hover:bg-purple-500/15">Get in touch ↗</NavLink>

            <button type="button" className="lg:hidden inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-purple-400/40 text-purple-200" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button>

          </div>

          {menuOpen && <nav id="mobile-navigation" className="lg:hidden grid grid-cols-2 gap-2 border-t border-purple-500/20 py-4" aria-label="Mobile navigation">

            {MAIN_LINKS.map(item => <NavLink key={item.href} to={item.href} onClick={() => setMenuOpen(false)} className="rounded-lg bg-purple-500/10 px-4 py-3 text-sm font-semibold text-purple-100 hover:bg-purple-500/20">{item.label}</NavLink>)}

            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="rounded-lg bg-purple-500/10 px-4 py-3 text-sm font-semibold text-purple-100">Contact</NavLink>

          </nav>}

        </div>

      </header>

      <main>

        <Routes>

          <Route path="/" element={<HomePage />} />

          <Route path="/tools" element={<ToolsPage />} />

          <Route path="/projects" element={<ProjectsPage />} />

          <Route path="/experience" element={<ExperiencePage />} />

          <Route path="/cv" element={<CVPage />} />

          <Route path="/web-development" element={<WebDevPage />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="*" element={<div className="mx-auto max-w-5xl px-6 py-28"><h1 className="text-4xl font-bold">Page not found.</h1><Link to="/" className="mt-6 inline-block text-purple-300">Return home ↗</Link></div>} />

        </Routes>

      </main>

    </div>

  );

}

export default function App() { return <BrowserRouter><Shell /></BrowserRouter>; }
