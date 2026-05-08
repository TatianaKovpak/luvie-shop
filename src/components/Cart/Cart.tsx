import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { removeFromCartAction } from '../../services/actions/cartActions';
import { TCartItem } from '../../services/types/data';
import styles from './Cart.module.css';
import { updateQuantity } from '../../services/actions/cartActions';



const Cart: React.FC = () => {
    const dispatch = useAppDispatch();

    // Благодаря типизации в hooks.ts и store.ts, здесь state больше не unknown
    const { items } = useAppSelector((state) => state.cart);

    return (
        <section className={styles.cartPage}>
            <h2 className={styles.cartTitle}>Корзина</h2>
            <div className={styles.cartContents}>
                < div className={styles.cartContent}>
                    <div className={styles.cartContentTitles}>
                        <h3 className={styles.cartContentTitle}>В КОРЗИНЕ</h3>
                        <h3 className={styles.cartContentTitle}>СТОИМОСТЬ</h3>
                        <h3 className={styles.cartContentTitle}>КОЛИЧЕСТВО</h3>
                        <h3 className={styles.cartContentTitle}>ИТОГ</h3>
                    </div>
                    {items && items.map((item: TCartItem) => {
                        return (
                            <div className={styles.cartItem}>
                                <div className={styles.cartItemDescription}>
                                    <Link className={styles.cartItemLink} to={`/product/${item.id}/${encodeURIComponent(item.color)}`}>
                                        <img className={styles.cartItemImage} src={item.image} alt={item.name} />
                                    </Link>
                                    <div className={styles.cartItemInfo}>
                                        <h4>{item.name}</h4>
                                        <p>Размер: {item.size}</p>
                                        <div className={styles.colorInfo}>
                                            <p>Цвет:</p>
                                            {/* Кружок с цветом */}
                                            <div
                                                className={styles.colorCircle}
                                                style={{ backgroundColor: item.colorCode }}
                                                title={item.color}
                                            />
                                            {/* <span>{item.color}</span> */}
                                        </div>
                                    </div>
                                </div>
                                <p>{item.price}</p>

                                <div className={styles.quantityControls}>
                                    <button onClick={() => dispatch(updateQuantity(item.id, item.color, item.size, item.quantity - 1))} disabled={item.quantity <= 1}>
                                        <img src="/icons/Minus.svg" alt="-" />
                                    </button>
                                    <p className={styles.cartItemQuantity}>{item.quantity}</p>
                                    <button onClick={() => dispatch(updateQuantity(item.id, item.color, item.size, item.quantity + 1))}>
                                        <img src="/icons/Plus.svg" alt="+" />
                                    </button>
                                </div>
                                <div className={styles.itemTotal}>
                                    <p>{item.price * item.quantity} &#8381;</p>
                                    <button
                                        onClick={() => dispatch(removeFromCartAction({
                                            id: item.id,
                                            color: item.color,
                                            size: item.size
                                        }))}
                                    >
                                        <img src="/icons/X.svg" alt="X" />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.cartResult}>
                    <h2 className={styles.cartResultTitle}>Ваш заказ</h2>
                    <div className={styles.cartResultSubtitle}>
                        <p>Товары ()</p>
                        <p>3000</p>
                    </div>
                    <div className={styles.cartResultSubtitle}>
                        <p>Доставка</p>
                        <p>100</p>
                    </div>
                    <div className={styles.cartResultSubtitle}>
                        <p>Итого</p>
                        <p>2000</p>
                    </div>
                    <p className={styles.loyalty}>Подключи нашу <Link to={''}>Программу лояльности</Link>  и узнай свои выгоды</p>
                    <button className={styles.cartButton}>Оформить заказ</button>
                </div>
            </div>
        </section >
    )
}

export default Cart