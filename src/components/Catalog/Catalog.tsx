import { useParams, Link } from 'react-router-dom';
import { menuData } from '../../constants/menuData';
import { products } from '../../constants/products'; // ИМПОРТИРУЕМ РЕАЛЬНЫЕ ТОВАРЫ
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import ProductCard from '../ProductCard/ProductCard';
import styles from './Catalog.module.css';
import GiftCardBanner from '../GiftCardBanner/GiftCardBanner';

const Catalog = () => {
    const { gender, category, group, item } = useParams();
    const decode = (str: string | undefined) => str ? decodeURIComponent(str) : '';
    
    const activeGender = gender === 'female' ? 'Для нее' : 'Для него';
    const activeCat = decode(category);
    const activeGroup = decode(group);
    const activeItem = decode(item);

    const currentGenderData = menuData.find(m => m.title === activeGender);
    const currentCat = currentGenderData?.categories.find(c => c.name === activeCat);
    
    const currentGroup = currentCat?.groups?.find(g => {
        const names = Array.isArray(g.groupName) ? g.groupName : [g.groupName];
        return names.includes(activeGroup);
    });

    const subLinks = currentGroup?.items || [];
    const isFinalLevel = !!activeItem || (!!activeGroup && subLinks.length === 0) || (!!activeCat && (!currentCat?.groups || currentCat.groups.length === 0));

    // ФИЛЬТРАЦИЯ ТОВАРОВ:
    // Пока просто фильтруем по полу, в будущем добавим фильтр по категориям МойСклад
    const filteredProducts = products.filter(p => {
        // Здесь можно добавить логику: если в МойСклад у товара категория "Трусы", 
        // и в URL сейчас "Трусы" — показываем его. 
        // Пока выводим всё для теста, но с правильными ссылками.
        return true; 
    });

    return (
        <section className={styles.catalog}>
            <div className={styles.topPadding}>
                <BreadCrumbs />
            </div>

            <div className={styles.navContainer}>
                {!isFinalLevel ? (
                    <div className={styles.subNavigation}>
                        {subLinks.length > 0 ? (
                            subLinks.map((name) => (
                                <Link key={name} to={`/catalog/${gender}/${category}/${group}/${name}`} className={styles.subNavLink}>
                                    {name}
                                </Link>
                            ))
                        ) : (
                            currentCat?.groups?.map((g, idx) => {
                                const names = Array.isArray(g.groupName) ? g.groupName : [g.groupName];
                                return names.map(n => (
                                    <Link key={n} to={`/catalog/${gender}/${category}/${n}`} className={styles.subNavLink}>
                                        {n}
                                    </Link>
                                ))
                            })
                        )}
                    </div>
                ) : (
                    <div className={styles.filtersBar}>
                        <div className={styles.filterGroup}>
                            <Link className={styles.filterBtn} to={''}>Новинки</Link>
                            <button className={styles.filterBtn}>Стоимость <img src="/icons/CaretDown.svg" alt="v" /></button>
                            <button className={styles.filterBtn}>Модель<img src="/icons/CaretDown.svg" alt="v" /></button>
                            <button className={styles.filterBtn}>Цвет <img src="/icons/CaretDown.svg" alt="v" /></button>
                            <button className={styles.filterBtn}>Размер <img src="/icons/CaretDown.svg" alt="v" /></button> 
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.gridPadding}>
                <div className={styles.productGrid}>
                    {/* ТЕПЕРЬ МАПИМ РЕАЛЬНЫЕ ТОВАРЫ */}
                    {filteredProducts.map(product => 
    product.variants.map(variant => (
        <ProductCard 
            key={`${product.id}-${variant.colorName}`}
            id={product.id.toString()}
            name={product.name}
            images={variant.images}
            price={variant.price}
            colorName={variant.colorName} // ТЕПЕРЬ ОБЯЗАТЕЛЬНО
            colorCode={variant.colorCode}
            isHit={variant.isHit}
        />
    ))
)}
                </div>
            </div>
            <GiftCardBanner/>
        </section>
    );
};

export default Catalog;


