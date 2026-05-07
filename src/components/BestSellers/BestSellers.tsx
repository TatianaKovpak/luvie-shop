import styles from './BestSellers.module.css'
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import { products } from '../../constants/products';

const BestSellers = () => {
    // 1. Собираем только те варианты, которые помечены как isHit
    // flatMap превращает вложенные массивы вариантов в один плоский список
    const hitVariants = products.flatMap(product => 
        product.variants
            .filter(variant => variant.isHit) // Оставляем только хиты
            .map(variant => ({
                ...variant,
                parentId: product.id,
                parentName: product.name
            }))
    );

    return (
        <section className={styles.bestSellersSection}>
            <h2 className={styles.title}>Хиты продаж</h2>
            
            <div className={styles.grid}>
                {hitVariants.map((hit) => (
                    <ProductCard 
                        key={`${hit.parentId}-${hit.colorName}`}
                        id={hit.parentId.toString()}
                        name={hit.parentName}
                        images={hit.images}
                        price={hit.price}
                        colorName={hit.colorName}
                        colorCode={hit.colorCode}
                        isHit={hit.isHit}
                    />
                ))}
            </div>
            
            <Link to={'/catalog/female'} className={styles.link}>
                <p>Смотреть все</p>
                <img className={styles.linkImage} src="/icons/ArrowRight.svg" alt="Смотреть все" />
            </Link>
        </section>
    )
}

export default BestSellers;
