import { fazFetch, msgErro } from "./funcoesUtil.js"


function buscarCep(cep, modal) {
    fazFetch("GET", `https://viacep.com.br/ws/${cep}/json/`)
        .then(async resposta => {
            if (resposta.erro) {
                msgErro("CEP não encontrado");
            }
            else {
                await preencheHtml(resposta);
            }
            modal.close();
        }).catch(erro => {
            modal.close();
            msgErro(erro.textContent)
        })
}


function preencheHtml(dados) {
    document.querySelector("#uf-usuario").value = dados.uf;
    document.querySelector("#uf-usuario").readOnly = true;
    document.querySelector("#cidade-usuario").value = dados.localidade;
    document.querySelector("#cidade-usuario").readOnly = true;
    document.querySelector("#bairro-usuario").value = dados.bairro;
    document.querySelector("#complemento-usuario").value = dados.complemento;
}

export { buscarCep }