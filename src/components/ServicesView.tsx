import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const ServicesView = () => {
  const services = [
    { id: 1, name: 'Замена экрана', category: 'Ремонт дисплея', price: '₽3,000 - ₽12,000', time: '1-2 часа', popular: true },
    { id: 2, name: 'Ремонт материнской платы', category: 'Сложный ремонт', price: '₽4,000 - ₽15,000', time: '2-5 дней', popular: true },
    { id: 3, name: 'Замена аккумулятора', category: 'Батарея', price: '₽1,500 - ₽5,000', time: '30 минут', popular: true },
    { id: 4, name: 'Диагностика', category: 'Консультация', price: '₽500', time: '30 минут', popular: false },
    { id: 5, name: 'Замена разъема зарядки', category: 'Ремонт разъемов', price: '₽1,200 - ₽3,500', time: '1-2 часа', popular: false },
    { id: 6, name: 'Замена камеры', category: 'Фото/видео', price: '₽2,000 - ₽8,000', time: '1-2 часа', popular: false },
    { id: 7, name: 'Восстановление после воды', category: 'Сложный ремонт', price: '₽3,000 - ₽20,000', time: '3-7 дней', popular: false },
    { id: 8, name: 'Замена кнопок', category: 'Механика', price: '₽800 - ₽2,500', time: '1 час', popular: false },
  ];

  const competitors = [
    { name: 'СервисПро', service: 'Замена экрана iPhone', price: '₽8,500', our: '₽7,500' },
    { name: 'ТехноРемонт', service: 'Замена аккумулятора', price: '₽3,200', our: '₽2,800' },
    { name: 'МастерФикс', service: 'Ремонт мат. платы', price: '₽12,000', our: '₽10,500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Услуги и прайс-лист</h2>
          <p className="text-muted-foreground mt-1">Каталог услуг сервисного центра</p>
        </div>
        <Button className="gap-2">
          <Icon name="Plus" size={20} />
          Добавить услугу
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Briefcase" size={20} />
                Наши услуги
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {services.map((service) => (
                  <div key={service.id} className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{service.name}</h3>
                          {service.popular && (
                            <Badge className="bg-accent/10 text-accent">Популярно</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{service.category}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Icon name="Clock" size={14} />
                            {service.time}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-accent mb-2">{service.price}</p>
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
                Цены конкурентов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitors.map((comp, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{comp.name}</span>
                      <Badge variant="outline" className="text-xs">{comp.service}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Их цена</p>
                        <p className="font-semibold text-destructive">{comp.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Наша цена</p>
                        <p className="font-semibold text-accent">{comp.our}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full gap-2">
                  <Icon name="RefreshCw" size={16} />
                  Обновить данные
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart3" size={20} />
                Статистика
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Всего услуг</span>
                    <span className="font-bold">24</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Популярных</span>
                    <span className="font-bold text-accent">8</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Средний чек</span>
                    <span className="font-bold text-primary">₽7,250</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServicesView;
