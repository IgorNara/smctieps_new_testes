<?php
    require_once("../../model/funcoesUtil.php");

    $bairroPost = file_get_contents("php://input");
    $bairro = json_decode($bairroPost, true);

    if(empty($bairro) || is_null($bairro)){
        respostaJson(true, "Nenhum bairro foi recebido para a busca.");
    }

    $con = getConexao();

    try{
        $sql = "";
    }
    catch(PDOException $erro){
        respostaJson(true, "Erro ao listar bairro.", ["erro"=>$erro->getMessage()]);
    }

?>