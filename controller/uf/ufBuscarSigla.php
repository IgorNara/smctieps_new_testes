<?php
require_once("../../model/funcoesUtil.php");

$buscarUfPost = file_get_contents("php://input");
$buscarUf = json_decode($buscarUfPost, true);

if(empty($buscarUf) || is_null($buscarUf)){
    respostaJson(true, "Nenhuma UF foi inserida para a busca.");
}

$con = getConexao();

try{
    $sql = "SELECT * FROM uf WHERE uf.sigla = ?";

    $ps = $con->prepare($sql);

    $ps->bindParam(1, $buscarUf["sigla"]);

    $ps->execute();

    $buscarCidade = $ps->fetch(PDO::FETCH_ASSOC);

    respostaJson(false, "UF listada com sucesso.", $buscarUf);
}
catch(PDOException $erro){
    respostaJson(true, "Não foi possível buscar nenhuma UF.", ["erro"=>$erro->getMessage()]);
}
?>