import { Link, useParams } from 'react-router-dom';
import styles from './BreadCrumbs.module.css';

const BreadCrumbs = () => {
    const { gender, category, group, item } = useParams();
    const decode = (str: string | undefined) => (str ? decodeURIComponent(str) : '');

    // Определяем, какой пункт последний (активный)
    const isCatActive = category && !group;
    const isGroupActive = group && !item;
    const isItemActive = !!item;

    return (
        <nav className={styles.breadcrumbs}>
            {/* 1. КАТЕГОРИЯ */}
            {category && (
                <div className={`${styles.itemWrapper} ${isCatActive ? styles.itemWrapperActive : ''}`}>
                    <Link to={`/catalog/${gender}/${category}`} className={styles.link}>
                        {decode(category)}
                    </Link>
                </div>
            )}

            {/* 2. ГРУППА */}
            {group && (
                <>
                    <span className={styles.separator}>&gt;</span>
                    <div className={`${styles.itemWrapper} ${isGroupActive ? styles.itemWrapperActive : ''}`}>
                        <Link to={`/catalog/${gender}/${category}/${group}`} className={styles.link}>
                            {decode(group)}
                        </Link>
                    </div>
                </>
            )}

            {/* 3. ПОДКАТЕГОРИЯ (ITEM) */}
            {item && (
                <>
                    <span className={styles.separator}>&gt;</span>
                    <div className={`${styles.itemWrapper} ${isItemActive ? styles.itemWrapperActive : ''}`}>
                        <span className={styles.current}>{decode(item)}</span>
                    </div>
                </>
            )}
        </nav>
    );
};

export default BreadCrumbs;