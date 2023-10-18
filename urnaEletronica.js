function nomeCandidatos() {
    
    const nomeCandidato1 = prompt("Digite o nome do primeiro candidato: ");
    document.getElementById('opcoes').innerHTML = `Opções de voto`;
    document.getElementById('candidato1').innerHTML = `${nomeCandidato1}`;
    const nomeCandidato2 = prompt("Digite o nome do segundo candidato: ") 
    document.getElementById('candidato2').innerHTML = `${nomeCandidato2}`;
    const nomeCandidato3 = prompt("Digite o nome do terceiro candidato: ") 
    document.getElementById('candidato3').innerHTML = `${nomeCandidato3}`;
    document.getElementById('branco').innerHTML = `Branco`;
    
}

function urnaEletronica() {
    const nomeCandidato1 = document.getElementById('candidato1').innerText;
    const nomeCandidato2 = document.getElementById('candidato2').innerText;
    const nomeCandidato3 = document.getElementById('candidato3').innerText;
    const pin = 123456;
    
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
            }else if(voto == 0){
                encerrar = prompt("Digite S para encerrar e N para continuar a votação");
                if(encerrar == 's' || encerrar == 'S'){
                    encerrar = true;
                    pinDigitado = prompt("Digite o PIN para encerrar a votação:");
                    while(pin != pinDigitado){
                        pinDigitado = prompt("PIN inválido. Digite o PIN para encerrar a votação:");
                    }
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
    
}