<?php
require_once("../../model/funcoesUtil.php");

$cadastroPost = file_get_contents("php://input");
$cadastro = json_decode($cadastroPost, true);

$nome = isset($cadastro["nome"]) ? $cadastro["nome"] : "";
$email = isset($cadastro["email"]) ? $cadastro["email"] : "";
$cpf = isset($cadastro["cpf"]) ? $cadastro["cpf"] : "";
$telefone = isset($cadastro["telefone"]) ? $cadastro["telefone"] : "";
$data = isset($cadastro["data_nascimento"]) ? $cadastro["data_nascimento"] : "";
$endereco = isset($cadastro["endereco"]) ? $cadastro["endereco"] : "";
$senha = isset($cadastro["senha"]) ? $cadastro["senha"] : "";
$bairroId = isset($cadastro["bairro_id"]) ? $cadastro["bairro_id"] : "";
$idade = isset($cadastro["idade"]) ? $cadastro["idade"] : "";
$emprego = isset($cadastro["situacao_emprego"]) ? $cadastro["situacao_emprego"] : "";
$beneficio = isset($cadastro["beneficios_governo"]) ? $cadastro["beneficios_governo"] : "";
$genero = isset($cadastro["genero"]) ? $cadastro["genero"] : "";
$nomeSocial = isset($cadastro["nome_social"]) ? $cadastro["nome_social"] : "";

if( $nome == "" || $email == "" || $cpf == "" || $telefone == "" || $data == "" || $endereco == "" || $senha == "" || $bairroId == "" || $idade == "" || $emprego == "" || $beneficio == "" || $genero == "")
    respostaJson(true, "Dados necessários não recebidos.", $cadastro);

$con = getConexao();

try{
    $sql = "INSERT INTO usuario(nome, email, cpf, telefone, data_nascimento, endereco, senha, bairro_id, idade, situacao_emprego, beneficios_governo, genero, nome_social)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $ps = $con->prepare($sql);

    $ps->bindParam(1, $nome);
    $ps->bindParam(2, $email);
    $ps->bindParam(3, $cpf);
    $ps->bindParam(4, $telefone);
    $ps->bindParam(5, date( "Y-m-d", $data));
    $ps->bindParam(6, $endereco);
    $ps->bindParam(7, password_hash($senha, PASSWORD_DEFAULT));
    $ps->bindParam(8, $bairroId);
    $ps->bindParam(9, $idade);
    $ps->bindParam(10, $emprego);
    $ps->bindParam(11, $beneficio);
    $ps->bindParam(12, $genero);
    $ps->bindParam(13, $nomeSocial);
    $ps->execute();

    respostaJson(false, "Usuário cadastrado com sucesso.", ["id"=>$con->lastInsertId()]);
}
catch(PDOException $erro){
    respostaJson(true, "Erro ao cadastrar usuário.", ["erro"=>$erro->getMessage()]);
}
?>