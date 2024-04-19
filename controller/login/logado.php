<?php
    require_once("../../model/funcoesUtil.php");

    session_set_cookie_params(['httponly' => true]);

    session_start();

    session_regenerate_id(true); 

    if(!isset($_SESSION["id_user"]) && !isset($_SESSION["usuario"])){
        respostaJson(true, "AÇÃO RESTRITA - USUÁRIO NÃO PERMITIDO");
    }
    else{
        $usuario = [
            "id"=> $_SESSION["id_user"],
            "usuario"=> $_SESSION["usuario"]
        ];
        respostaJson(false, "Usuário logado.", $usuario);
    }

?>