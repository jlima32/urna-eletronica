let dadosCandidatos;
let votacaoAtual = 0;
let voto = 0;
let confirmacao;
let horaInicio = new Date().toLocaleString().replace(',', ' -');
let div = document.getElementById('iniciar');
let getLocalStorage = JSON.parse(localStorage.getItem("dadosUrna"));

candidatos();

function tabelaCandidatos(){
    if(votacaoAtual == 4){
        votacaoAtual = -1
    }
    document.querySelector('#candidatos').innerHTML = `
        <thead>
            <tr>
            <th></th>
            <th>Nome</th>
            <th>Nº</th>
            <th>Partido</th>
            <th>Coligação</th>
            </tr>
        </thead>
        <tbody>`;
    for(i = 0; i < getLocalStorage[votacaoAtual+1].candidatos.length; i++){
        //document.getElementById('candidatos').innerHTML += `<p>${candidatosData[i].codigo} - ${candidatosData[i].nome}`;
        document.querySelector('#candidatos>tbody').innerHTML +=`
        <tr>
          <td><img src="${getLocalStorage[votacaoAtual+1].candidatos[i].img}" width="48px"></td>
          <td>${getLocalStorage[votacaoAtual+1].candidatos[i].nome}</td>
          <td>${getLocalStorage[votacaoAtual+1].candidatos[i].codigo}</td>
          <td>${getLocalStorage[votacaoAtual+1].candidatos[i].partido}</td>
          <td>${getLocalStorage[votacaoAtual+1].candidatos[i].coligacao}</td>
        </tr>
        `
    }
}

async function data(){
    const dataAtual = new Date().toLocaleString();
    const data = dataAtual.replace(',', ' -')
    return data;
}

async function candidatos(){
    await fetch('./urna.json')
        .then(response => response.json())
        .then(data => {
            dadosCandidatos = data.votacao;
            senhaMesario = data.configuracao[0].senha;
        })
    dadosLocalStorage();
}

function dadosLocalStorage() {
    localStorage.setItem("dadosUrna", JSON.stringify(dadosCandidatos));
}

async function votacao(){
    voto = prompt(`
    Votando para: ${getLocalStorage[votacaoAtual].cargo}
    Digite o número do candidato:
    `);

    if(voto == "00"){
        let votos = getLocalStorage[votacaoAtual].outros.find(e => e.codigo === voto);
                if (confirm(`
                Votando para: ${getLocalStorage[votacaoAtual].cargo}
                Voto em Branco
                Ok: para confirmar
                Cancelar: para votar novamente
                `)){
                    tabelaCandidatos();
                    votos.votos += 1;
                    console.log('voto computado com sucesso!')
                    await audio();
                    confirmacao = true;
                }else{
                    confirmacao = false;
                }
                await confirma();  
    }else{
        let votos = getLocalStorage[votacaoAtual].candidatos.find(e => e.codigo === voto)
            if (votos !== undefined){
                if (confirm(`
                Votando para: ${getLocalStorage[votacaoAtual].cargo}
                Seu voto foi: ${votos.nome}
                Ok: para confirmar
                Cancelar: para votar novamente
                `)){
                    tabelaCandidatos();
                    votos.votos += 1;
                    console.log('voto computado com sucesso!')
                    await audio();
                    confirmacao = true;
                }else{
                    confirmacao = false;
                }
                await confirma();  
            }else{
                
                if (voto == senhaMesario){
                    console.clear();
                     fimVotacao();
                     
                }else{
                    let votos = getLocalStorage[votacaoAtual].outros.find(e => e.codigo === "99");
                if (confirm(`
                Votando para: ${getLocalStorage[votacaoAtual].cargo}
                Seu voto vai ser anulado
                Ok: para confirmar
                Cancelar: para votar novamente
                `)){
                    tabelaCandidatos();
                    votos.votos += 1;
                    console.log('voto computado com sucesso!')
                    await audio();
                    confirmacao = true;
                }else{
                    confirmacao = false;
                }
                await confirma();   
                }

                
            }  
    }
}

async function confirma(){
    if (confirmacao){
        votacaoAtual++;
        localStorage.setItem("dadosUrna", JSON.stringify(getLocalStorage));
        if (getLocalStorage[votacaoAtual] == undefined){
            votacaoAtual = 0;
        }
    }else{
        localStorage.setItem("dadosUrna", JSON.stringify(getLocalStorage));
    }
    votacao();                 
}

async function audio(){
    const audio = new Audio('./confirmacao.mp3');
    await audio.play();
}

function totalVotos(array){
    let total = 0;
    for (n = 0; n< array.length; n++){
        total += array[n].votos;
    }
    return total;
}

async function fimVotacao(){
    votacaoAtual = 0;
    let dadosFinais;
    
    console.log("============================");
    console.log("BOLETIM DE URNA");
    console.log("============================");
    console.log(`Horário em que a votação foi iniciada: ${horaInicio}`);
    console.log("============================");
    
    
    for(i=0; i < dadosCandidatos.length;i++){
         let dadosFinaisOutros = getLocalStorage[i].outros;
         dadosFinais = getLocalStorage[i].candidatos.sort((a, b) => {
            if (a.votos > b.votos) {
            return -1;
        }
    });
        let totalVotosNominais = totalVotos(dadosFinais);
        let totalVotosBrancosNulos = totalVotos(dadosFinaisOutros);
        let totalVotosBrancos = dadosFinaisOutros[0].votos;
        let totalVotosApurados = totalVotosNominais + totalVotosBrancosNulos;
        let totalVotosVencedor = dadosFinais[0].votos + totalVotosBrancos;

      console.log(`RESULTADO FINAL DA VOTAÇÃO PARA ${getLocalStorage[i].cargo}`);
      console.log("===========================");
      console.log(`Total de Votos: ${totalVotosApurados}`);
      console.log("===========================");
      if (dadosFinais[0].votos > dadosFinais[1].votos){
        console.log(`O vencedor foi o candidato ${dadosFinais[0].nome} (${dadosFinais[0].partido}) com um total de ${totalVotosVencedor} votos e uma porcentagem de ${((totalVotosVencedor / totalVotosApurados)*100).toFixed(2)}% (somado os votos em branco).`)
      }else{
        console.log(`
        A votação terminou empatada.
        `)
      }
      console.log("===========================");
      for(j = 0; j < dadosFinais.length; j++){
        console.log(`${dadosFinais[j].codigo} - ${dadosFinais[j].nome}: ${dadosFinais[j].votos} || ${((dadosFinais[j].votos / totalVotosApurados)*100).toFixed(2)}%`)
      }
      for(j = 0; j < dadosFinaisOutros.length; j++){
        console.log(`${dadosFinaisOutros[j].nome}: ${dadosFinaisOutros[j].votos} || ${((dadosFinaisOutros[j].votos / totalVotosApurados)*100).toFixed(2)}%`)
      }
      console.log("===========================");
    }
        console.log(`Horário final da votação: ${await data()}`);
        console.log("===========================");
}

function verificarUrna(){
    fetch('./urnaEletronica.js') //lê o arquivo
    .then(response => response.text()) // retorna como string
    .then(res => sha256(res)) // faz o hash
    // .then(res => console.log(res))
    .then(hashUrnaAtual => {
        fetch('./hashVerificado')
        .then(conteudo => conteudo.text())
        .then(hashVerificado => {
            if (hashUrnaAtual == hashVerificado){
                console.log(`
        --------------------------------------
        Não houve alterações no código fonte.
        VOTAÇÃO ENCERRADA
        --------------------------------------
        `)
            }else{
                console.log(`
        --------------------------------------
        O CÓDIGO FONTE DA URNA FOI ALTERADO.
        --------------------------------------
        ${hashUrnaAtual}
        `)
            }
        })
    })
} 
