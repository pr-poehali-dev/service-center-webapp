import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const SupplierPricing = () => {
  const [lastUpdate, setLastUpdate] = useState('15.01.2026 10:15');

  const parts = [
    {
      name: 'Дисплей iPhone 14 Pro (оригинал)',
      suppliers: [
        { name: 'ТехноПоставка', price: 18500, stock: 'В наличии', delivery: '1-2 дня', rating: 4.9 },
        { name: 'ПартсМастер', price: 19200, stock: 'В наличии', delivery: '3-5 дней', rating: 4.7 },
        { name: 'МобиСнаб', price: 17800, stock: 'Под заказ', delivery: '7-10 дней', rating: 4.8 },
      ]
    },
    {
      name: 'Батарея iPhone 14 (High Copy)',
      suppliers: [
        { name: 'ТехноПоставка', price: 4200, stock: 'В наличии', delivery: '1-2 дня', rating: 4.9 },
        { name: 'БатареяПро', price: 3800, stock: 'В наличии', delivery: '2-3 дня', rating: 4.6 },
        { name: 'МобиСнаб', price: 4500, stock: 'В наличии', delivery: '1-2 дня', rating: 4.8 },
      ]
    },
    {
      name: 'Модуль Face ID iPhone 13',
      suppliers: [
        { name: 'ЧипМастер', price: 8900, stock: 'В наличии', delivery: '2-3 дня', rating: 4.8 },
        { name: 'ТехноПоставка', price: 9200, stock: 'Под заказ', delivery: '5-7 дней', rating: 4.9 },
        { name: 'ПартсМастер', price: 8500, stock: 'В наличии', delivery: '3-5 дней', rating: 4.7 },
      ]
    },
  ];

  const handleUpdatePrices = () => {
    const now = new Date();
    setLastUpdate(now.toLocaleString('ru-RU', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));
  };

  const getBestPrice = (suppliers: any[]) => {
    return Math.min(...suppliers.map(s => s.price));
  };

  const getStockColor = (stock: string) => {
    if (stock === 'В наличии') return 'bg-green-100 text-green-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Мониторинг цен поставщиков</h2>
          <p className="text-muted-foreground mt-1">Сравнение стоимости оригинальных запчастей Apple</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            Обновлено: <span className="font-medium">{lastUpdate}</span>
          </div>
          <Button onClick={handleUpdatePrices} className="gap-2 shadow-sm">
            <Icon name="RefreshCw" size={18} />
            Обновить цены
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Поставщиков', value: '8', icon: 'Store' },
          { label: 'Запчастей отслеживается', value: '124', icon: 'Package' },
          { label: 'Экономия за месяц', value: '₽142,300', icon: 'DollarSign' },
        ].map((stat, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className="text-primary bg-muted rounded-xl p-3">
                  <Icon name={stat.icon} size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {parts.map((part, index) => {
          const bestPrice = getBestPrice(part.suppliers);
          
          return (
            <Card key={index} className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">{part.name}</CardTitle>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Лучшая цена</p>
                    <p className="text-xl font-semibold text-primary">{bestPrice.toLocaleString('ru-RU')} ₽</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {part.suppliers.map((supplier, idx) => {
                    const isBest = supplier.price === bestPrice;
                    
                    return (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-xl transition-all ${
                          isBest ? 'bg-primary/5 border-2 border-primary/20' : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium">{supplier.name}</h3>
                              {isBest && (
                                <Badge className="bg-primary/10 text-primary border-0">
                                  <Icon name="Crown" size={12} className="mr-1" />
                                  Лучшая цена
                                </Badge>
                              )}
                              <div className="flex items-center gap-1 text-xs">
                                <Icon name="Star" size={12} className="text-yellow-500 fill-yellow-500" />
                                <span className="font-medium">{supplier.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <Badge className={getStockColor(supplier.stock)}>
                                {supplier.stock}
                              </Badge>
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Icon name="Truck" size={14} />
                                {supplier.delivery}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-semibold">{supplier.price.toLocaleString('ru-RU')} ₽</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Заказать
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SupplierPricing;
