import { fazFetch, msgErro } from "./funcoesUtil.js";

(() => {
    document.querySelector("#btn-cadastro").addEventListener("click", function () {
        
        if (!verificaDadosCadastro()) {
            return
        }
        fazFetch("POST", "../../controller/login/cadastro.php", dadosCadastro())
            .then(resposta => {
                if (resposta.erro) {
                    msgErro(resposta.msg);
                    return;
                }
                window.location.href = (`http://localhost/projetos/PMNF/smctieps_newmod/smctieps_new_testes/perfil.html?id=${resposta.dados.id}`);
            })
            .catch(erro => {
                console.log(erro);
            })
    })

})()

function verificaDadosCadastro(nome,email,idade,cpf,telefone,dataNascimento,cep,endereco,senha,confirmaSenha,situacaoEmprego,beneficiosGoverno,genero,nomeSocial) {
    //código pra verificar se todos os campos foram preenchidos
    const campos = [nome =! "nome_usuario"  && email != "email-usuario" && idade != "idade-usuario" && cpf != "cpf-usuario" && telefone != "telefone-usuario" && dataNascimento != "data-nascimento-usuario" && cep != "cep-usuario" && endereco != "endereco-usuario" &&  senha !=  "senha-usuario" && confirmaSenha != "confirmar-senha" && situacaoEmprego != "situacao-emprego-usuario" && beneficiosGoverno != "beneficios-governo-usuario" && genero != "genero" && nomeSocial != "nome-social"];
    for (let campo of campos) {
        if (campo  && !document.querySelector("#campo").value) {
            return false;
        }
    }
    return true;
}
function dadosCadastro() {
    return {
        "nome": document.querySelector("#nome_usuario").value,
        "email": document.querySelector("#email-usuario").value,
        "idade": document.querySelector("#idade-usuario").value,
        "cpf": document.querySelector("#cpf-usuario").value,
        "telefone": document.querySelector("#telefone-usuario").value,
        "dataNascimento": document.querySelector("#data-nascimento-usuario").value,
        "cep": document.querySelector("#cep-usuario").value,
        "endereco": document.querySelector("#endereco-usuario").value,
        "senha": document.querySelector("#senha-usuario").value,
        "confirmaSenha": document.querySelector("#confirmar-senha").value,
        "situacao-emprego": document.querySelector("input[name='situacao-emprego-usuario']:checked").value == "sim" ? true : false,
        "beneficios-governo": document.querySelector("input[name='beneficios-governo-usuario']:checked").value == "sim" ? true : false,
        "genero": document.querySelector("input[name='genero']:checked").value,
        "nome_social": document.querySelector("#nome-social").value
    }
}
verificaDadosCadastro(dadosCadastro)

