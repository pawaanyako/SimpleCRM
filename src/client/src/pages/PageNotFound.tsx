import { Link } from "react-router";

export default function PageNotFound() {
    return (
        <>
            <p>Страница не найдена</p>
            <Link to="/">Вернуться к списку заказов</Link>
        </>
    );
}