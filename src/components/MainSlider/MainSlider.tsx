import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import styles from './MainSlider.module.css';

const MainSlider = () => {
  
  const slides = [
    { id: 1, img: '/images/1.jpg', title: 'Новинки одежды для дома', link: '', buttonTitle: 'Выбрать комплект' },
    { id: 2, img: '/images/2.jpg', title: 'Для неё', link: '', buttonTitle: '' },
    { id: 3, img: '/images/3.jpg', title: 'Новинки сезона', link: '', buttonTitle: '' },
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
            <Link to={slide.link} className={styles.slideLink}>
              <div className={styles.slideContent}>
                <img src={slide.img} alt={slide.title} className={styles.image} />
                <div className={styles.overlay}>
                  <h6 className={styles.title}>{slide.title}</h6>
                  <Link className={styles.slideButton} to={''}>
                    <span>{slide.buttonTitle}</span>
                    <img src="/icons/ArrowRight.svg" alt="Arrow" />
                  </Link>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MainSlider;