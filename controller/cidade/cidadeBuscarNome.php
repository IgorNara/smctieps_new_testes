<?php
require_once("../../model/funcoesUtil.php");

$buscarCidadePost = file_get_contents("php://input");
$buscarCidade = json_decode($buscarCidadePost, true);

if(empty($buscarCidade) || is_null($buscarCidade)){
    respostaJson(true, "Nenhuma cidade foi inserida para a busca.");
}

$con = getConexao();

try{
    $sql = "SELECT * FROM cidade WHERE cidade.nome = ?";

    $ps = $con->prepare($sql);

    $ps->bindParam(1, $buscarCidade["nome"]);

    $ps->execute();

    $buscarCidade = $ps->fetch(PDO::FETCH_ASSOC);

    respostaJson(false, "Cidade listada com sucesso.", $buscarCidade);
}
catch(PDOException $erro){
    respostaJson(true, "Não foi possível buscar nenhuma cidade.", ["erro"=>$erro->getMessage()]);
}
?>