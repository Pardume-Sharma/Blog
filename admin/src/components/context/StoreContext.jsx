import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : {};
    });

    const [foodList, setFoodList] = useState([]);
    const [blogList, setBlogList] = useState([]);
    const [token, setToken] = useState("");
    const url = "http://localhost:4000";

    // States related to chat functionality
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");

    // Fetch food list
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Fetch blog list  
    const fetchBlogList = async () => {
        try {
            const response = await axios.get(`${url}/api/blog/listblogs`);
            setBlogList(response.data.data);
        } catch (error) {
            console.error("Error fetching blog list:", error);
        }
    };

    // Save cart items to local storage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add item to cart
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId]--;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    // Get total amount of items in cart
    const getTotalAmount = () => {
        return Object.entries(cartItems).reduce((total, [id, quantity]) => {
            const item = foodList.find((item) => item._id === id);
            return total + (item ? item.price * quantity : 0);
        }, 0);
    };

    // Load cart data from server
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    const removeItem = (itemId) => {
        setCartItems((prev) => {
          const updatedCart = { ...prev };
          delete updatedCart[itemId];
          return updatedCart;
        });
      };
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            await fetchBlogList();
        }
        loadData();
    }, []);

    const contextValue = {
        foodList,
        blogList,
        cartItems,
        addToCart,
        removeItem,
        removeFromCart,
        getTotalAmount,
        token,
        setToken,
        loadCartData,
        prevPrompts,
        setPrevPrompts,
        setRecentPrompt,
        recentPrompt,
        input,
        setInput,
        url,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
