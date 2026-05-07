import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProductCardProps } from '../../types/schema';
import styles from './ProductCard.module.css';

const ProductCard = ({ id, name, price, images, isHit, colorName }: IProductCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    const mainImage = images && images.length > 0 ? images[0] : '';

    const handleCardClick = () => {
        // Переходим на URL с ID и Цветом
        navigate(`/product/${id}/${colorName}`);
    };

    return (
        <div className={styles.productCard} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className={styles.imageContainer}>
                <img src={mainImage} alt={name} className={styles.productImage} />
                {isHit && <div className={styles.hitBadge}>ХИТ</div>}
                <button className={styles.favoriteBtn} onClick={(e) => {
                    e.stopPropagation();
                    setIsFavorite(!isFavorite);
                }}>
                    <img src={isFavorite ? "/icons/HeartFilled.svg" : "/icons/Heart.svg"} alt="fav" />
                </button>
            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.price}>{price} ₽</p>
            </div>
            <div className={styles.overlay}>
                <button className={styles.button} onClick={(e) => e.stopPropagation()}>Добавить в корзину</button>
            </div>
        </div>
    );
};

export default ProductCard;
