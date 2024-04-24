import { fazFetch, msgErro } from "./funcoesUtil.js";


(async () => {
    const params = new URLSearchParams(window.location.search);
    const idUser = params.get('id');

    if(idUser){
        await verificaUser(idUser);
    }
})()


function verificaUser(idUser){
    fazFetch("GET", "../../controller/login/logado.php")
    .then(resposta => {
        if(resposta.dados.id == idUser){
            buscarUsuario(resposta.dados);
        }
        else{
            window.location.href = "http://localhost/minhaspastas/estagio/smctieps_new_testes/view/template/login.html";
        }
    })
    .catch(erro => {
        console.log(erro);
    })
}


function buscarUsuario(user){
    fazFetch("POST", "../../controller/usuarios/usuariosBuscar.php", {"id": user.id})
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


/* <div class="row">
    <div class="col-sm-3">
    <p class="mb-0">Nome completo:</p>
    </div>
    <div class="col-sm-9">
    <p class="text-muted mb-0">Johnatan Smith</p>
    </div>
</div>
<hr></hr> */

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