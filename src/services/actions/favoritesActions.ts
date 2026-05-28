export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES' as const;
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES' as const;

// Структура объекта, которая сохраняется в Redux
export interface IFavoriteProduct {
    id: string;
    name: string;
    price: number; 
    images: string[];
    colorName: string;
    colorCode: string;
    isHit: boolean;
}

export interface IAddToFavoritesAction {
    readonly type: typeof ADD_TO_FAVORITES;
    readonly payload: IFavoriteProduct;
}

export interface IRemoveFromFavoritesAction {
    readonly type: typeof REMOVE_FROM_FAVORITES;
    readonly payload: { id: string; colorName: string };
}

export type TFavoritesActions = IAddToFavoritesAction | IRemoveFromFavoritesAction;

export const addToFavoritesAction = (item: IFavoriteProduct): IAddToFavoritesAction => ({
    type: ADD_TO_FAVORITES,
    payload: item
});

export const removeFromFavoritesAction = (id: string, colorName: string): IRemoveFromFavoritesAction => ({
    type: REMOVE_FROM_FAVORITES,
    payload: { id, colorName }
} );
