let senhaMesario;
let candidatosData;
let brancosNulos;

async function urnaEletronica(){

   await fetch('./urna.json')
    .then(response => response.json())
    .then(data => {
        candidatosData = data.candidatos;
        senhaMesario = data.configuracao[0].senha;
        brancosNulos = data.outros;
    })

    //document.getElementById('candidatos').innerHTML = '';
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
    document.querySelector('#candidatos>tbody').innerHTML = '';
    for(i = 0; i < candidatosData.length; i++){
        //document.getElementById('candidatos').innerHTML += `<p>${candidatosData[i].codigo} - ${candidatosData[i].nome}`;
        document.querySelector('#candidatos>tbody').innerHTML += `
        <tr>
          <td><img src="${candidatosData[i].img}" width="48px"></td>
          <td>${candidatosData[i].nome}</td>
          <td>${candidatosData[i].codigo}</td>
          <td>${candidatosData[i].partido}</td>
          <td>${candidatosData[i].coligacao}</td>
        </tr>
        `
    }
    
    setTimeout(() => {
        testeJson()
     }, 200);
     
}

  async function testeJson(){
    
    const horaInicio = data();
    let horaFim;
    let votacao = false;
        
    while(votacao == false){

        let voto = prompt('digite seu voto: ')

        if (voto == senhaMesario){
            votacao = true
            horaFim = data();
        }else if(voto == "00"){
            let votos = brancosNulos.find(e => e.codigo === voto);
                    if (confirm(`
                    Voto em Branco
                    Ok: para confirmar
                    Cancelar: para votar novamente
                    `)){
                        votos.votos += 1;
                        console.log('voto ok!');
                        await audio();
                    }
        }else{
            let votos = candidatosData.find(e => e.codigo === voto)
                if (votos !== undefined){
                    if (confirm(`
                    Seu voto foi: ${votos.nome}
                    Ok: para confirmar
                    Cancelar: para votar novamente
                    `)){
                        votos.votos += 1;
                        console.log('voto ok!');
                        await audio();
                    }
                }else{
                    let votos = brancosNulos.find(e => e.codigo === "99");
                    if (confirm(`
                    Seu voto vai ser anulado
                    Ok: para confirmar
                    Cancelar: para votar novamente
                    `)){
                        votos.votos += 1;
                        console.log('voto ok!');
                        await audio();
                    }
                }  
        }
    }

    let fimVotacao = candidatosData.sort((a, b) => {
        if (a.votos > b.votos) {
          return -1;
        }
      });

      function totalVotos(array){
        let total =0;
        for (i = 0; i< array.length; i++){
            total += array[i].votos;
        }
        return total;
      }
      let totalBrancos = brancosNulos.find(e => e.codigo === "00");
      let totalVotosNominais = totalVotos(candidatosData);
      let totalVotosBrancosNulos = totalVotos(brancosNulos);
      let totalVotosApurados = totalVotosNominais + totalVotosBrancosNulos;
      let totalVotosVencedor = fimVotacao[0].votos + totalBrancos.votos

      console.clear();
      console.log("============================");
      console.log("====== BOLETIM DE URNA =====");
      console.log("============================");
      console.log(`Horário em que a votação foi iniciada: ${horaInicio}`);
      console.log("===========================");
      console.log("RESULTADO FINAL DA VOTAÇÃO");
      console.log("===========================");
      console.log(`Total de Votos: ${totalVotosApurados}`);
      console.log("===========================");
      if (fimVotacao[0].votos > fimVotacao[1].votos && fimVotacao[0].votos > fimVotacao[1].votos){
        console.log(`O vencedor foi o candidato ${fimVotacao[0].nome} com um total de ${totalVotosVencedor} votos e uma porcentagem de ${((totalVotosVencedor / totalVotosApurados)*100).toFixed(2)}% (somado os votos em branco).`)
      }else{
        console.log(`
        A votação terminou empatada.
        `)
      }
      console.log("===========================");
      for(i = 0; i < fimVotacao.length; i++){
        console.log(`Votos ${fimVotacao[i].nome}: ${fimVotacao[i].votos} || ${((fimVotacao[i].votos / totalVotosApurados)*100).toFixed(2)}%`)
      }
      for(i = 0; i < brancosNulos.length; i++){
        console.log(`Votos ${brancosNulos[i].nome}: ${brancosNulos[i].votos} || ${((brancosNulos[i].votos / totalVotosApurados)*100).toFixed(2)}%`)
      }
      console.log("============================");
      console.log(`Horário final da votação: ${horaFim}`);
      console.log("===========================");

      verificarUrna();

    }


async function audio(){
    const audio = new Audio('./confirmacao.mp3');
    await audio.play();
}

function data(){
    const dataAtual = new Date().toLocaleString();
    const data = dataAtual.replace(',', ' -')
    return data;
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
