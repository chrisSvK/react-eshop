import {ADD_TO_CART, DELETE_FROM_CART, CHANGE_QUANTITY} from "./action-types/cart-actions";

export const addToCart= (product, atribute_id, amount)=>{
    return{
        type: ADD_TO_CART,
        product, atribute_id, amount }
}

export const deleteFromCart= (product_id, atribute_id)=>{
    return{
        type: DELETE_FROM_CART,
        product_id, atribute_id }
}

export const changeQuantity= (product_id, atribute_id, amount)=>{
    return{
        type: CHANGE_QUANTITY,
        product_id, atribute_id, amount }
}
