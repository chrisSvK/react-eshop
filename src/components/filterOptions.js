import React, {Component} from 'react';
import Slider from "./slider";
import Button from "react-bootstrap/Button";

class FilterOptions extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = ({
            value: 5
        })
    }


    render() {
        return (
            this.props.display
                ? <div id="filterMode">
                    <Button onClick={this.props.closeFilter} >X</Button>
                    <b>Zoradiť podľa</b>
                    <form method="get" onSubmit={this.props.onSubmit}>
                        <select name="filterOption">
                            <option value="filter1">A->Z</option>
                            <option value="filter2">Z->A</option>
                            <option value="filter3">Najnižšia cena</option>
                            <option value="filter4">Najvyššia cena</option>
                            <option value="filter5">Najnovšie</option>
                            <option value="filter6">Najstaršie</option>
                            <option value="filter7">Najobľúbenejšie</option>
                        </select>
                        <Button type="submit" id="filterOn" >Filtruj</Button>
                        <br/>
                        <b>Max cena</b>
                        <Slider/>
                    </form>
                </div>
                : null
        );
    }
}

export default FilterOptions;
