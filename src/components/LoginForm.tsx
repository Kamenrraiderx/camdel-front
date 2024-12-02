'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import { motion } from 'framer-motion'
import { User, Lock } from 'lucide-react'

export default function LoginForm() {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                // Guardar el token en una cookie llamada 'sesion'
                Cookies.set('sesion', data.token, { expires: 1 }); // Expira en 1 día, por ejemplo
                // Aquí puedes redirigir a la página del admin
                router.push('/admin');
            } else {
                setError('Credenciales inválidas');
            }

        } catch (err) {
            setError(`Credenciales inválidas ${err}`)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-card-foreground">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-card-foreground mb-1">
                        Nombre de usuario
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-1">
                        Contraseña
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                    Iniciar Sesión
                </motion.button>
            </form>
        </motion.div>
    )
}

