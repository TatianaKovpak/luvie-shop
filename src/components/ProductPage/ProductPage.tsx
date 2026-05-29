import React, { useState, useMemo, useEffect, FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

// Стили Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { products } from '../../constants/products';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { addToCartAction } from '../../services/actions/cartActions';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import styles from './ProductPage.module.css';

const ProductPage: FC = () => {
    const { id, color } = useParams<{ id: string, color: string }>();
    const dispatch = useAppDispatch();

    // Достаем актуальный список товаров в корзине для контроля остатков
    const { items: cartItems } = useAppSelector((state) => state.cart);

    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [counter, setCounter] = useState<number>(0);

    const product = useMemo(() => products.find(p => p.id.toString() === id), [id]);
    const breadcrumbs = useMemo(() => product?.pathName.split('/') || [], [product]);

    const initialIndex = useMemo(() => {
        if (!product || !color) return 0;
        const index = product.variants.findIndex(v => v.colorName === decodeURIComponent(color));
        return index !== -1 ? index : 0;
    }, [product, color]);

    const [activeVariantIdx, setActiveVariantIdx] = useState(initialIndex);

    const currentVariant = useMemo(() => {
        return product?.variants[activeVariantIdx] || product?.variants[0];
    }, [product, activeVariantIdx]);

    const price = useMemo(() => {
        if (!currentVariant) return 0;
        return Number(currentVariant.price.toString().replace(/\D/g, ''));
    }, [currentVariant]);

    // Считаем, сколько штук этого размера и цвета УЖЕ лежит в корзине пользователя
    const alreadyInCartQty = useMemo(() => {
        if (!product || !currentVariant || !selectedSize) return 0;
        const existingItem = cartItems.find(
            item => item.id === product.id.toString() && 
                    item.color === currentVariant.colorName && 
                    item.size === selectedSize
        );
        return existingItem ? existingItem.quantity : 0;
    }, [cartItems, product, currentVariant, selectedSize]);

    // УМНЫЙ МАКСИМАЛЬНЫЙ ОСТАТОК: вычитаем из общего остатка МоегоСклада то, что уже добавлено
    const maxAvailable = useMemo(() => {
        if (!currentVariant || !selectedSize) return 0;
        const sizeData = currentVariant.sizes.find(s => s.value === selectedSize);
        const totalStock = sizeData?.quantity || 0;
        
        const available = totalStock - alreadyInCartQty;
        return available > 0 ? available : 0;
    }, [currentVariant, selectedSize, alreadyInCartQty]);

    useEffect(() => {
        setActiveVariantIdx(initialIndex);
        setSelectedSize(null);
        window.scrollTo(0, 0);
    }, [initialIndex, id]);

    useEffect(() => {
        setCounter(selectedSize && maxAvailable > 0 ? 1 : 0);
    }, [selectedSize, maxAvailable]);

    // ФУНКЦИЯ ДОБАВЛЕНИЯ В КОРЗИНУ С ОГРАНИЧИТЕЛЕМ
    const handleAddToCart = () => {
        if (product && currentVariant && selectedSize && counter > 0) {
            const sizeData = currentVariant.sizes.find(s => s.value === selectedSize);
            const totalStock = sizeData?.quantity || 0;

            if (alreadyInCartQty + counter > totalStock) {
                alert(`Невозможно добавить. На складе всего ${totalStock} шт., а у вас в корзине уже лежит ${alreadyInCartQty} шт.`);
                return;
            }

            dispatch(addToCartAction({
                id: product.id.toString(),
                name: product.name,
                price: price,
                image: currentVariant.images && currentVariant.images.length > 0 ? currentVariant.images[0] : '', 
                color: currentVariant.colorName,
                colorCode: currentVariant.colorCode, 
                size: selectedSize,
                quantity: counter
            }));
            setSelectedSize(null);
        }
    };

    if (!product || !currentVariant) return <div className={styles.error}>Товар не найден</div>;


       return (
        <section className={styles.productPage}>
            <div className={styles.container}>
                <div className={styles.mainInfo}>
                    
                    {/* ТВОЙ СВАЙПЕР */}
                    <Swiper
                        className={styles.swiper}
                        modules={[Autoplay, Pagination, EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        speed={1000}
                        pagination={{ clickable: true }}
                        loop={true}
                        observer={true}
                        observeParents={true}
                        onSwiper={(swiper) => setSwiperInstance(swiper)}
                        onTap={(swiper) => swiper.slideNext()}
                    >
                        {currentVariant.images.map((img, i) => (
                            <SwiperSlide key={i} className={styles.slide}>
                                <img
                                    src={img}
                                    alt={`${product.name} ${i}`}
                                    className={styles.bigImage}
                                    style={{ cursor: 'pointer' }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <aside className={styles.details}>
                        <div className={styles.stickyContent}>
                            <nav className={styles.productBreadcrumbs}>
                                {breadcrumbs.slice(1).map((item, index, arr) => (
                                    <React.Fragment key={index}>
                                        <span>{item}</span>
                                        {index < arr.length - 1 && <span className={styles.separator}><img src="/icons/Ellipse.svg" alt="" /></span>}
                                    </React.Fragment>
                                ))}
                            </nav>

                            <h1 className={styles.title}>{product.name}</h1>
                            <p className={styles.description}>{product.description}</p>

                            <button className={styles.likeButton}>
                                <img src="/icons/Heart.svg" alt="" />
                                <p>ДОБАВИТЬ В ИЗБРАННОЕ</p>
                            </button>

                            <div className={styles.optionGroup}>
                                <p className={styles.optionLabel}>Цвет : <span>{currentVariant.colorName}</span></p>
                                <div className={styles.colorList}>
                                    {product.variants.map((v, i) => (
                                        <button
                                            key={i}
                                            className={`${styles.colorCircle} ${activeVariantIdx === i ? styles.activeColor : ''}`}
                                            style={{ backgroundColor: v.colorCode }}
                                            onClick={() => { setActiveVariantIdx(i); setSelectedSize(null); }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className={styles.optionGroup}>
                                <div className={styles.sizeHeaderWrapper}>
                                    <p className={styles.optionLabel}>Размер</p>
                                    
                                    {/* ССЫЛКА НА СТРАНИЦУ ТАБЛИЦЫ РАЗМЕРОВ */}
                                    <Link to="/size-guide" className={styles.sizeGuideLink}>
                                        гид по размерам
                                    </Link>
                                </div>
                                <div className={styles.sizeList}>
                                    {currentVariant.sizes.map((s) => {
                                        const isOutOfStockInCart = (cartItems.find(
                                            item => item.id === product.id.toString() && 
                                                    item.color === currentVariant.colorName && 
                                                    item.size === s.value
                                        )?.quantity || 0) >= s.quantity;

                                        return (
                                            <button
                                                key={s.value}
                                                disabled={!s.inStock || isOutOfStockInCart}
                                                className={`${styles.sizeBtn} ${selectedSize === s.value ? styles.activeSize : ''} ${(!s.inStock || isOutOfStockInCart) ? styles.disabledBtn : ''}`}
                                                onClick={() => setSelectedSize(selectedSize === s.value ? null : s.value)}
                                            >
                                                {s.value}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className={styles.purchaseActions}>
                                <div className={styles.counter}>
                                    <button onClick={() => setCounter(c => c - 1)} disabled={counter <= 1}>
                                        <img src="/icons/Minus.svg" alt="-" />
                                    </button>
                                    <p>{counter}</p>
                                    <button onClick={() => setCounter(c => c + 1)} disabled={counter >= maxAvailable || !selectedSize}>
                                        <img src="/icons/Plus.svg" alt="+" />
                                    </button>
                                </div>

                                <p className={styles.price}>{(counter * price || price).toLocaleString()} ₽</p>

                                <button className={styles.buyBtn} disabled={!selectedSize || maxAvailable === 0} onClick={handleAddToCart}>
                                    {selectedSize ? (maxAvailable === 0 ? "Всё в корзине" : "В корзину") : "Выберите размер"}
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className={styles.setBlock}>
                    <h6 className={styles.setTitle}>Прекрасный комплект</h6>
                    <div className={styles.setImages}>
                        <img src="/icons/card.svg" alt="" />
                        <img src="/icons/Plus.svg" className={styles.plusIcon} alt="" />
                        <img src="/icons/card (1).svg" alt="" />
                        <img src="/icons/Plus.svg" className={styles.plusIcon} alt="" />
                        <img src="/icons/card (2).svg" alt="" />
                    </div>
                </div>

                <div className={styles.relatedWrapper}>
                    <h3 className={styles.relatedTitle}>Сочетается с...</h3>
                    <RelatedProducts relatedIds={product.relatedIds} />
                </div>
            </div>
        </section>
    );
};

export default ProductPage;
