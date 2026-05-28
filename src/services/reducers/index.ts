import { combineReducers, Reducer } from 'redux';
import { cartReducer, TCartState } from './cartReducer';
import { TCartActions } from '../actions/cartActions';
import { TUserState, userReducer } from './userReducer';
import { favoritesReducer, TFavoritesState } from './favoritesReducer';

export type RootState = {
    cart: TCartState;
    user: TUserState;
    favorites: TFavoritesState;
};

// Пропускаем через unknown, как и просит ошибка ts(2352)
export const rootReducer = (combineReducers({
    cart: cartReducer,
    user: userReducer,
    favorites: favoritesReducer
}) as unknown) as Reducer<RootState, TCartActions>;