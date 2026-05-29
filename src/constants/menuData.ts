import { IMenuSection } from "../types/schema";

export const menuData: IMenuSection[] = [
  {
    title: 'Для нее',
    categories: [
      {
        name: 'Нижнее белье',
        groups: [
          { groupName: 'Корсетное бельё', items: ['Бюстгальтеры', 'Трусы'] },
          { groupName: 'Хлопковое бельё', items: ['Майки', 'Трусы'] },
        ],
      },
      {
        name: 'Чулочно-носочный ассортимент',
        groups: [
          { groupName: 'Чулки, колготки', items: ['Теплые', 'Классические'] },
          { groupName: 'Носки', items: ['Классические', 'Теплые'] },
        ],
      },
      { name: 'Домашняя одежда', groups: [{ groupName: ['Пижамы', 'Халаты'] }] },
      { name: 'Пляжная одежда' },
      { name: 'Одежда' },
    ],
  },
  {
    title: 'Для него',
    categories: [
      { name: 'Нижнее белье', groups: [{ groupName: ['Майки, трусы'] }] },
      { name: 'Домашняя одежда', groups: [{ groupName: ['Пижамы, халаты'] }] },
    ],
  },
];
