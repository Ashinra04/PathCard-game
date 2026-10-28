/* CENTRAL DE TODAS AS IMAGENS DO GAME*/
export const DadosMobsCards = {
	IA: {
		'GoblinGuerreiro': { HPMax: 30, HPminimo: 23, dano: 3, Posicao: [3], categoria: 'meele' },
		'GoblinArcher': { HPMax: 20, HPminimo: 17, dano: 6, Posicao: [1], categoria: 'ranged' },
		'GoblinMage': { HPMax: 15, HPminimo: 13, dano: 9, Posicao: [1], categoria: 'ranged' },
		'GoblinLancer': { HPMax: 25, HPminimo: 22, dano: 4, Posicao: [2], categoria: 'meele' },
	},
	Player: {
		Druida:{ //DRUIDA CARDS | SUMMONS
			'Morcego': { HPMax: 15, dano: 4, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Bite', 'bater de asas', 'Ventania'] },
			
			'Lobo': { HPMax: 20, dano: 6, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Bite', 'Mordida Sangrenta'] },
			
			'Urso': { HPMax: 28, dano: 8, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch', 'Arranhada', 'Furia', 'Ataque De furia'] },
			
			'Dragao': { HPMax: 40, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch', 'Lança Chamas', 'Palvaras Arcanas', 'Diginidade de um Rei'] },
			
			'Sapo': { HPMax: 18, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Cabeçada', 'Lingua Venenosa', 'Aumento de veneno'] },
			
			'Cobra': { HPMax: 18, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch', 'Lança Chamas'] },
			
			'Escorpiao': { HPMax: 18, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch']	},
			
			'Coelho': { HPMax: 40, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch', 'Lança Chamas']	},
			
			'Aranha': { HPMax: 40, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch', 'Lança Chamas']	},
			//DRUIDA CARDS | BUFFS E DEBUFFS
			'SFortitude': { buff: 'Fortitude', Categoria: 'buff', tipo: 'Defesa' },
			'SCura': { buff: 'Fortitude', Categoria: 'buff', tipo: 'Cura' },
			'SNatureza': { buff: 'Fortitude', Categoria: 'buff', tipo: 'Dano' },
		},
		WeaponMaster: {
			//WEAPON MASTER CARDS | SUMMONS
			'Sword': { HPMax: 18, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch', 'Lança Chamas']	},
			
			'Dagger': { HPMax: 18, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch', 'Lança Chamas']	},
			
			'Spear': { HPMax: 18, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch', 'Lança Chamas']	},
			
			'Katana': { HPMax: 18, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch', 'Lança']	},
			
			'Broquel': { HPMax: 18, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch', 'Lança']	},
			
			'Shield': { HPMax: 18, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch', 'Lança Chamas']	},
			
			'Bow': { HPMax: 18, dano: 10, Categoria: 'Invocacao',tipo: 'Mob', skills: ['Crunch', 'Lança Chamas']	},
			
			'Wand': { HPMax: 18, dano: 10, Categoria: 'Invocacao', tipo: 'Mob', skills: ['Crunch', 'Lança Chamas']	},
			//WEAPON MASTER CARDS | BUFFS E DEBUFFS
			'Sharpen': { buff: 'Afiação', tipo: 'Dano', Categoria: 'buff' },
			'Repair': { buff: 'Cura', tipo: 'Cura', Categoria: 'buff' },
			'Barragem': { buff: 'Barragem', tipo: 'Defesa', Categoria: 'buff' },
		},
	}
};