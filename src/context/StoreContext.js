import {createContext, useEffect, useReducer, useState} from 'react'
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : []
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM' : {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(item => item._key === newItem._key)
      const cartItems = existingItem
        ? state.cart.cartItems.map(item => item._key === existingItem._key ? newItem : item)
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: {...state.cart, cartItems}}
    }
    case 'REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(item => item._key !== action.payload._key);
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: {...state.cart, cartItems}}
    }
  }
}

export function StoreProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}

// export function CartProvider({children}) {
//   const [items, setItems] = useState([])
//
//   function addItems(item) {
//     setItems(prevState => ({
//       ...prevState,
//       item
//     }))
//     localStorage.set('cartItems', JSON.stringify(items))
//   }
//
//   function dropItems(item) {
//     const index = item.findIndex(x => x._id === item._id)
//     const copyItems = [...items]
//     items.splice(index, 1)
//     setItems(copyItems)
//     localStorage.set('cartItems', JSON.stringify(copyItems))
//   }
//
//   const value = {
//     items,
//     add: addItems,
//     drop: dropItems,
//   }
//
//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   )
// }

