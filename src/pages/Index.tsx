import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import DashboardView from '@/components/DashboardView';
import OrdersView from '@/components/OrdersView';
import ClientsView from '@/components/ClientsView';
import ServicesView from '@/components/ServicesView';
import ReportsView from '@/components/ReportsView';
import ScheduleView from '@/components/ScheduleView';
import WarehouseView from '@/components/WarehouseView';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Icon name="Wrench" size={24} className="text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Сервис Центр</h1>
              <p className="text-xs text-sidebar-foreground/70">Управление</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {[
            { id: 'dashboard', icon: 'LayoutDashboard', label: 'Главная' },
            { id: 'orders', icon: 'ClipboardList', label: 'Заказы' },
            { id: 'clients', icon: 'Users', label: 'Клиенты' },
            { id: 'services', icon: 'Briefcase', label: 'Услуги' },
            { id: 'warehouse', icon: 'Package', label: 'Склад' },
            { id: 'schedule', icon: 'Calendar', label: 'Расписание' },
            { id: 'reports', icon: 'BarChart3', label: 'Отчёты' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'hover:bg-sidebar-accent/50 text-sidebar-foreground/80'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
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
      </main>
    </div>
  );
};

export default Index;
