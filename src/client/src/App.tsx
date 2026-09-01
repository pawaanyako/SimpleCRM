import { useEffect, useState } from "react";

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

export default function App() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/orders');

        if (response.ok) {
          const data: OrderResponse[] = await response.json();
          setOrders(data);
        }
        else {
          setError(`Ошибка сервера - ${response.status} ${response.statusText}`);
        }
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
      }
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Загружается...</p>
  }

  if (error) {
    return <p>Ошибка: {error}</p>
  }

  return (
    <>
      <div className="page-header">
        <h1>Заказы</h1>
        <button className="add-order-button">Добавить заказ</button>
      </div>

      {orders.length === 0 ?
        (
          <p>Заказов пока нет</p>
        ) :
        (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Номер заказа</th>
                  <th>Маршрут</th>
                  <th>Вес груза, кг</th>
                  <th>Дата забора груза</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.senderCity}, {order.senderAddress} &rarr; {order.receiverCity}, {order.receiverAddress}</td>
                    <td>{order.cargoWeight}</td>
                    <td>{new Date(order.collectionDate).toLocaleDateString('ru-RU', { timeZone: 'UTC' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </>
  )
}