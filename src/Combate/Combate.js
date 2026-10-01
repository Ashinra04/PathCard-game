let numero; let colocaremCampo = "nao";
let CartaAserExcluida; let PopCorpotamento = "desativado";
let abaAtivaPerfil = "doBot";

/*=========================================
         OBJETOS 
==========================================*/
window.CentralImagens = {
	ImagensSemFundo: {
		'Urso': '/Imagens/CartasGlobais/UrsoBS.png',
  	'Dragao': '/Imagens/CartasGlobais/DragãoBS.png',
  	'Lobo': '/Imagens/CartasGlobais/WolfBS.png',
  	'Morcego': '/Imagens/CartasGlobais/BatBS.png',
  	'Goblin': '/Imagens/Mobs/GoblinCardBS.png',
		'GoblinArcher': '/Imagens/Mobs/GoblinArcherCard.png',
	},
	ImagensComFundo: {
		'Urso': { tipo: 'Besta', imagem: '/Imagens/Deck-Druida/BearCard.png' },
	  'Dragao': { tipo: 'Criatura', imagem: '/Imagens/Deck-Druida/DragonCard.png' },
	  'Lobo': { tipo: 'Besta', imagem: '/Imagens/Deck-Druida/WolfCard.png' },
	  'Morcego': { tipo: 'Besta', imagem: '/Imagens/Deck-Druida/BatCard.png' },
		'Goblin': { Posicao: '2 e 3 linha', imagem: '/Imagens/Mobs/GoblinCard.png' },
		'GoblinArcher': { Posicao: '1 e 2 linha', imagem: '/Imagens/Mobs/GoblinArcherCard.png' },
	}
}
window.dadosMobs = {
	'Goblin': { HPMax: 30, HPminimo: 23, dano: 6, def: 10,},
	'GoblinArcher': { HPMax: 23, HPminimo: 18, dano: 6, def: 10,},
}

window.CartasEmCampoStatus = {
	PosicaoT1: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
	PosicaoT2: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
	PosicaoT3: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
	PosicaoT4: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
	PosicaoT5: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
	PosicaoT6: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
	PosicaoT7: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
	PosicaoT8: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
	PosicaoT9: { nome: '', HP: 0, HPMax: 0, Energia: 1 }
};

window.DecksMobs = {
	Goblins: ['Goblin', 'GoblinArcher']
};
/*=========================================
         ARRAYS 
==========================================*/
window.Deck = ['Urso', 'Dragao', 'Lobo', 'Morcego', 'Urso', 'Dragao', 'Lobo', 'Morcego', 'Urso', 'Dragao'];
window.cartasEMaos = ['Urso', 'Dragao', 'Lobo', 'Morcego'];

window.tabuleiroP = ['', '', '', '', '', '', '', '', ''];
window.tabuleiroPE = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
]

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
    const indexImagem = window.CentralImagens.ImagensComFundo[indexCarta].imagem;

    CPosicao.style.backgroundImage = `url('${indexImagem}')`;
  }
}
window.MontarDeckEnimigo = function () {
  const numeroSorteados = [];
  let numeromaxSortear = DecksMobs['Goblins'].length;
	
  while (numeroSorteados.length < 6) {
    const NRandom = Math.floor(Math.random() * numeromaxSortear);
		
    let ID = DecksMobs['Goblins'][NRandom];
    const ImgCaminho = window.CentralImagens.ImagensSemFundo[ID];
    
    let PRandom = 0; 

    const monstroInfo = window.CentralImagens.ImagensComFundo[ID];

    if (monstroInfo && monstroInfo.Posicao === '2 e 3 linha') {
        PRandom = Math.floor(Math.random() * 6) + 4;
    } else if (monstroInfo && monstroInfo.Posicao === '1 e 2 linha') {
        PRandom = Math.floor(Math.random() * 6) + 1;
    } else {
        PRandom = Math.floor(Math.random() * 9) + 1;
    }
		
    if (!numeroSorteados.includes(PRandom)) {
      numeroSorteados.push(PRandom);
      const Pindex = PRandom - 1;

			let linha = Math.floor(Pindex / 3);
			let coluna = Pindex % 3;
			tabuleiroPE[linha][coluna] = ID; 
			
			let Max = window.dadosMobs[ID].HPMax;
			let Min = window.dadosMobs[ID].HPminimo;
			let HPsorteado = Math.floor(Math.random() * (Max - Min)) + Min;

			let chavePosicao = `PosicaoT${PRandom}`;
		  window.CartasEmCampoStatus[chavePosicao] = {
		    nome: ID,
		    HP: HPsorteado,
		    HPMax: HPsorteado,
		    Energia: 1
		  };
			
      const EnemyPosition = document.getElementById(`PosicaoT${PRandom}`);
			
      if (EnemyPosition) {
        EnemyPosition.style.backgroundImage = `url('${ImgCaminho}')`;
      } else {
        console.error(`Erro: O elemento HTML com ID 'PosicaoT${PRandom}' não foi encontrado na tela.`);
      }
    }
  }
	AtualizarHPs();
}
window.AtualizarHPs = function() {
	for(let i = 1; i <= 9; i++) {
		const chavePosicao = document.getElementById(`PosicaoT${i}`);
		const indexPosicao = `PosicaoT${i}`;
		if(CartasEmCampoStatus[indexPosicao].nome != '') {
			const dadosP = CartasEmCampoStatus[indexPosicao];
			chavePosicao.innerText = ` HP:\n ${dadosP.HP}/ ${dadosP.HPMax}`;
		} else{
			chavePosicao.innerText = '';
		}
	}
}

window.perfilEmCampo = function(aba) {
	let num = 1; let PerfilLoop;
  const btnMobs = document.getElementById('trocaInimigo');
  const btnPlayer = document.getElementById('trocaPlayer');
  const DivPerfilPai = document.getElementById("DivPerfies");
  DivPerfilPai.innerHTML = '';
	
  if (aba === 'doPlayer' || aba === 'doBot') {
    abaAtivaPerfil = aba;
  }
	
  if (abaAtivaPerfil === "doPlayer") { 
    btnMobs.className = "DivsTrocar";
    btnPlayer.className = "DivsTrocar2"; 
    PerfilLoop = tabuleiroP;
  } else { 
    btnMobs.className = "DivsTrocar2";
    btnPlayer.className = "DivsTrocar"; 
  	PerfilLoop = tabuleiroPE.flat();
  }
	
  PerfilLoop.forEach((Perfil, index) => {
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

			let numeroDaPosicao = index + 1;
      let stringHP = "HP 10/ 10";

      if (abaAtivaPerfil === "doBot") {
        let chavePosicao = `PosicaoT${numeroDaPosicao}`;
        let statusMob = window.CartasEmCampoStatus[chavePosicao];

        if (statusMob && statusMob.nome !== '') {
          stringHP = `HP ${statusMob.HP}/ ${statusMob.HPMax}`;
        }
      } else {
        //lógica para o HP do Player, aqui!
        stringHP = "HP 10/ 10"; 
      }
      HPbox.innerText = stringHP;
      BoxPerfilPai.appendChild(HPbox);
			
      let caminhoimg = CentralImagens.ImagensSemFundo[Perfil];
			
			if (Namebox) {
        Namebox.innerText = Perfil.replace(/([A-Z])/g, ' \$1').trim();
			}
      if (imgbox) imgbox.style.backgroundImage = `url('${caminhoimg}')`;
      
      num++;
    }
  });
};
window.CicloCartas = function () {
  const MaoPlayer = document.getElementById("RowPlayer");
  MaoPlayer.innerHTML = '';

  for (let i = 0; i < 4; i++) {
    const divCard = document.createElement("div");
    divCard.id = `SlotC${i}`;
    divCard.classList.add("CardsSlots", "imagemStyle");
    divCard.dataset.nome = window.cartasEMaos[i];

    let dataCard = divCard.dataset.nome;
    let caminhoIMG = window.CentralImagens.ImagensComFundo[dataCard].imagem;

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
	const DisplayImg = document.getElementById("BoxImg");
	const DisplayNome = document.getElementById("RowNome");
	const DisplayTipo = document.getElementById("RowTipo");
	//const DisplayHP = document.getElementById("hptext");
	//const DisplayEnergia = document.getElementById("Energiatext");

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
      let caminhoIMG = window.CentralImagens.ImagensSemFundo[IdCardMao];

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
		let indexCarta = tabuleiroP[indexPosition];
		let indexImagem = CentralImagens.ImagensComFundo[indexCarta].imagem;
		
    if (tabuleiroP[indexPosition] !== '') {		
			DisplayImg.style.backgroundImage = `url('${indexImagem}')`;
			DisplayNome.innerText = indexCarta;
			DisplayTipo.innerText = CentralImagens.ImagensComFundo[indexCarta].tipo;
			window.AbrirPopPainel();
    } else {
      console.log("Selecionar uma carta");
    }
  }
	perfilEmCampo();
};