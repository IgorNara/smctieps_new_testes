import { fazFetch, msgErro } from "./funcoesUtil.js";
import { verificaUser, buscarUsuario } from "./perfil.js";

(async () => {
    const params = new URLSearchParams(window.location.search);
    const idUser = params.get('id');

    if(!idUser){
        window.location.href = `http://localhost/projetos/PMNF/smctieps_newmod/smctieps_new_testes/view/template/login.html`;
    }
    verificaUser(idUser)
    .then(resposta => buscarUsuario(resposta))
    .then(resposta => preencherHtml(resposta))
})()

function preencherHtml(dadosUser){
    console.log(dadosUser);
    const topicos = Object.keys(dadosUser);
    const valores = Object.values(dadosUser);

    valores.forEach((valor, index) => {
        let elemento = document.querySelector("#" + topicos[index]);
        if(elemento) {
            elemento.textContent = valor;
        }
    });
}

