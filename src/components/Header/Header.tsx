import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import styles from './Header.module.css';

const Header = () => {
    const [activeTitle, setActiveTitle] = useState<'Для нее' | 'Для него' | null>(null);
    const location = useLocation();

    const isFemaleActive = location.pathname.includes('/catalog/female');
    const isMaleActive = location.pathname.includes('/catalog/male');

    return (
        <header className={styles.header} onMouseLeave={() => setActiveTitle(null)}>
            <div className={styles.headerInner}>
                <div className={styles.menu}>
                    {/* НОВИНКИ */}
                    <Link 
                        className={styles.menuPage} 
                        to="/new" 
                        onMouseEnter={() => setActiveTitle(null)}
                    >
                        <p>НОВИНКИ</p>
                    </Link>

                    {/* ДЛЯ НЕЕ */}
                    <div 
                        className={`${styles.navWrapper} ${isFemaleActive ? styles.activeTab : ''}`} 
                        onMouseEnter={() => setActiveTitle('Для нее')}
                    >
                        <div className={styles.menuItemTrigger}>
                            <p className={styles.menuItem}>ДЛЯ НЕЕ</p>
                            <img 
                                src="/icons/CaretDown.svg" 
                                alt="v" 
                                className={`${styles.caretDown} ${(isFemaleActive || activeTitle === 'Для нее') ? styles.rotate : ''}`}
                            />
                        </div>
                    </div>

                    {/* ДЛЯ НЕГО */}
                    <div 
                        className={`${styles.navWrapper} ${isMaleActive ? styles.activeTab : ''}`} 
                        onMouseEnter={() => setActiveTitle('Для него')}
                    >
                        <div className={styles.menuItemTrigger}>
                            <p className={styles.menuItem}>ДЛЯ НЕГО</p>
                            <img 
                                src="/icons/CaretDown.svg" 
                                alt="v" 
                                className={`${styles.caretDown} ${(isMaleActive || activeTitle === 'Для него') ? styles.rotate : ''}`}
                            />
                        </div>
                    </div>
                </div>

                {/* ЛОГОТИП */}
                <Link className={styles.logo} to="/" onMouseEnter={() => setActiveTitle(null)}>
                    <img src="/images/logo.svg" alt="LUVIE" className={styles.logoImage} />
                </Link>

                {/* ПРАВАЯ ЧАСТЬ */}
                <div className={styles.actions} onMouseEnter={() => setActiveTitle(null)}>
                    <Link className={styles.menuPage} to="/delivery"><p>ДОСТАВКА</p></Link>
                    <Link className={styles.menuPage} to="/contacts"><p>КОНТАКТЫ</p></Link>
                    <div className={styles.frame}>
                        <Link to="/search"><img src="/icons/MagnifyingGlass.svg" alt="S" /></Link>
                        <Link to="/favorites"><img src="/icons/Heart.svg" alt="H" /></Link>
                        <Link to="/profile"><img src="/icons/User.svg" alt="U" /></Link>
                        <Link to="/cart"><img src="/icons/Bag.svg" alt="B" /></Link>                 
                    </div>
                </div>
            </div>

            {/* ВЫПАДАЮЩЕЕ МЕНЮ */}
            {activeTitle && (
                <div onClick={() => setActiveTitle(null)}>
                    <DropDownMenu title={activeTitle} />
                </div>
            )}
        </header>
    );
};

export default Header;

