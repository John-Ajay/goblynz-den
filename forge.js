// ─── WL FORGE — ALLOWLIST MANAGER ────────────────────────────────────────

const PHASES = {
  community_gtd:  { label: "community gtd",  cap: 1000, color: "#c8a84b" },
  wl_collections: { label: "wl collections", cap: 300,  color: "#9b6bc4" },
  collab_gtd:     { label: "collab gtd",     cap: 2100, color: "#5a9e4a" },
  fcfs:           { label: "fcfs",           cap: 410,  color: "#b04040" },
};

// State
let wallets = []; // { address, phase, addedAt }
let currentPhase = "community_gtd";
let lastPreview = null;

// ─── ETH Address Validation ───────────────────────────────────────────────
function isValidEth(addr) {
  return /^0x[0-9a-fA-F]{40}$/.test(addr.trim());
}

function normalizeAddr(addr) {
  return addr.trim().toLowerCase();
}

// ─── Parse Input ──────────────────────────────────────────────────────────
function parseInput(raw) {
  const lines = raw
    .replace(/,/g, "\n")
    .split(/\n/)
    .map(l => l.trim())
    .filter(Boolean);

  const existingSet = new Set(wallets.map(w => w.address.toLowerCase()));
  const seen = new Set();
  const results = [];

  lines.forEach(line => {
    if (!isValidEth(line)) {
      results.push({ raw: line, status: "invalid" });
      return;
    }
    const norm = normalizeAddr(line);
    if (existingSet.has(norm) || seen.has(norm)) {
      results.push({ raw: line, address: norm, status: "dup" });
    } else {
      seen.add(norm);
      results.push({ raw: line, address: norm, status: "new" });
    }
  });

  return results;
}

// ─── Render Parse Report ──────────────────────────────────────────────────
function renderParseReport(results) {
  const total   = results.length;
  const newOnes = results.filter(r => r.status === "new").length;
  const dups    = results.filter(r => r.status === "dup").length;
  const invalid = results.filter(r => r.status === "invalid").length;

  document.getElementById("dupe-total").textContent   = total;
  document.getElementById("dupe-new").textContent     = newOnes;
  document.getElementById("dupe-dupe").textContent    = dups;
  document.getElementById("dupe-invalid").textContent = invalid;

  const list = document.getElementById("dupe-list");
  list.innerHTML = "";
  results.slice(0, 40).forEach(r => {
    const row = document.createElement("div");
    row.className = "dupe-row";
    const tagClass = r.status === "new" ? "new" : r.status === "dup" ? "dup" : "invalid";
    const tagLabel = r.status === "new" ? "new" : r.status === "dup" ? "duplicate" : "invalid";
    const display  = r.address || r.raw;
    row.innerHTML = `
      <span class="dupe-addr">${display}</span>
      <span class="dupe-tag ${tagClass}">${tagLabel}</span>
    `;
    list.appendChild(row);
  });
  if (results.length > 40) {
    const more = document.createElement("div");
    more.className = "dupe-row";
    more.innerHTML = `<span class="dupe-addr" style="font-style:italic;color:var(--text3)">...and ${results.length - 40} more</span>`;
    list.appendChild(more);
  }

  document.getElementById("dupe-card").style.display = "block";
  lastPreview = results;
}

// ─── Add Wallets ──────────────────────────────────────────────────────────
function addWallets() {
  const raw = document.getElementById("wallet-input").value;
  if (!raw.trim()) return;

  const results = parseInput(raw);
  const newWallets = results
    .filter(r => r.status === "new")
    .map(r => ({
      address:  r.address,
      phase:    currentPhase,
      addedAt:  new Date().toISOString(),
    }));

  wallets = [...wallets, ...newWallets];
  renderParseReport(results);
  renderTable();
  renderCapacity();
  updatePhaseCounts();
  document.getElementById("wallet-input").value = "";
  document.getElementById("wallet-parse-hint").textContent =
    `${newWallets.length} wallets added · ${results.filter(r=>r.status==="dup").length} duplicates skipped`;
}

// ─── Remove Wallet ────────────────────────────────────────────────────────
function removeWallet(address) {
  wallets = wallets.filter(w => w.address !== address);
  renderTable();
  renderCapacity();
  updatePhaseCounts();
}

// ─── Render Table ─────────────────────────────────────────────────────────
function renderTable(filterPhase = "all", search = "") {
  const tbody = document.getElementById("wl-tbody");
  tbody.innerHTML = "";

  let filtered = wallets.filter(w => {
    const matchPhase  = filterPhase === "all" || w.phase === filterPhase;
    const matchSearch = !search || w.address.includes(search.toLowerCase());
    return matchPhase && matchSearch;
  });

  document.getElementById("table-count").textContent   = `${wallets.length} wallets total`;
  document.getElementById("table-showing").textContent = `showing ${filtered.length}`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="5">no wallets match · add some above</td></tr>`;
    return;
  }

  filtered.forEach((w, i) => {
    const tr = document.createElement("tr");
    const date = new Date(w.addedAt);
    const dateStr = `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2,"0")}`;
    const short = `${w.address.slice(0,6)}...${w.address.slice(-4)}`;
    tr.innerHTML = `
      <td style="color:var(--text3);width:40px">${i+1}</td>
      <td class="addr-cell" title="${w.address}">${short}</td>
      <td><span class="phase-pill ${w.phase}">${PHASES[w.phase].label}</span></td>
      <td style="color:var(--text3)">${dateStr}</td>
      <td><button class="remove-btn" data-addr="${w.address}" title="remove">✕</button></td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => removeWallet(btn.dataset.addr));
  });
}

// ─── Capacity Bars ────────────────────────────────────────────────────────
function renderCapacity() {
  const container = document.getElementById("capacity-bars");
  container.innerHTML = "";
  for (const [key, phase] of Object.entries(PHASES)) {
    const count = wallets.filter(w => w.phase === key).length;
    const pct   = Math.min(100, Math.round((count / phase.cap) * 100));
    const div   = document.createElement("div");
    div.className = "cap-row";
    div.innerHTML = `
      <div class="cap-header">
        <span class="cap-name">${phase.label}</span>
        <span class="cap-nums">${count.toLocaleString()} / ${phase.cap.toLocaleString()} <span style="color:var(--text3)">(${pct}%)</span></span>
      </div>
      <div class="cap-track">
        <div class="cap-fill" style="width:${pct}%;background:${phase.color}"></div>
      </div>
    `;
    container.appendChild(div);
  }
}

// ─── Phase Counts ─────────────────────────────────────────────────────────
function updatePhaseCounts() {
  for (const key of Object.keys(PHASES)) {
    const count = wallets.filter(w => w.phase === key).length;
    const el = document.getElementById(`count-${key}`);
    if (el) el.textContent = `${count} wallets`;
  }
}

// ─── Export CSV ───────────────────────────────────────────────────────────
function exportCSV() {
  if (wallets.length === 0) { alert("no wallets to export"); return; }
  const header = "address,phase,added_at\n";
  const rows   = wallets.map(w => `${w.address},${w.phase},${w.addedAt}`).join("\n");
  const blob   = new Blob([header + rows], { type: "text/csv" });
  const url    = URL.createObjectURL(blob);
  const a      = document.createElement("a");
  a.href       = url;
  a.download   = `goblynz-allowlist-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Init Forge ───────────────────────────────────────────────────────────
function initForge() {
  renderCapacity();
  renderTable();

  // Phase selector
  document.getElementById("phase-select").addEventListener("change", e => {
    currentPhase = e.target.value;
    document.querySelectorAll(".phase-card").forEach(c => {
      c.classList.toggle("active-phase", c.dataset.phase === currentPhase);
    });
  });

  // Phase cards click
  document.querySelectorAll(".phase-card").forEach(card => {
    card.addEventListener("click", () => {
      currentPhase = card.dataset.phase;
      document.getElementById("phase-select").value = currentPhase;
      document.querySelectorAll(".phase-card").forEach(c => {
        c.classList.toggle("active-phase", c.dataset.phase === currentPhase);
      });
    });
  });

  // Wallet input parse hint
  document.getElementById("wallet-input").addEventListener("input", e => {
    const raw = e.target.value;
    if (!raw.trim()) {
      document.getElementById("wallet-parse-hint").textContent = "paste addresses above to begin";
      return;
    }
    const lines = raw.replace(/,/g,"\n").split(/\n/).map(l=>l.trim()).filter(Boolean);
    document.getElementById("wallet-parse-hint").textContent = `${lines.length} lines detected`;
  });

  document.getElementById("parse-preview-btn").addEventListener("click", () => {
    const raw = document.getElementById("wallet-input").value;
    if (!raw.trim()) return;
    renderParseReport(parseInput(raw));
  });

  document.getElementById("add-wallets-btn").addEventListener("click", addWallets);

  document.getElementById("export-btn").addEventListener("click", exportCSV);

  document.getElementById("clear-all-btn").addEventListener("click", () => {
    if (!wallets.length) return;
    if (confirm(`remove all ${wallets.length} wallets from the allowlist?`)) {
      wallets = [];
      renderTable();
      renderCapacity();
      updatePhaseCounts();
      document.getElementById("dupe-card").style.display = "none";
    }
  });

  // Search + filter
  document.getElementById("search-input").addEventListener("input", e => {
    const phase = document.getElementById("filter-phase").value;
    renderTable(phase, e.target.value);
  });
  document.getElementById("filter-phase").addEventListener("change", e => {
    const search = document.getElementById("search-input").value;
    renderTable(e.target.value, search);
  });

  // Load demo data for showcase
  loadDemoData();
}

function loadDemoData() {
  const demo = [
    { address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045", phase: "community_gtd" },
    { address: "0xab5801a7d398351b8be11c439e05c5b3259aec9b", phase: "community_gtd" },
    { address: "0x742d35cc6634c0532925a3b844bc454e4438f44e", phase: "wl_collections" },
    { address: "0x3f17f1962b36e491b30a40b2405849e597ba5fb5", phase: "wl_collections" },
    { address: "0x6b175474e89094c44da98b954eedeac495271d0f", phase: "collab_gtd" },
    { address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", phase: "collab_gtd" },
    { address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", phase: "fcfs" },
  ];
  wallets = demo.map(d => ({ ...d, addedAt: new Date().toISOString() }));
  renderTable();
  renderCapacity();
  updatePhaseCounts();
}

window.initForge = initForge;
