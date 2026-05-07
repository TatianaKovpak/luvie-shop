import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { products } from '../../constants/products';
import styles from './ProductPage.module.css';
import { Swiper as SwiperType } from 'swiper';

// Стили Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import RelatedProducts from '../RelatedProducts/RelatedProducts';

const ProductPage = () => {
    const { id, color } = useParams<{ id: string, color: string }>();
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [counter, setCounter] = useState<number>(0);

    // 1. Поиск товара и хлебных крошек
    const product = useMemo(() => products.find(p => p.id.toString() === id), [id]);
    const breadcrumbs = useMemo(() => product?.pathName.split('/') || [], [product]);

    // 2. Определение начального индекса цвета
    const initialIndex = useMemo(() => {
        if (!product || !color) return 0;
        const index = product.variants.findIndex(v => v.colorName === decodeURIComponent(color));
        return index !== -1 ? index : 0;
    }, [product, color]);

    const [activeVariantIdx, setActiveVariantIdx] = useState(initialIndex);

    // 3. Лимит счетчика на основе реального количества (quantity)
    const maxAvailable = useMemo(() => {
        if (!product || !selectedSize) return 0;
        const variant = product.variants[activeVariantIdx];
        const sizeData = variant.sizes.find(s => s.value === selectedSize);
        return sizeData?.quantity || 0;
    }, [product, selectedSize, activeVariantIdx]);

    // 4. Синхронизация при смене цвета или товара
    useEffect(() => {
        setActiveVariantIdx(initialIndex);
        setSelectedSize(null);
        window.scrollTo(0, 0);
    }, [initialIndex, id]);

    // 5. Сброс счетчика при выборе размера
    useEffect(() => {
        setCounter(selectedSize ? 1 : 0);
    }, [selectedSize]);

    if (!product) return <div className={styles.error}>Товар не найден</div>;

// 2. Безопасно получаем текущий вариант
// Если activeVariantIdx стал невалидным для нового товара, берем первый доступный [0]
const currentVariant = useMemo(() => {
    return product.variants[activeVariantIdx] || product.variants[0];
}, [product, activeVariantIdx]);

// 3. Безопасно считаем цену
const price = useMemo(() => {
    if (!currentVariant) return 0;
    return Number(currentVariant.price.replace(/\D/g, ''));
}, [currentVariant]);

// 4. Сброс индекса при смене товара (вот тут нужен useEffect)
useEffect(() => {
    // Если мы перешли на другой товар, и старый индекс больше, 
    // чем количество цветов у нового товара — сбрасываем в 0
    if (!product.variants[activeVariantIdx]) {
        setActiveVariantIdx(0);
    }
}, [id, product.variants, activeVariantIdx]);

    return (
        <section className={styles.productPage}>
            <div className={styles.container}>
                <div className={styles.mainInfo}>

                    {/* ГАЛЕРЕЯ */}
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

                    {/* ДЕТАЛИ ТОВАРА */}
                    <aside className={styles.details}>
                        <div className={styles.stickyContent}>

                            {/* КРОШКИ */}
                            <nav className={styles.productBreadcrumbs}>
                                {breadcrumbs.slice(1).map((item, index, filteredArr) => (
                                    <React.Fragment key={item}>
                                        <span>{item}</span>
                                        {index < filteredArr.length - 1 && (
                                            <span className={styles.separator}>
                                                <img src="/icons/Ellipse.svg" alt="" />
                                            </span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </nav>

                            <h1 className={styles.title}>{product.name}</h1>
                            <p className={styles.description}>{product.description}</p>

                            <button className={styles.likeButton}>
                                <img src="/icons/Heart.svg" alt="" />
                                <p>ДОБАВИТЬ В ИЗБРАННОЕ</p>
                            </button>

                            {/* ЦВЕТ */}
                            <div className={styles.optionGroup}>
                                <p className={styles.optionLabel}>Цвет : <span>{currentVariant.colorName}</span></p>
                                <div className={styles.colorList}>
                                    {product.variants.map((v, i) => (
                                        <button
                                            key={v.colorName}
                                            className={`${styles.colorCircle} ${activeVariantIdx === i ? styles.activeColor : ''}`}
                                            style={{ backgroundColor: v.colorCode }}
                                            onClick={() => {
                                                if (activeVariantIdx === i) return;
                                                setActiveVariantIdx(i);
                                                setSelectedSize(null);
                                            }}
                                            title={v.colorName}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* РАЗМЕР */}
                            <div className={styles.optionGroup}>
                                <p className={styles.optionLabel}>Размер</p>
                                <div className={styles.sizeList}>
                                    {currentVariant.sizes.map((s) => (
                                        <button
                                            key={s.value}
                                            disabled={!s.inStock}
                                            className={`
                                                ${styles.sizeBtn} 
                                                ${selectedSize === s.value ? styles.activeSize : ''} 
                                                ${!s.inStock ? styles.disabledBtn : ''}
                                            `}
                                            onClick={() => setSelectedSize(selectedSize === s.value ? null : s.value)}
                                        >
                                            {s.value}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* ПОКУПКА */}
                            <div className={styles.purchaseActions}>
                                <div className={styles.counter}>
                                    <button
                                        className={styles.minus}
                                        onClick={() => counter > 1 && setCounter(counter - 1)}
                                        disabled={counter <= 1}
                                    >
                                        <img src="/icons/Minus.svg" alt="меньше" />
                                    </button>

                                    <p>{counter}</p>

                                    <button
                                        className={styles.plus}
                                        onClick={() => counter < maxAvailable && setCounter(counter + 1)}
                                        disabled={counter >= maxAvailable || !selectedSize}
                                    >
                                        <img src="/icons/Plus.svg" alt="больше" />
                                    </button>
                                </div>

                                <p className={styles.price}>{(counter * price) || price} ₽</p>

                                <button className={styles.buyBtn} disabled={!selectedSize}>
                                    {selectedSize ? "В корзину" : "Выберите размер"}
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className={styles.setBlock}>
                    <h6 className={styles.setTitle}>Прекрасный комплект</h6>
                    <div className={styles.setImages}>
                        <img src="/icons/card.svg" alt="item1" />
                        <img className={styles.plusIcon} src="/icons/Plus.svg" alt="+" />
                        <img src="/icons/card (1).svg" alt="item2" />
                        <img className={styles.plusIcon} src="/icons/Plus.svg" alt="+" />
                        <img src="/icons/card (2).svg" alt="item3" />
                    </div>
                </div>
                <div className={styles.relatedIds}>
                    <h3 className={styles.relatedIdsTitle}>Сочетается с...</h3>
                    <p className={styles.relatedIdsSubtitle}>Возможно, Вам понравится</p>
                    <RelatedProducts relatedIds={product.relatedIds}/>
                    <Link className={styles.relatedIdsLink} to={''}>
                    Смотреть все
                    <img className={styles.linkArrow} src="/icons/ArrowRight.svg" alt="" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductPage;
