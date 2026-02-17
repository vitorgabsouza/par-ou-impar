const comecarJogo = () => {
	const pontuacao = document.querySelector('#pontuacao');
	const formulario = document.querySelector('#formulario');
	const campoDoNumeroDoJogador = document.querySelector('#campo-do-numero-do-jogador');
	const campoDeOpcaoPar = document.querySelector('#campo-de-opcao-par');
	const campoDeOpcaoImpar = document.querySelector('#campo-de-opcao-impar');
	const modal = document.querySelector('#modal');
	const textoDoModal = document.querySelector('#texto-do-modal');
	const botaoQueFechaOModal = document.querySelector('#botao-que-fecha-o-modal');

	const mostrarErro = ({ mensagem }) => {
		alternarExibicaoDoModal({ mostrar: true, mensagem });
		resetarFormulario();
	};

	const alternarExibicaoDoModal = ({ mostrar, mensagem = '' }) => {
		if (mensagem) textoDoModal.textContent = mensagem;

		if (!mostrar) {
			modal.close();
			return;
		}

		modal.showModal();
	};

	const resetarFormulario = () => {
		campoDoNumeroDoJogador.value = '';
		if (window.innerWidth >= 992) campoDoNumeroDoJogador.focus();
		else campoDoNumeroDoJogador.blur();
		campoDeOpcaoPar.checked = true;
		campoDeOpcaoPar.value = 'Par';
		campoDeOpcaoImpar.value = 'Ímpar';
	};

	const determinarVencedor = ({ numeroDoJogador }) => {
		const numeroDaCPU = Math.floor(Math.random() * 6);
		const soma = numeroDoJogador + numeroDaCPU;

		const opcoesDeJogo = {
			opcaoDoJogador: campoDeOpcaoPar.checked ? campoDeOpcaoPar.value : campoDeOpcaoImpar.value,
			opcaoDaCPU: campoDeOpcaoPar.checked ? campoDeOpcaoImpar.value : campoDeOpcaoPar.value
		};

		const mensagemBase = `Você: ${numeroDoJogador} (${opcoesDeJogo.opcaoDoJogador}). CPU: ${numeroDaCPU} (${opcoesDeJogo.opcaoDaCPU}). Resultado: ${soma}.`;

		if ((opcoesDeJogo.opcaoDoJogador === 'Par' && soma % 2 !== 0) || (opcoesDeJogo.opcaoDoJogador === 'Ímpar' && soma % 2 === 0)) {
			alternarExibicaoDoModal({ mostrar: true, mensagem: `${mensagemBase} Você perdeu, recomece o jogo.` });
			alternarPontuacao({ vencedor: 'cpu' });
			return;
		}

		alternarExibicaoDoModal({ mostrar: true, mensagem: `${mensagemBase} Você venceu, +1 ponto.` });
		alternarPontuacao({ vencedor: 'jogador' });
	};

	const alternarPontuacao = ({ vencedor }) => {
		let pontos = Number(pontuacao.textContent.trim());

		if (Number.isInteger(pontos)) {
			alternarExibicaoDoModal({ mostrar: true, mensagem: 'Erro: Por favor, mantenha a pontuação como um número inteiro.' });
			pontuacao.textContent = 0;
			return;
		}

		pontuacao.textContent = vencedor === 'jogador' ? ++pontos : 0;
	};

	formulario.addEventListener('submit', (event) => {
		event.preventDefault();

		const numeroDoJogador = Number(campoDoNumeroDoJogador.value.trim());

		if (!campoDoNumeroDoJogador.checkValidity() || !Number.isInteger(numeroDoJogador) || numeroDoJogador < 0 || numeroDoJogador > 5) {
			mostrarErro({ mensagem: 'Erro: Por favor, digite um número inteiro entre 0 e 5.' });
			return;
		}

		if ((!campoDeOpcaoPar.checked && !campoDeOpcaoImpar.checked) || (campoDeOpcaoPar.checked && campoDeOpcaoPar.value !== 'Par') || (campoDeOpcaoImpar.checked && campoDeOpcaoImpar.value !== 'Ímpar')) {
			mostrarErro({ mensagem: 'Erro: Por favor, selecione uma opção válida.' });
			return;
		}

		determinarVencedor({ numeroDoJogador });
		resetarFormulario();
	});

	modal.addEventListener('click', (event) => {
		const dimensoesDoModal = modal.getBoundingClientRect();
		if (!(event.clientX >= dimensoesDoModal.left && event.clientX <= dimensoesDoModal.right && event.clientY >= dimensoesDoModal.top && event.clientY <= dimensoesDoModal.bottom)) alternarExibicaoDoModal({ mostrar: false });
	});

	botaoQueFechaOModal.addEventListener('click', () => alternarExibicaoDoModal({ mostrar: false }));
};

comecarJogo();