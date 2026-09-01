type OrderResponse = {
    id: number;
    orderNumber: string;
    senderCity: string;
    senderAddress: string;
    receiverCity: string;
    receiverAddress: string;
    cargoWeight: number;
    collectionDate: string;
}

export type { OrderResponse } 