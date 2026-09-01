import { useEffect, useState } from "react";
import type { OrderResponse } from "../types"
import { getOrders } from "../api/orders"
import { useNavigate } from "react-router";

export default function OrdersList() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOrders(await getOrders());
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
      <header className="page-header">
        <h1>Заказы</h1>
        <button className="header-button">Добавить заказ</button>
      </header>

      <main>
        {orders.length === 0 ? (
          <p>Заказов пока нет</p>
        ) : (
          <div className="table-wrapper">
            <table className="orders-table">
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
                  <tr key={order.id} onClick={() => navigate(`/orders/${order.id}`)}>
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
      </main>
    </>
  )
}