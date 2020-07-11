import React, {Component} from 'react';
import {withFirebase} from "../Firebase";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withAuthorization} from "../Session";
import {api} from "../../api";

const CartPage = (props) => (
    <CartPageBase items={props.items}/>

);

class CartPageBase extends Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    componentDidMount() {
        // this.props.items.map(item => {
        //     let url = "/product/" + item.id
        //     api.get(url).then(
        //         response => {
        //             this.setState(state => {
        //                 const items = [...state.items, response.data];
        //                 return {items}
        //             })
        //         }
        //     )
        // })

    }

    render() {
        let itemList = this.props.items.map(item => {
            
            return (
                <tr>
                    <th>
                        <div className="card-image">
                            <img src={require("../../img/products/" + item.product.galeria[0].name)} alt={"product"}/>
                        </div>
                    </th>
                    <th><span className="card-title">{item.product.name}</span></th>
                    <th>
                        <b> {item.product.atributy[item.atribute_id].value} / {item.product.atributy[item.atribute_id].cena}</b>
                    </th>
                </tr>
            )
        })
        return (
            <>
                <p>KOSIK</p>
                <div className="container">
                    <h3 className="center" style={{color: "black"}}>Itemy v kosiku</h3>

                    <table>
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th></th>
                            <th>Pocet</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itemList}
                        </tbody>
                    </table>


                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.addedItems
    }
}
const condition = authUser => !!authUser;

const CartPageForm = withRouter(withFirebase(CartPageBase))

export default withAuthorization(condition)(connect(mapStateToProps)(CartPage));

export {CartPageForm};
