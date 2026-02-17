# Par ou ímpar

 Simulador de par ou ímpar em JavaScript. Este projeto foi proposto inicialmente durante o curso **Técnico em Informática** do **IFSP**, porém desenvolvi uma nova versão depois de anos estudando e adquirindo conhecimento.

## Regras do jogo

No início, meu professor propôs as seguintes regras para o jogo funcionar:

1. O usuário deve informar um número inteiro entre 0 e 5. Caso ele informe um número inválido, o sistema deve parar e informar o usuário sobre o erro.
2. O usuário deve selecionar uma opção (par ou ímpar). Caso ele não selecione nenhuma, o sistema deve parar e informar o usuário sobre o erro.
3. O sistema deve gerar um número inteiro e aleatório para a CPU no mesmo intervalo que o informado pelo usuário.
4. O sistema deve calcular o resultado e atribuir uma opção para a CPU. Caso o usuário tenha escolhido par, a CPU fica com ímpar e vice-versa.
5. Caso o usuário vença, o sistema deve exibir uma mensagem e incrementar sua pontuação.
6. Caso a CPU vença, o sistema deve exibir uma mensagem, zerar a pontuação do usuário e recomeçar o jogo.

## Melhorias que implementei

### No HTML

1. Utilizei HTML semântico para separar cada área do site.
2. Criei um modal animado usando a tag `<dialog>`, que é a tag semântica para modais.

### No CSS

1. Fiz uso de variáveis de forma básica.
2. Apliquei responsividade.

### No JavaScript

1. Modularizei bem mais o código e fiz uso de arrow functions.
2. A chamada para o arquivo JavaScript agora foi feita na tag `<head>`, com o uso do atributo `defer`, conforme deve ser feito.