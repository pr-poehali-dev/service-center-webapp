import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const DashboardView = () => {
  const stats = [
    { title: 'Активные заказы', value: '24', icon: 'ClipboardList', trend: '+12%', color: 'text-primary' },
    { title: 'Новые клиенты', value: '8', icon: 'UserPlus', trend: '+5%', color: 'text-accent' },
    { title: 'Выручка за месяц', value: '₽342,500', icon: 'TrendingUp', trend: '+18%', color: 'text-accent' },
    { title: 'Завершено за неделю', value: '47', icon: 'CheckCircle', trend: '+8%', color: 'text-secondary' },
  ];

  const recentOrders = [
    { id: 'ORD-1234', client: 'Иванов А.П.', device: 'iPhone 14 Pro', status: 'В работе', priority: 'high' },
    { id: 'ORD-1235', client: 'Петрова М.С.', device: 'Samsung Galaxy S23', status: 'Диагностика', priority: 'medium' },
    { id: 'ORD-1236', client: 'Сидоров К.В.', device: 'MacBook Pro 16', status: 'Ожидает запчасти', priority: 'low' },
    { id: 'ORD-1237', client: 'Кузнецова Л.Н.', device: 'iPad Air', status: 'Готов к выдаче', priority: 'high' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Главная панель</h2>
          <p className="text-muted-foreground mt-1">Обзор работы сервисного центра</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`${stat.color} bg-muted rounded-lg p-2`}>
                <Icon name={stat.icon} size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-accent mt-1">{stat.trend} от прошлого месяца</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Clock" size={20} />
              Последние заказы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{order.id}</span>
                      {order.priority === 'high' && (
                        <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs rounded-full">Срочно</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{order.client}</p>
                    <p className="text-sm font-medium mt-1">{order.device}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={20} />
              Популярные услуги
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Замена экрана', count: 45, revenue: '₽135,000' },
                { name: 'Ремонт материнской платы', count: 23, revenue: '₽92,000' },
                { name: 'Замена аккумулятора', count: 38, revenue: '₽57,000' },
                { name: 'Диагностика', count: 67, revenue: '₽33,500' },
              ].map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-accent font-semibold">{service.revenue}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${(service.count / 67) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{service.count} заказов</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
