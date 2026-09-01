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

type OrderRequest = {
    senderCity: string;
    senderAddress: string;
    receiverCity: string;
    receiverAddress: string;
    cargoWeight: number | null;
    collectionDate: string | null;
}

export type { OrderResponse, OrderRequest } 