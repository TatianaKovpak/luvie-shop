import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, TFavoritesActions, IFavoriteProduct } from '../actions/favoritesActions';

export type TFavoritesState = {
    items: IFavoriteProduct[];
};

const loadFavoritesFromStorage = (): IFavoriteProduct[] => {
    try {
        const saved = localStorage.getItem('luvie_favorites');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        return [];
    }
};

const initialState: TFavoritesState = {
    items: loadFavoritesFromStorage()
};

export const favoritesReducer = (state = initialState, action: TFavoritesActions): TFavoritesState => {
    switch (action.type) {
        case ADD_TO_FAVORITES: {
            const item = action.payload;
            const exists = state.items.some(x => x.id === item.id && x.colorName === item.colorName);
            if (exists) return state;

            const newItems = [...state.items, item];
            localStorage.setItem('luvie_favorites', JSON.stringify(newItems));
            return { ...state, items: newItems };
        }
        case REMOVE_FROM_FAVORITES: {
            const newItems = state.items.filter(x => 
                !(x.id === action.payload.id && x.colorName === action.payload.colorName)
            );
            localStorage.setItem('luvie_favorites', JSON.stringify(newItems));
            return { ...state, items: newItems };
        }
        default:
            return state;
    }
};
