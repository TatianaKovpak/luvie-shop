import { useMemo } from 'react';
import { products } from '../../constants/products';
import ProductCard from '../ProductCard/ProductCard';
import styles from '../BestSellers/BestSellers.module.css'

interface RelatedProductsProps {
    relatedIds?: number[];
}

const RelatedProducts = ({ relatedIds }: RelatedProductsProps) => {
    // Находим реальные объекты товаров по списку ID
    const relatedItems = useMemo(() => {
        if (!relatedIds || relatedIds.length === 0) return [];
        // Фильтруем основной массив, оставляя только те товары, чей ID есть в списке сопутствующих
        return products.filter(p => relatedIds.includes(p.id));
    }, [relatedIds]);

    if (relatedItems.length === 0) return null;

    return (
        <div className={styles.grid}>
            {relatedItems.map((product) => {
                // Для рекомендаций берем первый вариант (цвет) товара
                const mainVariant = product.variants[0];
                return (
                    <ProductCard 
                        key={product.id}
                        id={product.id.toString()}
                        name={product.name}
                        images={mainVariant.images}
                        price={mainVariant.price}
                        colorName={mainVariant.colorName}
                        colorCode={mainVariant.colorCode}
                        isHit={mainVariant.isHit}
                    />
                );
            })}
        </div>
    );
};

export default RelatedProducts;