import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getOrderById } from "../api/orders"
import type { OrderResponse } from "../types";

export default function OrderDetails() {
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id === undefined) {
          setError('Id является неопределенным типом');
        }
        else {
          setOrder(await getOrderById(id));
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
  }, [id]);

  if (loading) {
    return <p>Загружается...</p>
  }

  if (error) {
    return <>
      <p>Ошибка: {error}</p>
      <Link to="/">Вернуться к списку заказов</Link>
    </>
  }

  if (order === null) {
    return <>
      <p>Ошибка: Пустой заказ</p>
      <Link to="/">Вернуться к списку заказов</Link>
    </>
  }

  return (
    <>
      <header className="page-header">
        <h1>Заказ {order.orderNumber}</h1>
        <button className="header-button" onClick={() => navigate('/')}>Назад к списку</button>
      </header>

      <main>
        <div className="table-wrapper table-wrapper-fit-content">
          <table className="order-table">
            <tbody>
              <tr>
                <th scope="row">Город отправителя</th>
                <td>{order.senderCity}</td>
              </tr>
              <tr>
                <th scope="row">Адрес отправителя</th>
                <td>{order.senderAddress}</td>
              </tr>
              <tr>
                <th scope="row">Город получателя</th>
                <td>{order.receiverCity}</td>
              </tr>
              <tr>
                <th scope="row">Адрес получателя</th>
                <td>{order.receiverAddress}</td>
              </tr>
              <tr>
                <th scope="row">Вес груза, кг</th>
                <td>{order.cargoWeight}</td>
              </tr>
              <tr>
                <th scope="row">Дата забора груза</th>
                <td>{new Date(order.collectionDate).toLocaleDateString('ru-RU', { timeZone: 'UTC' })}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}