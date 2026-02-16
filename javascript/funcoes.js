function iniciarJogo() {
    const areaPontuacao = document.querySelector("#area-pontuacao span");
    const formulario = document.querySelector("#formulario");
    const campoNumeroJogador = document.querySelector("#campo-numero-jogador");
    const camposOpcao = document.querySelectorAll("#formulario input[name='opcao']");
    const modal = document.querySelector("#modal");
    const textoModal = document.querySelector("#area-conteudo-modal p");
    const botaoFechaModal = document.querySelector("#area-conteudo-modal button");

    function mostrarErro({ mensagem }) {
        alternarModal({ mostrar: true, mensagem });
        resetarFormulario();
    }

    function alternarModal({ mostrar, mensagem = "" }) {
        if (mensagem) {
            textoModal.textContent = mensagem;
        }

        if (mostrar) {
            modal.showModal();
            return;
        }

        modal.close();
    }

    function resetarFormulario() {
        campoNumeroJogador.value = "";

        if (window.innerWidth >= 992) {
            campoNumeroJogador.focus();
        } else {
            campoNumeroJogador.blur();
        }

        camposOpcao[0].value = "Par";
        camposOpcao[0].checked = true;
        camposOpcao[1].value = "Ímpar";
        camposOpcao[1].checked = false;
    }

    function determinarVencedor({ vencedor, numeroJogador, opcaoJogador, numeroCPU, opcaoCPU, resultado }) {
        const mensagemBase = `Você: ${numeroJogador} (${opcaoJogador}). CPU: ${numeroCPU} (${opcaoCPU}). Resultado: ${resultado}.`;

        if (vencedor === "jogador") {
            alternarModal({ mostrar: true, mensagem: `${mensagemBase} Você venceu. +1 ponto.` });
        } else {
            alternarModal({ mostrar: true, mensagem: `${mensagemBase} Você perdeu. Recomece o jogo.` });
        }

        alternarPontuacao({ vencedor });
    }

    function alternarPontuacao({ vencedor }) {
        let pontos = Number(areaPontuacao.textContent);

        if (Number.isNaN(pontos)) {
            alternarModal({ mostrar: true, mensagem: "A pontuação deve ser numérica." });
            areaPontuacao.textContent = 0;
            return;
        }

        if (vencedor === "jogador") {
            areaPontuacao.textContent = ++pontos;
            return;
        }

        areaPontuacao.textContent = 0;
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        const numeroJogador = Number(campoNumeroJogador.value.trim());

        if (!campoNumeroJogador.checkValidity() || !Number.isInteger(numeroJogador) || numeroJogador < 0 || numeroJogador > 5) {
            mostrarErro({ mensagem: "Entrada inválida. Insira um número entre 0 e 5." });
            return;
        }

        if ((!camposOpcao[0].checked && !camposOpcao[1].checked) || (camposOpcao[0].checked && camposOpcao[0].value !== "Par") || (camposOpcao[1].checked && camposOpcao[1].value !== "Ímpar")) {
            mostrarErro({ mensagem: "Escolha uma opção válida." });
            return;
        }

        const numeroCPU = Math.floor(Math.random() * 6);
        const soma = numeroJogador + numeroCPU;

        const dadosPartida = {
            vencedor: undefined,
            numeroJogador,
            opcaoJogador: camposOpcao[0].checked ? camposOpcao[0].value : camposOpcao[1].value,
            numeroCPU,
            opcaoCPU: camposOpcao[0].checked ? camposOpcao[1].value : camposOpcao[0].value,
            resultado: soma
        };

        if ((camposOpcao[0].checked && soma % 2 === 0) || (camposOpcao[1].checked && soma % 2 !== 0)) {
            dadosPartida.vencedor = "jogador";
            determinarVencedor(dadosPartida);
        } else {
            dadosPartida.vencedor = "cpu";
            determinarVencedor(dadosPartida);
        }

        resetarFormulario();
    });

    modal.addEventListener("click", function (event) {
        const dimensoesModal = this.getBoundingClientRect();

        if (!(event.clientX >= dimensoesModal.left && event.clientX <= dimensoesModal.right && event.clientY >= dimensoesModal.top && event.clientY <= dimensoesModal.bottom)) {
            alternarModal({ mostrar: false });
        }
    });

    botaoFechaModal.addEventListener("click", function () {
        alternarModal({ mostrar: false });
    });
}

iniciarJogo();