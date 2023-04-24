let products = [];

async function getProducts() {
  const response = await fetch('https://fakestoreapi.com/products/');
  const data = await response.json();
  products = data;
  return products;
}

function renderProducts() {
  const productList = document.createElement('ul');
  productList.classList.add('product-list');
  products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.innerText = product.title;
    listItem.addEventListener('click', () => {
      getProductById(product.id);
    });
    productList.appendChild(listItem);
  });
  document.body.appendChild(productList);
}

function calculateTotal() {
  const total = products.reduce((acc, product) => acc + product.price, 0);
  const totalElement = document.createElement('p');
  totalElement.innerText = `Total price: $${total.toFixed(2)}`;
  document.body.appendChild(totalElement);
}

function findHighestRatedProduct() {
  const highestRatedProduct = products.reduce((acc, product) => {
    if (product.rating > acc.rating) {
      return product;
    } else {
      return acc;
    }
  }, { rating: 0 });
  const highestRatedProductElement = document.createElement('p');
  highestRatedProductElement.innerText = `Highest rated product: ${highestRatedProduct.title}`;
  document.body.appendChild(highestRatedProductElement);
}

async function getProductById(id) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await response.json();
  const productElement = document.createElement('div');
  productElement.innerHTML = `
    <h2>${product.title}</h2>
    <p>Price: $${product.price.toFixed(2)}</p>
    <p>Description: ${product.description}</p>
    <img src="${product.image}" alt="${product.title}">
  `;
  document.body.appendChild(productElement);
}

function cleanUp() {
  const productList = document.querySelector('.product-list');
  const totalElement = document.querySelector('p');
  const highestRatedProductElement = document.querySelector('#highest-rated-product');
  const singleProductElement = document.querySelector('#single-product');
  productList.remove();
  totalElement.remove();
  highestRatedProductElement.remove();
  singleProductElement.remove();
  renderProducts();
}

function searchProduct() {
  const productId = document.querySelector('#product-id').value;
  getProductById(productId);
}

getProducts()
  .then(() => {
    renderProducts();
    calculateTotal();
    findHighestRatedProduct();
  });

const cleanUpButton = document.createElement('button');
cleanUpButton.innerText = 'Clean up';
cleanUpButton.addEventListener('click', cleanUp);
document.body.appendChild(cleanUpButton);

const searchForm = document.createElement('form');
searchForm.innerHTML = `
  <label for="product-id">Product ID:</label>
  <input type="number" id="product-id" name="product-id">
  <button type="button" onclick="searchProduct()">Search</button>
`;
document.body.appendChild(searchForm);
