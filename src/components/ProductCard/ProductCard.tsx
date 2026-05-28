import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { addToFavoritesAction, removeFromFavoritesAction } from '../../services/actions/favoritesActions';
import { IProductCardProps } from '../../types/schema';
import styles from './ProductCard.module.css';

const ProductCard: FC<IProductCardProps> = ({ id, name, price, images, isHit, colorName, colorCode }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Достаем актуальный список избранного из Redux-стейта
    const { items } = useAppSelector((state) => state.favorites);

    // Берем первое изображение из массива, если это массив строк, либо саму строку
    const mainImage = images && images.length > 0 ? images[0] : '';

    // Проверяем, отложена ли именно эта модель в именно этом цвете
    const isFavorite = items.some(x => x.id.toString() === id.toString() && x.colorName === colorName);

    const handleCardClick = () => {
        navigate(`/product/${id}/${encodeURIComponent(colorName)}`);
    };

    // Обработчик клика по кнопке-сердечку
    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Останавливаем переход на страницу товара

        // ОЧИСТКА: вырезаем пробелы, буквы, валюту и превращаем строку price в чистое число number
        const cleanPrice = typeof price === 'number' 
            ? price 
            : parseInt(price.toString().replace(/[^\d]/g, ''), 10) || 0;

        // Объект строго под интерфейс IFavoriteProduct (в файле экшенов)
        const productData = { 
            id: id.toString(), 
            name, 
            price: cleanPrice, // Передаем строго как number
            images, 
            isHit: !!isHit, 
            colorName, 
            colorCode 
        };

        if (isFavorite) {
            // Если уже в избранном — удаляем по связке ID + цвет
            dispatch(removeFromFavoritesAction(id.toString(), colorName));
        } else {
            // Если вещи нет — добавляем
            dispatch(addToFavoritesAction(productData));
        }
    };

    return (
        <div className={styles.productCard} onClick={handleCardClick}>
            <div className={styles.imageContainer}>
                <img src={mainImage} alt={name} className={styles.productImage} />
                
                {isHit && <div className={styles.hitBadge}>ХИТ</div>}
                
                <button 
                    type="button" 
                    className={styles.favoriteBtn} 
                    onClick={handleFavoriteClick}
                    title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
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
                {/* Выводим цену, добавляя к ней знак рубля */}
                <p className={styles.price}>{price} ₽</p>
            </div>

            <div className={styles.overlay}>
                <button className={styles.button}>Подробнее</button>
            </div>
        </div>
    );
};

export default ProductCard;





