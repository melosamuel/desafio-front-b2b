import {
    Mail,
    RefreshCcw,
    ShoppingBag,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: any;
    colorClass: string;
}

const StatCard = ({
    title,
    value,
    trend,
    trendUp,
    icon: Icon,
    colorClass
}: StatCardProps) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
                <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
            </div>

            {trend && (
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                    {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {trend}
                </div>
            )}

        </div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
);

export function DashboardHome() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Visão geral do desempenho da sua loja hoje.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title="E-mails Pendentes" 
                    value="12" 
                    trend="+4 novos"
                    trendUp={false}
                    icon={Mail}
                    colorClass="bg-blue-600 text-white"
                />

                <StatCard 
                    title="Refunds Solicitados (Mês)" 
                    value="3" 
                    trend="1.2% da receita"
                    trendUp={true}
                    icon={RefreshCcw} 
                    colorClass="bg-orange-500 text-white"
                />

                <StatCard 
                    title="Pedidos Recentes (24h)" 
                    value="24" 
                    trend="+12% vs. ontem"
                    trendUp={true}
                    icon={ShoppingBag} 
                    colorClass="bg-green-600 text-white"
                />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800">Atividade Recente</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver tudo</button>
                </div>
                <div className="divide-y divide-slate-100">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">ORD</div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">Novo pedido #ORD-783{i}</p>
                                    <p className="text-xs text-slate-500">Alice Freeman • R$ 350,00</p>
                                </div>
                            </div>
                            <span className="text-xs text-slate-400">Há 2 horas</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
