const { error } = require("console");

document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtém os valores do formulário
    const nome = document.getElementById('nome').value.toUpperCase();
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const tipo = document.getElementById('tipo').value;
  
    // Cria o objeto do ativo
    const ativo = { nome, ticker, tipo };
  
    // Envia o ativo para o backend usando fetch
    fetch('http://localhost:3000/ativos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ativo)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar o ativo');
        }
        return response.json();
    })
    .then(data => {
        console.log('Ativo cadastrado com sucesso!', data);
  
    // Adiciona o ativo na lista para visualização
    const listaAtivos = document.getElementById('lista-ativos');
    const item = document.createElement('li');
    item.textContent = `${nome} (${ticker}) - ${tipo}`;
    listaAtivos.appendChild(item);
  
    // Limpa o formulário
    document.getElementById('form-cadastro').reset();
  })
  .catch(error => {
    console.error('Erro: ', error);
    alert('Ocorreu um erro ao cadastrar o ativo. Tente novamente.');
  });
});
  