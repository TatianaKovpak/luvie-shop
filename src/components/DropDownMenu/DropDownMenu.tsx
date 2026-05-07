import styles from './DropDownMenu.module.css'
import { menuData } from '../../constants/menuData'
import { IMenuSection } from '../../types/schema';
import { Link } from 'react-router-dom';

interface DropDownMenuProps {
    title: 'Для нее' | 'Для него';
}

const DropDownMenu = ({title}: DropDownMenuProps) => {
  const currentMenu : IMenuSection | undefined = menuData.find(item => item.title === title)
  if (!currentMenu) return null

    return (
      <div className={styles.dropMenu}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {currentMenu.categories.map((category) => (
              <div key={category.name}>
                <Link className={styles.title} to={`/catalog/${title === 'Для нее' ? 'female' : 'male'}/${category.name}`}>
                  {category.name}
                </Link>
                <ul className={styles.categories}>
                  {category.groups?.map((group, groupIndex) => (
                    Array.isArray(group.groupName)
                    ? group.groupName.map((name, nameIndex) => (
                      <li key={`${groupIndex}-${nameIndex}`}>
                        <Link to={`/catalog/${title === 'Для нее' ? 'female' : 'male'}/${category.name}/${name}`}>
                          {name}
                        </Link>
                      </li>
                    ))
                    : (
                      <li key={groupIndex}>
                        <Link to={`/catalog/${title === 'Для нее' ? 'female' : 'male'}/${category.name}/${group.groupName}`}>
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
        <div className={styles.imageWrapper}>
          <img className={styles.image} src="/images/15.jpg" alt="Collection Preview" />
        </div>
      </div>
    )
}

export default DropDownMenu