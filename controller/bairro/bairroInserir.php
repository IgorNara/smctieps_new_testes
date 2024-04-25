<?php
require_once("../../model/funcoesUtil.php");

$bairroPost = file_get_contents("php://input");
$bairro = json_decode($bairroPost, true);

if(empty($bairro) || is_null($bairro)){
    respostaJson(true, "Nenhum bairro foi recebido para ser inserido.");
}
$con = getConexao();

try{  
    $sql = "INSERT INTO bairro(nome, cep, cidade_id)
    VALUES (?, ?, ?)";

    $ps = $con->prepare($sql);
    $ps->bindParam(1, $bairro["nome"]);
    $ps->bindParam(2, $bairro["cep"]);
    $ps->bindParam(3, $bairro["cidade_id"]);

    $ps->execute();

    respostaJson(false, "Bairro inserido com sucesso.", $bairro)
}
catch(PDOException $erro){
    respostaJson(true, "Não foi possível inserir o bairro.", ["erro" => $erro ->getMessage()]);
}
?>