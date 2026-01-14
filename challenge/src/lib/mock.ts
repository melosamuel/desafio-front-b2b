export interface Order {
    id: string;
    client: string;
    value: string;
    status: 'Pendente' | 'Pago' | 'Reembolsado' | 'Enviado';
    date: string;
}

export interface Email {
    id: string;
    client: string;
    orderId: string;
    subject: string;
    status: 'Novo' | 'Respondido';
    content: string;
    contentTranslated?: string;
    timestamp: string;
}

export const MOCK_ORDERS: Order[] = [
    {
        id: '#ORD-7829',
        client: 'Alice Guadalupe',
        value: 'R$ 350,00',
        status: 'Pago',
        date: '12 Jan'
    },
    {
        id: '#ORD-7830',
        client: 'João Melo',
        value: 'R$ 120,50',
        status: 'Pendente',
        date: '12 Jan'
    },
    {
        id: '#ORD-7831',
        client: 'Marcos Silva',
        value: 'R$ 890,00',
        status: 'Reembolsado',
        date: '11 Jan'
    },
];

export const MOCK_EMAILS: Email[] = [
    {
        id: '1',
        client: 'Alice Guadalupe',
        orderId: '#ORD-7829',
        subject: 'Problema com a entrega',
        status: 'Novo',
        content: "Hi, I haven't received my tracking number yet. Can you help?",
        contentTranslated: "Oi, ainda não recebi meu código de rastreio. Pode ajudar?",
        timestamp: '10:30'
    },
    {
        id: '2',
        client: 'João Melo',
        orderId: '#ORD-7830',
        subject: 'Solicitação de troca',
        status: 'Respondido',
        content: "I need to change the size of the shirt.",
        contentTranslated: "Preciso trocar o tamanho da camisa.",
        timestamp: 'Ontem'
    }
];
