function nomeCandidatos() {
    
    const nomeCandidato1 = prompt("Digite o nome do primeiro candidato: ");
    document.getElementById('opcoes').innerHTML = `Opções de voto`;
    document.getElementById('candidato1').innerHTML = `${nomeCandidato1}`;
    const nomeCandidato2 = prompt("Digite o nome do segundo candidato: ") 
    document.getElementById('candidato2').innerHTML = `${nomeCandidato2}`;
    const nomeCandidato3 = prompt("Digite o nome do terceiro candidato: ") 
    document.getElementById('candidato3').innerHTML = `${nomeCandidato3}`;
    document.getElementById('branco').innerHTML = `Brancos`;
    document.getElementById('nulo').innerHTML = `Nulos`;
    document.getElementById('encerrar').innerHTML = `Encerrar Votação`;
    
}

function urnaEletronica() {
    const nomeCandidato1 = document.getElementById('candidato1').innerText;
    const nomeCandidato2 = document.getElementById('candidato2').innerText;
    const nomeCandidato3 = document.getElementById('candidato3').innerText;
    
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
        console.log(`O vencedor foi o candidato ${nomeCandidato1} com um total de: ${totalVencedorBrancos} votos e uma porcentagem de: ${porcentagemVencedorBrancos}% (somado os votos em branco)`);
    }else if(candidato2 > candidato1 && candidato2 > candidato3){
        const candidatoVencedor = candidato2;
        const totalVencedorBrancos = candidatoVencedor + brancos;
        const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
        console.log(`O vencedor foi o candidato ${nomeCandidato2} com um total de: ${totalVencedorBrancos} votos e uma porcentagem de: ${porcentagemVencedorBrancos}% (somado os votos em branco)`);
    }else if(candidato3 > candidato1 && candidato3 > candidato2){
        const candidatoVencedor = candidato3;
        const totalVencedorBrancos = candidatoVencedor + brancos;
        const porcentagemVencedorBrancos = (totalVencedorBrancos / totalVotos) * 100;
        console.log(`O vencedor foi o candidato ${nomeCandidato3} com um total de: ${totalVencedorBrancos} votos e uma porcentagem de: ${porcentagemVencedorBrancos}% (somado os votos em branco)`);
    }else{
        console.log(`A votação terminou empatada`);
    }


    console.log("============================");   
    console.log("Resultado final da votação");
    console.log(`Total de votos: ${totalVotos}`);
    console.log("===========================");
    console.log(`Votos ${nomeCandidato1}: ${candidato1} || ${porcentagemCandidato1}%`)
    console.log(`Votos ${nomeCandidato2}: ${candidato2} || ${porcentagemCandidato2}%`)
    console.log(`Votos ${nomeCandidato3}: ${candidato3} || ${porcentagemCandidato3}%`)
    console.log(`Votos Brancos: ${brancos} || ${porcentagemBrancos}%`)
    console.log(`Votos Nulos: ${nulos} || ${porcentagemNulos}%`)
    console.log("===========================");

}