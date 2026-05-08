import React, { useMemo } from 'react';
import { FC, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { closeMiniCartAction, removeFromCartAction, updateQuantity } from '../../services/actions/cartActions';
import { TCartItem } from '../../services/types/data';
import { products } from '../../constants/products'; // Для проверки остатков
import styles from './MiniCart.module.css';
import { Link } from 'react-router-dom';

const MiniCart: FC = () => {
    const dispatch = useAppDispatch();
    const { items, isMiniCartVisible } = useAppSelector(state => state.cart);
    
    const [isExiting, setIsExiting] = useState(false);
    const cartRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Функция для получения максимального остатка товара на складе
    const getMaxQuantity = (item: TCartItem) => {
        const product = products.find(p => p.id.toString() === item.id);
        const variant = product?.variants.find(v => v.colorName === item.color);
        const sizeData = variant?.sizes.find(s => s.value === item.size);
        return sizeData?.quantity || 0;
    };

    const totalQuantity = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
}, [items]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            dispatch(closeMiniCartAction());
            setIsExiting(false);
        }, 300);
    };

    const startTimer = () => {
        stopTimer();
        timerRef.current = setTimeout(handleClose, 5000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        if (isMiniCartVisible) {
            document.addEventListener('mousedown', handleClickOutside);
            startTimer();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            stopTimer();
        };
    }, [isMiniCartVisible]);

    useEffect(() => {
        if (isMiniCartVisible) startTimer();
    }, [items.length]);

    if (!isMiniCartVisible) return null;

    const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div 
            className={`${styles.miniCart} ${isExiting ? styles.miniCartExit : ''}`} 
            ref={cartRef}
            onMouseEnter={stopTimer}
            onMouseLeave={startTimer}
        >
            <div className={styles.header}>
                <span>Корзина ({totalQuantity})</span>
                <button className={styles.close} onClick={handleClose}>✕</button>
            </div>

            <div className={styles.itemList}>
                {items.map((item: TCartItem) => {
                    const maxQty = getMaxQuantity(item);
                    return (
                        <div className={styles.item} key={`${item.id}-${item.color}-${item.size}`}>
                            <Link 
                                to={`/product/${item.id}/${encodeURIComponent(item.color)}`} 
                                className={styles.itemLink}
                                onClick={handleClose}
                            >
                                <img src={item.image} alt={item.name} className={styles.img} />
                            </Link>
                            
                            <div className={styles.info}>
                                <Link 
                                    to={`/product/${item.id}/${encodeURIComponent(item.color)}`} 
                                    className={styles.nameLink}
                                    onClick={handleClose}
                                >
                                    <h4>{item.name}</h4>
                                </Link>
                                <p>{item.color} / {item.size}</p>
                                
                                <div className={styles.controlsRow}>
                                    <div className={styles.quantityControls}>
                                        <button 
                                            onClick={() => dispatch(updateQuantity(item.id, item.color, item.size, item.quantity - 1))} 
                                            disabled={item.quantity <= 1}
                                        >
                                            <img src="/icons/Minus.svg" alt="-" />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button 
                                            onClick={() => dispatch(updateQuantity(item.id, item.color, item.size, item.quantity + 1))}
                                            disabled={item.quantity >= maxQty}
                                        >
                                            <img src="/icons/Plus.svg" alt="+" />
                                        </button>
                                    </div>
                                    <strong>{(item.price * item.quantity).toLocaleString()} ₽</strong>
                                </div>
                            </div>

                            <button 
                                className={styles.delete} 
                                onClick={() => dispatch(removeFromCartAction({id: item.id, color: item.color, size: item.size}))}
                            >✕</button>
                        </div>
                    );
                })}
            </div>

            <div className={styles.footer}>
                <div className={styles.total}>
                    <span>Итого:</span>
                    <strong>{totalPrice.toLocaleString()} ₽</strong>
                </div>
                <Link to="/cart" className={styles.link} onClick={handleClose}>
                    Перейти в корзину
                </Link>
            </div>
        </div>
    );
};

export default MiniCart;

