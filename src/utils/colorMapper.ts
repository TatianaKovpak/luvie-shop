export const getColorHex = (colorName: string): string => {
  const colors: Record<string, string> = {
    'Черный': '#000000',
    'Белый': '#FFFFFF',
    'Кремовый': '#F5F5DC',
    'Бежевый': '#D2B48C',
    'Пудра': '#F1D9D6',
    'Шампань': '#F7E7CE',
    'Молочный': '#FDFFF5',
    'Бордо': '#800020',
    'Синий': '#0000FF',
    // Добавь свои основные цвета здесь
  };

  return colors[colorName] || '#E5E5E5'; // Серый, если цвет не найден
};