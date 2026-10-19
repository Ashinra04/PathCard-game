// bancoDeImagens.js

export const CentralImgCardsCF = {
	ImagensComFundo: {
		'Urso': '/Imagens/Deck-Druida/BearCard.png',
		'Dragao': '/Imagens/Deck-Druida/DragonCard.png',
		'Lobo': '/Imagens/Deck-Druida/WolfCard.png',
		'Morcego': '/Imagens/Deck-Druida/BatCard.png',
		'Sapo': '/Imagens/Deck-Druida/FrogCard.png',
		'Cobra': '/Imagens/Deck-Druida/SnakeCard.png',
		'Escorpiao': '/Imagens/Deck-Druida/ScorpionCard.png',
		'Aranha': '/Imagens/Deck-Druida/SpiderCard.png',
		'Coelho': '/Imagens/Deck-Druida/CoelhoCard.png',

		'SFortitude': '/Imagens/Deck-Druida/SymFortitude.png',
		'SCura': '/Imagens/Deck-Druida/SymHeal.png',
		'SNatureza': '/Imagens/Deck-Druida/SymNature.png',

		'Sword': '/Imagens/Deck-WM/SwordCard.png',
		'Dagger': '/Imagens/Deck-WM/DaggerCard.png',
		'Spear': '/Imagens/Deck-WM/SpearCard.png',
		'Katana': '/Imagens/Deck-WM/KatanaCard.png',

		'Wand': '/Imagens/Deck-WM/WandCard.png',
		'Bow': '/Imagens/Deck-WM/BowCard.png',

		'Broquel': '/Imagens/Deck-WM/BroquelCard.png',
		'Shield': '/Imagens/Deck-WM/ShieldCard.png',

		'Sharpen': '/Imagens/Deck-WM/BfAfiarCard.png',
		'Repair': '/Imagens/Deck-WM/BfRepararCard.png',
		'Barragem': '/Imagens/Deck-WM/BfBarragemCard.png',
	}
}
export const CentralImagens = {
	ImagensSemFundo: {
		'Urso': '/Imagens/CartasGlobais/UrsoBS.png',
		'Dragao': '/Imagens/CartasGlobais/DragãoBS.png',
		'Lobo': '/Imagens/CartasGlobais/WolfBS.png',
		'Morcego': '/Imagens/CartasGlobais/BatBS.png',
		'Sapo': '/Imagens/CartasGlobais/FrogBS.png',
		'Cobra': '/Imagens/CartasGlobais/SnakeBS.png',
		'Escorpiao': '/Imagens/Deck-Druida/ScorpionBS.png',
		'Aranha': '/Imagens/CartasGlobais/SpiderBS.png',
		'Coelho': '/Imagens/CartasGlobais/RabbitBS.png',

		'Sword': '/Imagens/Deck-WM/SwordCard.png',
		'Dagger': '/Imagens/Deck-WM/DaggerCard.png',
		'Lance': '/Imagens/Deck-WM/LanceCard.png',
		'Bow': '/Imagens/Deck-WM/BowCard.png',
		'Broquel': '/Imagens/Deck-WM/BroquelCard.png',
		'Shield': '/Imagens/Deck-WM/ShieldCard.png',
		'Katana': '/Imagens/Deck-WM/KatanaCard.png',

		'GoblinGuerreiro': '/Imagens/Mobs/GoblinGuerreiro.png',
		'GoblinArcher': '/Imagens/Mobs/GoblinArcher.png',
		'GoblinMage': '/Imagens/Mobs/GoblinMage.png',
		'GoblinLancer': '/Imagens/Mobs/GoblinLancer.png',
	},
	iconEfeitos: {
		'Poison': '/Imagens/EfeitosIcons/PoisonEfeito.png',
		'Burn': '/Imagens/EfeitosIcons/burnEfeito.png',
		'Protecao': '/Imagens/EfeitosIcons/ProteçãoEfeito.png'
	}
};

window.CardsPlayer = []

export const CentralSkills = {
	'Bite':
		{ dano: 4, tier: 2, custo: 1, descricao: 'Uma mordida que causa dano  baixo' },

	'bater de asas':
		{ dano: 6, tier: 1, custo: 0, descricao: 'Ao bater as asas gera rajadas de vento que causa dano medio' },

	'Ventania':
		{ dano: 8, tier: 2, custo: 2, descricao: 'Um tornado que desvasta tudo pela frentez que causa dano alto' },

	'Mordida Sangrenta':
		{ dano: 8, tier: 3, custo: 0, descricao: 'Uma mordida tão forte que faz seu alvo sangrar, causando sangramento no alvo' },

	'Crunch':
		{ dano: 5, tier: 2, custo: 0, descricao: 'Uma mordida muito forte no alvo que causa dano medio' },

	'Arranhada':
		{ dano: 3, tier: 1, custo: 0, descricao: 'o usuário areanha seu alvo, tendo uma chance de causa sangramento no alvo' },

	'Lança Chamas':
		{ dano: 10, tier: 3, custo: 3, descricao: 'Uma rajada forte de dano que causa burn, além de causar dano massivo no seu alvo' },
}
export const DadosMobsCards = {
	IA: {
		'GoblinGuerreiro': { HPMax: 30, HPminimo: 23, dano: 3, Posicao: [3], categoria: 'meele' },
		'GoblinArcher': { HPMax: 20, HPminimo: 17, dano: 6, Posicao: [1], categoria: 'ranged' },
		'GoblinMage': { HPMax: 15, HPminimo: 13, dano: 9, Posicao: [1], categoria: 'ranged' },
		'GoblinLancer': { HPMax: 25, HPminimo: 22, dano: 4, Posicao: [2], categoria: 'meele' },
	},
	Player: {
		'Morcego': {
			HPMax: 15, dano: 4, tipo: 'Mob',
			skills: ['Bite', 'bater de asas', 'Ventania']
		},

		'Lobo': {
			HPMax: 20, dano: 6, tipo: 'Mob',
			skills: ['Bite', 'Mordida Sangrenta']
		},

		'Urso': {
			HPMax: 28, dano: 8, tipo: 'Mob',
			skills: ['Crunch', 'Arranhada']
		},

		'Dragao': {
			HPMax: 40, dano: 10, tipo: 'Mob',
			skills: ['Crunch', 'Lança Chamas']
		},

		'Sapo': {
			HPMax: 18, dano: 10, tipo: 'Mob',
			skills: ['Crunch', 'Lança Chamas']
		},

		'Cobra': {
			HPMax: 18, dano: 10, tipo: 'Mob',
			skills: ['Crunch', 'Lança Chamas']
		},

		'Escorpiao': {
			HPMax: 18, dano: 10, tipo: 'Mob',
			skills: ['Crunch', 'Lança Chamas']
		},

		'Coelho': {
			HPMax: 18, dano: 10, tipo: 'Mob',
			skills: ['Crunch', 'Lança Chamas']
		},

		'Aranha': {
			HPMax: 18, dano: 10, tipo: 'Mob',
			skills: ['Crunch', 'Lança Chamas']
		},

		'SFortitude': { buff: 'Fortitude', tipo: 'buff' },
		'SCura': { buff: 'Fortitude', tipo: 'buff' },
		'SNatureza': { buff: 'Fortitude', tipo: 'buff' },
	}
};

/*=========================================
		 OBJETOS DA TELA COMBATE
==========================================*/
export const CartasEmCampoStatus = {
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

export const EfeitosTodosEmCampo = {
	Player: {
		Mob0: {
			'Burn': { turnos: 2, dano: 4 },
			'Poison': { turnos: 2, dano: 3 },
		},
		Mob1: {},
		Mob2: {},
		Mob3: {},
		Mob4: {},
		Mob5: {},
		Mob6: {},
		Mob7: {},
		Mob8: {},
	}
}