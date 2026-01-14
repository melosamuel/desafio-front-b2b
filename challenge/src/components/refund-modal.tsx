import { X, AlertCircle } from 'lucide-react';

interface RefundModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
}

export function RefundModal({ isOpen, onClose, orderId }: RefundModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <AlertCircle size={20} className="text-orange-500" />
                        Solicitar Refund - {orderId}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Motivo do Reembolso</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700">
                            <option>Selecione um motivo...</option>
                            <option>Produto defeituoso</option>
                            <option>Cliente desistiu</option>
                            <option>Envio atrasado</option>
                            <option>Erro no pedido</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <span className="block text-sm font-medium text-slate-700">Tags de Classificação</span>
                        <div className="flex flex-wrap gap-3">
                            {['Defeito', 'Atraso', 'Desistência', 'Fraude'].map((tag) => (
                                <label key={tag} className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-100">
                                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                                    <span className="text-sm text-slate-600">{tag}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Observações Internas</label>
                        <textarea 
                            rows={3}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
                            placeholder="Descreva detalhes adicionais..."
                        />
                    </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:text-slate-800 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={onClose} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                        Confirmar Refund
                    </button>
                </div>
            </div>
        </div>
    );
}