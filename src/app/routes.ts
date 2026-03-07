import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import FarmerProfile from "./pages/FarmerProfile";
import OrderHistory from "./pages/OrderHistory";
import Chat from "./pages/Chat";
import ChatDetails from "./pages/ChatDetails";
import Notifications from "./pages/Notifications";
import Auth from "./pages/Auth";

export const router = createBrowserRouter([
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "product/:id", Component: ProductDetails },
      { path: "farmer/:id", Component: FarmerProfile },
      { path: "orders", Component: OrderHistory },
      { path: "chat", Component: Chat },
      { path: "chat/:farmerId", Component: ChatDetails },
      { path: "notifications", Component: Notifications },
    ],
  },
]);