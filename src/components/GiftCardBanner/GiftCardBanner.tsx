import styles from './GiftCardBanner.module.css'
import { Link } from 'react-router-dom';

const GiftCardBanner = () => {
    return(
        <section className={styles.giftBanner}>
            <h2 className={styles.giftTitle}>Подарочный сертификат</h2>
            <p className={styles.giftInfo}>Порадуйте своих близких и любимых. <br />Подарочный сертификат - это идеальный вариант, <br />
             который учитывает индивидуальные предпочтения покупателя.</p>
            <Link className={styles.giftButton} to={''}>
                 <span>Подробнее</span>
                <img src="/icons/ArrowRight.svg" alt="Arrow" />
            </Link>

            
        </section>
    )
}

export default GiftCardBanner