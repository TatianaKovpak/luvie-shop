import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Favorites.module.css';
import GiftCardBanner from '../GiftCardBanner/GiftCardBanner';

const Favorites: React.FC = () => {
    // Достаем актуальный список отложенных товаров из глобального Redux-стейта
    const { items } = useAppSelector((state) => state.favorites);

    return (
        <>
        <section className={styles.favoritesPage}>
            <h2 className={styles.favoritesTitle}>Избранное</h2>

            {items.length > 0 ? (
                <div className={styles.favoritesGrid}>
                    {items.map((item) => (
                        <ProductCard 
                            key={`${item.id}-${item.colorName}`}
                            id={item.id}
                            name={item.name}
                            /* Переводим число из Redux в строку для пропсов карточки */
                            price={item.price !== null && item.price !== undefined ? item.price.toString() : '0'} 
                            /* Передаем массив картинок напрямую, без скобок, так как в Redux уже лежит массив */
                            images={item.images} 
                            colorName={item.colorName}
                            colorCode={item.colorCode} 
                            isHit={item.isHit} 
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.emptyFavorites}>
                    <p>В избранном пока нет товаров</p>
                </div>
            )}
            
        </section>
        
        <GiftCardBanner/>
        </>
        
    );
};

export default Favorites;






