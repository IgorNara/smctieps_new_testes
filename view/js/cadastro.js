import { fazFetch, msgErro } from "./funcoesUtil.js";
import { buscarCep } from "./buscarCep.js"


(() => {
    const elementCep = document.querySelector("#cep-usuario");
    elementCep.addEventListener("change", (event) => {
        event.preventDefault()
        let cep = elementCep.value;
        if (cep.length == 9) {
            const modal = document.querySelector("#modalCarregamento");
            modal.showModal();
            buscarCep(cep, modal);
        }
        else {
            msgErro("CEP incompleto.");
        }
    })

    elementCep.addEventListener("keydown", (event) => {
        if (elementCep.value.length == 5 && !(event.key == 'Backspace')) {
            elementCep.value += "-";
        }
    })

    document.querySelector("#btn-cadastro").addEventListener("click", function () {
        const dadosUsuario = dadosCadastro()


        console.log(dadosUsuario.senha, "Senha")
        console.log(dadosUsuario.confirmaSenha, "Confirmar senha")
        if (dadosUsuario.senha !== dadosUsuario.confirmaSenha) {
            alert('Senhas diferentes');
            console.log('Senha diferente')
            return
        }

        if (!verificaDadosCadastro(dadosUsuario)) {
            return
        }

        fazFetch("POST", "../../controller/login/cadastro.php", dadosCadastro())
            .then(resposta => {
                if (resposta.erro) {
                    msgErro(resposta.msg);
                    return;
                }
                // window.location.href = (`http://localhost/projetos/PMNF/smctieps_newmod/smctieps_new_testes/perfil.html?id=${resposta.dados.id}`);
            })
            .catch(erro => {
                console.log(erro);
            })

    })
})()

function verificaDadosCadastro({ nome, email, idade, cpf, telefone, dataNascimento, cep, endereco, senha, confirmaSenha, situacaoEmprego, beneficiosGoverno, genero, nomeSocial }) {
    //código pra verificar se todos os campos foram preenchidos
    return (
        nome != "" &&
        email != "" &&
        idade != "" &&
        cpf != "" &&
        telefone != "" &&
        dataNascimento != "" &&
        cep != "" &&
        endereco != "" &&
        senha != "" &&
        confirmaSenha != "" &&
        situacaoEmprego != "" &&
        beneficiosGoverno != "" &&
        genero != "" &&
        nomeSocial != ""
    );

}

function dadosCadastro() {
    return {
        "nome": document.querySelector("#nome-usuario").value,
        "email": document.querySelector("#email-usuario").value,
        "idade": document.querySelector("#idade-usuario").value,
        "cpf": document.querySelector("#cpf-usuario").value,
        "telefone": document.querySelector("#telefone-usuario").value,
        "dataNascimento": document.querySelector("#data-nascimento").value,
        "cep": document.querySelector("#cep-usuario").value,
        "endereco": document.querySelector("#endereco-usuario").value,
        "senha": document.querySelector("#senha-usuario").value,
        "confirmaSenha": document.querySelector("#confirmar-senha").value,
        "situacao_emprego": document.querySelector("input[name='situacao-emprego-usuario']:checked") ? (document.querySelector("input[name='situacao-emprego-usuario']:checked").value == "sim" ? true : false) : "",
        "beneficios_governo": document.querySelector("input[name='beneficios-governo-usuario']:checked") ? (document.querySelector("input[name='beneficios-governo-usuario']:checked").value == "sim" ? true : false) : "",
        "genero": document.querySelector("input[name='genero']:checked") ? document.querySelector("input[name='genero']:checked").value : "",
        "nome_social": document.querySelector("#nome-social").value
    }
}


