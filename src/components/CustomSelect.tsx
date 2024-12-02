import { FC, useState, useRef, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Option {
  id: string[]
  text: string[]
}

interface CustomSelectProps {
  options: Option[]
  onSelect: (option: Option) => void
  placeholder: string
}

const CustomSelect: FC<CustomSelectProps> = ({ options, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [visibleOptions, setVisibleOptions] = useState(20)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter(option => 
    option.text.some(text => text.toLowerCase().includes(search.toLowerCase()))
  )

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      if (scrollTop + clientHeight === scrollHeight) {
        setVisibleOptions(prev => prev + 20)
      }
    }
  }, [])

  return (
    <div className="relative">
      <div className="flex">
        <Input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)

          }}
          onClick={() => setIsOpen(true)}
          className="w-full border-blue-500 focus:ring-blue-500"
        />
        <Button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="icon"
          className="ml-2 border-blue-500 text-blue-500 hover:bg-blue-100"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      {isOpen && (
        <div 
          ref={containerRef}
          className="absolute z-10 w-full mt-1 bg-white border border-blue-300 rounded-md shadow-lg max-h-60 overflow-auto"
          onScroll={handleScroll}
        >
          <div className="sticky top-0 bg-blue-100 px-4 py-2 font-semibold text-blue-800 grid grid-cols-3 gap-2">
            <div>Poblado/Zona</div>
            <div>Municipio</div>
            <div>Departamento</div>
          </div>
          {filteredOptions.slice(0, visibleOptions).map((option) => (
            <div
              key={option.id[0]}
              className="px-4 py-2 cursor-pointer hover:bg-blue-50 grid grid-cols-3 gap-2"
              onClick={() => {
                onSelect(option)
                setIsOpen(false)
                setSearch(option.text.join(','))
              }}
            >
              {option.text.map((text, index) => (
                <div key={index} className="text-gray-800">{text}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect

