import React, {Component} from 'react';

class Slider extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = ({
            value: 50
        })
    }


    sliderHandler = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render() {


        return (
            <div>
                <input name="priceRange" type="range" min="1" max="100" value={this.state.value} className="slider"
                       id="myRange" onInput={this.sliderHandler}/>
                <span style={{float: "left"}}>1€</span>
                <span style={{marginLeft: ""}}>{this.state.value}€</span>
                <span style={{float: "right"}}>100€</span>
            </div>
        );
    }
}

export default Slider;
