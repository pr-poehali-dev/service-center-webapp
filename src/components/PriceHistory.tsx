import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const PriceHistory = () => {
  const history = [
    { 
      date: '15.01.2026',
      time: '14:30',
      type: 'competitor',
      item: 'Замена экрана iPhone 14 Pro',
      source: 'iТочка',
      oldPrice: 23900,
      newPrice: 24500,
      change: 2.5
    },
    { 
      date: '15.01.2026',
      time: '10:15',
      type: 'supplier',
      item: 'Дисплей iPhone 14 Pro (оригинал)',
      source: 'ТехноПоставка',
      oldPrice: 19200,
      newPrice: 18500,
      change: -3.6
    },
    { 
      date: '14.01.2026',
      time: '16:45',
      type: 'our',
      item: 'Замена батареи iPhone 14',
      source: 'Наш прайс-лист',
      oldPrice: 8200,
      newPrice: 7900,
      change: -3.7
    },
    { 
      date: '14.01.2026',
      time: '11:20',
      type: 'competitor',
      item: 'Ремонт Face ID iPhone 13',
      source: 'AppleFix Pro',
      oldPrice: 15500,
      newPrice: 16500,
      change: 6.5
    },
    { 
      date: '13.01.2026',
      time: '09:00',
      type: 'supplier',
      item: 'Батарея iPhone 14 (High Copy)',
      source: 'БатареяПро',
      oldPrice: 4000,
      newPrice: 3800,
      change: -5.0
    },
    { 
      date: '12.01.2026',
      time: '15:30',
      type: 'our',
      item: 'Замена экрана iPhone 14 Pro',
      source: 'Наш прайс-лист',
      oldPrice: 23500,
      newPrice: 22900,
      change: -2.6
    },
  ];

  const getTypeInfo = (type: string) => {
    const types: Record<string, { label: string; icon: string; color: string }> = {
      competitor: { label: 'Конкурент', icon: 'TrendingUp', color: 'bg-blue-100 text-blue-700' },
      supplier: { label: 'Поставщик', icon: 'Package', color: 'bg-purple-100 text-purple-700' },
      our: { label: 'Наши цены', icon: 'Store', color: 'bg-gray-100 text-gray-700' },
    };
    return types[type] || types.competitor;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-red-600 bg-red-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">История изменений цен</h2>
          <p className="text-muted-foreground mt-1">Отслеживание динамики ценообразования</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Icon name="Download" size={18} />
          Экспорт отчёта
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Изменений за неделю', value: '47', icon: 'Activity' },
          { label: 'Средняя динамика', value: '-2.3%', icon: 'TrendingDown', positive: true },
          { label: 'Обновлений сегодня', value: '8', icon: 'RefreshCw' },
        ].map((stat, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-semibold mt-1 ${stat.positive ? 'text-green-600' : ''}`}>
                    {stat.value}
                  </p>
                </div>
                <div className="text-primary bg-muted rounded-xl p-3">
                  <Icon name={stat.icon} size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="Clock" size={20} />
              Последние изменения
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">Все</Badge>
              <Badge variant="outline">Конкуренты</Badge>
              <Badge variant="outline">Поставщики</Badge>
              <Badge variant="outline">Наши цены</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {history.map((record, index) => {
              const typeInfo = getTypeInfo(record.type);
              
              return (
                <div key={index} className="p-4 bg-muted rounded-xl hover:bg-muted/80 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center min-w-[80px]">
                      <div className="text-sm font-semibold">{record.date}</div>
                      <div className="text-xs text-muted-foreground">{record.time}</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={typeInfo.color}>
                          <Icon name={typeInfo.icon} size={12} className="mr-1" />
                          {typeInfo.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{record.source}</span>
                      </div>
                      
                      <h3 className="font-medium mb-2">{record.item}</h3>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Было:</span>
                          <span className="font-semibold line-through opacity-60">
                            {record.oldPrice.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                        <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Стало:</span>
                          <span className="font-semibold">
                            {record.newPrice.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`px-3 py-1.5 rounded-lg font-semibold min-w-[80px] text-center ${getChangeColor(record.change)}`}>
                      {record.change > 0 ? '+' : ''}{record.change.toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={20} />
              Топ изменений (повышение)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { item: 'Ремонт Face ID iPhone 13', change: 6.5, source: 'AppleFix Pro' },
                { item: 'Замена камеры iPhone 12', change: 4.8, source: 'МакРемонт' },
                { item: 'Замена экрана iPhone 14 Pro', change: 2.5, source: 'iТочка' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.item}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.source}</p>
                  </div>
                  <div className="text-red-600 font-semibold">+{item.change}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingDown" size={20} />
              Топ изменений (снижение)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { item: 'Батарея iPhone 14 (High Copy)', change: -5.0, source: 'БатареяПро' },
                { item: 'Замена батареи iPhone 14', change: -3.7, source: 'Наш прайс' },
                { item: 'Дисплей iPhone 14 Pro', change: -3.6, source: 'ТехноПоставка' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.item}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.source}</p>
                  </div>
                  <div className="text-green-600 font-semibold">{item.change}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PriceHistory;
