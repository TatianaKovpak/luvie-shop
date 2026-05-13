import { 
    ADD_TO_CART, 
    REMOVE_FROM_CART, 
    TOGGLE_CART, 
    UPDATE_QUANTITY, 
    CLOSE_MINI_CART, 
    TCartActions, 
    CLEAR_CART
} from '../actions/cartActions';
import { TCartItem } from '../types/data';

export type TCartState = {
    items: TCartItem[];
    isCartOpen: boolean;
    isMiniCartVisible: boolean; // Флаг для всплывающего окна
};

const loadCartFromStorage = (): TCartItem[] => {
    try {
        const savedCart = localStorage.getItem('luvie_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
        return [];
    }
};

const initialState: TCartState = {
    items: loadCartFromStorage(), 
    isCartOpen: false,
    isMiniCartVisible: false
};

export const cartReducer = (state = initialState, action: TCartActions): TCartState => {
    switch (action.type) {
        case ADD_TO_CART: {
            const item = action.payload;
            const existItem = state.items.find(x => 
                x.id === item.id && x.size === item.size && x.color === item.color
            );

            let newItems;
            if (existItem) {
                newItems = state.items.map(x => x === existItem ? {...x, quantity: x.quantity + item.quantity} : x);
            } else {
                newItems = [...state.items, item];
            }

            return { 
                ...state, 
                items: newItems, 
                isMiniCartVisible: true // Показываем окно при добавлении
            };
        }

        case REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter(x => 
                    !(x.id === action.payload.id && x.color === action.payload.color && x.size === action.payload.size)
                )
            };

        case UPDATE_QUANTITY:
            return {
                ...state,
                items: state.items.map(x => 
                    (x.id === action.payload.id && x.color === action.payload.color && x.size === action.payload.size)
                    ? { ...x, quantity: action.payload.count }
                    : x
                )
            };

        case TOGGLE_CART:
            return { ...state, isCartOpen: !state.isCartOpen };

        case CLOSE_MINI_CART:
            return { ...state, isMiniCartVisible: false };

        case CLEAR_CART:
            return { ...state, items: [] }    

        default:
            return state;
    }
};
