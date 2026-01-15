import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const CompetitorPricing = () => {
  const [lastUpdate, setLastUpdate] = useState('15.01.2026 14:30');

  const competitors = [
    { 
      name: 'iТочка', 
      location: 'Москва, ТЦ Европейский',
      services: [
        { service: 'Замена экрана iPhone 14 Pro', price: 24500, ourPrice: 22900, diff: -6.5 },
        { service: 'Замена батареи iPhone 14', price: 8900, ourPrice: 7900, diff: -11.2 },
        { service: 'Ремонт Face ID iPhone 13', price: 15000, ourPrice: 14200, diff: -5.3 },
      ]
    },
    { 
      name: 'AppleFix Pro', 
      location: 'Москва, ул. Арбат 24',
      services: [
        { service: 'Замена экрана iPhone 14 Pro', price: 23900, ourPrice: 22900, diff: -4.2 },
        { service: 'Замена батареи iPhone 14', price: 8500, ourPrice: 7900, diff: -7.1 },
        { service: 'Ремонт Face ID iPhone 13', price: 16500, ourPrice: 14200, diff: -13.9 },
      ]
    },
    { 
      name: 'МакРемонт', 
      location: 'Москва, Ленинградский пр.',
      services: [
        { service: 'Замена экрана iPhone 14 Pro', price: 25900, ourPrice: 22900, diff: -11.6 },
        { service: 'Замена батареи iPhone 14', price: 9200, ourPrice: 7900, diff: -14.1 },
        { service: 'Ремонт Face ID iPhone 13', price: 14800, ourPrice: 14200, diff: -4.1 },
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

  const getDiffColor = (diff: number) => {
    if (diff < -10) return 'text-green-600 bg-green-50';
    if (diff < -5) return 'text-green-600 bg-green-50';
    if (diff < 0) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Мониторинг цен конкурентов</h2>
          <p className="text-muted-foreground mt-1">Сравнение стоимости услуг по ремонту техники Apple</p>
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
          { label: 'Конкурентов отслеживается', value: '12', icon: 'Users' },
          { label: 'Услуг сравнивается', value: '47', icon: 'Briefcase' },
          { label: 'Наша выгода', value: '-8.2%', icon: 'TrendingDown' },
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
        {competitors.map((competitor, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">{competitor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <Icon name="MapPin" size={14} />
                    {competitor.location}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon name="ExternalLink" size={16} />
                  Открыть сайт
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {competitor.services.map((item, idx) => (
                  <div key={idx} className="p-4 bg-muted rounded-xl hover:bg-muted/80 transition-all">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium mb-2">{item.service}</h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">У них:</span>
                            <span className="font-semibold">{item.price.toLocaleString('ru-RU')} ₽</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">У нас:</span>
                            <span className="font-semibold text-primary">{item.ourPrice.toLocaleString('ru-RU')} ₽</span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1.5 rounded-lg font-semibold ${getDiffColor(item.diff)}`}>
                        {item.diff > 0 ? '+' : ''}{item.diff.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompetitorPricing;
