import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/dashboard.layout';
import { Login } from './pages/login';
import { Inbox } from './pages/inbox';
import { OrderDetails } from './pages/order-details';
import { Settings } from './pages/setttings';
import { DashboardHome } from './pages/dashboard-home';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardHome />,
            },
            {
                path: "inbox",
                element: <Inbox />,
            },
            {
                path: "orders",
                element: <OrderDetails />,
            },
            {
                path: "orders/:id",
                element: <OrderDetails />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);