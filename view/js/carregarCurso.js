import { fazFetch } from "./funcoesUtil.js";

(()=>{
    const params = new URLSearchParams(window.location.search);
    const nomeCurso = params.get('curso');
    
    document.querySelector("title").textContent = nomeCurso;

    buscarCurso(nomeCurso);
})()


async function buscarCurso(nomeCurso){
    // console.log(nomeCurso)
    fazFetch("POST", "../../controller/cursos/cursosBuscar.php", {"nome": nomeCurso})
    .then(resposta => {
        if(resposta.erro){
            throw new Error(resposta.msg);
        }
        carregarCurso(resposta.dados);
    })
    .catch(erro => {
        console.log(erro);
    })
    
    fazFetch("POST", "../../controller/cursos/cursosBuscarTurmas.php", {"nome": nomeCurso})
    .then(resposta =>{
        if(resposta.erro){
            throw new Error(resposta.msg);
        }
        carregarTurma(resposta.dados);
    })
    .catch(erro => {
        console.log(erro);
    })
}   


function carregarTurma(turmas){
    console.log(turmas);
    if(turmas.length > 1){
        criarCaixaTurmas(turmas);
    }
    else{
        const divInfoCurso = document.querySelector("#info_curso");
        
        const dias = document.querySelector("#curso_dias");
        dias.innerHTML = `<strong>Dias na semana: </strong> ${turmas[0].dias_de_aula}`;
    
        const horario = document.querySelector("#curso_horario");
        horario.innerHTML = `<strong>Horário(s): </strong> ${turmas[0].horario}`;
        
        const modalidade = document.querySelector("#modalidade");
        modalidade.innerHTML = `<strong>Modalidade: </strong> ${turmas[0].modalidade}`;

        const a = document.createElement("a");
        a.setAttribute("href", turmas[0].link_inscricao);

        const btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.classList = "btn btn-primary";
        btn.textContent = "Quero me matricular";

        a.appendChild(btn);
        divInfoCurso.appendChild(a);
    }
}   


function criarCaixaTurmas(turmas){
    const divTurmas = document.querySelector("#turmas");
    turmas.forEach(turma => {
        const divPai = document.createElement("div");
        divPai.classList = "col-md-6 col-lg-4 d-flex align-items-stretch";
        divPai.setAttribute("data-aos", "fade-up");
        divPai.setAttribute("data-aos-delay", "100");

        const divContent = document.createElement("div");
        divContent.classList = "icon-box icon-box-cyan";

        const h4 = document.createElement("h4");
        h4.setAttribute("class", "title");
        h4.textContent = turma.modalidade;

        const p = document.createElement("p");
        p.setAttribute("Align", "justify");
        p.setAttribute("class", "description");
        p.innerHTML = `<strong>Dias na semana: </strong> ${turma.dias_de_aula} <br> <strong>Horário(s): </strong> ${turma.horario}`;

        const a = document.createElement("a");
        a.setAttribute("href", turma.link_inscricao);

        const btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.classList = "btn btn-primary";
        btn.textContent = "Quero me inscrever nessa turma";

        const br = document.createElement("br");

        a.appendChild(btn);
        divContent.append(h4, p, br, a);
        divPai.appendChild(divContent);
        divTurmas.appendChild(divPai);
    });
}


function carregarCurso(curso){
    console.log(curso);
    const img = document.querySelector("#curso_img");
    img.setAttribute("src", curso.link_img);

    const nome = document.querySelector("#curso_nome");
    nome.textContent = curso.nome;
    
    const descricao = document.querySelector("#curso_descricao");
    descricao.textContent = curso.descricao;

    if(curso.duracao !== ""){
        const duracao = document.querySelector("#curso_duracao");
        duracao.innerHTML = `<strong>Duração: </strong> ${curso.duracao}`;
    }

    if(curso.nivel !== ""){
        const nivel = document.querySelector("#curso_nivel");
        nivel.innerHTML = `<strong>Nível: </strong> ${curso.nivel}`;
    }

    if(curso.requisitos !== ""){
        const requisitos = document.querySelector("#curso_requisitos");
        requisitos.innerHTML = `<strong>Requisitos: </strong> ${curso.requisitos}`;
    }

    
}