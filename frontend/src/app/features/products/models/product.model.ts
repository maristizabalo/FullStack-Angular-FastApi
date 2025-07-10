export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface ProductCreate {
  name: string;
  price: number;
  category: string;
}
