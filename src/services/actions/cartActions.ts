import { TCartItem } from "../types/data";

export const ADD_TO_CART: 'ADD_TO_CART' = 'ADD_TO_CART';
export const REMOVE_FROM_CART: 'REMOVE_FROM_CART' = 'REMOVE_FROM_CART';
export const TOGGLE_CART: 'TOGGLE_CART' = 'TOGGLE_CART';
export const UPDATE_QUANTITY: 'UPDATE_QUANTITY' = 'UPDATE_QUANTITY';
export const CLOSE_MINI_CART: 'CLOSE_MINI_CART' = 'CLOSE_MINI_CART';
export const CLEAR_CART: 'CLEAR_CART' = 'CLEAR_CART';

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

export interface IUpdateQuantityAction {
    readonly type: typeof UPDATE_QUANTITY;
    readonly payload: { id: string; color: string; size: string; count: number };
}

export interface ICloseMiniCartAction {
    readonly type: typeof CLOSE_MINI_CART;
}

export interface IClearCartAction {
    readonly type: typeof CLEAR_CART;
}

export type TCartActions = 

    | IAddToCartAction 
    | IRemoveFromCartAction 
    | IToggleCartAction 
    | IUpdateQuantityAction
    | ICloseMiniCartAction
    | IClearCartAction;

export const addToCartAction = (item: TCartItem): IAddToCartAction => ({
    type: ADD_TO_CART,
    payload: item
});

export const removeFromCartAction = (payload: { id: string; color: string; size: string }): IRemoveFromCartAction => ({
    type: REMOVE_FROM_CART,
    payload
});

export const toggleCartAction = (): IToggleCartAction => ({
    type: TOGGLE_CART
});

export const updateQuantity = (id: string, color: string, size: string, count: number): IUpdateQuantityAction => ({
    type: UPDATE_QUANTITY,
    payload: { id, color, size, count }
});

export const closeMiniCartAction = (): ICloseMiniCartAction => ({
    type: CLOSE_MINI_CART
});

export const clearCartAction = (): IClearCartAction => ({
    type: CLEAR_CART
});
