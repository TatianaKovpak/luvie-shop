import styles from './Footer.module.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            
            <div className={styles.footer}>
                <div className={styles.feedback}>
                    <Link to="/" className={styles.logoLink}>
                        <img src="/images/logo.svg" alt="LUVIE" className={styles.footerLogo} />
                    </Link>
                    <button className={styles.feedbackButton}>ЗАДАТЬ ВОПРОС</button>
                    <div className={styles.socials}>
                      <img src="/icons/MAX1.svg" alt="MAX" />
                      <img src="/icons/VK1.svg" alt="VK" />
                      <img src="/icons/Telegram1.svg" alt="Telegram" />
                    </div>
                    <p className={styles.copy}>{new Date().getFullYear()} &copy; Все права защищены</p>
                </div>
                <div className={styles.column}>
                    <div>
                        <Link className={styles.columnTitle} to={''}>Покупателям</Link>
                        <ul className={styles.list}>
                            <li><Link className={styles.link} to={''}>Доставка и оплата</Link></li>
                            <li><Link className={styles.link} to={''}>Возврат</Link></li>
                            <li><Link className={styles.link} to={''}>Подарочный сертификат</Link></li>
                            <li><Link className={styles.link} to={''}>Как подобрать размер?</Link></li>
                        </ul>
                    </div>
                    <div>
                        <Link className={styles.columnTitle} to={''}>О магазине</Link>
                        <ul className={styles.list}>
                            <li><Link className={styles.link} to={''}>Акции</Link></li>
                            <li><Link className={styles.link} to={''}>Программа лояльности</Link></li>
                            <li><Link className={styles.link} to={''}>Контакты</Link></li>
                        </ul>
                    </div>
                    <div>
                        <Link className={styles.columnTitle} to={''}>Юридические вопросы</Link>
                        <ul className={styles.list}>
                            <li><Link className={styles.link} to={''}>Политика конфиденциальности</Link></li>
                            <li><Link className={styles.link} to={''}>Использование cookie</Link></li>
                            <li><Link className={styles.link} to={''}>Условия продажи и обслуживания</Link></li>
                            <li><Link className={styles.link} to={''}>Пользовательское соглашение</Link></li>
                            <li><Link className={styles.link} to={''}>Публичная оферта</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            


        </footer>
    )
}

export default Footer