import axios from 'axios'
import Home, { HomeTemplateProps } from 'templates/Home'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

export const getServerSideProps = async () => {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20'

  const { data } = await axios.get(`${baseUrl}`)
  const sidebarItems = data

  return {
    props: {
      sidebarItems
    }
  }
}
