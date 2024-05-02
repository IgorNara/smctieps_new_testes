import { fazFetch, msgErro } from "./funcoesUtil.js";


(() => {
    verificaSeExisteUser();
})()


function verificaSeExisteUser(){
    fazFetch("GET", "controller/login/logado.php")
    .then(resposta => {
        const btn = document.querySelector("#login_perfil");
        if(resposta.erro){
            btn.textContent = "Login";
            btn.setAttribute("href", "view/template/login.html")
        }
        else{
            btn.textContent = "Perfil";
            btn.setAttribute("href", `view/template/perfil.html?id=${resposta.dados.id}`);
        }
    })
    .catch(erro => {
        console.log(erro);
    })
}

