import type { OrderResponse, OrderRequest } from "../types"

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

export class ValidationError extends Error {
    errors: Record<string, string>

    constructor(message: string, errors: Record<string, string[]>) {
        super(message);
        this.name = 'ValidationError';

        this.errors = Object.fromEntries(
            Object.entries(errors).map(([key, messages]) => [key.charAt(0).toLowerCase() + key.slice(1), messages[0]])
        )
    }
}

async function createOrder(newOrder: OrderRequest) {
    const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
    });

    if (response.ok) {
        const result: OrderResponse = await response.json();
        return result
    }

    if (response.status === 400) {
        const errorData = await response.json();
        throw new ValidationError(`Ошибка валидации - ${errorData.title}`, errorData.errors)
    }

    throw new Error(`Ошибка сервера - ${response.status} ${response.statusText}`);
}


export { getOrders, getOrderById, createOrder }