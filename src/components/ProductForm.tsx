// //components/productForm.tsx

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Input, Button, Textarea } from '@nextui-org/react';
// import { createProduct, updateProduct, getProductById, Product } from '../services/productService';

// const ProductForm: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState<Partial<Product>>({
//     sku: '',
//     nombre: '',
//     descripcion: '',
//     talla: '',
//     color: '',
//     precio_compra: 0,
//     precio_venta: 0,
//     stock_disponible: 0,
//     proveedor: '',
//     url_imagen: '',
//     estado: 'activo',
//   });

//   useEffect(() => {
//     if (id) {
//       const fetchProduct = async () => {
//         try {
//           const data = await getProductById(Number(id));
//           setProduct(data);
//         } catch (error) {
//           console.error('Error fetching product:', error);
//         }
//       };
//       fetchProduct();
//     }
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await updateProduct(Number(id), product);
//       } else {
//         await createProduct(product as Omit<Product, 'id'>);
//       }
//       navigate('/products');
//     } catch (error) {
//       console.error('Error saving product:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>{id ? 'Editar Producto' : 'Nuevo Producto'}</h1>
//       <Input
//         label="SKU"
//         name="sku"
//         value={product.sku}
//         onChange={handleChange}
//         required
//       />
//       <Input
//         label="Nombre"
//         name="nombre"
//         value={product.nombre}
//         onChange={handleChange}
//         required
//       />
//       <Textarea
//         label="Descripción"
//         name="descripcion"
//         value={product.descripcion}
//         onChange={handleChange}
//       />
//       <Input
//         label="Talla"
//         name="talla"
//         value={product.talla}
//         onChange={handleChange}
//       />
//       <Input
//         label="Color"
//         name="color"
//         value={product.color}
//         onChange={handleChange}
//       />
//       <Input
//         label="Precio de Compra"
//         name="precio_compra"
//         type="number"
//         value={product.precio_compra?.toString() || ''}
//         onChange={handleChange}
//         required
//       />
//       <Input
//         label="Precio de Venta"
//         name="precio_venta"
//         type="number"
//         value={product.precio_venta?.toString() || ''}
//         onChange={handleChange}
//         required
//       />
//       <Input
//         label="Stock Disponible"
//         name="stock_disponible"
//         type="number"
//         value={product.stock_disponible?.toString() || ''}
//         onChange={handleChange}
//         required
//       />
//       <Input
//         label="Proveedor"
//         name="proveedor"
//         value={product.proveedor}
//         onChange={handleChange}
//       />
//       <Input
//         label="URL de la Imagen"
//         name="url_imagen"
//         value={product.url_imagen}
//         onChange={handleChange}
//       />
//       <select
//         name="estado"
//         value={product.estado}
//         onChange={handleSelectChange}
//       >
//         <option value="activo">Activo</option>
//         <option value="inactivo">Inactivo</option>
//       </select>
//       <Button type="submit">
//         {id ? 'Actualizar Producto' : 'Crear Producto'}
//       </Button>
//     </form>
//   );
// };

// export default ProductForm;

import React, { useState, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'react-toastify'; // Importa toast de react-toastify
import { createProduct, getProducts, Product } from '../services/productService';

const ProductForm = () => {
  const [productDetails, setProductDetails] = useState<Product>({
    id: 0,
    sku: '',
    nombre: '',
    descripcion: '',
    talla: '',
    color: '',
    precio_compra: 0,
    precio_venta: 0,
    stock_disponible: 0,
    proveedor: '',
    url_imagen: '',
    estado: 'activo',
  });

  const [products, setProducts] = useState<Product[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createProduct(productDetails);
      toast.success("Producto creado con éxito!", {
        position: "top-right",
        autoClose: 3000,
      });
      setProductDetails({
        id: 0,
        sku: '',
        nombre: '',
        descripcion: '',
        talla: '',
        color: '',
        precio_compra: 0,
        precio_venta: 0,
        stock_disponible: 0,
        proveedor: '',
        url_imagen: '',
        estado: 'activo',
      });
      fetchProducts(); // Actualiza la lista de productos
    } catch (error) {
      toast.error("Error al crear el producto.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const fetchProducts = async () => {
    try {
      const productList = await getProducts();
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Crear Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="sku" label="SKU" placeholder="Ingrese SKU" fullWidth onChange={handleChange} />
        <Input name="nombre" label="Nombre" placeholder="Ingrese nombre" fullWidth onChange={handleChange} />
        <Input name="descripcion" label="Descripción" placeholder="Ingrese descripción" fullWidth onChange={handleChange} />
        <Input name="talla" label="Talla" placeholder="Ingrese talla" fullWidth onChange={handleChange} />
        <Input name="color" label="Color" placeholder="Ingrese color" fullWidth onChange={handleChange} />
        <Input name="precio_compra" type="number" label="Precio de Compra" placeholder="Ingrese precio de compra" fullWidth onChange={handleChange} />
        <Input name="precio_venta" type="number" label="Precio de Venta" placeholder="Ingrese precio de venta" fullWidth onChange={handleChange} />
        <Input name="stock_disponible" type="number" label="Stock Disponible" placeholder="Ingrese stock disponible" fullWidth onChange={handleChange} />
        <Input name="proveedor" label="Proveedor" placeholder="Ingrese proveedor" fullWidth onChange={handleChange} />
        <Input name="url_imagen" label="URL de Imagen" placeholder="Ingrese URL de imagen" fullWidth onChange={handleChange} />
        <Button type="submit" color="primary">Crear Producto</Button>
      </form>

      <h2 className="mt-8 text-lg font-semibold">Lista de Productos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">SKU</th>
              <th className="border border-gray-300 p-2">Nombre</th>
              <th className="border border-gray-300 p-2">Descripción</th>
              <th className="border border-gray-300 p-2">Precio de Venta</th>
              <th className="border border-gray-300 p-2">Stock Disponible</th>
              <th className="border border-gray-300 p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product.id}>
                  <td className="border border-gray-300 p-2">{product.sku}</td>
                  <td className="border border-gray-300 p-2">{product.nombre}</td>
                  <td className="border border-gray-300 p-2">{product.descripcion}</td>
                  <td className="border border-gray-300 p-2">{product.precio_venta}</td>
                  <td className="border border-gray-300 p-2">{product.stock_disponible}</td>
                  <td className="border border-gray-300 p-2">{product.estado}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="border border-gray-300 p-2 text-center">No hay productos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductForm;