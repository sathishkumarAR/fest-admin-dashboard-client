import "./App.css"
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate} from "react-router-dom"
import UsersList from "./screens/UsersList";
import User from "./screens/User";
import AddUser from "./screens/AddUser";
import ProductsList from "./screens/ProductsList";
import Product from "./screens/Product";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AccessDenied from "./screens/AccessDenied";

const Routing = ()=>{

  const user = useSelector(state=>state.user.currentUser)
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
        navigate('/login');
    }
    else if(!user.isAdmin){
        navigate('/access-denied');
    }
  },[user])

  return (
    <>
      {user && user.isAdmin && <Navbar />}

      <div className="app-container">
        {user && user.isAdmin && <Sidebar />}

        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={
                user ? <Navigate to="/" replace={true}/> : <Login />
              } />
              <Route path="/access-denied" element={
                user && user.isAdmin ? <Navigate to="/" replace={true}/> : <AccessDenied />
              } />
              <Route path="/users" element={<UsersList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/products/:productId" element={<Product />} />
              <Route path="/addproduct" element={<AddProduct />} />
          </Routes>

      </div>
    </>
  )

}

function App() {

  return (
    <Router className="App">
      <Routing/>
    </Router>
  );
}

export default App;
