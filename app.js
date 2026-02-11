const FREQUENCY_PER_YEAR = {
  weekly: 52,
  fortnightly: 26,
  monthly: 12,
  quarterly: 4,
  annual: 1,
};

const TAX_BRACKETS_NZ = [
  { limit: 15600, rate: 0.105 },
  { limit: 53500, rate: 0.175 },
  { limit: 78100, rate: 0.3 },
  { limit: 180000, rate: 0.33 },
  { limit: Infinity, rate: 0.39 },
];

const ACC_LEVY_RATE = 0.0167;
const ACC_MAX_EARNINGS = 152790;
const STUDENT_LOAN_THRESHOLD = 24128;
const STUDENT_LOAN_RATE = 0.12;

const CHRISTCHURCH_RATES_ANNUAL = {
  banks_peninsula: 4800,
  burwood: 4050,
  cashmere: 4300,
  central: 4200,
  coastal: 4100,
  fendalton: 4700,
  halswell: 4000,
  harewood: 4450,
  heathcote: 4200,
  hornby: 3950,
  innes: 4050,
  linwood: 3900,
  papanui: 4100,
  riccarton: 4300,
  spreydon: 4150,
  waimairi: 4500,
};

const SUBURB_TO_WARD = {
  central_city: "central",
  addington: "central",
  sydenham: "central",
  st_albans: "innes",
  merivale: "fendalton",
  akaroa: "banks_peninsula",
  lyttelton: "banks_peninsula",
  avondale: "burwood",
  parklands: "coastal",
  new_brighton: "coastal",
  belfast: "harewood",
  northwood: "harewood",
  harewood_suburb: "harewood",
  bryndwr: "waimairi",
  burnside: "waimairi",
  ilam: "riccarton",
  riccarton_suburb: "riccarton",
  cashmere_suburb: "cashmere",
  redcliffs: "heathcote",
  woolston: "linwood",
  linwood_suburb: "linwood",
  shirley: "burwood",
  somerfield: "spreydon",
  spreydon_suburb: "spreydon",
  fendalton_suburb: "fendalton",
  halswell_suburb: "halswell",
  hornby_suburb: "hornby",
  hei_hei: "hornby",
  wigram: "halswell",
  papanui_suburb: "papanui",
};

const WARD_DEFAULT_SUBURB = {
  banks_peninsula: "akaroa",
  burwood: "avondale",
  cashmere: "cashmere_suburb",
  central: "central_city",
  coastal: "new_brighton",
  fendalton: "fendalton_suburb",
  halswell: "halswell_suburb",
  harewood: "harewood_suburb",
  heathcote: "redcliffs",
  hornby: "hornby_suburb",
  innes: "st_albans",
  linwood: "linwood_suburb",
  papanui: "papanui_suburb",
  riccarton: "riccarton_suburb",
  spreydon: "spreydon_suburb",
  waimairi: "burnside",
};

const ONE_OFF_PRESETS = {
  legal: { name: "Legal / Conveyancing", amount: 2500 },
  valuation: { name: "Valuation report", amount: 900 },
  builders: { name: "Builder's report", amount: 750 },
  lim: { name: "LIM report", amount: 350 },
  moving: { name: "Moving costs", amount: 1200 },
  loan_setup: { name: "Loan setup / bank fees", amount: 500 },
  initial_repairs: { name: "Initial repairs / setup", amount: 3000 },
};

const SCENARIO_STORAGE_KEY = "mortgage_model_scenarios_v1";
const DRAFT_STORAGE_KEY = "mortgage_model_draft_v1";

const incomeTableBody = document.getElementById("incomeTableBody");
const costTableBody = document.getElementById("costTableBody");
const oneOffTableBody = document.getElementById("oneOffTableBody");
const resultsNode = document.getElementById("results");
const statusNote = document.getElementById("statusNote");
const riskNote = document.getElementById("riskNote");
const validationNote = document.getElementById("validationNote");
const sensitivityPanel = document.getElementById("sensitivityPanel");
const resultDisplayTabs = [...document.querySelectorAll(".display-tab")];
const costEstimatorNote = document.getElementById("costEstimatorNote");
const oneOffEstimatorNote = document.getElementById("oneOffEstimatorNote");
const oneOffAwarenessTotal = document.getElementById("oneOffAwarenessTotal");

const confirmIncomeBtn = document.getElementById("confirmIncome");
const confirmMortgageBtn = document.getElementById("confirmMortgage");
const confirmCostsBtn = document.getElementById("confirmCosts");
const confirmOneOffBtn = document.getElementById("confirmOneOff");

const scenarioSelect = document.getElementById("scenarioSelect");
const saveScenarioBtn = document.getElementById("saveScenario");
const loadScenarioBtn = document.getElementById("loadScenario");
const deleteScenarioBtn = document.getElementById("deleteScenario");
const copyShareLinkBtn = document.getElementById("copyShareLink");
const scenarioNote = document.getElementById("scenarioNote");

const toggleDetailsBtn = document.getElementById("toggleDetails");
const exportPngBtn = document.getElementById("exportPng");
const incomeBreakdownModal = document.getElementById("incomeBreakdownModal");
const incomeBreakdownBody = document.getElementById("incomeBreakdownBody");
const closeIncomeBreakdownBtn = document.getElementById("closeIncomeBreakdown");
const oneOffPresetSelect = document.getElementById("oneOffPreset");
const shareOneOffSummaryBtn = document.getElementById("shareOneOffSummary");

let resultDisplayMode = "fortnightly";
let showDetails = false;
let lastConfirmedState = null;
let lastRenderPayload = null;
let draftSaveTimer = null;
let depositTouched = false;

const SECTION_IDS = [
  "mortgageSection",
  "incomeSection",
  "costsSection",
  "resultsSection",
  "assumptionsSection",
  "scenariosSection",
  "oneOffSection",
];

initSectionCollapsing();

for (const tab of resultDisplayTabs) {
  tab.addEventListener("click", () => {
    resultDisplayMode = tab.dataset.mode;
    updateDisplayTabs();
    if (lastConfirmedState) {
      renderFromState(lastConfirmedState, { skipValidation: true });
    }
    scheduleDraftSave();
  });
}

document.getElementById("addCostRow").addEventListener("click", () => {
  addCostRow("New Cost", 0, "monthly");
  scheduleDraftSave();
});

document.getElementById("applyAverageCosts").addEventListener("click", () => {
  const state = collectCurrentState();
  applyAverageCostEstimates(state);
  setScenarioNote("Applied NZ average estimates for insurance and utilities.");
  scheduleDraftSave();
});

document.getElementById("addIncomeRow").addEventListener("click", () => {
  addIncomeRow("New Person", 0, 3, false);
  scheduleDraftSave();
});

document.getElementById("addOneOffRow").addEventListener("click", () => {
  addOneOffRow("New One-off Cost", 0);
  scheduleDraftSave();
});

document.getElementById("addOneOffPreset").addEventListener("click", () => {
  addOneOffPresetByKey(oneOffPresetSelect.value);
  scheduleDraftSave();
});

document.getElementById("applyOneOffAverages").addEventListener("click", () => {
  applyCommonOneOffAverages();
  setScenarioNote("Applied common one-off average costs.");
  scheduleDraftSave();
});

shareOneOffSummaryBtn.addEventListener("click", async () => {
  const shared = await shareOneOffSummary();
  if (shared) {
    setScenarioNote("Opened share sheet for one-off summary.");
  } else {
    setScenarioNote("Copied one-off summary to clipboard.");
  }
});

const housePriceInput = document.getElementById("housePrice");
const depositInput = document.getElementById("deposit");

housePriceInput.addEventListener("input", () => {
  if (!depositTouched) {
    const housePrice = parseFloat(housePriceInput.value) || 0;
    depositInput.value = Math.round(housePrice * 0.2);
  }
});

depositInput.addEventListener("input", () => {
  depositTouched = true;
});

incomeTableBody.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.classList.contains("remove-income-row")) return;

  if (target.classList.contains("income-details-btn")) {
    const row = target.closest("tr");
    if (!row) return;
    showIncomeBreakdown(row);
  }
});

closeIncomeBreakdownBtn.addEventListener("click", () => {
  incomeBreakdownModal.classList.add("is-hidden");
});

incomeBreakdownModal.addEventListener("click", (event) => {
  if (event.target === incomeBreakdownModal) {
    incomeBreakdownModal.classList.add("is-hidden");
  }
});

confirmIncomeBtn.addEventListener("click", confirmSectionState);
confirmMortgageBtn.addEventListener("click", confirmSectionState);
confirmCostsBtn.addEventListener("click", confirmSectionState);
confirmOneOffBtn.addEventListener("click", confirmSectionState);

confirmIncomeBtn.addEventListener("click", () => collapseSection("incomeSection", true));
confirmMortgageBtn.addEventListener("click", () => collapseSection("mortgageSection", true));
confirmCostsBtn.addEventListener("click", () => collapseSection("costsSection", true));
confirmOneOffBtn.addEventListener("click", () => collapseSection("oneOffSection", true));

saveScenarioBtn.addEventListener("click", () => {
  const currentState = collectCurrentState();
  if (currentState.housePrice <= 0) {
    setScenarioNote("House price must be greater than 0 before saving scenario.", true);
    return;
  }
  const name = scenarioNameFromHousePrice(currentState.housePrice);

  const scenarios = readScenarioStore();
  scenarios[name] = currentState;
  writeScenarioStore(scenarios);
  refreshScenarioSelect(name);
  setScenarioNote(`Saved scenario: ${name}`);
});

loadScenarioBtn.addEventListener("click", () => {
  const name = scenarioSelect.value;
  if (!name) {
    setScenarioNote("Select a scenario to load.", true);
    return;
  }

  const scenarios = readScenarioStore();
  if (!scenarios[name]) {
    setScenarioNote("Selected scenario is not available.", true);
    return;
  }

  applyState(scenarios[name], { confirm: true });
  setScenarioNote(`Loaded scenario: ${name}`);
});

deleteScenarioBtn.addEventListener("click", () => {
  const name = scenarioSelect.value;
  if (!name) {
    setScenarioNote("Select a scenario to delete.", true);
    return;
  }

  const scenarios = readScenarioStore();
  delete scenarios[name];
  writeScenarioStore(scenarios);
  refreshScenarioSelect();
  setScenarioNote(`Deleted scenario: ${name}`);
});

copyShareLinkBtn.addEventListener("click", async () => {
  try {
    const snapshot = collectCurrentState();
    const encoded = encodeSnapshot(snapshot);
    const baseUrl = window.location.href.split("?")[0];
    const shareUrl = `${baseUrl}?snapshot=${encodeURIComponent(encoded)}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(shareUrl);
    } else {
      window.prompt("Copy this link:", shareUrl);
    }

    setScenarioNote("Share link copied.");
  } catch (_error) {
    setScenarioNote("Could not copy link. Try again.", true);
  }
});

toggleDetailsBtn.addEventListener("click", () => {
  showDetails = !showDetails;
  toggleDetailsBtn.textContent = showDetails ? "Hide Details" : "Show Details";
  if (lastConfirmedState) {
    renderFromState(lastConfirmedState, { skipValidation: true });
  }
  scheduleDraftSave();
});

exportPngBtn.addEventListener("click", async () => {
  if (!lastRenderPayload) {
    setScenarioNote("Confirm your inputs first before exporting.", true);
    return;
  }
  const shared = await exportSummaryImage(lastRenderPayload);
  if (shared) {
    setScenarioNote("Opened iOS share sheet.");
  } else {
    setScenarioNote("Exported summary image.");
  }
});

document.addEventListener("input", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  if (event.target.closest("main")) {
    scheduleDraftSave();
  }
});

document.addEventListener("change", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  if (event.target.closest("main")) {
    scheduleDraftSave();
  }
});

const defaultCosts = [
  ["Electricity", 250, "monthly"],
  ["Council Rates", 4000, "annual"],
  ["Home Insurance", 1800, "annual"],
  ["Contents Insurance", 700, "annual"],
  ["Internet", 95, "monthly"],
  ["Groceries", 250, "weekly"],
  ["Transport", 120, "weekly"],
];

const defaultIncomeRows = [
  ["Person 1", 120000, 3, false],
];

const defaultOneOffCosts = [
  ["Legal / conveyancing", 2500],
  ["Valuation report", 900],
  ["Moving costs", 1200],
];

defaultIncomeRows.forEach((row) => addIncomeRow(...row));
defaultCosts.forEach((row) => addCostRow(...row));
defaultOneOffCosts.forEach((row) => addOneOffRow(...row));
initializeDefaultDeposit();
updateDisplayTabs();
refreshScenarioSelect();

toggleDetailsBtn.textContent = "Show Details";

const snapshotState = loadSnapshotFromUrl();
if (snapshotState) {
  applyState(snapshotState, { confirm: true });
  setScenarioNote("Loaded shared snapshot from link.");
} else {
  const draftState = loadDraftState();
  if (draftState) {
    applyState(draftState, { confirm: true });
    setScenarioNote("Restored auto-saved draft.");
  } else {
    confirmSectionState();
  }
}

function addCostRow(name, amount, frequency) {
  const tr = document.createElement("tr");
  tr.className = "cost-row";
  tr.innerHTML = `
    <td data-label="Cost Name" class="cost-name-cell">
      <div class="cost-name-wrap">
        <span class="cost-name-static">${escapeHtml(name || "Unnamed cost")}</span>
        <input type="text" class="cost-name" value="${escapeHtml(name)}" />
      </div>
    </td>
    <td data-label="Amount (NZD)"><input type="number" class="cost-amount" min="0" step="0.01" value="${amount}" /></td>
    <td data-label="Frequency">
      <select class="cost-frequency">
        <option value="weekly" ${frequency === "weekly" ? "selected" : ""}>Weekly</option>
        <option value="fortnightly" ${frequency === "fortnightly" ? "selected" : ""}>Fortnightly</option>
        <option value="monthly" ${frequency === "monthly" ? "selected" : ""}>Monthly</option>
        <option value="quarterly" ${frequency === "quarterly" ? "selected" : ""}>Quarterly</option>
        <option value="annual" ${frequency === "annual" ? "selected" : ""}>Annual</option>
      </select>
    </td>
    <td class="annualized-cell" data-label="Annualized (NZD)">$0.00</td>
    <td data-label="Actions" class="table-actions">
      <button type="button" class="cost-confirm-btn">Confirm</button>
      <button type="button" class="remove-row">Remove</button>
    </td>
  `;

  tr.querySelector(".remove-row").addEventListener("click", () => {
    tr.remove();
    scheduleDraftSave();
  });

  tr.querySelector(".cost-name").addEventListener("input", () => {
    syncCostRowName(tr);
    scheduleDraftSave();
  });

  tr.querySelector(".cost-confirm-btn").addEventListener("click", () => {
    const collapsed = !tr.classList.contains("is-cost-collapsed");
    setCostRowCollapsed(tr, collapsed);
    scheduleDraftSave();
  });

  tr.querySelector(".cost-name-cell").addEventListener("click", () => {
    if (!tr.classList.contains("is-cost-collapsed")) return;
    setCostRowCollapsed(tr, false);
  });

  costTableBody.appendChild(tr);
}

function initSectionCollapsing() {
  for (const id of SECTION_IDS) {
    const section = document.getElementById(id);
    if (!section) continue;

    let titleBar = section.querySelector(":scope > .row-between");
    if (!(titleBar && titleBar.querySelector("h2"))) {
      const directH2 = section.querySelector(":scope > h2");
      if (!directH2) continue;
      titleBar = document.createElement("div");
      titleBar.className = "row-between section-titlebar";
      directH2.replaceWith(titleBar);
      titleBar.appendChild(directH2);
    } else {
      titleBar.classList.add("section-titlebar");
    }

    if (!titleBar.querySelector(".section-toggle")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "section-toggle";
      btn.textContent = "▾";
      btn.setAttribute("aria-label", "Collapse section");
      btn.addEventListener("click", () => {
        const collapsed = !section.classList.contains("is-collapsed");
        collapseSection(id, collapsed);
      });
      titleBar.appendChild(btn);
    }
  }

  collapseSection("resultsSection", false);
}

function collapseSection(sectionId, collapsed) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.classList.toggle("is-collapsed", collapsed);
  const btn = section.querySelector(".section-toggle");
  if (btn) {
    btn.textContent = collapsed ? "▸" : "▾";
    btn.setAttribute("aria-label", collapsed ? "Expand section" : "Collapse section");
  }
}

function addIncomeRow(name, grossSalary, kiwiSaverPercent, hasStudentLoan) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td data-label="Person"><input type="text" class="income-name" value="${escapeHtml(name)}" /></td>
    <td data-label="Gross Salary (NZD)"><input type="number" class="income-gross" min="0" step="100" value="${grossSalary}" /></td>
    <td data-label="KiwiSaver %">
      <select class="income-kiwisaver">
        <option value="0" ${kiwiSaverPercent === 0 ? "selected" : ""}>0%</option>
        <option value="3" ${kiwiSaverPercent === 3 ? "selected" : ""}>3%</option>
        <option value="4" ${kiwiSaverPercent === 4 ? "selected" : ""}>4%</option>
        <option value="6" ${kiwiSaverPercent === 6 ? "selected" : ""}>6%</option>
        <option value="8" ${kiwiSaverPercent === 8 ? "selected" : ""}>8%</option>
        <option value="10" ${kiwiSaverPercent === 10 ? "selected" : ""}>10%</option>
      </select>
    </td>
    <td data-label="Student Loan"><input type="checkbox" class="income-student-loan" ${hasStudentLoan ? "checked" : ""} /></td>
    <td class="income-net-cell" data-label="After-tax (NZD / year)">$0.00</td>
    <td class="table-actions" data-label="Actions">
      <button type="button" class="income-details-btn">Details</button>
      <button type="button" class="remove-income-row">Remove</button>
    </td>
  `;

  tr.querySelector(".remove-income-row").addEventListener("click", () => {
    tr.remove();
    scheduleDraftSave();
  });

  incomeTableBody.appendChild(tr);
}

function showIncomeBreakdown(row) {
  const name = row.querySelector(".income-name").value || "Person";
  const gross = parseFloat(row.querySelector(".income-gross").value) || 0;
  const kiwiSaverRate = (parseFloat(row.querySelector(".income-kiwisaver").value) || 0) / 100;
  const hasStudentLoan = row.querySelector(".income-student-loan").checked;

  const breakdown = calculateIncomeBreakdown(gross, kiwiSaverRate, hasStudentLoan);
  incomeBreakdownBody.innerHTML = `
    <div class="breakdown-grid">
      <div class="b-label">Person</div><div class="b-value">${escapeHtml(name)}</div>
      <div class="b-label">Gross salary</div><div class="b-value">${escapeHtml(money(breakdown.gross))}</div>
      <div class="b-label">Income tax</div><div class="b-value">${escapeHtml(money(breakdown.incomeTax))}</div>
      <div class="b-label">ACC levy</div><div class="b-value">${escapeHtml(money(breakdown.accLevy))}</div>
      <div class="b-label">Student loan</div><div class="b-value">${escapeHtml(money(breakdown.studentLoan))}</div>
      <div class="b-label">KiwiSaver</div><div class="b-value">${escapeHtml(money(breakdown.kiwiSaver))}</div>
      <div class="b-label b-total">After-tax income</div><div class="b-value b-total">${escapeHtml(money(breakdown.net))}</div>
    </div>
  `;
  incomeBreakdownModal.classList.remove("is-hidden");
}

function calculateIncomeBreakdown(gross, kiwiSaverRate, hasStudentLoan) {
  const incomeTax = calculateProgressiveTax(gross, TAX_BRACKETS_NZ);
  const accLevy = Math.min(gross, ACC_MAX_EARNINGS) * ACC_LEVY_RATE;
  const studentLoan = hasStudentLoan
    ? Math.max(0, gross - STUDENT_LOAN_THRESHOLD) * STUDENT_LOAN_RATE
    : 0;
  const kiwiSaver = gross * kiwiSaverRate;
  const net = gross - incomeTax - accLevy - studentLoan - kiwiSaver;

  return { gross, incomeTax, accLevy, studentLoan, kiwiSaver, net };
}

function addOneOffRow(name, amount) {
  const tr = document.createElement("tr");
  tr.className = "oneoff-row";
  tr.innerHTML = `
    <td data-label="Cost Name" class="oneoff-name-cell">
      <div class="cost-name-wrap">
        <span class="cost-name-static">${escapeHtml(name || "Unnamed one-off")}</span>
        <input type="text" class="oneoff-name" value="${escapeHtml(name)}" />
      </div>
    </td>
    <td data-label="Amount (NZD)"><input type="number" class="oneoff-amount" min="0" step="0.01" value="${amount}" /></td>
    <td data-label="Actions" class="table-actions">
      <button type="button" class="oneoff-confirm-btn">Confirm</button>
      <button type="button" class="remove-oneoff-row">Remove</button>
    </td>
  `;

  tr.querySelector(".remove-oneoff-row").addEventListener("click", () => {
    tr.remove();
    scheduleDraftSave();
  });

  tr.querySelector(".oneoff-name").addEventListener("input", () => {
    syncOneOffRowName(tr);
    scheduleDraftSave();
  });

  tr.querySelector(".oneoff-confirm-btn").addEventListener("click", () => {
    const collapsed = !tr.classList.contains("is-oneoff-collapsed");
    setOneOffRowCollapsed(tr, collapsed);
    scheduleDraftSave();
  });

  tr.querySelector(".oneoff-name-cell").addEventListener("click", () => {
    if (!tr.classList.contains("is-oneoff-collapsed")) return;
    setOneOffRowCollapsed(tr, false);
  });

  oneOffTableBody.appendChild(tr);
}

function syncCostRowName(row) {
  const name = (row.querySelector(".cost-name").value || "").trim();
  row.querySelector(".cost-name-static").textContent = name || "Unnamed cost";
}

function setCostRowCollapsed(row, collapsed) {
  row.classList.toggle("is-cost-collapsed", collapsed);
  const btn = row.querySelector(".cost-confirm-btn");
  if (btn) {
    btn.textContent = collapsed ? "Edit" : "Confirm";
    btn.classList.toggle("is-edit", collapsed);
  }
}

function syncOneOffRowName(row) {
  const name = (row.querySelector(".oneoff-name").value || "").trim();
  row.querySelector(".cost-name-static").textContent = name || "Unnamed one-off";
}

function setOneOffRowCollapsed(row, collapsed) {
  row.classList.toggle("is-oneoff-collapsed", collapsed);
  const btn = row.querySelector(".oneoff-confirm-btn");
  if (btn) {
    btn.textContent = collapsed ? "Edit" : "Confirm";
    btn.classList.toggle("is-edit", collapsed);
  }
}

function upsertOneOffRow(name, amount) {
  const rows = [...oneOffTableBody.querySelectorAll("tr")];
  const match = rows.find((row) => {
    const rowName = (row.querySelector(".oneoff-name").value || "").trim().toLowerCase();
    return rowName === name.trim().toLowerCase();
  });

  if (match) {
    match.querySelector(".oneoff-amount").value = Math.round(amount);
    return;
  }

  addOneOffRow(name, Math.round(amount));
}

function addOneOffPresetByKey(key) {
  const preset = ONE_OFF_PRESETS[key];
  if (!preset) return;
  upsertOneOffRow(preset.name, preset.amount);
  oneOffEstimatorNote.textContent =
    "Preset averages added. These are planning benchmarks only; replace with actual quotes when available.";
}

function applyCommonOneOffAverages() {
  const presetOrder = ["legal", "valuation", "builders", "lim", "moving", "loan_setup", "initial_repairs"];
  for (const key of presetOrder) {
    const preset = ONE_OFF_PRESETS[key];
    upsertOneOffRow(preset.name, preset.amount);
  }
  oneOffEstimatorNote.textContent =
    "Applied common NZ one-off planning averages (legal, valuation, builder's, LIM, moving, loan setup, initial repairs).";
}

async function shareOneOffSummary() {
  const rows = collectRows().oneOffRows;
  const total = rows.reduce((sum, row) => sum + (row.amount || 0), 0);
  const lines = [
    "One-off Purchase Costs Summary",
    ...rows.map((row) => `${row.name || "Item"}: ${money(row.amount || 0)}`),
    `Total: ${money(total)}`,
    "Note: one-off costs are not included in repayment affordability.",
  ];
  const text = lines.join("\n");

  if (navigator.share) {
    try {
      await navigator.share({
        title: "One-off Purchase Costs Summary",
        text,
      });
      return true;
    } catch (_error) {
      // Fall back to clipboard if share is cancelled or unavailable.
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return false;
  }

  window.prompt("Copy one-off summary:", text);
  return false;
}

function clearRows(tbody) {
  tbody.innerHTML = "";
}

function collectRows() {
  const incomeRows = [...incomeTableBody.querySelectorAll("tr")].map((row) => ({
    name: row.querySelector(".income-name").value || "",
    grossSalary: parseFloat(row.querySelector(".income-gross").value) || 0,
    kiwiSaverRate: (parseFloat(row.querySelector(".income-kiwisaver").value) || 0) / 100,
    hasStudentLoan: row.querySelector(".income-student-loan").checked,
  }));

  const costRows = [...costTableBody.querySelectorAll("tr")].map((row) => ({
    name: row.querySelector(".cost-name").value || "",
    amount: parseFloat(row.querySelector(".cost-amount").value) || 0,
    frequency: row.querySelector(".cost-frequency").value || "monthly",
  }));

  const oneOffRows = [...oneOffTableBody.querySelectorAll("tr")].map((row) => ({
    name: row.querySelector(".oneoff-name").value || "",
    amount: parseFloat(row.querySelector(".oneoff-amount").value) || 0,
  }));

  return { incomeRows, costRows, oneOffRows };
}

function applyRows(incomeRows, costRows, oneOffRows) {
  clearRows(incomeTableBody);
  clearRows(costTableBody);
  clearRows(oneOffTableBody);

  for (const row of incomeRows || []) {
    addIncomeRow(row.name || "", row.grossSalary || 0, (row.kiwiSaverRate || 0) * 100, Boolean(row.hasStudentLoan));
  }

  for (const row of costRows || []) {
    addCostRow(row.name || "", row.amount || 0, row.frequency || "monthly");
  }

  for (const row of oneOffRows || []) {
    addOneOffRow(row.name || "", row.amount || 0);
  }

  if (!incomeRows || incomeRows.length === 0) {
    defaultIncomeRows.forEach((row) => addIncomeRow(...row));
  }

  if (!costRows || costRows.length === 0) {
    defaultCosts.forEach((row) => addCostRow(...row));
  }
}

function collectCurrentState() {
  const { incomeRows, costRows, oneOffRows } = collectRows();
  return {
    incomeRows,
    includeRentIncome: document.getElementById("includeRentIncome").checked,
    rentIncomeAmount: num("rentIncomeAmount"),
    rentIncomeFrequency: document.getElementById("rentIncomeFrequency").value,
    housePrice: num("housePrice"),
    deposit: num("deposit"),
    interestRate: num("interestRate") / 100,
    loanTermYears: Math.max(1, num("loanTermYears")),
    repaymentFrequency: document.getElementById("repaymentFrequency").value,
    christchurchArea: document.getElementById("christchurchArea").value,
    resultDisplayMode,
    showDetails,
    occupantCount: Math.max(1, Math.round(num("occupantCount") || 1)),
    hasGasConnection: document.getElementById("hasGasConnection").checked,
    autoEstimateCosts: document.getElementById("autoEstimateCosts").checked,
    costRows,
    oneOffRows,
  };
}

function applyState(state, options = {}) {
  const { confirm = false } = options;
  const normalizedState = normalizeLegacyState(state);

  document.getElementById("includeRentIncome").checked = Boolean(normalizedState.includeRentIncome);
  document.getElementById("rentIncomeAmount").value = normalizedState.rentIncomeAmount ?? 0;
  document.getElementById("rentIncomeFrequency").value = normalizedState.rentIncomeFrequency ?? "weekly";
  document.getElementById("housePrice").value = normalizedState.housePrice ?? 0;
  document.getElementById("deposit").value = normalizedState.deposit ?? 0;
  depositTouched = true;
  document.getElementById("interestRate").value = (normalizedState.interestRate ?? 0) * 100;
  document.getElementById("loanTermYears").value = normalizedState.loanTermYears ?? 30;
  document.getElementById("repaymentFrequency").value = normalizedState.repaymentFrequency ?? "fortnightly";
  document.getElementById("christchurchArea").value = normalizeChristchurchSelectionKey(normalizedState.christchurchArea);
  document.getElementById("occupantCount").value = normalizedState.occupantCount ?? 2;
  document.getElementById("hasGasConnection").checked = Boolean(normalizedState.hasGasConnection);
  document.getElementById("autoEstimateCosts").checked = Boolean(normalizedState.autoEstimateCosts);

  resultDisplayMode = normalizedState.resultDisplayMode || resultDisplayMode;
  showDetails = Boolean(normalizedState.showDetails);
  toggleDetailsBtn.textContent = showDetails ? "Hide Details" : "Show Details";
  updateDisplayTabs();

  applyRows(normalizedState.incomeRows || [], normalizedState.costRows || [], normalizedState.oneOffRows || []);

  if (confirm) {
    confirmSectionState();
  }
}

function normalizeLegacyState(state) {
  const hasIncomeRows = Array.isArray(state.incomeRows) && state.incomeRows.length > 0;
  const fallbackIncomeRows = hasIncomeRows
    ? state.incomeRows
    : [
        {
          name: "Person 1",
          grossSalary: state.grossSalary ?? 0,
          kiwiSaverRate: state.kiwiSaverRate ?? 0,
          hasStudentLoan: Boolean(state.hasStudentLoan),
        },
      ];

  return {
    incomeRows: fallbackIncomeRows,
    includeRentIncome: Boolean(state.includeRentIncome),
    rentIncomeAmount: state.rentIncomeAmount ?? 0,
    rentIncomeFrequency: state.rentIncomeFrequency ?? "weekly",
    housePrice: state.housePrice ?? 0,
    deposit: state.deposit ?? Math.round((state.housePrice ?? 0) * 0.2),
    interestRate: state.interestRate ?? 0,
    loanTermYears: state.loanTermYears ?? 30,
    repaymentFrequency: state.repaymentFrequency ?? "fortnightly",
    christchurchArea: normalizeChristchurchAreaKey(state.christchurchArea),
    resultDisplayMode: state.resultDisplayMode ?? resultDisplayMode,
    showDetails: Boolean(state.showDetails),
    occupantCount: state.occupantCount ?? 2,
    hasGasConnection: state.hasGasConnection ?? true,
    autoEstimateCosts: state.autoEstimateCosts ?? true,
    costRows: state.costRows ?? [],
    oneOffRows: state.oneOffRows ?? [],
  };
}

function normalizeChristchurchAreaKey(areaKey) {
  const value = String(areaKey || "").trim().toLowerCase();
  if (!value) return "central";
  if (SUBURB_TO_WARD[value] !== undefined) return SUBURB_TO_WARD[value];
  if (CHRISTCHURCH_RATES_ANNUAL[value] !== undefined) return value;

  const legacyMap = {
    banks: "banks_peninsula",
    newbrighton: "coastal",
    northwood: "harewood",
    belfast: "harewood",
  };

  return legacyMap[value] || "central";
}

function normalizeChristchurchSelectionKey(areaKey) {
  const value = String(areaKey || "").trim().toLowerCase();
  if (!value) return "central_city";
  if (SUBURB_TO_WARD[value] !== undefined) return value;
  if (WARD_DEFAULT_SUBURB[value] !== undefined) return WARD_DEFAULT_SUBURB[value];

  const ward = normalizeChristchurchAreaKey(value);
  return WARD_DEFAULT_SUBURB[ward] || "central_city";
}

function initializeDefaultDeposit() {
  const housePrice = parseFloat(housePriceInput.value) || 0;
  const currentDeposit = parseFloat(depositInput.value) || 0;
  if (currentDeposit <= 0) {
    depositInput.value = Math.round(housePrice * 0.2);
  }
  depositTouched = false;
}

function validateState(state) {
  const errors = [];

  if (!state.incomeRows || state.incomeRows.length === 0) {
    errors.push("Add at least one salary income row.");
  }
  if ((state.incomeRows || []).every((row) => row.grossSalary <= 0) && !(state.includeRentIncome && state.rentIncomeAmount > 0)) {
    errors.push("At least one salary must be greater than 0, or set rent income greater than 0.");
  }
  state.incomeRows.forEach((row, index) => {
    if (row.grossSalary < 0) errors.push(`Income row ${index + 1} gross salary cannot be negative.`);
  });
  if (state.includeRentIncome && state.rentIncomeAmount < 0) {
    errors.push("Rent income cannot be negative.");
  }
  if (state.housePrice <= 0) errors.push("House price must be greater than 0.");
  if (state.deposit < 0) errors.push("Deposit cannot be negative.");
  if (state.deposit > state.housePrice) errors.push("Deposit cannot exceed house price.");
  if (state.interestRate < 0 || state.interestRate > 0.25) errors.push("Interest rate should be between 0% and 25%.");
  if (state.loanTermYears < 1 || state.loanTermYears > 40) errors.push("Loan term should be between 1 and 40 years.");
  if (state.occupantCount < 1 || state.occupantCount > 20) errors.push("Occupant count should be between 1 and 20.");

  state.costRows.forEach((row, index) => {
    if (row.amount < 0) errors.push(`Recurring cost row ${index + 1} cannot be negative.`);
  });

  state.oneOffRows.forEach((row, index) => {
    if (row.amount < 0) errors.push(`One-off cost row ${index + 1} cannot be negative.`);
  });

  return errors;
}

function confirmSectionState() {
  const state = collectCurrentState();
  if (state.autoEstimateCosts) {
    applyAverageCostEstimates(state);
    state.costRows = collectRows().costRows;
  }
  const errors = validateState(state);

  if (errors.length > 0) {
    validationNote.className = "note status-warn";
    validationNote.textContent = `Please fix: ${errors.join(" ")}`;
    return;
  }

  validationNote.className = "note";
  validationNote.textContent = "";

  lastConfirmedState = state;
  renderFromState(state, { skipValidation: true });
  saveDraftState(state);
}

function estimateAverageRecurringCosts(housePrice, occupantCount, hasGasConnection) {
  const normalizedOccupants = Math.max(1, occupantCount);
  const householdScale = normalizedOccupants / 2.7;

  const insuranceAnnual = housePrice * 0.0041;
  const electricityAnnual = 2343 * householdScale;
  const gasAnnual = hasGasConnection ? 1300 * householdScale : 0;

  return {
    insuranceAnnual,
    electricityAnnual,
    gasAnnual,
  };
}

function upsertCostRow(name, amount, frequency) {
  const rows = [...costTableBody.querySelectorAll("tr")];
  const match = rows.find((row) => {
    const rowName = (row.querySelector(".cost-name").value || "").trim().toLowerCase();
    return rowName === name.trim().toLowerCase();
  });

  if (match) {
    match.querySelector(".cost-amount").value = Math.round(amount);
    match.querySelector(".cost-frequency").value = frequency;
    return;
  }

  addCostRow(name, Math.round(amount), frequency);
}

function removeCostRowByName(name) {
  const rows = [...costTableBody.querySelectorAll("tr")];
  for (const row of rows) {
    const rowName = (row.querySelector(".cost-name").value || "").trim().toLowerCase();
    if (rowName === name.trim().toLowerCase()) {
      row.remove();
    }
  }
}

function applyAverageCostEstimates(state) {
  const normalizedAreaKey = normalizeChristchurchAreaKey(state.christchurchArea);
  const estimates = estimateAverageRecurringCosts(
    state.housePrice,
    state.occupantCount,
    state.hasGasConnection,
  );
  const ratesAnnual = CHRISTCHURCH_RATES_ANNUAL[normalizedAreaKey] ?? CHRISTCHURCH_RATES_ANNUAL.central;
  const areaLabel = getChristchurchAreaLabel(state.christchurchArea);

  upsertCostRow("Home Insurance", estimates.insuranceAnnual, "annual");
  upsertCostRow("Council Rates", ratesAnnual, "annual");
  upsertCostRow("Electricity", estimates.electricityAnnual / 12, "monthly");

  if (state.hasGasConnection) {
    upsertCostRow("Natural Gas", estimates.gasAnnual / 12, "monthly");
  } else {
    removeCostRowByName("Natural Gas");
  }

  costEstimatorNote.textContent =
    `Benchmarks: council rates (${areaLabel}) estimated at ${money(ratesAnnual)}/year. Insurance is 0.41% of house price annually. Electricity benchmark is NZD 2,343/year at 2.7 occupants (scaled by occupant count). Gas benchmark is NZD 1,300/year at 2.7 occupants for gas-connected homes (scaled by occupant count).`;
}

function getChristchurchAreaLabel(areaKey) {
  const select = document.getElementById("christchurchArea");
  const option = [...select.options].find((opt) => opt.value === areaKey);
  return option ? option.textContent : "Central / CBD";
}

function updateAnnualizedCostCells(costRows) {
  let annualCosts = 0;
  costRows.forEach((row, index) => {
    const annualized = (row.amount || 0) * (FREQUENCY_PER_YEAR[row.frequency] || 12);
    annualCosts += annualized;
    const cell = costTableBody.querySelectorAll(".annualized-cell")[index];
    if (cell) cell.textContent = money(annualized);
  });
  return annualCosts;
}

function remainingForRate(loanAmount, annualRate, years, netAnnual, annualCosts, displayMode) {
  const monthlyMortgage = calculateMonthlyPayment(loanAmount, annualRate, years);
  const annualMortgage = monthlyMortgage * 12;
  return {
    mortgage: annualMortgage / FREQUENCY_PER_YEAR[displayMode],
    remaining: (netAnnual - annualCosts - annualMortgage) / FREQUENCY_PER_YEAR[displayMode],
  };
}

function renderFromState(state) {
  const incomeRows = state.incomeRows || [];
  const housePrice = state.housePrice;
  const deposit = state.deposit;
  const interestRate = state.interestRate;
  const loanTermYears = state.loanTermYears;

  let salaryNetAnnual = 0;
  incomeRows.forEach((row, index) => {
    const breakdown = calculateIncomeBreakdown(
      row.grossSalary || 0,
      row.kiwiSaverRate || 0,
      row.hasStudentLoan,
    );
    salaryNetAnnual += breakdown.net;

    const cell = incomeTableBody.querySelectorAll(".income-net-cell")[index];
    if (cell) cell.textContent = money(breakdown.net);
  });

  const rentAnnual = state.includeRentIncome
    ? (state.rentIncomeAmount || 0) * (FREQUENCY_PER_YEAR[state.rentIncomeFrequency] || 52)
    : 0;

  const netAnnual = salaryNetAnnual + rentAnnual;
  const annualCosts = updateAnnualizedCostCells(state.costRows);
  const oneOffTotal = state.oneOffRows.reduce((sum, row) => sum + (row.amount || 0), 0);
  oneOffAwarenessTotal.textContent = `Total one-off costs: ${money(oneOffTotal)} (not included in repayment affordability result)`;

  const loanAmount = Math.max(0, housePrice - deposit);
  const baseline = remainingForRate(
    loanAmount,
    interestRate,
    loanTermYears,
    netAnnual,
    annualCosts,
    resultDisplayMode,
  );

  const displayNetIncome = netAnnual / FREQUENCY_PER_YEAR[resultDisplayMode];
  const displayCosts = annualCosts / FREQUENCY_PER_YEAR[resultDisplayMode];

  const sensitivity = [0, 0.005, 0.01].map((delta) => {
    const computed = remainingForRate(
      loanAmount,
      interestRate + delta,
      loanTermYears,
      netAnnual,
      annualCosts,
      resultDisplayMode,
    );

    return {
      label: delta === 0 ? `Rate ${(interestRate * 100).toFixed(2)}%` : `Rate +${(delta * 100).toFixed(1)}%`,
      remaining: computed.remaining,
      mortgage: computed.mortgage,
    };
  });

  renderResults({
    resultDisplayMode,
    showDetails,
    displayNetIncome,
    displayCosts,
    displayMortgage: baseline.mortgage,
    deposit,
    salaryNetAnnual,
    rentAnnual,
    sensitivity,
  });
}

function renderResults(data) {
  resultsNode.innerHTML = "";
  sensitivityPanel.innerHTML = "";

  const displayLabel = capitalize(data.resultDisplayMode);
  const totalIncome = data.displayNetIncome;
  const totalExpenses = data.displayCosts + data.displayMortgage;
  const remaining = totalIncome - totalExpenses;

  const detailRows = data.showDetails
    ? `
      <div class="bs-row bs-sub">
        <div class="bs-label">After-tax salary total (${escapeHtml(displayLabel)})</div>
        <div class="bs-value">${escapeHtml(money(data.salaryNetAnnual / FREQUENCY_PER_YEAR[data.resultDisplayMode]))}</div>
      </div>
      <div class="bs-row bs-sub">
        <div class="bs-label">Rent income (${escapeHtml(displayLabel)})</div>
        <div class="bs-value">${escapeHtml(money(data.rentAnnual / FREQUENCY_PER_YEAR[data.resultDisplayMode]))}</div>
      </div>
      <div class="bs-row bs-sub">
        <div class="bs-label">Living costs (${escapeHtml(displayLabel)})</div>
        <div class="bs-value">${escapeHtml(money(data.displayCosts))}</div>
      </div>
      <div class="bs-row bs-sub">
        <div class="bs-label">Mortgage repayment (${escapeHtml(displayLabel)})</div>
        <div class="bs-value">${escapeHtml(money(data.displayMortgage))}</div>
      </div>
      <div class="bs-row bs-divider">
        <div class="bs-label">Deposit</div>
        <div class="bs-value">${escapeHtml(money(data.deposit))}</div>
      </div>
    `
    : "";

  resultsNode.innerHTML = `
    <div class="balance-sheet">
      <div class="bs-header">${escapeHtml(displayLabel)} Balance Sheet</div>
      <div class="bs-row">
        <div class="bs-label">Total Income</div>
        <div class="bs-value">${escapeHtml(money(totalIncome))}</div>
      </div>
      <div class="bs-row bs-divider">
        <div class="bs-label">Total Expenses</div>
        <div class="bs-value">${escapeHtml(money(totalExpenses))}</div>
      </div>
      <div class="bs-row bs-total">
        <div class="bs-label">Remaining (Income - Expenses)</div>
        <div class="bs-value">${escapeHtml(money(remaining))}</div>
      </div>
      ${detailRows}
    </div>
  `;

  data.sensitivity.forEach((item) => {
    const block = document.createElement("div");
    block.className = "s-card";
    block.innerHTML = `
      <div class="s-title">${escapeHtml(item.label)}</div>
      <div class="s-line">Mortgage: ${escapeHtml(money(item.mortgage))}</div>
      <div class="s-line">Remaining: ${escapeHtml(money(item.remaining))}</div>
    `;
    sensitivityPanel.appendChild(block);
  });

  const mortgageToIncomeRatio = totalIncome > 0 ? data.displayMortgage / totalIncome : 1;
  const warnings = [];
  if (remaining < 0) warnings.push("Remaining is negative.");
  if (mortgageToIncomeRatio > 0.4) warnings.push("Mortgage repayment is above 40% of net income.");

  statusNote.className = `note ${remaining >= 0 ? "status-ok" : "status-warn"}`;
  statusNote.textContent =
    remaining >= 0
      ? `Projected ${displayLabel.toLowerCase()} cashflow is positive.`
      : `Projected ${displayLabel.toLowerCase()} cashflow is negative.`;

  riskNote.className = `note ${warnings.length === 0 ? "status-ok" : "status-warn"}`;
  riskNote.textContent =
    warnings.length === 0 ? "Risk check: no threshold breaches." : `Risk check: ${warnings.join(" ")}`;

  lastRenderPayload = {
    displayLabel,
    totalIncome,
    totalExpenses,
    remaining,
    detailRows: data.showDetails,
    deposit: data.deposit,
    warnings,
    sensitivity: data.sensitivity,
  };
}

async function exportSummaryImage(payload) {
  const lines = [
    `${payload.displayLabel} Balance Sheet`,
    `Total Income: ${money(payload.totalIncome)}`,
    `Total Expenses: ${money(payload.totalExpenses)}`,
    `Remaining: ${money(payload.remaining)}`,
  ];

  if (payload.detailRows) {
    lines.push(`Deposit: ${money(payload.deposit)}`);
    lines.push("Note: one-off purchase costs are tracked separately and excluded from repayment affordability.");
  }

  lines.push("Sensitivity:");
  payload.sensitivity.forEach((s) => {
    lines.push(`${s.label} | Mortgage ${money(s.mortgage)} | Remaining ${money(s.remaining)}`);
  });

  if (payload.warnings.length > 0) {
    lines.push("Warnings:");
    payload.warnings.forEach((w) => lines.push(`- ${w}`));
  }

  const width = 1200;
  const lineHeight = 44;
  const height = 120 + lines.length * lineHeight;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#fffdf8";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#0f766e";
  ctx.fillRect(0, 0, width, 88);

  ctx.fillStyle = "#f0fdfa";
  ctx.font = "bold 36px Arial";
  ctx.fillText("NZ Mortgage Affordability Snapshot", 36, 54);

  ctx.fillStyle = "#1f2933";
  ctx.font = "28px Arial";
  let y = 130;
  for (const line of lines) {
    ctx.fillText(line, 36, y);
    y += lineHeight;
  }

  const blob = await canvasToBlob(canvas);
  if (!blob) {
    const link = document.createElement("a");
    link.download = `mortgage-summary-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    return false;
  }

  const fileName = `mortgage-summary-${Date.now()}.png`;
  const file = new File([blob], fileName, { type: "image/png" });

  if (navigator.share && navigator.canShare) {
    try {
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Mortgage Affordability Summary",
          text: "Mortgage affordability snapshot",
          files: [file],
        });
        return true;
      }
    } catch (_error) {
      // Fallback to download if share is cancelled or unavailable.
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return false;
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

function updateDisplayTabs() {
  for (const tab of resultDisplayTabs) {
    const isActive = tab.dataset.mode === resultDisplayMode;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  }
}

function scheduleDraftSave() {
  clearTimeout(draftSaveTimer);
  draftSaveTimer = setTimeout(() => {
    saveDraftState(collectCurrentState());
  }, 500);
}

function saveDraftState(state) {
  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(state));
}

function loadDraftState() {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || "null");
  } catch (_error) {
    return null;
  }
}

function readScenarioStore() {
  try {
    return JSON.parse(localStorage.getItem(SCENARIO_STORAGE_KEY) || "{}");
  } catch (_error) {
    return {};
  }
}

function writeScenarioStore(data) {
  localStorage.setItem(SCENARIO_STORAGE_KEY, JSON.stringify(data));
}

function refreshScenarioSelect(preferredName = "") {
  const scenarios = readScenarioStore();
  const names = Object.keys(scenarios).sort((a, b) => a.localeCompare(b));

  scenarioSelect.innerHTML = "";
  if (names.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "No saved scenarios";
    scenarioSelect.appendChild(opt);
    scenarioSelect.value = "";
    return;
  }

  for (const name of names) {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    scenarioSelect.appendChild(opt);
  }

  scenarioSelect.value = preferredName && names.includes(preferredName) ? preferredName : names[0];
}

function setScenarioNote(message, isWarn = false) {
  scenarioNote.textContent = message;
  scenarioNote.className = `note ${isWarn ? "status-warn" : "status-ok"}`;
}

function scenarioNameFromHousePrice(housePrice) {
  return `House ${money(housePrice)}`;
}

function encodeSnapshot(state) {
  const json = JSON.stringify(state);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function decodeSnapshot(encoded) {
  const binary = atob(encoded);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json);
}

function loadSnapshotFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("snapshot");
    if (!encoded) return null;
    return decodeSnapshot(encoded);
  } catch (_error) {
    return null;
  }
}

function calculateProgressiveTax(income, brackets) {
  let remaining = Math.max(0, income);
  let previousLimit = 0;
  let tax = 0;

  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const taxableInBracket = Math.min(remaining, bracket.limit - previousLimit);
    tax += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
    previousLimit = bracket.limit;
  }

  return tax;
}

function calculateMonthlyPayment(principal, annualRate, years) {
  if (principal <= 0) return 0;
  const n = years * 12;
  if (annualRate <= 0) return principal / n;

  const r = annualRate / 12;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

function num(id) {
  return parseFloat(document.getElementById(id).value) || 0;
}

function money(value) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    maximumFractionDigits: 2,
  }).format(value);
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
