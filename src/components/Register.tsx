// // src/components/Register.tsx
// import React, { useState } from 'react';
// import { Button, Input } from '@nextui-org/react';
// import { ToastContainer, toast } from 'react-toastify';
// import { registrarUsuario } from '../services/authService';  // Importa el servicio de registro

// const Register: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [nombreUsuario, setNombreUsuario] = useState('');

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await registrarUsuario(nombreUsuario, email, password);
//       toast.success('Registro exitoso! Verifica tu email para activar tu cuenta.');
//       // Redirigir a la página de login
//       window.location.href = '/login';
//     } catch (error: any) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <ToastContainer />
//       <h1 className="text-3xl font-bold mb-6">Registro</h1>
//       <form onSubmit={handleRegister} className="space-y-4 w-full max-w-sm">
//         <Input
//           label="Nombre de Usuario"
//           placeholder="Tu nombre de usuario"
//           value={nombreUsuario}
//           onChange={(e) => setNombreUsuario(e.target.value)}
//           required
//         />
//         <Input
//           label="Email"
//           placeholder="Tu email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <Input
//           label="Password"
//           type="password"
//           placeholder="Tu contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <Button type="submit" className="w-full">Registrar</Button>
//       </form>
//       <p className="mt-4">
//         ¿Ya tienes una cuenta? <a href="/login" className="text-blue-500">Inicia sesión aquí</a>
//       </p>
//     </div>
//   );
// };

// export default Register;



// src/components/Register.tsx
import React, { useState } from 'react';
import { Button, Input, Link, Image } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import { registrarUsuario } from '../services/authService';

const Register: React.FC = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registrarUsuario(nombreUsuario, email, password);
      toast.success('Registro exitoso! Verifica tu email para activar tu cuenta.');
      window.location.href = '/login'; // o navigate('/login', { replace: true }); si prefieres usar navigate
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-[#1A1A1A] min-h-screen flex flex-col items-center justify-center">
      <ToastContainer />

      <div className="flex items-center mb-12 px-4  top-60">
        <Image
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cg fill='none'%3E%3Cpath fill='%23880e4f' d='M15.783 27.048c7.125 0 12.902-5.777 12.902-12.903S22.908 1.242 15.783 1.242C8.657 1.242 2.88 7.02 2.88 14.145s5.777 12.903 12.903 12.903'/%3E%3Cpath fill='%23ec407a' d='M13.335 9.228c-.03 0-.062-.008-.093-.01c-.527-.03-.667-.63-.58-.96c.54-2.068.273-3.905-.612-6.253c-.183-.48.545-.605.862-.477c.305.122.588.562.71.895c.733 1.982.938 4.065.333 6.292c-.08.3-.32.52-.62.513'/%3E%3Cpath fill='%23ec407a' d='M14.95 11.145a.617.617 0 0 1-.577-.797c.694-2.3 1.202-6.06-.408-8.886c-.17-.297.262-.492.603-.46c.78.07 1.235 1.238 1.385 1.758c.704 2.427.474 5.672-.398 7.945c-.1.268-.335.447-.605.44'/%3E%3Cpath fill='%23ec407a' d='M16.615 12.958c-.425-.123-.505-.683-.407-1.01c1.935-6.485-.013-10.47-.028-10.513c-.12-.32.93-.757 1.448.54c.075.188 1.802 4.525-.145 10.5c-.093.275-.423.613-.868.482m-11.01 9.667c-.18-.212-.405-.55-.12-.74c.472-.318 2.095-.833 3.392-2.593c.203-.275.545-.402.843-.232c.297.168.43.565.232.843c-1.575 2.22-3.492 2.82-3.57 2.864c-.095.056-.597.07-.777-.142m1.042.922c-.13-.325.7-.467.7-.467c.368-.14 1.875-.422 3.078-2.315c.182-.288.547-.4.842-.23c.298.17.4.547.23.843c-.807 1.415-2.385 2.474-3.465 2.732c-.577.137-1.257-.245-1.385-.562m2.02 1.853c-.382-.202-.495-.572-.252-.652c1.432-.463 2.998-1.658 3.758-2.783a.618.618 0 0 1 1.023.692c-.893 1.346-1.803 2.026-3.289 2.67c-.282.123-.882.263-1.24.073m1.83.553c.938-.43 2.5-1.32 3.406-2.838a.619.619 0 0 1 1.062.633c-.73 1.224-1.745 2.192-3.293 2.737c-.752.268-1.485-.387-1.174-.532M4.74 20.84c-2.083-2.455-2.45-5.66-1.915-8.835c.122-.73.39-1.185.655-1.183c.342.006.672 1.18.572 1.818c-.45 2.867.38 5.68 2.175 7.868c.108.132-.045.58-.427.747c-.383.165-.81-.12-1.06-.415'/%3E%3Cpath fill='%23ec407a' d='M6.327 19.458c-.942-.885-1.722-3.655-1.725-4.973c0-.342.003-.835.345-.835c0 0 .765.117.893.832c.182 1.03.752 3.396 1.702 4.593c.213.268-.572.985-1.215.383'/%3E%3Cpath fill='%23d81b60' d='M16.608 27.525c-1.088.055-2.758-.172-3.306-.922c-.202-.276.16-.536.49-.448c1.99.537 3.368.85 5.91-.385c.515-.25 1.085.012.83.372c-.357.508-1.97 1.296-3.924 1.383'/%3E%3Cpath fill='%23d81b60' d='M14.568 25.283c-.193-.283.38-.756.72-.7c.537.085.91.18 1.285.195c.384.015.857-.125 1.002-.125c.343 0 1.163.337.953.607c-.65.835-3.353.91-3.96.022'/%3E%3Cpath fill='%23ec407a' d='M21.62 11.143a.617.617 0 0 1-.203-1.218c1.473-.32 3.393-1.418 4.513-3.18c.268-.423 1.1.37.652 1.04c-1.344 2.022-3.107 2.96-4.902 3.348z'/%3E%3Cpath fill='%23ec407a' d='M21.193 13.38a.62.62 0 0 1-.686-.528a.62.62 0 0 1 .525-.7c2.423-.347 5.07-2.195 5.96-4.045c.148-.307 1.17.6.44 1.613c-1.302 1.803-3.857 3.317-6.222 3.655q-.01.006-.018.005'/%3E%3Cpath fill='%23ec407a' d='M21.415 15.345q-.297.035-.58.047a.62.62 0 0 1-.645-.592a.613.613 0 0 1 .592-.643c2.478-.104 6.08-1.77 7.198-3.842c.162-.3 1.197.55.317 1.665c-.66.838-1.7 1.522-2.89 2.12c-1.29.65-2.74 1.098-3.992 1.245m1.957 1.69a3 3 0 0 1-.482.025a.617.617 0 1 1 .03-1.235c1.142.025 4.227-1.175 5.537-3.232c.185-.288.868.787.13 1.627c-1.594 1.818-3.707 2.638-5.215 2.815m-4.767-2.457a.6.6 0 0 1-.225-.043a.63.63 0 0 1-.352-.8c1.272-3.732 1.717-8.132.117-12.185c-.125-.318 1.095-.36 1.418.588c1.52 4.485 1.062 8.115-.383 12.045a.61.61 0 0 1-.575.395'/%3E%3Cpath fill='%23d81b60' d='M23.27 7.453c-.317-.398-1.532-1.358-2.003-1.523c-.322-.115-.434-1.225-.092-1.225c1.125-.002 2.668 1.11 3.127 2.175c.34.788-.382 1.385-1.032.573m1.57-1C23.733 4.973 22.843 4 20.793 3.28c-.473-.167-.92-.747-.633-.932c.532-.345 1.525.075 1.802.207c1.085.518 2.09 1.073 2.936 2.055c.477.555 1.037 1.713.81 1.965c-.345.383-.745.04-.868-.122m.31 12.285c-.18-.29.823-.708.913-1.768c.03-.34 1.065-.74 1.087-.4c.085 1.325-.383 1.808-.902 2.185c-.568.408-.983.172-1.098-.017m2.06.904c-.463-.104-.277-.602-.062-.867c.82-1.005.895-1.542.81-2.637c-.043-.54.4-1.023.61-.756c.272.35.477 1.373.282 2.213c-.46 1.998-1.495 2.08-1.64 2.047M22.523 8.035a.9.9 0 0 1 .177.32c.033.12.018.258-.062.35a.6.6 0 0 1-.206.135a1.7 1.7 0 0 1-.44.163a.6.6 0 0 1-.45-.08c-.16-.115-.225-.32-.267-.51a6 6 0 0 1-.14-.943a.43.43 0 0 1 .027-.225c.213-.4 1.216.608 1.36.79'/%3E%3Cpath fill='%23ec407a' d='M23.27 24.53c-1.47-.258-2.945-.832-4.387-1.488c-.333-.16-.653-.327-.973-.497c-.53.3-1.1.542-1.695.722a18.7 18.7 0 0 0 3.848 1.646c1.642.49 2.315.4 2.454.38c.54-.083 1.088-.695.753-.763'/%3E%3Cpath fill='%23f06292' d='M4.813 9.073c-.163-.3-.405-1.045-.405-1.045c-.43-.053-.783.502-.625 1.445c.092.542 2.54 6.71 9.775 12.072a25 25 0 0 0 2.654 1.725s.576.38 1.36-.025c.666-.343.335-.7.335-.7C12.07 19.47 8.073 15.06 4.813 9.073'/%3E%3Cpath fill='%23ec407a' d='M24.913 23.173a37 37 0 0 1-5.123-2.053q-.5.525-1.09.953q.521.291 1.035.564c1.078.575 5.387 2.45 5.178.535'/%3E%3Cpath fill='%23f06292' d='M19.788 21.12c-5.85-2.898-10.886-7.438-14.066-15.102c-.837.185-.75 1.167-.63 1.487c2.843 7.563 8.6 11.76 13.606 14.568c0 0 .79.434 1.312-.233c.313-.402-.223-.72-.223-.72'/%3E%3Cpath fill='%23ec407a' d='M26.17 21.56a25.8 25.8 0 0 1-5.183-2.125a7.4 7.4 0 0 1-.714 1.125c1.28.65 2.632 1.2 4.052 1.613c1.795.517 2.183-.555 1.845-.613'/%3E%3Cpath fill='%23f06292' d='M7.26 4.458c-.205-.433-1.07.225-.92.907C7.273 8.76 11.58 16.4 20.273 20.56c0 0 .695.305.96-.275c.264-.582-.243-.85-.243-.85C11.858 14.578 8.39 7.62 7.26 4.458'/%3E%3Cpath fill='%23ec407a' d='M27.408 19.998c-2.09-.77-3.958-1.603-5.653-2.54a3 3 0 0 1-.05.285a7.4 7.4 0 0 1-.345 1.087a30.3 30.3 0 0 0 4.782 1.943c1.37.382 1.585-.653 1.265-.776'/%3E%3Cpath fill='%23f06292' d='M21.755 17.458c-6.18-3.398-9.302-7.28-12.745-13.983c-.42-.675-1.443-.057-1.045.66C11 10.718 14.24 14.803 21.36 18.833c0 0 .545.212.755-.423c.133-.4.008-.753-.36-.953'/%3E%3Cpath fill='%23ff80ab' d='M17.63 31c-.692 0-1.395-.017-2.097-.058c-4.333-.24-9.743-1.73-11.378-4.442c-.513-.848-2.07-3.43 1.108-8.655c1.782-2.93 6.065-9.19 4.892-15.17c0 0-.162-.575.35-.792c.757-.32.88.33.88.33c1.498 6.977-2.977 13.327-4.85 16.405c-2.427 3.992-1.793 5.97-1.105 7.11c.795 1.314 4.163 3.392 10.185 3.724c7.57.418 12.202-1.475 12.678-2.152c.017-.255-.148-.555-2.988-.615c-.788-.017-.715-1.168-.32-1.212c1.155-.136 3.328-.136 4.323.585c.502.364.712.902.515 1.527C29.23 29.457 23.957 31 17.63 31'/%3E%3C/g%3E%3C/svg%3E"  //  <- Pega tu código SVG aquí
          alt="Logo"
          className="w-20 h-20 mr-10"
        />
        <h1 className="text-6xl font-bold text-white">Fashion Flow</h1>
      </div>

      <div className="max-w-sm w-full px-4 space-y-8">
        <h2 className="text-2xl font-bold text-white text-center">Registro</h2>

        <form onSubmit={handleRegister} className="space-y-4 flex items-center  flex-col">
          <Input
            label="Nombre de Usuario"
            placeholder="Tu nombre de usuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
            size="lg"
            
          />
          <Input
            type="email"
            label="Email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            size="lg"
            
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            size="lg"
            
          />
          <Button type="submit" color="secondary" className="top-3 w-2/3 mx-auto font-bold" size="lg">
            Registrar
          </Button>
        </form>

        <p className="text-white text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="underline text-pink-500 hover:text-pink-600">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;