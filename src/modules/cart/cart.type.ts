
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