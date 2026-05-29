import React from 'react';
import { Link } from 'react-router-dom';
import { menuData } from '../../constants/menuData';
import { IMenuSection } from '../../types/schema';
import styles from './DropDownMenu.module.css';

interface DropDownMenuProps {
    title: 'Для нее' | 'Для него';
}

const DropDownMenu = ({ title }: DropDownMenuProps) => {
    const currentMenu: IMenuSection | undefined = menuData.find(item => item.title === title);
    if (!currentMenu) return null;

    // Определяем пол в формате латиницы для чистых путей URL
    const genderUrl = title === 'Для нее' ? 'female' : 'male';

    return (
        <div className={styles.dropMenu}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {currentMenu.categories.map((category) => (
                        <div key={category.name}>
                            {/* ИСПРАВЛЕНО: Обернули имя категории в encodeURIComponent */}
                            <Link 
                                className={styles.title} 
                                to={`/catalog/${genderUrl}/${encodeURIComponent(category.name)}`}
                            >
                                {category.name}
                            </Link>
                            
                            <ul className={styles.categories}>
                                {category.groups?.map((group, groupIndex) => (
                                    Array.isArray(group.groupName)
                                        ? group.groupName.map((name, nameIndex) => (
                                            <li key={`${groupIndex}-${nameIndex}`}>
                                                {/* ИСПРАВЛЕНО: Безопасное кодирование путей для вложенных массивов */}
                                                <Link to={`/catalog/${genderUrl}/${encodeURIComponent(category.name)}/${encodeURIComponent(name)}`}>
                                                    {name}
                                                </Link>
                                            </li>
                                        ))
                                        : (
                                            <li key={groupIndex}>
                                                {/* ИСПРАВЛЕНО: Безопасное кодирование путей для одиночных строк */}
                                                <Link to={`/catalog/${genderUrl}/${encodeURIComponent(category.name)}/${encodeURIComponent(group.groupName)}`}>
                                                    {group.groupName}
                                                </Link>
                                            </li>
                                        )
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* ИСПРАВЛЕНО: Динамическая подмена промо-картинки в зависимости от выбранного пола */}
            <div className={styles.imageWrapper}>
                <img 
                    className={styles.image} 
                    src={title === 'Для нее' ? "/images/111.jpg" : "/images/222.jpg"} 
                    alt={title} 
                />
            </div>
        </div>
    );
};

export default DropDownMenu;
