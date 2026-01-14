import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Inbox, ShoppingBag, Settings, LogOut, Store } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, active }: any) => (
    <Link 
        to={path} 
        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        active 
            ? 'bg-blue-50 text-blue-700' 
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
    >
        <Icon size={20} />
        {label}
    </Link>
);

export function DashboardLayout() {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-slate-50">
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Store className="text-white" size={20} />
                    </div>
                    <span className="font-bold text-slate-800 text-lg">Nexus SaaS</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/dashboard" active={location.pathname === '/dashboard'} />
                    <SidebarItem icon={Inbox} label="Inbox" path="/dashboard/inbox" active={location.pathname.includes('inbox')} />
                    <SidebarItem icon={ShoppingBag} label="Pedidos" path="/dashboard/orders" active={location.pathname.includes('orders')} />
                    <SidebarItem icon={Settings} label="Configurações" path="/dashboard/settings" active={location.pathname === '/dashboard/settings'} />
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full text-sm font-medium transition-colors">
                        <LogOut size={20} />
                        Sair
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
                    <h2 className="text-slate-800 font-semibold">Minha Loja Shopify</h2>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-slate-700">Admin User</p>
                            <p className="text-xs text-slate-500">admin@nexus.com</p>
                        </div>
                        <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="Avatar" />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
