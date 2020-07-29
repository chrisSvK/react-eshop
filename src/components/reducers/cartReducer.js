import {ADD_TO_CART, CHANGE_QUANTITY, DELETE_FROM_CART} from "../actions/action-types/cart-actions";


const initState = {
    addedItems: [],
    totalPrice: 0

}

function calculateTotalPrice(addedItems) {
    let totalPrice = 0;


    addedItems.forEach(function (item) {
        totalPrice = totalPrice + (item.amount * (item.product.atributy[item.atribute_id].cena))
    })

    return totalPrice
}

const cartReducer = (state = initState, action) => {

    if (action.type === ADD_TO_CART) {
        console.log("ADD TO CART")
        let addedItem = {product: action.product, atribute_id: action.atribute_id, amount: action.amount}

        let existed_item_id = state.addedItems.findIndex(item => action.product.produktId === item.product.produktId && item.atribute_id === action.atribute_id)


        if (existed_item_id !== -1) {

            //TODO Object.assign(addedItems, state.addedItems)
            let newItem = state.addedItems[existed_item_id]
            newItem.amount = parseInt(newItem.amount) + parseInt(action.amount)

            let addedItems = state.addedItems;
            addedItems.splice(existed_item_id, 1, newItem)

            let totalPrice = calculateTotalPrice(addedItems)

            return {
                ...state,
                addedItems,
                totalPrice
            }
        } else {

            let addedItems = state.addedItems
            addedItems.push(addedItem)

            let totalPrice = calculateTotalPrice(addedItems)

            return {
                ...state,
                addedItems,
                totalPrice
            }

        }
    }

    if (action.type === DELETE_FROM_CART) {

        let existed_item_id = state.addedItems.findIndex(item =>
            action.product_id === item.product.produktId &&
            item.atribute_id === action.atribute_id)

        if (existed_item_id !== -1) {

            let addedItems = [];
            Object.assign(addedItems, state.addedItems)
            addedItems.splice(existed_item_id, 1)


            let totalPrice = calculateTotalPrice(addedItems)

            return {
                ...state,
                addedItems: addedItems,
                totalPrice,
            };
        } else return state

    }
    if (action.type === CHANGE_QUANTITY) {

        let addedItems = [];
        Object.assign(addedItems, state.addedItems)


        let existed_item_id = addedItems.findIndex(item => action.product_id === item.product.produktId
            && item.atribute_id === action.atribute_id)


        if(existed_item_id !== -1) {
            addedItems[existed_item_id].amount = action.amount
        }

        let totalPrice = calculateTotalPrice(addedItems)

        return {
            ...state,
            addedItems: addedItems,
            totalPrice,
        };


    } else {
        return state
    }

}
export default cartReducer;
