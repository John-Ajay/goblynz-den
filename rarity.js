// ─── RARITY CHECKER ───────────────────────────────────────────────────────

const { generateGoblynz, calcRarityScore, calcRank, TIER_COLORS } = window.GoblynzTraits;

function analyzeToken(tokenId) {
  const id = parseInt(tokenId);
  if (!id || id < 1 || id > 4800) {
    alert("please enter a valid token id between 1 and 4800");
    return;
  }

  const traits   = generateGoblynz(id);
  const score    = calcRarityScore(traits);
  const rank     = calcRank(score, id);
  const topPct   = ((rank / 4800) * 100).toFixed(1);
  const tier     = score > 1400 ? "legendary" : score > 900 ? "epic" : score > 600 ? "rare" : score > 380 ? "uncommon" : "common";

  renderGoblynCard(id, score, rank, topPct, tier);
  renderTraits(traits);
  document.getElementById("results-panel").style.display = "grid";
  document.getElementById("results-panel").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderGoblynCard(id, score, rank, topPct, tier) {
  document.getElementById("goblyn-id-display").textContent = `#${String(id).padStart(4,"0")}`;
  document.getElementById("goblyn-id").textContent         = `#${String(id).padStart(4,"0")}`;
  document.getElementById("goblyn-name").innerHTML         = `goblynz <span id="goblyn-id">#${String(id).padStart(4,"0")}</span>`;
  document.getElementById("rarity-score").textContent      = score.toLocaleString();
  document.getElementById("rarity-rank").textContent       = `#${rank.toLocaleString()}`;
  document.getElementById("rarity-percentile").textContent = `${topPct}%`;
  document.getElementById("rarity-tier").innerHTML         = `<span class="badge ${tier}">${tier}</span>`;

  const barPct = Math.min(100, Math.round((score / 2000) * 100));
  document.getElementById("rarity-bar").style.width = `${barPct}%`;

  const barEl = document.getElementById("rarity-bar");
  barEl.style.background = TIER_COLORS[tier];

  // Try to load image from opensea/collection (will 404 pre-reveal, shows placeholder)
  const art = document.getElementById("goblyn-art");
  const existing = art.querySelector("img");
  if (existing) existing.remove();
  const placeholder = document.getElementById("goblyn-placeholder");
  const img = document.createElement("img");
  img.src = `https://i.seadn.io/goblynz/${id}.png`;
  img.onerror = () => { img.remove(); placeholder.style.display = "flex"; };
  img.onload  = () => { placeholder.style.display = "none"; };
  placeholder.style.display = "flex";
  art.appendChild(img);
}

function renderTraits(traits) {
  const list  = document.getElementById("traits-list");
  const count = document.getElementById("trait-count");
  list.innerHTML = "";
  const entries = Object.entries(traits);
  count.textContent = `${entries.length} traits`;

  entries.forEach(([cat, t]) => {
    const div = document.createElement("div");
    div.className = "trait-item";
    const barColor = TIER_COLORS[t.tier];
    const barWidth = Math.max(4, Math.round((1 - t.pct / 100) * 100));
    div.innerHTML = `
      <div class="trait-category">${t.label}</div>
      <div class="trait-value">${t.value}</div>
      <div class="trait-rarity-bar">
        <div class="trait-rarity-fill" style="width:${barWidth}%;background:${barColor}"></div>
      </div>
      <div class="trait-pct">
        <span>${t.pct.toFixed(1)}% have this</span>
        <span class="trait-badge ${t.tier}">${t.tier}</span>
      </div>
    `;
    list.appendChild(div);
  });
}

function renderChart() {
  const chart = document.getElementById("rarity-chart");
  chart.innerHTML = "";
  const tiers = [
    { key: "legendary", color: TIER_COLORS.legendary, count: 96 },
    { key: "epic",      color: TIER_COLORS.epic,      count: 240 },
    { key: "rare",      color: TIER_COLORS.rare,      count: 672 },
    { key: "uncommon",  color: TIER_COLORS.uncommon,  count: 1152 },
    { key: "common",    color: TIER_COLORS.common,    count: 2640 },
  ];
  const max = Math.max(...tiers.map(t => t.count));
  tiers.forEach(t => {
    const pct = Math.round((t.count / max) * 100);
    const g = document.createElement("div");
    g.className = "chart-bar-group";
    g.innerHTML = `
      <div class="chart-bar-label">${t.count.toLocaleString()}</div>
      <div class="chart-bar-inner" style="height:${pct}%;background:${t.color};opacity:0.7"></div>
    `;
    chart.appendChild(g);
  });
}

function handleShare() {
  const id    = document.getElementById("goblyn-id-display").textContent;
  const score = document.getElementById("rarity-score").textContent;
  const rank  = document.getElementById("rarity-rank").textContent;
  const text  = `🔺 goblynz ${id}\nrarity score: ${score}\nrank: ${rank}\n\ncheck yours → https://goblynz.xyz\n\n#goblynz #nft`;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("share-btn");
    const orig = btn.textContent;
    btn.textContent = "copied! ✓";
    setTimeout(() => btn.textContent = orig, 2000);
  });
}

// Init rarity tab
function initRarity() {
  renderChart();

  document.getElementById("lookup-btn").addEventListener("click", () => {
    analyzeToken(document.getElementById("token-id-input").value);
  });

  document.getElementById("token-id-input").addEventListener("keydown", e => {
    if (e.key === "Enter") analyzeToken(e.target.value);
  });

  document.getElementById("random-btn").addEventListener("click", () => {
    const id = Math.floor(Math.random() * 4800) + 1;
    document.getElementById("token-id-input").value = id;
    analyzeToken(id);
  });

  document.getElementById("share-btn").addEventListener("click", handleShare);
}

window.initRarity = initRarity;
