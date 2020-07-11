import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import {withAuthentication} from './components/Session';



import Navigation from "./components/navigation"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import AccountPage from "./pages/account"
import ProductsPage from "./pages/products"
import Container from "react-bootstrap/Container";
import ProductPage from "./pages/product"
import CartPage from "./pages/cart"

const App = () => {
    return (
        <div className="App">
            <Router>
                <Navigation/>
                <main>
                    <Container fluid>
                        <Route exact path={ROUTES.HOME} component={HomePage}/>
                        <Route path={ROUTES.LOGIN} component={LoginPage}/>
                        <Route path={ROUTES.REGISTER} component={RegisterPage}/>
                        <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                        <Route path={ROUTES.CART} component={CartPage}/>
                        <Route path={ROUTES.PRODUCTS} component={ProductsPage}/>
                        <Route path={ROUTES.CAJ} component={() => <ProductsPage category={4}/>}/>
                        <Route path={ROUTES.MLETA} component={() => <ProductsPage category={1}/>}/>
                        <Route path={ROUTES.ZRNKOVA} component={() => <ProductsPage category={2}/>}/>
                        <Route path={ROUTES.KAPSULE} component={() => <ProductsPage category={3}/>}/>
                        <Route path={ROUTES.CIERNY} component={() => <ProductsPage category={5}/>}/>
                        <Route path={ROUTES.ZELENY} component={() => <ProductsPage category={6}/>}/>
                        <Route path={ROUTES.OVOCNY} component={() => <ProductsPage category={7}/>}/>
                        <Route path={ROUTES.BYLINKOVY} component={() => <ProductsPage category={8}/>}/>
                        <Route path={ROUTES.PRISLUSENSTVO} component={() => <ProductsPage category={9}/>}/>
                        <Route path={ROUTES.PRODUKT+"/:id"} component={(props) => <ProductPage {...props}/>}/>
                    </Container>
                </main>
            </Router>
        </div>
    );
}

export default withAuthentication(App);
