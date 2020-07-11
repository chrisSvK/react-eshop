import {ADD_TO_CART} from "../actions/action-types/cart-actions";


const initState = {
    addedItems: [],
    totalPrice: 0

}
const cartReducer = (state = initState, action) => {

    if (action.type === ADD_TO_CART) {

        let addedItem = {product: action.product, atribute_id: action.atribute_id, amount: action.amount}

        let existed_item_id = state.addedItems.findIndex(item => action.product.produktId === item.product.produktId && item.atribute_id === action.atribute_id)


        if (existed_item_id !== -1) {

            let newItem = state.addedItems[existed_item_id]
            newItem.amount = parseInt(newItem.amount) + parseInt(action.amount)

            let addedItems = state.addedItems;
            addedItems.splice(existed_item_id, 1, newItem)

            let totalPrice = 0;


            addedItems.forEach(function (item) {
                totalPrice = totalPrice + (item.amount * (item.product.atributy[item.atribute_id].cena))
            })

            return {
                ...state,
                addedItems,
                totalPrice
            }
        } else {

            let addedItems = state.addedItems
            addedItems.push(addedItem)


            let totalPrice = 0;


            addedItems.forEach(function (item) {
                totalPrice = totalPrice + (item.amount * (item.product.atributy[item.atribute_id].cena))
            })

            return {
                ...state,
                addedItems,
                totalPrice
            }

        }
    } else {
        return state
    }

}
export default cartReducer;
