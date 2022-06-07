import axios from 'axios'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

export type SidebarItem = {
  name: string
  url: string
}

export type DataPokemon = {
  count: number
  previous: string
  next: string
  results: SidebarItem[]
}

export type SidebarContextData = {
  values: DataPokemon
  totalPages: number
  currentPage: number
  isOpen: boolean
  onNext: () => void
  onPrevious: () => void
  handleToggleMenu: () => void
}

export const SidebarContextDefaultValues = {
  values: {
    count: 0,
    previous: '',
    next: '',
    results: []
  },
  totalPages: 0,
  currentPage: 1,
  isOpen: false,
  onNext: () => ({}),
  onPrevious: () => ({}),
  handleToggleMenu: () => ({})
}

export type SidebarProviderProps = {
  children: React.ReactNode
}

export const SidebarContext = createContext<SidebarContextData>(
  SidebarContextDefaultValues
)

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState(SidebarContextDefaultValues.isOpen)
  const [data, setData] = useState<SidebarContextData>(
    SidebarContextDefaultValues
  )

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/?limit=20'
      )

      setData((old) => ({ ...old, values: data }))
    })()
  }, [])

  const dataProvider = useMemo(() => ({ data, setData }), [data, setData])

  const initialPerPage =
    data.values.previous?.split('limit=')[1] ||
    data.values.next?.split('limit=')[1]
  const [currentPage, setCurrentPage] = useState(
    SidebarContextDefaultValues.currentPage
  )
  const [perPage] = useState(initialPerPage || 20)

  const totalPages = Math.ceil(data.values.count / Number(perPage))

  const onPrevious = useCallback(async () => {
    const { data: value } = await axios.get(data.values.previous)

    setCurrentPage(currentPage - 1)
    setData((old) => ({ ...old, values: value }))
  }, [data.values.previous, currentPage])

  const onNext = useCallback(async () => {
    const { data: value } = await axios.get(data.values.next)

    setCurrentPage(currentPage + 1)
    setData((old) => ({ ...old, values: value }))
  }, [currentPage, data.values.next])

  const handleToggleMenu = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <SidebarContext.Provider
      value={{
        values: dataProvider.data.values,
        onNext,
        onPrevious,
        totalPages,
        currentPage,
        isOpen,
        handleToggleMenu
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

const useSidebar = () => useContext(SidebarContext)

export { useSidebar, SidebarProvider }
