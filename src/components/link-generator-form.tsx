import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, LinkIcon } from 'lucide-react'
import Cookies from 'js-cookie';

interface Link {

  uuid: string
  titulo: string
  proposito: string
  duracion: string
  expiracion: string
  active: boolean
}

interface LinkGeneratorFormProps {
  setLinks: Dispatch<SetStateAction<Link[]>>; 
  links: Link[];            
}
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const FORM_URL = process.env.NEXT_PUBLIC_FORM_URL;
export function LinkGeneratorForm({ setLinks,links }: LinkGeneratorFormProps) {
  const [title, setTitle] = useState("")
  const [duration, setDuration] = useState("")
  const [durationUnit, setDurationUnit] = useState("hours")
  const [purpose, setPurpose] = useState("Envío de zapatos")
  const [generatedLink, setGeneratedLink] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const token = Cookies.get('sesion');
      if (!token) {
        console.error("No se encontró el token en las cookies.");
        return;
      }
      const response = await fetch(`${API_URL}/create-link`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
          },
        body: JSON.stringify({ titulo: title, proposito: purpose, duracion: `${duration} ${durationUnit}` }),
      });
      const data = await response.json();
      console.log("Nuevo",data)
      setLinks([...links,data])
      setTitle('')
      setDuration('')
      
      setGeneratedLink(`${FORM_URL}/sendGuide/${data.uuid}`)
    } catch (error) {
      console.error("Error generating link:", error)
    }
    setIsLoading(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink)
    setGeneratedLink("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title" className="flex items-center">
          <LinkIcon className="mr-2" size={20} />
          Título
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="duration" className="flex items-center">
            <Clock className="mr-2" size={20} />
            Duración
          </Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            placeholder="Ej: 24"
          />
        </div>
        <div className="w-1/3">
          <Label htmlFor="durationUnit">Unidad</Label>
          <Select value={durationUnit} onValueChange={setDurationUnit}>
            <SelectTrigger id="durationUnit">
              <SelectValue placeholder="Seleccionar unidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minutes">Minutos</SelectItem>
              <SelectItem value="hours">Horas</SelectItem>
              <SelectItem value="days">Días</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="purpose">Propósito</Label>
        <Textarea
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </div>
      {generatedLink==="" ? (
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Generando..." : "Generar Link"}
        </Button>
      ) : (
        <Button type="button" onClick={handleCopy}>
          Copiar Link
        </Button>
      )}
    </form>
  )
}

