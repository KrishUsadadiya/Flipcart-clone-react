
const initialState = {
    products: [],
    viewData: [],
    cartData: [],
    items: [],
    isCreated: false,
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_DATA":
            return {
                ...state,
                products: action.payload
            }
        case "VIEW_DATA":
            return {
                ...state,
                viewData: action.payload
            }
        case "ADD_NEW_PRODUCT":
            return {
                ...state,
                isCreated: true
            }
        case "GET_CART_DATA":
            return {
                ...state,
                cartData: action.payload
            }
        case "CLEAR_CART":
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}

export default productReducer;
