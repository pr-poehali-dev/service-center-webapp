import { useState } from 'react';
import Icon from '@/components/ui/icon';
import DashboardView from '@/components/DashboardView';
import OrdersView from '@/components/OrdersView';
import ClientsView from '@/components/ClientsView';
import ServicesView from '@/components/ServicesView';
import ReportsView from '@/components/ReportsView';
import ScheduleView from '@/components/ScheduleView';
import WarehouseView from '@/components/WarehouseView';
import CompetitorPricing from '@/components/CompetitorPricing';
import SupplierPricing from '@/components/SupplierPricing';
import PriceCalculator from '@/components/PriceCalculator';
import PriceHistory from '@/components/PriceHistory';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuSections = [
    {
      title: 'Управление',
      items: [
        { id: 'dashboard', icon: 'LayoutDashboard', label: 'Главная' },
        { id: 'orders', icon: 'ClipboardList', label: 'Заказы' },
        { id: 'clients', icon: 'Users', label: 'Клиенты' },
        { id: 'schedule', icon: 'Calendar', label: 'Расписание' },
        { id: 'reports', icon: 'BarChart3', label: 'Отчёты' },
      ]
    },
    {
      title: 'Прайс-менеджер',
      items: [
        { id: 'competitors', icon: 'TrendingUp', label: 'Цены конкурентов' },
        { id: 'suppliers', icon: 'Package', label: 'Поставщики' },
        { id: 'calculator', icon: 'Calculator', label: 'Калькулятор' },
        { id: 'history', icon: 'Clock', label: 'История цен' },
      ]
    },
    {
      title: 'Каталоги',
      items: [
        { id: 'services', icon: 'Briefcase', label: 'Услуги' },
        { id: 'warehouse', icon: 'Archive', label: 'Склад' },
      ]
    }
  ];

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
              <p className="text-xs text-muted-foreground">Сервисный центр</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-6">
          {menuSections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                        : 'hover:bg-sidebar-accent/50 text-sidebar-foreground/70'
                    }`}
                  >
                    <Icon name={item.icon} size={18} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'clients' && <ClientsView />}
        {activeTab === 'services' && <ServicesView />}
        {activeTab === 'warehouse' && <WarehouseView />}
        {activeTab === 'schedule' && <ScheduleView />}
        {activeTab === 'reports' && <ReportsView />}
        {activeTab === 'competitors' && <CompetitorPricing />}
        {activeTab === 'suppliers' && <SupplierPricing />}
        {activeTab === 'calculator' && <PriceCalculator />}
        {activeTab === 'history' && <PriceHistory />}
      </main>
    </div>
  );
};

export default Index;
