import { Close } from '@styled-icons/material-outlined/Close'
import { FilterList } from '@styled-icons/material-outlined/FilterList'
import Heading from 'components/Heading'
import Link from 'next/link'
import { useState } from 'react'
import { upperCaseFirstLetter } from 'utils'

import * as S from './styles'

export type ItemsProps = {
  name: string
  url: string
}

export type SidebarProps = {
  items: ItemsProps[]
}

const Sidebar = ({ items }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <S.Wrapper isOpen={isOpen}>
      <S.Overlay aria-hidden={isOpen} />
      <S.IconWrapper>
        <FilterList aria-label="open filters" onClick={() => setIsOpen(true)} />
        <Close aria-label="close filters" onClick={() => setIsOpen(false)} />
      </S.IconWrapper>
      <Heading lineLeft size="huge">
        Pokémon
      </Heading>
      <S.Content>
        {items?.map((item) => (
          <S.Items key={item.name}>
            <Link href={`/pokemon/${item.name}`} passHref>
              <S.Item onClick={() => setIsOpen(false)}>
                {upperCaseFirstLetter(item.name)}
              </S.Item>
            </Link>
          </S.Items>
        ))}
      </S.Content>
    </S.Wrapper>
  )
}

export default Sidebar
