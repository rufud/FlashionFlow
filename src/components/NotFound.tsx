import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NotFound: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const location = useLocation(); // Obtener la ruta actual

  useEffect(() => {
    if (!isLoading) {
      setShouldRedirect(true);
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Cargando...</div>; // Mostrar un spinner o mensaje de carga
  }

  if (shouldRedirect) {
    if (user) {
      // Determinar si la URL actual está relacionada con productos
      const isProductRoute = location.pathname.startsWith('/products');

      if (isProductRoute) {
        // Si es una ruta de productos pero no existe, mostramos "Página no encontrada"
        return <div>Página no encontrada</div>;
      } else {
        // Si no es una ruta de productos, redirigimos a "/app"
        return <Navigate to="/app" replace />;
      }
    } else {
      // Si el usuario no está autenticado, lo redirigimos al login
      return <Navigate to="/login" replace />;
    }
  }

  return null; // Mientras no se haya determinado la redirección, no mostramos nada
};

export default NotFound;