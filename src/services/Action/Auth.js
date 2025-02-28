import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";


const loginSuc = (user) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: user
    }
}

const signupSuc = (user) => {
    return {
        type: "SIGNUP_SUCCESS",
        payload: user
    }
}

const signupErr = (error) => {
    return {
        type: "SIGNUP_ERROR",
        payload: error
    }
}

const loginErr = (error) => {
    return {
        type: "LOGIN_ERROR",
        payload: error
    }
}
export const signupAsync = (email, password) => {
    return async dispatch => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    console.log(res.user)
                    dispatch(signupSuc(res.user))
                })
                .catch(err => {
                    console.log(err);
                    dispatch(signupErr(err))
                });
        } catch (err) {
            console.log(err);
            dispatch(signupErr(err))
        }
    }
}

export const loginAsync = (email, password) => {
    return async dispatch => {
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    console.log(res.user)
                    dispatch(loginSuc(res.user))
                })
                .catch(err => {
                    console.log(err);
                    dispatch(loginErr(err))
                });
        } catch (err) {
            console.log(err);
            dispatch(loginErr(err))
        }
    }
}
