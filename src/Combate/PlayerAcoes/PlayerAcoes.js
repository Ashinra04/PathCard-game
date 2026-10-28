/*======================================================
  FUNÇÕES DE AÇÕES COMO ATACAR, USAR SKILL E ITEMS E ETC
=======================================================*/
import { state } from '../VariaviesList/Variaveis.js';

import {  EfeitosTodosEmCampo, CartasEmCampoStatus } from '../ObjetosDeDados/CartasEmCampoSts.js';

import { DadosMobsCards } from '../ObjetosDeDados/BancoInfosCartas.js';
import { CentralSkills } from '../ObjetosDeDados/BancoDeSkills.js';
import { CentralImagens } from '../ObjetosDeDados/BancoDeimagens.js';

let NomeDaSkill;

export async function PlyerAtacar(e) {
    const BtnAtacar = document.getElementById('BtnAtk');

    if (e.id === 'BtnAtk' && state.EnergiaPlyr > 0) {
        if (BtnAtacar.innerText == 'Atacar') {
            BtnAtacar.innerText = 'Cancelar';
            state.btnAtk = BtnAtacar.innerText;
            BtnAtacar.classList.remove("btnsAcoes");
            BtnAtacar.classList.add("btnsAcoesATK");
            window.perfilEmCampo('doBot');
        }
        else {
            if (state.btnAtk == 'Cancelar') {
                BtnAtacar.innerText = 'Atacar';
                state.btnAtk = BtnAtacar.innerText;
                BtnAtacar.classList.remove("btnsAcoesATK");
                BtnAtacar.classList.add("btnsAcoes");
                window.perfilEmCampo('doBot');
            }
        }
    }
    else if (state.EnergiaPlyr > 0) {
        if (state.btnAtk == 'Cancelar') {
            const pai = e.currentTarget;
            const indexNoArray = pai.dataset.nome;
            const idnoarray = +indexNoArray;
            const IdDefinitivo = idnoarray + 1;
            const SlotNoTabuleiro = `PosicaoT${IdDefinitivo}`;
            window.AbrirPopPainel("Esconder");

            await new Promise(resolve => setTimeout(resolve, 100));
            window.AnimacaoAtacarPlyr(state.CartaEscolhida);
            await new Promise(resolve => setTimeout(resolve, 300));
            window.AnimacaoChacoalhar(SlotNoTabuleiro);

            let danoAAplicar = DadosMobsCards.Player[PersonagemEscolhido][state.cartaAtual].dano;
            let HpMonstro = CartasEmCampoStatus.IA[SlotNoTabuleiro].HP;

            CartasEmCampoStatus.IA[SlotNoTabuleiro].HP = HpMonstro - danoAAplicar;

            if (CartasEmCampoStatus.IA[SlotNoTabuleiro].HP <= 0) {
                CartasEmCampoStatus.IA[SlotNoTabuleiro].HP = 0;
                window.verificarMorte(SlotNoTabuleiro);
            }

            controleEnergia('diminuir');
            window.AtualizarHPs();
            window.perfilEmCampo('doBot');
        }
    }
}

export function PlyerDefender() {
    const BtnAtacar = document.getElementById('BtnAtk');
    if (state.btnAtk == 'Atacar' && state.EnergiaPlyr > 0) {
        let mob = state.IdentificadorUnico;
        if (!EfeitosTodosEmCampo.Player[mob].Protecao) {
            EfeitosTodosEmCampo.Player[mob].Protecao = {};
        }

        EfeitosTodosEmCampo.Player[mob].Protecao = {
            Turnos: 1,
            Def: 20 / 100
        };

        window.AbrirPopPainel('Esconder');
        controleEnergia('diminuir');
    }
}

export async function PlyerSkills(btn) {
    if (state.btnAtk == 'Atacar' && state.EnergiaPlyr > 0) {
        const DivAcoes = document.getElementById('DivAcoes');
        const DivSkills = document.getElementById('DivSkills');
        const BoxImgSkill = document.getElementById('BoxImgSkill');
        const BoxImgCarta = document.getElementById('BoxImg');
        const BoxSttCarta = document.getElementById('BoxStts');
        const BoxSttSkill = document.getElementById('BoxSttSkill');

        let NomeCarta = CartasEmCampoStatus.Player[state.CartaEscolhida].nome;

        if (btn === 'btnSkills') {
            DivSkills.innerHTML = '';
            DivAcoes.classList.add('oculto');
            DivSkills.classList.remove('oculto');

            (DadosMobsCards.Player[PersonagemEscolhido][NomeCarta].skills || []).forEach(skillName => {
                const divSkill = document.createElement('div');
                divSkill.classList.add('btnsAcoes', 'textoUniversais');
                divSkill.innerText = skillName;
                divSkill.dataset.name = skillName;
                divSkill.dataset.identificador = 'skill';

                divSkill.onclick = function () {
                    NomeDaSkill = divSkill.dataset.name;
                    PlyerSkills(this);
                }

                DivSkills.appendChild(divSkill);
            });

            const btnVAcoes = document.createElement('div');
            btnVAcoes.classList.add('btnsAcoes', 'textoUniversais');
            btnVAcoes.innerText = '<= Ações';
            btnVAcoes.onclick = function () {
                PlyerSkills('btnVAcoes');
            }

            DivSkills.appendChild(btnVAcoes);
        }
        else if (btn === 'btnVAcoes') {
            state.skillAtivado = 'nao';
            window.perfilEmCampo('doBot');

            DivAcoes.classList.remove('oculto');
            DivSkills.classList.add('oculto');

            BoxImgCarta.classList.remove('oculto');
            BoxImgSkill.classList.add('oculto');

            BoxSttCarta.classList.remove('oculto');
            BoxSttSkill.classList.add('oculto');
        }
        else if (btn.dataset.identificador == 'skill' && state.EnergiaPlyr > 0) {
            const AllSkills = document.querySelectorAll('.btnsAcoesAtivado');
            AllSkills.forEach(skill => skill.classList.remove('btnsAcoesAtivado'));

            let IDiv = btn;
            if (IDiv) {
                IDiv.classList.add('btnsAcoesAtivado');
            }

            let danoSkill = CentralSkills[NomeDaSkill].dano || '';
            let custoSkill = CentralSkills[NomeDaSkill].custo || 0;
            let descricaoSkill = CentralSkills[NomeDaSkill].descricao || 'nao tem ainda';

            BoxImgCarta.classList.add('oculto');
            BoxImgSkill.classList.remove('oculto');

            BoxSttCarta.classList.add('oculto');
            BoxSttSkill.classList.remove('oculto');
            BoxSttSkill.innerHTML = '';
            BoxSttSkill.innerText = `${NomeDaSkill} 
            
            DANO: ${danoSkill} 
            Energia: ${custoSkill}
            
            Descrição: ${descricaoSkill}`;
            state.skillAtivado = 'sim';
            window.perfilEmCampo('doBot');
        }
        else {
            if (state.skillAtivado == 'sim' && state.EnergiaPlyr > 0) {
                const DivAlvo = btn;
                const PosicaoIndex = Number(DivAlvo.dataset.nome);
                const IndexDefinitivo = PosicaoIndex + 1;
                const PosicaoTabu = `PosicaoT${IndexDefinitivo}`;
                DivAcoes.classList.remove('oculto');
                DivSkills.classList.add('oculto');
                BoxImgCarta.classList.remove('oculto');
                BoxImgSkill.classList.add('oculto');
                BoxSttCarta.classList.remove('oculto');
                BoxSttSkill.classList.add('oculto');

                window.AbrirPopPainel("Esconder");

                await new Promise(resolve => setTimeout(resolve, 100));
                window.AnimacaoAtacarPlyr(state.CartaEscolhida);
                await new Promise(resolve => setTimeout(resolve, 300));
                window.AnimacaoChacoalhar(PosicaoTabu);

                let danoAAplicar = CentralSkills[NomeDaSkill].dano;
                let HpMonstro = CartasEmCampoStatus.IA[PosicaoTabu].HP;

                CartasEmCampoStatus.IA[PosicaoTabu].HP = HpMonstro - danoAAplicar;

                if (CartasEmCampoStatus.IA[PosicaoTabu].HP <= 0) {
                    CartasEmCampoStatus.IA[PosicaoTabu].HP = 0;
                    window.verificarMorte(PosicaoTabu);
                }

                state.skillAtivado = 'nao';
                controleEnergia('diminuir');
                window.AtualizarHPs();
                window.perfilEmCampo('doBot');
            }
        }
    }
}

export function PlyerItems(btn) {
    const divAcoes = document.getElementById('DivAcoes');
    const divPerfies = document.getElementById('SegundaRow');
    const divItems = document.getElementById('DivItems');
    if (state.btnAtk !== 'Cancelar') {
        if (btn == 'BtnItems') {
            divAcoes.classList.add('oculto');
            divPerfies.classList.add('oculto');
            divItems.classList.remove('oculto');
        }
        else if (btn == 'BtnVoltarAcoes') {
            divAcoes.classList.remove('oculto');
            divPerfies.classList.remove('oculto');
            divItems.classList.add('oculto');
        }
    }
}

export function PlyerStatus(btn) {
    const divAcoes = document.getElementById('DivAcoes');
    const divPerfies = document.getElementById('SegundaRow');
    const divEfeitos = document.getElementById('DivEfeitos');
    const BoxDeEfeitos = document.getElementById('BoxEfeitos');

    if (state.btnAtk !== 'Cancelar') {
        if (btn == 'BtnEfeitos') {
            divAcoes.classList.add('oculto');
            divPerfies.classList.add('oculto');
            divEfeitos.classList.remove('oculto');

            BoxDeEfeitos.innerHTML = '';

            Object.keys(EfeitosTodosEmCampo.Player[state.IdentificadorUnico] || {}).forEach(objetos => {
                let efeitosNome = objetos;

                const EfeitoBox = document.createElement("div");
                EfeitoBox.classList.add('divEfeitos');
                BoxDeEfeitos.appendChild(EfeitoBox);

                const EfeitoImg = document.createElement("div");
                const valorEfeito = EfeitosTodosEmCampo?.Player?.[state.IdentificadorUnico]?.[efeitosNome].turnos || '';
                let ImgCaminho = CentralImagens.iconEfeitos[efeitosNome];

                EfeitoImg.classList.add('EfeitosIcon', 'imagemStyle');
                EfeitoImg.innerText = valorEfeito;
                EfeitoImg.style.backgroundImage = `url('${ImgCaminho}')`;
                EfeitoBox.appendChild(EfeitoImg);

                const EfeitoDescricao = document.createElement("div");
                EfeitoDescricao.innerText = efeitosNome;
                EfeitoDescricao.classList.add('EfeitosDescricao');
                EfeitoBox.appendChild(EfeitoDescricao);
            })
        }
        else if (btn == 'BtnVoltarAcoes') {
            divAcoes.classList.remove('oculto');
            divPerfies.classList.remove('oculto');
            divEfeitos.classList.add('oculto');
        }
    }
}

export function controleEnergia(FazerOque) {
    const DivEnergia = document.getElementById('BoxEnergia');
    if (FazerOque == 'diminuir') {
        state.EnergiaPlyr--;
    }
    else if (FazerOque == 'resetar') {
        state.EnergiaPlyr = 4;
    }
    DivEnergia.innerText = state.EnergiaPlyr;
}

// === EXPOSIÇÃO GLOBAL PARA O HTML ===
window.PlyerAtacar = PlyerAtacar;
window.PlyerDefender = PlyerDefender;
window.PlyerSkills = PlyerSkills;
window.PlyerItems = PlyerItems;
window.PlyerStatus = PlyerStatus;
window.controleEnergia = controleEnergia;