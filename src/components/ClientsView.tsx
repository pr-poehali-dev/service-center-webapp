import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const ClientsView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const clients = [
    { id: 1, name: 'Иванов Алексей Петрович', phone: '+7 (999) 123-45-67', email: 'ivanov@mail.ru', orders: 5, totalSpent: '₽42,500', lastVisit: '15.01.2026', status: 'VIP' },
    { id: 2, name: 'Петрова Мария Сергеевна', phone: '+7 (999) 234-56-78', email: 'petrova@gmail.com', orders: 3, totalSpent: '₽28,000', lastVisit: '15.01.2026', status: 'Активный' },
    { id: 3, name: 'Сидоров Константин Викторович', phone: '+7 (999) 345-67-89', email: 'sidorov@yandex.ru', orders: 8, totalSpent: '₽67,000', lastVisit: '14.01.2026', status: 'VIP' },
    { id: 4, name: 'Кузнецова Лариса Николаевна', phone: '+7 (999) 456-78-90', email: 'kuznetsova@mail.ru', orders: 2, totalSpent: '₽15,500', lastVisit: '14.01.2026', status: 'Активный' },
    { id: 5, name: 'Морозов Дмитрий Александрович', phone: '+7 (999) 567-89-01', email: 'morozov@gmail.com', orders: 1, totalSpent: '₽7,000', lastVisit: '15.01.2026', status: 'Новый' },
  ];

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return `${parts[0][0]}${parts[1]?.[0] || ''}`;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'VIP': 'bg-accent/10 text-accent',
      'Активный': 'bg-primary/10 text-primary',
      'Новый': 'bg-blue-100 text-blue-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Клиенты</h2>
          <p className="text-muted-foreground mt-1">База клиентов сервисного центра</p>
        </div>
        <Button className="gap-2">
          <Icon name="UserPlus" size={20} />
          Добавить клиента
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Всего клиентов', value: '1,234', icon: 'Users', color: 'text-primary' },
          { label: 'Новых за месяц', value: '48', icon: 'UserPlus', color: 'text-accent' },
          { label: 'VIP клиентов', value: '87', icon: 'Crown', color: 'text-accent' },
          { label: 'Активных', value: '892', icon: 'Activity', color: 'text-primary' },
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

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Поиск по имени, телефону или email..."
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
            {clients.map((client) => (
              <div key={client.id} className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-all">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{client.name}</h3>
                      <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Phone" size={14} />
                        {client.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Mail" size={14} />
                        {client.email}
                      </span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm text-muted-foreground">Заказов: {client.orders}</p>
                    <p className="font-bold text-accent">{client.totalSpent}</p>
                    <p className="text-xs text-muted-foreground">Последний визит: {client.lastVisit}</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Icon name="Eye" size={16} />
                    Профиль
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsView;
