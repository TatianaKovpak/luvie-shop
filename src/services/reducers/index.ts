import { combineReducers, Reducer } from 'redux';
import { cartReducer, TCartState } from './cartReducer';
import { TCartActions } from '../actions/cartActions';

export type RootState = {
    cart: TCartState;
};

// Пропускаем через unknown, как и просит ошибка ts(2352)
export const rootReducer = (combineReducers({
    cart: cartReducer
}) as unknown) as Reducer<RootState, TCartActions>;