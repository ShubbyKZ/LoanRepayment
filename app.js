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
const LOCALE_STORAGE_KEY = "mortgage_model_locale_v1";

const I18N = {
  en: {
    app_title: "NZ Mortgage Affordability Model",
    by_kz: "by KZ",
    hero_desc:
      "Estimate take-home pay (NZ tax), mortgage repayments, living costs, and affordability in one place.",
    home_notes_title: "Mortgage Calculator + Software Notes",
    home_notes_1:
      "This tool helps you estimate affordability using NZ salary tax, mortgage repayment, recurring costs and scenario snapshots.",
    home_notes_2:
      "You can save by house price, load previous scenarios, share snapshots, and separately track one-off purchase costs.",
    go_calculator: "Go to Calculator",
    go_all_scenarios: "Go to All Scenarios",
    oneoff_calculator: "One-off Cost Calculator",
    back_home: "Back to Home",
    all_scenarios: "All Scenarios",
    oneoff_short: "One-off Calculator",
    mortgage_inputs: "Mortgage Inputs",
    default_deposit_hint: "Default deposit is 20% of house price (until you manually edit it).",
    suburb_hint:
      "Suburb selection is mapped to Christchurch City Council ward-based rates benchmarks (2022/2025 ward structure).",
    confirm_mortgage: "Confirm Mortgage",
    income_annual: "Income (Annual)",
    salary_incomes: "Salary Incomes",
    add_person: "Add Person",
    rent_owner: "Rent Income (Owner)",
    rent_hint: "Set rent as net usable rent contribution.",
    confirm_income: "Confirm Income",
    recurring_costs: "Recurring Costs",
    add_cost: "Add Cost",
    nz_avg_cost_estimator: "NZ Average Cost Estimator",
    apply_nz_avg: "Apply NZ Averages",
    confirm_costs: "Confirm Costs",
    results: "Results",
    monthly: "Monthly",
    fortnightly: "Fortnightly",
    weekly: "Weekly",
    show_details: "Show Details",
    hide_details: "Hide Details",
    export_image: "Share / Export Image",
    assumptions: "Assumptions",
    assumptions_1: "NZ income tax brackets from 1 April 2025.",
    assumptions_2: "ACC earners levy set to 1.67% capped at NZD 152,790 earnings.",
    assumptions_3: "This is a planning tool, not financial advice.",
    go_calculator_short: "Go to Calculator",
    scenarios: "Scenarios",
    save_current_house_price: "Save Current House Price",
    load: "Load",
    delete: "Delete",
    copy_share_link: "Copy Share Link",
    oneoff_purchase_costs: "One-off Purchase Costs",
    add_oneoff_cost: "Add One-off Cost",
    add_selected_avg: "Add Selected Average",
    apply_common_avg: "Apply Common Averages",
    share_oneoff_summary: "Share One-off Summary",
    oneoff_hint: "Use these as planning averages; edit any line item if your quotes differ.",
    oneoff_awareness_title: "One-off Awareness (Not in Repayment Calculation)",
    oneoff_total_prefix: "Total one-off costs",
    confirm_oneoff: "Confirm One-off Costs",
    income_breakdown: "Income Breakdown",
    close: "Close",
    app_update_available: "A new version is available.",
    update_now: "Update now",
    later: "Later",
    no_saved_scenarios: "No saved scenarios",
    scenario_saved: "Saved scenario: {name}",
    scenario_loaded: "Loaded scenario: {name}",
    scenario_deleted: "Deleted scenario: {name}",
    scenario_new_started: "Started a new scenario.",
    scenario_need_house_price: "House price must be greater than 0 before saving scenario.",
    scenario_select_load: "Select a scenario to load.",
    scenario_not_available: "Selected scenario is not available.",
    scenario_select_delete: "Select a scenario to delete.",
    scenario_link_copied: "Share link copied.",
    scenario_link_failed: "Could not copy link. Try again.",
    oneoff_applied_avg: "Applied common one-off average costs.",
    oneoff_opened_share: "Opened share sheet for one-off summary.",
    oneoff_copied_share: "Copied one-off summary to clipboard.",
    costs_applied_avg: "Applied NZ average estimates for insurance and utilities.",
    confirm_before_export: "Confirm your inputs first before exporting.",
    opened_ios_share: "Opened iOS share sheet.",
    exported_image: "Exported summary image.",
    loaded_shared_snapshot: "Loaded shared snapshot from link.",
    restored_draft: "Restored auto-saved draft.",
    validation_prefix: "Please fix:",
    projected_positive: "Projected {period} cashflow is positive.",
    projected_negative: "Projected {period} cashflow is negative.",
    risk_no_breach: "Risk check: no threshold breaches.",
    risk_prefix: "Risk check: {warnings}",
    warning_remaining_negative: "Remaining is negative.",
    warning_mortgage_ratio: "Mortgage repayment is above 40% of net income.",
    rate_label: "Rate {value}%",
    rate_plus_label: "Rate +{value}%",
    oneoff_not_included: "(not included in repayment affordability result)",
    house_prefix: "House",
    validation_income_row: "Add at least one salary income row.",
    validation_income_or_rent:
      "At least one salary must be greater than 0, or set rent income greater than 0.",
    validation_income_negative: "Income row {index} gross salary cannot be negative.",
    validation_rent_negative: "Rent income cannot be negative.",
    validation_house_price: "House price must be greater than 0.",
    validation_deposit_negative: "Deposit cannot be negative.",
    validation_deposit_gt_house: "Deposit cannot exceed house price.",
    validation_rate_range: "Interest rate should be between 0% and 25%.",
    validation_term_range: "Loan term should be between 1 and 40 years.",
    validation_occupants_range: "Occupant count should be between 1 and 20.",
    validation_cost_negative: "Recurring cost row {index} cannot be negative.",
    validation_oneoff_negative: "One-off cost row {index} cannot be negative.",
    item: "Item",
    total: "Total",
    house_price_label: "House price (NZD)",
    deposit_label: "Deposit (NZD)",
    interest_rate_label: "Interest rate (% p.a.)",
    loan_term_label: "Loan term (years)",
    repayment_frequency_label: "Repayment frequency",
    suburb_label: "Christchurch suburb (for rates estimate)",
    include_rent_income_label: "Include rent income",
    rent_amount_label: "Rent amount (NZD)",
    rent_frequency_label: "Rent frequency",
    recurring_costs_hint:
      "Add all ongoing costs (electricity, council rates, insurance, internet, groceries, transport, etc.) with their billing frequency.",
    occupant_count_label: "Number of tenants / occupants",
    gas_connection_label: "Gas connection at property",
    auto_estimate_label: "Auto-update insurance and utilities on confirm",
    scenarios_select_label: "Saved scenarios (by house price)",
    oneoff_common_items_label: "Common one-off items",
    oneoff_extra_hint:
      "Add one-time costs such as legal fee, valuation, LIM report, moving, and setup costs.",
    oneoff_awareness_desc:
      "These one-off costs are shown for planning awareness only and are not included in loan repayment affordability (income - recurring costs - mortgage).",
    th_person: "Person",
    th_gross_salary: "Gross Salary (NZD)",
    th_kiwisaver: "KiwiSaver %",
    th_student_loan: "Student Loan",
    th_after_tax: "After-tax (NZD / year)",
    th_actions: "Actions",
    th_cost_name: "Cost Name",
    th_amount: "Amount (NZD)",
    th_frequency: "Frequency",
    th_annualized: "Annualized (NZD)",
    th_empty: "",
    row_label_person: "Person",
    row_label_gross_salary: "Gross Salary (NZD)",
    row_label_student_loan: "Student Loan",
    row_label_after_tax: "After-tax (NZD / year)",
    row_label_cost_name: "Cost Name",
    row_label_amount: "Amount (NZD)",
    row_label_frequency: "Frequency",
    row_label_annualized: "Annualized (NZD)",
    row_label_actions: "Actions",
    details: "Details",
    remove: "Remove",
    edit: "Edit",
    confirm: "Confirm",
    cost_electricity: "Electricity",
    cost_council_rates: "Council Rates",
    cost_home_insurance: "Home Insurance",
    cost_contents_insurance: "Contents Insurance",
    cost_internet: "Internet",
    cost_groceries: "Groceries",
    cost_transport: "Transport",
    cost_natural_gas: "Natural Gas",
    person_default: "Person 1",
    tab_planner: "Calculator",
    tab_scenarios: "Scenarios",
    tab_oneoff: "One-off",
  },
  zh: {
    app_title: "新西兰房贷可负担性模型",
    by_kz: "作者 KZ",
    hero_desc: "在一个页面里估算税后收入（NZ 税制）、房贷还款、生活成本与可负担性。",
    home_notes_title: "房贷计算 + 软件说明",
    home_notes_1: "这个工具会结合新西兰工资税、房贷供款、持续性开支与情景快照来估算可负担性。",
    home_notes_2: "你可以按房价保存情景、加载历史情景、分享快照，并单独追踪一次性购房成本。",
    go_calculator: "进入计算页",
    go_all_scenarios: "查看所有 Scenario",
    oneoff_calculator: "一次性成本计算器",
    back_home: "返回首页",
    all_scenarios: "所有 Scenario",
    oneoff_short: "一次性计算器",
    mortgage_inputs: "房贷输入",
    default_deposit_hint: "默认首付为房价的 20%（手动修改后不再自动跟随）。",
    suburb_hint: "区域选择用于映射 Christchurch 市议会分区费率基准（2022/2025 分区）。",
    confirm_mortgage: "确认房贷",
    income_annual: "收入（年）",
    salary_incomes: "工资收入",
    add_person: "新增人员",
    rent_owner: "租金收入（房主）",
    rent_hint: "租金请填写可用于支出的净收入。",
    confirm_income: "确认收入",
    recurring_costs: "持续性成本",
    add_cost: "新增成本",
    nz_avg_cost_estimator: "新西兰平均成本估算",
    apply_nz_avg: "应用 NZ 平均值",
    confirm_costs: "确认成本",
    results: "结果",
    monthly: "每月",
    fortnightly: "每两周",
    weekly: "每周",
    show_details: "显示详情",
    hide_details: "隐藏详情",
    export_image: "分享 / 导出图片",
    assumptions: "假设",
    assumptions_1: "NZ 所得税税阶使用 2025 年 4 月 1 日版本。",
    assumptions_2: "ACC levy 设为 1.67%，封顶收入 NZD 152,790。",
    assumptions_3: "本工具仅用于规划，不构成财务建议。",
    go_calculator_short: "进入计算页",
    scenarios: "情景",
    save_current_house_price: "保存当前房价情景",
    load: "加载",
    delete: "删除",
    copy_share_link: "复制分享链接",
    oneoff_purchase_costs: "一次性购房成本",
    add_oneoff_cost: "新增一次性成本",
    add_selected_avg: "添加所选均值",
    apply_common_avg: "应用常见均值",
    share_oneoff_summary: "分享一次性成本摘要",
    oneoff_hint: "这些是规划平均值，可按实际报价修改。",
    oneoff_awareness_title: "一次性成本提示（不计入供款可负担性）",
    oneoff_total_prefix: "一次性成本总计",
    confirm_oneoff: "确认一次性成本",
    income_breakdown: "收入明细",
    close: "关闭",
    app_update_available: "有新版本可用。",
    update_now: "立即更新",
    later: "稍后",
    no_saved_scenarios: "暂无已保存 Scenario",
    scenario_saved: "已保存 Scenario：{name}",
    scenario_loaded: "已加载 Scenario：{name}",
    scenario_deleted: "已删除 Scenario：{name}",
    scenario_new_started: "已开始新的 Scenario。",
    scenario_need_house_price: "保存前房价必须大于 0。",
    scenario_select_load: "请选择要加载的 Scenario。",
    scenario_not_available: "所选 Scenario 不存在。",
    scenario_select_delete: "请选择要删除的 Scenario。",
    scenario_link_copied: "已复制分享链接。",
    scenario_link_failed: "复制失败，请重试。",
    oneoff_applied_avg: "已应用常见一次性成本均值。",
    oneoff_opened_share: "已打开一次性摘要分享面板。",
    oneoff_copied_share: "已复制一次性摘要到剪贴板。",
    costs_applied_avg: "已应用 NZ 平均保险与公用事业估算。",
    confirm_before_export: "请先确认输入后再导出。",
    opened_ios_share: "已打开 iOS 分享面板。",
    exported_image: "已导出摘要图片。",
    loaded_shared_snapshot: "已从链接加载共享快照。",
    restored_draft: "已恢复自动保存草稿。",
    validation_prefix: "请修正：",
    projected_positive: "预计{period}现金流为正。",
    projected_negative: "预计{period}现金流为负。",
    risk_no_breach: "风险检查：未触发阈值。",
    risk_prefix: "风险检查：{warnings}",
    warning_remaining_negative: "结余为负。",
    warning_mortgage_ratio: "房贷供款超过净收入的 40%。",
    rate_label: "利率 {value}%",
    rate_plus_label: "利率 +{value}%",
    oneoff_not_included: "（不计入供款可负担性结果）",
    house_prefix: "房价",
    validation_income_row: "请至少添加一行工资收入。",
    validation_income_or_rent: "至少有一项工资大于 0，或租金收入大于 0。",
    validation_income_negative: "第 {index} 行收入不能为负数。",
    validation_rent_negative: "租金收入不能为负数。",
    validation_house_price: "房价必须大于 0。",
    validation_deposit_negative: "首付不能为负数。",
    validation_deposit_gt_house: "首付不能大于房价。",
    validation_rate_range: "利率应在 0% 到 25% 之间。",
    validation_term_range: "贷款年限应在 1 到 40 年之间。",
    validation_occupants_range: "居住人数应在 1 到 20 之间。",
    validation_cost_negative: "第 {index} 行持续性成本不能为负数。",
    validation_oneoff_negative: "第 {index} 行一次性成本不能为负数。",
    item: "项目",
    total: "合计",
    house_price_label: "房价（NZD）",
    deposit_label: "首付（NZD）",
    interest_rate_label: "利率（年化 %）",
    loan_term_label: "贷款年限（年）",
    repayment_frequency_label: "还款频率",
    suburb_label: "基督城区域（用于费率估算）",
    include_rent_income_label: "包含租金收入",
    rent_amount_label: "租金金额（NZD）",
    rent_frequency_label: "租金频率",
    recurring_costs_hint: "添加所有持续性支出（电费、市政费、保险、网络、食品、交通等）及其计费频率。",
    occupant_count_label: "租客 / 居住人数",
    gas_connection_label: "房屋有燃气接入",
    auto_estimate_label: "确认时自动更新保险与水电燃气估算",
    scenarios_select_label: "已保存 Scenario（按房价）",
    oneoff_common_items_label: "常见一次性项目",
    oneoff_extra_hint: "添加一次性费用，如律师费、估价、LIM、搬家和安置费用。",
    oneoff_awareness_desc: "这些一次性成本仅用于规划参考，不计入供款可负担性（收入 - 持续性成本 - 房贷）。",
    th_person: "人员",
    th_gross_salary: "税前工资（NZD）",
    th_kiwisaver: "KiwiSaver %",
    th_student_loan: "学生贷款",
    th_after_tax: "税后（NZD / 年）",
    th_actions: "操作",
    th_cost_name: "成本名称",
    th_amount: "金额（NZD）",
    th_frequency: "频率",
    th_annualized: "年化（NZD）",
    th_empty: "",
    row_label_person: "人员",
    row_label_gross_salary: "税前工资（NZD）",
    row_label_student_loan: "学生贷款",
    row_label_after_tax: "税后（NZD / 年）",
    row_label_cost_name: "成本名称",
    row_label_amount: "金额（NZD）",
    row_label_frequency: "频率",
    row_label_annualized: "年化（NZD）",
    row_label_actions: "操作",
    details: "明细",
    remove: "删除",
    edit: "编辑",
    confirm: "确认",
    cost_electricity: "电费",
    cost_council_rates: "市政费",
    cost_home_insurance: "房屋保险",
    cost_contents_insurance: "财产保险",
    cost_internet: "网络",
    cost_groceries: "食品杂货",
    cost_transport: "交通",
    cost_natural_gas: "天然气",
    person_default: "成员 1",
    tab_planner: "计算",
    tab_scenarios: "情景",
    tab_oneoff: "一次性",
  },
};

function detectLocale() {
  const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
  const hasZh = langs.some((locale) => String(locale).toLowerCase().startsWith("zh"));
  return hasZh ? "zh" : "en";
}

function loadLocalePreference() {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === "zh" || saved === "en") return saved;
  } catch (_error) {
    // Fall back to system language.
  }
  return detectLocale();
}

function saveLocalePreference(value) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, value);
  } catch (_error) {
    // Ignore storage write failures.
  }
}

let locale = loadLocalePreference();

function t(key, vars = {}) {
  const template = I18N[locale][key] ?? I18N.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_m, token) => (vars[token] ?? `{${token}}`));
}

function displayModeLabel(mode) {
  return t(mode);
}

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
const appUpdateBanner = document.getElementById("appUpdateBanner");
const updateNowBtn = document.getElementById("updateNowBtn");
const updateLaterBtn = document.getElementById("updateLaterBtn");
const languageToggleBtn = document.getElementById("languageToggle");
const appViews = [...document.querySelectorAll(".app-view")];
const homeGoPlannerBtn = document.getElementById("homeGoPlanner");
const homeGoScenariosBtn = document.getElementById("homeGoScenarios");
const homeGoOneOffBtn = document.getElementById("homeGoOneOff");
const viewNavButtons = [...document.querySelectorAll("[data-nav-target]")];
const bottomTabButtons = [...document.querySelectorAll(".bottom-tab")];

const VIEW_IDS = {
  home: "viewHome",
  planner: "viewPlanner",
  scenarios: "viewScenarios",
  oneoff: "viewOneOff",
};

function setNodeText(selector, key) {
  const node = document.querySelector(selector);
  if (node) node.textContent = t(key);
}

function setAllNodeText(selector, key) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = t(key);
  });
}

function setSelectOptionText(selectId, optionValue, text) {
  const select = document.getElementById(selectId);
  if (!select) return;
  const option = [...select.options].find((opt) => opt.value === optionValue);
  if (option) option.textContent = text;
}

function setLabelBeforeControl(controlId, text) {
  const control = document.getElementById(controlId);
  if (!control) return;
  const label = control.closest("label");
  if (!label) return;
  const textNode = [...label.childNodes].find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0,
  );
  if (textNode) {
    textNode.textContent = `${text}\n            `;
  }
}

function setLabelAfterControl(controlId, text) {
  const control = document.getElementById(controlId);
  if (!control) return;
  const label = control.closest("label");
  if (!label) return;
  const textNodes = [...label.childNodes].filter(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0,
  );
  const tail = textNodes[textNodes.length - 1];
  if (tail) {
    tail.textContent = ` ${text}`;
  }
}

function applyStaticTranslations() {
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en-NZ";
  document.title = t("app_title");
  setNodeText(".hero h1", "app_title");
  setNodeText(".owner-tag", "by_kz");
  setNodeText(".hero p", "hero_desc");
  setNodeText("#homeNotesTitle", "home_notes_title");
  setNodeText("#homeNotesLine1", "home_notes_1");
  setNodeText("#homeNotesLine2", "home_notes_2");
  setNodeText("#homeGoPlanner", "go_calculator");
  setNodeText("#homeGoScenarios", "go_all_scenarios");
  setNodeText("#homeGoOneOff", "oneoff_calculator");
  setAllNodeText("button[data-nav-target='home']", "back_home");
  setNodeText("button[data-nav-target='scenarios']", "all_scenarios");
  setNodeText("button[data-nav-target='oneoff']", "oneoff_short");
  setAllNodeText("button[data-nav-target='planner']", "go_calculator_short");
  setNodeText("#mortgageSection h2", "mortgage_inputs");
  setLabelBeforeControl("housePrice", t("house_price_label"));
  setLabelBeforeControl("deposit", t("deposit_label"));
  setLabelBeforeControl("interestRate", t("interest_rate_label"));
  setLabelBeforeControl("loanTermYears", t("loan_term_label"));
  setLabelBeforeControl("repaymentFrequency", t("repayment_frequency_label"));
  setLabelBeforeControl("christchurchArea", t("suburb_label"));
  setNodeText("#depositHint", "default_deposit_hint");
  setNodeText("#suburbHint", "suburb_hint");
  setNodeText("#confirmMortgage", "confirm_mortgage");
  setNodeText("#incomeSection h2", "income_annual");
  setNodeText("#incomeSection h3", "salary_incomes");
  setNodeText("#addIncomeRow", "add_person");
  setNodeText("#incomeSection h3:nth-of-type(2)", "rent_owner");
  setLabelAfterControl("includeRentIncome", t("include_rent_income_label"));
  setLabelBeforeControl("rentIncomeAmount", t("rent_amount_label"));
  setLabelBeforeControl("rentIncomeFrequency", t("rent_frequency_label"));
  setNodeText("#rentHint", "rent_hint");
  setNodeText("#confirmIncome", "confirm_income");
  setNodeText("#costsSection h2", "recurring_costs");
  setNodeText("#addCostRow", "add_cost");
  setNodeText("#costsSection .hint", "recurring_costs_hint");
  setNodeText("#costsSection h3", "nz_avg_cost_estimator");
  setLabelBeforeControl("occupantCount", t("occupant_count_label"));
  setLabelAfterControl("hasGasConnection", t("gas_connection_label"));
  setLabelAfterControl("autoEstimateCosts", t("auto_estimate_label"));
  setNodeText("#applyAverageCosts", "apply_nz_avg");
  setNodeText("#confirmCosts", "confirm_costs");
  setNodeText("#resultsSection h2", "results");
  setNodeText(".display-tab[data-mode='monthly']", "monthly");
  setNodeText(".display-tab[data-mode='fortnightly']", "fortnightly");
  setNodeText(".display-tab[data-mode='weekly']", "weekly");
  setNodeText("#exportPng", "export_image");
  setNodeText("#assumptionsSection h2", "assumptions");
  setNodeText("#assumptionsSection li:nth-child(1)", "assumptions_1");
  setNodeText("#assumptionsSection li:nth-child(2)", "assumptions_2");
  setNodeText("#assumptionsSection li:nth-child(3)", "assumptions_3");
  setNodeText("#scenariosSection h2", "scenarios");
  setLabelBeforeControl("scenarioSelect", t("scenarios_select_label"));
  setNodeText("#saveScenario", "save_current_house_price");
  setNodeText("#loadScenario", "load");
  setNodeText("#deleteScenario", "delete");
  setNodeText("#copyShareLink", "copy_share_link");
  setNodeText("#oneOffSection h2", "oneoff_purchase_costs");
  setNodeText("#addOneOffRow", "add_oneoff_cost");
  setLabelBeforeControl("oneOffPreset", t("oneoff_common_items_label"));
  setNodeText("#addOneOffPreset", "add_selected_avg");
  setNodeText("#applyOneOffAverages", "apply_common_avg");
  setNodeText("#shareOneOffSummary", "share_oneoff_summary");
  setNodeText("#oneOffEstimatorNote", "oneoff_hint");
  setNodeText("#oneOffSection .hint + .hint", "oneoff_extra_hint");
  setNodeText("#oneOffSection .cost-estimator h3", "oneoff_awareness_title");
  setNodeText("#oneOffSection .cost-estimator .hint:nth-of-type(2)", "oneoff_awareness_desc");
  setNodeText("#confirmOneOff", "confirm_oneoff");
  setNodeText("#incomeBreakdownTitle", "income_breakdown");
  setNodeText("#closeIncomeBreakdown", "close");
  setNodeText("#appUpdateText", "app_update_available");
  setNodeText("#updateNowBtn", "update_now");
  setNodeText("#updateLaterBtn", "later");
  setNodeText(".bottom-tab[data-tab='planner']", "tab_planner");
  setNodeText(".bottom-tab[data-tab='scenarios']", "tab_scenarios");
  setNodeText(".bottom-tab[data-tab='oneoff']", "tab_oneoff");
  setNodeText("#incomeSection thead th:nth-child(1)", "th_person");
  setNodeText("#incomeSection thead th:nth-child(2)", "th_gross_salary");
  setNodeText("#incomeSection thead th:nth-child(3)", "th_kiwisaver");
  setNodeText("#incomeSection thead th:nth-child(4)", "th_student_loan");
  setNodeText("#incomeSection thead th:nth-child(5)", "th_after_tax");
  setNodeText("#incomeSection thead th:nth-child(6)", "th_actions");
  setNodeText("#costsSection thead th:nth-child(1)", "th_cost_name");
  setNodeText("#costsSection thead th:nth-child(2)", "th_amount");
  setNodeText("#costsSection thead th:nth-child(3)", "th_frequency");
  setNodeText("#costsSection thead th:nth-child(4)", "th_annualized");
  setNodeText("#oneOffSection thead th:nth-child(1)", "th_cost_name");
  setNodeText("#oneOffSection thead th:nth-child(2)", "th_amount");
  setNodeText("#oneOffSection thead th:nth-child(3)", "th_actions");
  setSelectOptionText("repaymentFrequency", "weekly", locale === "zh" ? "每周" : "Weekly");
  setSelectOptionText("repaymentFrequency", "fortnightly", locale === "zh" ? "每两周" : "Fortnightly");
  setSelectOptionText("repaymentFrequency", "monthly", locale === "zh" ? "每月" : "Monthly");
  setSelectOptionText("rentIncomeFrequency", "weekly", locale === "zh" ? "每周" : "Weekly");
  setSelectOptionText("rentIncomeFrequency", "fortnightly", locale === "zh" ? "每两周" : "Fortnightly");
  setSelectOptionText("rentIncomeFrequency", "monthly", locale === "zh" ? "每月" : "Monthly");
  setSelectOptionText("rentIncomeFrequency", "annual", locale === "zh" ? "每年" : "Annual");
  setSelectOptionText("oneOffPreset", "legal", locale === "zh" ? "律师 / 过户费" : "Legal / Conveyancing");
  setSelectOptionText("oneOffPreset", "valuation", locale === "zh" ? "估价报告" : "Valuation report");
  setSelectOptionText("oneOffPreset", "builders", locale === "zh" ? "验房报告" : "Builder's report");
  setSelectOptionText("oneOffPreset", "lim", locale === "zh" ? "LIM 报告" : "LIM report");
  setSelectOptionText("oneOffPreset", "moving", locale === "zh" ? "搬家费用" : "Moving costs");
  setSelectOptionText("oneOffPreset", "loan_setup", locale === "zh" ? "贷款设立 / 银行手续费" : "Loan setup / bank fees");
  setSelectOptionText("oneOffPreset", "initial_repairs", locale === "zh" ? "初期维修 / 安置" : "Initial repairs / setup");

  if (languageToggleBtn) {
    languageToggleBtn.textContent = locale === "zh" ? "EN" : "中文";
    languageToggleBtn.setAttribute("aria-label", locale === "zh" ? "切换到英文" : "Switch to Chinese");
  }
}

function applyLocale(newLocale) {
  const normalized = newLocale === "zh" ? "zh" : "en";
  if (locale !== normalized) {
    locale = normalized;
    saveLocalePreference(normalized);
  }

  const stateBefore = collectCurrentState();
  applyState(stateBefore, { confirm: false });
  applyStaticTranslations();
  refreshScenarioSelect(scenarioSelect.value);
  if (lastConfirmedState) {
    lastConfirmedState = collectCurrentState();
    renderFromState(lastConfirmedState);
  }
}

function initLanguageToggle() {
  if (!languageToggleBtn) return;
  languageToggleBtn.addEventListener("click", () => {
    applyLocale(locale === "zh" ? "en" : "zh");
  });
}

let resultDisplayMode = "fortnightly";
let showDetails = false;
let lastConfirmedState = null;
let lastRenderPayload = null;
let draftSaveTimer = null;
let depositTouched = false;

function triggerHaptic(duration = 12) {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
  navigator.vibrate(duration);
}

function initAppUpdateFlow() {
  if (!("serviceWorker" in navigator)) return;

  let waitingWorker = null;

  const showUpdateBanner = () => {
    if (!appUpdateBanner) return;
    appUpdateBanner.classList.remove("is-hidden");
  };

  const hideUpdateBanner = () => {
    if (!appUpdateBanner) return;
    appUpdateBanner.classList.add("is-hidden");
  };

  const setWaitingWorker = (registration) => {
    if (!registration || !registration.waiting) return;
    waitingWorker = registration.waiting;
    showUpdateBanner();
  };

  const activateUpdate = () => {
    if (!waitingWorker) return;
    waitingWorker.postMessage("SKIP_WAITING");
  };

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });

  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      setWaitingWorker(registration);

      registration.addEventListener("updatefound", () => {
        const installing = registration.installing;
        if (!installing) return;

        installing.addEventListener("statechange", () => {
          if (installing.state === "installed" && navigator.serviceWorker.controller) {
            setWaitingWorker(registration);
          }
        });
      });

      setInterval(() => {
        registration.update().catch(() => {});
      }, 60 * 60 * 1000);

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          registration.update().catch(() => {});
        }
      });
    })
    .catch(() => {});

  if (updateNowBtn) {
    updateNowBtn.addEventListener("click", () => {
      triggerHaptic(15);
      activateUpdate();
    });
  }

  if (updateLaterBtn) {
    updateLaterBtn.addEventListener("click", () => {
      triggerHaptic(8);
      hideUpdateBanner();
    });
  }
}

function viewFromHash() {
  const hash = window.location.hash.replace(/^#/, "").trim().toLowerCase();
  if (hash === "home") return "planner";
  return Object.prototype.hasOwnProperty.call(VIEW_IDS, hash) ? hash : "planner";
}

function navigateToView(view, options = {}) {
  const { updateHash = true } = options;
  const targetView = Object.prototype.hasOwnProperty.call(VIEW_IDS, view) ? view : "home";

  for (const node of appViews) {
    const isActive = node.dataset.view === targetView;
    node.classList.toggle("is-active", isActive);
    node.hidden = !isActive;
  }

  for (const tab of bottomTabButtons) {
    tab.classList.toggle("is-active", tab.dataset.tab === targetView);
  }

  if (updateHash) {
    const hash = targetView === "home" ? "" : `#${targetView}`;
    const nextUrl = `${window.location.pathname}${window.location.search}${hash}`;
    history.replaceState(null, "", nextUrl);
  }
}

function initViewNavigation() {
  if (homeGoPlannerBtn) homeGoPlannerBtn.addEventListener("click", () => navigateToView("planner"));
  if (homeGoScenariosBtn) homeGoScenariosBtn.addEventListener("click", () => navigateToView("scenarios"));
  if (homeGoOneOffBtn) homeGoOneOffBtn.addEventListener("click", () => navigateToView("oneoff"));

  for (const btn of viewNavButtons) {
    btn.addEventListener("click", () => {
      const target = btn.dataset.navTarget || "home";
      navigateToView(target);
    });
  }

  window.addEventListener("hashchange", () => {
    navigateToView(viewFromHash(), { updateHash: false });
  });
  navigateToView(viewFromHash(), { updateHash: false });
}

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
initAppUpdateFlow();
initViewNavigation();
initLanguageToggle();
applyStaticTranslations();

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
  addCostRow(locale === "zh" ? "新成本" : "New Cost", 0, "monthly");
  scheduleDraftSave();
});

document.getElementById("applyAverageCosts").addEventListener("click", () => {
  const state = collectCurrentState();
  applyAverageCostEstimates(state);
  setScenarioNote(t("costs_applied_avg"));
  scheduleDraftSave();
});

document.getElementById("addIncomeRow").addEventListener("click", () => {
  addIncomeRow(locale === "zh" ? "新增成员" : "New Person", 0, 3, false);
  scheduleDraftSave();
});

document.getElementById("addOneOffRow").addEventListener("click", () => {
  addOneOffRow(locale === "zh" ? "新增一次性成本" : "New One-off Cost", 0);
  scheduleDraftSave();
});

document.getElementById("addOneOffPreset").addEventListener("click", () => {
  addOneOffPresetByKey(oneOffPresetSelect.value);
  scheduleDraftSave();
});

document.getElementById("applyOneOffAverages").addEventListener("click", () => {
  applyCommonOneOffAverages();
  setScenarioNote(t("oneoff_applied_avg"));
  scheduleDraftSave();
});

shareOneOffSummaryBtn.addEventListener("click", async () => {
  const shared = await shareOneOffSummary();
  if (shared) {
    setScenarioNote(t("oneoff_opened_share"));
  } else {
    setScenarioNote(t("oneoff_copied_share"));
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
    setScenarioNote(t("scenario_need_house_price"), true);
    return;
  }
  const name = scenarioNameFromHousePrice(currentState.housePrice);

  const scenarios = readScenarioStore();
  scenarios[name] = currentState;
  writeScenarioStore(scenarios);
  refreshScenarioSelect(name);
  setScenarioNote(t("scenario_saved", { name }));
});

loadScenarioBtn.addEventListener("click", () => {
  const name = scenarioSelect.value;
  if (!name) {
    setScenarioNote(t("scenario_select_load"), true);
    return;
  }

  const scenarios = readScenarioStore();
  if (!scenarios[name]) {
    setScenarioNote(t("scenario_not_available"), true);
    return;
  }

  applyState(scenarios[name], { confirm: true });
  setScenarioNote(t("scenario_loaded", { name }));
});

deleteScenarioBtn.addEventListener("click", () => {
  const name = scenarioSelect.value;
  if (!name) {
    setScenarioNote(t("scenario_select_delete"), true);
    return;
  }

  const scenarios = readScenarioStore();
  delete scenarios[name];
  writeScenarioStore(scenarios);
  refreshScenarioSelect();
  setScenarioNote(t("scenario_deleted", { name }));
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
      window.prompt(locale === "zh" ? "复制此链接：" : "Copy this link:", shareUrl);
    }

    setScenarioNote(t("scenario_link_copied"));
  } catch (_error) {
    setScenarioNote(t("scenario_link_failed"), true);
  }
});

toggleDetailsBtn.addEventListener("click", () => {
  showDetails = !showDetails;
  toggleDetailsBtn.textContent = showDetails ? t("hide_details") : t("show_details");
  if (lastConfirmedState) {
    renderFromState(lastConfirmedState, { skipValidation: true });
  }
  scheduleDraftSave();
});

exportPngBtn.addEventListener("click", async () => {
  if (!lastRenderPayload) {
    setScenarioNote(t("confirm_before_export"), true);
    return;
  }
  const shared = await exportSummaryImage(lastRenderPayload);
  if (shared) {
    setScenarioNote(t("opened_ios_share"));
  } else {
    setScenarioNote(t("exported_image"));
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

function getDefaultCosts() {
  return [
    [t("cost_electricity"), 250, "monthly"],
    [t("cost_council_rates"), 4000, "annual"],
    [t("cost_home_insurance"), 1800, "annual"],
    [t("cost_contents_insurance"), 700, "annual"],
    [t("cost_internet"), 95, "monthly"],
    [t("cost_groceries"), 250, "weekly"],
    [t("cost_transport"), 120, "weekly"],
  ];
}

function getDefaultIncomeRows() {
  return [[t("person_default"), 120000, 3, false]];
}

function getDefaultOneOffCosts() {
  return [
    [locale === "zh" ? "律师 / 过户费" : "Legal / conveyancing", 2500],
    [locale === "zh" ? "估价报告" : "Valuation report", 900],
    [locale === "zh" ? "搬家费用" : "Moving costs", 1200],
  ];
}

function buildNewScenarioState() {
  const defaultIncomeRows = getDefaultIncomeRows();
  const defaultCosts = getDefaultCosts();
  const defaultOneOffCosts = getDefaultOneOffCosts();
  return {
    incomeRows: defaultIncomeRows.map(([name, grossSalary, kiwiSaverPercent, hasStudentLoan]) => ({
      name,
      grossSalary,
      kiwiSaverRate: kiwiSaverPercent / 100,
      hasStudentLoan,
    })),
    includeRentIncome: false,
    rentIncomeAmount: 0,
    rentIncomeFrequency: "weekly",
    housePrice: 800000,
    deposit: 160000,
    interestRate: 0.065,
    loanTermYears: 30,
    repaymentFrequency: "fortnightly",
    christchurchArea: "central_city",
    resultDisplayMode: "fortnightly",
    showDetails: false,
    occupantCount: 2,
    hasGasConnection: true,
    autoEstimateCosts: true,
    costRows: defaultCosts.map(([name, amount, frequency]) => ({ name, amount, frequency })),
    oneOffRows: defaultOneOffCosts.map(([name, amount]) => ({ name, amount })),
  };
}

function startNewScenario() {
  applyState(buildNewScenarioState(), { confirm: true });
  initializeDefaultDeposit();
  collapseSection("mortgageSection", false);
  collapseSection("incomeSection", false);
  collapseSection("costsSection", false);
  collapseSection("resultsSection", false);
  refreshScenarioSelect();
  setScenarioNote(t("scenario_new_started"));
  scheduleDraftSave();
}

getDefaultIncomeRows().forEach((row) => addIncomeRow(...row));
getDefaultCosts().forEach((row) => addCostRow(...row));
getDefaultOneOffCosts().forEach((row) => addOneOffRow(...row));
initializeDefaultDeposit();
updateDisplayTabs();
refreshScenarioSelect();

toggleDetailsBtn.textContent = t("show_details");

const snapshotState = loadSnapshotFromUrl();
if (snapshotState) {
  applyState(snapshotState, { confirm: true });
  setScenarioNote(t("loaded_shared_snapshot"));
} else {
  const draftState = loadDraftState();
  if (draftState) {
    applyState(draftState, { confirm: true });
    setScenarioNote(t("restored_draft"));
  } else {
    confirmSectionState();
  }
}

function addCostRow(name, amount, frequency) {
  const tr = document.createElement("tr");
  tr.className = "cost-row";
  tr.innerHTML = `
    <td data-label="${escapeHtml(t("row_label_cost_name"))}" class="cost-name-cell">
      <div class="cost-name-wrap">
        <span class="cost-name-static">${escapeHtml(name || (locale === "zh" ? "未命名成本" : "Unnamed cost"))}</span>
        <input type="text" class="cost-name" value="${escapeHtml(name)}" />
      </div>
    </td>
    <td data-label="${escapeHtml(t("row_label_amount"))}"><input type="number" class="cost-amount" min="0" step="0.01" value="${amount}" /></td>
    <td data-label="${escapeHtml(t("row_label_frequency"))}">
      <select class="cost-frequency">
        <option value="weekly" ${frequency === "weekly" ? "selected" : ""}>${locale === "zh" ? "每周" : "Weekly"}</option>
        <option value="fortnightly" ${frequency === "fortnightly" ? "selected" : ""}>${locale === "zh" ? "每两周" : "Fortnightly"}</option>
        <option value="monthly" ${frequency === "monthly" ? "selected" : ""}>${locale === "zh" ? "每月" : "Monthly"}</option>
        <option value="quarterly" ${frequency === "quarterly" ? "selected" : ""}>${locale === "zh" ? "每季度" : "Quarterly"}</option>
        <option value="annual" ${frequency === "annual" ? "selected" : ""}>${locale === "zh" ? "每年" : "Annual"}</option>
      </select>
    </td>
    <td class="annualized-cell" data-label="${escapeHtml(t("row_label_annualized"))}">$0.00</td>
    <td data-label="${escapeHtml(t("row_label_actions"))}" class="table-actions">
      <button type="button" class="cost-confirm-btn">${t("confirm")}</button>
      <button type="button" class="remove-row">${t("remove")}</button>
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
    triggerHaptic(collapsed ? 14 : 10);
    scheduleDraftSave();
  });

  tr.querySelector(".cost-name-cell").addEventListener("click", () => {
    if (!tr.classList.contains("is-cost-collapsed")) return;
    setCostRowCollapsed(tr, false);
    triggerHaptic(8);
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
      btn.setAttribute("aria-label", locale === "zh" ? "收起区块" : "Collapse section");
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
    btn.setAttribute("aria-label", collapsed ? (locale === "zh" ? "展开区块" : "Expand section") : (locale === "zh" ? "收起区块" : "Collapse section"));
  }
}

function addIncomeRow(name, grossSalary, kiwiSaverPercent, hasStudentLoan) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td data-label="${escapeHtml(t("row_label_person"))}"><input type="text" class="income-name" value="${escapeHtml(name)}" /></td>
    <td data-label="${escapeHtml(t("row_label_gross_salary"))}"><input type="number" class="income-gross" min="0" step="100" value="${grossSalary}" /></td>
    <td data-label="${escapeHtml(t("th_kiwisaver"))}">
      <select class="income-kiwisaver">
        <option value="0" ${kiwiSaverPercent === 0 ? "selected" : ""}>0%</option>
        <option value="3" ${kiwiSaverPercent === 3 ? "selected" : ""}>3%</option>
        <option value="4" ${kiwiSaverPercent === 4 ? "selected" : ""}>4%</option>
        <option value="6" ${kiwiSaverPercent === 6 ? "selected" : ""}>6%</option>
        <option value="8" ${kiwiSaverPercent === 8 ? "selected" : ""}>8%</option>
        <option value="10" ${kiwiSaverPercent === 10 ? "selected" : ""}>10%</option>
      </select>
    </td>
    <td data-label="${escapeHtml(t("row_label_student_loan"))}"><input type="checkbox" class="income-student-loan" ${hasStudentLoan ? "checked" : ""} /></td>
    <td class="income-net-cell" data-label="${escapeHtml(t("row_label_after_tax"))}">$0.00</td>
    <td class="table-actions" data-label="${escapeHtml(t("row_label_actions"))}">
      <button type="button" class="income-details-btn">${t("details")}</button>
      <button type="button" class="remove-income-row">${t("remove")}</button>
    </td>
  `;

  tr.querySelector(".remove-income-row").addEventListener("click", () => {
    tr.remove();
    scheduleDraftSave();
  });

  incomeTableBody.appendChild(tr);
}

function showIncomeBreakdown(row) {
  const name = row.querySelector(".income-name").value || t("row_label_person");
  const gross = parseFloat(row.querySelector(".income-gross").value) || 0;
  const kiwiSaverRate = (parseFloat(row.querySelector(".income-kiwisaver").value) || 0) / 100;
  const hasStudentLoan = row.querySelector(".income-student-loan").checked;

  const breakdown = calculateIncomeBreakdown(gross, kiwiSaverRate, hasStudentLoan);
  const labels = locale === "zh"
    ? {
        person: "人员",
        gross: "税前工资",
        incomeTax: "所得税",
        accLevy: "ACC",
        studentLoan: "学生贷款",
        kiwiSaver: "KiwiSaver",
        net: "税后收入",
      }
    : {
        person: "Person",
        gross: "Gross salary",
        incomeTax: "Income tax",
        accLevy: "ACC levy",
        studentLoan: "Student loan",
        kiwiSaver: "KiwiSaver",
        net: "After-tax income",
      };
  incomeBreakdownBody.innerHTML = `
    <div class="breakdown-grid">
      <div class="b-label">${escapeHtml(labels.person)}</div><div class="b-value">${escapeHtml(name)}</div>
      <div class="b-label">${escapeHtml(labels.gross)}</div><div class="b-value">${escapeHtml(money(breakdown.gross))}</div>
      <div class="b-label">${escapeHtml(labels.incomeTax)}</div><div class="b-value">${escapeHtml(money(breakdown.incomeTax))}</div>
      <div class="b-label">${escapeHtml(labels.accLevy)}</div><div class="b-value">${escapeHtml(money(breakdown.accLevy))}</div>
      <div class="b-label">${escapeHtml(labels.studentLoan)}</div><div class="b-value">${escapeHtml(money(breakdown.studentLoan))}</div>
      <div class="b-label">${escapeHtml(labels.kiwiSaver)}</div><div class="b-value">${escapeHtml(money(breakdown.kiwiSaver))}</div>
      <div class="b-label b-total">${escapeHtml(labels.net)}</div><div class="b-value b-total">${escapeHtml(money(breakdown.net))}</div>
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
    <td data-label="${escapeHtml(t("row_label_cost_name"))}" class="oneoff-name-cell">
      <div class="cost-name-wrap">
        <span class="cost-name-static">${escapeHtml(name || (locale === "zh" ? "未命名一次性成本" : "Unnamed one-off"))}</span>
        <input type="text" class="oneoff-name" value="${escapeHtml(name)}" />
      </div>
    </td>
    <td data-label="${escapeHtml(t("row_label_amount"))}"><input type="number" class="oneoff-amount" min="0" step="0.01" value="${amount}" /></td>
    <td data-label="${escapeHtml(t("row_label_actions"))}" class="table-actions">
      <button type="button" class="oneoff-confirm-btn">${t("confirm")}</button>
      <button type="button" class="remove-oneoff-row">${t("remove")}</button>
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
    triggerHaptic(collapsed ? 14 : 10);
    scheduleDraftSave();
  });

  tr.querySelector(".oneoff-name-cell").addEventListener("click", () => {
    if (!tr.classList.contains("is-oneoff-collapsed")) return;
    setOneOffRowCollapsed(tr, false);
    triggerHaptic(8);
  });

  oneOffTableBody.appendChild(tr);
}

function syncCostRowName(row) {
  const name = (row.querySelector(".cost-name").value || "").trim();
  row.querySelector(".cost-name-static").textContent = name || (locale === "zh" ? "未命名成本" : "Unnamed cost");
}

function setCostRowCollapsed(row, collapsed) {
  row.classList.toggle("is-cost-collapsed", collapsed);
  const btn = row.querySelector(".cost-confirm-btn");
  if (btn) {
    btn.textContent = collapsed ? t("edit") : t("confirm");
    btn.classList.toggle("is-edit", collapsed);
  }
}

function syncOneOffRowName(row) {
  const name = (row.querySelector(".oneoff-name").value || "").trim();
  row.querySelector(".cost-name-static").textContent = name || (locale === "zh" ? "未命名一次性成本" : "Unnamed one-off");
}

function setOneOffRowCollapsed(row, collapsed) {
  row.classList.toggle("is-oneoff-collapsed", collapsed);
  const btn = row.querySelector(".oneoff-confirm-btn");
  if (btn) {
    btn.textContent = collapsed ? t("edit") : t("confirm");
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
    locale === "zh"
      ? "已添加预设均值。这些只是规划基准，拿到实际报价后请替换。"
      : "Preset averages added. These are planning benchmarks only; replace with actual quotes when available.";
}

function applyCommonOneOffAverages() {
  const presetOrder = ["legal", "valuation", "builders", "lim", "moving", "loan_setup", "initial_repairs"];
  for (const key of presetOrder) {
    const preset = ONE_OFF_PRESETS[key];
    upsertOneOffRow(preset.name, preset.amount);
  }
  oneOffEstimatorNote.textContent =
    locale === "zh"
      ? "已应用新西兰常见一次性成本均值（律师费、估价、验房、LIM、搬家、贷款设立费、初期维修）。"
      : "Applied common NZ one-off planning averages (legal, valuation, builder's, LIM, moving, loan setup, initial repairs).";
}

async function shareOneOffSummary() {
  const rows = collectRows().oneOffRows;
  const total = rows.reduce((sum, row) => sum + (row.amount || 0), 0);
  const lines = [
    locale === "zh" ? "一次性购房成本摘要" : "One-off Purchase Costs Summary",
    ...rows.map((row) => `${row.name || t("item")}: ${money(row.amount || 0)}`),
    `${t("total")}: ${money(total)}`,
    locale === "zh"
      ? "说明：一次性成本不计入供款可负担性。"
      : "Note: one-off costs are not included in repayment affordability.",
  ];
  const text = lines.join("\n");

  if (navigator.share) {
    try {
      await navigator.share({
        title: locale === "zh" ? "一次性购房成本摘要" : "One-off Purchase Costs Summary",
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

  window.prompt(locale === "zh" ? "复制一次性成本摘要：" : "Copy one-off summary:", text);
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
    getDefaultIncomeRows().forEach((row) => addIncomeRow(...row));
  }

  if (!costRows || costRows.length === 0) {
    getDefaultCosts().forEach((row) => addCostRow(...row));
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
  toggleDetailsBtn.textContent = showDetails ? t("hide_details") : t("show_details");
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
    errors.push(t("validation_income_row"));
  }
  if ((state.incomeRows || []).every((row) => row.grossSalary <= 0) && !(state.includeRentIncome && state.rentIncomeAmount > 0)) {
    errors.push(t("validation_income_or_rent"));
  }
  state.incomeRows.forEach((row, index) => {
    if (row.grossSalary < 0) errors.push(t("validation_income_negative", { index: index + 1 }));
  });
  if (state.includeRentIncome && state.rentIncomeAmount < 0) {
    errors.push(t("validation_rent_negative"));
  }
  if (state.housePrice <= 0) errors.push(t("validation_house_price"));
  if (state.deposit < 0) errors.push(t("validation_deposit_negative"));
  if (state.deposit > state.housePrice) errors.push(t("validation_deposit_gt_house"));
  if (state.interestRate < 0 || state.interestRate > 0.25) errors.push(t("validation_rate_range"));
  if (state.loanTermYears < 1 || state.loanTermYears > 40) errors.push(t("validation_term_range"));
  if (state.occupantCount < 1 || state.occupantCount > 20) errors.push(t("validation_occupants_range"));

  state.costRows.forEach((row, index) => {
    if (row.amount < 0) errors.push(t("validation_cost_negative", { index: index + 1 }));
  });

  state.oneOffRows.forEach((row, index) => {
    if (row.amount < 0) errors.push(t("validation_oneoff_negative", { index: index + 1 }));
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
    validationNote.textContent = `${t("validation_prefix")} ${errors.join(" ")}`;
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

function upsertCostRowByAliases(names, preferredName, amount, frequency) {
  const aliases = names.map((name) => name.trim().toLowerCase());
  const rows = [...costTableBody.querySelectorAll("tr")];
  const match = rows.find((row) => {
    const rowName = (row.querySelector(".cost-name").value || "").trim().toLowerCase();
    return aliases.includes(rowName);
  });

  if (match) {
    match.querySelector(".cost-name").value = preferredName;
    syncCostRowName(match);
    match.querySelector(".cost-amount").value = Math.round(amount);
    match.querySelector(".cost-frequency").value = frequency;
    return;
  }

  addCostRow(preferredName, Math.round(amount), frequency);
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

function removeCostRowByAliases(names) {
  const aliases = names.map((name) => name.trim().toLowerCase());
  const rows = [...costTableBody.querySelectorAll("tr")];
  for (const row of rows) {
    const rowName = (row.querySelector(".cost-name").value || "").trim().toLowerCase();
    if (aliases.includes(rowName)) {
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

  upsertCostRowByAliases(
    ["Home Insurance", "房屋保险"],
    t("cost_home_insurance"),
    estimates.insuranceAnnual,
    "annual",
  );
  upsertCostRowByAliases(
    ["Council Rates", "市政费"],
    t("cost_council_rates"),
    ratesAnnual,
    "annual",
  );
  upsertCostRowByAliases(
    ["Electricity", "电费"],
    t("cost_electricity"),
    estimates.electricityAnnual / 12,
    "monthly",
  );

  if (state.hasGasConnection) {
    upsertCostRowByAliases(
      ["Natural Gas", "天然气"],
      t("cost_natural_gas"),
      estimates.gasAnnual / 12,
      "monthly",
    );
  } else {
    removeCostRowByAliases(["Natural Gas", "天然气"]);
  }

  costEstimatorNote.textContent =
    locale === "zh"
      ? `基准：市政费（${areaLabel}）估算为 ${money(ratesAnnual)}/年。房屋保险按房价的 0.41%/年估算。电费基准为 2.7 人家庭每年 NZD 2,343（按人数缩放）。燃气基准为有燃气接入的 2.7 人家庭每年 NZD 1,300（按人数缩放）。`
      : `Benchmarks: council rates (${areaLabel}) estimated at ${money(ratesAnnual)}/year. Insurance is 0.41% of house price annually. Electricity benchmark is NZD 2,343/year at 2.7 occupants (scaled by occupant count). Gas benchmark is NZD 1,300/year at 2.7 occupants for gas-connected homes (scaled by occupant count).`;
}

function getChristchurchAreaLabel(areaKey) {
  const select = document.getElementById("christchurchArea");
  const option = [...select.options].find((opt) => opt.value === areaKey);
  return option ? option.textContent : locale === "zh" ? "中心城区" : "Central / CBD";
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
  oneOffAwarenessTotal.textContent = `${t("oneoff_total_prefix")}: ${money(oneOffTotal)} ${t("oneoff_not_included")}`;

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
      label:
        delta === 0
          ? t("rate_label", { value: (interestRate * 100).toFixed(2) })
          : t("rate_plus_label", { value: (delta * 100).toFixed(1) }),
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

  const displayLabel = displayModeLabel(data.resultDisplayMode);
  const totalIncome = data.displayNetIncome;
  const totalExpenses = data.displayCosts + data.displayMortgage;
  const remaining = totalIncome - totalExpenses;
  const labels = locale === "zh"
    ? {
        afterTaxSalary: "税后工资合计",
        rentIncome: "租金收入",
        livingCosts: "生活成本",
        mortgageRepayment: "房贷供款",
        deposit: "首付",
        balanceSheet: "收支表",
        totalIncome: "总收入",
        totalExpenses: "总支出",
        remaining: "结余（收入 - 支出）",
      }
    : {
        afterTaxSalary: "After-tax salary total",
        rentIncome: "Rent income",
        livingCosts: "Living costs",
        mortgageRepayment: "Mortgage repayment",
        deposit: "Deposit",
        balanceSheet: "Balance Sheet",
        totalIncome: "Total Income",
        totalExpenses: "Total Expenses",
        remaining: "Remaining (Income - Expenses)",
      };

  const detailRows = data.showDetails
    ? `
      <div class="bs-row bs-sub">
        <div class="bs-label">${escapeHtml(labels.afterTaxSalary)} (${escapeHtml(displayLabel)})</div>
        <div class="bs-value">${escapeHtml(money(data.salaryNetAnnual / FREQUENCY_PER_YEAR[data.resultDisplayMode]))}</div>
      </div>
      <div class="bs-row bs-sub">
        <div class="bs-label">${escapeHtml(labels.rentIncome)} (${escapeHtml(displayLabel)})</div>
        <div class="bs-value">${escapeHtml(money(data.rentAnnual / FREQUENCY_PER_YEAR[data.resultDisplayMode]))}</div>
      </div>
      <div class="bs-row bs-sub">
        <div class="bs-label">${escapeHtml(labels.livingCosts)} (${escapeHtml(displayLabel)})</div>
        <div class="bs-value">${escapeHtml(money(data.displayCosts))}</div>
      </div>
      <div class="bs-row bs-sub">
        <div class="bs-label">${escapeHtml(labels.mortgageRepayment)} (${escapeHtml(displayLabel)})</div>
        <div class="bs-value">${escapeHtml(money(data.displayMortgage))}</div>
      </div>
      <div class="bs-row bs-divider">
        <div class="bs-label">${escapeHtml(labels.deposit)}</div>
        <div class="bs-value">${escapeHtml(money(data.deposit))}</div>
      </div>
    `
    : "";

  resultsNode.innerHTML = `
    <div class="balance-sheet">
      <div class="bs-header">${escapeHtml(displayLabel)} ${escapeHtml(labels.balanceSheet)}</div>
      <div class="bs-row">
        <div class="bs-label">${escapeHtml(labels.totalIncome)}</div>
        <div class="bs-value">${escapeHtml(money(totalIncome))}</div>
      </div>
      <div class="bs-row bs-divider">
        <div class="bs-label">${escapeHtml(labels.totalExpenses)}</div>
        <div class="bs-value">${escapeHtml(money(totalExpenses))}</div>
      </div>
      <div class="bs-row bs-total">
        <div class="bs-label">${escapeHtml(labels.remaining)}</div>
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
      <div class="s-line">${escapeHtml(locale === "zh" ? "房贷" : "Mortgage")}: ${escapeHtml(money(item.mortgage))}</div>
      <div class="s-line">${escapeHtml(locale === "zh" ? "结余" : "Remaining")}: ${escapeHtml(money(item.remaining))}</div>
    `;
    sensitivityPanel.appendChild(block);
  });

  const mortgageToIncomeRatio = totalIncome > 0 ? data.displayMortgage / totalIncome : 1;
  const warnings = [];
  if (remaining < 0) warnings.push(t("warning_remaining_negative"));
  if (mortgageToIncomeRatio > 0.4) warnings.push(t("warning_mortgage_ratio"));

  statusNote.className = `note ${remaining >= 0 ? "status-ok" : "status-warn"}`;
  statusNote.textContent =
    remaining >= 0
      ? t("projected_positive", { period: displayLabel.toLowerCase() })
      : t("projected_negative", { period: displayLabel.toLowerCase() });

  riskNote.className = `note ${warnings.length === 0 ? "status-ok" : "status-warn"}`;
  riskNote.textContent =
    warnings.length === 0 ? t("risk_no_breach") : t("risk_prefix", { warnings: warnings.join(" ") });

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
    locale === "zh" ? `${payload.displayLabel} 收支表` : `${payload.displayLabel} Balance Sheet`,
    `${locale === "zh" ? "总收入" : "Total Income"}: ${money(payload.totalIncome)}`,
    `${locale === "zh" ? "总支出" : "Total Expenses"}: ${money(payload.totalExpenses)}`,
    `${locale === "zh" ? "结余" : "Remaining"}: ${money(payload.remaining)}`,
  ];

  if (payload.detailRows) {
    lines.push(`${locale === "zh" ? "首付" : "Deposit"}: ${money(payload.deposit)}`);
    lines.push(
      locale === "zh"
        ? "说明：一次性购房成本单独跟踪，不计入供款可负担性。"
        : "Note: one-off purchase costs are tracked separately and excluded from repayment affordability.",
    );
  }

  lines.push(locale === "zh" ? "敏感性:" : "Sensitivity:");
  payload.sensitivity.forEach((s) => {
    lines.push(`${s.label} | Mortgage ${money(s.mortgage)} | Remaining ${money(s.remaining)}`);
  });

  if (payload.warnings.length > 0) {
    lines.push(locale === "zh" ? "风险提示:" : "Warnings:");
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
  ctx.fillText(locale === "zh" ? "新西兰房贷可负担性快照" : "NZ Mortgage Affordability Snapshot", 36, 54);

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
          title: locale === "zh" ? "房贷可负担性摘要" : "Mortgage Affordability Summary",
          text: locale === "zh" ? "房贷可负担性快照" : "Mortgage affordability snapshot",
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
    opt.textContent = t("no_saved_scenarios");
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
  return `${t("house_prefix")} ${money(housePrice)}`;
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
  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-NZ", {
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
