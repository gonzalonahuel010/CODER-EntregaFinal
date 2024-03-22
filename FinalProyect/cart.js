let cartStorage = []

// Cargar y renderizar el carrito al cargar la página
window.onload = () => {
    loadCartFromLocalStorage()
    renderCarrito(cartStorage)
    removeFromCartButton()
}

// Función para cargar el carrito desde el almacenamiento local
function loadCartFromLocalStorage() {
    // Verificar si hay datos en el almacenamiento local
    const cartData = localStorage.getItem("cartProducts")
    // Si hay datos en el almacenamiento local, cargarlos en cartStorage
    if (cartData) {
        cartStorage = JSON.parse(cartData); // Parsear los datos del almacenamiento local como JSON
    } else {
        // Si no hay datos en el almacenamiento local, inicializar cartStorage como un array vacío
        cartStorage = []
    }
}

// Función para guardar el carrito en el almacenamiento local
function saveCartToLocalStorage() {
    localStorage.setItem("cartProducts", JSON.stringify(cartStorage))
}

let cartContainer = document.getElementById("cart-container")
// Esta función recibe un array de productos del carrito como parámetro
function renderCarrito(cartItems) {
    // Limpiamos el contenido actual del contenedor del carrito
    cartContainer.innerHTML = "";

    // Iteramos sobre cada producto en el array cartItems
    cartItems.forEach(product => {
        // Creamos un nuevo elemento div para representar el producto en el carrito
        const cart = document.createElement("div");
        // Establecemos el contenido HTML del elemento div con la información del producto
        cart.innerHTML = `<h3>${product.name}</h3> <!-- Mostramos el nombre del producto -->
                          <p>$${product.price}</p> <!-- Mostramos el precio del producto -->
                          <button class="remove-button" data-product-id="${product.id}">Eliminar del carrito</button>`
        // Inyectamos el elemento para que sea mostrado en nuestra pagina
        cartContainer.appendChild(cart);
    });
}

function removeFromCartButton() {
    const removeButtons = document.querySelectorAll(".remove-button")
    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            Toastify({
                text: "Producto eliminado del carrito",
                duration: 1500,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: false,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast()

            //Obtenemos el ID del producto al cual se le hizo click el el boton de eliminar del carrito
            const productId = button.dataset.productId
            // Convertir el productId a número para asegurar la comparación correcta
            const idToRemove = parseInt(productId)
            // Buscar el índice del producto a eliminar en el carrito
            const indexToRemove = cartStorage.findIndex(product => product.id === idToRemove)
            if (indexToRemove !== -1) {
                // Eliminar el producto del carrito por su índice
                cartStorage.splice(indexToRemove, 1)
                console.log("Producto eliminado del carrito:", cartStorage)
                // Eliminar visualmente el contenedor del producto del carrito
                button.parentElement.remove()
                // Actualizar el carrito en el almacenamiento local
                localStorage.setItem("cartProducts", JSON.stringify(cartStorage))
            } else {
                console.error("El producto no fue encontrado en el carrito.")
            }
        });
    });
}

function clearCartButton(){
    const clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", clearCart);
}

function clearCart() {
    // Limpiar el carrito visualmente
    cartContainer.innerHTML = "";
    // Limpiar el carrito en el almacenamiento local
    localStorage.removeItem("cartProducts");
    // Limpiar el arreglo del carrito
    cartStorage = [];
}

document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();
    renderCarrito(cartStorage);
    removeFromCartButton();
    clearCartButton(); // Llamar a la función clearCartButton después de haber cargado el carrito y renderizado los productos
});




