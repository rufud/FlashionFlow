import { supabase } from '../utils/supabaseClient';
import { toast } from 'react-toastify';

export interface Product {
  id: number;
  sku: string;
  nombre: string;
  descripcion: string;
  talla: string;
  color: string;
  precio_compra: number;
  precio_venta: number;
  stock_disponible: number;
  proveedor: string;
  url_imagen: string;
  estado: 'activo' | 'inactivo';
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase.rpc('get_products');
    if (error) throw error;
    return data as Product[];
  } catch (error) {
    toast.error('Error al obtener los productos');
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const { data, error } = await supabase.rpc('get_product_by_id', { product_id: id });
    if (error) throw error;
    return data[0] as Product;
  } catch (error) {
    toast.error('Error al obtener el producto');
    throw error;
  }
};

export const createProduct = async (product: Omit<Product, 'id'>) => {
  const { data, error } = await supabase
    .from('productos')
    .insert([product]);
  
  if (error) {
    console.error('Error al crear el producto en Supabase:', error);
    throw error;
  }
  return data;
};

export const updateProduct = async (product: Product): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('update_product', {
      p_id: product.id,
      p_sku: product.sku,
      p_nombre: product.nombre,
      p_descripcion: product.descripcion,
      p_talla: product.talla,
      p_color: product.color,
      p_precio_compra: product.precio_compra,
      p_precio_venta: product.precio_venta,
      p_stock_disponible: product.stock_disponible,
      p_proveedor: product.proveedor,
      p_url_imagen: product.url_imagen,
      p_estado: product.estado,
    });
    if (error) throw error;
    toast.success('Producto actualizado exitosamente');
    return true; // Devuelve true para indicar éxito
  } catch (error) {
    console.error("Error actualizando producto en Supabase:", error);
    toast.error('Error al actualizar el producto');
    return false; // Devuelve false para indicar fallo
  }
};


export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('delete_product', { p_id: id });
    if (error) throw error;
    toast.success('Producto eliminado exitosamente');
    return data as boolean;
  } catch (error) {
    toast.error('Error al eliminar el producto');
    throw error;
  }
};

export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase.rpc('search_products', { search_term: searchTerm });
    if (error) throw error;
    return data as Product[];
  } catch (error) {
    toast.error('Error al buscar productos');
    throw error;
  }
};

export const getLowStockProducts = async (threshold: number): Promise<Product[]> => {
  try {
    const { data, error } = await supabase.rpc('get_low_stock_products', { threshold });
    if (error) throw error;
    return data as Product[];
  } catch (error) {
    toast.error('Error al obtener productos con bajo stock');
    throw error;
  }
};