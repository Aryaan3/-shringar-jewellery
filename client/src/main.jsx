import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

// Send cookies with every request (needed for HttpOnly JWT cookie auth)
axios.defaults.withCredentials = true;
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import WishlistScreen from './screens/WishlistScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import TermsScreen from './screens/TermsScreen';
import './index.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<HomeScreen />} />
            <Route path='/search/:keyword' element={<ShopScreen />} />
            <Route path='/search/:keyword/page/:pageNumber' element={<ShopScreen />} />
            <Route path='/shop' element={<ShopScreen />} />
            <Route path='/shop/page/:pageNumber' element={<ShopScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/wishlist' element={<WishlistScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/about' element={<AboutScreen />} />
            <Route path='/contact' element={<ContactScreen />} />
            <Route path='/terms' element={<TermsScreen />} />

            {/* Private Routes */}
            <Route path='' element={<PrivateRoute />}>
                <Route path='/shipping' element={<ShippingScreen />} />
                <Route path='/payment' element={<PaymentScreen />} />
                <Route path='/placeorder' element={<PlaceOrderScreen />} />
                <Route path='/order/:id' element={<OrderScreen />} />
                <Route path='/profile' element={<ProfileScreen />} />
            </Route>

            {/* Admin Routes */}
            <Route path='/admin' element={<AdminRoute />}>
                <Route path='orderlist' element={<OrderListScreen />} />
                <Route path='productlist' element={<ProductListScreen />} />
                <Route path='product/:id/edit' element={<ProductEditScreen />} />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <RouterProvider router={router} />
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    </React.StrictMode>
);
