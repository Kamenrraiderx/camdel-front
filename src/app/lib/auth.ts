//import { cookies } from 'next/headers'; // Lectura y escritura de cookies
import { SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function login(username: string, password: string) {
    if (username === 'admin' && password === 'password') {
        const token = await new SignJWT({ username })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1h')
            .sign(secretKey);

        // Obtén la instancia de las cookies para escritura
        //const cookiesStore = cookies();

        // Establece la cookie
        // cookiesStore.set({
        //   name: 'session',
        //   value: token,
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === 'production',
        //   path: '/',
        //   maxAge: 3600, // Expira en 1 hora
        // });

        return token;
    }

    throw new Error('Credenciales inválidas');
}

export async function logout() {
    //const cookiesStore = cookies();
    //cookiesStore.delete('session'); // Borra la cookie de sesión
}

export async function getSession() {
    //const cookiesStore = cookies();
    //const token = cookiesStore.get('session')?.value;

    //if (!token) return null;

    try {
        //   const { payload } = await jwtVerify(token, secretKey);
        // return payload as { username: string };
    } catch {
        //  return null; // Token no válido o expirado
    }
}
