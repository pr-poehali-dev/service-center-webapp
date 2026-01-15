import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const PriceCalculator = () => {
  const [partCost, setPartCost] = useState(18500);
  const [laborCost, setLaborCost] = useState(2000);
  const [markup, setMarkup] = useState([30]);
  const [category, setCategory] = useState('display');

  const calculateRetailPrice = () => {
    const totalCost = partCost + laborCost;
    const markupAmount = (totalCost * markup[0]) / 100;
    return Math.round(totalCost + markupAmount);
  };

  const retailPrice = calculateRetailPrice();

  const presets = [
    { name: 'Замена экрана iPhone 14 Pro', partCost: 18500, laborCost: 2000, markup: 30 },
    { name: 'Замена батареи iPhone 14', partCost: 4200, laborCost: 1000, markup: 35 },
    { name: 'Ремонт Face ID iPhone 13', partCost: 8900, laborCost: 3000, markup: 25 },
    { name: 'Замена камеры iPhone 13 Pro', partCost: 6500, laborCost: 1500, markup: 30 },
  ];

  const markupPresets = [
    { label: 'Минимальная', value: 15, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Стандартная', value: 30, color: 'bg-blue-100 text-blue-700' },
    { label: 'Премиум', value: 50, color: 'bg-purple-100 text-purple-700' },
  ];

  const handlePresetClick = (preset: typeof presets[0]) => {
    setPartCost(preset.partCost);
    setLaborCost(preset.laborCost);
    setMarkup([preset.markup]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Калькулятор розничной цены</h2>
          <p className="text-muted-foreground mt-1">Расчёт стоимости услуг с учётом наценки</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Settings" size={20} />
                Параметры расчёта
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Категория услуги</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="display">Замена экрана</SelectItem>
                      <SelectItem value="battery">Замена батареи</SelectItem>
                      <SelectItem value="camera">Замена камеры</SelectItem>
                      <SelectItem value="faceid">Ремонт Face ID</SelectItem>
                      <SelectItem value="board">Ремонт платы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Стоимость запчасти, ₽</Label>
                  <Input 
                    type="number" 
                    value={partCost}
                    onChange={(e) => setPartCost(Number(e.target.value))}
                    className="text-lg font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Стоимость работы, ₽</Label>
                <Input 
                  type="number" 
                  value={laborCost}
                  onChange={(e) => setLaborCost(Number(e.target.value))}
                  className="text-lg font-semibold"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Наценка: {markup[0]}%</Label>
                  <div className="flex gap-2">
                    {markupPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => setMarkup([preset.value])}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${preset.color}`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Slider
                  value={markup}
                  onValueChange={setMarkup}
                  min={10}
                  max={70}
                  step={5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Zap" size={20} />
                Быстрые пресеты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handlePresetClick(preset)}
                    className="p-4 bg-muted rounded-xl hover:bg-muted/80 transition-all text-left"
                  >
                    <h3 className="font-medium mb-2">{preset.name}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Запчасть: {preset.partCost.toLocaleString('ru-RU')} ₽</p>
                      <p>Работа: {preset.laborCost.toLocaleString('ru-RU')} ₽</p>
                      <p>Наценка: {preset.markup}%</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calculator" size={20} />
                Итоговая цена
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Стоимость запчасти</span>
                  <span className="font-semibold">{partCost.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Стоимость работы</span>
                  <span className="font-semibold">{laborCost.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Себестоимость</span>
                  <span className="font-semibold">{(partCost + laborCost).toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary/20">
                  <span className="text-muted-foreground">Наценка ({markup[0]}%)</span>
                  <span className="font-semibold text-primary">
                    +{Math.round(((partCost + laborCost) * markup[0]) / 100).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-xl border-2 border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Розничная цена</p>
                <p className="text-4xl font-bold text-primary">{retailPrice.toLocaleString('ru-RU')} ₽</p>
              </div>

              <div className="space-y-2">
                <Button className="w-full gap-2">
                  <Icon name="Save" size={18} />
                  Сохранить в прайс-лист
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Icon name="Copy" size={18} />
                  Копировать цену
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Сравнение с рынком</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Средняя цена рынка</span>
                  <span className="font-semibold">24,800 ₽</span>
                </div>
                <div className="text-xs text-muted-foreground">На 8% выше нашей</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-green-700">Наша маржа</span>
                  <span className="font-semibold text-green-700">
                    {Math.round(((retailPrice - partCost - laborCost) / retailPrice) * 100)}%
                  </span>
                </div>
                <div className="text-xs text-green-600">
                  Прибыль: {(retailPrice - partCost - laborCost).toLocaleString('ru-RU')} ₽
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
