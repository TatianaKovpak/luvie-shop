// --- 1. ТОВАРЫ И ИХ МОДИФИКАЦИИ ---
export interface ISize {
  value: string;
  inStock: boolean;
  quantity: number; // Добавлено: реальный остаток
}

export interface IVariant {
  colorName: string;
  colorCode: string;
  images: string[];
  price: string;
  oldPrice?: string;
  isHit?: boolean;
  showFavorite?: boolean;
  sizes: ISize[];
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  pathName: string; // Формат из МойСклад: "Для нее/Нижнее белье/Трусы"
  relatedIds?: number[]; // Добавлено: массив ID для блока "Сочетается с"
  variants: IVariant[];
}

// --- 2. ПРОПСЫ ДЛЯ КОМПОНЕНТА КАРТОЧКИ (ProductCard) ---
export interface IProductCardProps {
  id: string;
  name: string;
  images: string[];
  price: string;
  colorName: string;
  colorCode: string;
  isHit?: boolean;
  showFavorite?: boolean;
}

// --- 3. СТРУКТУРА ГЛАВНОГО МЕНЮ (menuData) ---
export interface IGroup {
  groupName: string | string[];
  items?: string[];
}

export interface ICategory {
  name: string;
  groups?: IGroup[];
}

export interface IMenuSection {
  title: 'Для нее' | 'Для него';
  categories: ICategory[];
}
