export const addItemToCart = (cartItems, addItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === addItem.id);

    if (existingItem) {
        return cartItems.map(cartItem =>
            cartItem.id === addItem.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    return [...cartItems, { ...addItem, quantity: 1 }];
};

export const removeItemToCart = (cartItems, removeItem) => {
    const existingItem = cartItems.find(
        cartItem => cartItem.id === removeItem.id
    );
    if (existingItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== removeItem.id);
    } else {
        return cartItems.map(cartItem =>
            cartItem.id === removeItem.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    }
};
