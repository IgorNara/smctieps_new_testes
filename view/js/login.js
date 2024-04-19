import { fazFetch, msgErro } from "./funcoesUtil.js";

(() => {
    document.querySelector("#btn-login").addEventListener("click", function(event){
        event.preventDefault();
        const camposLogin = verificaCamposLogin();
        if(camposLogin){
            verificaLogin(camposLogin);
        }
        else{
            msgErro("Preencha todos os campos.");
        }
    });
})()


function verificaCamposLogin(){
    let user = document.querySelector("#username").value;
    let senha = document.querySelector("#password").value;
    let campos = {
        "user": user?user:null,
        "senha": senha?senha:null
    }
    if(campos.user != null && campos.senha != null){
        return campos;
    }
    return false;
}


function verificaLogin(campos){
    fazFetch("POST", "../../controller/login/login.php", campos)
    .then(resposta => {
        console.log(resposta);
        if(resposta.erro){
            msgErro(resposta.msg);
        }
        else{
            window.location.href = `http://localhost/minhasPastas/estagio/smctieps_new_testes/view/template/perfil.html?id=${resposta.dados.id}`;
        }
    })
    .catch(erro => {
        console.log(erro);
    })
}