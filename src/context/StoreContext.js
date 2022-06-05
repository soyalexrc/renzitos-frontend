import {createContext, useEffect, useReducer, useState} from 'react'
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
    shippingAddress: Cookies.get('shippingAddress') ? JSON.parse(Cookies.get('shippingAddress')) : {},
    paymentMethod: Cookies.get('paymentMethod') ? Cookies.get('paymentMethod') : ''
  },
  userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null
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
      return {...state, cart: {...state.cart, cartItems}}
    }
    case 'REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(item => item._key !== action.payload._key);
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return {...state, cart: {...state.cart, cartItems}}
    }
    case 'USER_LOGIN':
      return {...state, userInfo: action.payload}
    case 'USER_LOGOUT':
      return {...state, userInfo: null, cart: {cartItems: [], shippingAddress: {}}}
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload
        }
      }
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload
        }
      }
    case 'CLEAR_CART':
      return { ...state, cart: {...state.cart, cartItems: []} }
  }
}

export function StoreProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {state, dispatch};
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

