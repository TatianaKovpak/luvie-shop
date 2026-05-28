export type TCartItem = {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    readonly image: string;
    readonly color: string;
    readonly colorCode: string;
    readonly size: string;
    quantity: number;
};

export type TFavoriteItem = {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    readonly image: string;
    readonly color: string;
    readonly colorCode: string;
};