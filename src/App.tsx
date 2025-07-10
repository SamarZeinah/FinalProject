import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import Home from "./MyComponents/Home";
import About from "./MyComponents/About";
import NotFound from "./MyComponents/NotFound";
import Layout from "./MyComponents/Layout";
import Products from "./MyComponents/Products";
import Login from "./MyComponents/Login";
import SignUp from "./MyComponents/SignUp";
import Client from "./Pages/Client";
import Company from "./Pages/JoinUs/Company";
import ProtectedRoute from "./MyComponents/ProtectedRoute";
import UserContextProvider from "./Contexts/UserContext";
import AccessAccount from "./MyComponents/AccessAccount";
import ProfileEditor from "./Pages/profile-editor";
import Profile from "./Pages/profile";
import Project from "./Pages/project";

import { I18nextProvider } from "react-i18next";
//i18n
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { useEffect } from "react";
import cookies from 'js-cookie';
import ProductList from "./Pages/ProductList";
import EditProduct from "./Pages/JoinUs/EditProduct";
import AddProduct from "./Pages/AddProduct";
import Ask from "./Pages/Ask/Ask";
import Viewdetails from "./Pages/Viewdetails.tsx";
import { CartProvider } from "./Contexts/CartContext";
import ShoppingCart from "./Pages/Cart/ShoppingCart.tsx";
import OrderSuccess from "./Pages/Cart/Order-Success.tsx";
import Home from "./Pages/Home/Home.tsx";
import { FilterProvider } from "./Contexts/FilterContext.tsx";
import ForgetPassword from "./Pages/ForgetPassword.tsx";
import OrderDetailsPage from "./Pages/UserPages/OrderDetailsPage.tsx";
import WishlistPage from "./Pages/UserPages/WishlistPage.tsx";
import OrdersPage from "./Pages/UserPages/OrdersPage.tsx";
import ProfilePage from "./Pages/UserPages/ProfilePage.tsx";
import AddressesPage from "./Pages/UserPages/AddressesPage.tsx";
import PaymentsPage from "./Pages/UserPages/PaymentsPage.tsx";
import NotificationsPage from "./Pages/UserPages/NotificationsPage.tsx";
import EngineerDetails from "./Pages/LandingPage/TopEngineers/EngineerDetails.tsx";
import TechnicalWorkerDetails from "./Pages/LandingPage/TopWorkers/TechnicalWorkerDetails.tsx";
import UsrLayout from "./Pages/UserPages/components/Layout";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      order: ['cookie','htmlTag', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
      caches: ["cookie"],
    },
    backend: {
      loadPath: '/locale/{{lng}}/{{ns}}.json',
    }
  });






// Initialize QueryClient outside the component
const queryClient = new QueryClient();

function App() {
  
    // const { t } = useTranslation();
        const {i18n} = useTranslation();
    const lng=cookies.get("i18next")||"en";
    useEffect(()=>{
        window.document.dir=i18n.dir();
      },[lng])


  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
             {
          index: true,
          element: (
              <Home />
          ),
        },
        {
          path: "edit_profile",
          element: (
            <ProtectedRoute>
              <ProfileEditor />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "project/:projectId",
          element: (
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          ),
        },
        // new
        {
          path: "addproduct",
          element: (
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          ),
        },
        {
          path: "editproduct/:productId",
          element: (
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          ),
        },
        {
          path: "productlist",
          element: (
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          ),
        },
        {
          path: "Ask",
          element: (
            <ProtectedRoute>
              <Ask />
            </ProtectedRoute>
          ),
        },
        {
          path: "products/:id",
          element: (
            <ProtectedRoute>
              <Viewdetails />
            </ProtectedRoute>
          ),
        },
         {
          path: "cart",
          element: (
            <ProtectedRoute>
              <ShoppingCart />
            </ProtectedRoute>
          ),
        },
        {
          path: "order-success",
          element: (
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          ),
        },
         {
          path: "engineers/:id",
          element: (
            <ProtectedRoute>
              <EngineerDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "technical-workers/:id",
          element: (
            <ProtectedRoute>
              <TechnicalWorkerDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/",
          element: <UsrLayout/>,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              ),
            },
            {
              path: "orders",
              element: (
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              ),
            },
            {
              path: "orders/:id",
              element: (
                <ProtectedRoute>
                  <OrderDetailsPage />
                </ProtectedRoute>
              ),
            },
            {
              path: "wishlist",
              element: (
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              ),
            },
            {
              path: "user-profile",
              element: (
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              ),
            },
            {
              path: "addresses",
              element: (
                <ProtectedRoute>
                  <AddressesPage />
                </ProtectedRoute>
              ),
            },
            {
              path: "payments",
              element: (
                <ProtectedRoute>
                  <PaymentsPage />
                </ProtectedRoute>
              ),
            },
            {
              path: "notifications",
              element: (
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "client",
          element: <Client />,
          children: [
            { index: true, element: <Login /> },
            { path: "signup", element: <SignUp /> },
          ],
        },
        // { path: "forgot-password", element: <ForgetPassword /> },
        // { path: "access-account/:email", element: <AccessAccount /> },
        // { path: "join-as/:userType", element: <Company /> },
        // { path: "engineer", element: <Engineer /> },
        // { path: "consultative", element: <Technical /> },
        // { path: "*", element: <NotFound /> }, // Wildcard route for 404
       { path: "forgot-password", element: <ForgetPassword /> },
        { path: "access-account/:email", element: <AccessAccount /> },
        { path: "join-as/:userType", element: <Company /> },
        { path: "*", element: <NotFound /> }, // Wildcard route for 404
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserContextProvider>
            <CartProvider>
        <I18nextProvider i18n={i18n}>
 <FilterProvider>
            <RouterProvider router={routes} />
          </FilterProvider>  
                </I18nextProvider>
        </CartProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
