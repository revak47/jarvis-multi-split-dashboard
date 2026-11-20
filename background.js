// Safe public build: no cookie rewrites, no response-header stripping, no automatic OAuth tabs.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.action === 'open_dashboard') {
    chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
    sendResponse({ status: 'ok' });
    return;
  }
  if (message?.type === 'DISPARAR_PROMPT_IA') {
    chrome.tabs.query({}, tabs => tabs.forEach(tab => {
      if (tab?.id) chrome.tabs.sendMessage(tab.id, message).catch(() => {});
    }));
    sendResponse({ status: 'ok', dispatched: true });
  }
});
chrome.commands.onCommand.addListener(async command => {
  if (command !== 'toggle-topbar') return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) chrome.tabs.sendMessage(tab.id, { action: 'toggle-topbar' }).catch(() => {});
});
