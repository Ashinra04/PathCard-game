import './style.css';
import './Combate/Combate.css';
import './Combate/Combate.js';
import './Combate/BancoDeImagens.js';

import { CentralImgCardsCF } from './Combate/BancoDeImagens.js';

window.CentralImgCardsCF = CentralImgCardsCF;

let PersonagemIndex = 0; 
window.PersonagemEscolhido = '';

const Personagens = ['Druida', 'WeaponMaster', 'SpiritMaster', 'Desconhecido'];

window.DecksIniciais = {
	Druida: 
		['Coelho', 'Sapo', 'Morcego', 'Cobra', 'Aranha', 'Sapo', 'SNatureza', 'SFortitude', 'SCura'],
	
	WeaponMaster: 
		['Sword', 'Dagger', 'Spear', 'Bow', 'Wand','Broquel', 'Sharpen', 'Repair', 'Barragem'],

	SpiritMaster: []
}
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
window.SelecaoPerso = function(botao) {
	let Personagem = document.getElementById('iconPerso');
	let BoxPersonagem = document.getElementById(`seleçãoP${PersonagemIndex}`);
	const PersonagemSelecaoBoxes = document.querySelectorAll('.SeleçãoIcone');
	
	PersonagemSelecaoBoxes.forEach(Boxes =>       Boxes.classList.add('SeleçãoIcone'));
	PersonagemSelecaoBoxes.forEach(Boxes =>       Boxes.classList.remove('SeleçãoIcone2'));
	
	if(botao === 'avancar') 
	{
		if(PersonagemIndex < 3) {
			PersonagemIndex++;
			Personagem.innerText = Personagens[PersonagemIndex];
		}
		else if(PersonagemIndex == 3) {
			PersonagemIndex = 0;
			Personagem.innerText = Personagens[PersonagemIndex];
		}
	}
	else if(botao === 'voltar') 
	{
		if(PersonagemIndex > 0) {
			--PersonagemIndex;
			Personagem.innerText = Personagens[PersonagemIndex];
		}
		else if(PersonagemIndex == 0) {
			PersonagemIndex = 3;
			Personagem.innerText = Personagens[PersonagemIndex];
		}
	} else 
	{
		PersonagemEscolhido = Personagens[PersonagemIndex];
		window.montarDeck();
	}
}
window.montarDeck = function () {
	for(let i = 1; i < 10; i++){
		const CPosicao = document.getElementById(`${i}Carta`);
		CPosicao.style.backgroundImage = '';
	}
	if(DecksIniciais[PersonagemEscolhido]){
		let index = 1;
		DecksIniciais[PersonagemEscolhido].forEach((carta) => {
			const CPosicao = document.getElementById(`${index}Carta`);
			
    	//const indexCarta = window.DecksIniciais[PersonagemEscolhido][carta];
			console.log(carta)
			
    	const indexImagem = window.CentralImgCardsCF.ImagensComFundo[carta];
			
			window.CardsPlayer.push(carta);

			if(indexImagem){
				CPosicao.style.backgroundImage = `url('${indexImagem}')`;
			}
    	
			index++;
		})
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