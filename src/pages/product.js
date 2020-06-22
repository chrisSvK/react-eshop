import React, {useEffect, useState} from 'react';
import {api} from "../api";

function Product(props) {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let url = "/product/" + props.match.params.id
        api.get(url).then(
            response => {
                setProduct(response.data);
                setLoading(false);
            },
            error => this.setState({error: true}),
        )
    })

    return (
        <>
            {loading ? <h1>Loading</h1>
                :
                <>
                    <div>{product.name}</div>
                </>

            }
        </>

    );
}

export default Product;
