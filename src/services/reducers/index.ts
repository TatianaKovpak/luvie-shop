import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
// Импортируй тип экшенов, чтобы все было прозрачно
import { TCartActions } from '../actions/cartActions';

export const rootReducer = combineReducers({
    cart: cartReducer
});

// Вместо ручного описания Reducer<RootState, ...> 
// просто экспортируй тип через ReturnType
export type RootState = ReturnType<typeof rootReducer>;