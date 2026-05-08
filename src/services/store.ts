import { rootReducer, RootState } from "./reducers";
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// 1. Функция сохранения данных в LocalStorage
const saveToLocalStorage = (state: RootState) => {
  try {
    // Сохраняем только массив товаров из корзины
    const serializedCart = JSON.stringify(state.cart.items);
    localStorage.setItem('luvie_cart', serializedCart);
  } catch (e) {
    console.warn("Не удалось сохранить корзину в LocalStorage", e);
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore<RootState, any, any, any>(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// 2. Подписываем стор на изменения
// Теперь при каждом добавлении или удалении товара, список будет улетать в память браузера
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type AppDispatch = typeof store.dispatch;
