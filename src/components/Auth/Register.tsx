import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const Register: React.FC = () => {
    const navigate = useNavigate();

    // Флаг отправки кода: false — анкета, true — форма для СМС
    const [isCodeSent, setIsCodeSent] = useState(false);

    // ИСПРАВЛЕНО: Раздельные состояния под Фамилию, Имя и Отчество
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    // Состояние для второй формы (одноразовый код)
    const [smsCode, setSmsCode] = useState('');

    // Умная маска для телефона
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/[^\d+]/g, '');
        if (!input || input === '+') { setPhone(''); return; }
        if (!input.startsWith('+7') && !input.startsWith('8')) {
            input = '+7' + input.replace(/\D/g, '');
        }
        if (input.length > 12) input = input.substring(0, 12);
        setPhone(input);
    };

    // Шаг 1: Запрос кода
    const handleGetCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }

        // Собираем полное ФИО для отправки на бэкенд и МойСклад через пробелы
        const fullFio = `${lastName.trim()} ${firstName.trim()} ${middleName.trim()}`.trim();

        console.log('Запрос SMS-кода для данных:', { 
            fio: fullFio, 
            email, 
            password, 
            phone 
        });
        
        setIsCodeSent(true);
    };

    // Шаг 2: Проверка кода и редирект на ЛОГИН
    const handleVerifyCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Проверка SMS-кода:', smsCode);
        
        // Очищаем все стейты
        setLastName('');
        setFirstName('');
        setMiddleName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        setSmsCode('');
        setIsCodeSent(false);
        
        navigate('/login');
    };

    return (
        <section className={styles.authPage}>
            <div className={styles.image}>
                <img src="/images/Image.jpg" alt="" />
            </div>
            <div className={styles.formContainer}>
                {!isCodeSent ? (
                    <>
                        <h2 className={styles.title}>Зарегистрироваться</h2>
                        <form className={styles.form} onSubmit={handleGetCodeSubmit}>
                            
                            {/* ТРИ РАЗДЕЛЬНЫХ ИНПУТА ДЛЯ ФИО */}
                            <div className={styles.regInputWrapper}>
                                <input 
                                    className={styles.regInput} 
                                    type="text" 
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    placeholder='Фамилия*' 
                                    required 
                                />
                            </div>
                            <div className={styles.regInputWrapper}>
                                <input 
                                    className={styles.regInput} 
                                    type="text" 
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    placeholder='Имя*' 
                                    required 
                                />
                            </div>
                            <div className={styles.regInputWrapper}>
                                <input 
                                    className={styles.regInput} 
                                    type="text" 
                                    value={middleName} 
                                    onChange={(e) => setMiddleName(e.target.value)} 
                                    placeholder='Отчество'
                                />
                            </div>

                            <div className={styles.regInputWrapper}>
                                <input className={styles.regInput} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail*" required />
                            </div>
                            <div className={styles.regInputWrapper}>
                                <input className={styles.regInput} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Пароль*' minLength={6} required />
                            </div>
                            <div className={styles.regInputWrapper}>
                                <input className={styles.regInput} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Повторить пароль*' required />
                            </div>
                            <div className={styles.regInputWrapper}>
                                <input 
                                    className={styles.regInput} 
                                    type="tel" 
                                    value={phone} 
                                    onChange={handlePhoneChange} 
                                    onFocus={() => { if (!phone) setPhone('+7'); }}
                                    onBlur={() => { if (phone === '+7') setPhone(''); }}
                                    placeholder='Номер телефона*' 
                                    pattern="^\+7[0-9]{10}$"
                                    title="Формат: +79522933958"
                                    required 
                                />
                            </div>
                            <p className={styles.sms}>Пришлём на указанный номер SMS с кодом подтверждения</p>
                            <button type="submit" className={styles.formButton}>Получить код</button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className={styles.title}>Введите полученный код</h2>
                        <p className={styles.smsSentText}>Мы отправили SMS-код на номер {phone}</p>
                        
                        <form className={styles.form} onSubmit={handleVerifyCodeSubmit}>
                            <div className={styles.regInputWrapper}>
                                <input 
                                    className={styles.regInput} 
                                    type="text" 
                                    maxLength={6} 
                                    pattern="[0-9]*" 
                                    value={smsCode} 
                                    onChange={(e) => setSmsCode(e.target.value)} 
                                    placeholder='Код из СМС*' 
                                    required 
                                />
                            </div>
                            
                            <button type="submit" className={styles.formButton}>Отправить</button>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
};

export default Register;
