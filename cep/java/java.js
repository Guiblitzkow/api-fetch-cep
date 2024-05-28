let enderecosSalvos = [];

function adicionarEndereco(endereco) {
    enderecosSalvos.push(endereco);
    exibirEnderecosSalvos();
}

function exibirEnderecosSalvos() {
    let listaEnderecos = document.getElementById('listaEnderecos');
    listaEnderecos.innerHTML = '';
    enderecosSalvos.forEach(function(endereco, indice) {
        let li = document.createElement('li');
        li.classList.add('endereco');

        let cep = document.createElement('p');
        cep.textContent = `CEP: ${endereco.cep}`;
        li.appendChild(cep);

        let logradouro = document.createElement('p');
        logradouro.textContent = `Logradouro: ${endereco.logradouro}`;
        li.appendChild(logradouro);

        let bairro = document.createElement('p');
        bairro.textContent = `Bairro: ${endereco.bairro}`;
        li.appendChild(bairro);

        let cidade = document.createElement('p');
        cidade.textContent = `Cidade: ${endereco.cidade}`;
        li.appendChild(cidade);

        let uf = document.createElement('p');
        uf.textContent = `Estado: ${endereco.uf}`;
        li.appendChild(uf);

        let btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = function() {
            excluirEndereco(indice);
        };

        li.appendChild(btnExcluir);
        listaEnderecos.appendChild(li);
        
        if (indice % 2 !== 0) {
            li.classList.add('direita');
        }
    });
    
    let btnSalvar = document.getElementById('salvar-btn');
    btnSalvar.disabled = enderecosSalvos.length === 0;
}

function excluirEndereco(indice) {
    if (indice >= 0 && indice < enderecosSalvos.length) {
        enderecosSalvos.splice(indice, 1);
        exibirEnderecosSalvos();
    }
}

function salvarEndereco() {
    // Obter os dados do endereço a partir do resultado exibido
    let cep = document.querySelector('#resultado p:nth-child(1)').textContent.split(': ')[1];
    let logradouro = document.querySelector('#resultado p:nth-child(2)').textContent.split(': ')[1];
    let bairro = document.querySelector('#resultado p:nth-child(3)').textContent.split(': ')[1];
    let cidade = document.querySelector('#resultado p:nth-child(4)').textContent.split(': ')[1];
    let uf = document.querySelector('#resultado p:nth-child(5)').textContent.split(': ')[1];
    
    let endereco = {
        cep: cep,
        logradouro: logradouro,
        bairro: bairro,
        cidade: cidade,
        uf: uf
    };
    
    adicionarEndereco(endereco);
}

function consultaEndereco() {
    let cep = document.querySelector('#cep').value;
    if (!cep || cep.length !== 8) {
        alert('CEP Inválido!');
        return;
    }

    let URL = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            let resultadoDiv = document.querySelector('#resultado');
            resultadoDiv.innerHTML = `
                <p>CEP: ${data.cep}</p>
                <p>Logradouro: ${data.logradouro}</p>
                <p>Bairro: ${data.bairro}</p>
                <p>Cidade: ${data.localidade}</p>
                <p>Estado: ${data.uf}</p>
            `;

            // Ativar o botão "Salvar" após a consulta
            let btnSalvar = document.getElementById('salvar-btn');
            btnSalvar.disabled = false;
        })
        .catch(function(error) {
            console.error('Erro ao consultar o CEP:', error);
        });
}
