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
        console.log(this.props)
        let url = "/product/getAllProducts"
        if (this.props.category)
            if (this.props.category === 4)
                url = '/product/caj'
            else
                url = '/product/category/' + this.props.category
        console.log(url)
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

        let url = "/product/getAllProducts/" + filter + "/" + priceRange
        if (this.props.category)
            if(this.props.category === 4)
                url = '/product/caj/' + this.props.category + "/" + filter + "/" + priceRange
        else
            url = '/product/category/' + this.props.category + "/" + filter + "/" + priceRange
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

        const Kategoria = () => {
            let kategoria = this.state.products[0] ? this.state.products[0].kategoria.name : "Error"
            if (kategoria.localeCompare("Error")) {
                if (this.props.category) {
                    if (this.props.category === 4) {
                        kategoria = "ČAJ";
                    } else
                        switch (this.state.products[0].kategoria.parentKategoriaId) {
                            case 4:
                                kategoria = kategoria + " čaj"
                                break;
                            case 0:
                                kategoria = kategoria + " káva"
                                break;
                            default:
                                kategoria = "Príslušenstvo"
                        }

                }
            }
            return kategoria
        }
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

                        <h1>{<Kategoria/>}</h1>
                        <div className={"top-items-container"}>

                            <div className={"grid-container"}>
                                {this.state.products.map((product) =>
                                    <Link
                                        to={ROUTES.PRODUKT + "/" + product.produktId}>
                                        <Card style={{width: '100%'}}>
                                            <Card.Img style={{height: "124px", width: "124px"}} variant="top"
                                                      src={require("../img/products/" + product.galeria[0].name)}/>
                                            <Card.Body>
                                                <Card.Title>{product.name}</Card.Title>
                                                <p>{product.atributy[0].cena}€</p>
                                            </Card.Body>
                                        </Card></Link>
                                )}
                            </div>
                        </div>
                    </>
                }
            </>
        );
    }
}

export default Products;
