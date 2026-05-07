import { Link } from 'react-router-dom'
import styles from './PromoBanner.module.css'

const PromoBanner = () => {
    return (
        <section className={styles.promoSection}>
            <div className={styles.promoContent}>
                <div>
                    <h6 className={styles.promoTitle}>Комфорт для него и для неё</h6>
                    <p className={styles.promoText}>Домашняя одежда и белье Clever Wear. <br /> Идеальное качество, проверенное временем.</p>
                </div>
                <Link className={styles.promoButton} to={''}>
                    <span>В каталог</span>
                    <img src="/icons/ArrowRight.svg" alt="Arrow" />
                </Link>
            </div>
        </section>
    )
}

export default PromoBanner