import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { removeFromCartAction, updateQuantity } from '../../services/actions/cartActions';
import { TCartItem } from '../../services/types/data';
import { products } from '../../constants/products';
import styles from './Cart.module.css';

const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state) => state.cart);

    const totalPrice = useMemo(() => {
        return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }, [items]);

    const totalQuantity = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
}, [items]);

    const getMaxQuantity = (item: TCartItem) => {
        const product = products.find(p => p.id.toString() === item.id);
        const variant = product?.variants.find(v => v.colorName === item.color);
        const sizeData = variant?.sizes.find(s => s.value === item.size);
        return sizeData?.quantity || 0;
    };


    return (
        <section className={styles.cartPage}>
            <h2 className={styles.cartTitle}>Корзина</h2>
            <div className={styles.cartContents}>
                <div className={styles.cartContent}>
                    {/* ФИКСИРОВАННЫЕ ЗАГОЛОВКИ */}
                    <div className={styles.cartContentTitles}>
                        <h3 className={styles.cartContentTitle}>В КОРЗИНЕ</h3>
                        <h3 className={styles.cartContentTitle}>СТОИМОСТЬ</h3>
                        <h3 className={styles.cartContentTitle}>КОЛИЧЕСТВО</h3>
                        <h3 className={styles.cartContentTitle}>ИТОГ</h3>
                    </div>

                    {/* СКРОЛЛ-ОБЛАСТЬ ДЛЯ ТОВАРОВ */}
                    <div className={styles.itemsList}>
                        {items.length > 0 ? items.map((item: TCartItem) => {
                            const maxQty = getMaxQuantity(item);
                            return (
                                <div className={styles.cartItem} key={`${item.id}-${item.color}-${item.size}`}>
                                    <div className={styles.cartItemDescription}>
                                        <Link className={styles.cartItemLink} to={`/product/${item.id}/${encodeURIComponent(item.color)}`}>
                                            <img className={styles.cartItemImage} src={item.image} alt={item.name} />
                                        </Link>
                                        <div className={styles.cartItemInfo}>
                                            <h4>{item.name}</h4>
                                            <p>Размер: {item.size}</p>
                                            <div className={styles.colorInfo}>
                                                <p>Цвет:</p>
                                                <div
                                                    className={styles.colorCircle}
                                                    style={{ backgroundColor: item.colorCode }}
                                                    title={item.color}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <p className={styles.priceText}>{item.price.toLocaleString()} ₽</p>

                                    <div className={styles.quantityControls}>
                                        <button 
                                            onClick={() => dispatch(updateQuantity(item.id, item.color, item.size, item.quantity - 1))} 
                                            disabled={item.quantity <= 1}
                                        >
                                            <img src="/icons/Minus.svg" alt="-" />
                                        </button>
                                        <p className={styles.cartItemQuantity}>{item.quantity}</p>
                                        <button 
                                            onClick={() => dispatch(updateQuantity(item.id, item.color, item.size, item.quantity + 1))}
                                            disabled={item.quantity >= maxQty}
                                        >
                                            <img src="/icons/Plus.svg" alt="+" />
                                        </button>
                                    </div>

                                    <div className={styles.itemTotal}>
                                        <p>{(item.price * item.quantity).toLocaleString()} ₽</p>
                                        <button
                                            className={styles.deleteBtn}
                                            onClick={() => dispatch(removeFromCartAction({
                                                id: item.id,
                                                color: item.color,
                                                size: item.size
                                            }))}
                                        >
                                            <img src="/icons/X.svg" alt="Удалить" />
                                        </button>
                                    </div>
                                </div>
                            )
                        }) : <p className={styles.emptyCart}>Ваша корзина пуста</p>}
                    </div>
                </div>

                {/* ПРАВАЯ ЧАСТЬ (ИТОГИ) */}
                <div className={styles.cartResult}>
                    <h2 className={styles.cartResultTitle}>Ваш заказ</h2>
                    <div className={styles.cartResultSubtitle}>
                        <p>Товары ({totalQuantity})</p>
                        <p>{totalPrice.toLocaleString()} ₽</p>
                    </div>
                    <div className={styles.cartResultSubtitle}>
                        <p>Доставка</p>
                        <p>Бесплатно</p>
                    </div>
                    <div className={styles.cartResultSubtitle}>
                        <p>Итого</p>
                        <p className={styles.hitBushTotal}>{totalPrice.toLocaleString()} ₽</p>
                    </div>
                    <p className={styles.loyalty}>
                        Подключи нашу <Link to={'/loyalty'}>Программу лояльности</Link> и узнай свои выгоды
                    </p>
                    <button className={styles.cartButton} disabled={items.length === 0}>
                        Оформить заказ
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Cart;

