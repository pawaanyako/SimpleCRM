import { Route, Routes } from "react-router";
import OrdersList from "./pages/OrdersList";
import OrderDetails from "./pages/OrderDetails";
import PageNotFound from "./pages/PageNotFound";
import OrderForm from "./pages/OrderForm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OrdersList />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/orders/new" element={<OrderForm />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>)
}