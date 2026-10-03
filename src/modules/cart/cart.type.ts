
// export type ICart = {
//     id: string;
//     name: string;
//     price: number;
//     image: string;
//     quantity: number;
//     totalPrice: number;
// }

// export type ICartStore = {
//     data: ICart[];
//     totalPrice: number;
// }

export interface ICart {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    totalPrice: number;
}

export interface ICartStore {
    data: ICart[];
    totalPrice: number;
}