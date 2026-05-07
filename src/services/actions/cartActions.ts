import { TCartItem } from "../types/data";

export const ADD_TO_CART: 'ADD_TO_CART' = 'ADD_TO_CART';
export const REMOVE_FROM_CART: 'REMOVE_FROM_CART' = 'REMOVE_FROM_CART';
export const TOGGLE_CART: 'TOGGLE_CART' = 'TOGGLE_CART';

export interface IAddToCartAction {
    readonly type: typeof ADD_TO_CART;
    readonly payload: TCartItem;
}

export interface IRemoveFromCartAction {
    readonly type: typeof REMOVE_FROM_CART;
    readonly payload: { id: string; color: string; size: string };
}

export interface IToggleCartAction {
    readonly type: typeof TOGGLE_CART;
}

export type TCartActions = IAddToCartAction | IRemoveFromCartAction | IToggleCartAction;

// Простой экшен-креатор
export const addToCart = (item: TCartItem): IAddToCartAction => ({
    type: ADD_TO_CART,
    payload: item
});