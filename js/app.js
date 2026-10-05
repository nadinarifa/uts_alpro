/**
 * Core Application Logic for Alpro C++ Blog & Repository
 */

const STORAGE_KEY = "alpro_cpp_case_studies";
const THEME_KEY = "alpro_theme_preference";

let caseStudies = [];
let currentCategory = "all";
let currentDifficulty = "all";
let searchQuery = "";
let editingCaseId = null;

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadData();
  setupEventListeners();
  renderAll();
});

/* ==========================================================================
   THEME (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  setTheme(savedTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  
  const icon = document.getElementById("themeIcon");
  const label = document.getElementById("themeLabel");
  if (icon && label) {
    if (theme === "dark") {
      icon.className = "bi bi-sun-fill text-warning";
      label.textContent = "Mode Terang";
    } else {
      icon.className = "bi bi-moon-stars-fill text-light";
      label.textContent = "Mode Gelap";
    }
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-bs-theme");
  setTheme(current === "dark" ? "light" : "dark");
}

/* ==========================================================================
   DATA MANAGEMENT & LOCALSTORAGE
   ========================================================================== */
function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      caseStudies = JSON.parse(stored);
    } catch (e) {
      console.error("Gagal mem-parsing data dari localStorage:", e);
      caseStudies = [...DEFAULT_CASE_STUDIES];
      saveData();
    }
  } else {
    caseStudies = [...DEFAULT_CASE_STUDIES];
    saveData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(caseStudies));
}

function resetToDefault() {
  if (confirm("Apakah Anda yakin ingin mengembalikan studi kasus ke default data bawaan? Perubahan kustom akan ditimpa.")) {
    caseStudies = [...DEFAULT_CASE_STUDIES];
    saveData();
    renderAll();
    showToast("Data studi kasus berhasil dikembalikan ke bawaan!", "info");
  }
}

/* ==========================================================================
   EVENT LISTENERS
   ========================================================================== */
function setupEventListeners() {
  // Theme toggle
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // Search input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCards();
    });
  }

  // Difficulty filter
  const diffFilter = document.getElementById("difficultyFilter");
  if (diffFilter) {
    diffFilter.addEventListener("change", (e) => {
      currentDifficulty = e.target.value;
      renderCards();
    });
  }

  // Form submit (Add / Edit)
  const caseForm = document.getElementById("caseForm");
  if (caseForm) {
    caseForm.addEventListener("submit", handleFormSubmit);
  }

  // Reset data button
  const resetBtn = document.getElementById("btnResetDefault");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetToDefault);
  }

  // Export JSON button
  const exportBtn = document.getElementById("btnExportData");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportDataToJSON);
  }

  // Import JSON input
  const importInput = document.getElementById("importFileInput");
  if (importInput) {
    importInput.addEventListener("change", importDataFromJSON);
  }
}

/* ==========================================================================
   RENDER FUNCTIONS
   ========================================================================== */
function renderAll() {
  renderCategoryPills();
  renderCards();
  updateStats();
}

function updateStats() {
  const totalCountEl = document.getElementById("totalCount");
  const catCountEl = document.getElementById("categoryCount");
  const codeCountEl = document.getElementById("codeCount");

  const categories = new Set(caseStudies.map((c) => c.category));

  if (totalCountEl) totalCountEl.textContent = caseStudies.length;
  if (catCountEl) catCountEl.textContent = categories.size;
  if (codeCountEl) codeCountEl.textContent = caseStudies.length;
}

function renderCategoryPills() {
  const container = document.getElementById("categoryPillsContainer");
  if (!container) return;

  const categories = ["all", ...new Set(caseStudies.map((c) => c.category))];

  container.innerHTML = categories
    .map((cat) => {
      const label = cat === "all" ? "Semua Topik" : cat;
      const count =
        cat === "all"
          ? caseStudies.length
          : caseStudies.filter((c) => c.category === cat).length;
      const activeClass = currentCategory === cat ? "active" : "";

      return `
      <button type="button" class="filter-pill ${activeClass}" onclick="setCategoryFilter('${cat}')">
        ${label} <span class="badge rounded-pill bg-secondary ms-1 opacity-75">${count}</span>
      </button>
    `;
    })
    .join("");
}

function setCategoryFilter(cat) {
  currentCategory = cat;
  renderCategoryPills();
  renderCards();
}

function getFilteredCases() {
  return caseStudies.filter((item) => {
    const matchCategory =
      currentCategory === "all" || item.category === currentCategory;
    const matchDifficulty =
      currentDifficulty === "all" || item.difficulty === currentDifficulty;
    const matchSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery) ||
      item.summary.toLowerCase().includes(searchQuery) ||
      (item.problemStatement && item.problemStatement.toLowerCase().includes(searchQuery)) ||
      (item.code && item.code.toLowerCase().includes(searchQuery));

    return matchCategory && matchDifficulty && matchSearch;
  });
}

function renderCards() {
  const container = document.getElementById("cardsContainer");
  const emptyState = document.getElementById("emptyState");
  if (!container) return;

  const filtered = getFilteredCases();

  if (filtered.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("d-none");
    return;
  }

  if (emptyState) emptyState.classList.add("d-none");

  container.innerHTML = filtered
    .map((item) => {
      let diffBadgeClass = "badge-diff-mudah";
      if (item.difficulty === "Menengah") diffBadgeClass = "badge-diff-menengah";
      if (item.difficulty === "Sulit") diffBadgeClass = "badge-diff-sulit";

      const formattedDate = item.date
        ? new Date(item.date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Baru";

      return `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="study-card shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge-category"><i class="bi bi-tag-fill me-1"></i>${escapeHtml(item.category)}</span>
              <span class="${diffBadgeClass}"><i class="bi bi-speedometer2 me-1"></i>${escapeHtml(item.difficulty)}</span>
            </div>

            <h5 class="card-title text-truncate-2 mt-2">${escapeHtml(item.title)}</h5>
            <p class="card-text">${escapeHtml(item.summary)}</p>

            <div class="d-flex align-items-center text-muted small mb-3 border-top pt-2">
              <i class="bi bi-person-fill me-1"></i> ${escapeHtml(item.author || "Mahasiswa")}
              <span class="mx-2">•</span>
              <i class="bi bi-calendar3 me-1"></i> ${formattedDate}
            </div>

            <div class="d-flex gap-2">
              <button class="btn btn-primary btn-sm flex-grow-1" onclick="openDetailModal('${item.id}')">
                <i class="bi bi-code-slash me-1"></i> Buka Solusi
              </button>
              <button class="btn btn-outline-secondary btn-sm" title="Edit Kasus" onclick="openEditModal('${item.id}')">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-outline-danger btn-sm" title="Hapus Kasus" onclick="deleteCase('${item.id}')">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

/* ==========================================================================
   DETAIL MODAL
   ========================================================================== */
function openDetailModal(id) {
  const item = caseStudies.find((c) => c.id === id);
  if (!item) return;

  document.getElementById("detailModalTitle").textContent = item.title;
  document.getElementById("detailModalCategory").textContent = item.category;
  document.getElementById("detailModalDifficulty").textContent = item.difficulty;
  document.getElementById("detailModalAuthor").textContent = item.author || "Mahasiswa";
  document.getElementById("detailModalDate").textContent = item.date || "-";

  // Badges styling
  const diffBadge = document.getElementById("detailModalDifficulty");
  diffBadge.className = "badge";
  if (item.difficulty === "Mudah") diffBadge.classList.add("bg-success");
  else if (item.difficulty === "Menengah") diffBadge.classList.add("bg-warning", "text-dark");
  else diffBadge.classList.add("bg-danger");

  // Problem statement
  document.getElementById("detailProblemStatement").textContent =
    item.problemStatement || item.summary;

  // Flowchart steps
  const stepsContainer = document.getElementById("detailFlowchartSteps");
  if (item.flowchartSteps && item.flowchartSteps.length > 0) {
    stepsContainer.innerHTML = item.flowchartSteps
      .map((step) => `<li>${escapeHtml(step)}</li>`)
      .join("");
  } else {
    stepsContainer.innerHTML = `<li>Ikuti alur logika pada kode program terlampir.</li>`;
  }

  // Complexity
  document.getElementById("detailComplexity").textContent =
    item.complexity || "Belum dicantumkan analisis kompleksitas.";

  // Sample IO
  document.getElementById("detailSampleInput").textContent =
    item.sampleInput || "Tidak ada data sampel masukan.";
  document.getElementById("detailSampleOutput").textContent =
    item.sampleOutput || "Tidak ada data sampel keluaran.";

  // Code block with Prism
  const codeContainer = document.getElementById("detailCodeBlock");
  codeContainer.textContent = item.code || "// Belum ada kode C++.";

  // Download & Copy button setup
  const btnDownloadCpp = document.getElementById("btnDownloadCpp");
  btnDownloadCpp.onclick = () => downloadCppFile(item);

  const btnCopyDetail = document.getElementById("btnCopyCodeDetail");
  btnCopyDetail.onclick = () => copyToClipboard(item.code);

  // Trigger Prism syntax highlight
  if (window.Prism) {
    Prism.highlightElement(codeContainer);
  }

  // Switch to first tab by default
  const firstTabTrigger = document.querySelector("#detailTab button:first-child");
  if (firstTabTrigger) {
    const tabInstance = new bootstrap.Tab(firstTabTrigger);
    tabInstance.show();
  }

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("detailModal"));
  modal.show();
}

/* ==========================================================================
   ADD & EDIT MODAL
   ========================================================================== */
function openAddModal() {
  editingCaseId = null;
  document.getElementById("caseFormModalTitle").innerHTML =
    '<i class="bi bi-plus-circle me-2"></i> Tambah Studi Kasus Baru';
  document.getElementById("caseForm").reset();
  document.getElementById("formId").value = "";

  const modal = new bootstrap.Modal(document.getElementById("caseFormModal"));
  modal.show();
}

function openEditModal(id) {
  const item = caseStudies.find((c) => c.id === id);
  if (!item) return;

  editingCaseId = id;
  document.getElementById("caseFormModalTitle").innerHTML =
    '<i class="bi bi-pencil-square me-2"></i> Edit Studi Kasus';

  document.getElementById("formId").value = item.id;
  document.getElementById("formTitle").value = item.title;
  document.getElementById("formCategory").value = item.category;
  document.getElementById("formDifficulty").value = item.difficulty;
  document.getElementById("formAuthor").value = item.author || "";
  document.getElementById("formSummary").value = item.summary;
  document.getElementById("formProblem").value = item.problemStatement || "";
  document.getElementById("formSteps").value = (item.flowchartSteps || []).join("\n");
  document.getElementById("formComplexity").value = item.complexity || "";
  document.getElementById("formSampleInput").value = item.sampleInput || "";
  document.getElementById("formSampleOutput").value = item.sampleOutput || "";
  document.getElementById("formCode").value = item.code;

  const modal = new bootstrap.Modal(document.getElementById("caseFormModal"));
  modal.show();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById("formId").value || "kasus-" + Date.now();
  const title = document.getElementById("formTitle").value.trim();
  const category = document.getElementById("formCategory").value.trim();
  const difficulty = document.getElementById("formDifficulty").value;
  const author = document.getElementById("formAuthor").value.trim() || "Mahasiswa Alpro";
  const summary = document.getElementById("formSummary").value.trim();
  const problemStatement = document.getElementById("formProblem").value.trim();
  const stepsRaw = document.getElementById("formSteps").value.trim();
  const flowchartSteps = stepsRaw ? stepsRaw.split("\n").filter((s) => s.trim().length > 0) : [];
  const complexity = document.getElementById("formComplexity").value.trim();
  const sampleInput = document.getElementById("formSampleInput").value.trim();
  const sampleOutput = document.getElementById("formSampleOutput").value.trim();
  const code = document.getElementById("formCode").value;

  const caseData = {
    id,
    title,
    category,
    difficulty,
    author,
    date: new Date().toISOString().split("T")[0],
    summary,
    problemStatement,
    flowchartSteps,
    complexity,
    sampleInput,
    sampleOutput,
    code,
  };

  if (editingCaseId) {
    const index = caseStudies.findIndex((c) => c.id === editingCaseId);
    if (index !== -1) {
      caseStudies[index] = { ...caseStudies[index], ...caseData };
      showToast("Studi kasus berhasil diperbarui!", "success");
    }
  } else {
    caseStudies.unshift(caseData);
    showToast("Studi kasus baru berhasil ditambahkan!", "success");
  }

  saveData();
  renderAll();

  // Close modal
  const modalEl = document.getElementById("caseFormModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();
}

function deleteCase(id) {
  const item = caseStudies.find((c) => c.id === id);
  if (!item) return;

  if (confirm(`Apakah Anda yakin ingin menghapus studi kasus "${item.title}"?`)) {
    caseStudies = caseStudies.filter((c) => c.id !== id);
    saveData();
    renderAll();
    showToast("Studi kasus berhasil dihapus.", "warning");
  }
}

/* ==========================================================================
   UTILITY ACTIONS (COPY, DOWNLOAD .CPP, EXPORT/IMPORT JSON)
   ========================================================================== */
function copyToClipboard(text) {
  if (!navigator.clipboard) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showToast("Kode berhasil disalin ke clipboard!", "success");
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showToast("Kode C++ berhasil disalin!", "success");
  }).catch((err) => {
    console.error("Gagal menyalin kode:", err);
    showToast("Gagal menyalin kode!", "danger");
  });
}

function downloadCppFile(item) {
  const filename = (item.title.toLowerCase().replace(/[^a-z0-9]/g, "_") || "kasus_alpro") + ".cpp";
  const blob = new Blob([item.code], { type: "text/x-c++src;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`File "${filename}" berhasil diunduh!`, "success");
}

function exportDataToJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(caseStudies, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `alpro_cpp_cases_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Seluruh data studi kasus berhasil diekspor sebagai JSON.", "info");
}

function importDataFromJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        if (confirm(`Impor ${imported.length} studi kasus? Tindakan ini akan menggabungkan dengan studi kasus yang ada.`)) {
          // Merge avoiding ID duplication
          imported.forEach((newItem) => {
            const existsIndex = caseStudies.findIndex((c) => c.id === newItem.id);
            if (existsIndex >= 0) {
              caseStudies[existsIndex] = newItem;
            } else {
              caseStudies.push(newItem);
            }
          });
          saveData();
          renderAll();
          showToast(`Berhasil mengimpor ${imported.length} studi kasus!`, "success");
        }
      } else {
        alert("Format JSON tidak valid: Harap unggah file array data studi kasus.");
      }
    } catch (err) {
      alert("Gagal membaca file JSON: " + err.message);
    }
  };
  reader.readAsText(file);
  event.target.value = ""; // Reset file input
}

function showToast(message, type = "primary") {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const toastId = "toast-" + Date.now();
  const iconMap = {
    success: "bi-check-circle-fill",
    warning: "bi-exclamation-triangle-fill",
    danger: "bi-x-circle-fill",
    info: "bi-info-circle-fill",
    primary: "bi-bell-fill"
  };
  const icon = iconMap[type] || "bi-info-circle-fill";

  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center text-bg-${type} border-0 shadow" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center">
          <i class="bi ${icon} fs-5 me-2"></i>
          <div>${escapeHtml(message)}</div>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML("beforeend", toastHtml);
  const toastEl = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
  toast.show();

  toastEl.addEventListener("hidden.bs.toast", () => {
    toastEl.remove();
  });
}

function escapeHtml(text) {
  if (typeof text !== "string") return text;
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
