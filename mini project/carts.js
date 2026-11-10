
const cartContainer = document.getElementById('cart-container');
const cartTotal = document.getElementById('cart-total');
const totalItemsElement = document.getElementById('total-items');
const orderTotalElement = document.getElementById('order-total');

const source = document.getElementById('cart-template').innerHTML;
const template = Handlebars.compile(source);

const savedCart = localStorage.getItem('cart');
const cart = new Map(JSON.parse(savedCart || "[]"));


//navigate to Store page
const viewCartButton = document.getElementById('back-to-store');
viewCartButton.addEventListener('click',function(){
    window.location.href = 'index.html'
})

function renderCart() {
let totalItems = 0;
    const products = Array.from(cart.entries()).map(function(entry) {
        return {
            id: entry[0],
            ...entry[1]
        };
    });

    products.forEach(function(product) {
        product.subtotal = product.price * product.quantity;
        totalItems += Number(product.quantity); 
    });

    const total = products.reduce(function(sum, product) {
        return sum + product.subtotal;
    }, 0);

    cartContainer.innerHTML = template({ products });

    cartTotal.textContent = products.length > 0
        ? `Total Amount: ₹${total}`
        : "";

     totalItemsElement.textContent = totalItems;
    orderTotalElement.textContent = total;

}


function saveCart() {
    localStorage.setItem('cart', JSON.stringify([...cart]));
}


cartContainer.addEventListener('click', function(event) {

    const button = event.target.closest('button');

    if (!button || !cartContainer.contains(button)) {
        return;
    }

    const productId = button.dataset.productId;

    if (button.classList.contains('increase-qty')) {

        const product = cart.get(productId);
        product.quantity++;

    }

    else if (button.classList.contains('decrease-qty')) {

        const product = cart.get(productId);

        if (product.quantity > 1) {
            product.quantity--;
        }

    }

    else if (button.classList.contains('remove-product')) {

        cart.delete(productId);

    }

    saveCart();
    renderCart();

});


renderCart();
