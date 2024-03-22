let hamburguesasContainer = document.getElementById("hamburguesas-products-container")
let bebidasContainer = document.getElementById("bebidas-products-container")

// Capturar los datos del archivo JSON
fetch("./data.json")
.then(response => response.json())
.then(data => {
    // Recorrer los datos para crear las tarjetas de productos
    data.forEach(product => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${product.name}</h3>
                          <span>$${product.price}</span>
                          <button class="addProduct" data-product-id="${product.id}">Agregar al carrito</button>`
        // Decidir en qué contenedor de categoría agregar el producto
        if (product.id >= 1 && product.id <= 5) {
            hamburguesasContainer.appendChild(card)
        } else if (product.id >= 6 && product.id <= 14) {
            bebidasContainer.appendChild(card)
        }
    });
    // Llamar a la función para agregar el botón de "Agregar al carrito"
    addToCartButton(data)
})
.catch(error => {
    console.error('Error al cargar los datos:', error)
})
// Función para agregar el evento de "Agregar al carrito"
function addToCartButton(data){
    const addButton = document.querySelectorAll(".addProduct")
    addButton.forEach(button => {
        button.onclick = (event) => {
            // Alerta de producto agregado al carrito
            Toastify({
                text: "Agregado al carrito",
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
            // Guardo ID del producto seleccionado
            const productId = event.currentTarget.dataset.productId
            // Buscar el producto en los datos
            const selectedProduct = data.find(product => product.id == productId)
            if (selectedProduct) {
                // Obtener el carrito desde el almacenamiento local
               // Obtener el carrito desde el almacenamiento local
                let cartData = localStorage.getItem("cartProducts");
                // Parsear el carrito, o usar un arreglo vacío si no hay datos en el almacenamiento local
                let cartProducts = JSON.parse(cartData) || [];
                // Agregar el producto seleccionado al carrito
                cartProducts.push(selectedProduct)
                // Guardar el carrito actualizado en el almacenamiento local
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
            } else {
                console.error("El producto no fue encontrado en los datos cargados.")
            }
        }
    })
}

