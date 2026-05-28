import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const Login: React.FC = () => {
    const navigate = useNavigate();

    // Состояния для хранения введенных данных
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Ссылка на инпут пароля, чтобы перекидывать туда фокус по клику на стрелочку Email
    const passwordInputRef = useRef<HTMLInputElement>(null);

    // Функция, которая срабатывает при нажатии на стрелочку в поле Email
    const handleEmailArrowClick = () => {
        if (email.includes('@') && email.includes('.')) {
            passwordInputRef.current?.focus(); // Перекидываем фокус на ввод пароля
        }
    };

    // Функция отправки всей формы
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Сюда в будущем встанет твой dispatch(loginUserAction({ email, password }))
        console.log('Авторизация пользователя:', { email, password });

        // Очищаем стейты после успешного входа
        setEmail('');
        setPassword('');

        // Возвращаем клиента к покупкам
        navigate('/cart');
    };

    return (
        <section className={styles.authPage}>
            <div className={styles.image}>
                <img src="/images/Image.jpg" alt="" />
            </div>

            <div className={styles.formContainer}>
                <h2 className={styles.title}>Авторизоваться</h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {/* ИНПУТ EMAIL С КНОПКОЙ-СТРЕЛОЧКОЙ */}
                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail*"
                            required
                        />
                        <button
                            type="button"
                            className={styles.inputArrowBtn}
                            onClick={handleEmailArrowClick}
                            tabIndex={-1} // Чтобы tab не цеплялся за стрелочку
                        >
                            <img src="/icons/ArrowRight.svg" alt="Далее" />
                        </button>
                    </div>

                    {/* ИНПУТ ПАРОЛЯ С КНОПКОЙ-СТРЕЛОЧКОЙ */}
                    <div className={styles.inputWrapper}>
                        <input
                            ref={passwordInputRef} // Привязали реф для фокуса
                            className={styles.input}
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Пароль*"
                            required
                        />
                        {/* Эта стрелка отправляет всю форму, так как тип по умолчанию submit */}
                        <button type="submit" className={styles.inputArrowBtn}>
                            <img src="/icons/ArrowRight.svg" alt="Войти" />
                        </button>
                    </div>

                    <Link to={''} className={styles.forgotPassword}>Забыли пароль?</Link>
                    <button type="submit" className={styles.formButton}>Войти</button>
                </form>

                <div className={styles.info}>
                    <h3 className={styles.infoTitle}>Еще не регистрировались?</h3>
                    <p className={styles.infoText}>С помощью учетной записи вы можете сохранять товары в своём личном кабинете, просматривать историю своих заказов и оформлять заказ, используя сохраненные данные</p>
                    <Link to={'/register'} className={styles.registerLink}>
                        <span>Зарегистрироваться</span>
                        <img src="/icons/ArrowRight.svg" alt="" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Login;
