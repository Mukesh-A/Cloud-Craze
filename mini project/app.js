const container = document.getElementById('product-container');
const loading = document.getElementById('loading');
const cart = new Map();
const source = document.getElementById('product-template').innerHTML;
const template = Handlebars.compile(source);

function fetchProducts(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            const products = [
                  { id: 101, name: "Laptop", price: 50000 },
                { id: 102, name: "Mouse", price: 799 },
                { id: 103, name: "Keyboard", price: 1499 },
                { id: 104, name: "Headset", price: 2500 }
            ]
            resolve(products)
        },2000)
    })
}

async function loadProducts(){
    try {
        loading.textContent = 'Fetching the products'
        const products = await fetchProducts();
        const html = template({products})
        container.innerHTML = html;
        loading.textContent = '';
        
    } catch (error) {
         loading.textContent = "Unable to load products.";

        console.log(error);
    }
    


}
container.addEventListener('click', function(event){

    const button = event.target.closest('.add-cart');
  
    
    if (button && container.contains(button)) {
        const productName = event.target.dataset.name;
        const productId = event.target.dataset.id;

        if(cart.has(productId)){
            const existingProduct = cart.get(productId);
            existingProduct.quantity++;
        }else{
            cart.set(productId, {
                name : productName,
                quantity : 1
            })
        }
        console.log(`${productName} Add to Cart clicked!`);
        console.log(cart);
        
    }


    // to iterate over the map
//     for (const [productId, product] of cart.entries()) {
//     console.log("ID:", productId);
//     console.log("Name:", product.name);
// }

})
loadProducts();

