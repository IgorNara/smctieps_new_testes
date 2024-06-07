<?php
require_once("../../model/funcoesUtil.php");

$cadastroPost = file_get_contents("php://input");
$cadastro = json_decode($cadastroPost, true);

if(empty($cadastro)){
    respostaJson(true, "Ninguém foi recebido para ser cadastrado.");
}
$con = getConexao();

try{
    $sql = "INSERT INTO usuario(nome, email, cpf, telefone, data_nascimento, endereco, senha, bairro_id, idade, situacao_emprego, beneficios_governo, genero, nome_social)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $ps = $con->prepare($sql);

    $ps->bindParam(1, $cadastro["nome"]);
    $ps->bindParam(2, $cadastro["email"]);
    $ps->bindParam(3, $cadastro["cpf"]);
    $ps->bindParam(4, $cadastro["telefone"]);
    $ps->bindParam(5, date( "Y-m-d", $cadastro["data_nascimento"]));
    $ps->bindParam(6, $cadastro["endereco"]);
    $ps->bindParam(7, password_hash($cadastro["senha"], PASSWORD_DEFAULT));
    $ps->bindParam(8, $cadastro["bairro_id"]);
    $ps->bindParam(9, $cadastro["idade"]);
    $ps->bindParam(10, $cadastro["situacao_emprego"]);
    $ps->bindParam(11, $cadastro["beneficios_governo"]);
    $ps->bindParam(12, $cadastro["genero"]);
    $ps->bindParam(13, $cadastro["nome_social"]);
    $ps->execute();

    respostaJson(false, "Usuário cadastrado com sucesso.", ["id"=>$con->lastInsertId()]);
}
catch(PDOException $erro){
    respostaJson(true, "Erro ao cadastrar usuário.", ["erro"=>$erro->getMessage()]);
}
?>