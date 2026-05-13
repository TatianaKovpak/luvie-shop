import { FC, useEffect } from 'react';

interface ICdekWidgetProps {
    onSelect: (price: number, address: string) => void;
    weight: number; // Вес посылки в граммах
}

const CdekWidget: FC<ICdekWidgetProps> = ({ onSelect, weight }) => {
    useEffect(() => {
        const script = document.getElementById('ISDEKscript');

        const initWidget = () => {
            // @ts-ignore
            if (window.ISDEKWidjet) {
                // @ts-ignore
                const widget = new window.ISDEKWidjet({
                    defaultCity: 'Москва', // Город по умолчанию
                    cityFrom: 'Апатиты',   // Откуда везем
                    country: 'Россия',
                    link: 'cdek-map',      // ID дива для карты
                    path: 'https://cdek.ru',
                    servicepath: 'https://cdek.ruservice.php',
                    apikey: 'da1d21fd-249f-4481-a321-0abb49f57c3e',
                    
                    // Параметры посылки
                    goods: [{
                        length: 20,
                        width: 15,
                        height: 5,
                        weight: weight / 1000 // СДЭК просит в КГ
                    }]
                });

                // Подписываемся на выбор пункта выдачи
                widget.onChoose((data: any) => {
                    console.log('Выбран ПВЗ СДЭК:', data);
                    const price = Math.ceil(Number(data.price)); // Округляем цену
                    const address = `СДЭК: ${data.cityName}, ${data.address}`;
                    onSelect(price, address); // Отдаем данные в корзину
                });
            }
        };

        // Запуск, если скрипт уже загружен, или ждем его загрузки
        if (script) {
            script.addEventListener('load', initWidget);
            // @ts-ignore
            if (window.ISDEKWidjet) initWidget();
        }

        return () => {
            script?.removeEventListener('load', initWidget);
        };
    }, [onSelect, weight]);

    return (
        <div 
            id="cdek-map" 
            style={{ 
                width: '100%', 
                height: '450px', 
                border: '1px solid #E8E8DD',
                marginTop: '1.5vw' 
            }} 
        />
    );
};

export default CdekWidget;