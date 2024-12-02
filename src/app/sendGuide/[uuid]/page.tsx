'use client'

import { useState, FormEvent, useCallback, useEffect } from 'react'
import Navbar from '@/components/NavBar'
import CustomSelect from '@/components/CustomSelect'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, User, Phone, MapPin, Bookmark, Building } from 'lucide-react'
import jsonData from '@/data/towns.json';


interface DataItem {
  id: string[];
  text: string[];
}
export default function Home({ params }: { params: Promise<{ uuid: string }>}) {
  const [uuid, setUuid] = useState<string | null>(null); // Estado para almacenar el UUID

  // Resuelve la promesa de params
  useEffect(() => {
    params.then((resolvedParams) => {
      setUuid(resolvedParams.uuid);
    });
  }, [params]);

  const municipios: DataItem[] = jsonData;

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [formData, setFormData] = useState({
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    recipientReference1: '',
    recipientReference2: '',
    recipientTown: '',
    recipientTownSelector: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSelectChange = useCallback((option: { id: string[], text: string[] }) => {
    setFormData(prev => ({
      ...prev,
      recipientTown: option.text[0],
      recipientTownSelector: option.id[0]
    }))
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const response = await fetch(`${API_URL}/sendGuide/${uuid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    // Simular envío al servidor
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 text-blue-900">
      <Navbar />
      <main className="container mx-auto mt-8 p-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Formulario de Entrega</h2>
          <div className="space-y-2">
            <Label htmlFor="recipientName" className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Nombre
            </Label>
            <Input
              id="recipientName"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleInputChange}
              required
              className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientPhone" className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Teléfono
            </Label>
            <Input
              id="recipientPhone"
              name="recipientPhone"
              value={formData.recipientPhone}
              onChange={handleInputChange}
              required
              className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientAddress" className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Dirección exacta
            </Label>
            <Input
              id="recipientAddress"
              name="recipientAddress"
              value={formData.recipientAddress}
              onChange={handleInputChange}
              required
              className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientReference1" className="flex items-center">
              <Bookmark className="w-5 h-5 mr-2" />
              Referencia 1
            </Label>
            <Input
              id="recipientReference1"
              name="recipientReference1"
              value={formData.recipientReference1}
              onChange={handleInputChange}
              required
              className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientReference2" className="flex items-center">
              <Bookmark className="w-5 h-5 mr-2" />
              Referencia 2
            </Label>
            <Input
              id="recipientReference2"
              name="recipientReference2"
              value={formData.recipientReference2}
              onChange={handleInputChange}
              required
              className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientTown" className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Municipio
            </Label>
            <CustomSelect
              options={municipios}
              onSelect={handleSelectChange}
              placeholder="Seleccione un municipio"

            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar formulario'
            )}
          </Button>
        </form>
      </main>
    </div>
  )
}
