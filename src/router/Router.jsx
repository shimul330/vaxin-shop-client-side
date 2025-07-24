import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Shop from "../Pages/Shop/Shop";
import Home from "../Pages/Home/Home";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register";
import UpdateProfile from "../Pages/Authentication/UpdateProfile/UpdateProfile";
import PrivateRoute from "../Route/PrivateRoute";
import DashboardLayout from "../DashboardLayoout/DashboardLayout";
import PaymentHistory from "../Pages/Dashboard/Customar/PaymentHistory";
import ManageMedicin from "../Pages/Dashboard/Seller/ManageMedicin";
import PaymentHistorySeller from "../Pages/Dashboard/Seller/PaymentHistorySeller";
import AskAdvertiseMent from "../Pages/Dashboard/Seller/AskAdvertiseMent";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageCatagory from "../Pages/Dashboard/Admin/ManageCatagory";
import PaymentManageMent from "../Pages/Dashboard/Admin/PaymentManageMent";
import SelesReport from "../Pages/Dashboard/Admin/SelesReport";
import BannerAdvertise from "../Pages/Dashboard/Admin/BannerAdvertise";
import MedicineDetails from "../Pages/Shop/MedicineDetails";
import CartMedicine from "../Component/Cart/CartMedicine";
import CheckoutPage from "../Component/Cart/CheckoutPage";
import AdminRoute from "../Route/AdminRoute";
import SellerRoute from "../Route/SellerRoute";
import SellerHomePage from "../Pages/Dashboard/Seller/SellerHomePage";
import BecomeSeller from "../Pages/Dashboard/Customar/BecomeSeller";
import AdminHomePage from "../Pages/Dashboard/Admin/AdminHomePage";
import CatagoryPageDetails from "../Pages/Home/CatagoryPageDetails";
import InvoicePage from "../Component/Cart/InvoicePage";
import DefaultDashboard from "../Component/DefaultDashboard/DefaultDashboard";
import ErrorPage from "../Component/ErrorPage/ErrorPage";





const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,

      },
      {
        path: 'shop',
        Component: Shop,
        loader: () => fetch('https://vaxin-website-server-side.vercel.app/medicines')
      },
      {
        path: '/medicines/:id',
        Component: MedicineDetails,
        loader: ({ params }) => fetch(`https://vaxin-website-server-side.vercel.app/medicines/${params.id}`)

      },
      {
        path: '/cart',
        Component: CartMedicine
      },
       {
        path:'/categories/:categoryName',
        Component: CatagoryPageDetails
      },
      {
        path:'/invoice/:orderId',
        element: <PrivateRoute>
          <InvoicePage></InvoicePage>
        </PrivateRoute>

      },

      {
        path: '/checkout',
        element: <PrivateRoute>
          <CheckoutPage></CheckoutPage>
        </PrivateRoute>
      }
    ]
  },

  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'update-profile',
        Component: UpdateProfile
      },
     
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute>
          <DefaultDashboard></DefaultDashboard>
        </PrivateRoute>
      },
      {
        path: '/dashboard/payment-history',
        element: <PrivateRoute>
          <PaymentHistory></PaymentHistory>
        </PrivateRoute>

      },
      {
        path:'/dashboard/become-seller',
        element:<PrivateRoute>
          <BecomeSeller></BecomeSeller>
        </PrivateRoute>
      },
      {
        path:'/dashboard/seller-homepage',
        element:<PrivateRoute>
          <SellerRoute>
            <SellerHomePage></SellerHomePage>
          </SellerRoute>
        </PrivateRoute>
      },
      {
        path: '/dashboard/manage-medicines',
        element: <PrivateRoute>
          <SellerRoute>
            <ManageMedicin></ManageMedicin>
          </SellerRoute>
        </PrivateRoute>,
        

      },
      {
        path: '/dashboard/seller-payment-history',
        element: <PrivateRoute>
          <SellerRoute>
            <PaymentHistorySeller></PaymentHistorySeller>
          </SellerRoute>
        </PrivateRoute>
      },
      {
        path: '/dashboard/ask-advertisment',
        element: <PrivateRoute>
          <SellerRoute>
            <AskAdvertiseMent></AskAdvertiseMent>
          </SellerRoute>
        </PrivateRoute>
      },
      {
        path: '/dashboard/manage-users',
        element: <PrivateRoute>
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path:'/dashboard/admin-homepage',
        element: <PrivateRoute>
          <AdminRoute>
            <AdminHomePage></AdminHomePage>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: '/dashboard/manage-catagory',
        element: <PrivateRoute>
          <AdminRoute>
            <ManageCatagory></ManageCatagory>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: '/dashboard/payment-management',
        element: <PrivateRoute>
          <AdminRoute>
            <PaymentManageMent></PaymentManageMent>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: '/dashboard/sales-report',
        element: <PrivateRoute>
          <AdminRoute>
            <SelesReport></SelesReport>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: '/dashboard/banner-advertise',
        element: <PrivateRoute>
          <AdminRoute>
            <BannerAdvertise></BannerAdvertise>
          </AdminRoute>
        </PrivateRoute>
      },
    ]

  }
]);

export default router;