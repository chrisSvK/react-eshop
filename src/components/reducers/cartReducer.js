import {ADD_TO_CART} from "../actions/action-types/cart-actions";


const initState = {
    addedItems: [],
    totalPrice: 0

}
const cartReducer = (state = initState, action) => {
//INSIDE HOME COMPONENT
    if (action.type === ADD_TO_CART) {

        // console.log(action)
        // return state
        let addedItem = {product: action.product, atribute_id: action.atribute_id, amount: action.amount}
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.product.id === item.product.id && item.atribute_id === action.atribute_id)
        if (existed_item) {
            addedItem.quantity += 1
            return {
                ...state,
                // total: state.total + addedItem.price
            }
        } else {
            //addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.product.atributy[addedItem.atribute_id].cena

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }

        }
    } else {
        return state
    }

}
export default cartReducer;
