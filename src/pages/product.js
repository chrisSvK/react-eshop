import React, {useEffect, useState} from 'react';
import {api} from "../api";
import Button from "react-bootstrap/Button";
import {addToCart } from '../components/actions/cartActions'
import {connect} from "react-redux";

function Product(props) {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [atribute_id, setAtribute] = useState("0");
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        let url = "/product/" + props.match.params.id
        api.get(url).then(
            response => {
                setProduct(response.data);
                setLoading(false);
            }
        )
    }, [])


    const addToCart = (event) => {
        event.preventDefault();
        props.addToCart(product, atribute_id, amount)
    }

    const onAttChange = (event) => {
        console.log("Atribut " + event.target.value);
        setAtribute(event.target.value);
    }

    const onAmountChange = (event) => {
        if (event.target.value > 0 || event.target.value === "") {
            setAmount(event.target.value);
        }

    }

    const checkAmount = () => {
        if (amount < 1)
            setAmount(1)
    }


    return (
        <>
            {loading ? <h1>Loading</h1>
                :
                <div id={"productDetail"}>
                    <div id={"leftProductDetail"}>
                        <h5>{product.name}</h5>
                        <img src={require("../img/products/" + product.galeria[0].name)} alt={"product"}/>

                        <form onSubmit={addToCart}>
                            {product.atributy.map((atribut, i) =>
                                <div>
                                    <input onChange={onAttChange} value={i} checked={atribute_id === "0"} type="radio"/>
                                    <label htmlFor="atribute"><b>{atribut.value} / {atribut.cena}€</b></label>
                                </div>
                            )}
                            <div>
                                <input onBlur={checkAmount} onChange={onAmountChange} value={amount} maxlength="2"
                                       size="1"/>
                                <label style={{float: "left", marginTop: "30px", marginLeft: "10px"}}>ks</label>
                            </div>
                            <Button type={"submit"}>Vložiť do košíka</Button>
                        </form>
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

const mapStateToProps = (state)=>{
    return {
        items: state.items
    }
}
const mapDispatchToProps= (dispatch)=>{

    return{
        addToCart: (product, atribute_id, amount)=>{dispatch(addToCart(product, atribute_id, amount))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Product);
