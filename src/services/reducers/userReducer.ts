import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILED, 
    LOGOUT, 
    TUserActions,
    UPDATE_USER_DATA
} from '../actions/userActions';

export type TUserState = {
    isAuth: boolean;
    user: { name: string; email: string; phone: string; dateOfBirth?: string } | null;
    loginRequest: boolean;
    loginFailed: boolean;
    errorMessage: string;
};

// Дефолтный гостевой стейт для сброса при LOGOUT
const guestState: TUserState = {
    isAuth: false,
    user: null,
    loginRequest: false,
    loginFailed: false,
    errorMessage: ''
};

// Твой тестовый стейт с авторизацией Татьяны
const initialState: TUserState = {
    isAuth: true, 
    user: { name: "Ковпак Татьяна", email: "tanya@luvie.ru", phone: "+79522933958", dateOfBirth: "13 апреля 1990" },
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
            // Очищаем localStorage при выходе
            localStorage.removeItem('luvie_user');
            return { ...guestState }; // Возвращаем чистый гостевой стейт вместо захардкоженного

        case UPDATE_USER_DATA: {
            if (!state.user) return state;

            const updatedUser = {
                ...state.user,
                name: action.payload.name,
                email: action.payload.email,
                dateOfBirth: action.payload.dateOfBirth
            };

            // Синхронизируем обновленного пользователя с локальной памятью браузера
            localStorage.setItem('luvie_user', JSON.stringify(updatedUser));

            return {
                ...state,
                user: updatedUser
            };
        }
            
        default:
            return state;
    }
};

