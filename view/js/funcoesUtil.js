async function fazFetch(metodo, url, dados = null) {
  let configMetodo = null;
  if (metodo !== "GET") {
    configMetodo = {
      method: metodo,
      body: JSON.stringify(dados),
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    };
  }

  const meuFetch = await fetch(url, configMetodo)
    .then(resposta => verificaErro(resposta))
    .then(resposta => resposta.json())

  return meuFetch
}

function msgErro(msg) {
  const spanMsg = document.querySelector("#msg");
  spanMsg.classList = "msg-erro";
  spanMsg.textContent = msg;
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

}

function verificaErro(resposta) {
  // console.log(resposta);
  if (!resposta.ok) {
    throw new Error("Erro ao fazer requisição: " + resposta.status + " - " + resposta.statusText);
  }
  return resposta;
}

export { fazFetch, msgErro }