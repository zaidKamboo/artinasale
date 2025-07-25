import { Routes, Route, Outlet } from "react-router-dom";

import Login from "./auth/Login";
import Home from "./general/Home";
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Signup from './auth/SignUp';
import Collection from './general/Collection';
import OurStory from "./general/OurStory";
import Contact from "./general/Contact";
import Profile from "./profile/Profile";
import UpdateProfile from "./profile/UpdateProfile";
import ProductDetails from "./products/ProductDetail";
import CreateProduct from "./products/CreateProduct";
import UpdateProduct from "./products/UpdateProduct";

const MainLayout = () => {
  return <div className="flex flex-col min-h-screen ">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <div className="bg-black" >
      <Footer />
    </div>
  </div>
    ;
};

export default function AllRoutes() {
  const layoutRoutes = [
    //GENERAL ROUTES
    { path: '/', element: <Home /> },
    { path: '/story', element: <OurStory /> },
    { path: '/contact', element: <Contact /> },
    // PROFILE ROUTES
    { path: '/profile', element: <Profile /> },
    { path: '/profile/:id', element: <UpdateProfile /> },
    //PRODUCT ROUTES
    { path: '/collection', element: <Collection /> },
    { path: '/product-details/:id', element: <ProductDetails /> },
    { path: '/create-product', element: <CreateProduct /> },
    { path: '/update-product/:id', element: <UpdateProduct /> },
  ]
  const otherRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },

  ]
  return (
    <Routes>
      <Route element={ <MainLayout /> }>
        { layoutRoutes.map( ( { path, element } ) => <Route path={ path } element={ element } key={ path } /> ) }
      </Route>
      { otherRoutes.map( ( { path, element } ) => <Route path={ path } element={ element } key={ path } /> ) }
    </Routes>
  );
}
