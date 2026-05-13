import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import styles from './MainSlider.module.css';

const MainSlider = () => {
  const slides = [
    { id: 1, img: '/images/1.jpg', title: 'Новинки одежды для дома', link: '/catalog', buttonTitle: 'Выбрать комплект' },
    { id: 2, img: '/images/2.jpg', title: 'Для неё', link: '/catalog', buttonTitle: 'Смотреть все' },
    { id: 3, img: '/images/3.jpg', title: 'Новинки сезона', link: '/catalog', buttonTitle: 'Перейти к покупкам' },
  ];

  return (
    <section className={styles.sliderSection}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className={styles.swiper}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.slideContent}>
              {/* Ссылка теперь только на картинке */}
              <Link to={slide.link} className={styles.imageLink}>
                <img src={slide.img} alt={slide.title} className={styles.image} />
              </Link>

              <div className={styles.overlay}>
                <h6 className={styles.title}>{slide.title}</h6>
                {/* Кнопка — отдельная ссылка, не вложенная в другую */}
                {slide.buttonTitle && (
                  <Link className={styles.slideButton} to={slide.link}>
                    <span>{slide.buttonTitle}</span>
                    <img src="/icons/ArrowRight.svg" alt="Arrow" />
                  </Link>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MainSlider;
