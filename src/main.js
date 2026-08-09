import './style.css';

/* Imports das Telas Específicas
import './telas/loja/loja.css';
import './telas/loja/loja.js';
import lojaHtml from './telas/loja/loja.html?raw';

const cl = document.getElementById('container-loja');
if (cl) cl.outerHTML = lojaHtml; */

// ==========================================
// NAVEGAÇÃO E VALIDAÇÕES INICIAIS
// ==========================================

window.mudarTela = function (idParaMostrar) {
  const telas = document.querySelectorAll('.tela');
  telas.forEach(tela =>       tela.classList.add('oculto'));

  const proximaTela = document.getElementById(idParaMostrar);
    if (proximaTela) {
        proximaTela.classList.remove('oculto');
    } else {
      console.error("A tela " + idParaMostrar + " não foi encontrada!");
    }
};

window.PersonagemIndex = 1;
window.SelecaoDePeraonagem = function(botao) {
	let Personagem = document.getElementById('iconPerso');
	if(botao === 'avancar') {
		if(PersonagemIndex < 4) {
			PersonagemIndex++;
			Personagem.innerText = PersonagemIndex;
		}
		else if(PersonagemIndex == 4) {
			Personagem.innerText = 1;
			PersonagemIndex = 1;
		}
	}
	else {
		if(PersonagemIndex > 1) {
			--PersonagemIndex;
			Personagem.innerText = PersonagemIndex;
		}
		else if(PersonagemIndex == 1) {
			Personagem.innerText = 4;
			PersonagemIndex = 4;
		}
	}
}

window.DesativarPopUp = function(){
	let PopUp = document.getElementById('PopUpskillaCards');
	PopUp.classList.add('oculto');
}

function AtivarPopUp(botaoClicado) {
	let PopUp = document.getElementById('PopUpskillaCards');
	PopUp.classList.remove('oculto');
	}

	const containerPai = document.getElementById('BoxBaralho');

if (containerPai) {
  containerPai.addEventListener('click', function(event) {

    const botao = event.target.closest('.Cards');

    if (botao) {
      AtivarPopUp(botao);
    }
  });
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('Service Worker registrado com sucesso!'))
      .catch(error => console.log('Falha ao registrar o Service Worker:', error));
  });
}