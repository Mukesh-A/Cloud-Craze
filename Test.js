// const heading = document.getElementById('heading');
// heading.innerHTML = 'Welcome to JavaScript'
// const phara = document.querySelectorAll('.message');
// phara.forEach(function (p){console.log(p.textContent)})



const container = document.getElementById('product-container');
const button = document.getElementById('add-product');
button.addEventListener('click', function(){
    const product = document.createElement('div');
    product.innerHTML = `
        <p>Product Name : Laptop</p>
        <p>Price: 50000</p>
    `;
    product.className = 'product-card';
    container.append(product);
    console.log("clicked");
})