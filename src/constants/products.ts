import { IProduct } from "../types/schema";

export const products: IProduct[] = [
  {
    id: 1,
    name: "Бюстгальтер Lormar Gem",
    pathName: "Для нее/Нижнее белье/Корсетное бельё/Бюстгальтеры",
    description: "Классический бюстгальтер-балконет с эффектом push-up. Выполнен из гладкой микрофибры с изящной отделкой. Идеально поддерживает форму и подходит под одежду с глубоким декольте.",
    relatedIds: [2, 7, 5],
    variants: [
      {
        colorName: "бежевый",
        colorCode: "#BB9483",
        isHit: true,
        price: "3 800",
        images: ["/images/5.jpg", "/images/6.jpg", "/images/5.jpg", "/images/22.jpg", "/images/6.jpg"],
        showFavorite: true,
        sizes: [
          { value: "70B", inStock: true, quantity: 5 },
          { value: "75B", inStock: true, quantity: 3 },
          { value: "80B", inStock: false, quantity: 0 }
        ]
      },
      {
        colorName: "черный",
        colorCode: "#000000",
        price: "3 800",
        images: ["/images/7.jpg", "/images/24.jpg", "/images/8.jpg"],
        showFavorite: true,
        sizes: [
          { value: "70B", inStock: true, quantity: 2 },
          { value: "75B", inStock: true, quantity: 4 }
        ]
      },
      {
        colorName: "белый",
        colorCode: "#FFFFFF",
        price: "3 800",
        images: ["/images/9.jpg", "/images/23.jpg", "/images/10.jpg"],
        showFavorite: true,
        sizes: [
          { value: "75B", inStock: true, quantity: 10 },
          { value: "75C", inStock: true, quantity: 1 },
          { value: "75D", inStock: false, quantity: 0 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Топ Conte RB6117",
    pathName: "Для нее/Нижнее белье/Хлопковое бельё/Майки",
    description: "Стильный трикотажный топ на тонких бретелях. Мягкий эластичный материал обеспечивает идеальную посадку и комфорт в течение всего дня. Базовая модель для вашего гардероба.",
    relatedIds: [1, 3],
    variants: [
      {
        colorName: "камея",
        colorCode: "#E7C5C1",
        isHit: true,
        price: "2 900",
        oldPrice: "3 500",
        images: ["/images/11.jpg", "/images/12.jpg", "/images/11.jpg"],
        showFavorite: true,
        sizes: [
          { value: "S", inStock: true, quantity: 8 },
          { value: "M", inStock: true, quantity: 5 }
        ]
      },
      {
        colorName: "черный",
        colorCode: "#000000",
        price: "2 900",
        images: ["/images/13.jpg", "/images/14.jpg"],
        showFavorite: true,
        sizes: [
          { value: "S", inStock: true, quantity: 3 },
          { value: "M", inStock: true, quantity: 4 },
          { value: "L", inStock: false, quantity: 0 }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Пижама Conte New Silk",
    pathName: "Для него/Домашняя одежда/Пижамы, брюки, халаты",
    description: "Роскошный домашний комплект из искусственного шелка. Нежная ткань приятно холодит кожу. Свободный крой не стесняет движений, создавая атмосферу уюта и элегантности.",
    relatedIds: [],
    variants: [
      {
        colorName: "черный",
        colorCode: "#000000",
        isHit: true,
        price: "5 400",
        images: ["/images/13.jpg", "/images/14.jpg"],
        showFavorite: true,
        sizes: [
          { value: "S", inStock: true, quantity: 5 },
          { value: "M", inStock: true, quantity: 10 },
          { value: "L", inStock: true, quantity: 2 }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Халат Luvie Lace",
    pathName: "Для нее/Домашняя одежда/Халаты, сорочки",
    description: "Элегантный халат средней длины с кружевными вставками. Легкая струящаяся ткань и изысканный дизайн подчеркнут вашу женственность. Прекрасный выбор для особенного утра.",
    relatedIds: [5, 1, 4, 8, 6],
    variants: [
      {
        colorName: "белый",
        colorCode: "#FFFFFF",
        isHit: false,
        price: "6 200",
        images: ["/images/9.jpg", "/images/10.jpg"],
        showFavorite: true,
        sizes: [
          { value: "ONESIZE", inStock: true, quantity: 15 }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Халат Luvie Lace Edition",
    pathName: "Для нее/Домашняя одежда/Пижамы, комплекты для дома",
    description: "Лимитированная серия кружевных халатов Luvie. Модель отличается премиальным качеством кружева и глубокими насыщенными оттенками. Совершенство в каждой детали.",
    relatedIds: [1, 7],
    variants: [
      {
        colorName: "cipria",
        colorCode: "#e9bcb0",
        isHit: false,
        price: "6 200",
        images: ["/images/16.jpg", "/images/17.jpg", "/images/18.jpg"],
        showFavorite: true,
        sizes: [
          { value: "70B", inStock: true, quantity: 3 },
          { value: "75B", inStock: true, quantity: 5 },
          { value: "75D", inStock: false, quantity: 0 }
        ]
      },
      {
        colorName: "черный",
        colorCode: "#000000",
        isHit: false,
        price: "6 200",
        images: ["/images/25.jpg", "/images/26.jpg", "/images/27.jpg"],
        showFavorite: true,
        sizes: [
          { value: "70B", inStock: true, quantity: 3 },
          { value: "75B", inStock: true, quantity: 5 },
          { value: "75D", inStock: false, quantity: 0 }
        ]
      },
      {
        colorName: "белый",
        colorCode: "#FFFFFF",
        isHit: false,
        price: "6 200",
        images: ["/images/28.jpg", "/images/29.jpg", "/images/30.jpg"],
        showFavorite: true,
        sizes: [
          { value: "70B", inStock: true, quantity: 2 },
          { value: "75B", inStock: true, quantity: 4 },
          { value: "75D", inStock: false, quantity: 0 }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Халат Luvie Pastel",
    pathName: "Для нее/Домашняя одежда/Халаты, сорочки",
    description: "Мягкий халат в пастельных тонах. Идеально подходит для отдыха после водных процедур или утреннего кофе. Ткань гипоаллергенна и очень приятна к телу.",
    relatedIds: [1, 2],
    variants: [
      {
        colorName: "пастель",
        colorCode: "#FFFFF0",
        isHit: false,
        price: "6 200",
        images: ["/images/19.jpg", "/images/20.jpg", "/images/21.jpg"],
        showFavorite: true,
        sizes: [
          { value: "70A", inStock: true, quantity: 10 },
          { value: "70B", inStock: true, quantity: 10 },
          { value: "70C", inStock: true, quantity: 10 },
          { value: "75A", inStock: true, quantity: 10 },
          { value: "75B", inStock: true, quantity: 10 },
          { value: "75C", inStock: true, quantity: 10 },
          { value: "80B", inStock: true, quantity: 10 },
          { value: "80A", inStock: true, quantity: 10 },
          { value: "80C", inStock: true, quantity: 10 },
          { value: "85A", inStock: true, quantity: 10 },
          { value: "85B", inStock: true, quantity: 10 },
          { value: "85C", inStock: true, quantity: 10 },
          { value: "85D", inStock: true, quantity: 10 },
          { value: "85E", inStock: true, quantity: 10 },
          { value: "85F", inStock: true, quantity: 10 },
          { value: "85G", inStock: true, quantity: 10 },
        ]
      },
    ]
  },
  {
    id: 7,
    name: "Бюстгальтер Sielei 1940 White",
    pathName: "Для нее/Нижнее белье/Корсетное бельё/Бюстгальтеры",
    description: "Итальянский бюстгальтер Sielei из легендарной коллекции. Кружевная чашка на косточках обеспечивает надежную поддержку даже для пышной груди. Истинная классика.",
    relatedIds: [5, 8],
    variants: [
      {
        colorName: "белый",
        colorCode: "#FFFFFF",
        isHit: false,
        price: "6 200",
        images: ["/images/31.jpg", "/images/32.jpg", "/images/33.jpg", "/images/37.jpg"],
        showFavorite: true,
        sizes: [
          { value: "3C", inStock: true, quantity: 5 },
          { value: "4C", inStock: true, quantity: 3 },
          { value: "5B", inStock: true, quantity: 2 }
        ]
      },
    ]
  },
  {
    id: 8,
    name: "Бюстгальтер Sielei 1940 Black",
    pathName: "Для нее/Нижнее белье/Корсетное бельё/Бюстгальтеры",
    description: "Эфектный черный бюстгальтер Sielei с цветочным кружевом. Регулируемые бретели и мягкая спинка гарантируют комфорт в течение всего дня. Роскошь, доступная каждой.",
    relatedIds: [7, 5, 6, 1, 2, 5],
    variants: [
      {
        colorName: "черный",
        colorCode: "#000000",
        isHit: false,
        price: "6 200",
        images: ["/images/34.jpg", "/images/35.jpg", "/images/36.jpg"],
        showFavorite: true,
        sizes: [
          { value: "3C", inStock: true, quantity: 4 },
          { value: "4C", inStock: true, quantity: 6 },
          { value: "5B", inStock: true, quantity: 1 }
        ]
      },
    ]
  },
  {
    id: 9,
    name: "Бюстгальтер Lady Lux Б296",
    pathName: "Для нее/Нижнее белье/Корсетное бельё/Бюстгальтеры",
    description: "Бюстгальтер мягкая чашка из микрофибры и эластичного кружева, на каркасах, подкладка чашки из хлопкового полотна. Cостав: 85% Полиамид, 15% Эластан.",
    relatedIds: [7, 5, 6, 1, 2, 3, 10],
    variants: [
      {
        colorName: "бежевый",
        colorCode: "#F3E5DE",
        isHit: false,
        price: "6 200",
        images: ["/images/37.jpg", "/images/38.jpg", "/images/39.jpg"],
        showFavorite: true,
        sizes: [
          { value: "80C", inStock: true, quantity: 4 },
          { value: "80D", inStock: true, quantity: 6 },
          { value: "80E", inStock: true, quantity: 6 },
          { value: "80F", inStock: true, quantity: 6 },
          { value: "80G", inStock: true, quantity: 6 },
          { value: "80H", inStock: true, quantity: 6 },
          { value: "85C", inStock: true, quantity: 6 },
          { value: "85D", inStock: true, quantity: 6 },
          { value: "85E", inStock: true, quantity: 6 },
          { value: "85F", inStock: true, quantity: 6 },
          { value: "85G", inStock: true, quantity: 6 },
          { value: "85H", inStock: true, quantity: 6 },
          { value: "90C", inStock: true, quantity: 6 },
          { value: "90D", inStock: true, quantity: 6 },
          { value: "90E", inStock: true, quantity: 6 },
          { value: "90F", inStock: true, quantity: 6 },
          { value: "90G", inStock: true, quantity: 6 },
          { value: "90H", inStock: true, quantity: 6 },
          { value: "95C", inStock: true, quantity: 1 }
        ]
      },
      {
        colorName: "черный",
        colorCode: "#000000",
        isHit: false,
        price: "6 200",
        images: ["/images/40.jpg", "/images/41.jpg", "/images/42.jpg"],
        showFavorite: true,
        sizes: [
          { value: "80C", inStock: true, quantity: 4 },
          { value: "80D", inStock: true, quantity: 6 },
          { value: "80E", inStock: true, quantity: 6 },
          { value: "80F", inStock: true, quantity: 6 },
          { value: "80G", inStock: true, quantity: 6 },
          { value: "80H", inStock: true, quantity: 6 },
          { value: "85C", inStock: true, quantity: 6 },
          { value: "85D", inStock: true, quantity: 6 },
          { value: "85E", inStock: true, quantity: 6 },
          { value: "85F", inStock: true, quantity: 6 },
          { value: "85G", inStock: true, quantity: 6 },
          { value: "85H", inStock: true, quantity: 6 },
          { value: "90C", inStock: true, quantity: 6 },
          { value: "90D", inStock: true, quantity: 6 },
          { value: "90E", inStock: true, quantity: 6 },
          { value: "90F", inStock: true, quantity: 6 },
          { value: "90G", inStock: true, quantity: 6 },
          { value: "90H", inStock: true, quantity: 6 },
          { value: "95C", inStock: true, quantity: 1 }
        ]
      },
    ]
  },
  {
    id: 10,
    name: "Трусы жен. Lady Lux Т0766",
    pathName: "Для нее/Нижнее белье/Корсетное бельё/Бюстгальтеры",
    description: "Бюстгальтер мягкая чашка из микрофибры и эластичного кружева, на каркасах, подкладка чашки из хлопкового полотна. Cостав: 85% Полиамид, 15% Эластан.",
    relatedIds: [7, 5, 6, 1, 2, 3, 9],
    variants: [
      {
        colorName: "бежевый",
        colorCode: "#F3E5DE",
        isHit: false,
        price: "6 200",
        images: ["/images/43.jpg", "/images/44.jpg", "/images/39.jpg"],
        showFavorite: true,
        sizes: [
          { value: "102", inStock: true, quantity: 4 },
          { value: "106", inStock: true, quantity: 6 },
          { value: "110", inStock: true, quantity: 6 },
          { value: "114", inStock: true, quantity: 6 },
          { value: "118", inStock: true, quantity: 6 },
          { value: "122", inStock: true, quantity: 6 },
        ]
      },
      {
        colorName: "черный",
        colorCode: "#000000",
        isHit: false,
        price: "6 200",
        images: ["/images/45.jpg", "/images/46.jpg", "/images/42.jpg"],
        showFavorite: true,
        sizes: [
          { value: "102", inStock: true, quantity: 4 },
          { value: "106", inStock: true, quantity: 6 },
          { value: "110", inStock: true, quantity: 6 },
          { value: "114", inStock: true, quantity: 6 },
          { value: "118", inStock: true, quantity: 6 },
          { value: "122", inStock: true, quantity: 6 },
        ]
      },
    ]
  },
  {
    id: 11,
    name: "Пижама жен. Lormar",
    pathName: "Для нее/Домашняя одежда",
    description: "Бюстгальтер мягкая чашка из микрофибры и эластичного кружева, на каркасах, подкладка чашки из хлопкового полотна. Cостав: 85% Полиамид, 15% Эластан.",
    relatedIds: [7, 5, 6, 1, 2, 3, 9],
    variants: [
      {
        colorName: "felce",
        colorCode: "#2e3a23",
        isHit: false,
        price: "6 200",
        images: ["/images/48.jpg", "/images/49.jpg", "/images/50.jpg"],
        showFavorite: true,
        sizes: [
          { value: "42", inStock: true, quantity: 4 },
          { value: "44", inStock: true, quantity: 6 },
          { value: "46", inStock: true, quantity: 6 },
          
        ]
      },
      {
        colorName: "черный",
        colorCode: "#000000",
        isHit: false,
        price: "6 200",
        images: ["/images/51.jpg", "/images/52.jpg", "/images/53.jpg"],
        showFavorite: true,
        sizes: [
          { value: "42", inStock: true, quantity: 4 },
          { value: "44", inStock: true, quantity: 6 },
          { value: "46", inStock: true, quantity: 6 },
          { value: "48", inStock: true, quantity: 6 },
          { value: "50", inStock: true, quantity: 6 },
          { value: "52", inStock: true, quantity: 6 },
        ]
      },
    ]
  },
  {
    id: 12,
    name: "Бюстгальтер Lady Lux Б296",
    pathName: "Для нее/Нижнее белье/Корсетное бельё/Бюстгальтеры",
    description: "Бюстгальтер мягкая чашка из микрофибры и эластичного кружева, на каркасах, подкладка чашки из хлопкового полотна. Cостав: 85% Полиамид, 15% Эластан.",
    relatedIds: [7, 5, 6, 1, 2, 3, 10],
    variants: [
      {
        colorName: "зеленый",
        colorCode: "#3D5354",
        isHit: false,
        price: "6 200",
        images: ["/images/54.jpg", "/images/55.jpg", "/images/56.jpg", "/images/57.jpg"],
        showFavorite: true,
        sizes: [
          { value: "80C", inStock: true, quantity: 4 },
          { value: "80D", inStock: true, quantity: 6 },
          { value: "80E", inStock: true, quantity: 6 },
          { value: "80F", inStock: true, quantity: 6 },
          { value: "80G", inStock: true, quantity: 6 },
          { value: "80H", inStock: true, quantity: 6 },
          { value: "85C", inStock: true, quantity: 6 },
          { value: "85D", inStock: true, quantity: 6 },
          { value: "85E", inStock: true, quantity: 6 },
          { value: "85F", inStock: true, quantity: 6 },
          { value: "85G", inStock: true, quantity: 6 },
          { value: "85H", inStock: true, quantity: 6 },
          { value: "90C", inStock: true, quantity: 6 },
          { value: "90D", inStock: true, quantity: 6 },
          { value: "90E", inStock: true, quantity: 6 },
          { value: "90F", inStock: true, quantity: 6 },
          { value: "90G", inStock: true, quantity: 6 },
          { value: "90H", inStock: true, quantity: 6 },
          { value: "95C", inStock: true, quantity: 1 }
        ]
      },
      {
        colorName: "серый",
        colorCode: "#E4DAD0",
        isHit: false,
        price: "6 200",
        images: ["/images/58.jpg", "/images/59.jpg", "/images/60.jpg", "/images/61.jpg"],
        showFavorite: true,
        sizes: [
          { value: "80C", inStock: true, quantity: 4 },
          { value: "80D", inStock: true, quantity: 6 },
          { value: "80E", inStock: true, quantity: 6 },
          { value: "80F", inStock: true, quantity: 6 },
          { value: "80G", inStock: true, quantity: 6 },
          { value: "80H", inStock: true, quantity: 6 },
          { value: "85C", inStock: true, quantity: 6 },
          { value: "85D", inStock: true, quantity: 6 },
          { value: "85E", inStock: true, quantity: 6 },
          { value: "85F", inStock: true, quantity: 6 },
          { value: "85G", inStock: true, quantity: 6 },
          { value: "85H", inStock: true, quantity: 6 },
          { value: "90C", inStock: true, quantity: 6 },
          { value: "90D", inStock: true, quantity: 6 },
          { value: "90E", inStock: true, quantity: 6 },
          { value: "90F", inStock: true, quantity: 6 },
          { value: "90G", inStock: true, quantity: 6 },
          { value: "90H", inStock: true, quantity: 6 },
          { value: "95C", inStock: true, quantity: 1 }
        ]
      },
    ]
  },
];

