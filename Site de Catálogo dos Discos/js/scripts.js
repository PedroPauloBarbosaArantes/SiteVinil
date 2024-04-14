let listaDeDisco = [];
let indiceEdicao = -1;

function limpaCampos(){
    document.getElementById('title').value = '';
    document.getElementById('artist').value = '';
    document.getElementById('year').value = '';
    document.getElementById('image').value = '';
    document.getElementById('songs').value = '';
}

function adicionarDisco() {
    let titulo = document.getElementById('title').value;
    let artista = document.getElementById('artist').value;
    let ano = document.getElementById('year').value;
    let imagem = document.getElementById('image').files[0];
    let musicas = document.getElementById('songs').value.split('\n').map(musica => musica.trim());

    if(indiceEdicao >= 0){
        let disco = listaDeDisco[indiceEdicao];
        disco.titulo = titulo;
        disco.artista = artista;
        disco.ano = ano;

        if (imagem) {
            disco.imagem = imagem;
        }
        disco.musicas = musicas;
    }else{
        listaDeDisco.push(
            {'titulo': titulo, 'artista': artista, 'ano': ano, 'imagem': imagem, 'musicas': musicas}
        );
    }

    limpaCampos();
    atualizarListaDeDiscos();

    indiceEdicao = -1;
}

function editarDisco(indice){
    indiceEdicao = indice;
    let disco = listaDeDisco[indice];

    document.getElementById('title').value = disco.titulo;
    document.getElementById('artist').value = disco.artista;
    document.getElementById('year').value = disco.ano;
    document.getElementById('songs').value = disco.musicas.join('\n');
}

function excluirDisco(indice) {
    let disco = listaDeDisco[indice];

    if (confirm(`Tem certeza que deseja excluir o item ${disco.titulo}`)) {
        listaDeDisco.splice(indice, 1);
        atualizarListaDeDiscos();
    }
}

function pesquisarDisco() {
    let pesquisa = document.getElementById('searchInput').value;
    let discoEncontrado = listaDeDisco.find(disco => 
        (pesquisa.trim().toLowerCase() === disco.titulo.trim().toLowerCase()) || 
        (pesquisa.trim().toLowerCase() === disco.artista.trim().toLowerCase())
    );

    if (discoEncontrado) {
        console.log(`Disco encontrado: ${JSON.stringify(discoEncontrado)}`);
    } else {
        console.log('Disco não encontrado');
    }
}


function atualizarListaDeDiscos() {
    recordList.innerHTML = '';

    listaDeDisco.forEach((disco, indice) => {
        let section = document.createElement('section');

        section.innerHTML = `
        <div class="recordItem vinilCaixa fonteCaixa">
            <img src="${URL.createObjectURL(disco.imagem)}" alt="${disco.titulo}">
            <div class="recordInfo">
                <strong>Título:</strong> ${disco.titulo} <br>
                <strong>Artista:</strong> ${disco.artista} <br>
                <strong>Ano:</strong> ${disco.ano} <br>
                <h4>
                    ${disco.musicas.map(musica => `<li>${musica}</li>`).join('')}<br>
                </h4>
                <button
                    type="button"
                    onclick="editarDisco(${indice})"
                    class="editButton">Editar
                </button>

                <button 
                    type="button"
                    onclick="excluirDisco(${indice})"
                    class="deletButton">Deletar
                </button>
            </div>
        </div>        
        `;

        recordList.appendChild(section);
    });
}