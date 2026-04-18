# ◆ goblynz den — rarity checker + wl forge

> unofficial community tool · be weird. normal is crowded.

A fan-built dashboard for the [Goblynz NFT](https://goblynz.xyz) community featuring:

- **Rarity Checker** — analyze any goblynz token by ID, see trait breakdown, rarity score, rank, and tier
- **WL Forge** — full allowlist manager with phase management, duplicate detection, wallet validation, and CSV export

---

## getting started locally

### prerequisites
- any modern browser (Chrome, Firefox, Safari, Edge)
- no build step required — pure HTML/CSS/JS

### run locally

**Option A — just open the file**
```
open index.html
```
or double-click `index.html` in Finder / Explorer.

**Option B — local dev server (recommended, avoids CORS issues)**

Using VS Code Live Server:
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click `index.html` → "Open with Live Server"
3. Opens at `http://127.0.0.1:5500`

Using Python (if installed):
```bash
# Python 3
python3 -m http.server 8080
# then open http://localhost:8080
```

Using Node (if installed):
```bash
npx serve .
```

---

## project structure

```
goblynz-den/
├── index.html          # main app shell, nav, tabs, HTML structure
├── css/
│   └── style.css       # full design system — dark misfit aesthetic
├── js/
│   ├── traits.js       # trait pool data + rarity scoring engine
│   ├── rarity.js       # rarity checker logic + DOM rendering
│   ├── forge.js        # wl forge — allowlist manager
│   └── app.js          # tab routing + app init
└── README.md
```

---

## deploying to GitHub Pages

### step 1 — create a GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it `goblynz-den` (or anything you like)
3. Set it to **Public**
4. Do NOT initialize with a README (you already have one)
5. Click **Create repository**

### step 2 — push your code

Open your terminal in the project folder:

```bash
# initialize git
git init

# add all files
git add .

# first commit
git commit -m "initial: goblynz den — rarity checker + wl forge"

# connect to your github repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/goblynz-den.git

# push
git branch -M main
git push -u origin main
```

### step 3 — enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Source" select **Deploy from a branch**
4. Branch: `main`, Folder: `/ (root)`
5. Click **Save**
6. After ~60 seconds your site is live at:
   `https://YOUR_USERNAME.github.io/goblynz-den`

---

## connecting real metadata (post-reveal)

After the Goblynz collection reveals on April 25, replace the simulated data:

1. Fetch the collection metadata from the contract:
   ```
   Contract: 0x131e64936a9ddf8fb94967d8c316a16c7fc7d0c2
   ```

2. Update `js/traits.js` — replace `TRAIT_POOL` with real trait distributions from the revealed metadata.

3. Update `renderGoblynCard()` in `js/rarity.js` — replace the placeholder image URL with the actual Arweave/IPFS gateway URL pattern for the collection.

---

## features roadmap

- [ ] Real on-chain metadata integration (post-reveal)
- [ ] Merkle tree generation for smart contract use
- [ ] Wallet connect integration for auto-lookup
- [ ] Export to Merkle format for contract deployment
- [ ] Share card image generation (canvas)
- [ ] Discord bot integration

---

## built for the den

This is an unofficial fan tool built to support the Goblynz community.  
Not affiliated with the official Goblynz team.

[goblynz.xyz](https://goblynz.xyz) · [x/twitter](https://x.com/goblynznft) · [discord](https://discord.gg/goblynz) · [opensea](https://opensea.io/collection/goblynz)

---

*be weird. normal is crowded.*
