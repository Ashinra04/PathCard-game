//================== IMPORTS DE CSS =======================
import './style.css';
import './Tela_Selecao_Persomagem/SeleçaoDePerso.css';
import './Tela_Cards_e_Passivas/CardsEPassivas.css';
import './Tela_Hub/HUB.css';
import './Combate/Combate.css';
import './Combate/PopUp_Do_Combate/PopUp.css';
import './Combate/Animacoes/Animações.css';

//====================================================
//================== IMPORTS DE JS =======================
import './Combate/Combate.js';
import { CentralImgCardsCF } from './Combate/ObjetosDeDados/BancoDeimagens.js';
window.CentralImgCardsCF = CentralImgCardsCF;

//==========================================================
//================== IMPORTS DE HTNL =======================
const corpoDoSite = document.body;

import SelecaPersoHtml from './Tela_Selecao_Persomagem/SeleçaoDePerso.html?raw';
import CardsPasivaHtml from './Tela_Cards_e_Passivas/CardsEPassivas.html?raw';
import HUBHtml from './/Tela_Hub/HUB.html?raw';
import combateHtml from './Combate/Combate.html?raw';
import PopUpCombHtml from './Combate/PopUp_Do_Combate/PopUp.html?raw';

corpoDoSite.insertAdjacentHTML('beforeend', SelecaPersoHtml);
corpoDoSite.insertAdjacentHTML('beforeend', CardsPasivaHtml);
corpoDoSite.insertAdjacentHTML('beforeend', HUBHtml);
corpoDoSite.insertAdjacentHTML('beforeend', combateHtml);
corpoDoSite.insertAdjacentHTML('beforeend', PopUpCombHtml);

/*=======================================================*/
let PersonagemIndex = 0; 
window.PersonagemEscolhido = '';
const PersonagensInfos = {
	Personagens: ['Druida', 'WeaponMaster', 'SpiritMaster', 'Xamã'],
		
	Druida: { Lore: '', 
		Deck: ['Coelho', 'Sapo', 'Morcego', 'Cobra', 'Aranha', 'Sapo', 'SNatureza', 'SFortitude', 'SCura'] },
	
	WeaponMaster: { Lore: '', 
		Deck: ['Sword', 'Dagger', 'Spear', 'Bow', 'Wand','Broquel', 'Sharpen', 'Repair', 'Barragem'] },
	
	SpiritMaster: { Lore: '', Deck: [] },
	
	Xamã: { Lore: '', Deck: [] },
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
	
	const PBoxes2 = document.querySelectorAll('.SeleçãoIcone2');
	PBoxes2.forEach(Boxes => Boxes.classList.remove('SeleçãoIcone2'));
	PBoxes2.forEach(Boxes => Boxes.classList.add('SeleçãoIcone'));
	
	if(botao === 'avancar') 
	{
		if(PersonagemIndex < 3) {  PersonagemIndex++; }
		else if(PersonagemIndex == 3) { PersonagemIndex = 0; }
	}
	else if(botao === 'voltar') 
	{
		if(PersonagemIndex > 0) { --PersonagemIndex; }
		else if(PersonagemIndex == 0) { PersonagemIndex = 3; }
	} 
	else {
		if(PersonagemIndex == 2 || PersonagemIndex == 3){
			alert('Personagem em desenvolvimento, escolha outro')
		}
		else{
			PersonagemEscolhido = PersonagensInfos.Personagens[PersonagemIndex];
			window.montarDeck();
			window.mudarTela('TelaSkillsEPassivas');
		}
	}
	
	let PI = PersonagemIndex + 1;
	let DivIcon = document.getElementById(`seleçãoP${PI}`);
	DivIcon.className = 'SeleçãoIcone2';
	
	Personagem.innerText = PersonagensInfos.Personagens[PersonagemIndex];
}

window.montarDeck = function () {
	window.CardsPlayer = [];
	for(let i = 1; i < 10; i++){
		const CPosicao = document.getElementById(`${i}Carta`);
		CPosicao.style.backgroundImage = '';
	}
	if(PersonagensInfos[PersonagemEscolhido]){
		let index = 1;
		PersonagensInfos[PersonagemEscolhido].Deck.forEach((carta) => {
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