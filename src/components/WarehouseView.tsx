import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const WarehouseView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const parts = [
    { id: 1, name: 'Дисплей iPhone 14 Pro', category: 'Экраны', stock: 8, minStock: 5, price: '₽12,500', supplier: 'ТехноПоставка', status: 'В наличии' },
    { id: 2, name: 'Аккумулятор Samsung S23', category: 'Батареи', stock: 15, minStock: 10, price: '₽2,800', supplier: 'БатареяПро', status: 'В наличии' },
    { id: 3, name: 'Материнская плата iPhone 13', category: 'Платы', stock: 2, minStock: 3, price: '₽18,000', supplier: 'ЧипМастер', status: 'Мало' },
    { id: 4, name: 'Камера Xiaomi 13', category: 'Камеры', stock: 0, minStock: 5, price: '₽4,200', supplier: 'КамераСервис', status: 'Нет в наличии' },
    { id: 5, name: 'Разъем зарядки USB-C', category: 'Разъемы', stock: 45, minStock: 20, price: '₽350', supplier: 'ЗапчастиОпт', status: 'В наличии' },
    { id: 6, name: 'Стекло iPad Air', category: 'Экраны', stock: 6, minStock: 5, price: '₽3,500', supplier: 'ТехноПоставка', status: 'В наличии' },
  ];

  const partsComparison = [
    { name: 'Дисплей iPhone 14 Pro', supplier1: 'ТехноПоставка', price1: '₽12,500', supplier2: 'МобилПарт', price2: '₽13,200' },
    { name: 'Аккумулятор Samsung S23', supplier1: 'БатареяПро', price1: '₽2,800', supplier2: 'ЭнергоТех', price2: '₽3,100' },
    { name: 'Камера Xiaomi 13', supplier1: 'КамераСервис', price1: '₽4,200', supplier2: 'ОптикаПро', price2: '₽4,500' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'В наличии': 'bg-accent/10 text-accent',
      'Мало': 'bg-yellow-100 text-yellow-700',
      'Нет в наличии': 'bg-destructive/10 text-destructive',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStockIcon = (status: string) => {
    const icons: Record<string, string> = {
      'В наличии': 'CheckCircle',
      'Мало': 'AlertTriangle',
      'Нет в наличии': 'XCircle',
    };
    return icons[status] || 'Package';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Склад и запчасти</h2>
          <p className="text-muted-foreground mt-1">Управление складским учётом</p>
        </div>
        <Button className="gap-2">
          <Icon name="Plus" size={20} />
          Добавить запчасть
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Всего позиций', value: '247', icon: 'Package', color: 'text-primary' },
          { label: 'На складе', value: '1,842 шт', icon: 'Archive', color: 'text-accent' },
          { label: 'Требует закупки', value: '12', icon: 'AlertTriangle', color: 'text-yellow-600' },
          { label: 'Стоимость склада', value: '₽892,340', icon: 'DollarSign', color: 'text-primary' },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} bg-muted rounded-lg p-3`}>
                  <Icon name={stat.icon} size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Поиск запчастей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" className="gap-2">
                  <Icon name="Filter" size={20} />
                  Фильтры
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {parts.map((part) => (
                  <div key={part.id} className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{part.name}</h3>
                          <Badge className={getStatusColor(part.status)}>
                            <Icon name={getStockIcon(part.status)} size={12} className="mr-1" />
                            {part.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{part.category}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Остаток: <span className={part.stock <= part.minStock ? 'text-destructive font-semibold' : 'font-semibold'}>{part.stock} шт</span>
                          </span>
                          <span className="text-muted-foreground">Мин. остаток: {part.minStock} шт</span>
                          <span className="text-muted-foreground">Поставщик: {part.supplier}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-accent mb-2">{part.price}</p>
                        <Button variant="outline" size="sm">Редактировать</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingDown" size={20} />
                Сравнение цен
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partsComparison.map((item, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg space-y-2">
                    <p className="font-medium text-sm">{item.name}</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.supplier1}</span>
                        <span className="font-semibold text-accent">{item.price1}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.supplier2}</span>
                        <span className="font-semibold">{item.price2}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full gap-2">
                  <Icon name="RefreshCw" size={16} />
                  Обновить цены
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="AlertCircle" size={20} />
                Требуют внимания
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <p className="text-sm font-medium">Нет в наличии: 3 позиции</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <p className="text-sm font-medium">Критический остаток: 9 позиций</p>
                </div>
                <Button className="w-full mt-2">Сформировать заказ</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WarehouseView;
