document.addEventListener('DOMContentLoaded', function() {
    const orderItemsList = document.getElementById('cart-items-list');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartUI() {
        // Clear the order items list
        orderItemsList.innerHTML = '';
        
        let totalCost = 0;

        // Iterate over each item in the cart
        cart.forEach(item => {
            const orderItemElement = document.createElement('li');
            orderItemElement.classList.add('order-item');
            
            // Calculate the total price for the item based on its quantity
            const totalPriceForItem = parseFloat(item.price.replace('$', '')) * item.quantity;

            // Display the item name, quantity, and total price in the order page
            const itemName = document.createElement('span');
            itemName.textContent = item.name;

            const quantityLabel = document.createElement('label');
            quantityLabel.textContent = 'Quantity:';
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.min = 1;
            quantityInput.value = item.quantity;
            quantityInput.addEventListener('change', () => {
                item.quantity = parseInt(quantityInput.value);
                updateCartUI(); // Update UI after quantity change
                localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
            });

            const totalLabel = document.createElement('span');
            totalLabel.textContent = `Total: $${totalPriceForItem.toFixed(2)}`;

            orderItemElement.appendChild(itemName);
            orderItemElement.appendChild(quantityLabel);
            orderItemElement.appendChild(quantityInput);
            orderItemElement.appendChild(totalLabel);

            const removeButton = document.createElement('button');
            removeButton.classList.add('btn');
            removeButton.textContent = 'Remove from Cart';
            removeButton.addEventListener('click', () => {
                removeFromCart(item);
                updateCartUI(); // Update UI after removing item
            });
            orderItemElement.appendChild(removeButton);
            
            // Append the order item element to the order items list
            orderItemsList.appendChild(orderItemElement);

            // Add the total price for the item to the overall total cost
            totalCost += totalPriceForItem;
        });

        // Display the total cost of all items in the cart on the order page
        const totalElement = document.createElement('li');
        totalElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
        orderItemsList.appendChild(totalElement);
    }

    function removeFromCart(itemToRemove) {
        const indexToRemove = cart.findIndex(item => item.name === itemToRemove.name);
        if (indexToRemove !== -1) {
            cart.splice(indexToRemove, 1); // Remove item from cart array
            alert(`${itemToRemove.name} removed from cart!`);
            localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        }
    }

    // Call the updateCartUI function to initially display the order items
    updateCartUI();
    
});

document.querySelector('form'). addEventListener('focusin', function(event){
    if(event.target.tagName === 'INPUT' || event.target.tagName === "TEXTAREA"){
        event.target.style.backgroundColor = 'lightblue';
    }
});

document.querySelector('form'). addEventListener('focusout', function(event){
    if(event.target.tagName === 'INPUT' || event.target.tagName === "TEXTAREA"){
        event.target.style.backgroundColor = '';
    }
});

document.querySelector('form'). addEventListener('focusout', function(event){
    if(event.target.tagName === 'INPUT' || event.target.tagName === "TEXTAREA"){
        if(event.target.value.trim()===''){
            alert('Form fields cannot be left blank')
        }
   
    }
});

form.querySelectorAll('input[type="number"]').forEach(quantityField => {
    const quantity = parseInt(quantityField.value);
    if (isNaN(quantity) || quantity <= 0) {
        isFormValid = false;
        alert('Quantity must be a valid number greater than zero.');
    }
});

// Prevent form submission if form is not valid
if (!isFormValid) {
    event.preventDefault();
}
});