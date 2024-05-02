import { fazFetch, msgErro } from "./funcoesUtil.js";
import { verificaUser, buscarUsuario } from "./funcoesUser.js";


(async () => {
    const params = new URLSearchParams(window.location.search);
    const idUser = params.get('id');

    if(!idUser){
        window.location.href = `http://localhost/projetos/PMNF/smctieps_newmod/smctieps_new_testes/view/template/login.html`;
    }
    document.querySelector("#editarPerfil").addEventListener("click", function(){
        window.location.href = `http://localhost/projetos/PMNF/smctieps_newmod/smctieps_new_testes/view/template/perfilEditar.html?id=${idUser}`;
    })

    verificaUser(idUser)
    .then(resposta => buscarUsuario(resposta))
    .then(resposta => carregaUser(resposta))    
})()


function carregaUser(dadosUser){
    const topicos = Object.keys(dadosUser);
    const valores = Object.values(dadosUser);

    valores.forEach((valor, index) => {
        if(topicos[index] == "nome"){
            document.querySelector("#nome").textContent = valor;
            return;
        }
        criaHtml(topicos[index], valor, index, topicos.length);
    });
}


function criaHtml(topico, valor, index, qtdTopicos){
    const divInfoPerfil = document.querySelector("#info-perfil");
    const divPai = document.createElement("div");
    divPai.setAttribute("class", "row");
    
    const divTopico = document.createElement("div");
    divTopico.setAttribute("class", "col-sm-3");
    
    const pTopico = document.createElement("p");
    pTopico.setAttribute("class", "mb-0");
    pTopico.textContent = topico + ": ";

    const divValor = document.createElement("div");
    divValor.setAttribute("class", "col-sm-9");
    
    const pValor = document.createElement("p");
    pValor.setAttribute("class", "text-muted mb-0");
    pValor.textContent = valor;

    const hr = document.createElement("hr");

    divTopico.appendChild(pTopico);
    divValor.appendChild(pValor);
    divPai.append(divTopico, divValor);
    if(qtdTopicos - 1 == index){
        divInfoPerfil.append(divPai);
    }
    else{
        divInfoPerfil.append(divPai, hr);
    }
}


export { verificaUser, buscarUsuario}