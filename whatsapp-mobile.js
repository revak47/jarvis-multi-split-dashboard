// Jarvis Multi-Split - Injetor de navegacao mobile no WhatsApp Web
(function () {
  'use strict';

  function injetaBotaoVoltar() {
    const main = document.querySelector('div#main');
    if (!main) return;

    // Procura o header da conversa
    const header = main.querySelector('header');
    if (!header) return;

    if (header.querySelector('.jarvis-wa-back-btn')) return;

    const btnVoltar = document.createElement('button');
    btnVoltar.className = 'jarvis-wa-back-btn';
    btnVoltar.title = 'Voltar para a lista de conversas';
    btnVoltar.innerHTML = '←';
    btnVoltar.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      // Dispara tecla Escape no documento: no WhatsApp Web, isso fecha a conversa ativa
      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        which: 27,
        bubbles: true,
        cancelable: true
      }));
    });

    header.prepend(btnVoltar);
  }

  // Observa alteracoes no DOM para injetar o botao assim que a conversa abrir
  const observer = new MutationObserver(() => {
    injetaBotaoVoltar();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  // Tenta rodar logo no inicio
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injetaBotaoVoltar);
  } else {
    injetaBotaoVoltar();
  }
})();
