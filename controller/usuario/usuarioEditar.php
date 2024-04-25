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
            JOIN bairro ON("Centro"= bairro.nome)
            JOIN cidade ON(bairro.cidade_id = cidade.id)
            JOIN uf ON(cidade.uf_id = uf.id) 
            SET usuario.bairro_id = bairro.id WHERE usuario.id = 1 && cidade.nome = 'Cantagalo' && uf.sigla = 'RJ'";

    $ps = $con->prepare($sql);
    $ps->bindParam(1, $editar["bairro"]);
    $ps->bindParam(2, $editar["nome"]);
    $ps->bindParam(3, $editar["email"]);
    $ps->bindParam(4, $editar["cpf"]);
    $ps->bindParam(5, $editar["tefelone"]);
    $ps->bindParam(6, $editar["data_nascimento"]);
    $ps->bindParam(7, $editar["endereco"]);
    $ps->bindParam(8, $editar["id"]);
    
    
    $ps->execute();

    respostaJson(false, "Dados editados com sucesso", $editar);
    
}catch(PDOException $erro){
    respostaJson(true, "Não foi possível alterar os dados", ["erro" => $erro ->getMessage()]);
}

?>