// ─── GOBLYNZ TRAIT DATA ───────────────────────────────────────────────────
// Simulated trait pool based on the 4,800 collection
// Replace with real metadata JSON post-reveal

const TRAIT_POOL = {
  background: {
    label: "Background",
    traits: [
      { value: "Cursed Swamp",    pct: 2.1,  tier: "legendary" },
      { value: "Void Black",      pct: 3.4,  tier: "legendary" },
      { value: "Goblin Ruins",    pct: 5.8,  tier: "epic" },
      { value: "Moldy Cavern",    pct: 7.2,  tier: "epic" },
      { value: "Sewer Mist",      pct: 9.4,  tier: "rare" },
      { value: "Rotted Forest",   pct: 11.3, tier: "rare" },
      { value: "Toxic Green",     pct: 13.6, tier: "uncommon" },
      { value: "Dungeon Stone",   pct: 15.1, tier: "uncommon" },
      { value: "Mud Brown",       pct: 17.4, tier: "common" },
      { value: "Dull Ochre",      pct: 14.7, tier: "common" },
    ]
  },
  skin: {
    label: "Skin",
    traits: [
      { value: "Cursed Void",     pct: 1.2,  tier: "legendary" },
      { value: "Bioluminescent",  pct: 2.8,  tier: "legendary" },
      { value: "Fungal Bloom",    pct: 4.6,  tier: "epic" },
      { value: "Rotting Flesh",   pct: 6.3,  tier: "epic" },
      { value: "Swamp Green",     pct: 9.1,  tier: "rare" },
      { value: "Sickly Yellow",   pct: 12.4, tier: "rare" },
      { value: "Pale Ash",        pct: 14.8, tier: "uncommon" },
      { value: "Mud Green",       pct: 16.2, tier: "uncommon" },
      { value: "Olive",           pct: 17.8, tier: "common" },
      { value: "Mossy Brown",     pct: 14.8, tier: "common" },
    ]
  },
  eyes: {
    label: "Eyes",
    traits: [
      { value: "Spectral White",  pct: 1.8,  tier: "legendary" },
      { value: "Third Eye",       pct: 3.2,  tier: "legendary" },
      { value: "Bloodshot Gold",  pct: 5.1,  tier: "epic" },
      { value: "Milky Dead",      pct: 7.4,  tier: "epic" },
      { value: "Toxic Yellow",    pct: 10.2, tier: "rare" },
      { value: "Glowing Red",     pct: 12.8, tier: "rare" },
      { value: "Sunken Black",    pct: 14.9, tier: "uncommon" },
      { value: "Beady Brown",     pct: 16.3, tier: "uncommon" },
      { value: "Squinting",       pct: 14.4, tier: "common" },
      { value: "Wide Blank",      pct: 13.9, tier: "common" },
    ]
  },
  mouth: {
    label: "Mouth",
    traits: [
      { value: "Void Maw",        pct: 2.4,  tier: "legendary" },
      { value: "Gold Fang",       pct: 3.8,  tier: "legendary" },
      { value: "Broken Jaw",      pct: 5.6,  tier: "epic" },
      { value: "Rotten Grin",     pct: 7.9,  tier: "epic" },
      { value: "Crooked Teeth",   pct: 10.6, tier: "rare" },
      { value: "Missing Tooth",   pct: 12.1, tier: "rare" },
      { value: "Mumbling",        pct: 14.7, tier: "uncommon" },
      { value: "Sneering",        pct: 15.8, tier: "uncommon" },
      { value: "Grumpy Frown",    pct: 14.3, tier: "common" },
      { value: "Blank Stare",     pct: 12.8, tier: "common" },
    ]
  },
  head: {
    label: "Head",
    traits: [
      { value: "Cursed Crown",    pct: 1.4,  tier: "legendary" },
      { value: "Witch Hat",       pct: 2.9,  tier: "legendary" },
      { value: "Rusty Helmet",    pct: 4.7,  tier: "epic" },
      { value: "Bone Headband",   pct: 6.8,  tier: "epic" },
      { value: "Mushroom Cap",    pct: 9.3,  tier: "rare" },
      { value: "Rat Nest Hair",   pct: 11.9, tier: "rare" },
      { value: "Matted Mane",     pct: 14.6, tier: "uncommon" },
      { value: "Bald",            pct: 16.4, tier: "uncommon" },
      { value: "Scraggly Hair",   pct: 17.1, tier: "common" },
      { value: "None",            pct: 14.9, tier: "common" },
    ]
  },
  clothing: {
    label: "Clothing",
    traits: [
      { value: "Void Robe",       pct: 1.9,  tier: "legendary" },
      { value: "Elder Cloak",     pct: 3.3,  tier: "legendary" },
      { value: "Tattered Armor",  pct: 5.4,  tier: "epic" },
      { value: "Bone Vest",       pct: 7.1,  tier: "epic" },
      { value: "Sewer Rags",      pct: 10.4, tier: "rare" },
      { value: "Torn Tunic",      pct: 12.6, tier: "rare" },
      { value: "Muddy Wrap",      pct: 14.8, tier: "uncommon" },
      { value: "Burlap Sack",     pct: 16.2, tier: "uncommon" },
      { value: "Nothing",         pct: 15.4, tier: "common" },
      { value: "Filthy Rag",      pct: 12.9, tier: "common" },
    ]
  },
  accessory: {
    label: "Accessory",
    traits: [
      { value: "Cursed Amulet",   pct: 1.6,  tier: "legendary" },
      { value: "Skull Necklace",  pct: 3.1,  tier: "legendary" },
      { value: "Rusty Chain",     pct: 5.2,  tier: "epic" },
      { value: "Bone Ring",       pct: 7.6,  tier: "epic" },
      { value: "Rat Familiar",    pct: 10.1, tier: "rare" },
      { value: "Twig Staff",      pct: 12.4, tier: "rare" },
      { value: "Broken Bottle",   pct: 15.1, tier: "uncommon" },
      { value: "None",            pct: 21.3, tier: "common" },
      { value: "Muddy Pouch",     pct: 14.2, tier: "uncommon" },
      { value: "Dead Flower",     pct: 9.4,  tier: "rare" },
    ]
  },
  special: {
    label: "Special",
    traits: [
      { value: "1/1 Unique",      pct: 0.27, tier: "legendary" },
      { value: "Cursed Mark",     pct: 2.1,  tier: "legendary" },
      { value: "Glow Aura",       pct: 4.3,  tier: "epic" },
      { value: "Fungal Growth",   pct: 6.8,  tier: "epic" },
      { value: "Scar",            pct: 11.2, tier: "rare" },
      { value: "Tattoo",          pct: 13.6, tier: "rare" },
      { value: "None",            pct: 61.73,tier: "common" },
    ]
  }
};

const TIER_COLORS = {
  legendary: "#f0cc70",
  epic:      "#c07aff",
  rare:      "#5aacff",
  uncommon:  "#5adf8a",
  common:    "#6b6047"
};

const TIER_THRESHOLDS = {
  legendary: 5,
  epic:      10,
  rare:      20,
  uncommon:  40,
  common:    Infinity
};

function getTier(pct) {
  if (pct <= TIER_THRESHOLDS.legendary) return "legendary";
  if (pct <= TIER_THRESHOLDS.epic)      return "epic";
  if (pct <= TIER_THRESHOLDS.rare)      return "rare";
  if (pct <= TIER_THRESHOLDS.uncommon)  return "uncommon";
  return "common";
}

// Seeded pseudo-random for deterministic results per token ID
function seededRand(seed) {
  let s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function generateGoblynz(tokenId) {
  const rand = seededRand(tokenId * 7919 + 31337);
  const traits = {};

  for (const [cat, data] of Object.entries(TRAIT_POOL)) {
    const pool = data.traits;
    const roll = rand() * 100;
    let cumulative = 0;
    let chosen = pool[pool.length - 1];
    for (const t of pool) {
      cumulative += t.pct;
      if (roll <= cumulative) { chosen = t; break; }
    }
    traits[cat] = { ...chosen, label: data.label };
  }

  return traits;
}

function calcRarityScore(traits) {
  let score = 0;
  for (const t of Object.values(traits)) {
    score += (100 / t.pct);
  }
  return Math.round(score);
}

function calcRank(score, tokenId) {
  // Deterministic rank based on score (simulated)
  const maxScore = 2800;
  const minScore = 180;
  const normalised = (score - minScore) / (maxScore - minScore);
  const rank = Math.max(1, Math.round(4800 - normalised * 4798));
  return rank;
}

// Export
window.GoblynzTraits = { TRAIT_POOL, TIER_COLORS, getTier, generateGoblynz, calcRarityScore, calcRank };
