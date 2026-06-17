const docs = [
  { title: "Start Here", path: "START_HERE.md", group: "Today", icon: "GO" },
  { title: "Project README", path: "README.md", group: "Today", icon: "RD" },
  { title: "App README", path: "app/README.md", group: "Today", icon: "AP" },
  { title: "8-Week Recovery Plan", path: "plans/8-week-recovery-plan.md", group: "Plans", icon: "8W" },
  { title: "6-12 Month Roadmap", path: "roadmap/6-12-month-roadmap.md", group: "Plans", icon: "12" },
  { title: "Daily Log: 2026-06-13", path: "logs/daily/2026-06-13.md", group: "Logs", icon: "13" },
  { title: "Daily Log: 2026-06-14", path: "logs/daily/2026-06-14.md", group: "Logs", icon: "14" },
  { title: "Daily Log: 2026-06-15", path: "logs/daily/2026-06-15.md", group: "Logs", icon: "15" },
  { title: "Daily Log: 2026-06-16", path: "logs/daily/2026-06-16.md", group: "Logs", icon: "16" },
  { title: "Today: 2026-06-17", path: "logs/daily/2026-06-17.md", group: "Logs", icon: "17" },
  { title: "Daily Log Template", path: "logs/daily-log-template.md", group: "Logs", icon: "DL" },
  { title: "Weekly Review Template", path: "logs/weekly-review-template.md", group: "Logs", icon: "WR" },
  { title: "Animal Crossing Phrase Bank", path: "vocab/animal-crossing-phrase-bank.md", group: "Vocab", icon: "JP" },
  { title: "Month 1 Checkpoint", path: "checkpoints/month-1.md", group: "Checkpoints", icon: "M1" },
  { title: "Month 2 Checkpoint", path: "checkpoints/month-2.md", group: "Checkpoints", icon: "M2" },
  { title: "Resources", path: "resources/README.md", group: "Resources", icon: "RS" },
  { title: "Kana Cheat Sheet", path: "resources/kana-cheat-sheet.md", group: "Resources", icon: "KA" },
  { title: "Daily Japanese Coach Skill", path: ".codex/skills/daily-japanese-coach/SKILL.md", group: "Resources", icon: "AI" },
];

const weeks = [
  {
    title: "Week 1: Read The Doorways",
    phase: "Foundation",
    test: "Read hiragana-only words in beginner examples, simple labels, game titles, or song titles without romanization.",
    evidence: ["Read a hiragana chart in shuffled order.", "Read 20 short hiragana words.", "Log 10 words that feel game-relevant."],
  },
  {
    title: "Week 2: Survive Japanese UI",
    phase: "Foundation",
    test: "Navigate common Japanese game/app UI words such as セーブ, メニュー, アイテム, スタート, オプション, キャンセル, はい, いいえ.",
    evidence: ["Read shuffled katakana.", "Recognize 20 common UI words.", "Translate 5 short UI prompts with dictionary help."],
  },
  {
    title: "Week 3: Understand Simple Actions",
    phase: "Action reading",
    test: "Understand simple task instructions well enough to know what action is expected.",
    evidence: ["Parse 10 short action sentences.", "Create 15 action vocab entries.", "Explain 5 sentences in plain English."],
  },
  {
    title: "Week 4: Read Tiny Conversations",
    phase: "Conversation",
    test: "Read a short beginner dialogue or villager-style exchange and identify who did what, even when some words need lookup.",
    evidence: ["Read one short dialogue.", "Log 20 useful phrases.", "Write a 3-sentence English summary of what happened in the dialogue."],
  },
  {
    title: "Week 5: Start Animal Crossing With Training Wheels",
    phase: "First gameplay",
    test: "Play 10-15 minutes in Japanese, capture 10 unknown phrases, and understand the purpose of each interaction after lookup.",
    evidence: ["2-3 short Japanese play sessions.", "30 captured words or phrases.", "10 high-value phrases selected for review."],
  },
  {
    title: "Week 6: Handle Daily Island Routines",
    phase: "Routines",
    test: "In Japanese, handle shops, inventory, crafting, catching, selling, and basic announcements with limited lookup.",
    evidence: ["Complete one routine island checklist in Japanese.", "Log repeated phrases instead of every unknown phrase.", "Identify 5 grammar patterns that keep appearing."],
  },
  {
    title: "Week 7: Follow Villager Intent",
    phase: "Villagers",
    test: "When a villager talks to you, usually tell whether they are joking, asking, thanking, offering, inviting, or commenting.",
    evidence: ["10 villager interactions logged.", "Label each by intent.", "Save 10 reusable phrases."],
  },
  {
    title: "Week 8: Play A Real Session",
    phase: "Integrated play",
    test: "Play 30 minutes in Japanese and only pause for lookups that seem important or repeated. Afterwards, write a 5-sentence English summary of what happened and save 10 useful Japanese phrases.",
    evidence: ["One 30-minute Japanese play session.", "5-sentence session summary.", "Month 2 checkpoint completed."],
  },
];

const routineDetails = {
  minimum: "Review kana or vocab for 5-10 minutes, read one tiny sentence, and leave a trace in the log.",
  normal: "Do a 20-30 minute lesson, 10-20 minutes of review, and 10-20 minutes of reading or game prep.",
  stretch: "Do the normal day, then add 15-30 minutes of Animal Crossing or another gentle Japanese reading session.",
};

const state = {
  activeDoc: localStorage.getItem("activeDoc") || "START_HERE.md",
  activeWeek: Number(localStorage.getItem("activeWeek") || 0),
  activeRoutine: localStorage.getItem("activeRoutine") || "normal",
  cache: new Map(),
};

const docNav = document.querySelector("#docNav");
const searchInput = document.querySelector("#searchInput");
const weekSelect = document.querySelector("#weekSelect");
const currentWeekTitle = document.querySelector("#currentWeekTitle");
const weekPhase = document.querySelector("#weekPhase");
const weekTest = document.querySelector("#weekTest");
const weekEvidence = document.querySelector("#weekEvidence");
const routineDetail = document.querySelector("#routineDetail");
const docTitle = document.querySelector("#docTitle");
const rawLink = document.querySelector("#rawLink");
const markdownContent = document.querySelector("#markdownContent");

function init() {
  renderWeekSelect();
  renderWeek();
  renderRoutine();
  renderNav();
  loadDoc(state.activeDoc);
  bindEvents();
}

function bindEvents() {
  searchInput.addEventListener("input", () => renderNav(searchInput.value));
  weekSelect.addEventListener("change", (event) => {
    state.activeWeek = Number(event.target.value);
    localStorage.setItem("activeWeek", String(state.activeWeek));
    renderWeek();
  });

  document.querySelectorAll(".routine-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeRoutine = button.dataset.routine;
      localStorage.setItem("activeRoutine", state.activeRoutine);
      renderRoutine();
    });
  });

  markdownContent.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    const targetDoc = docs.find((doc) => link.getAttribute("href") === `../${doc.path}` || link.getAttribute("href") === doc.path);
    if (targetDoc) {
      event.preventDefault();
      loadDoc(targetDoc.path);
    }
  });
}

function renderWeekSelect() {
  weekSelect.innerHTML = weeks
    .map((week, index) => `<option value="${index}">Week ${index + 1}</option>`)
    .join("");
  weekSelect.value = String(state.activeWeek);
}

function renderWeek() {
  const week = weeks[state.activeWeek] || weeks[0];
  currentWeekTitle.textContent = week.title;
  weekPhase.textContent = week.phase;
  weekTest.textContent = week.test;
  weekEvidence.innerHTML = week.evidence.map((item) => `<div class="evidence-item">${escapeHtml(item)}</div>`).join("");
}

function renderRoutine() {
  document.querySelectorAll(".routine-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.routine === state.activeRoutine);
  });
  routineDetail.textContent = routineDetails[state.activeRoutine];
}

function renderNav(query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredDocs = docs.filter((doc) => {
    if (!normalizedQuery) return true;
    return `${doc.title} ${doc.path} ${doc.group}`.toLowerCase().includes(normalizedQuery);
  });

  if (filteredDocs.length === 0) {
    docNav.innerHTML = `<p class="empty-state">No matching files.</p>`;
    return;
  }

  const groups = filteredDocs.reduce((acc, doc) => {
    acc[doc.group] ||= [];
    acc[doc.group].push(doc);
    return acc;
  }, {});

  docNav.innerHTML = Object.entries(groups)
    .map(([group, groupDocs]) => {
      const buttons = groupDocs
        .map((doc) => `
          <button class="doc-button ${doc.path === state.activeDoc ? "active" : ""}" type="button" data-path="${doc.path}">
            <span class="doc-icon" aria-hidden="true">${doc.icon}</span>
            <span>${doc.title}</span>
          </button>
        `)
        .join("");
      return `<section class="doc-group"><h2 class="doc-group-title">${group}</h2>${buttons}</section>`;
    })
    .join("");

  docNav.querySelectorAll(".doc-button").forEach((button) => {
    button.addEventListener("click", () => loadDoc(button.dataset.path));
  });
}

async function loadDoc(path) {
  const doc = docs.find((item) => item.path === path) || docs[0];
  state.activeDoc = doc.path;
  localStorage.setItem("activeDoc", state.activeDoc);
  renderNav(searchInput.value);

  docTitle.textContent = doc.title;
  rawLink.href = `../${doc.path}`;
  markdownContent.innerHTML = `<p class="empty-state">Loading ${escapeHtml(doc.title)}...</p>`;

  try {
    const markdown = await getMarkdown(doc.path);
    markdownContent.innerHTML = renderMarkdown(markdown);
  } catch (error) {
    markdownContent.innerHTML = `
      <p class="empty-state">
        Could not load ${escapeHtml(doc.path)}. Serve the repo with <code>python3 -m http.server</code> and open <code>/app/</code>.
      </p>
    `;
  }
}

async function getMarkdown(path) {
  if (state.cache.has(path)) return state.cache.get(path);
  const response = await fetch(`../${path}`);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  const markdown = await response.text();
  state.cache.set(path, markdown);
  return markdown;
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      html += `<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`;
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      html += `<h${level}>${renderInline(heading[2])}</h${level}>`;
      i += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i += 1;
      }
      html += `<blockquote>${quoteLines.map(renderInline).join("<br>")}</blockquote>`;
      continue;
    }

    if (isTableStart(lines, i)) {
      const tableLines = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i += 1;
      }
      html += renderTable(tableLines);
      continue;
    }

    if (/^\d+\.\s+/.test(line) || /^-\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const tag = ordered ? "ol" : "ul";
      const items = [];
      const pattern = ordered ? /^\d+\.\s+/ : /^-\s+/;
      while (i < lines.length && pattern.test(lines[i])) {
        items.push(lines[i].replace(pattern, ""));
        i += 1;
      }
      html += `<${tag}>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</${tag}>`;
      continue;
    }

    const paragraph = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("> ") &&
      !lines[i].startsWith("```") &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !/^-\s+/.test(lines[i]) &&
      !isTableStart(lines, i)
    ) {
      paragraph.push(lines[i]);
      i += 1;
    }
    html += `<p>${renderInline(paragraph.join(" "))}</p>`;
  }

  return html;
}

function isTableStart(lines, index) {
  return Boolean(lines[index]?.includes("|") && lines[index + 1]?.match(/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/));
}

function renderTable(lines) {
  const rows = lines
    .filter((line, index) => index !== 1)
    .map((line) => splitTableRow(line));
  const [header, ...body] = rows;

  return `
    <table>
      <thead><tr>${header.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr></thead>
      <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  `;
}

function splitTableRow(line) {
  return line
    .replace(/^\s*\|/, "")
    .replace(/\|\s*$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderInline(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      const normalizedHref = normalizeHref(href);
      return `<a href="${escapeHtml(normalizedHref)}">${label}</a>`;
    });
}

function normalizeHref(href) {
  if (/^https?:\/\//.test(href)) return href;
  if (href.startsWith("../")) return href;

  const matchingDoc = docs.find((doc) => doc.path === href || href.endsWith(doc.path));
  if (matchingDoc) return `../${matchingDoc.path}`;

  return href.startsWith("/") ? href : `../${href}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

init();
