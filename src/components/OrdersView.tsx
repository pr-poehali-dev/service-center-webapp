import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const OrdersView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    { id: 'ORD-1234', client: 'Иванов А.П.', phone: '+7 (999) 123-45-67', device: 'iPhone 14 Pro', issue: 'Не включается', status: 'В работе', date: '15.01.2026', price: '₽8,500' },
    { id: 'ORD-1235', client: 'Петрова М.С.', phone: '+7 (999) 234-56-78', device: 'Samsung Galaxy S23', issue: 'Разбит экран', status: 'Диагностика', date: '15.01.2026', price: '₽12,000' },
    { id: 'ORD-1236', client: 'Сидоров К.В.', phone: '+7 (999) 345-67-89', device: 'MacBook Pro 16', issue: 'Проблемы с зарядкой', status: 'Ожидает запчасти', date: '14.01.2026', price: '₽15,000' },
    { id: 'ORD-1237', client: 'Кузнецова Л.Н.', phone: '+7 (999) 456-78-90', device: 'iPad Air', issue: 'Замена аккумулятора', status: 'Готов к выдаче', date: '14.01.2026', price: '₽5,500' },
    { id: 'ORD-1238', client: 'Морозов Д.А.', phone: '+7 (999) 567-89-01', device: 'Xiaomi 13', issue: 'Не работает камера', status: 'Новый', date: '15.01.2026', price: '₽7,000' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Новый': 'bg-blue-100 text-blue-700',
      'Диагностика': 'bg-yellow-100 text-yellow-700',
      'В работе': 'bg-primary/10 text-primary',
      'Ожидает запчасти': 'bg-orange-100 text-orange-700',
      'Готов к выдаче': 'bg-accent/10 text-accent',
      'Выдан': 'bg-gray-100 text-gray-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Заказы</h2>
          <p className="text-muted-foreground mt-1">Управление заказами клиентов</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Icon name="Plus" size={20} />
              Новый заказ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Создать новый заказ</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Клиент</Label>
                  <Input placeholder="ФИО клиента" />
                </div>
                <div className="space-y-2">
                  <Label>Телефон</Label>
                  <Input placeholder="+7 (999) 123-45-67" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Устройство</Label>
                <Input placeholder="Модель устройства" />
              </div>
              <div className="space-y-2">
                <Label>Описание проблемы</Label>
                <Textarea placeholder="Опишите неисправность" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Статус</Label>
                  <Select defaultValue="new">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Новый</SelectItem>
                      <SelectItem value="diagnostics">Диагностика</SelectItem>
                      <SelectItem value="work">В работе</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Стоимость</Label>
                  <Input placeholder="0" type="number" />
                </div>
              </div>
              <Button className="w-full">Создать заказ</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по номеру заказа, клиенту или устройству..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Все статусы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="new">Новый</SelectItem>
                <SelectItem value="diagnostics">Диагностика</SelectItem>
                <SelectItem value="work">В работе</SelectItem>
                <SelectItem value="waiting">Ожидает запчасти</SelectItem>
                <SelectItem value="ready">Готов к выдаче</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg">{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Клиент</p>
                        <p className="font-medium">{order.client}</p>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Устройство</p>
                        <p className="font-medium">{order.device}</p>
                        <p className="text-sm text-muted-foreground">{order.issue}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                    <p className="text-xl font-bold text-accent">{order.price}</p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Icon name="Eye" size={16} />
                      Открыть
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersView;
