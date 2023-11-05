let senhaMesario;
let candidatosData;
let brancosNulos;

async function lerJson(){

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
    let votacao = false;
        
    while(votacao == false){

        let voto = prompt('digite seu voto: ')

        if (voto == senhaMesario){
            votacao = true
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
      console.log(brancosNulos)
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
        console.log(fimVotacao[i].nome)
        console.log(fimVotacao[i].votos)
        
      }
    }


async function audio(){
    const audio = new Audio('./confirmacao.mp3');
    await audio.play();
}

    
// function exibirCandidatos(){
//     console.log(candidatosData);
// }

// function lerJson(){
//     document.getElementById('candidatos').innerHTML ='';
//        fetch('./urna.json')
//         .then(response => response.json())
//         .then(data => {
//             candidatosData = data.candidatos;
//             exibirCandidatos();
//             console.log(data);
//             // console.log(data.configuracao[0].senha)
//             for (i=0; i < data.candidatos.length; i++){
//             // console.log(data);
//             // console.log(data[i].nome)
//             document.getElementById('candidatos').innerHTML += `<p> ${data.candidatos[i].codigo} - ${data.candidatos[i].nome}`;
    
            
//             // }
//         //}
//     }
//     })
//     }



async function urnaEletronica() {
    // let rowCandidatos = document.getElementById('candidatos');
    
    let candidatos = candidatosData;
    
    const horaInicio = data();
    const msgSucesso = "Voto computado com sucesso";
    
    
    let candidato1 = 0;
    let candidato2 = 0;
    let candidato3 = 0;
    let candidato4 = 0;
    let candidato5 = 0;
    let brancos = 0;
    let nulos = 0;
    let encerrar = false;
    
    while (encerrar == false) {
  
    
        let voto = parseInt(prompt("Digite o número do candidato: "))


                if(voto == candidatos[0].codigo){
                    if (confirm(`
                    Seu voto foi: ${candidatos[0].nome}
                    Ok: para confirmar
                    Cancelar: para votar novamente
                    `)){
                        candidato1++
                        console.log(msgSucesso);
                        await audio();
                    }
                }else if(voto == candidatos[1].codigo){
                    if (confirm(`
                    Seu voto foi: ${candidatos[1].nome}
                    Ok: para confirmar
                    Cancelar: para votar novamente
                    `)){
                        candidato2++
                        console.log(msgSucesso);
                        await audio();
                    }
                }else if(voto == candidatos[2].codigo){
                    if (confirm(`
                    Seu voto foi: ${candidatos[2].nome}
                    Ok: para confirmar
                    Cancelar: para votar novamente
                    `)){
                        candidato3++
                        console.log(msgSucesso);
                        await audio();
                    }
                }else if(voto == candidatos[3].codigo){
                    if (confirm(`
                    Seu voto foi: ${candidatos[3].nome}
                    Ok: para confirmar
                    Cancelar: para votar novamente
                    `)){
                        candidato4++
                        console.log(msgSucesso);
                        await audio();
                    }
                }else if(voto == candidatos[4].codigo){
                    if (confirm(`
                    Seu voto foi: ${candidatos[4].nome}
                    Ok: para confirmar
                    Cancelar: para votar novamente
                    `)){
                        candidato5++
                        console.log(msgSucesso);
                        await audio();
                    }
                }else if(voto == '00'){
                    if (confirm(`
                    Seu voto foi: Branco
                    Ok: para confirmar
                    Cancelar: para votar novamente
                    `)){
                        brancos++
                        console.log(msgSucesso);
                        await audio();
                    }
                }else if(voto == senhaMesario){
                    encerrar = prompt("Digite S para encerrar e N para continuar a votação");
                    if(encerrar == 's' || encerrar == 'S'){
                        encerrar = true;
                        //Cria o Hash quando o a votação é encerrada
                        // criarHash('urnaEletronica.js').then(valor => {
                        //     document.getElementById('hashFinal').innerHTML = valor;
                            
                        // })

                        
                    }else{
                        encerrar = false;
                    }
                }else{
                    if (confirm(`
                    Seu voto foi: Nulo
                    Ok: para confirmar
                    Cancelar: para votar novamente
                    `)){
                        nulos++
                        console.log(msgSucesso);
                        await audio();
                    }
                
                }
            
        }

        const dataHoraFinal = data().toLocaleString();
        
        console.clear(); //limpa o console
        const totalVotos = candidato1 + candidato2 + candidato3 + candidato4 + candidato5 + brancos + nulos;
        const porcentagemCandidato1 = candidato1 / totalVotos * 100;
        const porcentagemCandidato2 = candidato2 / totalVotos * 100;
        const porcentagemCandidato3 = candidato3 / totalVotos * 100;
        const porcentagemCandidato4 = candidato4 / totalVotos * 100;
        const porcentagemCandidato5 = candidato5 / totalVotos * 100;
        const porcentagemBrancos = brancos / totalVotos * 100;
        const porcentagemNulos = nulos / totalVotos * 100;
        
        console.log("============================");
        console.log("====== BOLETIM DE URNA =====");
        console.log("============================");
        console.log(`Horário em que a votação foi iniciada: ${horaInicio}`);
        console.log("===========================");
        if (totalVotos > 0){
            if(candidato1 > candidato2 && candidato1 > candidato3 && candidato1 > candidato4 && candidato1 > candidato5){
                const candidatoVencedor = candidato1;
                const totalVencedorBrancos = candidatoVencedor + brancos;
                const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
                console.log(`O vencedor foi o candidato ${candidatos[0].nome} com um total de ${totalVencedorBrancos} votos e uma porcentagem de ${porcentagemVencedorBrancos.toFixed(2)}% (somado os votos em branco)`);
            }else if(candidato2 > candidato1 && candidato2 > candidato3 && candidato2 > candidato4 && candidato2 > candidato5){
                const candidatoVencedor = candidato2;
                const totalVencedorBrancos = candidatoVencedor + brancos;
                const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
                console.log(`O vencedor foi o candidato ${candidatos[1].nome} com um total de ${totalVencedorBrancos} votos e uma porcentagem de ${porcentagemVencedorBrancos.toFixed(2)}% (somado os votos em branco)`);
            }else if(candidato3 > candidato1 && candidato3 > candidato2 && candidato3 > candidato4 && candidato3 > candidato5){
                const candidatoVencedor = candidato3;
                const totalVencedorBrancos = candidatoVencedor + brancos;
                const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
                console.log(`O vencedor foi o candidato ${candidatos[2].nome} com um total de ${totalVencedorBrancos} votos e uma porcentagem de ${porcentagemVencedorBrancos.toFixed(2)}% (somado os votos em branco)`);
            }else if(candidato4 > candidato1 && candidato4 > candidato2 && candidato4 > candidato3 && candidato4 > candidato5){
                const candidatoVencedor = candidato4;
                const totalVencedorBrancos = candidatoVencedor + brancos;
                const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
                console.log(`O vencedor foi o candidato ${candidatos[3].nome} com um total de ${totalVencedorBrancos} votos e uma porcentagem de ${porcentagemVencedorBrancos.toFixed(2)}% (somado os votos em branco)`);
            }else if(candidato5 > candidato1 && candidato5 > candidato2 && candidato5 > candidato3 && candidato5 > candidato4){
                const candidatoVencedor = candidato5;
                const totalVencedorBrancos = candidatoVencedor + brancos;
                const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
                console.log(`O vencedor foi o candidato ${candidatos[4].nome} com um total de ${totalVencedorBrancos} votos e uma porcentagem de ${porcentagemVencedorBrancos.toFixed(2)}% (somado os votos em branco)`);
            }else{
                console.log(`A votação terminou empatada`);
            }


            
            console.log("============================");   
            console.log("Resultado final da votação");
            console.log(`Total de votos: ${totalVotos}`);
            console.log("===========================");
            console.log(`Votos ${candidatos[0].nome}: ${candidato1} || ${porcentagemCandidato1.toFixed(2)}%`)
            console.log(`Votos ${candidatos[1].nome}: ${candidato2} || ${porcentagemCandidato2.toFixed(2)}%`)
            console.log(`Votos ${candidatos[2].nome}: ${candidato3} || ${porcentagemCandidato3.toFixed(2)}%`)
            console.log(`Votos ${candidatos[3].nome}: ${candidato4} || ${porcentagemCandidato4.toFixed(2)}%`)
            console.log(`Votos ${candidatos[4].nome}: ${candidato5} || ${porcentagemCandidato5.toFixed(2)}%`)
            console.log(`Votos Brancos: ${brancos} || ${porcentagemBrancos.toFixed(2)}%`)
            console.log(`Votos Nulos: ${nulos} || ${porcentagemNulos.toFixed(2)}%`)
        }else{
            console.log(`Não houve votos nessa urna`);
        }
        console.log("===========================");
        console.log(`Horário final da votação: ${dataHoraFinal}`);
        console.log("===========================");
        
        console.log(`
        -------------------------------------
        VERIFICANDO INTEGRIDADE DA URNA ...
        -------------------------------------
        `)
        
        verificarUrna();

    
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
        `)
            }
        })
    })
    } 

// criarHash('urnaEletronica.js').then(valor => {
//     document.getElementById('hashInicial').innerHTML = valor;
//     }) 


// function compararHash(hashInicial,hashFinal){
//     if (hashInicial == hashFinal){
//         console.log(`
//         --------------------------------------
//         Não houve alterações no código fonte.
//         VOTAÇÃO ENCERRADA
//         --------------------------------------
//         ${hashInicial}
//         ${hashFinal}
//         `)
//     }else{
//         console.clear();
//         console.log(`
//         ------------------------------------
//         ATENÇÃO
//         O CÓDIGO FONTE DA URNA FOI ALTERADO
//         VOTAÇÃO INVALIDADA
//         ------------------------------------
//         ${hashInicial}
//         ${hashFinal}
//         `)
//     }
// }

// function encerrarVotacao(){
//     setTimeout(() => {
//         compararHash(hashInicial.innerText,hashFinal.innerText)
//       }, "1000");
// }