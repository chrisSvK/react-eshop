import React, {Component} from 'react';
import {withFirebase} from "../Firebase";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withAuthorization} from "../Session";
import {deleteFromCart, changeQuantity} from "../actions/cartActions";
import Button from "react-bootstrap/Button";

const CartPage = (props) => (
    <CartPageBase items={props.items} totalPrice={props.totalPrice} deleteFromCart={props.deleteFromCart}
                  changeQuantity={props.changeQuantity}/>

);

class CartPageBase extends Component {

    render() {
        const deleteItem = (product_id, atribute_id) => {
            this.props.deleteFromCart(product_id, atribute_id)
        }

        const changeAmount = (produktId, atribute_id, event) => {
            if (event.target.value > 0 ) {
                console.log("PUSTIL SI MA")
                this.props.changeQuantity(produktId, atribute_id, event.target.value)
            }
        }

        const checkAmount = (event, amount) => {
            console.log(event.target.value)
            console.log(isNaN(event.target.value))

            if(isNaN(event.target.value) || event.target.value <= 0)
                event.target.value = amount
        }


        let itemList = this.props.items.map(item => {
            return (
                <tr>
                    <th>
                        <div className="card-image">
                            <img src={require("../../img/products/" + item.product.galeria[0].name)} alt={"product"}/>
                        </div>
                    </th>
                    <th>{item.product.name}</th>
                    <th>
                        <b> {item.product.atributy[item.atribute_id].value} / {item.product.atributy[item.atribute_id].cena}€</b>
                    </th>
                    <th>
                        <div style={{display: "inline-flex"}}>
                            <input onChange={(event) => changeAmount(item.product.produktId, item.atribute_id, event)}
                                   type="text"
                                   defaultValue={item.amount} maxLength="3" size="3"
                                   onBlur={(event) => checkAmount(event, item.amount)}/>
                            <Button onClick={() => deleteItem(item.product.produktId, item.atribute_id)}>X</Button>
                        </div>
                    </th>
                </tr>
            )
        })

        console.log(itemList.length)
        return (
            <>
                <h3 style={{color: "black"}}>Nákupný košík</h3>
                <div className="container">
                    <div id={"cart"}>


                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Počet</th>
                            </tr>
                            </thead>
                            <tbody>

                            {itemList.length === 0 ?
                                <h2 style={{color: "black"}}>Prázdny</h2>
                                : itemList}

                            </tbody>
                            <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>PLNÁ CENA <b>{this.props.totalPrice.toFixed(2)}€</b></th>
                                <th></th>
                            </tr>
                            </tfoot>
                        </table>


                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        totalPrice: state.totalPrice
    }
}

const condition = authUser => !!authUser;

const CartPageForm = withRouter(withFirebase(CartPageBase))

const mapDispatchToProps = (dispatch) => {

    return {
        deleteFromCart: (product_id, atribute_id) => {
            dispatch(deleteFromCart(product_id, atribute_id))
        },

        changeQuantity: (product_id, atribute_id, amount) => {
            dispatch(changeQuantity(product_id, atribute_id, amount))
        }
    }
}

export default withAuthorization(condition)(connect(mapStateToProps, mapDispatchToProps)(CartPage));

export {CartPageForm};
