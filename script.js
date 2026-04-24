const livros = [
  { id: 1, titulo: "Dom Casmurro", preco: 35.0 },
  { id: 2, titulo: "Clean Code", preco: 50.0 },
  { id: 3, titulo: "O Alquimista", preco: 42.0 },
  { id: 4, titulo: "JavaScript Eloquente", preco: 75.0 },
];

let carrinho = [];
let total = 0;

const listaLivrosHtml = document.getElementById("lista-livros");
const itensCarrinhoHtml = document.getElementById("itens-carrinho");
const valorTotalHtml = document.getElementById("valor-total");
const btnLimpar = document.getElementById("btn-limpar");
const btnFinalizar = document.getElementById("btn-finalizar");

function carregarCatalogo() {
  livros.forEach((livro) => {
    const div = document.createElement("div");
    div.classList.add("livros");

    div.innerHTML = `
      <h3>${livro.titulo}</h3>
      <p>R$ ${livro.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${livro.id})">Adicionar</button>
    `;

    listaLivrosHtml.appendChild(div);
  });
}

function adicionarAoCarrinho(id) {
  const livro = livros.find((l) => l.id === id);
  carrinho.push(livro);
  atualizarCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  itensCarrinhoHtml.innerHTML = "";
  total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${item.titulo} - R$ ${item.preco.toFixed(2)}</span>
      <button class="remover-item" onclick="removerItem(${index})">X</button>
    `;

    itensCarrinhoHtml.appendChild(li);
    total += item.preco;
  });

  valorTotalHtml.textContent = `R$ ${total.toFixed(2)}`;

  if (total > 100) {
    valorTotalHtml.style.color = "red";
  } else {
    valorTotalHtml.style.color = "black";
  }
}

btnLimpar.addEventListener("click", () => {
  carrinho = [];
  atualizarCarrinho();
});

btnFinalizar.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  localStorage.setItem("totalCompra", total.toFixed(2));
  window.location.href = "CompraFinalizada.html";
});

carregarCatalogo();
atualizarCarrinho();
