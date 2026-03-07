// Mock data for Ferdo application

export interface Farmer {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalSales: number;
  memberSince: string;
  specialization: string[];
  location: string;
  bio: string;
  totalReviews: number;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerRating: number;
  name: string;
  category: 'oliy' | 'oddiy';
  type: string; // Sabzavot, Sut maxsuloti, etc.
  image: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  description: string;
  postedDate: string;
  sold: number;
}

export interface Review {
  id: string;
  productId: string;
  buyerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  farmerName: string;
  farmerId: string;
  quantity: number;
  totalPrice: number;
  status: 'completed' | 'pending' | 'cancelled';
  orderDate: string;
  hasReview: boolean;
}

export const farmers: Farmer[] = [
  {
    id: '1',
    name: 'Akmal Rahimov',
    avatar: 'https://images.unsplash.com/photo-1609755790602-2c5233f7692d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1emJlayUyMGZhcm1lciUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzcwMzA0OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    totalSales: 2340,
    memberSince: '2023-05-15',
    specialization: ['Kartoshka', 'Sabzi', 'Piyoz'],
    location: 'Toshkent viloyati',
    bio: 'Organik usulda sabzavot yetishtiruvchi fermer. 15 yillik tajriba.',
    totalReviews: 342
  },
  {
    id: '2',
    name: 'Dilshod Karimov',
    avatar: 'https://images.unsplash.com/photo-1635714293982-65445548ac42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3NzAyNzg3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    totalSales: 1850,
    memberSince: '2023-08-20',
    specialization: ['Sut', 'Qatiq', 'Tvorog'],
    location: 'Samarqand viloyati',
    bio: 'Sifatli sut mahsulotlari ishlab chiqaruvchi. Ekologik toza mahsulotlar.',
    totalReviews: 287
  },
  {
    id: '3',
    name: 'Jasur Tursunov',
    avatar: 'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRvbWF0b2VzJTIwbWFya2V0fGVufDF8fHx8MTc3MDMwNDkxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    totalSales: 3100,
    memberSince: '2022-11-10',
    specialization: ['Pomidor', 'Bodring', 'Qalampir'],
    location: 'Farg\'ona viloyati',
    bio: 'Issiqxonada yetishtiriladigan sabzavotlar mutaxassisi.',
    totalReviews: 456
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    farmerId: '1',
    farmerName: 'Akmal Rahimov',
    farmerRating: 4.8,
    name: 'Kartoshka',
    category: 'oliy',
    type: 'Sabzavot',
    image: 'https://images.unsplash.com/photo-1744659751904-3b2e5c095323?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG9lcyUyMGhhcnZlc3QlMjBmYXJtfGVufDF8fHx8MTc3MDMwNDkwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    quantity: 100,
    unit: 'qop',
    pricePerUnit: 180000,
    totalPrice: 18000000,
    description: 'Yuqori sifatli, toza kartoshka. Har bir qop 50 kg.',
    postedDate: '2026-02-03',
    sold: 35
  },
  {
    id: 'p2',
    farmerId: '2',
    farmerName: 'Dilshod Karimov',
    farmerRating: 4.9,
    name: 'Sut',
    category: 'oliy',
    type: 'Sut mahsuloti',
    image: 'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeSUyMGZhcm18ZW58MXx8fHwxNzcwMzA3MDcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    quantity: 200,
    unit: 'litr',
    pricePerUnit: 12000,
    totalPrice: 2400000,
    description: 'Toza, organik sut. Har kuni yangi.',
    postedDate: '2026-02-04',
    sold: 120
  },
  {
    id: 'p3',
    farmerId: '3',
    farmerName: 'Jasur Tursunov',
    farmerRating: 4.7,
    name: 'Pomidor',
    category: 'oliy',
    type: 'Sabzavot',
    image: 'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRvbWF0b2VzJTIwbWFya2V0fGVufDF8fHx8MTc3MDMwNDkxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    quantity: 80,
    unit: 'yashik',
    pricePerUnit: 120000,
    totalPrice: 9600000,
    description: 'Issiqxonada yetishtrilgan toza pomidor. 20 kg yashikda.',
    postedDate: '2026-02-02',
    sold: 25
  },
  {
    id: 'p4',
    farmerId: '1',
    farmerName: 'Akmal Rahimov',
    farmerRating: 4.8,
    name: 'Sabzi',
    category: 'oddiy',
    type: 'Sabzavot',
    image: 'https://images.unsplash.com/photo-1603462903957-566630607cc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNhcnJvdHMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc3MDIxNjk0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    quantity: 60,
    unit: 'qop',
    pricePerUnit: 25000,
    totalPrice: 1500000,
    description: 'Yangi yig\'ib olingan sabzi. 10 kg qoplarda.',
    postedDate: '2026-02-01',
    sold: 40
  },
  {
    id: 'p5',
    farmerId: '2',
    farmerName: 'Dilshod Karimov',
    farmerRating: 4.9,
    name: 'Qatiq',
    category: 'oddiy',
    type: 'Sut mahsuloti',
    image: 'https://images.unsplash.com/photo-1535031465644-d29879b6608a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2d1cnQlMjBkYWlyeSUyMHByb2R1Y3R8ZW58MXx8fHwxNzcwMjc2Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    quantity: 150,
    unit: 'kg',
    pricePerUnit: 18000,
    totalPrice: 2700000,
    description: 'An\'anaviy usulda tayyorlangan qatiq.',
    postedDate: '2026-02-04',
    sold: 80
  }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    buyerName: 'Aziz Do\'kon',
    rating: 5,
    comment: 'Juda sifatli mahsulot! Mijozlar juda mamnun bo\'lishdi.',
    date: '2026-01-28'
  },
  {
    id: 'r2',
    productId: 'p1',
    buyerName: 'Farrux Savdo',
    rating: 4,
    comment: 'Yaxshi kartoshka, narxi ham mos.',
    date: '2026-01-25'
  },
  {
    id: 'r3',
    productId: 'p2',
    buyerName: 'Umida Market',
    rating: 5,
    comment: 'Sut juda toza va mazali. Doimiy mijoz bo\'lamiz!',
    date: '2026-02-02'
  },
  {
    id: 'r4',
    productId: 'p3',
    buyerName: 'Sardor Do\'koni',
    rating: 4,
    comment: 'Pomidorlar yangi va sifatli.',
    date: '2026-01-30'
  }
];

export const orders: Order[] = [
  {
    id: 'o1',
    productId: 'p1',
    productName: 'Kartoshka',
    farmerName: 'Akmal Rahimov',
    farmerId: '1',
    quantity: 10,
    totalPrice: 1800000,
    status: 'completed',
    orderDate: '2026-01-28',
    hasReview: true
  },
  {
    id: 'o2',
    productId: 'p2',
    productName: 'Sut',
    farmerName: 'Dilshod Karimov',
    farmerId: '2',
    quantity: 50,
    totalPrice: 600000,
    status: 'completed',
    orderDate: '2026-02-01',
    hasReview: true
  },
  {
    id: 'o3',
    productId: 'p3',
    productName: 'Pomidor',
    farmerName: 'Jasur Tursunov',
    farmerId: '3',
    quantity: 5,
    totalPrice: 600000,
    status: 'pending',
    orderDate: '2026-02-04',
    hasReview: false
  },
  {
    id: 'o4',
    productId: 'p4',
    productName: 'Sabzi',
    farmerName: 'Akmal Rahimov',
    farmerId: '1',
    quantity: 15,
    totalPrice: 375000,
    status: 'completed',
    orderDate: '2026-01-20',
    hasReview: false
  }
];