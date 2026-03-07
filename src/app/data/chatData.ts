// Mock data for chat functionality

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface Notification {
  id: string;
  type: 'order' | 'message' | 'review' | 'new_product';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedId?: string;
}

export const conversations: Conversation[] = [
  {
    id: 'c1',
    farmerId: '1',
    farmerName: 'Akmal Rahimov',
    farmerAvatar: 'https://images.unsplash.com/photo-1609755790602-2c5233f7692d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1emJlayUyMGZhcm1lciUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzcwMzA0OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'Rahmat! Keyingi hafta yangi kartoshka keladi.',
    lastMessageTime: '2026-02-05T10:30:00',
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        senderId: 'buyer',
        senderName: 'Siz',
        message: 'Assalomu alaykum! Kartoshka hali bormi?',
        timestamp: '2026-02-05T09:15:00',
        isRead: true
      },
      {
        id: 'm2',
        senderId: '1',
        senderName: 'Akmal Rahimov',
        message: 'Wa alaykum assalom! Ha, bor. 65 qop mavjud.',
        timestamp: '2026-02-05T09:20:00',
        isRead: true
      },
      {
        id: 'm3',
        senderId: 'buyer',
        senderName: 'Siz',
        message: '20 qop buyurtma qilsam bo\'ladimi?',
        timestamp: '2026-02-05T09:25:00',
        isRead: true
      },
      {
        id: 'm4',
        senderId: '1',
        senderName: 'Akmal Rahimov',
        message: 'Albatta! 180,000 so\'m qop narxi. Jami 3,600,000 so\'m.',
        timestamp: '2026-02-05T10:00:00',
        isRead: false
      },
      {
        id: 'm5',
        senderId: '1',
        senderName: 'Akmal Rahimov',
        message: 'Rahmat! Keyingi hafta yangi kartoshka keladi.',
        timestamp: '2026-02-05T10:30:00',
        isRead: false
      }
    ]
  },
  {
    id: 'c2',
    farmerId: '2',
    farmerName: 'Dilshod Karimov',
    farmerAvatar: 'https://images.unsplash.com/photo-1635714293982-65445548ac42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3NzAyNzg3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'Buyurtmangizni ertaga ertalab yetkazaman.',
    lastMessageTime: '2026-02-04T16:45:00',
    unreadCount: 0,
    messages: [
      {
        id: 'm6',
        senderId: 'buyer',
        senderName: 'Siz',
        message: 'Salom! Sut mahsulotlari haqida ma\'lumot olsam bo\'ladimi?',
        timestamp: '2026-02-04T14:00:00',
        isRead: true
      },
      {
        id: 'm7',
        senderId: '2',
        senderName: 'Dilshod Karimov',
        message: 'Salom! Albatta. Har kuni yangi sut, qatiq va tvorog bor.',
        timestamp: '2026-02-04T14:15:00',
        isRead: true
      },
      {
        id: 'm8',
        senderId: 'buyer',
        senderName: 'Siz',
        message: '80 litr sut kerak bo\'ladi. Bugun yetkazib berasizmi?',
        timestamp: '2026-02-04T15:30:00',
        isRead: true
      },
      {
        id: 'm9',
        senderId: '2',
        senderName: 'Dilshod Karimov',
        message: 'Buyurtmangizni ertaga ertalab yetkazaman.',
        timestamp: '2026-02-04T16:45:00',
        isRead: true
      }
    ]
  },
  {
    id: 'c3',
    farmerId: '3',
    farmerName: 'Jasur Tursunov',
    farmerAvatar: 'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRvbWF0b2VzJTIwbWFya2V0fGVufDF8fHx8MTc3MDMwNDkxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'Xo\'p, mamnun bo\'ldim. Buyurtma qilib turing!',
    lastMessageTime: '2026-02-03T11:20:00',
    unreadCount: 0,
    messages: [
      {
        id: 'm10',
        senderId: 'buyer',
        senderName: 'Siz',
        message: 'Pomidor sifati qandayligini ko\'rsam bo\'ladimi?',
        timestamp: '2026-02-03T11:00:00',
        isRead: true
      },
      {
        id: 'm11',
        senderId: '3',
        senderName: 'Jasur Tursunov',
        message: 'Xo\'p, mamnun bo\'ldim. Buyurtma qilib turing!',
        timestamp: '2026-02-03T11:20:00',
        isRead: true
      }
    ]
  }
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'message',
    title: 'Yangi xabar',
    message: 'Akmal Rahimov sizga xabar yubordi',
    timestamp: '2026-02-05T10:30:00',
    isRead: false,
    relatedId: 'c1'
  },
  {
    id: 'n2',
    type: 'order',
    title: 'Buyurtma yakunlandi',
    message: 'Kartoshka buyurtmangiz muvaffaqiyatli yetkazildi',
    timestamp: '2026-02-04T18:00:00',
    isRead: false,
    relatedId: 'o1'
  },
  {
    id: 'n3',
    type: 'new_product',
    title: 'Yangi mahsulot',
    message: 'Dilshod Karimov yangi mahsulot qo\'shdi - Tvorog',
    timestamp: '2026-02-04T14:00:00',
    isRead: true,
    relatedId: '2'
  },
  {
    id: 'n4',
    type: 'review',
    title: 'Mahsulotni baholang',
    message: 'Pomidor xaridingizni baholashni unutmang',
    timestamp: '2026-02-03T12:00:00',
    isRead: true,
    relatedId: 'o3'
  },
  {
    id: 'n5',
    type: 'order',
    title: 'Buyurtma qabul qilindi',
    message: 'Sabzi buyurtmangiz qabul qilindi',
    timestamp: '2026-02-02T09:30:00',
    isRead: true,
    relatedId: 'o4'
  }
];