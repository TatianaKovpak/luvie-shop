import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { logoutAction, updateUserDataAction } from '../../services/actions/userActions';
import { clearCartAction } from '../../services/actions/cartActions';
import styles from './Profile.module.css';

type TProfileTab = 'profile' | 'orders' | 'favorites' | 'loyalty';

// 1. УНИВЕРСАЛЬНЫЙ КОНВЕРТЕР: превращает цифры 10.07.1992 в текст "10 июля 1992"
const formatDateToText = (dateStr: string): string => {
    if (!dateStr || dateStr === 'не указана') return 'не указана';

    const parts = dateStr.split(/[.,/-\s]+/);
    if (parts.length !== 3) return dateStr; 

    const day = parseInt(parts[0], 10);
    const monthIndex = parseInt(parts[1], 10) - 1;
    const year = parts[2];

    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    if (monthIndex >= 0 && monthIndex < 12 && day > 0 && day <= 31) {
        return `${day} ${months[monthIndex]} ${year}`;
    }

    return dateStr;
};

// 2. УМНАЯ МАСКА ИНПУТА: сама расставляет точки после 2-го и 5-го символов на лету
const handleDateMask = (value: string): string => {
    // Очищаем строку от всего, кроме цифр
    const digits = value.replace(/\D/g, '');
    const trimmed = digits.slice(0, 8);
    
    let day = trimmed.slice(0, 2);
    let month = trimmed.slice(2, 4);
    let year = trimmed.slice(4);

    // Валидация ДНЯ (не больше 31, и день не может начинаться с 4, 5 и т.д.)
    if (day.length === 1 && parseInt(day, 10) > 3) {
        day = '0' + day; // Если вбили 4, превращаем в 04
    }
    if (day.length === 2) {
        const d = parseInt(day, 10);
        if (d > 31) day = '31'; // Ограничиваем 31 числом
        if (d === 0) day = '01'; // День не может быть 00
    }

    // Валидация МЕСЯЦА (не больше 12, и не может начинаться с 2, 3 и т.д.)
    if (month.length === 1 && parseInt(month, 10) > 1) {
        month = '0' + month; // Если вбили 5, превращаем в 05
    }
    if (month.length === 2) {
        const m = parseInt(month, 10);
        if (m > 12) month = '12'; // Ограничиваем 12 месяцами
        if (m === 0) month = '01'; // Месяц не может быть 00
    }

    // Валидация ГОДА (не даем ввести год из будущего, текущий год — 2026)
    if (year.length === 4) {
        const y = parseInt(year, 10);
        const currentYear = new Date().getFullYear();
        if (y > currentYear) year = currentYear.toString(); // Ограничиваем текущим годом
        if (y < 1900) year = '1900'; // Защита от слишком старого года
    }

    // Собираем строку обратно с точками на лету
    if (trimmed.length > 4) {
        return `${day}.${month}.${year}`;
    } else if (trimmed.length > 2) {
        return `${day}.${month}`;
    }
    
    return day;
};

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuth, user } = useAppSelector((state) => state.user);
    const { items: favoriteItems } = useAppSelector((state) => state.favorites);

    const [activeTab, setActiveTab] = useState<TProfileTab>('profile');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // Состояния для полей ввода формы
    const [editFirstName, setEditFirstName] = useState('');
    const [editSecondName, setEditSecondName] = useState('');
    const [editDateOfBirth, setEditDateOfBirth] = useState('');
    const [editEmail, setEditEmail] = useState('');

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    // Синхронизация данных при переходе в режим редактирования
    useEffect(() => {
        if (user) {
            const nameParts = user.name ? user.name.trim().split(/\s+/) : [];
            setEditFirstName(nameParts.length > 1 ? nameParts[1] : (nameParts[0] || ''));
            setEditSecondName(nameParts.length > 1 ? nameParts[0] : '');
            setEditEmail(user.email || '');
            setEditDateOfBirth((user as any).dateOfBirth || '');
        }
    }, [isEditing, user]);

    if (!isAuth || !user) return null;

    const handleLogout = () => {
        dispatch(logoutAction());
        dispatch(clearCartAction());
        navigate('/');
    };

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Добрый день';
        if (hour >= 12 && hour < 18) return 'Добрый день';
        if (hour >= 18 && hour < 23) return 'Добрый вечер';
        return 'Доброй ночи';
    };

    const nameParts = user.name ? user.name.trim().split(/\s+/) : [];
    const firstName = nameParts.length > 1 ? nameParts[1] : (nameParts[0] || '本地');
    const secondName = nameParts.length > 1 ? nameParts[0] : '';

    const email = user.email || 'не указана';
    const phoneNumber = user.phone || 'не указан';
    const dateOfBirth = (user as any).dateOfBirth || 'не указана';

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        const fullName = `${editSecondName.trim()} ${editFirstName.trim()}`.trim();

        dispatch(updateUserDataAction({
            name: fullName,
            email: editEmail,
            dateOfBirth: editDateOfBirth
        }));

        setIsEditing(false);
    };




        return (
        <section className={styles.profilePage}>
                
                {/* ЛЕВАЯ ПАНЕЛЬ НАВИГАЦИИ (СТРОГО ТВОИ КЛАССЫ) */}
                <aside className={styles.profileSideBar}>
                    <h1 className={styles.title}>
                        {`${greeting()}, ${firstName}!`}
                    </h1>
                    <nav className={styles.profileMenu}>
                        <button
                            type='button'
                            className={`${styles.menuLink} ${activeTab === 'profile' ? styles.activeLink : ''}`}
                            onClick={() => { setActiveTab('profile'); setIsEditing(false); }}
                        >
                            <img src="/icons/UserCircle.svg" alt="UserCircle" />
                            Профиль
                        </button>
                        <button
                            type='button'
                            className={`${styles.menuLink} ${activeTab === 'orders' ? styles.activeLink : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            <img src="/icons/Bag.svg" alt="Bag" />
                            Мои заказы
                        </button>
                        <button
                            type='button'
                            className={`${styles.menuLink} ${activeTab === 'loyalty' ? styles.activeLink : ''}`}
                            onClick={() => setActiveTab('loyalty')}
                        >
                            <img src="/icons/Loyalty.svg" alt="Loyalty" />
                            Программа лояльности
                        </button>
                        <button
                            type='button'
                            className={`${styles.menuLink} ${activeTab === 'favorites' ? styles.activeLink : ''}`}
                            onClick={() => setActiveTab('favorites')}
                        >
                            <img src="/icons/Heart.svg" alt="Heart" />
                            Избранное ({favoriteItems.length})
                        </button>
                    </nav>
                </aside>

                {/* ПРАВАЯ ЧАСТЬ КОНТЕНТА */}
                <main className={styles.menuData}>
                    {activeTab === 'profile' && (
                        <div className={styles.profileInfo}>
                            
                            {/* ЕСЛИ НЕ РЕДАКТИРУЕМ — ВЫВОДИМ ТВОЙ СТАНДАРТНЫЙ МАКЕТ С КАРАНДАШАМИ */}
                            {!isEditing ? (
                                <>
                                    <div className={styles.profileInfoTitle}>
                                        <h2 className={styles.title}>Персональные данные</h2>
                                        <button className={styles.fluentButton} type='button' onClick={() => setIsEditing(true)}>
                                            <img src="/icons/Fluentedit.svg" alt="Fluentedit" />
                                        </button>
                                    </div>
                                    <div className={styles.profileData}>
                                        <p>{`Фамилия: ${secondName}`}</p>
                                        <p>{`Имя: ${firstName}`}</p>
                                        {/* УМНЫЙ ВЫВОД ДАТЫ: Цифры 10.07.1992 превратятся в "10 июля 1992" */}
                                        <p>{`Дата рождения: ${formatDateToText(dateOfBirth)}`}</p>
                                        <p>{`Телефон: ${phoneNumber}`}</p>
                                    </div>
                                    <div className={styles.profileInfoTitle}>
                                        <h2>Электронная почта</h2>
                                        <button className={styles.fluentButton} type='button' onClick={() => setIsEditing(true)}>
                                            <img src="/icons/Fluentedit.svg" alt="Fluentedit" />
                                        </button>
                                    </div>
                                    <div className={styles.profileData}>
                                        <p>{email}</p>
                                    </div>
                                </>
                            ) : (
                                /* РЕЖИМ РЕДАКТИРОВАНИЯ: ЕДИНАЯ ОБЩАЯ ФОРМА НА ВСЕ ПОЛЯ */
                                <form className={styles.editForm} onSubmit={handleSaveProfile}>
                                    <div className={styles.profileInfoTitle}>
                                        <h2 className={styles.title}>Редактировать персональные данные</h2>
                                    </div>
                                    
                                    <div className={styles.formGrid}>
                                        <div className={styles.inputGroup}>
                                            <small>Фамилия</small>
                                            <input type="text" className={styles.regInput} value={editSecondName} onChange={(e) => setEditSecondName(e.target.value)} required />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <small>Имя</small>
                                            <input type="text" className={styles.regInput} value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} required />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <small>Дата рождения</small>
                                            {/* УМНЫЙ ИНПУТ: Маска handleDateMask сама расставит точки при вводе цифр */}
                                            <input 
                                                type="text" 
                                                className={styles.regInput} 
                                                value={editDateOfBirth} 
                                                onChange={(e) => setEditDateOfBirth(handleDateMask(e.target.value))} 
                                                placeholder="ДД.ММ.ГГГГ"
                                                maxLength={10}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <small>Телефон</small>
                                            <input type="text" className={styles.regInput} value={phoneNumber} disabled />
                                        </div>
                                    </div>

                                    <div className={styles.profileInfoTitle} style={{ marginTop: '3vw' }}>
                                        <h2>Редактировать электронную почту</h2>
                                    </div>
                                    <div className={styles.formGridSingle}>
                                        <div className={styles.inputGroup}>
                                            <small>Электронная почта</small>
                                            <input type="email" className={styles.regInput} value={editEmail} onChange={(e) => setEditEmail(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className={styles.formButtons}>
                                        <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>Отмена</button>
                                        <button type="submit" className={styles.saveBtn}>Сохранить</button>
                                    </div>
                                </form>
                            )}

                        </div>
                    )}

                    {activeTab === 'orders' && <div className={styles.ordersInfo}><h2>История заказов</h2><p className={styles.emptyText}>У вас пока нет оформленных заказов</p></div>}
                    {activeTab === 'loyalty' && <div className={styles.loyaltyInfo}><h2>Программа лояльности</h2><p className={styles.emptyText}>Карта клуба LUVIE активирована</p></div>}
                    {activeTab === 'favorites' && <div className={styles.favoritesInfo}><h2>Избранное</h2><p className={styles.emptyText}>Список избранного пуст</p></div>}
                </main>
        </section>
    );
};

export default Profile;
