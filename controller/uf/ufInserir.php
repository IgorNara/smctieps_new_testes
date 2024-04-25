<?php
require_once("../../model/funcoesUtil.php");

$ufPost = file_get_contents("php://input");
$uf = json_decode($ufPost, true);

if(empty($) || is_null($uf)){
    respostaJson(true, "Nenhuma UF foi recebido para ser inserido.");
}
$con = getConexao();

try{  
    $sql = "INSERT INTO uf(sigla)
    VALUES (?)";

    $ps = $con->prepare($sql);
    $ps->bindParam(1, $bairro["sigla"]);

    $ps->execute();

    respostaJson(false, "UF inserida com sucesso.", $uf)
}
catch(PDOException $erro){
    respostaJson(true, "Não foi possível inserir a UF.", ["erro" => $erro ->getMessage()]);
}
?>