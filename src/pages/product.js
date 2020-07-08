import React, {useEffect, useState} from 'react';
import {api} from "../api";
import Card from "react-bootstrap/Card";

function Product(props) {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let url = "/product/" + props.match.params.id
        api.get(url).then(
            response => {
                setProduct(response.data);
                setLoading(false);
            }
        )
    }, [])

    return (
        <>
            {loading ? <h1>Loading</h1>
                :
                <div id={"productDetail"}>
                    <div id={"leftProductDetail"}>
                        <h5>{product.name}</h5>
                        <img src={require("../img/products/" + product.galeria[0].name)} alt={"product"}/>

                        {product.atributy.map((atribut) =>
                            <>
                                <input type="radio" id="male" name="gender" value="male"/>
                                <label htmlFor="male">{atribut.value} / {atribut.cena}€</label>
                            </>
                        )}


                        <div>
                            <input maxlength="4" size="1"/>
                            <label style={{float: "left", marginTop: "30px", marginLeft: "10px"}}>ks</label>
                        </div>
                        <button>Vložiť do košíka</button>
                    </div>
                    <div id={"rightProductDetail"}>
                        <p>{product.popis}</p>
                        <p><b>Dostupnosť:</b> Na sklade</p>
                        <p><b>Dátum doručenia:</b> 15.09.2020</p>
                    </div>
                </div>

            }
        </>

    );
}

export default Product;
