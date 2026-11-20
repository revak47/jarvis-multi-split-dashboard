// Jarvis Multi-Split - Popup (Compatível com Chrome & Firefox)

const extApi = typeof browser !== "undefined" ? browser : chrome;
const PAINEL = extApi.runtime.getURL("dashboard.html");

document.getElementById("btn-open-full").addEventListener("click", openDashboard);

document.querySelectorAll(".btn-layout-quick").forEach(btn => {
  btn.addEventListener("click", () => {
    const layout = btn.dataset.layout;
    if (extApi.storage && extApi.storage.local) {
      extApi.storage.local.get("jarvis_split_state", (res) => {
        const st = (res && res.jarvis_split_state) || {};
        st.layout = layout;
        extApi.storage.local.set({
          jarvis_split_state: st,
          jarvis_split_pedido: { layout: st.layout, t: Date.now() }
        }, () => {
          openDashboard();
        });
      });
    } else {
      openDashboard();
    }
  });
});

function openDashboard() {
  extApi.tabs.query({ url: PAINEL }, (tabs) => {
    if (tabs && tabs.length > 0) {
      const aba = tabs[0];
      extApi.tabs.update(aba.id, { active: true });
      if (extApi.windows && aba.windowId) {
        extApi.windows.update(aba.windowId, { focused: true });
      }
    } else {
      extApi.tabs.create({ url: PAINEL });
    }
    window.close();
  });
}
