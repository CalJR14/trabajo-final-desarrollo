let inventory = [];

function addProduct() {
    const name = document.getElementById('productName').value;
    const quantity = parseInt(document.getElementById('productQuantity').value);

    if (!name || isNaN(quantity) || quantity < 0) {
        alert("Por favor, ingresa un nombre válido y una cantidad válida.");
        return;
    }

    const existingProduct = inventory.find(product => product.name === name);
    if (existingProduct) {
        existingProduct.quantity += quantity;
        alert(`${existingProduct.name} ha sido actualizado con éxito!`);
    } else {
        inventory.push({ name, quantity });
        alert(`${name} ha sido añadido al inventario!`);
    }

    // Limpiar campos después de agregar o actualizar
    document.getElementById('productName').value = '';
    document.getElementById('productQuantity').value = '';
    showProducts();
}

function showProducts() {
    const productList = document.getElementById('allProductsBody');
    productList.innerHTML = ''; // Limpia el contenido actual

    if (inventory.length === 0) {
        productList.innerHTML = '<tr><td colspan="3" style="text-align: center;">No hay productos en el inventario.</td></tr>';
        return;
    }

    inventory.forEach(product => {
        productList.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>
                    <button class="personalizo" onclick="updateProduct('${product.name}')">Actualizar</button>
                    <button onclick="checkAndRemove('${product.name}', ${product.quantity})">Eliminar sin Stock</button>
                </td>
            </tr>
        `;
    });
}

function checkAndRemove(productName, quantity) {
    if (quantity === 0) {
        // Solo elimina el producto si su cantidad es 0
        inventory = inventory.filter(product => product.name !== productName);
        showProducts(); // Actualiza la tabla
        alert(`${productName} ha sido eliminado del inventario.`);
    } else {
        alert("No se puede eliminar el producto, ya que hay stock disponible.");
    }
}

function updateProduct(name) {
    const existingProduct = inventory.find(product => product.name === name);
    
    // Pide al usuario que ingrese la nueva cantidad
    const newQuantity = prompt(`Edita la cantidad para el producto: ${name}`, existingProduct.quantity);
    
    // Verifica si el usuario ha ingresado un valor
    if (newQuantity !== null) {
        const parsedQuantity = parseInt(newQuantity);
        if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
            existingProduct.quantity = parsedQuantity; // Actualiza la cantidad del producto
            alert(`${name} ha sido actualizado a una cantidad de ${parsedQuantity}.`);
            showProducts(); // Actualiza la tabla
        } else {
            alert("Por favor, ingresa una cantidad válida.");
        }
    }
}
