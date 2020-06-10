import React, {Component} from 'react';
import {api} from "../api"

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {products: []};
    }

    async componentDidMount() {
        api.get('/product/getAllProducts').then(
            response => {
                this.setState({
                    products: response.data,
                })
            },
            error => this.setState({ error: true }),
        )
    }

    render() {
        return (
            <div>
                {this.state.products.map((product) =>
                    <li>{product.name}</li>
                )}
            </div>
        );
    }
}

export default Products;
