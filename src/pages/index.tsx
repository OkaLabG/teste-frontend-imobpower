import axios from 'axios'
import { GetStaticProps } from 'next'
import Home, { HomeTemplateProps } from 'templates/Home'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

  const { data } = await axios.get(`${baseUrl}`)
  const sidebarItems = data.results

  return {
    revalidate: 10,
    props: {
      sidebarItems
    }
  }
}
