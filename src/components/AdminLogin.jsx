import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

function AdminLogin({ onLogin, onLogout, user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const auth = getAuth();
      const result = await signInWithEmailAndPassword(auth, email, password);
      onLogin && onLogin(result.user);
    } catch (err) {
      setError('Credenciales incorrectas');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    onLogout && onLogout();
  };

  if (user) {
    return (
      <div className="p-4 bg-green-100 rounded">
        <p>Sesión iniciada como <b>{user.email}</b></p>
        <button onClick={handleLogout} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Cerrar sesión</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} className="p-4 bg-gray-100 rounded">
      <h2 className="mb-2 font-bold">Login Admin</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="block mb-2 p-2 border rounded w-full"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="block mb-2 p-2 border rounded w-full"
        required
      />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}

export default AdminLogin;
