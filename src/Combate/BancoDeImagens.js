// bancoDeImagens.js
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

export const CentralImagens = {
	ImagensSemFundo: {
		'Urso': '/Imagens/CartasGlobais/UrsoBS.png',
		'Dragao': '/Imagens/CartasGlobais/DragãoBS.png',
		'Lobo': '/Imagens/CartasGlobais/WolfBS.png',
		'Morcego': '/Imagens/CartasGlobais/BatBS.png',
		'GoblinGuerreiro': '/Imagens/Mobs/GoblinGuerreiro.png',
		'GoblinArcher': '/Imagens/Mobs/GoblinArcher.png',
		'GoblinMage': '/Imagens/Mobs/GoblinMage.png',
		'GoblinLancer': '/Imagens/Mobs/GoblinLancer.png',
	},
	ImagensComFundo: {
		'Urso': { tipo: 'Besta', imagem: '/Imagens/Deck-Druida/BearCard.png' },
		'Dragao': { tipo: 'Criatura', imagem: '/Imagens/Deck-Druida/DragonCard.png' },
		'Lobo': { tipo: 'Besta', imagem: '/Imagens/Deck-Druida/WolfCard.png' },
		'Morcego': { tipo: 'Besta', imagem: '/Imagens/Deck-Druida/BatCard.png' },
		'GoblinGuerreiro': { imagem: '/Card.png' },
		'GoblinArcher': { imagem: '/Card.png' },
	},
	iconEfeitos: {
		'Poison': '/Imagens/EfeitosIcons/PoisonEfeito.png',
		'Burn': '/Imagens/EfeitosIcons/burnEfeito.png',
		'Protecao': '/Imagens/EfeitosIcons/ProteçãoEfeito.png'
	}
};

export const DadosMobsCards = {
	IA: {
		'GoblinGuerreiro': { HPMax: 30, HPminimo: 23, dano: 3, Posicao: [3], categoria: 'front' },
		'GoblinArcher': { HPMax: 20, HPminimo: 17, dano: 6, Posicao: [1], categoria: 'back-middle' },
		'GoblinMage': { HPMax: 15, HPminimo: 13, dano: 9, Posicao: [1], categoria: 'back' },
		'GoblinLancer': { HPMax: 25, HPminimo: 22, dano: 4, Posicao: [2], categoria: 'front' },
	},
	Player: {
		'Morcego': { HPMax : 15, dano: 4, 
			skills: ['Bite', 'bater de asas', 'Ventania']
		},
		'Lobo': { HPMax : 20, dano: 6,
			skills: ['Bite', 'Mordida Sangrenta']
		},
		'Urso': { HPMax : 28, dano: 8, 
			skills: ['Crunch', 'Arranhada']
		},
		'Dragao': { HPMax : 40, dano: 10, 
			skills: ['Crunch', 'Lança Chamas']
		},
	}
};