import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import HomePage from "./(archived) components/pages/HomePage";
//import LoginPage from "./(archived) components/pages/LoginPage";
//import RegisterPage from "./(archived) components/pages/RegisterPage";
//import ChangeUsernamePage from "./(archived) components/pages/ChangeUsernamePage";
//import ChangePasswordPage from "./(archived) components/pages/ChangePasswordPage";
//import AdminUserPage from "./(archived) components/pages/AdminUserPage";
//import UserListPage from "./(archived) components/pages/UserListPage";
//import UserConfigModal from "./components/ui/UserConfigModal";
//import SellerConfigModal from "./(archived) components/ui/SellerConfigModal";
//import SellerPage from "./(archived) components/pages/SellerPage";
//import SellerPageContact from "./(archived) components/pages/SellerPageContacts";
//import RegisterSellerPage from "./(archived) components/pages/RegisterSellerPage";
//import ProfileUserPage from "./(archived) components/pages/ProfileUserPage";
//import ProfileSellerPage from "./(archived) components/pages/ProfileSellerPage";
//import ProfileSellerProductsPage from "./(archived) components/pages/ProfileSellerProductsPage";
//import CrudProductsPage from "./(archived) components/pages/CrudProductsPage";
//import ProductView from "./(archived) components/pages/ProductView";
//import ForgotPassword from "./(archived) components/pages/ForgotPassword";
//import ResetPassword from "./(archived) components/pages/ResetPassword";
//import SellerOffersPage from "./(archived) components/pages/SellerOffersPage";

//admin
import AdminPage from "./modules/admin/ui/AdminPage";

//auth
import ForgotPasswordPage from "./modules/auth/ui/ForgotPasswordPage";
import LoginRegisterPage from "./modules/auth/ui/LoginRegisterPage";
import ResetPasswordPage from "./modules/auth/ui/ResetPasswordPage";

//home
import HomePage from "./modules/home/ui/HomePage";

//seller
import BeSellerPage from "./modules/seller/ui/BeSellerPage";
import CrudProductPage from "./modules/seller/ui/CrudProductPage";
import ProductPage from "./modules/seller/ui/ProductPage";
import RegisterSellerPage from "./modules/seller/ui/RegisterSellerPage";
import SellerPage from "./modules/seller/ui/SellerPage";

//users
import ProfilePage from "./modules/users/ui/ProfilePage";
import ShoppingCartPage from "./modules/users/ui/ShoppingCartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/loginRegister' element={<LoginRegisterPage/>}/>
        <Route path='/registerSeller' element={<RegisterSellerPage/>}/>
        <Route path='/beSellerPage' element={<BeSellerPage/>}/>
        <Route path='/sellerPage' element={<SellerPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/shoppingCart' element={<ShoppingCartPage/>}/>
        <Route path='/productPage' element={<ProductPage/>}/>
        <Route path='/resetPassword' element={<ResetPasswordPage/>}/>
        <Route path='/forgotPassword' element={<ForgotPasswordPage/>}/>
        <Route path='/crudProduct' element={<CrudProductPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
