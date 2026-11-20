// Jarvis Multi-Split - Injetor de Envio Simultâneo (Broadcast) para IAs
(function () {
  'use strict';

  function injetaTextoEEnvia(texto) {
    if (!texto || !texto.trim()) return;
    const msg = texto.trim();
    const host = window.location.hostname.toLowerCase();

    // 1. ChatGPT (chatgpt.com / chat.openai.com)
    if (host.includes("chatgpt.com") || host.includes("openai.com")) {
      const el = document.querySelector("#prompt-textarea") ||
                 document.querySelector("div[contenteditable='true']") ||
                 document.querySelector("textarea");
      if (el) {
        el.focus();
        if (el.tagName === "TEXTAREA") {
          el.value = msg;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        } else {
          document.execCommand("selectAll", false, null);
          document.execCommand("insertText", false, msg);
          el.dispatchEvent(new Event("input", { bubbles: true }));
        }
        setTimeout(() => {
          const btn = document.querySelector("button[data-testid='send-button']") ||
                      document.querySelector("form #prompt-textarea ~ button") ||
                      document.querySelector("form div.min-w-0 ~ button") ||
                      document.querySelector("button[aria-label*='Send']") ||
                      document.querySelector("button[aria-label*='prompt']") ||
                      document.querySelector("button:has(svg path[d*='M.5 1.5'])");
          if (btn && !btn.disabled) {
            btn.click();
          } else {
            el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true }));
          }
        }, 300);
        return;
      }
    }

    // 2. Claude (claude.ai)
    if (host.includes("claude.ai")) {
      const el = document.querySelector("fieldset div[data-testid='chat-input']") ||
                 document.querySelector("fieldset .tiptap") ||
                 document.querySelector("div.ProseMirror[contenteditable='true']") ||
                 document.querySelector("div[contenteditable='true']");
      if (el) {
        el.focus();
        document.execCommand("selectAll", false, null);
        document.execCommand("insertText", false, msg);
        el.dispatchEvent(new Event("input", { bubbles: true }));
        setTimeout(() => {
          const btn = document.querySelector("button[data-testid='chat-input-send']") ||
                      document.querySelector("fieldset button[aria-label*='Send message']") ||
                      document.querySelector("fieldset button.text-on-brand") ||
                      document.querySelector("button[aria-label*='Send Message']") ||
                      document.querySelector("button[aria-label*='Send prompt']") ||
                      document.querySelector("button:has(svg)");
          if (btn && !btn.disabled) {
            btn.click();
          } else {
            el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true }));
          }
        }, 300);
        return;
      }
    }

    // 3. Google Gemini (gemini.google.com)
    if (host.includes("gemini.google.com")) {
      const el = document.querySelector("input-area-v2 rich-textarea div") ||
                 document.querySelector("rich-textarea div.ql-editor") ||
                 document.querySelector(".input-area rich-textarea div") ||
                 document.querySelector("div[contenteditable='true']") ||
                 document.querySelector("textarea");
      if (el) {
        el.focus();
        if (el.tagName === "TEXTAREA") {
          el.value = msg;
          el.dispatchEvent(new Event("input", { bubbles: true }));
        } else {
          document.execCommand("selectAll", false, null);
          document.execCommand("insertText", false, msg);
          el.dispatchEvent(new Event("input", { bubbles: true }));
        }
        setTimeout(() => {
          const btn = document.querySelector("input-area-v2 div[class*=send] button[class*=send]") ||
                      document.querySelector("button[aria-label*='Enviar']") ||
                      document.querySelector("button[aria-label*='Send']") ||
                      document.querySelector("button.send-button");
          if (btn && !btn.disabled) {
            btn.click();
          } else {
            el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true }));
          }
        }, 300);
        return;
      }
    }

    // 4. Perplexity (perplexity.ai)
    if (host.includes("perplexity.ai")) {
      const el = document.querySelector("textarea") ||
                 document.querySelector("div.composer-editable") ||
                 document.querySelector("div[contenteditable='true']");
      if (el) {
        el.focus();
        if (el.tagName === "TEXTAREA") {
          el.value = msg;
          el.dispatchEvent(new Event("input", { bubbles: true }));
        } else {
          try {
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          } catch(e) {}
          const ev = new InputEvent("beforeinput", {
            bubbles: true,
            cancelable: true,
            inputType: "insertText",
            data: msg
          });
          el.dispatchEvent(ev);
          el.dispatchEvent(new Event("input", { bubbles: true }));
        }
        setTimeout(() => {
          const btn = document.querySelector("button[aria-label*='Enviar']") ||
                      document.querySelector("button[aria-label*='Submit']") ||
                      document.querySelector("button[aria-label*='Send']") ||
                      document.querySelector("button:has(svg)");
          if (btn && !btn.disabled) {
            btn.click();
          } else {
            el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true }));
          }
        }, 300);
        return;
      }
    }

    // 5. DeepSeek (chat.deepseek.com)
    if (host.includes("deepseek.com")) {
      const el = document.querySelector("textarea#chat-input") || document.querySelector("textarea");
      if (el) {
        el.focus();
        el.value = msg;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        setTimeout(() => {
          const btn = document.querySelector("#chat-input ~ div[role='button']") ||
                      document.querySelector("div[role='button'].ds-button--primary") ||
                      document.querySelector("div[role='button']:has(svg)") ||
                      document.querySelector("button:has(svg)");
          if (btn) btn.click();
        }, 300);
        return;
      }
    }

    // 6. Grok (grok.com ou x.com/i/grok)
    if (host.includes("grok.com") || (host.includes("x.com") && window.location.pathname.includes("/grok"))) {
      const el = document.querySelector("textarea[placeholder*='Ask']") ||
                 document.querySelector("textarea") ||
                 document.querySelector("div[contenteditable='true']");
      if (el) {
        el.focus();
        if (el.tagName === "TEXTAREA") {
          el.value = msg;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        } else {
          document.execCommand("selectAll", false, null);
          document.execCommand("insertText", false, msg);
          el.dispatchEvent(new Event("input", { bubbles: true }));
        }
        setTimeout(() => {
          const btn = document.querySelector("button[aria-label*='Send']") ||
                      document.querySelector("button[aria-label*='Grok']") ||
                      document.querySelector("button[type='submit']") ||
                      document.querySelector("button:has(svg)");
          if (btn && !btn.disabled) {
            btn.click();
          } else {
            el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true }));
          }
        }, 300);
        return;
      }
    }

    // 7. Manus (manus.im ou app.manus.im)
    if (host.includes("manus.im")) {
      const el = document.querySelector("textarea") ||
                 document.querySelector("div[contenteditable='true']");
      if (el) {
        el.focus();
        if (el.tagName === "TEXTAREA") {
          el.value = msg;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        } else {
          try {
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          } catch(e) {}
          const ev = new InputEvent("beforeinput", {
            bubbles: true,
            cancelable: true,
            inputType: "insertText",
            data: msg
          });
          el.dispatchEvent(ev);
          document.execCommand("selectAll", false, null);
          document.execCommand("insertText", false, msg);
          el.dispatchEvent(new Event("input", { bubbles: true }));
        }
        setTimeout(() => {
          const btn = document.querySelector("button[type='submit']") ||
                      document.querySelector("button[aria-label*='Send']") ||
                      document.querySelector("button[aria-label*='Enviar']") ||
                      document.querySelector("button:has(svg)");
          if (btn && !btn.disabled) {
            btn.click();
          } else {
            el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true }));
          }
        }, 300);
        return;
      }
    }

    // 8. Generic Fallback
    const el = document.querySelector("textarea:not([disabled])") ||
               document.querySelector("div[contenteditable='true']:not([aria-hidden='true'])");
    if (el) {
      el.focus();
      if (el.tagName === "TEXTAREA") {
        el.value = msg;
        el.dispatchEvent(new Event("input", { bubbles: true }));
      } else {
        document.execCommand("selectAll", false, null);
        document.execCommand("insertText", false, msg);
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }
      setTimeout(() => {
        const btn = document.querySelector("button[type='submit']") ||
                    document.querySelector("button[aria-label*='Send']") ||
                    document.querySelector("button[aria-label*='send']");
        if (btn && !btn.disabled) btn.click();
      }, 300);
    }
  }

  function processaMensagem(msg) {
    if (!msg) return;
    const tipo = msg.tipo || msg.type;
    const texto = msg.texto || msg.prompt || msg.text || msg.message;
    if (texto && (tipo === "DISPARAR_PROMPT_IA" || tipo === "JARVIS_MULTI_SPLIT_AI_PROMPT" || tipo === "JARVIS_MULTI_PROMPT")) {
      injetaTextoEEnvia(texto);
    }
  }

  // Ouve via runtime message (do background)
  const api = typeof browser !== "undefined" && browser.runtime ? browser : (typeof chrome !== "undefined" ? chrome : null);
  if (api && api.runtime && api.runtime.onMessage) {
    api.runtime.onMessage.addListener((msg) => {
      processaMensagem(msg);
    });
  }

  // Ouve via postMessage (do dashboard direto)
  window.addEventListener("message", (e) => {
    processaMensagem(e.data);
  });
})();
