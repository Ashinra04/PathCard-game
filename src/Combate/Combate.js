let numero; let colocaremCampo = "nao"; 
let CartaAserExcluida;

/*=========================================
         OBJETOS 
==========================================*/
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
window.Deck = ['Urso', 'Dragao', 'Lobo', 'Morcego', 'Urso', 'Dragao', 'Lobo', 'Morcego', 'Urso', 'Dragao'];
window.cartasEMaos = ['Urso', 'Dragao', 'Lobo', 'Morcego'];
window.tabuleiroP = ['', '', '', '', '', '', '', '', ''];
window.tabuleiroPE = ['', '', '', '', '', '', '', '', ''];

/*=========================================
         FUNÇÕES 
==========================================*/
window.montarDeck = function() {
	for (let index = 1; index < 10; index++) {
		const CPosicao = document.getElementById(`${index}Carta`);
		const indexCarta = window.Deck[index];
		const indexImagem = window.CentralImagensComFundo[indexCarta];
		
		CPosicao.style.backgroundImage = `url('${indexImagem}')`;
	}
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
window.MontarDeckEnimigo = function() {
	const numeroSorteados = [];
	
	while(numeroSorteados.length < 6) {
		const NRandom = Math.floor(Math.random() * 4);
		const ID = window.cartasEMaos[NRandom];
		const ImgCaminho = window.CentralImagens[ID];
		
		const PRandom = Math.floor(Math.random() * 9) + 1;
		if(!numeroSorteados.includes(PRandom)) {
			numeroSorteados.push(PRandom);
			const Pindex = PRandom - 1;
			tabuleiroPE[Pindex] = ID;
			const EnemyPosition = document.getElementById(`PosicaoT${PRandom}`);
			EnemyPosition.style.backgroundImage = `url('${ImgCaminho}')`;
		}
	}
	console.log(tabuleiroPE);
}