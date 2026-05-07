import { ADD_TO_CART, REMOVE_FROM_CART, TOGGLE_CART, TCartActions } from '../actions/cartActions';
import { TCartItem } from '../types/data';

export type TCartState = {
    items: TCartItem[];
    isCartOpen: boolean;
};

const initialState: TCartState = {
    items: [],
    isCartOpen: false
};

export const cartReducer = (state = initialState, action: TCartActions): TCartState => {
    switch (action.type) {
        case ADD_TO_CART: {
            const item = action.payload;
            const existItem = state.items.find(x => 
                x.id === item.id && x.size === item.size && x.color === item.color
            );

            if (existItem) {
                return {
                    ...state,
                    items: state.items.map(x => x === existItem ? {...x, quantity: x.quantity + item.quantity} : x),
                    isCartOpen: true
                };
            }
            return { ...state, items: [...state.items, item], isCartOpen: true };
        }
        case REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter(x => 
                    !(x.id === action.payload.id && x.color === action.payload.color && x.size === action.payload.size)
                )
            };
        case TOGGLE_CART:
            return { ...state, isCartOpen: !state.isCartOpen };
        default:
            return state;
    }
};