const iniciarJogo = () => {
  const pontuacao = document.querySelector("#pontuacao");
  const formulario = document.querySelector("#formulario");
  const campoNumeroJogador = document.querySelector("#campo-numero-jogador");
  const campoPar = document.querySelector("#campo-par");
  const campoImpar = document.querySelector("#campo-impar");
  const modal = document.querySelector("#modal");
  const textoModal = document.querySelector("#texto-modal");
  const botaoFechaModal = document.querySelector("#botao-fecha-modal");

  const mostrarErro = ({ mensagem }) => {
    alternarModal({ mostrar: true, mensagem });
    resetarFormulario();
  };

  const alternarModal = ({ mostrar, mensagem = "" }) => {
    if (mensagem) {
      textoModal.innerHTML = mensagem;
    }

    if (mostrar) {
      modal.showModal();
      return;
    }

    modal.close();
  };

  const resetarFormulario = () => {
    campoNumeroJogador.value = "";

    if (window.innerWidth >= 992) {
      campoNumeroJogador.focus();
    } else {
      campoNumeroJogador.blur();
    }

    campoPar.checked = true;
    campoPar.value = "Par";
    campoImpar.checked = false;
    campoImpar.value = "Ímpar";
  };

  const determinarVencedor = ({
    vencedor,
    numeroJogador,
    opcaoJogador,
    numeroCPU,
    opcaoCPU,
    resultado,
  }) => {
    const mensagemBase = `Você: <span class="jogador">${numeroJogador} (${opcaoJogador})</span> CPU: <span class="cpu">${numeroCPU} (${opcaoCPU})</span> Resultado: ${resultado}`;

    if (vencedor === "jogador") {
      alternarModal({
        mostrar: true,
        mensagem: `${mensagemBase} <span class="jogador">Você venceu! +1 ponto</span>`,
      });
    } else {
      alternarModal({
        mostrar: true,
        mensagem: `${mensagemBase} <span class="cpu">Você perdeu! Por favor, recomece o jogo</span>`,
      });
    }

    alternarPontuacao({ vencedor });
  };

  const alternarPontuacao = ({ vencedor }) => {
    let pontos = Number(pontuacao.textContent);

    if (Number.isNaN(pontos)) {
      alternarModal({
        mostrar: true,
        mensagem: `Por favor, mantenha a pontuação como números.`,
      });

      pontuacao.textContent = 0;
      return;
    }

    if (vencedor === "jogador") {
      pontuacao.textContent = ++pontos;
      return;
    }

    pontuacao.textContent = 0;
  };

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const numeroJogador = Number(campoNumeroJogador.value.trim());

    if (
      !campoNumeroJogador.checkValidity() ||
      !Number.isInteger(numeroJogador) ||
      numeroJogador < 0 ||
      numeroJogador > 5
    ) {
      mostrarErro({
        mensagem: "Entrada inválida. Digite um valor inteiro entre 0 e 5.",
      });

      return;
    }

    if (
      (!campoPar.checked && !campoImpar.checked) ||
      (campoPar.checked && campoPar.value !== "Par") ||
      (campoImpar.checked && campoImpar.value !== "Ímpar")
    ) {
      mostrarErro({ mensagem: "Escolha uma opção válida." });
      return;
    }

    const numeroCPU = Math.floor(Math.random() * 6);
    const soma = numeroJogador + numeroCPU;

    if (
      (campoPar.checked && soma % 2 === 0) ||
      (campoImpar.checked && soma % 2 !== 0)
    ) {
      determinarVencedor({
        vencedor: "jogador",
        numeroJogador,
        opcaoJogador: campoPar.checked ? campoPar.value : campoImpar.value,
        numeroCPU,
        opcaoCPU: campoPar.checked ? campoImpar.value : campoPar.value,
        resultado: soma,
      });
    } else {
      determinarVencedor({
        vencedor: "maquina",
        numeroJogador,
        opcaoJogador: campoPar.checked ? campoPar.value : campoImpar.value,
        numeroCPU,
        opcaoCPU: campoPar.checked ? campoImpar.value : campoPar.value,
        resultado: soma,
      });
    }

    resetarFormulario();
  });

  modal.addEventListener("click", (event) => {
    const dimensoesModal = modal.getBoundingClientRect();

    if (
      event.clientX < dimensoesModal.left ||
      event.clientX > dimensoesModal.right ||
      event.clientY < dimensoesModal.top ||
      event.clientY > dimensoesModal.bottom
    ) {
      alternarModal({ mostrar: false });
    }
  });

  botaoFechaModal.addEventListener("click", () => {
    alternarModal({ mostrar: false });
  });
};

iniciarJogo();
