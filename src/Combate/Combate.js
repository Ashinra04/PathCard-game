let numero; let colocaremCampo = "nao";
let CartaAserExcluida; let PopCorpotamento = "desativado";
let abaAtivaPerfil = "doBot";
let btnAtk = "Atacar"; let IdentificadorUnico = '';

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
	},
	iconEfeitos: {
		'Poison': '/Imagens/EfeitosIcons/PoisonEfeito.png',
		'Burn': '/Imagens/EfeitosIcons/burnEfeito .png',
	}
}
window.DadosMobsCards = {
	IA: {
		'Goblin': { HPMax: 30, HPminimo: 23, dano: 6 },
		'GoblinArcher': { HPMax: 23, HPminimo: 18, dano: 6 },
	},
	Player: {
		'Morcego': { HPMax : 20, dano: 4 },
		'Lobo': { HPMax : 28, dano: 6 },
		'Urso': { HPMax : 35, dano: 8 },
		'Dragao': { HPMax : 60, dano: 10 },
	}
}

window.CartasEmCampoStatus = {
	IA: {
		PosicaoT1: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoT2: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoT3: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoT4: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoT5: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoT6: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoT7: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoT8: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoT9: { nome: '', HP: 0, HPMax: 0, Energia: 1 }
	},
	Player: {
		PosicaoTP1: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoTP2: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoTP3: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoTP4: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoTP5: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoTP6: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoTP7: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoTP8: { nome: '', HP: 0, HPMax: 0, Energia: 1 },
		PosicaoTP9: { nome: '', HP: 0, HPMax: 0, Energia: 1 }
	}
};
window.EfeitosTodosEmCampo = {
	Mob0: { 'Burn': 3, 'Poison': 2 },
}
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
         FUNÇÕES GERAIS
==========================================*/
/* Funcoes focadas na monstagem do baralho da Ia e das carats em mao do player */
window.AbrirPopPainel = function () {
  const POP = document.getElementById("PopPainelfundo");
  if (PopCorpotamento == "desativado") {
    POP.classList.remove("oculto");
    PopCorpotamento = "ativado";

  } else if (PopCorpotamento == "ativado") {
		
		if(btnAtk == 'Atacar') {
			POP.classList.add("oculto");
    	PopCorpotamento = "desativado";
		} else {
		
		}
    
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
			
			let Max = window.DadosMobsCards.IA[ID].HPMax;
			let Min = window.DadosMobsCards.IA[ID].HPminimo;
			let HPsorteado = Math.floor(Math.random() * (Max - Min)) + Min;

			let chavePosicao = `PosicaoT${PRandom}`;
		  window.CartasEmCampoStatus.IA[chavePosicao] = {
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

/* Função para atualizar os Hps de todos em campo */
window.AtualizarHPs = function() {
	for(let i = 1; i <= 9; i++) {
		const chavePosicao = document.getElementById(`PosicaoT${i}`);
		const indexPosicao = `PosicaoT${i}`;
		if(CartasEmCampoStatus.IA[indexPosicao].nome != '') {
			const dadosP = CartasEmCampoStatus.IA[indexPosicao];
			chavePosicao.innerText = ` HP:\n ${dadosP.HP}/ ${dadosP.HPMax}`;
		} else{
			chavePosicao.innerText = '';
		}
	}

	tabuleiroP.forEach((hpSlot, index) => {
		if (hpSlot !== '') {
		  const numPosicao = index + 1;
		  const indexPosicao = `PosicaoTP${numPosicao}`;
		  const chavePosicao = document.getElementById(indexPosicao);
		  const dadosP = CartasEmCampoStatus.Player[indexPosicao];
		
		  if (chavePosicao && dadosP) {
		    chavePosicao.innerText = ` HP:\n ${dadosP.HP}/ ${dadosP.HPMax}`;
		  }
		}
	});
}

/* Função que cria os perfies dos mobs em campo, criando suas fotos, hp e nomes */
window.perfilEmCampo = function(aba) {
  let num = 1; 
  let PerfilLoop;
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
        let statusMob = window.CartasEmCampoStatus.IA[chavePosicao];

        if (statusMob && statusMob.nome !== '') {
          stringHP = `HP ${statusMob.HP}/ ${statusMob.HPMax}`;
        }
      } else {
        let chavePosicao = `PosicaoTP${numeroDaPosicao}`;
        let statusMobP = window.CartasEmCampoStatus.Player[chavePosicao];

        if (statusMobP && statusMobP.nome !== '') {
          stringHP = `HP ${statusMobP.HP}/ ${statusMobP.HPMax}`;
        }
      }
			
      HPbox.innerText = stringHP;
      BoxPerfilPai.appendChild(HPbox);
      
      let caminhoimg = CentralImagens.ImagensSemFundo[Perfil];
      
      if (Namebox) {
        Namebox.innerText = Perfil.replace(/([A-Z])/g, ' $1').trim();
      }
      if (imgbox) imgbox.style.backgroundImage = `url('${caminhoimg}')`;
      
      num++;
    }
  });
};
/* função que cria as cartas da mao do player ao iniciar o combate */
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

/* função CardNoTabuleiro, serve para colcar a carta em campo e apagar ela da mão do palyer */
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
	const DisplayHP = document.getElementById("hptext");
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

			let IDslot = Idslot;
			let Identif = IdCardMao;
			let HP = DadosMobsCards.Player[Identif].HPMax;
			
			CartasEmCampoStatus.Player[IDslot] = {
			    nome: Identif,
			    HP: HP,
			    HPMax: HP,
			    Energia: 1
			};
			
			AtualizarHPs();

      slotTabuleiro.style.backgroundImage = `url('${caminhoIMG}')`;
			slotTabuleiro.dataset.IdUnico = `Mob${indexPosition}`;

      const divaApagar = CartaAserExcluida;

      if (divaApagar) {
        divaApagar.remove();
        CartaAserExcluida = '';
      }

      colocaremCampo = "nao";
    } else {
      console.log("Limite atingido");
    }
  } 
	else {
    let partes = Idslot.split("PosicaoTP");
    let IdBoxTabuleiro = partes[1];
    let indexPosition = +IdBoxTabuleiro - 1;
		let indexCarta = tabuleiroP[indexPosition];
		let dadosCarta = CentralImagens.ImagensComFundo[indexCarta];
		let indexImagem = dadosCarta ? dadosCarta.imagem : '';
		
    if (tabuleiroP[indexPosition] !== '') {		
			let IDslot = Idslot;
			let HPAtual = CartasEmCampoStatus.Player[IDslot].HP;
			let HPmaximo = CartasEmCampoStatus.Player[IDslot].HPMax;

			const dadosComFundo = CentralImagens.ImagensComFundo[indexCarta];
			
			if (dadosComFundo && dadosComFundo.imagem) {
			    DisplayImg.style.backgroundImage = `url('${dadosComFundo.imagem}')`;
			} else {
			    DisplayImg.style.backgroundImage = 'none';
			}
			
			DisplayNome.innerText = indexCarta;
			DisplayHP.innerText = ` HP: ${HPAtual}/ ${HPmaximo}`;

			DisplayTipo.innerText = (dadosComFundo && dadosComFundo.tipo) ? dadosComFundo.tipo : "Monstro";

			IdentificadorUnico = slotTabuleiro.dataset.IdUnico || "vazio";
			
			window.AbrirPopPainel();
    } else {
      console.log("Selecionar uma carta");
    }
  }
	perfilEmCampo();
};

/*======================================================
  FUNÇÕES DE AÇÕES COMO ATACAR, USAR SKILL E ITEMS E ETC
=======================================================*/
window.PlyerAtacar = function() {
	const BtnAtacar = document.getElementById('BtnAtk');
	if(BtnAtacar.innerText == 'Atacar') {
		BtnAtacar.innerText = 'Cancelar';
		btnAtk = BtnAtacar.innerText;
		BtnAtacar.classList.remove("btnsAcoes");
		BtnAtacar.classList.add("btnsAcoesATK");
	} else {
		BtnAtacar.innerText = 'Atacar';
		btnAtk = BtnAtacar.innerText;
		BtnAtacar.classList.remove("btnsAcoesATK");
		BtnAtacar.classList.add("btnsAcoes");
	}
}
window.PlyerDefender = function() {
	const BtnAtacar = document.getElementById('BtnAtk');
	if(btnAtk == 'Atacar') {
		alert('Pode defender');
	} else {
		
	}
}
window.PlyerItems = function(btn) {
	const divAcoes = document.getElementById('DivAcoes');
	const divPerfies = document.getElementById('SegundaRow');
	const divItems = document.getElementById('DivItems');
	
	if(btn == 'BtnItems') {
		divAcoes.classList.add('oculto');
		divPerfies.classList.add('oculto');
		divItems.classList.remove('oculto');
	} 
	else if(btn == 'BtnVoltarAcoes') {
		divAcoes.classList.remove('oculto');
		divPerfies.classList.remove('oculto');
		divItems.classList.add('oculto');
	}
}
window.PlyerStatus = function(btn) {
	const divAcoes = document.getElementById('DivAcoes');
	const divPerfies = document.getElementById('SegundaRow');
	const divEfeitos = document.getElementById('DivEfeitos');
	const BoxDeEfeitos = document.getElementById('BoxEfeitos');
	
	if(btn == 'BtnEfeitos') {
		divAcoes.classList.add('oculto');
		divPerfies.classList.add('oculto');
		divEfeitos.classList.remove('oculto');

		BoxDeEfeitos.innerHTML = '';
		let Ident = IdentificadorUnico;


		Object.keys(EfeitosTodosEmCampo[Ident] || {}).forEach(objetos =>{
			let efeitosNome = objetos; 

			const EfeitoBox = document.createElement("div");
			EfeitoBox.classList.add('divEfeitos');
			BoxDeEfeitos.appendChild(EfeitoBox);

			const EfeitoImg = document.createElement("div");
			let ImgCaminho = window.CentralImagens.iconEfeitos[efeitosNome];
			EfeitoImg.classList.add('EfeitosIcon', 'imagemStyle');
			EfeitoImg.innerText = EfeitosTodosEmCampo[Ident][efeitosNome];
			EfeitoImg.style.backgroundImage = `url('${ImgCaminho}')`;
			EfeitoBox.appendChild(EfeitoImg);

			const EfeitoDescricao = document.createElement("div");
			EfeitoDescricao.classList.add('EfeitosDescricao');
			EfeitoBox.appendChild(EfeitoDescricao);
		})
	} 
	else if(btn == 'BtnVoltarAcoes') {
		divAcoes.classList.remove('oculto');
		divPerfies.classList.remove('oculto');
		divEfeitos.classList.add('oculto');
	}
}