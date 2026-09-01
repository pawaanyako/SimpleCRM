import { useState } from "react";
import { useNavigate } from "react-router";
import { createOrder, ValidationError } from "../api/orders"
import type { OrderRequest } from "../types";

export default function OrderForm() {
  const [newOrder, setNewOrder] = useState({
    senderCity: '',
    senderAddress: '',
    receiverCity: '',
    receiverAddress: '',
    cargoWeight: '',
    collectionDate: '',
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null);

  const navigate = useNavigate();

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewOrder(prev => ({ ...prev, [name]: value }))
  }

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true);
    setFormError(null);
    setFieldErrors(null);

    const orderRequest: OrderRequest = {
      senderCity: newOrder.senderCity,
      senderAddress: newOrder.senderAddress,
      receiverCity: newOrder.receiverCity,
      receiverAddress: newOrder.receiverAddress,
      cargoWeight: newOrder.cargoWeight === '' ? null : Number(newOrder.cargoWeight),
      collectionDate: newOrder.collectionDate === '' ? null : newOrder.collectionDate,
    }

    try {
      await createOrder(orderRequest);
      navigate('/', { replace: true });
    }
    catch (err) {
      if (err instanceof ValidationError) {
        setFormError(err.message);
        setFieldErrors(err.errors);
      }
      else if (err instanceof Error) {
        setFormError(err.message);
      }
      else {
        setFormError('Произошла неизвестная ошибка');
      }
    }
    finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <header className="page-header">
        <h1>Новый заказ</h1>
        <button onClick={() => navigate('/')}>Назад к списку</button>
      </header>

      <main>
        {formError && !fieldErrors && <p className="form-error">{formError}</p>}

        <div className="card">
          <form className="form" onSubmit={submitForm} noValidate>

            <div className="form-row">
              <label htmlFor="senderCity">Город отправителя</label>
              <input
                id="senderCity"
                name="senderCity"
                className={fieldErrors?.senderCity ? "input-validation-error" : ""}
                value={newOrder.senderCity}
                onChange={inputChange}
                type="text"
                required />
              {fieldErrors?.senderCity &&
                <p className="p-validation-error">
                  {fieldErrors.senderCity}
                </p>}
            </div>

            <div className="form-row">
              <label htmlFor="senderAddress">Адрес отправителя</label>
              <input
                id="senderAddress"
                name="senderAddress"
                className={fieldErrors?.senderAddress ? "input-validation-error" : ""}
                value={newOrder.senderAddress}
                onChange={inputChange}
                type="text"
                required />
              {fieldErrors?.senderAddress &&
                <p className="p-validation-error">
                  {fieldErrors.senderAddress}
                </p>}
            </div>

            <div className="form-row">
              <label htmlFor="receiverCity">Город получателя</label>
              <input
                id="receiverCity"
                name="receiverCity"
                className={fieldErrors?.receiverCity ? "input-validation-error" : ""}
                value={newOrder.receiverCity}
                onChange={inputChange}
                type="text"
                required />
              {fieldErrors?.receiverCity &&
                <p className="p-validation-error">
                  {fieldErrors.receiverCity}
                </p>}
            </div>

            <div className="form-row">
              <label htmlFor="receiverAddress">Адрес получателя</label>
              <input
                id="receiverAddress"
                name="receiverAddress"
                className={fieldErrors?.receiverAddress ? "input-validation-error" : ""}
                value={newOrder.receiverAddress}
                onChange={inputChange}
                type="text"
                required />
              {fieldErrors?.receiverAddress &&
                <p className="p-validation-error">
                  {fieldErrors.receiverAddress}
                </p>}
            </div>

            <div className="form-row">
              <label htmlFor="cargoWeight">Вес груза, кг</label>
              <input
                id="cargoWeight"
                name="cargoWeight"
                className={fieldErrors?.cargoWeight ? "input-validation-error" : ""}
                value={newOrder.cargoWeight}
                onChange={inputChange}
                min="0.01"
                step="0.01"
                type="number"
                required />
              {fieldErrors?.cargoWeight &&
                <p className="p-validation-error">
                  {fieldErrors.cargoWeight}
                </p>}
            </div>

            <div className="form-row">
              <label htmlFor="collectionDate">Дата забора груза</label>
              <input
                id="collectionDate"
                name="collectionDate"
                className={fieldErrors?.collectionDate ? "input-validation-error" : ""}
                value={newOrder.collectionDate}
                onChange={inputChange}
                type="date"
                required />
              {fieldErrors?.collectionDate &&
                <p className="p-validation-error">
                  {fieldErrors.collectionDate}
                </p>}
            </div>

            <button type="submit" disabled={submitting}>Отправить</button>
          </form>
        </div>
      </main>
    </>
  )
}