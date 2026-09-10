window.CardSelecionado =  function(idCard) {
  const AllCards = document.querySelectorAll('.CardSelecionado, .CardsSlots');
  
  AllCards.forEach(tela => tela.classList.remove('CardSelecionado'));
  AllCards.forEach(tela => tela.classList.add('CardsSlots'));
	const cardSelecionar = idCard;
	
  const CardAtual = document.getElementById(cardSelecionar);
    if (CardAtual) {
        CardAtual.classList.remove('CardsSlots');
        CardAtual.classList.add('CardSelecionado');
    } else {
        console.error("A tela " + cardSelecionar + " não foi encontrada!");
    }
};