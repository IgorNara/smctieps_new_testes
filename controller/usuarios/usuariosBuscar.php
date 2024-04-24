<?php
    require_once("../../model/funcoesUtil.php");

    $idUserPost = file_get_contents("php://input");
    $idUser = json_decode($idUserPost, true);

    if(empty($idUser) || is_null($idUser)){
        respostaJson(true, "Nenhum usuário foi selecionado para busca.");
    }

    $con = getConexao();

    try{
        $sql = "SELECT usuario.nome, usuario.email AS Email, usuario.cpf AS CPF, usuario.telefone AS Telefone, 
                usuario.data_nascimento AS 'Data de nascimento', usuario.endereco AS 'Endereço', bairro.nome AS Bairro, cidade.nome AS Cidade, 
                uf.sigla AS UF, bairro.cep AS CEP
                FROM usuario JOIN bairro ON(bairro.id = usuario.bairro_id)
                JOIN cidade ON(cidade.id = bairro.cidade_id)
                JOIN uf ON(uf.id = cidade.uf_id)
                WHERE usuario.id = ?";

        $ps = $con->prepare($sql);
        $ps->bindParam(1, $idUser["id"]);
        $ps->execute();

        $user = $ps->fetch(PDO::FETCH_ASSOC);

        respostaJson(false, "Informações carregadas com sucesso!", $user);
    }
    catch(PDOException $erro){
        respostaJson(true, "Não foi possível carregar as informações do usuário.", ["erro"=>$erro->getMessage()]);
    }

?>