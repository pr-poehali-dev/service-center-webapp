import { useState } from 'react';
import Icon from '@/components/ui/icon';
import CompetitorPricing from '@/components/CompetitorPricing';
import SupplierPricing from '@/components/SupplierPricing';
import PriceCalculator from '@/components/PriceCalculator';
import PriceHistory from '@/components/PriceHistory';

const Index = () => {
  const [activeTab, setActiveTab] = useState('competitors');

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-sm">
              <Icon name="Apple" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Apple Service</h1>
              <p className="text-xs text-muted-foreground">Прайс-менеджер</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {[
            { id: 'competitors', icon: 'TrendingUp', label: 'Цены конкурентов' },
            { id: 'suppliers', icon: 'Package', label: 'Поставщики запчастей' },
            { id: 'calculator', icon: 'Calculator', label: 'Калькулятор цен' },
            { id: 'history', icon: 'Clock', label: 'История изменений' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                  : 'hover:bg-sidebar-accent/50 text-sidebar-foreground/70'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {activeTab === 'competitors' && <CompetitorPricing />}
        {activeTab === 'suppliers' && <SupplierPricing />}
        {activeTab === 'calculator' && <PriceCalculator />}
        {activeTab === 'history' && <PriceHistory />}
      </main>
    </div>
  );
};

export default Index;
