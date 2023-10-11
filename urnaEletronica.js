function urnaEletronica() {
    let candidato1 = 0;
    let candidato2 = 0;
    let candidato3 = 0;
    let brancos = 0;
    let nulos = 0;

    let voto = parseInt(prompt("Digite o número do candidato: "))
    const msgSucesso = "Voto computado com sucesso!"


    while (voto != 0) {
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
        }else if(voto == 8){
            nulos++;
            console.log(msgSucesso);
        }else{
            console.log("Opção inválida")
        }
        voto = parseInt(prompt("Digite o número do candidato: "))       
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
        console.log(`O vencedor foi o candidato 1 com um total de: ${totalVencedorBrancos} votos e uma porcentagem de: ${porcentagemVencedorBrancos}%`);
    }else if(candidato2 > candidato1 && candidato2 > candidato3){
        const candidatoVencedor = candidato2;
        const totalVencedorBrancos = candidatoVencedor + brancos;
        const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
        console.log(`O vencedor foi o candidato 2 com um total de: ${totalVencedorBrancos} votos e uma porcentagem de: ${porcentagemVencedorBrancos}%`);
    }else if(candidato3 > candidato1 && candidato3 > candidato2){
        const candidatoVencedor = candidato3;
        const totalVencedorBrancos = candidatoVencedor + brancos;
        const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
        console.log(`O vencedor foi o candidato 3 com um total de: ${totalVencedorBrancos} votos e uma porcentagem de: ${porcentagemVencedorBrancos}%`);
    }else{
        console.log(`A votação terminou empatada`);
    }


    console.log("============================");   
    console.log("Resultado final da votação");
    console.log(`Total de votos: ${totalVotos}`);
    console.log("===========================");
    console.log(`Votos Candidato 1: ${candidato1} || ${porcentagemCandidato1}%`)
    console.log(`Votos Candidato 2: ${candidato2} || ${porcentagemCandidato2}%`)
    console.log(`Votos Candidato 3: ${candidato3} || ${porcentagemCandidato3}%`)
    console.log(`Votos Brancos: ${brancos} || ${porcentagemBrancos}%`)
    console.log(`Votos Nulos: ${nulos} || ${porcentagemNulos}%`)
    console.log("===========================");

}