// Combate.js
import { CentralImagens, DadosMobsCards, CentralSkills, CartasEmCampoStatus, EfeitosTodosEmCampo } from './BancoDeImagens.js';
import { PlyerAtacar, PlyerDefender, PlyerSkills, PlyerItems, PlyerStatus, controleEnergia } from './PlayerAcoes/PlayerAcoes.js';
import { state } from './VariaviesList/Variaveis.js';

let numero;
let colocaremCampo = "nao";
let CartaAserExcluida;
let cartaSelecionada = '';
let abaAtivaPerfil = "doBot";
let Turnos = 1;

/*=========================================
		 OBJETOS 
==========================================*/
window.DecksMobs = {
	Goblins: ['GoblinGuerreiro', 'GoblinArcher', 'GoblinLancer', 'GoblinMage']
};
/*=========================================
		 ARRAYS 
==========================================*/
window.cartasEMaos = ['Coelho', 'Sapo', 'Lobo', 'Morcego'];
window.tabuleiroP = ['', '', '', '', '', '', '', '', ''];
window.tabuleiroPE = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];

/*=========================================
		FUNÇÕES DE ANIMACOES
==========================================*/
window.AnimacaoChacoalhar = function (div) {
	let DivAnimar = document.getElementById(div);
	DivAnimar.style.animation = 'chacoalhar 0.5s linear';

	setTimeout(() => {
		DivAnimar.style.animation = '';
	}, 500);
}
window.AnimacaoAtacar = function (div) {
	let DivAnimar = document.getElementById(div);
	DivAnimar.style.animation = 'IAatacar 0.5s linear';

	setTimeout(() => {
		DivAnimar.style.animation = '';
	}, 500);
}
window.AnimacaoAtacarPlyr = function (div) {
	let DivAnimar = document.getElementById(div);
	DivAnimar.style.animation = 'PlyerAtacar 0.5s linear';

	setTimeout(() => {
		DivAnimar.style.animation = '';
	}, 500);
}

/*=========================================
		 FUNÇÕES GERAIS
==========================================*/
/* Funcoes focadas na montagem do baralho da Ia e das cartas em mao do player */
window.AbrirPopPainel = function (PopCorpotamento) {
	const POP = document.getElementById("PopPainelfundo");
	const BtnAtacar = document.getElementById('BtnAtk');

	if (PopCorpotamento == "Mostrar") {
		POP.classList.remove("oculto");
	}
	else if (PopCorpotamento == "Esconder") {
		POP.classList.add("oculto");
		BtnAtacar.innerText = 'Atacar';
		state.btnAtk = 'Atacar';
		BtnAtacar.classList.remove("btnsAcoesATK");
		BtnAtacar.classList.add("btnsAcoes");
	}
}
window.MontarDeckEnimigo = function () {
	const numeroSorteados = [];
	const categoriaSorteados = [];
	let numeromaxSortear = DecksMobs['Goblins'].length;
	tabuleiroPE = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];

	while (numeroSorteados.length < 6) {
		const NRandom = Math.floor(Math.random() * numeromaxSortear);
		let ID = DecksMobs['Goblins'][NRandom];
		const ImgCaminho = CentralImagens.ImagensSemFundo[ID];

		const monstroInfo = DadosMobsCards.IA[ID];
		let posicoesPermitidas = monstroInfo.Posicao;

		let linhaEscolhida = posicoesPermitidas[Math.floor(Math.random() * posicoesPermitidas.length)];
		let minSlot = (linhaEscolhida - 1) * 3 + 1;
		let maxSlot = minSlot + 2;

		let PRandom = Math.floor(Math.random() * (maxSlot - minSlot + 1)) + minSlot;

		if (!numeroSorteados.includes(PRandom)) {
			numeroSorteados.push(PRandom);
			let Pindex = PRandom - 1;

			let linha = Math.floor(Pindex / 3);
			let coluna = Pindex % 3;
			tabuleiroPE[linha][coluna] = ID;

			let Max = DadosMobsCards.IA[ID].HPMax;
			let Min = DadosMobsCards.IA[ID].HPminimo;
			let HPsorteado = Math.floor(Math.random() * (Max - Min)) + Min;

			let chavePosicao = `PosicaoT${PRandom}`;
			CartasEmCampoStatus.IA[chavePosicao] = {
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

window.AtualizarHPs = function () {
	/* Função para atualizar os Hps de todos em campo */
	/* Parte dos Mobs da Ia*/
	for (let i = 1; i <= 9; i++) {
		const chavePosicao = document.getElementById(`PosicaoT${i}`);
		const indexPosicao = `PosicaoT${i}`;
		if (CartasEmCampoStatus.IA[indexPosicao].nome != '') {
			const dadosP = CartasEmCampoStatus.IA[indexPosicao];
			chavePosicao.innerText = ` HP:\n ${dadosP.HP}/ ${dadosP.HPMax}`;
		} else {
			chavePosicao.innerText = '';
		}
	}

	/*Parte das cartas do Player*/
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
window.perfilEmCampo = function (aba) {
	/* Função que cria os perfies dos mobs em campo no pop, criando suas fotos, hp e nomes */
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
			BoxPerfilPai.dataset.nome = index;

			if (state.btnAtk == 'Cancelar' || state.skillAtivado == 'sim') {
				if (abaAtivaPerfil === "doBot") {
					BoxPerfilPai.style.border = "1.5px solid #C2C18A";
				}
			}

			DivPerfilPai.appendChild(BoxPerfilPai);

			if (state.skillAtivado == 'sim') {
				BoxPerfilPai.onclick = function (e) {
					PlyerSkills(this);
				}
			}
			else {
				BoxPerfilPai.onclick = function (e) {
					PlyerAtacar(e);
				}
			}

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
				let statusMob = CartasEmCampoStatus.IA[chavePosicao];

				if (statusMob && statusMob.nome !== '') {
					stringHP = `HP ${statusMob.HP}/ ${statusMob.HPMax}`;
				}
			} else {
				let chavePosicao = `PosicaoTP${numeroDaPosicao}`;

				let statusMobP = CartasEmCampoStatus.Player[chavePosicao];

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
window.CicloCartas = function () {
	/* função que cria as cartas da mao do player ao iniciar o combate */
	const CartasASortear = [...CardsPlayer];
	const MaoPlayer = document.getElementById("RowPlayer");
	MaoPlayer.innerHTML = '';
	cartasEMaos.length = 0;

	for (let i = 0; i < 4; i++) {
		const divCard = document.createElement("div");
		divCard.id = `SlotC${i}`;
		divCard.classList.add("CardsSlots", "imagemStyle");

		const indiceSorteado = Math.floor(Math.random() * CartasASortear.length);
		const CardSelecionado = CartasASortear.splice(indiceSorteado, 1)[0];

		if (CardSelecionado) {
			cartasEMaos.push(CardSelecionado)
		}

		divCard.dataset.nome = CardSelecionado;
		let dataCard = divCard.dataset.nome;
		let caminhoIMG = window.CentralImgCardsCF.ImagensComFundo[dataCard];

		if (caminhoIMG) {
			divCard.style.backgroundImage = `url('${caminhoIMG}')`;
		}

		divCard.onclick = function () {
			window.CardSelecionado(this.id);
		};

		MaoPlayer.appendChild(divCard);
	}
};

/* função CardNoTabuleiro, serve para colcar a carta em campo e apagar ela da mão do player */
window.CardSelecionado = function (idCard) {
	const AllCards = document.querySelectorAll('#RowPlayer .CardsSlots');
	AllCards.forEach(card => card.classList.remove('CardSelecionado'));

	const CardAtual = document.getElementById(idCard);
	CartaAserExcluida = CardAtual;
	if (cartaSelecionada == '' || cartaSelecionada !== idCard) {
		if (CardAtual) {
			CardAtual.classList.add('CardSelecionado');
			cartaSelecionada = idCard;
			let partes = idCard.split("SlotC");
			numero = partes[1];
			colocaremCampo = "sim";
		}
		else {
			console.error("Carta " + idCard + " não foi encontrada!");
			return;
		}
	}
	else if (cartaSelecionada === idCard) {
		CardAtual.classList.remove('CardSelecionado');
		colocaremCampo = "nao"
		cartaSelecionada = '';
	}
};

window.CardNoTabuleiro = function (CardPosition, Idslot) {
	let slotTabuleiro = CardPosition;

	/*passar a posicao da carta para a funcao atacarPlayer*/
	state.CartaEscolhida = Idslot;

	let ExisteMsm = Idslot.split("PosicaoTP");
	let NumVer = ExisteMsm[1];
	let Verificar = NumVer - 1;

	/* Parte de cima do pop onde fica a infos da carta do player selecionada */
	const DisplayImg = document.getElementById("BoxImg");
	const DisplayNome = document.getElementById("RowNome");
	const DisplayTipo = document.getElementById("RowTipo");
	const DisplayHP = document.getElementById("hptext");
	const DisplayEfeitos = document.getElementById("RowEfeitos");
	DisplayEfeitos.innerHTML = '';

	if (!CardPosition) {
		console.error("O slot do tabuleiro não foi passado para a função!");
		return;
	}
	if (numero === undefined || numero === null) {
		console.warn("Nenhuma carta foi selecionada ainda!");
		return;
	}

	const CartasEmcampo = tabuleiroP.filter(slot => slot !== '').length;

	if (colocaremCampo === "sim" && tabuleiroP[Verificar] == '') {
		if (CartasEmcampo < 4) {
			let numeroint = +numero;
			let IdCardMao = cartasEMaos[numeroint];
			let caminhoIMG = CentralImagens.ImagensSemFundo[IdCardMao];

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

			if (caminhoIMG) {
				slotTabuleiro.style.backgroundImage = `url('${caminhoIMG}')`;
			}

			slotTabuleiro.dataset.IdUnico = `Mob${indexPosition}`;

			const divaApagar = CartaAserExcluida;

			if (divaApagar) {
				divaApagar.remove();
				CartaAserExcluida = '';
			}
			cartaSelecionada = '';
			colocaremCampo = "nao";
		} else {
			console.log("Limite atingido");
		}
	}
	else if (colocaremCampo === "nao") {
		let partes = Idslot.split("PosicaoTP");
		let IdBoxTabuleiro = partes[1];
		let indexPosition = +IdBoxTabuleiro - 1;
		let indexCarta = tabuleiroP[indexPosition];

		if (tabuleiroP[indexPosition] !== '') {
			let IDslot = Idslot;
			let HPAtual = CartasEmCampoStatus.Player[IDslot].HP;
			let HPmaximo = CartasEmCampoStatus.Player[IDslot].HPMax;

			const CaminhoImg = CentralImgCardsCF.ImagensComFundo[indexCarta];

			if (CaminhoImg) {
				DisplayImg.style.backgroundImage = `url('${CaminhoImg}')`;
			} else {
				DisplayImg.style.backgroundImage = 'none';
			}

			DisplayNome.innerText = indexCarta;
			state.cartaAtual = indexCarta;
			DisplayHP.innerText = ` HP: ${HPAtual}/ ${HPmaximo}`;

			DisplayTipo.innerText = "Monstro";

			state.IdentificadorUnico = slotTabuleiro.dataset.IdUnico || "vazio";

			Object.keys(EfeitosTodosEmCampo.Player[state.IdentificadorUnico] || {}).forEach(objetos => {
				let EfeitoNome = objetos;
				const EfeitoBox = document.createElement("div");
				let ImgEfeito = CentralImagens.iconEfeitos[EfeitoNome];

				EfeitoBox.classList.add('BoxsEfeitos', 'imagemStyle');
				EfeitoBox.style.backgroundImage = `url('${ImgEfeito}')`;
				DisplayEfeitos.appendChild(EfeitoBox);
			})

			window.AbrirPopPainel('Mostrar');
		} else {
			console.log("Selecionar uma carta");
		}
	}
	perfilEmCampo();
};

/*======================================================
  FUNÇÕES DE VERIFICAÇÃO COMO MORTE DE ALGUMA CARTA, ETC.
=======================================================*/
window.verificarMorte = function (CartaAlvo) {
	let MobDeletar = CartaAlvo;
	const PosicaoNoTabuleiro = document.getElementById(MobDeletar);
	PosicaoNoTabuleiro.style.backgroundImage = '';
	CartasEmCampoStatus.IA[CartaAlvo].nome = '';
	CartasEmCampoStatus.IA[CartaAlvo].HP = 0;
	CartasEmCampoStatus.IA[CartaAlvo].HPMax = 0;
	CartasEmCampoStatus.IA[CartaAlvo].Energia = 0;

	let partes = MobDeletar.split("PosicaoT");
	let Numero = partes[1];
	let Index = Numero - 1;

	let linha = Math.floor(Index / 3);
	let coluna = Index % 3;
	tabuleiroPE[linha][coluna] = '';

	const matrizEstaVazia = tabuleiroPE.every(linha =>
		linha.every(slot => slot === '')
	);

	if (matrizEstaVazia) {
		terminarCombateAtual();
	}
}
window.terminarCombateAtual = function () {
	alert('Cabou o Combate');

	AbrirPopPainel('Esconder');
	tabuleiroP.fill('');
	mudarTela('TelaPrincipal')
}
window.EncerrarTurno = function () {
	AcoesIA();
}
window.VerificarTurnos = function (Vez) {
	let VezdeQuem;
	const DivTurno = document.getElementById('BoxTurno');

	if (Vez == 'IA') {
		VezdeQuem = 'IA';
		Turnos++;
	}
	else {
		VezdeQuem = 'Player';
		controleEnergia('resetar');
	}
	DivTurno.innerText = `Turno: ${VezdeQuem}`;
}
window.AcoesIA = async function () {
	let VerifCartaPemCampo = 0;
	VerificarTurnos('IA');

	tabuleiroP.forEach(nome => {
		if (nome !== '') {
			VerifCartaPemCampo = VerifCartaPemCampo + 1;
		}
	})

	if (VerifCartaPemCampo > 0) {
		const MobsList = tabuleiroPE.flat();
		let MobAgindo;

		for (let index = 0; index < MobsList.length; index++) {
			let Num = index + 1;
			MobAgindo = `PosicaoT${Num}`;

			if (CartasEmCampoStatus.IA[MobAgindo].nome != '') {

				let cartaAtualMob = CartasEmCampoStatus.IA[MobAgindo].nome;
				let MobInfos = DadosMobsCards.IA[cartaAtualMob].categoria;

				let AlvosValidos = [];

				if (MobInfos === 'ranged') {
					for (let i = 0; i < tabuleiroP.length; i++) {
						if (tabuleiroP[i] != '') {
							AlvosValidos.push(i + 1);
						}
					}
				} else {
					let frontRow = [1, 2, 3].filter(slotNum => tabuleiroP[slotNum - 1] !== '');
					let middleRow = [4, 5, 6].filter(slotNum => tabuleiroP[slotNum - 1] !== '');
					let backRow = [7, 8, 9].filter(slotNum => tabuleiroP[slotNum - 1] !== '');

					if (frontRow.length > 0) {
						AlvosValidos = frontRow;
					} else if (middleRow.length > 0) {
						AlvosValidos = middleRow;
					} else {
						AlvosValidos = backRow;
					}
				}

				if (AlvosValidos.length === 0) {
					break;
				}

				AnimacaoAtacar(MobAgindo);

				const numSortear = AlvosValidos.length;
				let NRandom = Math.floor(Math.random() * numSortear);
				let NumVerificado = AlvosValidos[NRandom];

				let PPlayer = `PosicaoTP${NumVerificado}`;

				await new Promise(resolve => setTimeout(resolve, 300));
				AnimacaoChacoalhar(PPlayer);

				let danoAplicar = DadosMobsCards.IA[cartaAtualMob].dano;
				let HPlayer = CartasEmCampoStatus.Player[PPlayer].HP;

				CartasEmCampoStatus.Player[PPlayer].HP = HPlayer - danoAplicar;
				const DivT = document.getElementById(PPlayer);

				if (CartasEmCampoStatus.Player[PPlayer].HP <= 0) {
					CartasEmCampoStatus.Player[PPlayer].HP = 0;
					CartasEmCampoStatus.Player[PPlayer].nome = '';
					CartasEmCampoStatus.Player[PPlayer].HPMax = 0;
					CartasEmCampoStatus.Player[PPlayer].Energia = 1;

					let posicao = NumVerificado - 1;
					tabuleiroP[posicao] = '';

					AtualizarHPs();

					DivT.innerText = '';
					DivT.style.backgroundImage = `url('')`;
				}
				else {
					AtualizarHPs();
				}

				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		}
	} else {
		console.log('Campo vazio')
	}

	VerificarTurnos('Player');
}