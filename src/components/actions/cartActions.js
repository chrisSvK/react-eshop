import {ADD_TO_CART} from "./action-types/cart-actions";

export const addToCart= (product, atribute_id, amount)=>{
    return{
        type: ADD_TO_CART,
        product, atribute_id, amount }
}
