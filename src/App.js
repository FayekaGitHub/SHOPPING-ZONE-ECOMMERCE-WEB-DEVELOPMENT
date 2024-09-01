import React, { Component } from "react"; 
import Navbar from "./navbar/Navbar";
import Home from "./routes/Home";
import Categories from "./routes/Categories";
import Cart from "./routes/Cart";
import EachCategory from "./routes/EachCategory"
import DisplayProducts from "./routes/DisplayProducts";
import Profile from "./routes/Profile"
import Orders from "./routes/Orders";
import User from "./routes/User";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar/> 
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/categories/:category" element={<EachCategory />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/products" element={<DisplayProducts />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
