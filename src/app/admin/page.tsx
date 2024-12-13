"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/NavBar"
import { redirect } from 'next/navigation'
import Cookies from 'js-cookie';

import { LinkGeneratorForm } from "@/components/link-generator-form"
import { LinksTable } from "@/components/links-table"

interface Link {

    uuid: string
    titulo: string
    proposito: string
    duracion: string
    expiracion: string
    active: boolean
}
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


// Simulación de una llamada al backend para obtener los links
async function getLinks(): Promise<Link[]> {
    const token = Cookies.get('sesion');
    // Aquí iría la lógica real para comunicarse con el backend
    const response = await fetch(`${API_URL}/get-active-links`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data
}
async function getSession() {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = Cookies.get('sesion');
    const response = await fetch(`${API_URL}/valid-session`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },

    });
    const data = await response.json();
    return data
}

export default function AdminPage() {





    const [links, setLinks] = useState<Link[]>([])
    const [valid, setValid] = useState(false)

    useEffect(() => {

        getSession().then(data => {
            console.log(data.valid)
            if (!data.valid) {
                redirect('/auth')
            } else {
                setValid(true)
                getLinks().then(setLinks)
            }
        })

    }, [])



    const handleDeleteLink = async (uuid: string) => {
        setLinks(prevLinks => prevLinks.filter(link => link.uuid !== uuid))
        const token = Cookies.get('sesion')
        try {
            const response = await fetch(`${API_URL}/delete-link/${uuid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Link eliminado:', data);
            } else {
                console.error('Error al eliminar el link:', data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }

    const handleToggleStatus = async (uuid: string, active: boolean) => {

        try {
            const token = Cookies.get('sesion')
            const response = await fetch(`${API_URL}/update-active/${uuid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ active: !active })
            });
            console.log("Activo", active)
            const data = await response.json();

            if (response.ok) {
                console.log('Link actualizado:', data);
                setLinks(prevLinks => prevLinks.map(link =>
                    link.uuid === uuid ? { ...link, active: !link.active } : link
                ))
            } else {
                console.error('Error al actualizar el link:', data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }

    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            {valid &&
                <main className="container mx-auto p-4 space-y-8">
                    <h1 className="text-3xl font-bold">Panel de Administrador</h1>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Generar Link</h2>
                            <LinkGeneratorForm setLinks={setLinks} links={links} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Links Generados</h2>
                            <LinksTable
                                links={links}
                                onDelete={handleDeleteLink}
                                onToggleStatus={handleToggleStatus}
                            />
                        </div>
                    </div>
                </main>
            }
        </div>
    )
}

