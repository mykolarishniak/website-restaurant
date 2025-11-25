import { createContext, useState } from "react";
import { checkAuthForOrder } from "../services/orderService";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        if (!checkAuthForOrder()) {
            return false;
        }

        if (!product.id) {
            console.error("Помилка: Товар не має унікального ID. Його не можна додати до кошика.", product);
            return false;
        }

        setCart(prev => {
            const exists = prev.find(p => p.id === product.id);
            if (exists) {
                return prev.map(p =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        return true;
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(p => p.id !== id));
    };

    const increase = (id) => {
        setCart(prev =>
            prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p)
        );
    };

    const decrease = (id) => {
        setCart(prev =>
            prev.map(p =>
                p.id === id && p.quantity > 1
                    ? { ...p, quantity: p.quantity - 1 }
                    : p
            )
        );
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increase, decrease, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
