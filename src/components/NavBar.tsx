import Link from 'next/link'
//import { Home, Info, Mail } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">CAMDELHN</Link>
        {/*
        
          <div className="flex space-x-4">
          <Link href="/" className="flex items-center hover:text-secondary-foreground transition-colors">
            <Home className="mr-1" size={18} />
            Inicio
          </Link>
          <Link href="/about" className="flex items-center hover:text-secondary-foreground transition-colors">
            <Info className="mr-1" size={18} />
            Acerca de
          </Link>
          <Link href="/contact" className="flex items-center hover:text-secondary-foreground transition-colors">
            <Mail className="mr-1" size={18} />
            Contacto
          </Link>
        </div>
        */}
      </div>
    </nav>
  )
}

