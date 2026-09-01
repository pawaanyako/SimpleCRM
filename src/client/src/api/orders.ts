import type { OrderResponse } from "../types"

async function getOrders() {
    const response = await fetch('/api/orders');

    if (response.ok) {
        const data: OrderResponse[] = await response.json();
        return data;
    }

    throw new Error(`Ошибка сервера - ${response.status} ${response.statusText}`);
}

async function getOrderById(id: string) {
    const response = await fetch(`/api/orders/${id}`);

    if (response.ok) {
        const data: OrderResponse = await response.json();
        return data;
    }

    if (response.status === 404) {
        throw new Error('Такого заказа нет')
    }

    throw new Error(`Ошибка сервера - ${response.status} ${response.statusText}`);
}

export { getOrders, getOrderById }