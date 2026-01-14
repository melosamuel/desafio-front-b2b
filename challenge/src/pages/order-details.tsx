import { useState } from 'react';
import { MOCK_ORDERS } from '../lib/mock';
import { RefreshCcw, Mail, ArrowLeft, Package } from 'lucide-react';
import { RefundModal } from '../components/refund-modal';

export function OrderDetails() {
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
    const order = MOCK_ORDERS[0]; 

    return (
        <div>
            <RefundModal 
                isOpen={isRefundModalOpen} 
                onClose={() => setIsRefundModalOpen(false)} 
                orderId={order.id} 
            />

            <div className="mb-6 flex items-center gap-4">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        Pedido {order.id}
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
                            {order.status}
                        </span>
                    </h1>
                    <p className="text-slate-500 text-sm">Realizado em 12 de Janeiro de 2026</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Package size={18} className="text-blue-600" />
                            Itens do Pedido
                        </h3>

                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500">
                                <tr>
                                    <th className="p-3 rounded-tl-lg">Produto</th>
                                    <th className="p-3">Qtd</th>
                                    <th className="p-3 text-right rounded-tr-lg">Preço</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="p-3 font-medium text-slate-700">Camiseta Basic Premium (Preta/M)</td>
                                    <td className="p-3 text-slate-600">2</td>
                                    <td className="p-3 text-right text-slate-700">R$ 175,00</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                            <span className="font-bold text-slate-900 text-lg">Total</span>
                            <span className="font-bold text-slate-900 text-lg">{order.value}</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Mail size={18} className="text-blue-600" />
                            Histórico de Comunicação
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-3 relative pb-4 border-l-2 border-slate-100 pl-4 ml-2">
                                <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">E-mail Recebido - Problema com entrega</p>
                                    <p className="text-xs text-slate-500">10:30 AM • Alice Freeman</p>
                                </div>
                            </div>

                            <div className="flex gap-3 relative pl-4 ml-2">
                                <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-slate-400"></div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">Pedido Criado</p>
                                    <p className="text-xs text-slate-500">12 Jan, 08:00 AM • Shopify</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-semibold text-slate-800 mb-4">Cliente</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                                AF
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Alice Freeman</p>
                                <p className="text-xs text-slate-500">alice@example.com</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <button 
                                onClick={() => setIsRefundModalOpen(true)}
                                className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 py-2.5 rounded-lg font-medium transition-all"
                            >
                                <RefreshCcw size={18} />
                                Solicitar Refund
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}