import { ReactNode } from 'react';

export interface Product {
    id: number,
    name: string,
    description: string,
    price: number
}

export interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (updatedProduct: Product) => void;
    deleteProduct: (id: number) => void;
    fetchProducts: () => void;
}

export interface IProductService {
    fetchProducts(): Promise<Product[]>;
    addProduct(product: Omit<Product, 'id'>): Promise<{ success: boolean; errors?: string[] }>;
    updateProduct(id: number, product: Omit<Product, 'id'>): Promise<boolean>;
    deleteProduct(id: number): Promise<boolean>;
}

export interface ProductProviderProps {
    children: ReactNode;
    productService: IProductService;
}
