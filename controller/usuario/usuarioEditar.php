<?php

require_once("../../model/funcoesUtil.php");

$editarDadosPost = file_get_contents("php://input");
$editar = json_decode($editarDadosPost, true);

if(empty($editar) || is_null($editar)){
    respostaJson(true, "Nenhum dado foi recebido para ser editado");
}

$con = getConexao();

try{
    $sql = "UPDATE usuario 
            JOIN bairro ON(? = bairro.nome)
            JOIN cidade ON(bairro.cidade_id = cidade.id)
            JOIN uf ON(cidade.uf_id = uf.id) 
            SET usuario.bairro_id = bairro.id, usuario.nome = ?, usuario.email = ?, usuario.cpf = ?, usuario.telefone = ?, 
                usuario.data_nascimento = ?, usuario.endereco = ?
            WHERE usuario.id = 1 && cidade.nome = ? && uf.sigla = ?";

    $ps = $con->prepare($sql);
    $ps->bindParam(1, $editar["bairro"]);
    $ps->bindParam(2, $editar["nome"]);
    $ps->bindParam(3, $editar["email"]);
    $ps->bindParam(4, $editar["cpf"]);
    $ps->bindParam(5, $editar["tefelone"]);
    $ps->bindParam(6, $editar["data_nascimento"]);
    $ps->bindParam(7, $editar["endereco"]);
    $ps->bindParam(8, $editar["cidade"]);
    $ps->bindParam(9, $editar["uf"]);
    
    $ps->execute();

    respostaJson(false, "Dados editados com sucesso", $editar);    
}
catch(PDOException $erro){
    respostaJson(true, "Não foi possível alterar os dados do usuário.", ["erro" => $erro ->getMessage()]);
}

?>