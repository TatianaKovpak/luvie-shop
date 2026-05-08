import { FC, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { closeMiniCartAction, removeFromCartAction } from '../../services/actions/cartActions';
import { TCartItem } from '../../services/types/data';
import styles from './MiniCart.module.css';
import { Link } from 'react-router-dom';

const MiniCart: FC = () => {
    const dispatch = useAppDispatch();
    const { items, isMiniCartVisible } = useAppSelector(state => state.cart);
    
    // Локальное состояние для управления анимацией закрытия
    const [isExiting, setIsExiting] = useState(false);
    const cartRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Функция плавного закрытия
    const handleClose = () => {
        setIsExiting(true); // Включаем класс анимации уезда
        setTimeout(() => {
            dispatch(closeMiniCartAction()); // Реальное удаление из DOM
            setIsExiting(false); // Сброс для следующего открытия
        }, 400); // Время должно совпадать с CSS (0.4s)
    };

    // Запуск таймера на 5 секунд
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

    // Перезапуск таймера при изменении состава корзины
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
                <span>Корзина ({items.length})</span>
                <button className={styles.close} onClick={handleClose}>✕</button>
            </div>

            <div className={styles.itemList}>
                {items.map((item: TCartItem) => (
                    <div className={styles.item} key={`${item.id}-${item.color}-${item.size}`}>
                        <Link 
                            to={`/product/${item.id}/${encodeURIComponent(item.color)}`} 
                            className={styles.itemLink}
                            onClick={handleClose}
                        >
                            <img src={item.image} alt={item.name} className={styles.img} />
                            <div className={styles.info}>
                                <h4>{item.name}</h4>
                                <p>{item.color} / {item.size}</p>
                                <strong>{(item.price * item.quantity).toLocaleString()} ₽</strong>
                            </div>
                        </Link>
                        <button 
                            className={styles.delete} 
                            onClick={() => dispatch(removeFromCartAction({id: item.id, color: item.color, size: item.size}))}
                        >✕</button>
                    </div>
                ))}
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



