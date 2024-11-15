
import React, { useEffect, useState } from 'react';
import {
  getProducts,
  deleteProduct,
  searchProducts,
  Product,
  updateProduct,
  createProduct
} from '../services/productService';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
  Textarea,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu
} from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
  const { isOpen: isEditModalOpen, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const { isOpen: isNewProductModalOpen, onOpen: onOpenNewProductModal, onClose: onCloseNewProductModal } = useDisclosure();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ estado: 'activo' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error("Error al obtener productos.");
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      fetchProducts();
      return;
    }
    try {
      const data = await searchProducts(searchTerm);
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error("Error al buscar productos.");
    }
  };

  const handleDelete = async (id: number) => {
    setProductToDelete(id);
    onOpenDeleteModal();
  };

  
  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        setProducts(products.filter(product => product.id !== productToDelete));
        toast.success("Producto eliminado con éxito.");
        onCloseDeleteModal();
        setProductToDelete(null);
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error("Error al eliminar el producto.");
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    onOpenEditModal();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [field]: e.target.value });
    }
  };

  // const handleSaveEdit = async () => {
  //   if (editingProduct) {
  //     try {
  //       const updatedProduct: Product = {
  //         id: editingProduct.id,
  //         sku: editingProduct.sku,
  //         nombre: editingProduct.nombre,
  //         descripcion: editingProduct.descripcion,
  //         talla: editingProduct.talla,
  //         color: editingProduct.color,
  //         precio_compra: editingProduct.precio_compra,
  //         precio_venta: editingProduct.precio_venta,
  //         stock_disponible: editingProduct.stock_disponible,
  //         proveedor: editingProduct.proveedor,
  //         url_imagen: editingProduct.url_imagen,
  //         estado: editingProduct.estado,
  //       };

  //       const success = await updateProduct(updatedProduct);

  //       if (success) {
  //         toast.success('Producto actualizado exitosamente');
  //         fetchProducts();
  //       }

  //       onCloseEditModal();

  //     } catch (error) {
  //       console.error('Error updating product:', error);
  //       toast.error('Error al actualizar el producto');
  //     }
  //   }
  // };
  const handleSaveEdit = async () => {
    if (editingProduct) {
      try {
        const success = await updateProduct(editingProduct);
  
        if (success) {
          // toast.success('Producto actualizado exitosamente');
          // Recarga la lista de productos después de la actualización
          fetchProducts();
          // Cierra el modal de edición
          onCloseEditModal();  
        }
      } catch (error) {
        // toast.success('Producto actualizado exitosamente');
          console.error('Error en handleSaveEdit:', error)
      } finally {
          //  Opcional:  Reinicia el estado de editingProduct, incluso si hay un error.
          setEditingProduct(null);
      }
    }
  };
  const handleNewProduct = () => {
    setNewProduct({ estado: 'activo' }); // o un valor por defecto apropiado
    onOpenNewProductModal();
  };

  const handleInputChangeNewProduct = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
    setNewProduct({ ...newProduct, [field]: e.target.value });
  };

  const handleSaveNewProduct = async () => {
    try {
      if (!newProduct.sku || !newProduct.nombre || !newProduct.precio_venta || !newProduct.stock_disponible) {
        toast.error("Por favor, completa todos los campos obligatorios.");
        return;
      }

      // Asegúrate de que los tipos sean correctos antes de enviar a Supabase.
      const productToCreate: Omit<Product, 'id'> = {
        sku: newProduct.sku as string,
        nombre: newProduct.nombre as string,
        descripcion: newProduct.descripcion || '',
        talla: newProduct.talla || '',
        color: newProduct.color || '',
        precio_compra: newProduct.precio_compra || 0,
        precio_venta: newProduct.precio_venta as number,
        stock_disponible: newProduct.stock_disponible as number,
        proveedor: newProduct.proveedor || '',
        url_imagen: newProduct.url_imagen || '',
        estado: newProduct.estado as 'activo' | 'inactivo', // Asegúrate de que el estado sea correcto
      };


      await createProduct(productToCreate);
      
      fetchProducts();
      onCloseNewProductModal();
      toast.success("Producto creado con éxito.");


    } catch (error) {
        console.error("Error creando producto:", error);
        toast.error("Error al crear el producto.");
    } finally {
      
      // setNewProduct({ estado: 'activo' });
    }
  };




  const columns = [
    { name: "ID", uid: "id" },
    { name: "SKU", uid: "sku" },
    { name: "Nombre", uid: "nombre" },
    { name: "Precio Venta", uid: "precio_venta" },
    { name: "Stock", uid: "stock_disponible" },
    { name: "Acciones", uid: "actions" },
  ];

  return (
    <div className="bg-[#1A1A1A] min-h-screen flex flex-col items-center justify-center w-full">
      <ToastContainer />
      <div className="flex items-center mb-12 px-4">
        <Image
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cg fill='none'%3E%3Cpath fill='%23880e4f' d='M15.783 27.048c7.125 0 12.902-5.777 12.902-12.903S22.908 1.242 15.783 1.242C8.657 1.242 2.88 7.02 2.88 14.145s5.777 12.903 12.903 12.903'/%3E%3Cpath fill='%23ec407a' d='M13.335 9.228c-.03 0-.062-.008-.093-.01c-.527-.03-.667-.63-.58-.96c.54-2.068.273-3.905-.612-6.253c-.183-.48.545-.605.862-.477c.305.122.588.562.71.895c.733 1.982.938 4.065.333 6.292c-.08.3-.32.52-.62.513'/%3E%3Cpath fill='%23ec407a' d='M14.95 11.145a.617.617 0 0 1-.577-.797c.694-2.3 1.202-6.06-.408-8.886c-.17-.297.262-.492.603-.46c.78.07 1.235 1.238 1.385 1.758c.704 2.427.474 5.672-.398 7.945c-.1.268-.335.447-.605.44'/%3E%3Cpath fill='%23ec407a' d='M16.615 12.958c-.425-.123-.505-.683-.407-1.01c1.935-6.485-.013-10.47-.028-10.513c-.12-.32.93-.757 1.448.54c.075.188 1.802 4.525-.145 10.5c-.093.275-.423.613-.868.482m-11.01 9.667c-.18-.212-.405-.55-.12-.74c.472-.318 2.095-.833 3.392-2.593c.203-.275.545-.402.843-.232c.297.168.43.565.232.843c-1.575 2.22-3.492 2.82-3.57 2.864c-.095.056-.597.07-.777-.142m1.042.922c-.13-.325.7-.467.7-.467c.368-.14 1.875-.422 3.078-2.315c.182-.288.547-.4.842-.23c.298.17.4.547.23.843c-.807 1.415-2.385 2.474-3.465 2.732c-.577.137-1.257-.245-1.385-.562m2.02 1.853c-.382-.202-.495-.572-.252-.652c1.432-.463 2.998-1.658 3.758-2.783a.618.618 0 0 1 1.023.692c-.893 1.346-1.803 2.026-3.289 2.67c-.282.123-.882.263-1.24.073m1.83.553c.938-.43 2.5-1.32 3.406-2.838a.619.619 0 0 1 1.062.633c-.73 1.224-1.745 2.192-3.293 2.737c-.752.268-1.485-.387-1.174-.532M4.74 20.84c-2.083-2.455-2.45-5.66-1.915-8.835c.122-.73.39-1.185.655-1.183c.342.006.672 1.18.572 1.818c-.45 2.867.38 5.68 2.175 7.868c.108.132-.045.58-.427.747c-.383.165-.81-.12-1.06-.415'/%3E%3Cpath fill='%23ec407a' d='M6.327 19.458c-.942-.885-1.722-3.655-1.725-4.973c0-.342.003-.835.345-.835c0 0 .765.117.893.832c.182 1.03.752 3.396 1.702 4.593c.213.268-.572.985-1.215.383'/%3E%3Cpath fill='%23d81b60' d='M16.608 27.525c-1.088.055-2.758-.172-3.306-.922c-.202-.276.16-.536.49-.448c1.99.537 3.368.85 5.91-.385c.515-.25 1.085.012.83.372c-.357.508-1.97 1.296-3.924 1.383'/%3E%3Cpath fill='%23d81b60' d='M14.568 25.283c-.193-.283.38-.756.72-.7c.537.085.91.18 1.285.195c.384.015.857-.125 1.002-.125c.343 0 1.163.337.953.607c-.65.835-3.353.91-3.96.022'/%3E%3Cpath fill='%23ec407a' d='M21.62 11.143a.617.617 0 0 1-.203-1.218c1.473-.32 3.393-1.418 4.513-3.18c.268-.423 1.1.37.652 1.04c-1.344 2.022-3.107 2.96-4.902 3.348z'/%3E%3Cpath fill='%23ec407a' d='M21.193 13.38a.62.62 0 0 1-.686-.528a.62.62 0 0 1 .525-.7c2.423-.347 5.07-2.195 5.96-4.045c.148-.307 1.17.6.44 1.613c-1.302 1.803-3.857 3.317-6.222 3.655q-.01.006-.018.005'/%3E%3Cpath fill='%23ec407a' d='M21.415 15.345q-.297.035-.58.047a.62.62 0 0 1-.645-.592a.613.613 0 0 1 .592-.643c2.478-.104 6.08-1.77 7.198-3.842c.162-.3 1.197.55.317 1.665c-.66.838-1.7 1.522-2.89 2.12c-1.29.65-2.74 1.098-3.992 1.245m1.957 1.69a3 3 0 0 1-.482.025a.617.617 0 1 1 .03-1.235c1.142.025 4.227-1.175 5.537-3.232c.185-.288.868.787.13 1.627c-1.594 1.818-3.707 2.638-5.215 2.815m-4.767-2.457a.6.6 0 0 1-.225-.043a.63.63 0 0 1-.352-.8c1.272-3.732 1.717-8.132.117-12.185c-.125-.318 1.095-.36 1.418.588c1.52 4.485 1.062 8.115-.383 12.045a.61.61 0 0 1-.575.395'/%3E%3Cpath fill='%23d81b60' d='M23.27 7.453c-.317-.398-1.532-1.358-2.003-1.523c-.322-.115-.434-1.225-.092-1.225c1.125-.002 2.668 1.11 3.127 2.175c.34.788-.382 1.385-1.032.573m1.57-1C23.733 4.973 22.843 4 20.793 3.28c-.473-.167-.92-.747-.633-.932c.532-.345 1.525.075 1.802.207c1.085.518 2.09 1.073 2.936 2.055c.477.555 1.037 1.713.81 1.965c-.345.383-.745.04-.868-.122m.31 12.285c-.18-.29.823-.708.913-1.768c.03-.34 1.065-.74 1.087-.4c.085 1.325-.383 1.808-.902 2.185c-.568.408-.983.172-1.098-.017m2.06.904c-.463-.104-.277-.602-.062-.867c.82-1.005.895-1.542.81-2.637c-.043-.54.4-1.023.61-.756c.272.35.477 1.373.282 2.213c-.46 1.998-1.495 2.08-1.64 2.047M22.523 8.035a.9.9 0 0 1 .177.32c.033.12.018.258-.062.35a.6.6 0 0 1-.206.135a1.7 1.7 0 0 1-.44.163a.6.6 0 0 1-.45-.08c-.16-.115-.225-.32-.267-.51a6 6 0 0 1-.14-.943a.43.43 0 0 1 .027-.225c.213-.4 1.216.608 1.36.79'/%3E%3Cpath fill='%23ec407a' d='M23.27 24.53c-1.47-.258-2.945-.832-4.387-1.488c-.333-.16-.653-.327-.973-.497c-.53.3-1.1.542-1.695.722a18.7 18.7 0 0 0 3.848 1.646c1.642.49 2.315.4 2.454.38c.54-.083 1.088-.695.753-.763'/%3E%3Cpath fill='%23f06292' d='M4.813 9.073c-.163-.3-.405-1.045-.405-1.045c-.43-.053-.783.502-.625 1.445c.092.542 2.54 6.71 9.775 12.072a25 25 0 0 0 2.654 1.725s.576.38 1.36-.025c.666-.343.335-.7.335-.7C12.07 19.47 8.073 15.06 4.813 9.073'/%3E%3Cpath fill='%23ec407a' d='M24.913 23.173a37 37 0 0 1-5.123-2.053q-.5.525-1.09.953q.521.291 1.035.564c1.078.575 5.387 2.45 5.178.535'/%3E%3Cpath fill='%23f06292' d='M19.788 21.12c-5.85-2.898-10.886-7.438-14.066-15.102c-.837.185-.75 1.167-.63 1.487c2.843 7.563 8.6 11.76 13.606 14.568c0 0 .79.434 1.312-.233c.313-.402-.223-.72-.223-.72'/%3E%3Cpath fill='%23ec407a' d='M26.17 21.56a25.8 25.8 0 0 1-5.183-2.125a7.4 7.4 0 0 1-.714 1.125c1.28.65 2.632 1.2 4.052 1.613c1.795.517 2.183-.555 1.845-.613'/%3E%3Cpath fill='%23f06292' d='M7.26 4.458c-.205-.433-1.07.225-.92.907C7.273 8.76 11.58 16.4 20.273 20.56c0 0 .695.305.96-.275c.264-.582-.243-.85-.243-.85C11.858 14.578 8.39 7.62 7.26 4.458'/%3E%3Cpath fill='%23ec407a' d='M27.408 19.998c-2.09-.77-3.958-1.603-5.653-2.54a3 3 0 0 1-.05.285a7.4 7.4 0 0 1-.345 1.087a30.3 30.3 0 0 0 4.782 1.943c1.37.382 1.585-.653 1.265-.776'/%3E%3Cpath fill='%23f06292' d='M21.755 17.458c-6.18-3.398-9.302-7.28-12.745-13.983c-.42-.675-1.443-.057-1.045.66C11 10.718 14.24 14.803 21.36 18.833c0 0 .545.212.755-.423c.133-.4.008-.753-.36-.953'/%3E%3Cpath fill='%23ff80ab' d='M17.63 31c-.692 0-1.395-.017-2.097-.058c-4.333-.24-9.743-1.73-11.378-4.442c-.513-.848-2.07-3.43 1.108-8.655c1.782-2.93 6.065-9.19 4.892-15.17c0 0-.162-.575.35-.792c.757-.32.88.33.88.33c1.498 6.977-2.977 13.327-4.85 16.405c-2.427 3.992-1.793 5.97-1.105 7.11c.795 1.314 4.163 3.392 10.185 3.724c7.57.418 12.202-1.475 12.678-2.152c.017-.255-.148-.555-2.988-.615c-.788-.017-.715-1.168-.32-1.212c1.155-.136 3.328-.136 4.323.585c.502.364.712.902.515 1.527C29.23 29.457 23.957 31 17.63 31'/%3E%3C/g%3E%3C/svg%3E"  //  <- Pega tu código SVG aquí
          alt="Logo"
          className="w-12 h-12 mr-4"
        />
        <h1 className="text-3xl font-bold text-white">Fashion Flow</h1>
      </div>

      <div className="w-full px-4 space-y-8">
        <h2 className="text-2xl font-bold text-white text-center">Lista de Productos</h2>

        <div className="flex mb-4">
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            
            size="lg"
          />
          <Button onClick={handleSearch} color="primary" size="lg" className="ml-2">
            Buscar
          </Button>
        </div>

        <Button onPress={handleNewProduct} color="secondary" size="lg">
          Nuevo Producto
        </Button>

        <Table aria-label="Lista de Productos"  >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={products} emptyContent={"No hay productos"}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) =>
                  columnKey === "actions" ? (
                    <TableCell>
                      <div className="relative flex items-center gap-2">
                        <Button size="sm" color="primary" className="mr-2" onPress={() => handleEdit(item)}>
                          Editar
                        </Button>
                        <Button size="sm" color="danger" onClick={() => handleDelete(item.id)}>
                          Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell >{item[columnKey as keyof Product]}</TableCell>
                  )
                }
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Modal de Edición */}
        <Modal isOpen={isEditModalOpen} onClose={onCloseEditModal}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-large">Editar Producto</ModalHeader>
                <ModalBody>
                  {editingProduct && (
                    <form>
                     <Input
                        label="SKU"
                        value={editingProduct.sku}
                        onChange={(e) => handleInputChange(e, 'sku')}
                        
                      />
                      <Input
                        label="Nombre"
                        value={editingProduct.nombre}
                        onChange={(e) => handleInputChange(e, 'nombre')}
                        
                      />
                      <Input
                        label="Descripción"
                        value={editingProduct.descripcion}
                        onChange={(e) => handleInputChange(e, 'descripcion')}
                        
                      />
                      <Input
                        label="Talla"
                        value={editingProduct.talla}
                        onChange={(e) => handleInputChange(e, 'talla')}
                        
                      />
                      <Input
                        label="Color"
                        value={editingProduct.color}
                        onChange={(e) => handleInputChange(e, 'color')}
                        
                      />
                      <Input
                        label="Precio de Compra"
                        type="number"
                        value={editingProduct.precio_compra.toString()}
                        onChange={(e) => handleInputChange(e, 'precio_compra')}
                        
                      />
                      <Input
                        label="Precio de Venta"
                        type="number"
                        value={editingProduct.precio_venta.toString()}
                        onChange={(e) => handleInputChange(e, 'precio_venta')}
                        
                      />
                      <Input
                        label="Stock Disponible"
                        type="number"
                        value={editingProduct.stock_disponible.toString()}
                        onChange={(e) => handleInputChange(e, 'stock_disponible')}
                        
                      />
                      <Input
                        label="Proveedor"
                        value={editingProduct.proveedor}
                        onChange={(e) => handleInputChange(e, 'proveedor')}
                        
                      />
                      <Input
                        label="URL de la Imagen"
                        value={editingProduct.url_imagen}
                        
                      />
                      <Input
                        label="Estado"
                        value={editingProduct.estado}
                        onChange={(e) => handleInputChange(e, 'estado')}
                        
                      />
                    </form>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={handleSaveEdit}>
                    Guardar Cambios
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Modal de Eliminación */}
        <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Confirmar Eliminación</ModalHeader>
                <ModalBody>
                  <p>¿Estás seguro de que quieres eliminar este producto?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="danger" onPress={handleConfirmDelete}>
                    Eliminar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal isOpen={isNewProductModalOpen} onClose={onCloseNewProductModal}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Nuevo Producto</ModalHeader>
                <ModalBody>
                  <form>
                    <Input
                      label="SKU"
                      onChange={(e) => handleInputChangeNewProduct(e, 'sku')}
                      value={newProduct.sku || ''}
                      isRequired  // Agrega isRequired para validación
                    />
                    <Input
                      label="Nombre"
                      onChange={(e) => handleInputChangeNewProduct(e, 'nombre')}
                      value={newProduct.nombre || ''}
                      isRequired
                    />
                    <Textarea
                      label="Descripción"
                      onChange={(e) => handleInputChangeNewProduct(e, 'descripcion')}
                      value={newProduct.descripcion || ''}
                    />
                    <Input
                      label="Talla"
                      onChange={(e) => handleInputChangeNewProduct(e, 'talla')}
                      value={newProduct.talla || ''}
                    />
                    <Input
                      label="Color"
                      onChange={(e) => handleInputChangeNewProduct(e, 'color')}
                      value={newProduct.color || ''}
                    />
                    <Input
                      type="number"
                      label="Precio de Compra"
                      onChange={(e) => handleInputChangeNewProduct(e, 'precio_compra')}
                      value={newProduct.precio_compra !== undefined && newProduct.precio_compra !== null ? String(newProduct.precio_compra) : ''}
                    />
                    <Input
                      type="number"
                      label="Precio de Venta"
                      onChange={(e) => handleInputChangeNewProduct(e, 'precio_venta')}
                      value={newProduct.precio_venta ? String(newProduct.precio_venta) : ''}
                      isRequired
                    />
                    <Input
                      type="number"
                      label="Stock Disponible"
                      onChange={(e) => handleInputChangeNewProduct(e, 'stock_disponible')}
                      value={newProduct.stock_disponible !== undefined && newProduct.stock_disponible !== null ? String(newProduct.stock_disponible) : ''}
                      isRequired
                    />
                    <Input
                      label="Proveedor"
                      onChange={(e) => handleInputChangeNewProduct(e, 'proveedor')}
                      value={newProduct.proveedor || ''}
                    />
                    <Input
                      label="URL de la Imagen"
                      onChange={(e) => handleInputChangeNewProduct(e, 'url_imagen')}
                      value={newProduct.url_imagen || ''}
                    />
                    <div className="relative">
                      <Input
                        label="Estado"
                        placeholder="Selecciona un estado"
                        isReadOnly
                        value={newProduct.estado || 'activo'}
                        className="w-full"
                      />
                      
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={handleSaveNewProduct}>
                    Guardar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default ProductList;