//teste Hash! (2)
//Cria o Hash quando o programa é iniciado
criarHash('urnaEletronica.js').then(valor => {
document.getElementById('hashInicial').innerHTML = valor;
})  

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

function nomeCandidatos() {

    let nomeCandidatos = false;

    while(nomeCandidatos == false){
        let nomeCandidato1 = prompt("Digite o nome do primeiro candidato: ");
        document.getElementById('opcoes').innerHTML = `Opções de voto`;
        document.getElementById('candidato1').innerHTML = `1. ${nomeCandidato1}`;
        let nomeCandidato2 = prompt("Digite o nome do segundo candidato: ") 
        document.getElementById('candidato2').innerHTML = `2. ${nomeCandidato2}`;
        let nomeCandidato3 = prompt("Digite o nome do terceiro candidato: ") 
        document.getElementById('candidato3').innerHTML = `3.${nomeCandidato3}`;
        document.getElementById('branco').innerHTML = `5. Branco`;
        document.getElementById('iniciar').innerHTML = `<button type="submit" onclick="urnaEletronica()">Iniciar Votação</button>`;

        nomeOk = confirm(`Os nomes estão corretos?
        Candidato 1: ${nomeCandidato1}
        Candidato 2: ${nomeCandidato2}
        Candidato 3: ${nomeCandidato3}
        
        Ok: Para liberar o início da votação
        Cancelar: Para editar`)

        if(nomeOk){
            nomeCandidatos = true;
        }else{
            nomeCandidatos = false;
        }

    }
    
}

function urnaEletronica() {
    const nomeCandidato1 = document.getElementById('candidato1').innerText;
    const nomeCandidato2 = document.getElementById('candidato2').innerText;
    const nomeCandidato3 = document.getElementById('candidato3').innerText;
    const senhaMesario = prompt("Digite uma senha para o mesário:")

    
    let candidato1 = 0;
    let candidato2 = 0;
    let candidato3 = 0;
    let brancos = 0;
    let nulos = 0;
    let encerrar = false;
    
    while (encerrar == false) {
  
    let voto = parseInt(prompt("Digite o número do candidato: "))
    const msgSucesso = "Voto computado com sucesso!"

            if(voto == 1){
                candidato1++;
                console.log(msgSucesso);
            }else if(voto == 2){
                candidato2++;
                console.log(msgSucesso);
            }else if(voto == 3){
                candidato3++;
                console.log(msgSucesso);
            }else if(voto == 5){
                brancos++;
                console.log(msgSucesso);
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
                votoNulo = confirm('Opção inválida, o voto será anulado\nOk: para confirmar\nCancelar: para votar novamente');
                    if(votoNulo){
                        nulos++;
                        console.log(msgSucesso);
                    }
               
            }
            
        }
        
        console.clear(); //limpa o console 
        
        const totalVotos = candidato1 + candidato2 + candidato3 + brancos + nulos;
        const porcentagemCandidato1 = candidato1 / totalVotos * 100;
        const porcentagemCandidato2 = candidato2 / totalVotos * 100;
        const porcentagemCandidato3 = candidato3 / totalVotos * 100;
        const porcentagemBrancos = brancos / totalVotos * 100;
        const porcentagemNulos = nulos / totalVotos * 100;
        
        console.log("============================");
        console.log("Votação encerrada!");
        console.log("============================");


        if(candidato1 > candidato2 && candidato1 > candidato3){
            const candidatoVencedor = candidato1;
            const totalVencedorBrancos = candidatoVencedor + brancos;
            const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
            console.log(`O vencedor foi o candidato ${nomeCandidato1} com um total de ${totalVencedorBrancos} votos e uma porcentagem de ${porcentagemVencedorBrancos.toFixed(2)}% (somado os votos em branco)`);
        }else if(candidato2 > candidato1 && candidato2 > candidato3){
            const candidatoVencedor = candidato2;
            const totalVencedorBrancos = candidatoVencedor + brancos;
            const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
            console.log(`O vencedor foi o candidato ${nomeCandidato2} com um total de ${totalVencedorBrancos} votos e uma porcentagem de ${porcentagemVencedorBrancos.toFixed(2)}% (somado os votos em branco)`);
        }else if(candidato3 > candidato1 && candidato3 > candidato2){
            const candidatoVencedor = candidato3;
            const totalVencedorBrancos = candidatoVencedor + brancos;
            const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
            console.log(`O vencedor foi o candidato ${nomeCandidato3} com um total de ${totalVencedorBrancos} votos e uma porcentagem de ${porcentagemVencedorBrancos.toFixed(2)}% (somado os votos em branco)`);
        }else{
            console.log(`A votação terminou empatada`);
        }


        console.log("============================");   
        console.log("Resultado final da votação");
        console.log(`Total de votos: ${totalVotos}`);
        console.log("===========================");
        console.log(`Votos ${nomeCandidato1}: ${candidato1} || ${porcentagemCandidato1.toFixed(2)}%`)
        console.log(`Votos ${nomeCandidato2}: ${candidato2} || ${porcentagemCandidato2.toFixed(2)}%`)
        console.log(`Votos ${nomeCandidato3}: ${candidato3} || ${porcentagemCandidato3.toFixed(2)}%`)
        console.log(`Votos Brancos: ${brancos} || ${porcentagemBrancos.toFixed(2)}%`)
        console.log(`Votos Nulos: ${nulos} || ${porcentagemNulos.toFixed(2)}%`)
        console.log("===========================");
        
        console.log(`
        -------------------------------------
        VERIFICANDO INTEGRIDADE DA URNA ...
        -------------------------------------
        `)

        encerrarVotacao();

    
}



function encerrarVotacao(){
    
    setTimeout(() => {
        compararHash(hashInicial.innerText,hashFinal.innerText)
      }, "1000");
    
}