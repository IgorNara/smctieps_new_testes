import { fazFetch, msgErro } from "./funcoesUtil.js";

(()=>{ 
    document.querySelector("#btn-cadastro").addEventListener("click", function(){
        if(!verificaDadosCadastro()){
            return
        }
        fazFetch("POST", "../../controller/login/cadastro.php", dadosCadastro())
        .then(resposta => {
            if(resposta.erro){
                msgErro(resposta.msg);
                return;
            }
            window.location.href = "link para o perfil do usuario. o id dele ta dentro de {resposta.dados.id}";
        })
        .catch(erro => {
            console.log(erro);
        })
    })
    
})() 

function verificaDadosCadastro(){
    //código pra verificar se todos os campos foram preenchidos
}


function dadosCadastro(){
    return{
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
        "situacao-emprego": document.querySelector("input[name='situacao-emprego-usuario']:checked").value == "sim"?true:false,
        "beneficios-governo": document.querySelector("input[name='beneficios-governo-usuario']:checked").value == "sim"?true:false,
        "genero": document.querySelector("input[name='genero']:checked").value,
        "nome_social": document.querySelector("#nome-social").value
    }
} 
  