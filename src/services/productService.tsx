import { Product } from '../types/Product';
import { IProductService } from '../types/Product';

class ProductService implements IProductService {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchProducts() {
    const response = await fetch(`${this.baseUrl}/api/products`);
    return await response.json();
  }

  async addProduct(product: Omit<Product, 'id'>) {
    const response = await fetch(`${this.baseUrl}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (response.ok) return { success: true };

    const data = await response.json();
    const errors = data.errors?.map((error: { msg: string }) => error.msg) || [];
    return { success: false, errors };
  }

  async updateProduct(id: number, product: Omit<Product, 'id'>) {
    const response = await fetch(`${this.baseUrl}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return response.ok;
  }

  async deleteProduct(id: number) {
    const response = await fetch(`${this.baseUrl}/api/products/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  }
}

const produproductServiceInstance: IProductService = new ProductService('http://localhost:3000');
export default produproductServiceInstance
