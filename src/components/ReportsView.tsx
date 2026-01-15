import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ReportsView = () => {
  const monthlyData = [
    { month: 'Январь', revenue: 342500, orders: 87, clients: 45 },
    { month: 'Декабрь', revenue: 298000, orders: 76, clients: 38 },
    { month: 'Ноябрь', revenue: 315000, orders: 82, clients: 41 },
    { month: 'Октябрь', revenue: 287500, orders: 71, clients: 35 },
  ];

  const topServices = [
    { name: 'Замена экрана', count: 45, revenue: 405000, share: 35 },
    { name: 'Ремонт мат. платы', count: 23, revenue: 345000, share: 28 },
    { name: 'Замена аккумулятора', count: 38, revenue: 152000, share: 13 },
    { name: 'Диагностика', count: 67, revenue: 33500, share: 3 },
    { name: 'Прочее', count: 34, revenue: 245500, share: 21 },
  ];

  const engineersStats = [
    { name: 'Сергеев М.', orders: 45, revenue: 487500, rating: 4.9 },
    { name: 'Козлов Д.', orders: 38, revenue: 412000, rating: 4.8 },
    { name: 'Иванов П.', orders: 31, revenue: 348500, rating: 4.7 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Отчёты и аналитика</h2>
          <p className="text-muted-foreground mt-1">Анализ эффективности работы</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">За день</SelectItem>
              <SelectItem value="week">За неделю</SelectItem>
              <SelectItem value="month">За месяц</SelectItem>
              <SelectItem value="year">За год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Icon name="Download" size={20} />
            Экспорт
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Выручка за месяц', value: '₽342,500', change: '+18%', icon: 'TrendingUp', color: 'text-accent' },
          { label: 'Заказов выполнено', value: '87', change: '+12%', icon: 'CheckCircle', color: 'text-primary' },
          { label: 'Новых клиентов', value: '45', change: '+8%', icon: 'UserPlus', color: 'text-primary' },
          { label: 'Средний чек', value: '₽3,937', change: '+5%', icon: 'DollarSign', color: 'text-accent' },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className={`${stat.color} bg-muted rounded-lg p-2`}>
                  <Icon name={stat.icon} size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-accent mt-1">{stat.change} к прошлому месяцу</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="BarChart3" size={20} />
              Динамика по месяцам
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{data.month}</span>
                    <span className="text-accent font-bold">{data.revenue.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                      style={{ width: `${(data.revenue / 350000) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{data.orders} заказов</span>
                    <span>{data.clients} клиентов</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="PieChart" size={20} />
              Популярные услуги
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{service.name}</span>
                    <div className="text-right">
                      <span className="text-accent font-bold block">{service.revenue.toLocaleString('ru-RU')} ₽</span>
                      <span className="text-xs text-muted-foreground">{service.share}% выручки</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${service.share * 2.5}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground min-w-[80px] text-right">{service.count} заказов</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" size={20} />
            Эффективность мастеров
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {engineersStats.map((engineer, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{engineer.name}</h3>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{engineer.rating}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Заказов</span>
                    <span className="font-semibold">{engineer.orders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Выручка</span>
                    <span className="font-semibold text-accent">{engineer.revenue.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Средний чек</span>
                    <span className="font-semibold">{Math.round(engineer.revenue / engineer.orders).toLocaleString('ru-RU')} ₽</span>
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

export default ReportsView;
