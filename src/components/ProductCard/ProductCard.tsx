import React, { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProductCardProps } from '../../types/schema';
import styles from './ProductCard.module.css';

const ProductCard: FC<IProductCardProps> = ({ id, name, price, images, isHit, colorName }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    // Берем первое изображение из массива
    const mainImage = images && images.length > 0 ? images[0] : '';

    const handleCardClick = () => {
        // Переходим на страницу товара с учетом ID и цвета
        navigate(`/product/${id}/${encodeURIComponent(colorName)}`);
    };

    return (
        <div className={styles.productCard} onClick={handleCardClick}>
            <div className={styles.imageContainer}>
                <img src={mainImage} alt={name} className={styles.productImage} />
                
                {isHit && <div className={styles.hitBadge}>ХИТ</div>}
                
                <button 
                    className={styles.favoriteBtn} 
                    onClick={(e) => {
                        e.stopPropagation(); // Остановка всплытия, чтобы не срабатывал переход при лайке
                        setIsFavorite(!isFavorite);
                    }}
                >
                    <img 
                        className={styles.icon} 
                        src={isFavorite ? "/icons/HeartFilled.svg" : "/icons/Heart.svg"} 
                        alt="favorite" 
                    />
                </button>
            </div>

            <div className={styles.info}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.price}>{price} ₽</p>
            </div>

            <div className={styles.overlay}>
                {/* Текст заменен на Подробнее, эффект вжимания в CSS */}
                <button className={styles.button}>Подробнее</button>
            </div>
        </div>
    );
};

export default ProductCard;

