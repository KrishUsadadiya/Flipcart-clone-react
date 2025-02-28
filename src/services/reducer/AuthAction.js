
const initialState = {
    user: null,
    error: null,
    isLoading: false,
    isSignup: false,
    isLogin: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                isLogin: true
            }
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                isSignup: true
            }
        case "SIGNUP_ERROR":
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                isSignup: false
            }
        case "LOGIN_ERROR":
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                isLogin: false
            }
        default:
            return state;
    }
}

export default authReducer;
