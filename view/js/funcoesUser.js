import { fazFetch } from "./funcoesUtil.js";


function verificaUser(idUser){
    let dados = fazFetch("GET", "../../controller/login/logado.php")
    .then(resposta => {
        if(resposta.erro || resposta.dados.id != idUser){
            window.location.href = "http://localhost/projetos/PMNF/smctieps_newmod/smctieps_new_testes/view/template/login.html";
        }
        return resposta.dados;
    })
    .catch(erro => {
        console.log(erro);
    })
    return dados;
}


function buscarUsuario(user){
    let usuario = fazFetch("POST", "../../controller/usuario/usuarioBuscarId.php", {"id": user.id})
    .then(resposta => {
        if(resposta.erro){
            window.location.href = "http://localhost/projetos/PMNF/smctieps_newmod/smctieps_new_testes/view/template/login.html";
        }
        return resposta.dados;
    })
    .catch(erro => {
        console.log(erro);
    })

    return usuario;
}


export { verificaUser, buscarUsuario }