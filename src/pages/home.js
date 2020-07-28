import React, {useEffect, useState} from 'react';
import {api} from "../api";
import Card from "react-bootstrap/Card";
import {BrowserRouter as Router, Link} from "react-router-dom";
import * as ROUTES from "../constants/routes";

const Home = () => {
    const [favProducts, setFavProducts] = useState(null);
    const [newProducts, setNewProducts] = useState(null);
    const [favLoading, setLoadingFav] = useState(true)
    const [newLoading, setLoadingNew] = useState(true)

    useEffect(() => {
        let url = "/product/getPopular/"
        api.get(url).then(
            response => {
                setFavProducts(response.data);
                setLoadingFav(false);
            }
        )
        url = "/product/getNew/"
        api.get(url).then(
            response => {
                setNewProducts(response.data);
                setLoadingNew(false);
            }
        )
    }, [])

    return (
        <div>
            <img style={{width: "100%", position: "absolute", left: 0}} src={require("../img/homeLayout.jpg")}/>
            <div className="scroll-downs">
                <div className="mousey">
                    <div className="scroller"><div id={"scrollerText"}>Scroll down</div></div>
                </div>
            </div>
            <h1 style={{position: "relative", fontSize: "200px", margin: 0, padding: "20px", textShadow: "1px 2px 10px black", color: "white"}}>Coffee Planet</h1>
            <div>
                <div  style={{marginTop:"300px"}} className={"top-items-container"}>
                    <h5> Obľúbené</h5>
                    <div className={"grid-container"}>
                        {favLoading ? <></> : <>{favProducts.map((product) =>
                            <Link
                                to={ROUTES.PRODUKT + "/" + product.produktId}>
                                <Card>
                                    <Card.Img variant="top"
                                              src={require("../img/products/" + product.galeria[0].name)}/>
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <p>{product.atributy[0].cena}€</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        )}</>}

                    </div>
                </div>
                <div className={"top-items-container"}>
                    <h5>Nové produkty</h5>
                    <div className={"grid-container"}>
                        {newLoading ? <></> : <>{newProducts.map((product) =>
                            <Link
                                to={ROUTES.PRODUKT + "/" + product.produktId}>
                                <Card>
                                    <Card.Img variant="top"
                                              src={require("../img/products/" + product.galeria[0].name)}/>
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <p>{product.atributy[0].cena}€</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        )}</>}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home
