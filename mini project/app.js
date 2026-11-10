const container = document.getElementById('product-container');
const loading = document.getElementById('loading');
let products = [];
const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
const cart = new Map(savedCart);
const source = document.getElementById('product-template').innerHTML;
const template = Handlebars.compile(source);


//navigate to carts page
const viewCartButton = document.getElementById('view-cart');
viewCartButton.addEventListener('click',function(){
    window.location.href = 'cart.html'
})


window.addEventListener('pageshow', function() {
    const savedCart = JSON.parse(
        localStorage.getItem('cart') || '[]'
    );

    cart.clear();

    for (const [id, product] of savedCart) {
        cart.set(id, product);
    }

    updateCartCount();
});


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
        products = await fetchProducts();
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
        const productId = button.dataset.id;
        const selectedProduct = products.find(function(product){
            return String(product.id) === productId;
        })
        if(!selectedProduct){
            return;
        }
        if(cart.has(productId)){
            const existingProduct = cart.get(productId);
            existingProduct.quantity++;
        }else{
            cart.set(productId, {
                name : selectedProduct.name,
                price: selectedProduct.price,
                quantity : 1
            })
        }
        // console.log(`${productName} Add to Cart clicked!`);
        console.log(cart);
        saveToCart();
        updateCartCount()
    }


    // to iterate over the map
//     for (const [productId, product] of cart.entries()) {
//     console.log("ID:", productId);
//     console.log("Name:", product.name);
// }

})
loadProducts();

function saveToCart(){
        localStorage.setItem('cart', JSON.stringify([...cart]));

}
function updateCartCount(){
    let count = 0;
    for (const product of cart.values()){
        count += product.quantity;
    }

    document.getElementById('cart-count').textContent = count;
}
