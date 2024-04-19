import { fazFetch, msgErro } from "./funcoesUtil.js";

/* <div class="row">
    <div class="col-sm-3">
    <p class="mb-0">Nome completo:</p>
    </div>
    <div class="col-sm-9">
    <p class="text-muted mb-0">Johnatan Smith</p>
    </div>
</div>
<hr></hr> */

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
        
    })
    .catch(erro => {
        console.log(erro);
    })
}



 

