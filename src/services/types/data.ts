export type TCartItem = {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    readonly image: string;
    readonly color: string;
    readonly colorCode: string; // Добавляем это поле
    readonly size: string;
    quantity: number;
};