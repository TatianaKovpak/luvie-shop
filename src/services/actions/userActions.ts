export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILED = 'LOGIN_FAILED' as const;
export const LOGOUT = 'LOGOUT' as const;
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA' as const;

export interface ILoginRequestAction { readonly type: typeof LOGIN_REQUEST; }
export interface ILoginSuccessAction { 
    readonly type: typeof LOGIN_SUCCESS; 
    readonly payload: { name: string; email: string; phone: string; dateOfBirth?: string }; 
}
export interface ILoginFailedAction { readonly type: typeof LOGIN_FAILED; readonly payload: string; }
export interface ILogoutAction { readonly type: typeof LOGOUT; }

// 1. ИСПРАВЛЕНО: Перенесли интерфейс выше, чтобы TypeScript знал о нем до создания объединенного типа
export interface IUpdateUserDataAction {
    readonly type: typeof UPDATE_USER_DATA;
    readonly payload: { name: string; email: string; dateOfBirth?: string };
}

// Объединенный тип всех экшенов пользователя (теперь все типы объявлены выше)
export type TUserActions = 

    | ILoginRequestAction 
    | ILoginSuccessAction 
    | ILoginFailedAction 

    | ILogoutAction
    | IUpdateUserDataAction;

// Генераторы экшенов (Action Creators)
export const loginRequestAction = (): ILoginRequestAction => ({ type: LOGIN_REQUEST });
export const loginSuccessAction = (user: { name: string; email: string; phone: string; dateOfBirth?: string }): ILoginSuccessAction => ({ 
    type: LOGIN_SUCCESS, 
    payload: user 
});
export const loginFailedAction = (error: string): ILoginFailedAction => ({ type: LOGIN_FAILED, payload: error });
export const logoutAction = (): ILogoutAction => ({ type: LOGOUT });
export const updateUserDataAction = (data: { name: string; email: string; dateOfBirth?: string }): IUpdateUserDataAction => ({
    type: UPDATE_USER_DATA,
    payload: data
});
