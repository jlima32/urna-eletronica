function urnaEletronica() {



    // let rowCandidatos = document.getElementById('candidatos');

    let candidatos = 
    [
    [31,'Carlos'],
    [44,'Lima'],
    [88,'Santos'],
    [77,'Aragão'],
    [99,'Joaquim'],
    ['00','Voto em Branco']
    ]
    
    for (let i = 0; i < candidatos.length; i++) {
        // rowCandidatos.innerHTML += `
        // <p>${candidatos[i][0]} - ${candidatos[i][1]}</p>`;
        dadosCandidatos = candidatos;
        }
    const senhaMesario = prompt("Digite uma senha para o mesário:")
    const msgSucesso = "Voto computado com sucesso";
    const horaInicio = data();
    

    

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


            if(voto == dadosCandidatos[0][0]){
                if (confirm(`
                Seu voto foi: ${dadosCandidatos[0][1]}
                Ok: para confirmar
                Cancelar: para votar novamente
                `)){
                    candidato1++
                    console.log(msgSucesso);
                }
            }else if(voto == dadosCandidatos[1][0]){
                if (confirm(`
                Seu voto foi: ${dadosCandidatos[1][1]}
                Ok: para confirmar
                Cancelar: para votar novamente
                `)){
                    candidato2++
                    console.log(msgSucesso);
                }
            }else if(voto == dadosCandidatos[2][0]){
                if (confirm(`
                Seu voto foi: ${dadosCandidatos[2][1]}
                Ok: para confirmar
                Cancelar: para votar novamente
                `)){
                    candidato3++
                    console.log(msgSucesso);
                }
            }else if(voto == dadosCandidatos[3][0]){
                if (confirm(`
                Seu voto foi: ${dadosCandidatos[3][1]}
                Ok: para confirmar
                Cancelar: para votar novamente
                `)){
                    candidato4++
                    console.log(msgSucesso);
                }
            }else if(voto == dadosCandidatos[4][0]){
                if (confirm(`
                Seu voto foi: ${dadosCandidatos[4][1]}
                Ok: para confirmar
                Cancelar: para votar novamente
                `)){
                    candidato5++
                    console.log(msgSucesso);
                }
            }else if(voto == '00'){
                if (confirm(`
                Seu voto foi: Branco
                Ok: para confirmar
                Cancelar: para votar novamente
                `)){
                    brancos++
                    console.log(msgSucesso);
                }
            }else if(voto == senhaMesario){
                encerrar = prompt("Digite S para encerrar e N para continuar a votação");
                if(encerrar == 's' || encerrar == 'S'){
                    encerrar = true;
                    //Cria o Hash quando o a votação é encerrada
                    criarHash('urnaEletronica.js').then(valor => {
                        document.getElementById('hashFinal').innerHTML = valor;
                        
                    })

                    
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
                }
               
            }
            
        }
        
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
        if(candidato1 > candidato2 && candidato1 > candidato3){
            const candidatoVencedor = candidato1;
            const totalVencedorBrancos = candidatoVencedor + brancos;
            const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
            console.log(`O vencedor foi o candidato ${dadosCandidatos[0][1]} com um total de ${totalVencedorBrancos} votos e uma porcentagem de ${porcentagemVencedorBrancos.toFixed(2)}% (somado os votos em branco)`);
        }else if(candidato2 > candidato1 && candidato2 > candidato3){
            const candidatoVencedor = candidato2;
            const totalVencedorBrancos = candidatoVencedor + brancos;
            const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
            console.log(`O vencedor foi o candidato ${dadosCandidatos[1][1]} com um total de ${totalVencedorBrancos} votos e uma porcentagem de ${porcentagemVencedorBrancos.toFixed(2)}% (somado os votos em branco)`);
        }else if(candidato3 > candidato1 && candidato3 > candidato2){
            const candidatoVencedor = candidato3;
            const totalVencedorBrancos = candidatoVencedor + brancos;
            const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
            console.log(`O vencedor foi o candidato ${dadosCandidatos[2][1]} com um total de ${totalVencedorBrancos} votos e uma porcentagem de ${porcentagemVencedorBrancos.toFixed(2)}% (somado os votos em branco)`);
        }else{
            console.log(`A votação terminou empatada`);
        }


        
        console.log("============================");   
        console.log("Resultado final da votação");
        console.log(`Total de votos: ${totalVotos}`);
        console.log("===========================");
        console.log(`Votos ${dadosCandidatos[0][1]}: ${candidato1} || ${porcentagemCandidato1.toFixed(2)}%`)
        console.log(`Votos ${dadosCandidatos[1][1]}: ${candidato2} || ${porcentagemCandidato2.toFixed(2)}%`)
        console.log(`Votos ${dadosCandidatos[2][1]}: ${candidato3} || ${porcentagemCandidato3.toFixed(2)}%`)
        console.log(`Votos ${dadosCandidatos[3][1]}: ${candidato4} || ${porcentagemCandidato4.toFixed(2)}%`)
        console.log(`Votos ${dadosCandidatos[4][1]}: ${candidato5} || ${porcentagemCandidato5.toFixed(2)}%`)
        console.log(`Votos Brancos: ${brancos} || ${porcentagemBrancos.toFixed(2)}%`)
        console.log(`Votos Nulos: ${nulos} || ${porcentagemNulos.toFixed(2)}%`)
        console.log("===========================");
        console.log(`Horário final da votação: ${data().toLocaleString()}`);
        console.log("===========================");
        
        console.log(`
        -------------------------------------
        VERIFICANDO INTEGRIDADE DA URNA ...
        -------------------------------------
        `)
        
        encerrarVotacao();

    
}



criarHash('urnaEletronica.js').then(valor => {
document.getElementById('hashInicial').innerHTML = valor;
})  

function data(){
    const dataAtual = new Date().toLocaleString();
    const data = dataAtual.replace(',', ' -')
    return data;
}

function criarHash(arquivo){
    return fetch(arquivo) //lê o arquivo
    .then(response => response.text()) // retorna como string
    .then(res => {
        return sha256(res); // faz o hash
    })
}

function compararHash(hashInicial,hashFinal){
    if (hashInicial == hashFinal){
        console.log(`
        --------------------------------------
        Não houve alterações no código fonte.
        VOTAÇÃO ENCERRADA
        --------------------------------------
        ${hashInicial}
        ${hashFinal}
        `)
    }else{
        console.clear();
        console.log(`
        ------------------------------------
        ATENÇÃO
        O CÓDIGO FONTE DA URNA FOI ALTERADO
        VOTAÇÃO INVALIDADA
        ------------------------------------
        ${hashInicial}
        ${hashFinal}
        `)
    }
}

function encerrarVotacao(){
    setTimeout(() => {
        compararHash(hashInicial.innerText,hashFinal.innerText)
      }, "1000");
}