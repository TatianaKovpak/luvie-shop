import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { clearCartAction, removeFromCartAction, updateQuantity } from '../../services/actions/cartActions';
import { TCartItem } from '../../services/types/data';
import { products } from '../../constants/products';
import CdekWidget from '../CdekWidget/CdekWidget';
import styles from './Cart.module.css';

type TDeliveryMethod = 'pickup' | 'apatity_courier' | 'kirovsk_courier' | 'cdek';

interface ICheckoutFormData {
    lastName: string;
    firstName: string;
    email: string;
    street: string;
    house: string;
    flat: string;
    comment: string;
}

const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const { items } = useAppSelector((state) => state.cart);
    // Получаем статус авторизации и профиль из Redux
    const { isAuth, user } = useAppSelector((state) => state.user);

    // Состояния для доставки
    const [deliveryMethod, setDeliveryMethod] = useState<TDeliveryMethod>('pickup');
    const [cdekPrice, setCdekPrice] = useState<number>(0);
    const [cdekAddress, setCdekAddress] = useState<string>('');

    // Состояния для телефона и полей ввода
    const [phone, setPhone] = useState<string>('');
    const [formData, setFormData] = useState<ICheckoutFormData>({
        lastName: '',
        firstName: '',
        email: '',
        street: '',
        house: '',
        flat: '',
        comment: ''
    });

    // Автоподстановка данных, если пользователь авторизован
    useEffect(() => {
        if (isAuth && user) {
            const nameParts = user.name ? user.name.split(' ') : ['', ''];
            
            setFormData(prev => ({
                ...prev,
                lastName: nameParts[0] || '',
                firstName: nameParts[1] || '',
                email: user.email || ''
            }));
            
            setPhone(user.phone || '');
        }
    }, [isAuth, user]);

    // Расчеты стоимости и количества товаров
    const totalPrice = useMemo(() => {
        return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }, [items]);

    const totalQuantity = useMemo(() => {
        return items.reduce((acc, item) => acc + item.quantity, 0);
    }, [items]);

    const deliveryPrice = useMemo(() => {
        if (deliveryMethod === 'pickup') return 0;
        if (deliveryMethod === 'apatity_courier') return totalPrice >= 2000 ? 0 : 200;
        if (deliveryMethod === 'kirovsk_courier') return totalPrice >= 4000 ? 0 : 500;
        return cdekPrice;
    }, [deliveryMethod, totalPrice, cdekPrice]);

    const finalSum = totalPrice + deliveryPrice;

    const getMaxQuantity = (item: TCartItem) => {
        const product = products.find(p => p.id.toString() === item.id);
        const variant = product?.variants.find(v => v.colorName === item.color);
        const sizeData = variant?.sizes.find(s => s.value === item.size);
        return sizeData?.quantity || 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;
        input = input.replace(/[^\d+]/g, '');

        if (!input || input === '+') {
            setPhone('');
            return;
        }

        if (!input.startsWith('+7') && !input.startsWith('8')) {
            input = '+7' + input.replace(/\D/g, '');
        }

        if (input.length > 12) {
            input = input.substring(0, 12);
        }

        setPhone(input);
    };

    const handlePhoneFocus = () => {
        if (!phone) setPhone('+7');
    };

    const handlePhoneBlur = () => {
        if (phone === '+7') setPhone('');
    };

    const clearForm = () => {
        setPhone('');
        setFormData({
            lastName: '',
            firstName: '',
            email: '',
            street: '',
            house: '',
            flat: '',
            comment: ''
        });
        setCdekPrice(0);
        setCdekAddress('');
        dispatch(clearCartAction());
    };

    return (
        <YMaps query={{ apikey: 'da1d21fd-249f-4481-a321-0abb49f57c3e' }}>
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
                            <p>{deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} ₽`}</p>
                        </div>
                        {cdekAddress && <p className={styles.cdekInfo}>{cdekAddress}</p>}
                        <div className={styles.cartResultSubtitle}>
                            <p>Итого</p>
                            <p className={styles.hitBushTotal}>{finalSum.toLocaleString()} ₽</p>
                        </div>
                        <p className={styles.loyalty}>
                            Подключи нашу <Link to={'/loyalty'}>Программу лояльности</Link> и узнай свои выгоды
                        </p>
                        <button
                            type="submit"
                            // Атрибут form работает только если пользователь авторизован и выбран курьер
                            form={isAuth && (deliveryMethod === 'apatity_courier' || deliveryMethod === 'kirovsk_courier') ? "order-form" : undefined}
                            className={styles.cartButton}
                            disabled={items.length === 0}
                            onClick={(e) => {
                                // КРИТИЧЕСКАЯ ПРОВЕРКА: Если не авторизован — редиректим на страницу логина
                                if (!isAuth) {
                                    e.preventDefault();
                                    navigate('/login');
                                    return;
                               }

                                // Если авторизован, обрабатываем Самовывоз и СДЭК напрямую по клику кнопки
                                if (deliveryMethod === 'pickup' || deliveryMethod === 'cdek') {
                                    e.preventDefault();
                                    alert(`Заказ успешно оформлен! Способ: ${deliveryMethod === 'pickup' ? 'Самовывоз' : 'СДЭК'}`);
                                    clearForm();
                                }
                            }}
                        >
                            Оформить заказ
                        </button>
                    </div>
                </div>

                {/* НИЖНИЙ БЛОК: ДОСТАВКА (ТЕПЕРЬ ВИДЕН ВСЕГДА) */}
                <div className={styles.deliverySection}>
                    <div className={styles.deliveryGrid}>
                        <div className={styles.deliveryOptions}>
                            <label className={styles.radioLabel}>
                                <div className={styles.radioHeader}>
                                    <input 
                                        className={styles.radioInput} 
                                        type="radio" 
                                        name="delivery" 
                                        checked={deliveryMethod === 'pickup'} 
                                        onChange={() => setDeliveryMethod('pickup')} 
                                    />
                                    <span><span>Самовывоз из магазина</span></span>
                                </div>
                                <p className={styles.radioText}>Стоимость доставки 0 рублей<br />Срок доставки 1-5 дней</p>
                            </label>

                            <label className={styles.radioLabel}>
                                <div className={styles.radioHeader}>
                                    <input 
                                        className={styles.radioInput} 
                                        type="radio" 
                                        name="delivery" 
                                        checked={deliveryMethod === 'apatity_courier' || deliveryMethod === 'kirovsk_courier'} 
                                        onChange={() => setDeliveryMethod('apatity_courier')} 
                                    />
                                    <span>Доставка курьером</span>
                                </div>
                                <p className={styles.radioText}>Апатиты (200 ₽) / Кировск (500 ₽)<br />Бесплатно при заказе от 2000 ₽ / 4000 ₽</p>
                            </label>

                            <label className={styles.radioLabel}>
                                <div className={styles.radioHeader}>
                                    <input 
                                        className={styles.radioInput} 
                                        type="radio" 
                                        name="delivery" 
                                        checked={deliveryMethod === 'cdek'} 
                                        onChange={() => setDeliveryMethod('cdek')} 
                                    />
                                    <span>Самовывоз из ПВЗ / СДЭК</span>
                                </div>
                                <p className={styles.radioText}>По тарифу перевозчика по всей России</p>
                            </label>
                        </div>

                        <div className={styles.rightDetailsBlock}>
                            {deliveryMethod === 'pickup' && (
                                <div className={styles.mapWrapper}>
                                    <Map
                                        state={{
                                            center: [67.563430, 33.400072],
                                            zoom: 17,
                                            controls: []
                                        }}
                                        width="100%"
                                        height="100%"
                                    >
                                        <Placemark
                                            geometry={[67.563430, 33.400072]}
                                            options={{
                                                preset: 'islands#brownDotIcon',
                                                iconColor: '#8D6F53'
                                            }}
                                        />
                                    </Map>
                                    <div className={styles.mapOverlay}>
                                        <p>г. Апатиты, Мурманская область</p>
                                        <p>ул. Бредова, д. 14</p>
                                        <p className={styles.mapPhone}>+7 (952) 293-39-58</p>
                                    </div>
                                </div>
                            )}

                            {(deliveryMethod === 'apatity_courier' || deliveryMethod === 'kirovsk_courier') && (
                                <form
                                    id="order-form"
                                    className={styles.checkoutForm}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        alert('Форма заполнена корректно! Отправляем заказ...');
                                        clearForm();
                                    }}
                                >
                                    <div className={styles.formGroup}>
                                        <div className={styles.groupTitle}><img src="/icons/User.svg" alt="" /> Укажите получателя</div>
                                        <div className={styles.inputRow}>
                                            <input className={styles.inputField} type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Фамилия*" required />
                                            <input className={styles.inputField} type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Имя*" required />
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <div className={styles.groupTitle}><img src="/icons/IdentificationCard.svg" alt="" /> Контактные данные</div>
                                        <div className={styles.inputRow}>
                                            <input className={styles.inputField} type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Электронная почта*" required />
                                            <input
                                                className={styles.inputField}
                                                type="tel"
                                                name="phone"
                                                value={phone}
                                                placeholder="Телефон*"
                                                required
                                                onChange={handlePhoneChange}
                                                onFocus={handlePhoneFocus}
                                                onBlur={handlePhoneBlur}
                                                pattern="^\+7[0-9]{10}$"
                                                title="Номер телефона должен содержать +7 и 10 цифр (например, +79522933958)"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <div className={styles.groupTitle}><img src="/icons/download.svg" alt="" /> Адрес доставки</div>
                                        <div className={styles.inputRow}>
                                            <select className={styles.inputField} value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value as TDeliveryMethod)}>
                                                <option value="apatity_courier">Апатиты</option>
                                                <option value="kirovsk_courier">Кировск</option>
                                            </select>
                                            <input className={styles.inputField} type="text" name="street" value={formData.street} onChange={handleInputChange} placeholder="Улица*" required />
                                        </div>
                                        <div className={styles.inputRow}>
                                            <input className={styles.inputField} type="number" name="house" value={formData.house} onChange={handleInputChange} min="1" placeholder="Дом*" required />
                                            <input className={styles.inputField} type="number" name="flat" value={formData.flat} onChange={handleInputChange} min="1" placeholder="Квартира*" required />
                                        </div>
                                    </div>

                                    <div className={styles.formFooter}>
                                        <p className={styles.requiredNote}>Поля, отмеченные звёздочкой, обязательны для заполнения</p>
                                        <div className={styles.commentGroup}>
                                            <div className={styles.groupTitle}>Комментарии к заказу</div>
                                            <textarea className={styles.commentArea} name="comment" value={formData.comment} onChange={handleInputChange} placeholder='Напишите свои пожелания' />
                                        </div>
                                    </div>
                                </form>
                            )}

                            {deliveryMethod === 'cdek' && (
                                <CdekWidget weight={totalQuantity * 150} onSelect={(p: number, a: string) => { setCdekPrice(p); setCdekAddress(a); }} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </YMaps>
    );
};

export default Cart;











