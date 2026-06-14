export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  availabilityStatus?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  images: string[];
  thumbnail: string;
  reviews?: Review[];
}
