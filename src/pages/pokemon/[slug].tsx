import axios from 'axios'
import { SidebarItem } from 'hooks/use-sidebar'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Pokemon, { PokemonTemplateProps } from 'templates/Pokemon'

export default function Index(props: PokemonTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return <Pokemon {...props} />
}

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

export async function getStaticPaths() {
  const {
    data: { results }
  } = await axios.get(`${baseUrl}`)
  const pokemonNames = results

  const paths = pokemonNames.map(({ name }: SidebarItem) => ({
    params: { slug: name }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const {
    data: { name, abilities, sprites, types, height, weight }
  } = await axios.get(`${baseUrl}${params?.slug}`)

  const pokemon = { name, abilities, sprites, types, height, weight }

  return {
    props: {
      pokemon
    }
  }
}
