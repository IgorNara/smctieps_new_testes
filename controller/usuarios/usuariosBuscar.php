<?php
    require_once("../../model/funcoesUtil.php");

    $idUserPost = file_get_contents("php://input");
    $idUser = json_decode($idUserPost, true);

    if(empty($idUser) || is_null($idUser)){
        respostaJson(true, "Nenhum usuário foi selecionado para busca.");
    }

    $con = getConexao();

    try{
        $sql = "SELECT * FROM usuarios WHERE usuario.id = ?";

        $ps = $con->prepare($sql);
        $ps->bindParam(1, $idUser["id"]);
        $ps->execute();

        $user = $ps->fetch(PDO::FETCH_ASSOC);

        respostaJson(false, "Informações carregadas com sucesso!", $user);
    }
    catch(PDOException $erro){
        respostaJson(true, "Não foi possível carregar as informações do usuário.");
    }

?>