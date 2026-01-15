import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Part {
  id: number;
  name: string;
  supplier: string;
  price: number;
}

interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  time: string;
  warranty: number;
  popular: boolean;
  parts: Part[];
}

const ServicesView = () => {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const availableParts: Part[] = [
    { id: 1, name: 'Дисплей iPhone 14 Pro', supplier: 'ТехноПоставка', price: 18500 },
    { id: 2, name: 'Аккумулятор iPhone 14 Pro', supplier: 'ПартсМастер', price: 3200 },
    { id: 3, name: 'Задняя крышка iPhone 14 Pro', supplier: 'МобиСнаб', price: 4500 },
    { id: 4, name: 'Камера основная iPhone 14 Pro', supplier: 'ТехноПоставка', price: 8900 },
    { id: 5, name: 'Разъем Lightning', supplier: 'ПартсМастер', price: 1200 },
    { id: 6, name: 'Динамик разговорный', supplier: 'МобиСнаб', price: 800 },
    { id: 7, name: 'Материнская плата (ремонт)', supplier: 'ТехноПоставка', price: 12000 },
  ];

  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Замена экрана iPhone 14 Pro', category: 'Ремонт дисплея', price: 25000, time: '1-2 часа', warranty: 90, popular: true, parts: [availableParts[0]] },
    { id: 2, name: 'Ремонт материнской платы', category: 'Сложный ремонт', price: 15000, time: '2-5 дней', warranty: 60, popular: true, parts: [availableParts[6]] },
    { id: 3, name: 'Замена аккумулятора iPhone 14 Pro', category: 'Батарея', price: 5000, time: '30 минут', warranty: 180, popular: true, parts: [availableParts[1]] },
    { id: 4, name: 'Диагностика', category: 'Консультация', price: 500, time: '30 минут', warranty: 0, popular: false, parts: [] },
    { id: 5, name: 'Замена разъема зарядки', category: 'Ремонт разъемов', price: 3500, time: '1-2 часа', warranty: 90, popular: false, parts: [availableParts[4]] },
    { id: 6, name: 'Замена камеры', category: 'Фото/видео', price: 12000, time: '1-2 часа', warranty: 90, popular: false, parts: [availableParts[3]] },
  ]);

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const handleSaveService = () => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? editingService : s));
      setIsDialogOpen(false);
      setEditingService(null);
    }
  };

  const handleAddPart = (partId: number) => {
    if (!editingService) return;
    const part = availableParts.find(p => p.id === partId);
    if (part && !editingService.parts.find(p => p.id === partId)) {
      setEditingService({
        ...editingService,
        parts: [...editingService.parts, part]
      });
    }
  };

  const handleRemovePart = (partId: number) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      parts: editingService.parts.filter(p => p.id !== partId)
    });
  };

  const calculatePartsCost = (parts: Part[]) => {
    return parts.reduce((sum, part) => sum + part.price, 0);
  };

  const competitors = [
    { name: 'СервисПро', service: 'Замена экрана iPhone', price: 28500, our: 25000 },
    { name: 'ТехноРемонт', service: 'Замена аккумулятора', price: 5800, our: 5000 },
    { name: 'МастерФикс', service: 'Ремонт мат. платы', price: 18000, our: 15000 },
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
                        <div className="flex items-center gap-4 text-sm mb-2">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Icon name="Clock" size={14} />
                            {service.time}
                          </span>
                          {service.warranty > 0 && (
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Icon name="Shield" size={14} />
                              Гарантия {service.warranty} дней
                            </span>
                          )}
                        </div>
                        {service.parts.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-border">
                            <p className="text-xs text-muted-foreground mb-1">Запчасти:</p>
                            <div className="flex flex-wrap gap-1">
                              {service.parts.map(part => (
                                <Badge key={part.id} variant="outline" className="text-xs">
                                  {part.name} (₽{part.price.toLocaleString()})
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-accent mb-2">₽{service.price.toLocaleString()}</p>
                        {service.parts.length > 0 && (
                          <p className="text-xs text-muted-foreground mb-2">
                            Запчасти: ₽{calculatePartsCost(service.parts).toLocaleString()}
                          </p>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditService(service)}
                        >
                          Редактировать
                        </Button>
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
                        <p className="font-semibold text-destructive">₽{comp.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Наша цена</p>
                        <p className="font-semibold text-accent">₽{comp.our.toLocaleString()}</p>
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
                    <span className="font-bold">{services.length}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Популярных</span>
                    <span className="font-bold text-accent">{services.filter(s => s.popular).length}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Средний чек</span>
                    <span className="font-bold text-primary">₽{Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать услугу</DialogTitle>
          </DialogHeader>
          {editingService && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Название услуги</Label>
                  <Input
                    value={editingService.name}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Категория</Label>
                  <Input
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Цена (₽)</Label>
                  <Input
                    type="number"
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Срок выполнения</Label>
                  <Input
                    value={editingService.time}
                    onChange={(e) => setEditingService({ ...editingService, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Гарантия (дней)</Label>
                  <Input
                    type="number"
                    value={editingService.warranty}
                    onChange={(e) => setEditingService({ ...editingService, warranty: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Связанные запчасти</Label>
                <div className="p-4 bg-muted rounded-lg space-y-3">
                  {editingService.parts.length > 0 ? (
                    <div className="space-y-2">
                      {editingService.parts.map(part => (
                        <div key={part.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{part.name}</p>
                            <p className="text-sm text-muted-foreground">{part.supplier}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-accent">₽{part.price.toLocaleString()}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemovePart(part.id)}
                            >
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Итого стоимость запчастей:</span>
                          <span className="text-lg font-bold text-primary">₽{calculatePartsCost(editingService.parts).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-2">Запчасти не добавлены</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Добавить запчасть</Label>
                  <Select onValueChange={(value) => handleAddPart(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите запчасть из каталога" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableParts
                        .filter(part => !editingService.parts.find(p => p.id === part.id))
                        .map(part => (
                          <SelectItem key={part.id} value={part.id.toString()}>
                            {part.name} - ₽{part.price.toLocaleString()} ({part.supplier})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Стоимость запчастей</p>
                    <p className="text-xl font-bold">₽{calculatePartsCost(editingService.parts).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Цена услуги</p>
                    <p className="text-xl font-bold text-accent">₽{editingService.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Наценка</p>
                    <p className="text-xl font-bold text-primary">
                      ₽{(editingService.price - calculatePartsCost(editingService.parts)).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Рентабельность</p>
                    <p className="text-xl font-bold text-primary">
                      {calculatePartsCost(editingService.parts) > 0 
                        ? Math.round(((editingService.price - calculatePartsCost(editingService.parts)) / calculatePartsCost(editingService.parts)) * 100)
                        : 0}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSaveService} className="flex-1">
                  Сохранить изменения
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingService(null);
                  }}
                >
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesView;
