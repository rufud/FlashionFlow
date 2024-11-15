// src/services/authService.ts
import { supabase } from '../utils/supabaseClient';

// Servicio para iniciar sesión
export const loginUsuario = async (email: string, contrasena: string) => {
  const { data, error } = await supabase.rpc('login_usuario', {
    user_email: email, 
    contrasena_user: contrasena,  
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;  // Retorna el ID del usuario
};

// Servicio para registrar un usuario
export const registrarUsuario = async (nombreUsuario: string, email: string, contrasena: string) => {
  const { data, error } = await supabase.rpc('registrar_usuario', {
    nombre_usuario: nombreUsuario,
    email: email,
    contrasena: contrasena,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;  
};