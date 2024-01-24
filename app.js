let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//Altera/adiciona o texto em uma tag no html através de uma função com Js
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto ,'Brazilian Portuguese Female', {rate: 1.2});
}

//os textos que serão inseridos no HTML
exibirTextoNaTela('h1', 'Jogo do Numero Secreto');
exibirTextoNaTela('p', 'Insira um número entre 1 e 10');

//função que exibe a mensagem inicial sempre que reiniciar o jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Numero Secreto');
    exibirTextoNaTela('p', 'Insira um número entre 1 e 10');
}

exibirMensagemInicial();

//ativa a função de verificação de chute quando o botão "chutar for clicado"
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        //exibe com quantas tentativas você acertou o numero secreto
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}! `
        exibirTextoNaTela('p', mensagemTentativas);
        //habilita o botão de Novo Jogo
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //dicas se o numero secreto é maior ou menor
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        //aumenta mais 1 a cada tentativa ate acertar
        tentativas++;
        //limpa o campo de preenchimento do chute
        limparCampo();
    }
}
//função de gerar número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaNumerosSorteados = [];
    }

    //o .includes verifica se o seu array já tem o numero sorteado,caso tenha vai sortear outro numero
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        //caso não tenha o .push adiciona o valor sorteado que ainda não existia ao seu array
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

//fução que limpa o campo de chute
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//função que reinicia o jogo
function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}