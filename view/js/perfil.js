import { fazFetch, msgErro } from "./funcoesUtil.js";


(async () => {
    const params = new URLSearchParams(window.location.search);
    const idUser = params.get('id');

    if(idUser){
        await verificaUser(idUser);
    }

    document.querySelector("#editarPerfil").addEventListener("click", modalEditarPerfil)
})()


function modalEditarPerfil(){
    
}


function verificaUser(idUser){
    fazFetch("GET", "../../controller/login/logado.php")
    .then(resposta => {
        if(resposta.erro || resposta.dados.id != idUser){
            window.location.href = "http://localhost/minhaspastas/estagio/smctieps_new_testes/view/template/login.html";
        }
        else{
            buscarUsuario(resposta.dados);
        }
    })
    .catch(erro => {
        console.log(erro);
    })
}


function buscarUsuario(user){
    fazFetch("POST", "../../controller/usuario/usuarioBuscarId.php", {"id": user.id})
    .then(resposta => {
        if(resposta.erro){
            msgErro(resposta.msg);
        }
        else{
            carregaUser(resposta.dados);
        }
    })
    .catch(erro => {
        console.log(erro);
    })
}


function carregaUser(dadosUser){
    console.log(dadosUser)
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