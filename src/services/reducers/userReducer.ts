import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILED, 
    LOGOUT, 
    TUserActions 
} from '../actions/userActions';

export type TUserState = {
    isAuth: boolean;
    user: { name: string; email: string; phone: string } | null;
    loginRequest: boolean;
    loginFailed: boolean;
    errorMessage: string;
};

const initialState: TUserState = {
    isAuth: false,
    user: null,
    loginRequest: false,
    loginFailed: false,
    errorMessage: ''
};

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loginRequest: true, loginFailed: false, errorMessage: '' };
        
        case LOGIN_SUCCESS:
            return { 
                ...state, 
                isAuth: true, 
                user: action.payload, 
                loginRequest: false 
            };
        
        case LOGIN_FAILED:
            return { 
                ...state, 
                loginRequest: false, 
                loginFailed: true, 
                errorMessage: action.payload 
            };
        
        case LOGOUT:
            return { ...initialState }; // Полностью сбрасываем стейт при выходе
            
        default:
            return state;
    }
};