import { rootReducer } from "./reducers";
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

// 1. Расширяем интерфейс Window для DevTools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// 2. Объявляем composeEnhancers ПЕРЕД созданием стора
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 3. Создаем стор, используя rootReducer as any (чтобы убрать ошибку с Partial)
export const store = createStore(
  rootReducer as any,
  composeEnhancers(applyMiddleware(thunk))
);

// 4. Экспортируем типы для хуков (hooks.ts)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

