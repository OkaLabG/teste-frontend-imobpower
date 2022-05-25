import { Grid } from 'components/Grid'
import Heading from 'components/Heading'
import { SidebarProps } from 'components/Sidebar'
import Image from 'next/image'
import Base from 'templates/Base'
import { upperCaseFirstLetter } from 'utils'

import * as S from './styles'

type Ability = {
  ability: {
    name: string
  }
}

type Types = {
  type: {
    name: string
  }
}

type PokemonProps = {
  name: string
  abilities: Ability[]
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: Types[]
  height: string
  weight: string
}

export type PokemonTemplateProps = {
  pokemon: PokemonProps
  sidebarItems: SidebarProps['items']
}

const Pokemon = ({ pokemon, sidebarItems }: PokemonTemplateProps) => {
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default

  return (
    <Base sidebarItems={sidebarItems}>
      <S.SectionWrapper>
        <Heading lineLeft>{upperCaseFirstLetter(pokemon.name)}</Heading>
        <S.Section>
          <S.ImageWrapper>
            <Image src={imageUrl} alt={pokemon.name} width={300} height={300} />
          </S.ImageWrapper>
        </S.Section>
        <Grid>
          <S.InfoWrapper>
            <S.BadgeWrapper>
              <Heading lineBottom size="small">
                Height
              </Heading>
              <S.Badge>{pokemon.height}</S.Badge>
            </S.BadgeWrapper>

            <S.BadgeWrapper>
              <Heading lineBottom size="small">
                Weight
              </Heading>
              <S.Badge>{pokemon.weight}</S.Badge>
            </S.BadgeWrapper>
          </S.InfoWrapper>

          <section>
            <Heading lineBottom size="small">
              Type
            </Heading>
            {pokemon.types.map(({ type: { name } }) => (
              <S.Badge key={name}>{upperCaseFirstLetter(name)}</S.Badge>
            ))}
          </section>

          <section>
            <Heading lineBottom size="small">
              Abilities
            </Heading>
            {pokemon.abilities.map(({ ability: { name } }) => (
              <S.Badge key={name}>{upperCaseFirstLetter(name)}</S.Badge>
            ))}
          </section>
        </Grid>
      </S.SectionWrapper>
    </Base>
  )
}

export default Pokemon
