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

    console.log("Votação encerrada!!!")
}