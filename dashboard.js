// Jarvis Multi-Split - Painel

// cols/rows = grade inicial. foco = a primeira tela ocupa a coluna da esquerda inteira.
const LAYOUTS = {
  "single":      { nome: "1:1",   dica: "1 linha, telas infinitas para o lado", cols: 1, rows: 1, horizontal: true },
  "grid-2x2":    { nome: "2x2",   dica: "4 telas",                     cols: 2, rows: 2 },
  "focus-right": { nome: "Foco",  dica: "1 grande + 3 ao lado",        cols: 2, rows: 3, foco: true, larguras: [2.2, 1] },
  "columns-2":   { nome: "2 col", dica: "2 colunas altas",             cols: 2, rows: 1 },
  "columns-3":   { nome: "3 col", dica: "3 colunas altas",             cols: 3, rows: 1 },
  "columns-4":   { nome: "4 col", dica: "4 colunas altas",             cols: 4, rows: 1 },
  "grid-3x2":    { nome: "3x2",   dica: "6 telas",                     cols: 3, rows: 2 },
  "grid-2x3":    { nome: "2x3",   dica: "6 telas em pe",               cols: 2, rows: 3 },
  "grid-4x2":    { nome: "4x2",   dica: "8 telas",                     cols: 4, rows: 2 }
};

const ICONES_ESPACO = {
  livre: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  bot: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  video: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
  code: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  todos: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="18" rx="1.5"/><rect x="14" y="3" width="7" height="18" rx="1.5"/></svg>`
};

const TEMAS_ESPACO = [
  { cor: "#38bdf8", bg: "rgba(56, 189, 248, 0.12)", borda: "rgba(56, 189, 248, 0.35)", glow: "rgba(56, 189, 248, 0.25)" }, // Cyan / Sky
  { cor: "#f59e0b", bg: "rgba(245, 158, 11, 0.12)", borda: "rgba(245, 158, 11, 0.35)", glow: "rgba(245, 158, 11, 0.25)" }, // Amber / Gold
  { cor: "#a855f7", bg: "rgba(168, 85, 247, 0.12)", borda: "rgba(168, 85, 247, 0.35)", glow: "rgba(168, 85, 247, 0.25)" }, // Purple
  { cor: "#10b981", bg: "rgba(16, 185, 129, 0.12)", borda: "rgba(16, 185, 129, 0.35)", glow: "rgba(16, 185, 129, 0.25)" }, // Emerald
  { cor: "#ec4899", bg: "rgba(236, 72, 153, 0.12)", borda: "rgba(236, 72, 153, 0.35)", glow: "rgba(236, 72, 153, 0.25)" }, // Pink
  { cor: "#06b6d4", bg: "rgba(6, 182, 212, 0.12)", borda: "rgba(6, 182, 212, 0.35)", glow: "rgba(6, 182, 212, 0.25)" }, // Teal
  { cor: "#f97316", bg: "rgba(249, 115, 22, 0.12)", borda: "rgba(249, 115, 22, 0.35)", glow: "rgba(249, 115, 22, 0.25)" }  // Orange
];

const DEFAULT_PRESETS = {
  "Conselho IAs": {
    layout: "grid-3x2",
    icone: "bot",
    tiles: [
      { id: "tile-ia-chatgpt", url: "https://chatgpt.com/", title: "ChatGPT", zoom: 0.85 },
      { id: "tile-ia-claude", url: "https://claude.ai/", title: "Claude", zoom: 0.85 },
      { id: "tile-ia-gemini", url: "https://gemini.google.com/", title: "Gemini", zoom: 0.85 },
      { id: "tile-ia-perplexity", url: "https://www.perplexity.ai/", title: "Perplexity", zoom: 0.85 },
      { id: "tile-ia-deepseek", url: "https://chat.deepseek.com/", title: "DeepSeek", zoom: 0.85 },
      { id: "tile-ia-grok", url: "https://grok.com/", title: "Grok", zoom: 0.85 }
    ]
  },
  "Base Tática": {
    layout: "grid-3x2",
    icone: "layers",
    tiles: [
      { id: "tile-bt-kalodata", url: "https://kalodata.com", title: "Kalodata", zoom: 0.85 },
      { id: "tile-bt-chatgpt", url: "https://chatgpt.com/", title: "ChatGPT", zoom: 0.85 },
      { id: "tile-bt-claude", url: "https://claude.ai/", title: "Claude", zoom: 0.85 },
      { id: "tile-bt-manus", url: "https://manus.im/app", title: "Manus AI", zoom: 0.85 },
      { id: "tile-bt-deepseek", url: "https://chat.deepseek.com/", title: "DeepSeek", zoom: 0.85 },
      { id: "tile-bt-local", url: "http://127.0.0.1:8090/", title: "Local 8090", zoom: 0.85 }
    ]
  },
  "Rotinas": {
    layout: "grid-2x2",
    icone: "zap",
    tiles: [
      { id: "tile-r-tg", url: "https://web.telegram.org/a/", title: "Telegram", zoom: 0.85 },
      { id: "tile-r-wa", url: "https://web.whatsapp.com/", title: "WhatsApp", zoom: 0.85 },
      { id: "tile-r-notion", url: "https://www.notion.so/3d0d9d580e448084a8f6e6a0ed96a16f", title: "Notion", zoom: 0.90 },
      { id: "tile-r-noco", url: "http://localhost:8096/", title: "NocoDB", zoom: 0.85 }
    ]
  }
};

const DEFAULT_TILES = [
  { id: "tile-ia-chatgpt", url: "https://chatgpt.com/", title: "ChatGPT", zoom: 0.85 },
  { id: "tile-ia-claude", url: "https://claude.ai/", title: "Claude", zoom: 0.85 },
  { id: "tile-ia-gemini", url: "https://gemini.google.com/", title: "Gemini", zoom: 0.85 },
  { id: "tile-ia-perplexity", url: "https://www.perplexity.ai/", title: "Perplexity", zoom: 0.85 },
  { id: "tile-ia-deepseek", url: "https://chat.deepseek.com/", title: "DeepSeek", zoom: 0.85 },
  { id: "tile-ia-grok", url: "https://grok.com/", title: "Grok", zoom: 0.85 }
];

const DEFAULT_ATALHOS = [
  { title: "ChatGPT", url: "https://chatgpt.com/" },
  { title: "Claude", url: "https://claude.ai/" },
  { title: "Gemini", url: "https://gemini.google.com/" },
  { title: "Perplexity", url: "https://www.perplexity.ai/" },
  { title: "DeepSeek", url: "https://chat.deepseek.com/" },
  { title: "Grok", url: "https://grok.com/" },
  { title: "Manus AI", url: "https://manus.im/app" },
  { title: "Kalodata (Trends)", url: "https://kalodata.com" },
  { title: "Notion Anotações", url: "https://www.notion.so/3d0d9d580e448084a8f6e6a0ed96a16f" },
  { title: "NocoDB", url: "http://localhost:8096/" },
  { title: "Telegram", url: "https://web.telegram.org/a/" },
  { title: "WhatsApp", url: "https://web.whatsapp.com/" },
  { title: "YouTube", url: "https://www.youtube.com/" },
  { title: "Instagram", url: "https://www.instagram.com/" },
  { title: "Local 8090", url: "http://127.0.0.1:8090/" }
];

const DEFAULT_CATEGORIAS = [
  {
    id: "cat-ias",
    nome: "Conselho de IAs",
    aberta: true,
    links: [
      { title: "ChatGPT", url: "https://chatgpt.com/" },
      { title: "Claude", url: "https://claude.ai/" },
      { title: "Gemini", url: "https://gemini.google.com/" },
      { title: "Perplexity", url: "https://www.perplexity.ai/" },
      { title: "DeepSeek", url: "https://chat.deepseek.com/" },
      { title: "Grok", url: "https://grok.com/" },
      { title: "Manus AI", url: "https://manus.im/app" }
    ]
  },
  {
    id: "cat-trends",
    nome: "Trends & E-commerce",
    aberta: true,
    links: [
      { title: "Kalodata", url: "https://kalodata.com" },
      { title: "Local 8090", url: "http://127.0.0.1:8090/" }
    ]
  },
  {
    id: "cat-rotinas",
    nome: "Rotinas & Redes",
    aberta: true,
    links: [
      { title: "Notion Anotações", url: "https://www.notion.so/3d0d9d580e448084a8f6e6a0ed96a16f" },
      { title: "NocoDB", url: "http://localhost:8096/" },
      { title: "Telegram", url: "https://web.telegram.org/a/" },
      { title: "WhatsApp", url: "https://web.whatsapp.com/" },
      { title: "YouTube", url: "https://www.youtube.com/" },
      { title: "Instagram", url: "https://www.instagram.com/" }
    ]
  }
];

const GAP = 6;            // vao entre telas, em px (o CSS le daqui)
const MIN_ALTURA = 140;   // menor altura de linha
const MIN_LARGURA = 220;  // menor largura de coluna

const svg = d => `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONE = {
  menos: svg('<path d="M5 12h14"/>'),
  mais: svg('<path d="M12 5v14M5 12h14"/>'),
  lapis: svg('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),
  recarregar: svg('<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>'),
  fora: svg('<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>'),
  max: svg('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
  x: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
  sobe: svg('<path d="M6 15l6-6 6 6"/>'),
  desce: svg('<path d="M6 9l6 6 6-6"/>'),
  mover: svg('<rect x="3" y="5" width="10" height="14" rx="2"/><path d="M13 12h8M18 9l3 3-3 3"/>'),
  lua: svg('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>')
};

let state = {
  layout: "grid-2x2",
  tiles: [...DEFAULT_TILES],
  presets: {},
  currentPreset: null,
  atalhos: [...DEFAULT_ATALHOS],
  categorias: JSON.parse(JSON.stringify(DEFAULT_CATEGORIAS)),
  sidebarOpen: false,
  editandoAtalhos: false,
  topbarCollapsed: false,
  tamanhos: {}   // por layout: { linhas: {}, colunas: null, alturas: {} }
};
let editandoId = null;

// Normaliza links para o modo web direto (ex: Notion app.notion.com/p/... -> www.notion.so/id)
function normalizaUrl(url) {
  if (!url) return url;
  let u = url.trim();
  const matchApp = u.match(/^https?:\/\/app\.notion\.com\/(?:p\/)?.*([0-9a-f]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  if (matchApp) {
    const id = matchApp[1].replace(/-/g, "");
    return `https://www.notion.so/${id}`;
  }
  const matchSoP = u.match(/^https?:\/\/(?:www\.)?notion\.so\/p\/.*([0-9a-f]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  if (matchSoP) {
    const id = matchSoP[1].replace(/-/g, "");
    return `https://www.notion.so/${id}`;
  }
  return u;
}

// Polyfill para storage (browser ou chrome ou localStorage)
const storage = {
  get: (keys) => {
    return new Promise((resolve) => {
      if (typeof browser !== "undefined" && browser.storage && browser.storage.local) {
        browser.storage.local.get(keys).then(resolve);
      } else if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(keys, resolve);
      } else {
        const res = {};
        keys.forEach(k => {
          const val = localStorage.getItem("jarvis_split_" + k);
          if (val) res[k] = JSON.parse(val);
        });
        resolve(res);
      }
    });
  },
  set: (data) => {
    return new Promise((resolve) => {
      if (typeof browser !== "undefined" && browser.storage && browser.storage.local) {
        browser.storage.local.set(data).then(resolve);
      } else if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set(data, resolve);
      } else {
        Object.keys(data).forEach(k => {
          localStorage.setItem("jarvis_split_" + k, JSON.stringify(data[k]));
        });
        resolve();
      }
    });
  }
};

// Inicializacao
document.addEventListener("DOMContentLoaded", async () => {
  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage({ action: "fix_cookies" }).catch(() => {});
  }
  document.documentElement.style.setProperty("--gap", GAP + "px");
  await loadState();
  montaSeletorLayout();
  initEventListeners();
  renderTiles();
  applyLayout(state.layout);
  aplicaBarra();
  renderSpacesPills();
  renderPresetsMenu();
  atualizaBotaoPresets();
  renderAtalhos();
  setupSidebar();
  setupAiBroadcast();
  escutaNavegador();
});

async function loadState() {
  const saved = await storage.get(["jarvis_split_state", "jarvis_split_presets", "jarvis_split_atalhos", "jarvis_split_categorias", "jarvis_split_sidebar"]);
  if (saved && saved.jarvis_split_presets && Object.keys(saved.jarvis_split_presets).length > 0) {
    state.presets = saved.jarvis_split_presets;
  } else {
    state.presets = JSON.parse(JSON.stringify(DEFAULT_PRESETS));
  }
  if (!state.presets["Conselho IAs"] && DEFAULT_PRESETS["Conselho IAs"]) {
    state.presets["Conselho IAs"] = JSON.parse(JSON.stringify(DEFAULT_PRESETS["Conselho IAs"]));
  }
  if (!state.presets["Base Tática"] && DEFAULT_PRESETS["Base Tática"]) {
    state.presets["Base Tática"] = JSON.parse(JSON.stringify(DEFAULT_PRESETS["Base Tática"]));
  }
  if (!state.presets["Rotinas"] && DEFAULT_PRESETS["Rotinas"]) {
    state.presets["Rotinas"] = JSON.parse(JSON.stringify(DEFAULT_PRESETS["Rotinas"]));
  }
  if (Array.isArray(saved && saved.jarvis_split_atalhos) && saved.jarvis_split_atalhos.length > 0) {
    state.atalhos = saved.jarvis_split_atalhos.map(a => ({ ...a, url: normalizaUrl(a.url) }));
  } else {
    state.atalhos = [...DEFAULT_ATALHOS];
  }
  if (Array.isArray(saved && saved.jarvis_split_categorias) && saved.jarvis_split_categorias.length > 0) {
    state.categorias = saved.jarvis_split_categorias;
  } else {
    state.categorias = JSON.parse(JSON.stringify(DEFAULT_CATEGORIAS));
  }
  if (saved && typeof saved.jarvis_split_sidebar === "boolean") {
    state.sidebarOpen = saved.jarvis_split_sidebar;
  }
  const s = saved && saved.jarvis_split_state;
  if (s) {
    if (LAYOUTS[s.layout]) state.layout = s.layout;
    if (Array.isArray(s.tiles)) {
      state.tiles = s.tiles.filter(t => t && urlValida(t.url)).map(t => {
        t.url = normalizaUrl(t.url);
        return t;
      });
    }
    state.topbarCollapsed = !!s.topbarCollapsed;
    state.tamanhos = s.tamanhos || {};
    if (s.currentPreset === "__todos__") {
      state.currentPreset = "__todos__";
    } else if (s.currentPreset && state.presets && state.presets[s.currentPreset]) {
      state.currentPreset = s.currentPreset;
    } else {
      state.currentPreset = null;
    }
  }

  // Prioridade maxima: isolamento por aba do Zen via parametro na URL ?espaco=Nome
  const urlEspaco = new URLSearchParams(window.location.search).get("espaco");
  if (urlEspaco === "__todos__") {
    state.currentPreset = "__todos__";
  } else if (urlEspaco && state.presets && state.presets[urlEspaco]) {
    state.currentPreset = urlEspaco;
    const p = state.presets[urlEspaco];
    if (p.layout && LAYOUTS[p.layout]) state.layout = p.layout;
    if (Array.isArray(p.tiles)) {
      state.tiles = p.tiles.filter(t => t && urlValida(t.url)).map(t => {
        t.url = normalizaUrl(t.url);
        return t;
      });
    }
    if (p.tamanhos) {
      state.tamanhos[state.layout] = JSON.parse(JSON.stringify(p.tamanhos));
    }
  }

  state.tiles.forEach((t, i) => { if (!t.id) t.id = "tile-" + Date.now() + "-" + i; });
}

async function saveState() {
  // Sincroniza automaticamente as telas e layout do espaço atual se estiver em um espaço ativo (e não em __todos__)
  if (state.currentPreset && state.currentPreset !== "__todos__" && state.presets[state.currentPreset]) {
    state.presets[state.currentPreset].layout = state.layout;
    state.presets[state.currentPreset].tiles = JSON.parse(JSON.stringify(state.tiles));
    state.presets[state.currentPreset].tamanhos = state.tamanhos[state.layout]
      ? JSON.parse(JSON.stringify(state.tamanhos[state.layout]))
      : null;
  }

  await storage.set({
    jarvis_split_state: {
      layout: state.layout,
      tiles: state.tiles,
      topbarCollapsed: state.topbarCollapsed,
      tamanhos: state.tamanhos,
      currentPreset: state.currentPreset
    },
    jarvis_split_presets: state.presets,
    jarvis_split_atalhos: state.atalhos,
    jarvis_split_categorias: state.categorias,
    jarvis_split_sidebar: state.sidebarOpen
  });
}

function montaSeletorLayout() {
  const nav = document.getElementById("layout-selector");
  for (const [id, l] of Object.entries(LAYOUTS)) {
    const b = document.createElement("button");
    b.className = "btn-layout";
    b.dataset.layout = id;
    b.title = `${l.nome}: ${l.dica}`;
    b.innerHTML = `${iconeLayout(l)}<span class="nome">${l.nome}</span>`;
    b.addEventListener("click", () => { applyLayout(id); saveState(); });
    nav.appendChild(b);
  }
}

// Desenho pequeno do layout, feito com os mesmos numeros da grade
function iconeLayout(l) {
  if (l.horizontal || l.nome === "1:1") {
    return `<svg viewBox="0 0 18 12" width="18" height="12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">
      <rect x="0.8" y="0.8" width="5.2" height="10.4" rx="1" fill="currentColor" fill-opacity="0.3"/>
      <rect x="7" y="0.8" width="5.2" height="10.4" rx="1" fill="currentColor" fill-opacity="0.3"/>
      <path d="M13.8 6h3.4M15.8 4.2l1.4 1.8-1.4 1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
  const W = 18, H = 12, g = 1.5;
  const pesos = l.larguras || Array(l.cols).fill(1);
  const total = pesos.reduce((a, b) => a + b, 0);
  let x = 0, rects = "";
  pesos.forEach((p, c) => {
    const w = (W - g * (l.cols - 1)) * p / total;
    const n = l.foco && c === 0 ? 1 : l.rows;
    const h = (H - g * (n - 1)) / n;
    for (let r = 0; r < n; r++) {
      rects += `<rect x="${x.toFixed(2)}" y="${(r * (h + g)).toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" rx="1"/>`;
    }
    x += w + g;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true">${rects}</svg>`;
}

function initEventListeners() {
  // Rolagem horizontal suave pelo scroll do mouse no modo 1:1
  const areaEl = document.getElementById("area");
  if (areaEl) {
    areaEl.addEventListener("wheel", (e) => {
      const l = LAYOUTS[state.layout];
      if (l && l.horizontal) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          areaEl.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      }
    }, { passive: false });
  }

  // Barra superior
  const btnCompact = document.getElementById("btn-compact-mode");
  btnCompact.innerHTML = ICONE.sobe;
  btnCompact.addEventListener("click", toggleTopbar);
  const reveal = document.getElementById("floating-reveal");
  reveal.querySelector(".reveal-pill").innerHTML = ICONE.desce;
  reveal.addEventListener("click", toggleTopbar);

  // Tamanhos
  document.getElementById("btn-reset-sizes").addEventListener("click", () => {
    delete state.tamanhos[state.layout];
    state.tiles.forEach(tile => {
      const card = document.getElementById(tile.id);
      if (card) card.style.height = "";
    });
    aplicaTamanhos();
    saveState();
    toast("Tamanhos e comprimentos voltaram ao padrão deste layout");
  });

  // Modal de adicionar / editar
  document.getElementById("btn-add-tile").addEventListener("click", () => openModalAdd());
  document.getElementById("btn-add-vazio").addEventListener("click", () => openModalAdd());
  document.getElementById("modal-close").addEventListener("click", closeModalAdd);
  document.getElementById("btn-modal-cancel").addEventListener("click", closeModalAdd);
  document.getElementById("btn-modal-save").addEventListener("click", saveNewTile);
  document.getElementById("modal-add").addEventListener("click", (e) => {
    if (e.target.id === "modal-add") closeModalAdd();
  });
  ["input-site-url", "input-site-title"].forEach(id => {
    document.getElementById(id).addEventListener("keydown", (e) => {
      if (e.key === "Enter") saveNewTile();
    });
  });

  // Gerenciador de atalhos
  const btnToggleEditAtalhos = document.getElementById("btn-toggle-edit-atalhos");
  if (btnToggleEditAtalhos) {
    btnToggleEditAtalhos.addEventListener("click", () => {
      state.editandoAtalhos = !state.editandoAtalhos;
      btnToggleEditAtalhos.textContent = state.editandoAtalhos ? "✓ Concluir" : "✏️ Gerenciar";
      renderAtalhos();
    });
  }

  const btnAddAtalho = document.getElementById("btn-add-atalho");
  if (btnAddAtalho) {
    btnAddAtalho.addEventListener("click", () => {
      let url = document.getElementById("input-site-url").value.trim();
      let title = document.getElementById("input-site-title").value.trim();
      if (!url) {
        url = (prompt("Endereço (URL) do novo atalho:") || "").trim();
      }
      if (!url) return;
      if (!/^https?:\/\//i.test(url)) {
        if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0|192\.168\.|10\.)/i.test(url)) {
          url = "http://" + url;
        } else {
          url = "https://" + url;
        }
      }
      url = normalizaUrl(url);
      if (!title) {
        title = (prompt("Nome do atalho:", getDomain(url)) || "").trim();
      }
      if (!title) title = getDomain(url);

      state.atalhos.push({ title, url });
      saveState();
      renderAtalhos();
      toast(`Atalho "${title}" salvo`);
    });
  }

  // Menu de espacos
  const btnPresets = document.getElementById("btn-presets");
  const presetsMenu = document.getElementById("presets-menu");
  btnPresets.addEventListener("click", (e) => {
    e.stopPropagation();
    presetsMenu.classList.toggle("hidden");
  });
  document.addEventListener("click", () => {
    presetsMenu.classList.add("hidden");
    fecharPopoversMover();
  });

  const btnViewAll = document.getElementById("btn-view-all-spaces");
  if (btnViewAll) {
    btnViewAll.addEventListener("click", (e) => {
      e.stopPropagation();
      ativarVisaoTodosEspacos();
    });
  }

  const btnUpdatePreset = document.getElementById("btn-update-preset");
  if (btnUpdatePreset) {
    btnUpdatePreset.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!state.currentPreset || !state.presets[state.currentPreset]) return;
      state.presets[state.currentPreset] = {
        layout: state.layout,
        tiles: JSON.parse(JSON.stringify(state.tiles)),
        tamanhos: JSON.parse(JSON.stringify(state.tamanhos[state.layout] || null))
      };
      history.replaceState(null, "", "?espaco=" + encodeURIComponent(state.currentPreset));
      saveState();
      renderPresetsMenu();
      atualizaBotaoPresets();
      presetsMenu.classList.add("hidden");
      toast(`Espaço "${state.currentPreset}" atualizado com as telas e layout atuais`);
    });
  }

  const btnLeavePreset = document.getElementById("btn-leave-preset");
  if (btnLeavePreset) {
    btnLeavePreset.addEventListener("click", (e) => {
      e.stopPropagation();
      state.currentPreset = null;
      history.replaceState(null, "", window.location.pathname);
      saveState();
      renderPresetsMenu();
      atualizaBotaoPresets();
      presetsMenu.classList.add("hidden");
      toast("Modo avulso (nenhum espaço ativo)");
    });
  }

  document.getElementById("btn-save-preset").addEventListener("click", (e) => {
    e.stopPropagation();
    const name = (prompt("Nome para este espaço (ex: Operação, Redes, Análise):") || "").trim();
    if (!name) return;
    state.presets[name] = {
      layout: state.layout,
      tiles: JSON.parse(JSON.stringify(state.tiles)),
      tamanhos: JSON.parse(JSON.stringify(state.tamanhos[state.layout] || null))
    };
    state.currentPreset = name;
    history.replaceState(null, "", "?espaco=" + encodeURIComponent(name));
    saveState();
    renderPresetsMenu();
    atualizaBotaoPresets();
    presetsMenu.classList.add("hidden");
    toast(`Espaço "${name}" salvo e ativado`);
  });

  const btnAddSpacePill = document.getElementById("btn-add-space-pill");
  if (btnAddSpacePill) {
    btnAddSpacePill.addEventListener("click", () => {
      const name = (prompt("Nome do novo espaço:") || "").trim();
      if (!name) return;
      if (state.presets[name]) return toast(`Já existe um espaço chamado "${name}"`);
      state.presets[name] = {
        layout: state.layout,
        icone: null,
        tiles: JSON.parse(JSON.stringify(state.tiles)),
        tamanhos: state.tamanhos[state.layout] ? JSON.parse(JSON.stringify(state.tamanhos[state.layout])) : null
      };
      ativarEspaco(name);
      toast(`Espaço "${name}" criado com ícone inteligente`);
    });
  }

  // Atalhos dentro da pagina. Com o cursor dentro de um site eles nao chegam aqui:
  // por isso existe o Alt+Shift+H do navegador (manifest.json) e a faixa clicavel.
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModalAdd();
      fecharPopoversMover();
      document.querySelectorAll(".tile-card.maximized").forEach(c => c.classList.remove("maximized"));
    }
    if (e.altKey && !e.shiftKey && (e.key === "h" || e.key === "H")) {
      e.preventDefault();
      toggleTopbar();
    }
  });

  window.addEventListener("resize", aplicaTamanhos);
}

// Alt+Shift+H do navegador (vem do background) e troca de layout feita pelo popup
async function escutaNavegador() {
  if (typeof browser === "undefined" || !browser.runtime) return;
  const eu = await browser.tabs.getCurrent();
  browser.runtime.onMessage.addListener((msg) => {
    if (msg && msg.tipo === "alternar-barra" && eu && msg.tabId === eu.id) toggleTopbar();
  });
  // Chave propria do popup: ouvir o jarvis_split_state pegaria o eco atrasado dos nossos proprios
  // saves e desfaria o layout que o dono acabou de escolher (visto no teste).
  browser.storage.onChanged.addListener((mud) => {
    const pedido = mud.jarvis_split_pedido && mud.jarvis_split_pedido.newValue;
    if (pedido && LAYOUTS[pedido.layout]) { applyLayout(pedido.layout); saveState(); }
  });
}

function toggleTopbar() {
  state.topbarCollapsed = !state.topbarCollapsed;
  aplicaBarra();
  saveState();
}

function aplicaBarra() {
  document.getElementById("top-bar").classList.toggle("collapsed", state.topbarCollapsed);
  document.body.classList.toggle("topbar-collapsed", state.topbarCollapsed);
  aplicaTamanhos();
}

function applyLayout(layout) {
  state.layout = LAYOUTS[layout] ? layout : "grid-2x2";
  document.getElementById("grid-container").className = `grid-container layout-${state.layout}`;
  document.querySelectorAll(".btn-layout").forEach(b => {
    b.classList.toggle("active", b.dataset.layout === state.layout);
  });
  renderTiles();
}

// ===================================================
// TAMANHOS: altura por linha, largura por coluna, alturas por tela (Snap inteligente)
// ===================================================
function tamanhosDo(layout) {
  if (!state.tamanhos[layout]) state.tamanhos[layout] = { linhas: {}, colunas: null, alturas: {}, larguras: {} };
  if (!state.tamanhos[layout].linhas) state.tamanhos[layout].linhas = {};
  if (!state.tamanhos[layout].alturas) state.tamanhos[layout].alturas = {};
  if (!state.tamanhos[layout].larguras) state.tamanhos[layout].larguras = {};
  return state.tamanhos[layout];
}

// Altura padrao de uma linha: a grade inicial do layout enche a tela, sem rolagem
function alturaPadrao() {
  const l = LAYOUTS[state.layout];
  const util = document.getElementById("area").clientHeight - 2 * GAP - (l.rows - 1) * GAP;
  return Math.max(MIN_ALTURA, Math.floor(util / l.rows));
}

function aplicaTamanhos() {
  const l = LAYOUTS[state.layout];
  const t = tamanhosDo(state.layout);
  const linhas = t.linhas || {};
  const alturas = t.alturas || {};
  const larguras = t.larguras || {};
  const grade = document.getElementById("grid-container");

  if (l.horizontal) {
    grade.style.gridTemplateColumns = "";
    grade.style.gridTemplateRows = "";
    grade.style.setProperty("--linhas", 1);
    grade.style.setProperty("--linha", "100%");

    const N = state.tiles.length;
    const padraoWidth = N <= 1 ? "100%" :
                        N === 2 ? `calc((100% - ${GAP}px) / 2)` :
                        N === 3 ? `calc((100% - ${GAP * 2}px) / 3)` :
                        "480px";

    state.tiles.forEach(tile => {
      const card = document.getElementById(tile.id);
      if (!card) return;
      card.style.height = "100%";
      if (larguras[tile.id]) {
        card.style.width = larguras[tile.id] + "px";
        card.style.flex = `0 0 ${larguras[tile.id]}px`;
      } else {
        card.style.width = padraoWidth;
        card.style.flex = N <= 3 ? `1 0 ${padraoWidth}` : `0 0 ${padraoWidth}`;
      }
    });
    return;
  }

  grade.style.setProperty("--linhas", l.rows);
  grade.style.setProperty("--linha", alturaPadrao() + "px");
  const pesos = t.colunas && t.colunas.length === l.cols ? t.colunas : (l.larguras || Array(l.cols).fill(1));
  grade.style.gridTemplateColumns = pesos.map(p => `minmax(0, ${p}fr)`).join(" ");
  const ultima = Math.max(-1, ...Object.keys(linhas).map(Number));
  grade.style.gridTemplateRows = Array.from({ length: ultima + 1 },
    (_, i) => linhas[i] ? `${linhas[i]}px` : "var(--linha)").join(" ");

  // Altura independente por aba/tela
  state.tiles.forEach(tile => {
    const card = document.getElementById(tile.id);
    if (!card) return;
    card.style.width = "";
    card.style.flex = "";
    if (alturas[tile.id]) {
      card.style.height = alturas[tile.id] + "px";
    } else {
      card.style.height = "";
    }
  });
}

// Coluna e ultima linha ocupadas pela tela de indice i (mesma regra de encaixe da grade CSS)
function posicao(i) {
  const l = LAYOUTS[state.layout];
  if (l.horizontal) return { coluna: i, linhaFim: 0 };
  if (!l.foco) return { coluna: i % l.cols, linhaFim: Math.floor(i / l.cols) };
  if (i === 0) return { coluna: 0, linhaFim: l.rows - 1 };
  if (i <= l.rows) return { coluna: 1, linhaFim: i - 1 };
  const j = i - l.rows - 1;
  return { coluna: j % l.cols, linhaFim: l.rows + Math.floor(j / l.cols) };
}

// Ordem visual sem mover o iframe no HTML (mover recarrega o site)
function atualizaPosicoes() {
  const l = LAYOUTS[state.layout];
  state.tiles.forEach((tile, i) => {
    const card = document.getElementById(tile.id);
    if (!card) return;
    card.style.order = i;
    card.classList.toggle("principal", i === 0);
    card.classList.toggle("ultima-coluna", posicao(i).coluna === l.cols - 1);
  });
  document.getElementById("vazio").hidden = state.tiles.length > 0;
}

// Arrasto generico. Prende o ponteiro na alca (funciona ate fora da janela) e desliga o mouse
// dos sites enquanto dura. rolar = desce/sobe a pagina sozinho quando o mouse encosta na borda.
function arrasta(e, cursor, aoMover, aoSoltar, rolar) {
  const alca = e.currentTarget;
  const area = document.getElementById("area");
  let ultimo = e;
  let rolagem = null;
  alca.setPointerCapture(e.pointerId);
  alca.classList.add("ativa");
  document.body.classList.add("arrastando");
  document.body.style.cursor = cursor;
  const mover = (ev) => { ultimo = ev; aoMover(ev); };
  alca.addEventListener("pointermove", mover);
  alca.addEventListener("lostpointercapture", () => {
    clearInterval(rolagem);
    alca.removeEventListener("pointermove", mover);
    alca.classList.remove("ativa");
    document.body.classList.remove("arrastando");
    document.body.style.cursor = "";
    aoSoltar();
  }, { once: true });
  if (!rolar) return;
  rolagem = setInterval(() => {
    if (ultimo === e) return;
    const r = area.getBoundingClientRect();
    const v = ultimo.clientY > r.bottom - 40 ? 18 : (ultimo.clientY < r.top + 30 ? -18 : 0);
    const antes = area.scrollTop;
    area.scrollTop += v;
    if (area.scrollTop !== antes) aoMover(ultimo);
  }, 16);
}

function puxaAltura(e, card) {
  if (e.button !== 0) return;
  e.preventDefault();
  let tile = state.tiles.find(t => t.id === card.id);
  if (!tile && card.dataset.space && state.presets[card.dataset.space]) {
    tile = (state.presets[card.dataset.space].tiles || []).find(t => t.id === card.id);
  }
  if (!tile) return;
  const t = tamanhosDo(state.layout);
  const area = document.getElementById("area");
  const scrollContainer = card.closest(".space-row-body") || card.closest(".space-column-body") || area;
  const alca = e.currentTarget;
  const snapIndicator = document.getElementById("snap-indicator");

  const h0 = card.offsetHeight || alturaPadrao();
  const y0 = e.clientY;
  const s0 = scrollContainer.scrollTop;

  // Alvos de snap magnetico para igualar alturas
  const targets = [];
  targets.push({ val: alturaPadrao(), label: "Padrão" });
  state.tiles.forEach(outra => {
    if (outra.id !== card.id) {
      const cOutra = document.getElementById(outra.id);
      if (cOutra && cOutra.offsetHeight >= MIN_ALTURA) {
        targets.push({
          val: cOutra.offsetHeight,
          label: `Igual a ${outra.title || getDomain(outra.url)}`
        });
      }
    }
  });

  arrasta(e, "row-resize", (ev) => {
    let ideal = h0 + (ev.clientY - y0) + (scrollContainer.scrollTop - s0);
    let snapped = false;
    let snapLabel = "";

    // Tolerancia de snap magnetico: 16px
    for (const tgt of targets) {
      if (Math.abs(ideal - tgt.val) <= 16) {
        ideal = tgt.val;
        snapped = true;
        snapLabel = tgt.label;
        break;
      }
    }

    const novaAltura = Math.max(MIN_ALTURA, Math.round(ideal));
    t.alturas[tile.id] = novaAltura;
    card.style.height = novaAltura + "px";

    alca.classList.toggle("snap-ativo", snapped);
    if (snapIndicator) {
      snapIndicator.textContent = snapped ? `✨ ${novaAltura}px (${snapLabel})` : `${novaAltura}px`;
      snapIndicator.style.left = ev.clientX + "px";
      snapIndicator.style.top = (ev.clientY - 14) + "px";
      snapIndicator.classList.remove("hidden");
    }
  }, () => {
    alca.classList.remove("snap-ativo");
    if (snapIndicator) snapIndicator.classList.add("hidden");
    saveState();
  }, true);
}

function puxaLargura(e, card) {
  if (e.button !== 0) return;
  e.preventDefault();
  if (state.currentPreset === "__todos__") {
    puxaLarguraHorizontal(e, card, card.dataset.space);
    return;
  }
  const l = LAYOUTS[state.layout];
  if (l && l.horizontal) {
    puxaLarguraHorizontal(e, card);
    return;
  }
  const c = posicao(state.tiles.findIndex(t => t.id === card.id)).coluna;
  if (c >= l.cols - 1) return;
  const grade = document.getElementById("grid-container");
  const larg = getComputedStyle(grade).gridTemplateColumns.split(" ").map(parseFloat);
  if (larg.length !== l.cols) return;
  const w0 = larg[c];
  const w1 = larg[c + 1];
  const S = w0 + w1;
  if (S < 2 * MIN_LARGURA) return;
  const x0 = e.clientX;
  const t = tamanhosDo(state.layout);
  const alca = e.currentTarget;
  const snapIndicator = document.getElementById("snap-indicator");

  // Alvos de snap magnetico (quando o usuario encosta perto, gruda)
  const targets = [];
  targets.push({ val: Math.round(S / 2), label: "Colunas iguais" });
  larg.forEach((lw, idx) => {
    if (idx !== c && idx !== c + 1) {
      const wOutra = Math.round(lw);
      if (wOutra >= MIN_LARGURA && S - wOutra >= MIN_LARGURA) {
        targets.push({ val: wOutra, label: `Igual à Coluna ${idx + 1}` });
      }
    }
  });

  arrasta(e, "col-resize", (ev) => {
    let ideal = w0 + (ev.clientX - x0);
    let snapped = false;
    let snapLabel = "";

    // Tolerancia de snap magnetico: 16px
    for (const tgt of targets) {
      if (Math.abs(ideal - tgt.val) <= 16) {
        ideal = tgt.val;
        snapped = true;
        snapLabel = tgt.label;
        break;
      }
    }

    const a = Math.min(Math.max(MIN_LARGURA, ideal), S - MIN_LARGURA);
    const b = S - a;
    const nova = larg.slice();
    nova[c] = Math.round(a);
    nova[c + 1] = Math.round(b);
    t.colunas = nova;
    aplicaTamanhos();

    alca.classList.toggle("snap-ativo", snapped);
    if (snapIndicator) {
      snapIndicator.textContent = snapped ? `✨ ${Math.round(a)}px (${snapLabel})` : `${Math.round(a)}px | ${Math.round(b)}px`;
      snapIndicator.style.left = ev.clientX + "px";
      snapIndicator.style.top = (ev.clientY - 14) + "px";
      snapIndicator.classList.remove("hidden");
    }
  }, () => {
    alca.classList.remove("snap-ativo");
    if (snapIndicator) snapIndicator.classList.add("hidden");
    saveState();
  });
}

function puxaLarguraHorizontal(e, card, spaceName = null) {
  let tile = null;
  const targets = [];
  if (spaceName && state.presets[spaceName]) {
    const list = state.presets[spaceName].tiles || [];
    tile = list.find(t => t.id === card.id);
    list.forEach(outra => {
      if (outra.id !== card.id) {
        const cOutra = document.getElementById(outra.id);
        if (cOutra && cOutra.offsetWidth >= MIN_LARGURA) {
          targets.push({
            val: cOutra.offsetWidth,
            label: `Igual a ${outra.title || getDomain(outra.url)}`
          });
        }
      }
    });
  } else {
    tile = state.tiles.find(t => t.id === card.id);
    state.tiles.forEach(outra => {
      if (outra.id !== card.id) {
        const cOutra = document.getElementById(outra.id);
        if (cOutra && cOutra.offsetWidth >= MIN_LARGURA) {
          targets.push({
            val: cOutra.offsetWidth,
            label: `Igual a ${outra.title || getDomain(outra.url)}`
          });
        }
      }
    });
  }
  if (!tile) return;
  const t = tamanhosDo(state.layout);
  if (!t.larguras) t.larguras = {};
  const alca = e.currentTarget;
  const snapIndicator = document.getElementById("snap-indicator");

  const w0 = card.offsetWidth;
  const x0 = e.clientX;

  arrasta(e, "col-resize", (ev) => {
    let ideal = w0 + (ev.clientX - x0);
    let snapped = false;
    let snapLabel = "";

    for (const tgt of targets) {
      if (Math.abs(ideal - tgt.val) <= 16) {
        ideal = tgt.val;
        snapped = true;
        snapLabel = tgt.label;
        break;
      }
    }

    const novaLargura = Math.max(MIN_LARGURA, Math.round(ideal));
    t.larguras[tile.id] = novaLargura;
    card.style.width = novaLargura + "px";
    card.style.flex = `0 0 ${novaLargura}px`;

    alca.classList.toggle("snap-ativo", snapped);
    if (snapIndicator) {
      snapIndicator.textContent = snapped ? `✨ ${novaLargura}px (${snapLabel})` : `${novaLargura}px`;
      snapIndicator.style.left = ev.clientX + "px";
      snapIndicator.style.top = (ev.clientY - 14) + "px";
      snapIndicator.classList.remove("hidden");
    }
  }, () => {
    alca.classList.remove("snap-ativo");
    if (snapIndicator) snapIndicator.classList.add("hidden");
    saveState();
  }, false);
}

// Arrastar o cabecalho de uma tela para cima de outra troca as duas de lugar
function puxaTile(e, card) {
  if (e.button !== 0 || e.target.closest("button") || card.classList.contains("maximized")) return;
  const x0 = e.clientX;
  const y0 = e.clientY;
  let ativo = false;
  let alvo = null;
  arrasta(e, "grabbing", (ev) => {
    if (!ativo && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 6) return;
    ativo = true;
    card.classList.add("movendo");
    const sob = document.elementFromPoint(ev.clientX, ev.clientY);
    const novo = sob && sob.closest(".tile-card");
    const valido = novo && novo !== card ? novo : null;
    if (valido !== alvo) {
      if (alvo) alvo.classList.remove("alvo");
      if (valido) valido.classList.add("alvo");
      alvo = valido;
    }
  }, () => {
    card.classList.remove("movendo");
    if (!alvo) return;
    alvo.classList.remove("alvo");
    const a = state.tiles.findIndex(t => t.id === card.id);
    const b = state.tiles.findIndex(t => t.id === alvo.id);
    [state.tiles[a], state.tiles[b]] = [state.tiles[b], state.tiles[a]];
    renderTiles();
    saveState();
  }, true);
}

// ===================================================
// TELAS
// ===================================================
function renderAllSpaces() {
  const container = document.getElementById("grid-container");
  const area = document.getElementById("area");

  container.className = "grid-container layout-all-spaces";
  container.style.gridTemplateColumns = "";
  container.style.gridTemplateRows = "";
  area.classList.add("modo-all-spaces");

  const presetNames = Object.keys(state.presets);

  if (presetNames.length === 0) {
    container.innerHTML = `
      <div class="all-spaces-empty">
        <div class="all-spaces-empty-icon">${ICONES_ESPACO.layers}</div>
        <h3 style="margin:0; font-size:15px; font-weight:600; color:var(--texto);">Nenhum espaço salvo ainda</h3>
        <p style="margin:0; font-size:12px; line-height:1.5;">Crie espaços usando o botão "+" na barra superior para organizar suas telas em faixas 1:1.</p>
        <button id="btn-create-first-space" class="btn btn-primary" style="margin-top:8px;">+ Criar meu primeiro espaço</button>
      </div>
    `;
    const btnFirst = document.getElementById("btn-create-first-space");
    if (btnFirst) {
      btnFirst.addEventListener("click", () => {
        const name = (prompt("Nome para o novo espaço (ex: Operação, Redes, IAs):") || "").trim();
        if (!name) return;
        state.presets[name] = { layout: "columns-2", tiles: [], tamanhos: null };
        ativarEspaco(name);
      });
    }
    document.getElementById("vazio").hidden = true;
    return;
  }

  container.replaceChildren();

  presetNames.forEach((spaceName, idx) => {
    const p = state.presets[spaceName];
    if (!p) return;
    const tiles = Array.isArray(p.tiles) ? p.tiles : [];
    const tema = TEMAS_ESPACO[idx % TEMAS_ESPACO.length];
    const icone = obterIconeEspaco(spaceName, p);

    const rowDiv = document.createElement("div");
    rowDiv.className = "space-row";
    rowDiv.dataset.space = spaceName;
    rowDiv.style.setProperty("--space-cor", tema.cor);
    rowDiv.style.setProperty("--space-bg", tema.bg);
    rowDiv.style.setProperty("--space-borda", tema.borda);
    rowDiv.style.setProperty("--space-glow", tema.glow);

    const header = document.createElement("div");
    header.className = "space-row-header";
    header.innerHTML = `
      <div class="space-row-left">
        <span class="space-row-icon">${icone}</span>
        <div class="space-row-info">
          <span class="space-row-title" title="${escapeHtml(spaceName)}">${escapeHtml(spaceName)}</span>
          <span class="space-row-badge"><span class="connected-dot"></span>Conectado • ${tiles.length} ${tiles.length === 1 ? 'tela' : 'telas'}</span>
        </div>
      </div>
      <div class="space-row-actions">
        <button class="btn-space-nav btn-nav-left" title="Rolar telas para a esquerda">◀</button>
        <button class="btn-space-nav btn-nav-right" title="Rolar telas para a direita">▶</button>
        <button class="btn-space-action btn-space-add" title="Adicionar tela neste espaço (+)">+ Tela</button>
        <button class="btn-space-action btn-space-focus" title="Focar somente neste espaço (abrir tela cheia)">↗ Focar Espaço</button>
      </div>
    `;

    const body = document.createElement("div");
    body.className = "space-row-body";

    header.querySelector(".btn-nav-left").addEventListener("click", () => {
      body.scrollBy({ left: -460, behavior: "smooth" });
    });
    header.querySelector(".btn-nav-right").addEventListener("click", () => {
      body.scrollBy({ left: 460, behavior: "smooth" });
    });

    header.querySelector(".btn-space-add").addEventListener("click", (e) => {
      e.stopPropagation();
      openModalAdd(null, spaceName);
    });

    header.querySelector(".btn-space-focus").addEventListener("click", (e) => {
      e.stopPropagation();
      ativarEspaco(spaceName);
    });

    rowDiv.appendChild(header);

    if (tiles.length === 0) {
      const vazioRow = document.createElement("div");
      vazioRow.className = "space-row-vazio";
      vazioRow.innerHTML = `
        <p style="margin:0; font-size:12px; color:var(--texto-mutado);">Nenhuma tela neste espaço</p>
        <button class="btn btn-secondary btn-sm">+ Adicionar tela</button>
      `;
      vazioRow.querySelector("button").addEventListener("click", () => openModalAdd(null, spaceName));
      body.appendChild(vazioRow);
    } else {
      tiles.forEach((tile) => {
        if (!tile.id) tile.id = "tile-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6);
        const card = criaCard(tile, spaceName);
        body.appendChild(card);
      });
    }

    rowDiv.appendChild(body);
    container.appendChild(rowDiv);
  });

  document.getElementById("vazio").hidden = true;
}

function renderTiles() {
  const container = document.getElementById("grid-container");
  const area = document.getElementById("area");

  if (state.currentPreset === "__todos__") {
    renderAllSpaces();
    return;
  }

  area.classList.remove("modo-all-spaces");
  container.classList.remove("layout-all-spaces");

  const l = LAYOUTS[state.layout];

  if (l && l.horizontal) {
    const cards = state.tiles.map(tile => criaCard(tile));
    container.replaceChildren(...cards);
    atualizaPosicoes();
    aplicaTamanhos();
    return;
  }

  // Cria as colunas flex independentes para o layout atual
  const cols = [];
  for (let c = 0; c < l.cols; c++) {
    const colDiv = document.createElement("div");
    colDiv.className = "grid-column";
    colDiv.dataset.col = c;
    cols.push(colDiv);
  }

  // Distribui os cards nas colunas conforme posicao(i)
  state.tiles.forEach((tile, i) => {
    const card = criaCard(tile);
    const pos = posicao(i);
    const colIdx = Math.min(pos.coluna, l.cols - 1);
    cols[colIdx].appendChild(card);
  });

  container.replaceChildren(...cols);
  atualizaPosicoes();
  aplicaTamanhos();
}

function criaCard(tile, spaceName = null) {
  const card = document.createElement("div");
  card.className = "tile-card";
  card.id = tile.id;
  if (spaceName) {
    card.dataset.space = spaceName;
  }
  // So texto fixo e icones aqui. Nome e endereco entram por textContent em preencheCard.
  card.innerHTML = `
    <div class="tile-header" title="Arraste para trocar de lugar. Duplo clique maximiza.">
      <div class="tile-info">
        <img class="tile-favicon" alt="" draggable="false">
        <span class="tile-title"></span>
        ${spaceName ? `<span class="tile-space-tag" title="Espaço: ${escapeHtml(spaceName)}">${escapeHtml(spaceName)}</span>` : ''}
      </div>
      <div class="tile-controls">
        <div class="zoom-controls">
          <button class="btn-zoom btn-zoom-out" title="Diminuir zoom">${ICONE.menos}</button>
          <button class="zoom-level" title="Voltar a 100%"></button>
          <button class="btn-zoom btn-zoom-in" title="Aumentar zoom">${ICONE.mais}</button>
        </div>
        <div class="tile-move-wrapper">
          <button class="btn-tile-action btn-move" title="Mover para outro espaço">${ICONE.mover}</button>
        </div>
        <button class="btn-tile-action btn-suspend" title="Suspender aba (liberar memória)">${ICONE.lua}</button>
        <button class="btn-tile-action btn-edit" title="Trocar endereço ou nome">${ICONE.lapis}</button>
        <button class="btn-tile-action btn-reload" title="Recarregar">${ICONE.recarregar}</button>
        <button class="btn-tile-action btn-popout" title="Abrir numa aba normal do Zen">${ICONE.fora}</button>
        <button class="btn-tile-action btn-maximize" title="Maximizar / restaurar (Esc)">${ICONE.max}</button>
        <button class="btn-tile-action btn-close" title="Fechar esta tela">${ICONE.x}</button>
      </div>
    </div>
    <div class="tile-body">
      <iframe class="tile-iframe" allowfullscreen allow="autoplay; camera; microphone; clipboard-read; clipboard-write; display-capture; geolocation; encrypted-media; fullscreen; picture-in-picture; web-share"></iframe>
    </div>
    <div class="alca alca-baixo" title="Arraste para mudar a altura. Duplo clique volta ao padrão."></div>
    <div class="alca alca-lado" title="Arraste para mudar a largura. Duplo clique volta ao padrão."></div>
  `;
  preencheCard(card, tile);
  setupTileEvents(card, tile, spaceName);
  return card;
}

function preencheCard(card, tile) {
  const domain = getDomain(tile.url);
  const fav = card.querySelector(".tile-favicon");
  fav.style.visibility = "";
  fav.src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`;
  const titulo = card.querySelector(".tile-title");
  titulo.textContent = tile.title || domain;
  titulo.title = tile.url;
  aplicaSuspensao(card, tile);
  updateTileZoomUI(card, tile);
}

function setupTileEvents(card, tile, spaceName = null) {
  const iframe = card.querySelector(".tile-iframe");
  const header = card.querySelector(".tile-header");
  const on = (sel, fn) => card.querySelector(sel).addEventListener("click", (e) => { e.stopPropagation(); fn(); });

  const moveWrapper = card.querySelector(".tile-move-wrapper");
  const btnMove = card.querySelector(".btn-move");
  if (btnMove && moveWrapper) {
    btnMove.addEventListener("click", (e) => {
      e.stopPropagation();
      abreMenuMoverTile(card, tile, moveWrapper);
    });
  }

  card.querySelector(".tile-favicon").addEventListener("error", (e) => { e.target.style.visibility = "hidden"; });

  header.addEventListener("dblclick", (e) => {
    if (!e.target.closest("button")) card.classList.toggle("maximized");
  });
  header.addEventListener("pointerdown", (e) => puxaTile(e, card));

  const alturaEl = card.querySelector(".alca-baixo");
  alturaEl.addEventListener("pointerdown", (e) => puxaAltura(e, card));
  alturaEl.addEventListener("dblclick", () => {
    const t = tamanhosDo(state.layout);
    delete t.alturas[tile.id];
    card.style.height = "";
    aplicaTamanhos();
    saveState();
    toast(`Comprimento de "${tile.title || 'tela'}" voltou ao padrão`);
  });
  const larguraEl = card.querySelector(".alca-lado");
  larguraEl.addEventListener("pointerdown", (e) => puxaLargura(e, card));
  larguraEl.addEventListener("dblclick", () => {
    if (state.currentPreset === "__todos__") {
      card.style.width = "";
      card.style.flex = "";
      const t = tamanhosDo(state.layout);
      if (t.larguras && t.larguras[tile.id]) {
        delete t.larguras[tile.id];
      }
      saveState();
      return;
    }
    const l = LAYOUTS[state.layout];
    if (l && l.horizontal) {
      card.style.width = "";
      card.style.flex = "";
      const t = tamanhosDo(state.layout);
      if (t.larguras && t.larguras[tile.id]) {
        delete t.larguras[tile.id];
      }
      saveState();
      return;
    }
    tamanhosDo(state.layout).colunas = null;
    aplicaTamanhos();
    saveState();
  });

  const zoom = (z) => {
    tile.zoom = Math.round(Math.min(1.5, Math.max(0.5, z)) * 100) / 100;
    updateTileZoomUI(card, tile);
    saveState();
  };
  on(".btn-zoom-out", () => zoom((tile.zoom || 1) - 0.05));
  on(".btn-zoom-in", () => zoom((tile.zoom || 1) + 0.05));
  on(".zoom-level", () => zoom(1));

  on(".btn-suspend", () => alternaSuspensao(card, tile));
  on(".btn-edit", () => openModalAdd(tile, spaceName));
  on(".btn-reload", () => {
    if (tile.suspended) {
      tile.suspended = false;
      aplicaSuspensao(card, tile);
      saveState();
    } else {
      iframe.src = tile.url;
    }
  });
  on(".btn-popout", () => {
    if (typeof browser !== "undefined" && browser.tabs) browser.tabs.create({ url: tile.url });
    else window.open(tile.url, "_blank");
  });
  on(".btn-maximize", () => card.classList.toggle("maximized"));
  on(".btn-close", () => {
    removerTile(tile.id, spaceName);
  });
}

function removerTile(id, spaceName = null) {
  if (spaceName && state.presets[spaceName]) {
    state.presets[spaceName].tiles = (state.presets[spaceName].tiles || []).filter(t => t.id !== id);
    if (state.currentPreset === spaceName) {
      state.tiles = state.presets[spaceName].tiles;
    }
    toast(`Tela removida do espaço "${spaceName}"`);
  } else {
    state.tiles = state.tiles.filter(t => t.id !== id);
    if (state.currentPreset && state.currentPreset !== "__todos__" && state.presets[state.currentPreset]) {
      state.presets[state.currentPreset].tiles = state.tiles;
    }
  }
  renderTiles();
  saveState();
}

function alternaSuspensao(card, tile) {
  tile.suspended = !tile.suspended;
  aplicaSuspensao(card, tile);
  saveState();
  if (tile.suspended) {
    toast(`Aba "${tile.title || 'tela'}" suspensa (memória liberada)`);
  } else {
    toast(`Aba "${tile.title || 'tela'}" reativada`);
  }
}

function aplicaSuspensao(card, tile) {
  const iframe = card.querySelector(".tile-iframe");
  const btnSuspend = card.querySelector(".btn-suspend");
  const tileBody = card.querySelector(".tile-body");
  let placeholder = tileBody.querySelector(".tile-suspended-placeholder");

  if (tile.suspended) {
    card.classList.add("suspended");
    if (btnSuspend) {
      btnSuspend.classList.add("active");
      btnSuspend.title = "Reativar aba";
    }
    if (iframe.getAttribute("src") && iframe.getAttribute("src") !== "about:blank") {
      iframe.dataset.originalSrc = iframe.getAttribute("src");
    }
    iframe.src = "about:blank";
    iframe.style.display = "none";

    if (!placeholder) {
      placeholder = document.createElement("div");
      placeholder.className = "tile-suspended-placeholder";
      placeholder.title = "Clique para reativar";
      const domain = getDomain(tile.url);
      placeholder.innerHTML = `
        <div class="suspended-icon">🌙</div>
        <div class="suspended-title">${escapeHtml(tile.title || domain)}</div>
        <div class="suspended-sub">Aba suspensa para economizar memória e recursos</div>
        <button class="btn btn-primary btn-wake">Reativar aba</button>
      `;
      placeholder.addEventListener("click", () => alternaSuspensao(card, tile));
      tileBody.appendChild(placeholder);
    }
  } else {
    card.classList.remove("suspended");
    if (btnSuspend) {
      btnSuspend.classList.remove("active");
      btnSuspend.title = "Suspender aba (liberar memória)";
    }
    if (placeholder) placeholder.remove();
    iframe.style.display = "";
    let targetUrl = iframe.dataset.originalSrc || tile.url;
    if (targetUrl && (targetUrl.includes("accounts.google.com") || targetUrl.includes("oauth2_callback"))) {
      targetUrl = tile.url;
      delete iframe.dataset.originalSrc;
    }
    if (iframe.getAttribute("src") !== targetUrl) {
      iframe.src = targetUrl;
    }
  }
}

function applyTileZoom(iframe, zoom) {
  // Suporte a zoom moderno (Gecko 126+ / Chrome)
  iframe.style.zoom = zoom;
  // Fallback seguro via transform se necessario
  if (!("zoom" in document.body.style)) {
    iframe.style.transform = `scale(${zoom})`;
    iframe.style.width = `${100 / zoom}%`;
    iframe.style.height = `${100 / zoom}%`;
  }
}

function updateTileZoomUI(card, tile) {
  const z = tile.zoom || 1.0;
  applyTileZoom(card.querySelector(".tile-iframe"), z);
  card.querySelector(".zoom-level").textContent = `${Math.round(z * 100)}%`;
}

// ===================================================
// JANELA DE ADICIONAR / EDITAR
// ===================================================
let modalSpaceTarget = null;

function openModalAdd(tile, spaceTarget = null) {
  editandoId = tile ? tile.id : null;
  modalSpaceTarget = spaceTarget || (state.currentPreset !== "__todos__" ? state.currentPreset : null);

  const wrapperSelect = document.getElementById("modal-space-select-wrapper");
  const selectSpace = document.getElementById("select-modal-space");
  
  if (wrapperSelect && selectSpace) {
    const names = Object.keys(state.presets);
    if (names.length > 0 && (!modalSpaceTarget || state.currentPreset === "__todos__")) {
      wrapperSelect.classList.remove("hidden");
      selectSpace.replaceChildren();
      names.forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        if (modalSpaceTarget === name) opt.selected = true;
        selectSpace.appendChild(opt);
      });
    } else {
      wrapperSelect.classList.add("hidden");
    }
  }

  document.getElementById("modal-title").textContent = tile ? "Editar tela" : (modalSpaceTarget ? `Adicionar tela em "${modalSpaceTarget}"` : "Adicionar tela");
  document.getElementById("btn-modal-save").textContent = tile ? "Salvar" : "Adicionar";
  document.getElementById("input-site-url").value = tile ? tile.url : "";
  document.getElementById("input-site-title").value = tile ? (tile.title || "") : "";
  document.getElementById("modal-add").classList.remove("hidden");
  renderAtalhos();
  document.getElementById("input-site-url").focus();
}

function closeModalAdd() {
  document.getElementById("modal-add").classList.add("hidden");
  editandoId = null;
  modalSpaceTarget = null;
  state.editandoAtalhos = false;
  const btnToggle = document.getElementById("btn-toggle-edit-atalhos");
  if (btnToggle) btnToggle.textContent = "✏️ Gerenciar";
}

function renderAtalhos() {
  const container = document.getElementById("quick-shortcuts-list");
  if (!container) return;
  container.replaceChildren();

  state.atalhos.forEach((at, index) => {
    if (state.editandoAtalhos) {
      const chip = document.createElement("div");
      chip.className = "btn-chip chip-editing";
      const span = document.createElement("span");
      span.textContent = at.title;
      const btnDel = document.createElement("button");
      btnDel.type = "button";
      btnDel.className = "chip-delete-btn";
      btnDel.title = `Excluir atalho "${at.title}"`;
      btnDel.textContent = "✕";
      btnDel.addEventListener("click", (e) => {
        e.stopPropagation();
        state.atalhos.splice(index, 1);
        saveState();
        renderAtalhos();
        toast(`Atalho "${at.title}" removido`);
      });
      chip.append(span, btnDel);
      container.appendChild(chip);
    } else {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-chip";
      btn.dataset.url = at.url;
      btn.dataset.title = at.title;
      btn.textContent = at.title;
      btn.addEventListener("click", () => {
        document.getElementById("input-site-url").value = at.url;
        document.getElementById("input-site-title").value = at.title;
      });
      container.appendChild(btn);
    }
  });
}

function saveNewTile() {
  let url = document.getElementById("input-site-url").value.trim();
  let title = document.getElementById("input-site-title").value.trim();
  if (!url) return toast("Coloque o endereço do site");
  if (!/^https?:\/\//i.test(url)) {
    if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0|192\.168\.|10\.)/i.test(url)) {
      url = "http://" + url;
    } else {
      url = "https://" + url;
    }
  }
  url = normalizaUrl(url);
  if (!urlValida(url)) return toast("Esse endereço não parece válido");
  if (!title) title = getDomain(url);

  const selectWrapper = document.getElementById("modal-space-select-wrapper");
  const selectSpace = document.getElementById("select-modal-space");
  const targetSpace = (selectWrapper && !selectWrapper.classList.contains("hidden") && selectSpace)
    ? selectSpace.value
    : modalSpaceTarget;

  if (targetSpace && state.presets[targetSpace]) {
    const p = state.presets[targetSpace];
    if (!Array.isArray(p.tiles)) p.tiles = [];
    const editado = editandoId && p.tiles.find(t => t.id === editandoId);
    if (editado) {
      editado.url = url;
      editado.title = title;
      const card = document.getElementById(editado.id);
      if (card) preencheCard(card, editado);
    } else {
      const tile = { id: "tile-" + Date.now(), url, title, zoom: 0.85 };
      p.tiles.push(tile);
    }
    if (state.currentPreset === targetSpace) {
      state.tiles = JSON.parse(JSON.stringify(p.tiles));
    }
    toast(`Tela salva no espaço "${targetSpace}"`);
  } else {
    const editado = editandoId && state.tiles.find(t => t.id === editandoId);
    if (editado) {
      editado.url = url;
      editado.title = title;
      const card = document.getElementById(editado.id);
      if (card) preencheCard(card, editado);
    } else {
      const tile = { id: "tile-" + Date.now(), url, title, zoom: 0.85 };
      state.tiles.push(tile);
      if (state.currentPreset && state.currentPreset !== "__todos__" && state.presets[state.currentPreset]) {
        state.presets[state.currentPreset].tiles = JSON.parse(JSON.stringify(state.tiles));
      }
    }
    toast("Tela salva");
  }

  renderTiles();
  saveState();
  closeModalAdd();
}

// ===================================================
// ESPACOS (PRESETS) E MOVER TELAS
// ===================================================
function atualizaBotaoPresets() {
  const btn = document.getElementById("btn-presets");
  const label = document.getElementById("btn-presets-label");
  const btnUpdate = document.getElementById("btn-update-preset");
  const btnLeave = document.getElementById("btn-leave-preset");

  if (state.currentPreset === "__todos__") {
    btn.classList.add("preset-ativo");
    btn.title = "Visão Geral: Todos os espaços conectados lado a lado (1 por 1)";
    if (label) label.textContent = "Todos os Espaços";
    if (btnUpdate) btnUpdate.classList.add("hidden");
    if (btnLeave) btnLeave.classList.remove("hidden");
  } else if (state.currentPreset && state.presets[state.currentPreset]) {
    btn.classList.add("preset-ativo");
    btn.title = `Espaço ativo: "${state.currentPreset}". Clique para trocar ou gerenciar.`;
    if (label) label.textContent = `Espaço: ${state.currentPreset}`;
    if (btnUpdate) {
      btnUpdate.classList.remove("hidden");
      btnUpdate.textContent = `↻ Salvar alterações em "${state.currentPreset}"`;
    }
    if (btnLeave) btnLeave.classList.remove("hidden");
  } else {
    state.currentPreset = null;
    btn.classList.remove("preset-ativo");
    btn.title = "Salvar ou abrir um conjunto de telas";
    if (label) label.textContent = "Opções";
    if (btnUpdate) btnUpdate.classList.add("hidden");
    if (btnLeave) btnLeave.classList.add("hidden");
  }
  renderSpacesPills();
}

function ativarEspaco(name) {
  if (name === "__todos__") {
    ativarVisaoTodosEspacos();
    return;
  }

  const p = state.presets[name];
  if (!p) return;

  // 1. Sincroniza e salva o espaço anterior antes de trocar
  if (state.currentPreset && state.currentPreset !== "__todos__" && state.presets[state.currentPreset] && state.currentPreset !== name) {
    state.presets[state.currentPreset].layout = state.layout;
    state.presets[state.currentPreset].tiles = JSON.parse(JSON.stringify(state.tiles));
    state.presets[state.currentPreset].tamanhos = state.tamanhos[state.layout]
      ? JSON.parse(JSON.stringify(state.tamanhos[state.layout]))
      : null;
  }

  // 2. Ativa o novo espaço
  state.currentPreset = name;
  history.replaceState(null, "", "?espaco=" + encodeURIComponent(name));
  const layout = (p.layout && LAYOUTS[p.layout]) ? p.layout : state.layout;
  state.tiles = JSON.parse(JSON.stringify(p.tiles || []));
  state.tiles.forEach((t, i) => { if (!t.id) t.id = "tile-" + Date.now() + "-" + i; });
  if (p.tamanhos) {
    state.tamanhos[layout] = JSON.parse(JSON.stringify(p.tamanhos));
  }
  renderTiles();
  applyLayout(layout);
  atualizaBotaoPresets();
  renderPresetsMenu();
  renderSpacesPills();
  saveState();
  const menu = document.getElementById("presets-menu");
  if (menu) menu.classList.add("hidden");
  toast(`Espaço "${name}" ativado`);
}

function ativarVisaoTodosEspacos() {
  // Sincroniza o espaço anterior antes de abrir visão geral
  if (state.currentPreset && state.currentPreset !== "__todos__" && state.presets[state.currentPreset]) {
    state.presets[state.currentPreset].layout = state.layout;
    state.presets[state.currentPreset].tiles = JSON.parse(JSON.stringify(state.tiles));
    state.presets[state.currentPreset].tamanhos = state.tamanhos[state.layout]
      ? JSON.parse(JSON.stringify(state.tamanhos[state.layout]))
      : null;
  }

  state.currentPreset = "__todos__";
  history.replaceState(null, "", "?espaco=__todos__");

  renderTiles();
  atualizaBotaoPresets();
  renderPresetsMenu();
  renderSpacesPills();
  saveState();

  const menu = document.getElementById("presets-menu");
  if (menu) menu.classList.add("hidden");
  toast("Visão Geral: Todos os espaços lado a lado (1 por 1)");
}

function renderPresetsMenu() {
  const list = document.getElementById("presets-list");
  list.replaceChildren();
  const names = Object.keys(state.presets);
  if (names.length === 0) {
    const v = document.createElement("div");
    v.className = "presets-vazio";
    v.textContent = "Nenhum espaço salvo ainda";
    list.appendChild(v);
    atualizaBotaoPresets();
    return;
  }

  names.forEach(name => {
    const item = document.createElement("div");
    const isAtivo = state.currentPreset === name;
    item.className = "preset-item" + (isAtivo ? " active" : "");

    const nomeWrap = document.createElement("div");
    nomeWrap.className = "preset-item-nome";

    const nome = document.createElement("span");
    nome.textContent = name;
    nomeWrap.appendChild(nome);

    if (isAtivo) {
      const badge = document.createElement("span");
      badge.className = "preset-badge-ativo";
      badge.textContent = "Ativo";
      nomeWrap.appendChild(badge);
    }

    const apaga = document.createElement("button");
    apaga.className = "preset-delete-btn";
    apaga.title = "Excluir espaço";
    apaga.textContent = "✕";
    item.append(nomeWrap, apaga);

    item.addEventListener("click", () => {
      ativarEspaco(name);
    });

    apaga.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm(`Excluir o espaço "${name}"?`)) {
        delete state.presets[name];
        if (state.currentPreset === name) {
          state.currentPreset = null;
          history.replaceState(null, "", window.location.pathname);
        }
        saveState();
        renderPresetsMenu();
        atualizaBotaoPresets();
        toast(`Espaço "${name}" excluído`);
      }
    });

    list.appendChild(item);
  });

  atualizaBotaoPresets();
}

function fecharPopoversMover() {
  document.querySelectorAll(".tile-move-popover").forEach(p => p.remove());
}

function abreMenuMoverTile(card, tile, wrapper) {
  const jaAberto = wrapper.querySelector(".tile-move-popover");
  fecharPopoversMover();
  if (jaAberto) return;

  const popover = document.createElement("div");
  popover.className = "tile-move-popover";
  popover.addEventListener("click", (e) => e.stopPropagation());

  const cabecalho = document.createElement("div");
  cabecalho.className = "dropdown-header";
  cabecalho.textContent = "Mover tela para:";
  popover.appendChild(cabecalho);

  const lista = document.createElement("div");
  lista.className = "presets-list";

  const presetNames = Object.keys(state.presets);
  if (presetNames.length === 0) {
    const v = document.createElement("div");
    v.className = "presets-vazio";
    v.textContent = "Nenhum espaço salvo ainda";
    lista.appendChild(v);
  } else {
    presetNames.forEach(name => {
      const p = state.presets[name];
      const isAtual = state.currentPreset === name;
      const item = document.createElement("button");
      item.className = "dropdown-item item-mover-espaco";
      if (isAtual) {
        item.style.opacity = "0.5";
        item.style.cursor = "default";
        item.title = "Esta tela já está no espaço ativo";
      }

      const nomeSpan = document.createElement("span");
      nomeSpan.textContent = name;
      const badge = document.createElement("span");
      badge.className = "badge-qtd";
      const qtdTelas = Array.isArray(p.tiles) ? p.tiles.length : 0;
      badge.textContent = isAtual ? "Atual" : `${qtdTelas} tela${qtdTelas === 1 ? '' : 's'}`;

      item.append(nomeSpan, badge);

      if (!isAtual) {
        item.addEventListener("click", () => {
          moveTileParaEspaco(tile, card, name);
        });
      }
      lista.appendChild(item);
    });
  }
  popover.appendChild(lista);

  const divisor = document.createElement("div");
  divisor.className = "dropdown-divider";
  popover.appendChild(divisor);

  const btnNovo = document.createElement("button");
  btnNovo.className = "dropdown-item";
  btnNovo.textContent = "+ Novo espaço com esta tela...";
  btnNovo.addEventListener("click", () => {
    const name = (prompt("Nome para o novo espaço:") || "").trim();
    if (!name) return;
    if (state.presets[name]) {
      return toast(`Já existe um espaço chamado "${name}"`);
    }
    const copia = JSON.parse(JSON.stringify(tile));
    copia.id = "tile-" + Date.now();
    state.presets[name] = {
      layout: state.layout,
      tiles: [copia],
      tamanhos: null
    };

    // Remove da visão atual
    state.tiles = state.tiles.filter(t => t.id !== tile.id);
    renderTiles();

    // Se estiver em espaço ativo, atualiza também
    if (state.currentPreset && state.presets[state.currentPreset]) {
      state.presets[state.currentPreset].tiles = JSON.parse(JSON.stringify(state.tiles));
    }

    saveState();
    renderPresetsMenu();
    fecharPopoversMover();
    toast(`Tela movida para o novo espaço "${name}"`);
  });
  popover.appendChild(btnNovo);

  wrapper.appendChild(popover);
}

function moveTileParaEspaco(tile, card, espacoDestino) {
  if (!state.presets[espacoDestino]) return;

  const copia = JSON.parse(JSON.stringify(tile));
  copia.id = "tile-" + Date.now();
  if (!Array.isArray(state.presets[espacoDestino].tiles)) {
    state.presets[espacoDestino].tiles = [];
  }
  state.presets[espacoDestino].tiles.push(copia);

  // Remove da visão atual
  state.tiles = state.tiles.filter(t => t.id !== tile.id);
  renderTiles();

  // Se estiver em espaço ativo, atualiza o espaço atual
  if (state.currentPreset && state.presets[state.currentPreset]) {
    state.presets[state.currentPreset].tiles = JSON.parse(JSON.stringify(state.tiles));
  }

  saveState();
  renderPresetsMenu();
  fecharPopoversMover();
  toast(`Tela movida para o espaço "${espacoDestino}"`);
}

let toastTimer = null;
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("visivel");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("visivel"), 2400);
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

function urlValida(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch (e) {
    return false;
  }
}

function getDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch (e) {
    return url;
  }
}

// ===================================================
// NAVEGAÇÃO DE ESPAÇOS EM BOLINHAS COM ÍCONES VETORIAIS (SVG)
// ===================================================
function obterIconeEspaco(name, p) {
  const chave = (p && p.icone ? p.icone : "").toLowerCase();
  if (ICONES_ESPACO[chave]) return ICONES_ESPACO[chave];
  if (p && p.icone && p.icone.startsWith("<svg")) return p.icone;

  const n = (name || "").toLowerCase();
  if (n.includes("ia") || n.includes("ai") || n.includes("gpt") || n.includes("bot") || n.includes("claude") || n.includes("gemini")) {
    return ICONES_ESPACO.bot;
  }
  if (n.includes("rotin") || n.includes("work") || n.includes("taref") || n.includes("prod")) {
    return ICONES_ESPACO.zap;
  }
  if (n.includes("edit") || n.includes("video") || n.includes("midia") || n.includes("corte")) {
    return ICONES_ESPACO.video;
  }
  if (n.includes("term") || n.includes("code") || n.includes("dev") || n.includes("sist") || n.includes("cmd")) {
    return ICONES_ESPACO.code;
  }
  if (n.includes("socia") || n.includes("redes") || n.includes("zap") || n.includes("whats") || n.includes("chat")) {
    return ICONES_ESPACO.chat;
  }
  if (n.includes("pesq") || n.includes("busca") || n.includes("estud")) {
    return ICONES_ESPACO.search;
  }
  return ICONES_ESPACO.layers;
}

function atualizaTituloEspacoAtivo() {
  const badge = document.getElementById("active-space-title");
  if (!badge) return;

  if (state.currentPreset === "__todos__") {
    const totalEspacos = Object.keys(state.presets).length;
    let totalTelas = 0;
    Object.values(state.presets).forEach(p => { totalTelas += (p.tiles || []).length; });
    badge.innerHTML = `<span class="active-space-svg">${ICONES_ESPACO.todos}</span><span>Todos os Espaços (1 por 1)</span><span class="active-space-count">(${totalEspacos} espaços • ${totalTelas} telas)</span>`;
    badge.title = `Visão Geral: ${totalEspacos} espaços conectados lado a lado (${totalTelas} telas abertas)`;
  } else if (state.currentPreset && state.presets[state.currentPreset]) {
    const p = state.presets[state.currentPreset];
    const icone = obterIconeEspaco(state.currentPreset, p);
    badge.innerHTML = `<span class="active-space-svg">${icone}</span><span>${escapeHtml(state.currentPreset)}</span>`;
    badge.title = `Espaço ativo: "${state.currentPreset}" (${(p.tiles || []).length} telas)`;
  } else {
    badge.innerHTML = `<span class="active-space-svg">${ICONES_ESPACO.livre}</span><span>Livre</span>`;
    badge.title = "Modo Livre (sem espaço fixo)";
  }
}

function abreMenuContextoEspaco(e, name, p) {
  fecharPopoversMover();
  document.querySelectorAll(".space-context-menu").forEach(m => m.remove());

  const menu = document.createElement("div");
  menu.className = "space-context-menu dropdown-menu";
  menu.style.position = "fixed";
  menu.style.left = Math.min(e.clientX, window.innerWidth - 220) + "px";
  menu.style.top = (e.clientY + 8) + "px";
  menu.style.zIndex = "99999";
  menu.style.minWidth = "190px";

  const header = document.createElement("div");
  header.className = "dropdown-header";
  header.textContent = `Espaço: ${name}`;
  menu.appendChild(header);

  // Trocar Ícone via grid de ícones vetoriais
  const itemIcone = document.createElement("div");
  itemIcone.className = "dropdown-item-submenu";
  itemIcone.innerHTML = `<div class="dropdown-header-sm">Escolher Ícone:</div>
  <div class="icones-picker-grid">
    <button type="button" data-icon="bot" title="Robô / IA">${ICONES_ESPACO.bot}</button>
    <button type="button" data-icon="zap" title="Raio / Rotinas">${ICONES_ESPACO.zap}</button>
    <button type="button" data-icon="video" title="Vídeo / Edição">${ICONES_ESPACO.video}</button>
    <button type="button" data-icon="code" title="Código / Dev">${ICONES_ESPACO.code}</button>
    <button type="button" data-icon="chat" title="Chat / Redes">${ICONES_ESPACO.chat}</button>
    <button type="button" data-icon="search" title="Pesquisa">${ICONES_ESPACO.search}</button>
    <button type="button" data-icon="layers" title="Camadas">${ICONES_ESPACO.layers}</button>
    <button type="button" data-icon="livre" title="Globo">${ICONES_ESPACO.livre}</button>
  </div>`;
  itemIcone.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      menu.remove();
      p.icone = btn.dataset.icon;
      saveState();
      renderSpacesPills();
      toast(`Ícone do espaço "${name}" atualizado!`);
    });
  });
  menu.appendChild(itemIcone);

  // Renomear
  const itemRenomear = document.createElement("button");
  itemRenomear.className = "dropdown-item";
  itemRenomear.textContent = "Renomear espaço...";
  itemRenomear.addEventListener("click", () => {
    menu.remove();
    const novoNome = (prompt(`Novo nome para o espaço "${name}":`, name) || "").trim();
    if (novoNome && novoNome !== name) {
      if (state.presets[novoNome]) return toast(`Já existe um espaço chamado "${novoNome}"`);
      state.presets[novoNome] = p;
      delete state.presets[name];
      if (state.currentPreset === name) {
        state.currentPreset = novoNome;
        history.replaceState(null, "", "?espaco=" + encodeURIComponent(novoNome));
      }
      saveState();
      renderSpacesPills();
      renderPresetsMenu();
      atualizaBotaoPresets();
      toast(`Espaço renomeado para "${novoNome}"`);
    }
  });
  menu.appendChild(itemRenomear);

  // Salvar telas atuais
  const itemUpdate = document.createElement("button");
  itemUpdate.className = "dropdown-item";
  itemUpdate.textContent = "Gravar telas atuais aqui";
  itemUpdate.addEventListener("click", () => {
    menu.remove();
    p.layout = state.layout;
    p.tiles = JSON.parse(JSON.stringify(state.tiles));
    p.tamanhos = state.tamanhos[state.layout] ? JSON.parse(JSON.stringify(state.tamanhos[state.layout])) : null;
    saveState();
    renderSpacesPills();
    renderPresetsMenu();
    toast(`Telas salvas no espaço "${name}"`);
  });
  menu.appendChild(itemUpdate);

  const divider = document.createElement("div");
  divider.className = "dropdown-divider";
  menu.appendChild(divider);

  // Excluir
  const itemExcluir = document.createElement("button");
  itemExcluir.className = "dropdown-item item-perigo";
  itemExcluir.textContent = "Excluir espaço";
  itemExcluir.addEventListener("click", () => {
    menu.remove();
    if (confirm(`Tem certeza que deseja excluir o espaço "${name}"?`)) {
      delete state.presets[name];
      if (state.currentPreset === name) {
        state.currentPreset = null;
        history.replaceState(null, "", window.location.pathname);
      }
      saveState();
      renderPresetsMenu();
      atualizaBotaoPresets();
      renderSpacesPills();
      toast(`Espaço "${name}" excluído`);
    }
  });
  menu.appendChild(itemExcluir);

  document.body.appendChild(menu);
  const fechar = (ev) => {
    if (!menu.contains(ev.target)) {
      menu.remove();
      document.removeEventListener("pointerdown", fechar);
    }
  };
  setTimeout(() => document.addEventListener("pointerdown", fechar), 20);
}

function renderSpacesPills() {
  const container = document.getElementById("spaces-pills");
  if (!container) return;
  container.replaceChildren();

  // 1. Bolinha "Todos os Espaços" (Visão geral 1 por 1 lado a lado)
  const isTodos = state.currentPreset === "__todos__";
  const btnTodos = document.createElement("button");
  btnTodos.type = "button";
  btnTodos.className = "space-circle-btn space-btn-todos" + (isTodos ? " active" : "");
  btnTodos.title = "Todos os Espaços: ver todos os conjuntos de telas lado a lado (1 por 1 com rolagem vertical)";
  btnTodos.innerHTML = `<span class="space-circle-icon">${ICONES_ESPACO.todos}</span>`;
  btnTodos.addEventListener("click", () => {
    ativarVisaoTodosEspacos();
  });
  container.appendChild(btnTodos);

  // 2. Bolinha "Livre" (modo avulso)
  const isLivre = !state.currentPreset || (!state.presets[state.currentPreset] && state.currentPreset !== "__todos__");
  const btnLivre = document.createElement("button");
  btnLivre.type = "button";
  btnLivre.className = "space-circle-btn" + (isLivre ? " active" : "");
  btnLivre.title = "Espaço Livre (telas avulsas sem espaço fixo)";
  btnLivre.innerHTML = `<span class="space-circle-icon">${ICONES_ESPACO.livre}</span>`;
  btnLivre.addEventListener("click", () => {
    if (state.currentPreset && state.currentPreset !== "__todos__" && state.presets[state.currentPreset]) {
      state.presets[state.currentPreset].layout = state.layout;
      state.presets[state.currentPreset].tiles = JSON.parse(JSON.stringify(state.tiles));
      state.presets[state.currentPreset].tamanhos = state.tamanhos[state.layout]
        ? JSON.parse(JSON.stringify(state.tamanhos[state.layout]))
        : null;
    }
    state.currentPreset = null;
    history.replaceState(null, "", window.location.pathname);
    saveState();
    renderTiles();
    atualizaBotaoPresets();
    renderSpacesPills();
    toast("Modo Livre ativado");
  });
  container.appendChild(btnLivre);

  // 3. Bolinhas de cada espaço salvo
  const names = Object.keys(state.presets);
  names.forEach(name => {
    const p = state.presets[name];
    const isAtivo = state.currentPreset === name;
    const icone = obterIconeEspaco(name, p);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "space-circle-btn" + (isAtivo ? " active" : (isTodos ? " in-all-view" : ""));
    const qtdTelas = Array.isArray(p.tiles) ? p.tiles.length : 0;
    btn.title = `Espaço: "${name}" (${qtdTelas} telas)\n• Clique para abrir\n• Botão direito para opções`;
    btn.innerHTML = `<span class="space-circle-icon">${icone}</span>`;

    btn.addEventListener("click", () => {
      ativarEspaco(name);
    });

    btn.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      abreMenuContextoEspaco(e, name, p);
    });

    container.appendChild(btn);
  });

  atualizaTituloEspacoAtivo();
}

// ===================================================
// BROADCAST SIMULTÂNEO PARA TODAS AS IAs ABERTAS
// ===================================================
function setupAiBroadcast() {
  const input = document.getElementById("ai-broadcast-input");
  const btnSend = document.getElementById("btn-ai-broadcast-send");
  if (!input || !btnSend) return;

  const enviar = () => {
    const texto = input.value.trim();
    if (!texto) {
      toast("Digite um prompt para enviar às IAs");
      return;
    }
    enviarPromptParaTodasIAs(texto);
    input.value = "";
    input.blur();
  };

  btnSend.addEventListener("click", enviar);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  });
}

function enviarPromptParaTodasIAs(promptTexto) {
  // 1. Envio para todas as iframes no documento atual (via postMessage)
  const iframes = document.querySelectorAll("#grid-container iframe");
  iframes.forEach(iframe => {
    try {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: "JARVIS_MULTI_PROMPT",
          prompt: promptTexto
        }, "*");
      }
    } catch (e) {
      console.warn("Erro ao enviar postMessage para iframe:", e);
    }
  });

  // 2. Envio para o script de background retransmitir a todas as abas e subframes
  try {
    if (typeof browser !== "undefined" && browser.runtime && browser.runtime.sendMessage) {
      browser.runtime.sendMessage({
        type: "DISPARAR_PROMPT_IA",
        prompt: promptTexto
      });
    } else if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({
        type: "DISPARAR_PROMPT_IA",
        prompt: promptTexto
      });
    }
  } catch (e) {
    console.warn("Erro ao enviar via runtime.sendMessage:", e);
  }

  toast("⚡ Prompt enviado simultaneamente para as IAs!");
}

// ===================================================
// GAVETA LATERAL RETRÁTIL DE LINKS & CATEGORIAS
// ===================================================
function setupSidebar() {
  const btnToggle = document.getElementById("btn-toggle-sidebar");
  const btnClose = document.getElementById("btn-close-sidebar");
  const btnAddLink = document.getElementById("btn-add-sidebar-link");
  const btnAddCat = document.getElementById("btn-add-sidebar-cat");

  if (btnToggle) {
    btnToggle.addEventListener("click", () => {
      state.sidebarOpen = !state.sidebarOpen;
      aplicaSidebar();
      saveState();
    });
  }

  if (btnClose) {
    btnClose.addEventListener("click", () => {
      state.sidebarOpen = false;
      aplicaSidebar();
      saveState();
    });
  }

  if (btnAddCat) {
    btnAddCat.addEventListener("click", () => {
      const nome = (prompt("Nome da nova categoria:") || "").trim();
      if (!nome) return;
      state.categorias.push({
        id: "cat-" + Date.now(),
        nome,
        aberta: true,
        links: []
      });
      renderSidebar();
      saveState();
      toast(`Categoria "${nome}" adicionada`);
    });
  }

  if (btnAddLink) {
    btnAddLink.addEventListener("click", () => {
      if (!state.categorias || state.categorias.length === 0) {
        state.categorias = [{ id: "cat-padrao", nome: "Geral", aberta: true, links: [] }];
      }
      let url = (prompt("Endereço (URL) do link:") || "").trim();
      if (!url) return;
      if (!/^https?:\/\//i.test(url)) {
        if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0|192\.168\.|10\.)/i.test(url)) {
          url = "http://" + url;
        } else {
          url = "https://" + url;
        }
      }
      url = normalizaUrl(url);
      let title = (prompt("Nome do link (opcional):", getDomain(url)) || "").trim();
      if (!title) title = getDomain(url);

      const catAlvo = state.categorias.find(c => c.aberta) || state.categorias[0];
      catAlvo.links.push({ title, url });
      catAlvo.aberta = true;
      renderSidebar();
      saveState();
      toast(`Link "${title}" adicionado a "${catAlvo.nome}"`);
    });
  }

  aplicaSidebar();
  renderSidebar();
}

function aplicaSidebar() {
  const drawer = document.getElementById("sidebar-drawer");
  const btnToggle = document.getElementById("btn-toggle-sidebar");
  if (!drawer) return;
  if (state.sidebarOpen) {
    drawer.classList.remove("collapsed");
    if (btnToggle) btnToggle.classList.add("active");
  } else {
    drawer.classList.add("collapsed");
    if (btnToggle) btnToggle.classList.remove("active");
  }
}

function renderSidebar() {
  const container = document.getElementById("sidebar-categories");
  if (!container) return;
  container.replaceChildren();

  if (!state.categorias || state.categorias.length === 0) {
    state.categorias = JSON.parse(JSON.stringify(DEFAULT_CATEGORIAS));
  }

  state.categorias.forEach((cat, catIdx) => {
    const catEl = document.createElement("div");
    catEl.className = "sidebar-cat";

    const header = document.createElement("div");
    header.className = "sidebar-cat-header";

    const titleWrap = document.createElement("div");
    titleWrap.className = "sidebar-cat-title-wrap";

    const arrow = document.createElement("span");
    arrow.className = "sidebar-cat-arrow" + (cat.aberta ? " open" : "");
    arrow.textContent = cat.aberta ? "▾" : "›";

    const nome = document.createElement("span");
    nome.className = "sidebar-cat-title";
    nome.textContent = cat.nome;

    const count = document.createElement("span");
    count.className = "sidebar-cat-count";
    count.textContent = cat.links ? cat.links.length : 0;

    titleWrap.append(arrow, nome, count);

    const actions = document.createElement("div");
    actions.className = "sidebar-cat-actions";

    const btnAddLnk = document.createElement("button");
    btnAddLnk.className = "btn-cat-mini";
    btnAddLnk.title = "Adicionar link nesta categoria";
    btnAddLnk.textContent = "+";
    btnAddLnk.addEventListener("click", (e) => {
      e.stopPropagation();
      let url = (prompt(`Adicionar URL em "${cat.nome}":`) || "").trim();
      if (!url) return;
      if (!/^https?:\/\//i.test(url)) {
        if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0|192\.168\.|10\.)/i.test(url)) {
          url = "http://" + url;
        } else {
          url = "https://" + url;
        }
      }
      url = normalizaUrl(url);
      let title = (prompt("Nome do link:", getDomain(url)) || "").trim();
      if (!title) title = getDomain(url);
      cat.links.push({ title, url });
      cat.aberta = true;
      renderSidebar();
      saveState();
    });

    const btnDelCat = document.createElement("button");
    btnDelCat.className = "btn-cat-mini btn-del";
    btnDelCat.title = "Excluir categoria";
    btnDelCat.textContent = "✕";
    btnDelCat.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm(`Excluir a categoria "${cat.nome}" e seus atalhos?`)) {
        state.categorias.splice(catIdx, 1);
        renderSidebar();
        saveState();
      }
    });

    actions.append(btnAddLnk, btnDelCat);
    header.append(titleWrap, actions);

    header.addEventListener("click", () => {
      cat.aberta = !cat.aberta;
      renderSidebar();
      saveState();
    });

    catEl.appendChild(header);

    const body = document.createElement("div");
    body.className = "sidebar-cat-body" + (cat.aberta ? " open" : "");

    if (Array.isArray(cat.links) && cat.links.length > 0) {
      cat.links.forEach((link, linkIdx) => {
        const item = document.createElement("div");
        item.className = "sidebar-link-item";

        const icon = document.createElement("img");
        icon.className = "sidebar-link-icon";
        icon.src = `https://www.google.com/s2/favicons?domain=${getDomain(link.url)}&sz=16`;
        icon.onerror = () => { icon.style.display = "none"; };

        const title = document.createElement("span");
        title.className = "sidebar-link-title";
        title.textContent = link.title;

        const linkActions = document.createElement("div");
        linkActions.className = "sidebar-link-actions";

        const btnAdd = document.createElement("button");
        btnAdd.className = "btn-link-mini";
        btnAdd.title = "Adicionar como nova tela";
        btnAdd.textContent = "+";
        btnAdd.addEventListener("click", (e) => {
          e.stopPropagation();
          adicionarTileDireto(link.title, link.url);
        });

        const btnDel = document.createElement("button");
        btnDel.className = "btn-link-mini btn-del";
        btnDel.title = "Remover atalho";
        btnDel.textContent = "✕";
        btnDel.addEventListener("click", (e) => {
          e.stopPropagation();
          cat.links.splice(linkIdx, 1);
          renderSidebar();
          saveState();
        });

        linkActions.append(btnAdd, btnDel);

        item.append(icon, title, linkActions);
        item.addEventListener("click", () => {
          adicionarTileDireto(link.title, link.url);
        });

        body.appendChild(item);
      });
    } else {
      const vazio = document.createElement("div");
      vazio.className = "sidebar-cat-empty";
      vazio.textContent = "Nenhum link nesta categoria";
      body.appendChild(vazio);
    }

    catEl.appendChild(body);
    container.appendChild(catEl);
  });
}

function adicionarTileDireto(title, url, spaceTarget = null) {
  const normUrl = normalizaUrl(url);
  const tileTitle = title || getDomain(normUrl);
  const tile = {
    id: "tile-" + Date.now(),
    url: normUrl,
    title: tileTitle,
    zoom: 0.85
  };

  const target = spaceTarget || (state.currentPreset !== "__todos__" ? state.currentPreset : Object.keys(state.presets)[0]);
  if (target && state.presets[target]) {
    if (!Array.isArray(state.presets[target].tiles)) state.presets[target].tiles = [];
    state.presets[target].tiles.push(tile);
    if (state.currentPreset === target) {
      state.tiles = JSON.parse(JSON.stringify(state.presets[target].tiles));
    }
    toast(`Tela "${tileTitle}" adicionada em "${target}"`);
  } else {
    state.tiles.push(tile);
    if (state.currentPreset && state.currentPreset !== "__todos__" && state.presets[state.currentPreset]) {
      state.presets[state.currentPreset].tiles = JSON.parse(JSON.stringify(state.tiles));
    }
    toast(`Tela "${tileTitle}" adicionada`);
  }

  renderTiles();
  saveState();
  const card = document.getElementById(tile.id);
  if (card) card.scrollIntoView({ block: "nearest", behavior: "smooth" });
}
