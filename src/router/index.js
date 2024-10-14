import LoginPage from "../Auth/loginPage";
import PrivateRouter from "../Components/PrivateRouter/PrivateRouter";
import Contact from "../page/PublicPage/Contact";
import Home from "../page/PublicPage/Home";
import Admin from "../page/PrivatePage/admin/Admin";
import Fobiden from "../page/error/Fobiden";
import LayoutDefault from "../layout/layoutDefault/LayoutDefault";
import RegisterPage from "../Auth/registerPage";
import Logout from "../Auth/Logout";
import LayoutAdmin from "../layout/layoutAdmin/LayoutAdmin";
import CreateProduct from "../page/PrivatePage/admin/ManagerProduct/CreateProduct";
import Staff from "../page/PrivatePage/admin/Staff/Staff";
import Customer from "../page/PrivatePage/admin/Customer/Customer";
import ProductDetails from "../page/PublicPage/ProductDetails";
import Transaction from "../page/PrivatePage/admin/Transaction/Transaction";
import UpdateTransaction from "../page/PrivatePage/admin/Transaction/UpdateTransaction.jsx";
import { getRoles } from "../Components/helper/getRole.js";

const roleUser = getRoles();
console.log(roleUser);
export const router = [
  {
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
      {
        path: "/fobiden",
        element: <Fobiden />,
      },
      {
        path: "/auth/logout",
        element: <Logout />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    element: <LayoutAdmin />,
    children: [
      {
        element: <PrivateRouter allowedRoles={["ADMIN", "STAFF"]}/>,
        children: [
          {
            path: "/admin/dashboard",
            element: <Admin />,
          },
          {
            path: "/admin/create-product",
            element: <CreateProduct />,
          },
          {
            path: "/admin/update-transaction/:id",
            element: <UpdateTransaction />,
          },
          {
            path: "/admin/staff",
            element: <Staff />,
          },
          {
            path: "/admin/transaction",
            element: <Transaction />,
          },
          {
            path: "/admin/customer",
            element: <Customer />,
          },
        ],
      },
    ],
  },
];
