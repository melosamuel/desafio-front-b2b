import { Save } from 'lucide-react';

export function Settings() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Configurações do Aplicativo</h1>
        
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">Credenciais de E-mail</h3>
                <p className="text-sm text-slate-500 mb-6">Configure a conta que será usada para enviar respostas.</p>
                
                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">E-mail do Aplicativo</label>
                        <input 
                            type="email" 
                            defaultValue="support@minhaloja.com"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Senha do Aplicativo (App Password)</label>
                        <input 
                            type="password" 
                            defaultValue="xkdi-2930-dkso-2020"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                        />
                        <p className="text-xs text-slate-400 mt-1">Utilize uma senha de aplicativo segura, não sua senha pessoal.</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all">
                            <Save size={18} />
                            Salvar Configurações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
