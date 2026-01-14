import { useState, useEffect, useRef } from 'react';
import { MOCK_EMAILS } from '../lib/mock';
import { Search, Trash2, Languages, Send, User, Plus, X } from 'lucide-react';

export interface Email {
    id: string;
    client: string;
    orderId: string;
    subject: string;
    status: 'Novo' | 'Respondido';
    content: string;
    contentTranslated?: string;
    timestamp: string;
    isOutgoing?: boolean;
}

interface ThreadMessage {
    id: string;
    content: string;
    isMe: boolean;
    timestamp: string;
}

export function Inbox() {
    const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(MOCK_EMAILS[0]);
    const [thread, setThread] = useState<ThreadMessage[]>([]);
    const [showTranslation, setShowTranslation] = useState<boolean>(false);
    const [replyText, setReplyText] = useState<string>('');
    
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [newEmailTo, setNewEmailTo] = useState('');
    const [newEmailSubject, setNewEmailSubject] = useState('');
    const [newEmailContent, setNewEmailContent] = useState('');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedEmail) {
            const content = showTranslation && selectedEmail.contentTranslated 
                ? selectedEmail.contentTranslated 
                : selectedEmail.content;

            setThread([
                {
                    id: 'initial',
                    content: content,
                    isMe: !!selectedEmail.isOutgoing,
                    timestamp: selectedEmail.timestamp
                }
            ]);
        }
    }, [selectedEmail, showTranslation]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [thread]);

    function handleDeleteEmail(emailId: string) {
        if (selectedEmail?.id === emailId) {
            setSelectedEmail(null);
            setThread([]);
        }
        setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailId));
    };

    function handleSendMessage() {
        if (!replyText.trim() || !selectedEmail) return;

        const newMessage: ThreadMessage = {
            id: Date.now().toString(),
            content: replyText,
            isMe: true,
            timestamp: 'Agora'
        };

        setThread((prev) => [...prev, newMessage]);
        setReplyText('');
        
        setEmails(prev => prev.map(e => 
            e.id === selectedEmail.id ? { ...e, status: 'Respondido' } : e
        ));
    }

    function handleCreateNewEmail() {
        if (!newEmailTo || !newEmailSubject || !newEmailContent) return;

        const newEmail: Email = {
            id: Date.now().toString(),
            client: newEmailTo,
            subject: newEmailSubject,
            content: newEmailContent,
            status: 'Respondido',
            orderId: 'Geral',
            timestamp: 'Agora',
            isOutgoing: true
        };

        setEmails(prev => [newEmail, ...prev]);
        setSelectedEmail(newEmail);
        
        setNewEmailTo('');
        setNewEmailSubject('');
        setNewEmailContent('');
        setIsComposeOpen(false);
    }

    return (
        <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="w-1/3 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-100 space-y-3">
                    <button 
                        onClick={() => setIsComposeOpen(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        Escrever E-mail
                    </button>

                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Buscar e-mails..." 
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {emails.map((email) => (
                        <div 
                            key={email.id}
                            onClick={() => setSelectedEmail(email)}
                            className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${
                                selectedEmail?.id === email.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                            }`}
                        >
                            <div className="flex justify-between mb-1">
                                <span className={`text-sm font-semibold ${email.status === 'Novo' ? 'text-blue-600' : 'text-slate-700'}`}>
                                    {email.client}
                                </span>
                                <span className="text-xs text-slate-400">{email.timestamp}</span>
                            </div>

                            <p className="text-sm font-medium text-slate-800 truncate">{email.subject}</p>
                            <p className="text-xs text-slate-500 truncate mt-1">{email.content}</p>
                            <div className="mt-2 flex gap-2 items-center">
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full font-medium">
                                    {email.orderId}
                                </span>
                                <span className={`px-2 py-0.5 text-[10px] rounded-full font-medium border ${
                                    email.status === 'Novo' 
                                        ? 'bg-blue-100 text-blue-700 border-blue-200' 
                                        : 'bg-green-50 text-green-700 border-green-200'
                                }`}>
                                    {email.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedEmail ? (
                <div className="flex-1 flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">{selectedEmail.subject}</h2>
                            <p className="text-sm text-slate-500 mt-1">
                                {selectedEmail.isOutgoing ? 'Para: ' : 'De: '}
                                <span className="font-medium text-slate-900">{selectedEmail.client}</span> 
                                {selectedEmail.orderId !== 'Geral' && ` • Pedido: ${selectedEmail.orderId}`}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button 
                                onClick={() => setShowTranslation(!showTranslation)}
                                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                                    showTranslation ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'
                                }`}
                            >
                                <Languages size={16} />
                                {showTranslation ? 'Ver Original' : 'Traduzir PT-BR'}
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                onClick={() => handleDeleteEmail(selectedEmail.id)}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto bg-slate-50/50 flex flex-col gap-6">
                        {thread.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`flex gap-4 max-w-[80%] ${msg.isMe ? 'self-end flex-row-reverse' : 'self-start'}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                    msg.isMe ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                                }`}>
                                    {msg.isMe ? <User size={14} /> : selectedEmail.client.charAt(0)}
                                </div>

                                <div className={`p-5 rounded-2xl shadow-sm border ${
                                    msg.isMe 
                                        ? 'bg-blue-600 text-white border-blue-600 rounded-tr-none' 
                                        : 'bg-white text-slate-800 border-slate-200 rounded-tl-none'
                                }`}>
                                    <p className="leading-relaxed whitespace-pre-line text-sm">
                                        {msg.content}
                                    </p>
                                    <div className={`mt-2 text-[10px] flex items-center gap-2 opacity-70 ${
                                        msg.isMe ? 'text-blue-100 justify-end' : 'text-slate-400'
                                    }`}>
                                        {msg.timestamp}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-white border-t border-slate-200">
                        <div className="relative">
                            <textarea 
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Escreva sua resposta em Português..."
                                className="w-full p-4 pb-12 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none h-32 text-sm"
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <div className="absolute bottom-3 right-3 flex items-center gap-3">
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Languages size={12} />
                                    Será enviado em Inglês
                                </span>
                                <button 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                                    onClick={handleSendMessage}
                                    disabled={!replyText.trim()}
                                >
                                    Enviar Resposta
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400">
                    Selecione um e-mail para ler
                </div>
            )}

            {isComposeOpen && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                Novo E-mail
                            </h3>
                            <button onClick={() => setIsComposeOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Para (Cliente)</label>
                                <input 
                                    value={newEmailTo}
                                    onChange={(e) => setNewEmailTo(e.target.value)}
                                    type="text" 
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    placeholder="Ex: Maria Silva"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Assunto</label>
                                <input 
                                    value={newEmailSubject}
                                    onChange={(e) => setNewEmailSubject(e.target.value)}
                                    type="text" 
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    placeholder="Ex: Atualização do Pedido #123"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Mensagem</label>
                                <textarea 
                                    value={newEmailContent}
                                    onChange={(e) => setNewEmailContent(e.target.value)}
                                    rows={6}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
                                    placeholder="Escreva sua mensagem aqui..."
                                />
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button 
                                onClick={() => setIsComposeOpen(false)} 
                                className="px-4 py-2 text-slate-600 font-medium hover:text-slate-800 text-sm transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleCreateNewEmail}
                                disabled={!newEmailTo || !newEmailSubject || !newEmailContent}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm text-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={16} />
                                Enviar E-mail
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}