<?php
require_once("../../model/funcoesUtil.php");

$inserirCidade = file_get_contents("php://input");
$cidade = json_decode($inserirCidade, true);

if(empty($cidade) || is_null($cidade)){
    respostaJson(true, "Nenhuma cidade foi recebida para ser inserida.");
}
$con = getConexao();

try{  
    $sql = "INSERT INTO cidade (nome, uf_id)
    VALUES (?, ?)";

    $ps = $con->prepare($sql);
    $ps->bindParam(1, $cidade["nome"]);
    $ps->bindParam(2, $cidade["uf_id"]);
    $ps->execute();

    respostaJson(false, "Cidade inserida com sucesso.");
}
catch(PDOException $erro){
    respostaJson(true, "Não foi possível inserir a cidade.");
}
?>