import styles from './Cart.module.css'
import { Link } from 'react-router-dom'

const Cart = () => {
    return (
        <section className={styles.cartPage}>
            <h2 className={styles.cartTitle}>Корзина</h2>
            <div className={styles.cartContents}>
                <div className={styles.cartContent}>
                    <div>
                        <h3 className={styles.cartContentTitle}>В КОРЗИНЕ</h3>
                    </div>
                    <div>
                        <h3 className={styles.cartContentTitle}>СТОИМОСТЬ</h3>
                    </div>
                    <div>
                        <h3 className={styles.cartContentTitle}>КОЛИЧЕСТВО</h3>
                    </div>
                    <div>
                        <h3 className={styles.cartContentTitle}>ИТОГ</h3>
                    </div>
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
        </section>
    )
}

export default Cart