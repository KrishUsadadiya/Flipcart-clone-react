import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const getAllData = (data) => {
    return {
        type: "GET_ALL_DATA",
        payload: data
    }
}
const viewData = (data) => {
    return {
        type: "VIEW_DATA",
        payload: data
    }
}
const addNewProduct = () => {
    return {
        type: "ADD_NEW_PRODUCT",
    }
}
const getCartData = (data) => {
    return {
        type: "GET_CART_DATA",
        payload: data
    }
}

export const getProductsAsync = () => {
    return (dispatch) => {
        axios.get("https://fakestoreapi.com/products")
            .then((res) => {
                dispatch(getAllData(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const viewDataAsync = (id) => {
    return (dispatch) => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((res) => {
                dispatch(viewData(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export const addToCartAsync = (data, totalPrice, count) => {
    return async (dispatch) => {
        try {
            let res = await addDoc(collection(db, "Product-Cart"), data, totalPrice, count);
            dispatch(addNewProduct());
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCartDataAsync = () => {
    return async (dispatch) => {
        try {
            let res = await getDocs(collection(db, "Product-Cart"));
            let rec = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch(getCartData(rec));
        } catch (error) {
            console.log(error);

        }
    }
}

export const removeFromCartAsync = (itemId) => {
    return async (dispatch) => {
        try {
            const productRef = doc(db, "Product-Cart", `${itemId}`);
            await deleteDoc(productRef);
            dispatch(getCartDataAsync());
        } catch (error) {
            console.log("Error removing item from cart:", error);
        }
    };
};

export const clearCartAsync = (items) => {
    return {
        type: "CLEAR_CART",
        payload: items
    }
}