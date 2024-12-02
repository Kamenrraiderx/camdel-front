import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from 'lucide-react'

interface Link {

  uuid: string
  titulo: string
  proposito: string
  duracion: string
  expiracion: string
  active: boolean
}

interface LinksTableProps {
  links: Link[]
  onDelete: (id: string) => void
  onToggleStatus: (id: string, active: boolean) => void
}

export function LinksTable({ links, onDelete, onToggleStatus }: LinksTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          links.length > 0 ?
            links.map((link) => (
              <TableRow key={link.uuid}>
                <TableCell>{link.titulo}</TableCell>
                <TableCell>
                  <Switch
                    checked={link.active}
                    onCheckedChange={() => onToggleStatus(link.uuid, link.active)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(link.uuid)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            )) :
            <TableRow>
              <TableCell className="flex justify-center w-full text-2xl text-stone-400 h-40 font-bold items-center">
                No hay nuevos enlaces

              </TableCell>

            </TableRow>
        }
      </TableBody>
    </Table>
  )
}

