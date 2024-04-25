<?php
require_once("../../model/funcoesUtil.php");

$nomeBairroPost = file_get_contents("php://input");
$nomeBairro = json_decode($nomeBairroPost, true);

if(empty($nomeBairro) || is_null($nomeBairro)){
    respostaJson(true, "Nenhum bairro foi recebido para a busca.");
}

$con = getConexao();

try{
    $sql = "SELECT * FROM bairro WHERE nome = ?";

    $ps = $con->prepare($sql);

    $ps->bindParam(1, $nomeBairro["nome"]);

    $ps->execute();

    $bairro = $ps->fetch(PDO::FETCH_ASSOC);

    respostaJson(false, "Bairro listado com sucesso.", $bairro)
}
catch(PDOException $erro){
    respostaJson(true, "Não foi possível buscar nenhum bairro.", ["erro" => $erro ->getMessage()]);
}
?>