let numero; let colocaremCampo = "nao";
let CartaAserExcluida; let PopCorpotamento = "desativado";

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
window.AbrirPopPainel = function () {
  const POP = document.getElementById("PopPainelfundo");
  if (PopCorpotamento == "desativado") {
    POP.classList.remove("oculto");
    PopCorpotamento = "ativado";

  } else if (PopCorpotamento == "ativado") {
    POP.classList.add("oculto");
    PopCorpotamento = "desativado";
  }
}
window.montarDeck = function () {
  for (let index = 1; index < 10; index++) {
    const CPosicao = document.getElementById(`${index}Carta`);
    const indexCarta = window.Deck[index];
    const indexImagem = window.CentralImagensComFundo[indexCarta];

    CPosicao.style.backgroundImage = `url('${indexImagem}')`;
  }
}
window.MontarDeckEnimigo = function () {
  const numeroSorteados = [];

  while (numeroSorteados.length < 6) {
    const NRandom = Math.floor(Math.random() * 4);
    const ID = window.cartasEMaos[NRandom];
    const ImgCaminho = window.CentralImagens[ID];

    const PRandom = Math.floor(Math.random() * 9) + 1;
    if (!numeroSorteados.includes(PRandom)) {
      numeroSorteados.push(PRandom);
      const Pindex = PRandom - 1;
      tabuleiroPE[Pindex] = ID;
      const EnemyPosition = document.getElementById(`PosicaoT${PRandom}`);
      EnemyPosition.style.backgroundImage = `url('${ImgCaminho}')`;
    }
  }
  //console.log(tabuleiroPE);
}
window.perfilEmCampo = function(){
	const botaoClicado = event.currentTarget;
	let num = 1; let QualPerfies = "doBot";
	let PerfilLoop;
	const btnMobs = document.getElementById('trocaInimigo');
	const btnPlayer = document.getElementById('trocaPlayer');
	
  if (botaoClicado.id === "trocaPlayer")
	{ QualPerfies = "doPlayer"; 
		btnMobs.className = "DivsTrocar"
		btnPlayer.className = "DivsTrocar2" } 
	else if(botaoClicado.id == "trocaInimigo")
	{ QualPerfies = "doBot"; 
	btnMobs.className = "DivsTrocar2"
	btnPlayer.className = "DivsTrocar" }
	
	if(QualPerfies === "doBot") 
	{ PerfilLoop = tabuleiroPE;} 
	else if(QualPerfies === "doPlayer") 
	{ PerfilLoop = tabuleiroP; }

	const DivPerfilPai = document.getElementById("DivPerfies");
	DivPerfilPai.innerHTML = '';
	
	PerfilLoop.forEach(Perfil => {
  	if (Perfil !== '') {		
	    const BoxPerfilPai = document.createElement("div");
	    BoxPerfilPai.id = `BoxPerfilMob${num}`;
	    BoxPerfilPai.className = "boxPerfilMobs";
	    DivPerfilPai.appendChild(BoxPerfilPai);
	
	    const imgbox = document.createElement("div");
	    imgbox.id = `MobPimg${num}`;
			imgbox.className = "MobsIMG";
	    BoxPerfilPai.appendChild(imgbox);
	
	    const Namebox = document.createElement("div");
	    Namebox.id = `idbarnome${num}`;
			Namebox.className = "BarsName";
	    BoxPerfilPai.appendChild(Namebox);
	
	    const HPbox = document.createElement("div");
	    HPbox.id = `idbarHP${num}`;
			HPbox.className = "BarsHP";
			HPbox.innerText = "HP 10 / 10";
	    BoxPerfilPai.appendChild(HPbox);
	
	    let caminhoimg = CentralImagens[Perfil];
	    if (Namebox) Namebox.innerText = Perfil;
	    if (imgbox) imgbox.style.backgroundImage = `url('${caminhoimg}')`;
	    
	    num++;
		}
	});
}

window.CicloCartas = function () {
  const MaoPlayer = document.getElementById("RowPlayer");
  MaoPlayer.innerHTML = '';

  for (let i = 0; i < 4; i++) {
    const divCard = document.createElement("div");
    divCard.id = `SlotC${i}`;
    divCard.classList.add("CardsSlots", "imagemStyle");
    divCard.dataset.nome = window.cartasEMaos[i];

    let dataCard = divCard.dataset.nome;
    let caminhoIMG = window.CentralImagensComFundo[dataCard];

    if (caminhoIMG) {
      divCard.style.backgroundImage = `url('${caminhoIMG}')`;
    }

    divCard.onclick = function () {
      window.CardSelecionado(this.id);
    };

    MaoPlayer.appendChild(divCard);
  }
};
window.CardSelecionado = function (idCard) {
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
window.CardNoTabuleiro = function (CardPosition, Idslot) {
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

  if (colocaremCampo === "sim") {
    if (CartasEmcampo < 4) {
      let numeroint = +numero;
      let IdCardMao = cartasEMaos[numeroint];
      let caminhoIMG = window.CentralImagens[IdCardMao];

      let partes = Idslot.split("PosicaoTP");
      let IdBoxTabuleiro = partes[1];
      let indexPosition = +IdBoxTabuleiro - 1;
      tabuleiroP[indexPosition] = IdCardMao;

      slotTabuleiro.style.backgroundImage = `url('${caminhoIMG}')`;

      const divaApagar = CartaAserExcluida;

      if (divaApagar) {
        divaApagar.remove();
        CartaAserExcluida = '';
      }

      colocaremCampo = "nao";
    } else {
      console.log("Limite atingido");
    }
  } else {
    let partes = Idslot.split("PosicaoTP");
    let IdBoxTabuleiro = partes[1];
    let indexPosition = +IdBoxTabuleiro - 1;

    if (tabuleiroP[indexPosition] !== '') {
      window.AbrirPopPainel();
    } else {
      console.log("Selecionar uma carta");
    }
  }
	perfilEmCampo();
};