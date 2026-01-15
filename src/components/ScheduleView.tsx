import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const ScheduleView = () => {
  const schedule = [
    { time: '09:00', client: 'Иванов А.П.', service: 'Замена экрана iPhone 14', engineer: 'Сергеев М.', status: 'Выполнено' },
    { time: '10:30', client: 'Петрова М.С.', service: 'Диагностика Samsung S23', engineer: 'Козлов Д.', status: 'В работе' },
    { time: '12:00', client: 'Сидоров К.В.', service: 'Ремонт материнской платы MacBook', engineer: 'Сергеев М.', status: 'Запланировано' },
    { time: '14:00', client: 'Морозова Е.А.', service: 'Замена аккумулятора iPad', engineer: 'Иванов П.', status: 'Запланировано' },
    { time: '15:30', client: 'Новиков С.Р.', service: 'Замена камеры Xiaomi', engineer: 'Козлов Д.', status: 'Запланировано' },
    { time: '17:00', client: 'Федорова А.В.', service: 'Восстановление после воды', engineer: 'Сергеев М.', status: 'Запланировано' },
  ];

  const engineers = [
    { name: 'Сергеев Михаил', specialization: 'iPhone, iPad', workload: 85, orders: 3 },
    { name: 'Козлов Дмитрий', specialization: 'Android устройства', workload: 60, orders: 2 },
    { name: 'Иванов Павел', specialization: 'Ноутбуки, планшеты', workload: 45, orders: 1 },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Выполнено': 'bg-accent/10 text-accent',
      'В работе': 'bg-primary/10 text-primary',
      'Запланировано': 'bg-blue-100 text-blue-700',
      'Отменено': 'bg-destructive/10 text-destructive',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return 'bg-destructive';
    if (workload >= 60) return 'bg-yellow-500';
    return 'bg-accent';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Расписание</h2>
          <p className="text-muted-foreground mt-1">Планирование работ на сегодня</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Icon name="Calendar" size={20} />
            Выбрать дату
          </Button>
          <Button className="gap-2">
            <Icon name="Plus" size={20} />
            Новая запись
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Записей на сегодня', value: '12', icon: 'Calendar', color: 'text-primary' },
          { label: 'В работе', value: '3', icon: 'Activity', color: 'text-primary' },
          { label: 'Осталось выполнить', value: '8', icon: 'Clock', color: 'text-accent' },
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
              <CardTitle className="flex items-center gap-2">
                <Icon name="Clock" size={20} />
                График работ на сегодня
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center min-w-[60px]">
                        <div className="text-2xl font-bold text-primary">{item.time}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{item.client}</h3>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </div>
                        <p className="text-sm mb-1">{item.service}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Icon name="User" size={14} />
                          Мастер: {item.engineer}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="MoreVertical" size={16} />
                      </Button>
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
                <Icon name="Users" size={20} />
                Мастера
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {engineers.map((engineer, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{engineer.name}</h3>
                      <Badge variant="outline">{engineer.orders} заказа</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{engineer.specialization}</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Загрузка</span>
                        <span className="font-semibold">{engineer.workload}%</span>
                      </div>
                      <div className="h-2 bg-background rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getWorkloadColor(engineer.workload)} transition-all`}
                          style={{ width: `${engineer.workload}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="CalendarDays" size={20} />
                Неделя
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="font-medium">{day}</span>
                    <span className="text-sm text-muted-foreground">{8 + index * 2} записей</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
