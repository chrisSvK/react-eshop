import React, {Component} from 'react';
import {api} from "../api"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FilterOptions from "../components/filterOptions";
import * as ROUTES from "../constants/routes";
import {Link} from "react-router-dom";

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoading: true,
            filterOption: false,
            error: false
        };

    }

    componentDidMount() {
        let url = "/product/getAllProducts"
        if (this.props.category)
            url = '/product/category/' + this.props.category
        api.get(url).then(
            response => {
                this.setState({
                    products: response.data,
                    isLoading: false
                })
            },
            error => this.setState({error: true}),
        )
    }

    filterShowHandler = () => {
        this.setState(state => ({filterOption: !state.filterOption}))
    }

    onSubmit = (event) => {
        event.preventDefault()
        let filter = event.target.elements.filterOption.value
       let priceRange = event.target.elements.priceRange.value

        let url = "/product/getAllProducts/" + filter + "/"+ priceRange
        if (this.props.category)
            url = '/product/category' + this.props.category + "/" + filter + "/" + priceRange
        api.get(url).then(
            response => {
                this.setState({
                    products: response.data,
                    isLoading: false
                })
            },
            error => this.setState({error: true}),
        )
    }

    render() {


        return (
            <>
                {this.state.isLoading
                    ? <div>
                        {this.state.error ? <h1>ERROR</h1> : null}
                    </div>
                    : <>
                        <Button
                            onClick={this.filterShowHandler}
                        >FILTER</Button>

                        <FilterOptions display={this.state.filterOption} closeFilter={this.filterShowHandler}
                                       onSubmit={this.onSubmit}/>

                        <h1>{this.state.products[0] ? this.state.products[0].kategoria.name : "NIKHAJ"}</h1>
                        <div className={"grid-container"}>
                            {this.state.products.map((product) =>
                                <Card style={{width: '100%'}}>
                                    <Card.Img style={{height: "124px", width: "124px"}} variant="top"
                                              src={require("../img/products/" + product.galeria[0].name)}/>
                                    <Card.Body>
                                        <Link to={ROUTES.PRODUKT+"/"+product.produktId}><Card.Title>{product.name}</Card.Title></Link>
                                        <p>{product.atributy[0].cena}€</p>
                                    </Card.Body>
                                </Card>
                            )}
                        </div>
                    </>
                }
            </>
        );
    }
}

export default Products;
