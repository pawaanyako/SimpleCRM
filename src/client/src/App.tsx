import { Route, Routes } from "react-router";
import OrdersList from "./pages/OrdersList";
import OrderDetails from "./pages/OrderDetails";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OrdersList />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>)
}