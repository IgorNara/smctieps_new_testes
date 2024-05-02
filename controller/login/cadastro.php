<?php
require_once("../../model/funcoesUtil.php");

$cadastroPost = file_get_contents("php://input");
$cadastro = json_decode($cadastroPost, true);

if(empty($cadastro) || is_null($cadastro)){
    respostaJson(true, "Ninguém foi recebido para ser cadastrado.");
}
$con = getConexao();

try{
    $sql = "INSERT INTO usuario(nome, email, cpf, telefone, data_nascimento, endereco, senha, bairro_id)
       VALUES (?,?,?,?,?,?,?,?)";
    
    $ps = $con->prepare($sql);

    $ps->bindParam(1, $cadastro["nome"]);
    $ps->bindParam(2, $cadastro["email"]);
    $ps->bindParam(3, $cadastro["cpf"]);
    $ps->bindParam(4, $cadastro["telefone"]);
    $ps->bindParam(5, $cadastro["data_nascimento"]);
    $ps->bindParam(6, $cadastro["endereco"]);
    $ps->bindParam(7, $cadastro["senha"]);
    $ps->bindParam(8, $cadastro["bairro_id"]);

    $ps->execute();

    respostaJson(false, "Usuário cadastrado com sucesso.", $cadastro);
}
catch(PDOException $erro){
    respostaJson(true, "Erro ao cadastrar usuário.", ["erro" => $erro->getMessage()]);
}
?>