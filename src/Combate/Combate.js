let numero; let colocaremCampo = "nao"; 
let CartaAserExcluida;

/*=========================================
         OBJETOS 
==========================================*/
window.Deck = {
	'1Carta': '/Imagens/Deck-Druida/BearCard.png',
	'2Carta': '/Imagens/Deck-Druida/DragonCard.png',
	'3Carta': '/Imagens/Deck-Druida/BearCard.png',
	'4Carta': '/Imagens/Deck-Druida/DragonCard.png',
	'5Carta': '/Imagens/Deck-Druida/BearCard.png',
	'6Carta': '/Imagens/Deck-Druida/DragonCard.png',
	'7Carta': '/Imagens/Deck-Druida/BearCard.png',
	'8Carta': '/Imagens/Deck-Druida/DragonCard.png',
	'9Carta': '/Imagens/Deck-Druida/DragonCard.png'
};
window.CentralImagens = {
	'Urso': '/Imagens/CartasGlobais/UrsoBS.png',
	'Dragao': '/Imagens/CartasGlobais/DragãoBS.png',
	'Lobo': '/Imagens/CartasGlobais/WolfBS.png',
	'Morcego': '/Imagens/CartasGlobais/BatBS.png'
}
window.CentralImagensComFundo = {
	'Urso': '/Imagens/Deck-Druida/BearCard.png',
	'Dragao': '/Imagens/Deck-Druida/DragonCard.png',
	'Lobo': '/Imagens/Deck-Druida/WolfCard.png',
	'Morcego': '/Imagens/Deck-Druida/BatCard.png'
}
/*=========================================
         ARRAYS 
==========================================*/
window.cartasEMaos = ['Urso', 'Dragao', 'Lobo', 'Morcego'];
window.tabuleiroP = ['', '', '', '', '', '']

/*=========================================
         FUNÇÕES 
==========================================*/
window.montarDeck = function() {
	const DeckP = window.Deck;

	for (let index = 1; index < 10; index++) {
		const CPosicao = document.getElementById(`${index}Carta`);
		const IndexImagem = window.Deck[`${index}Carta`];
		
		CPosicao.style.backgroundImage = `url('${IndexImagem}')`;
	}
	
	/*DeckP.forEach(carta => {
		const Position;
	})*/
}
window.CicloCartas = function() {
  const MaoPlayer = document.getElementById("RowPlayer");
  MaoPlayer.innerHTML = '';
  
  for(let i = 0; i < 4; i++) {
    const divCard = document.createElement("div");
    divCard.id = `SlotC${i}`;
    divCard.classList.add("CardsSlots", "imagemStyle");
    divCard.dataset.nome = window.cartasEMaos[i];
    
    let dataCard = divCard.dataset.nome;
    let caminhoIMG = window.CentralImagensComFundo[dataCard];
    
    if (caminhoIMG) {
      divCard.style.backgroundImage = `url('${caminhoIMG}')`;
    }
    
    divCard.onclick = function() {
      window.CardSelecionado(this.id);
    };
    
    MaoPlayer.appendChild(divCard);
  }
};
window.CardSelecionado = function(idCard) {
  const AllCards = document.querySelectorAll('#RowPlayer .CardsSlots');
  AllCards.forEach(card => card.classList.remove('CardSelecionado'));

  const CardAtual = document.getElementById(idCard);
	CartaAserExcluida = CardAtual;
  if (CardAtual) {
    CardAtual.classList.add('CardSelecionado');
  } else {
    console.error("Carta " + idCard + " não foi encontrada!");
    return;
  }

  let partes = idCard.split("SlotC");
  numero = partes[1];
  colocaremCampo = "sim";
};
window.CardNoTabuleiro = function(CardPosition, Idslot) {
  let slotTabuleiro = CardPosition;
  
  if (!CardPosition) {
    console.error("O slot do tabuleiro não foi passado para a função!");
    return;
  }
  if (numero === undefined || numero === null) {
    console.warn("Nenhuma carta foi selecionada ainda!");
    return;
  }
    
  const CartasEmcampo = tabuleiroP.filter(slot => slot !== '').length;

  if(colocaremCampo === "sim") {
    if(CartasEmcampo < 4) {
      let numeroint = +numero; 
      let IdCardMao = cartasEMaos[numeroint];
      let caminhoIMG = window.CentralImagens[IdCardMao];
      
      let partes = Idslot.split("PosicaoTP");
      let IdBoxTabuleiro = partes[1];
      let indexPosition = +IdBoxTabuleiro - 1;
      tabuleiroP[indexPosition] = IdCardMao;
			
      slotTabuleiro.style.backgroundImage = `url('${caminhoIMG}')`;
			
			const divaApagar = CartaAserExcluida;
			
			if(divaApagar){
				divaApagar.remove();
				CartaAserExcluida = '';
			}
			
      colocaremCampo = "nao";
    } else {
      console.log("Limite atingido");
    }
  } else {
    console.log("Selecione uma carta primeiro");
  }
};
