<?php
require_once "../../model/funcoesUtil.php";

$cadastroPost = file_get_contents("php://input");
$cadastro = json_decode($cadastroPost, true);

$nome = ($cadastro["nome"]) ? $cadastro["nome"] : "";
$email = ($cadastro["email"]) ? $cadastro["email"] : "";
$cpf = ($cadastro["cpf"]) ? $cadastro["cpf"] : "";
$telefone = ($cadastro["telefone"]) ? $cadastro["telefone"] : "";
$data = ($cadastro["data_nascimento"]) ? $cadastro["data_nascimento"] : "";
$endereco = ($cadastro["endereco"]) ? $cadastro["endereco"] : "";
$senha = ($cadastro["senha"]) ? $cadastro["senha"] : "";
$bairroId = ($cadastro["bairro_id"]) ? $cadastro["bairro_id"] : "";
$enderecoId = ($cadastro["endereco_id"]) ? $cadastro["endereco_id"] : "";
$idade = ($cadastro["idade"]) ? $cadastro["idade"] : "";
$emprego = ($cadastro["situacao_emprego"]) ? $cadastro["situacao_emprego"] : "";
$beneficio = ($cadastro["beneficios_governo"]) ? $cadastro["beneficios_governo"] : "";
$genero = ($cadastro["genero"]) ? $cadastro["genero"] : "";
$nomeSocial = ($cadastro["nome_social"]) ? $cadastro["nome_social"] : "";

if( $nome == "" || $email == "" || $cpf == "" || $telefone == "" || $data == "" || $senha == "" || $endereco == "" || $endereco_id == "" || $idade == "" || $emprego == "" || $beneficio == "" || $genero == "" || $nomeSocial == "")
    respostaJson(true, "Dados necessários não recebidos.", $cadastro);

$con = getConexao();

try{
    $sql = "INSERT INTO usuario(nome, email, cpf, telefone, data_nascimento, endereco, senha, bairro_id, endereco_id, idade, situacao_emprego, beneficios_governo, genero, nome_social)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $ps = $con->prepare($sql);

    $ps->bindParam(1, $nome);
    $ps->bindParam(2, $email);
    $ps->bindParam(3, $cpf);
    $ps->bindParam(4, $telefone);
    $ps->bindParam(5, date( "Y-m-d", $data));
    $ps->bindParam(6, $endereco);
    $ps->bindParam(7, password_hash($senha, PASSWORD_DEFAULT));
    $ps->bindParam(8, $endereco_id);
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