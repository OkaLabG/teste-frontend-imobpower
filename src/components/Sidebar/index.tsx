import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@styled-icons/material-outlined/'
import { Close } from '@styled-icons/material-outlined/Close'
import { FilterList } from '@styled-icons/material-outlined/FilterList'
import axios from 'axios'
import Heading from 'components/Heading'
import Link from 'next/link'
import { upperCaseFirstLetter } from 'utils'

import { useState } from 'react'
import * as S from './styles'

export type ItemsProps = {
  name: string
  url: string
}

export type SidebarProps = {
  items: {
    count: number
    previous: string
    next: string
    results: ItemsProps[]
  }
}

const Sidebar = ({ items }: SidebarProps) => {
  const initialPerPage =
    items.previous?.split('limit=')[1] || items.next?.split('limit=')[1]
  const [isOpen, setIsOpen] = useState(false)
  const [values, setValues] = useState(items)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(initialPerPage)

  const totalPages = Math.ceil(items.count / Number(perPage))

  const onPrevious = async () => {
    const { data } = await axios.get(values.previous)

    setCurrentPage(currentPage - 1)
    setValues(data)
  }

  const onNext = async () => {
    const { data } = await axios.get(values.next)

    setCurrentPage(currentPage + 1)
    setValues(data)
  }

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
        <S.ShowMoreWrapper>
          <S.Button
            disabled={values.previous === null}
            isNull={values.previous === null}
            onClick={() => {
              onPrevious()
            }}
          >
            <KeyboardArrowLeft size={48} />
          </S.Button>
          <S.Counter>
            {currentPage} / {totalPages}
          </S.Counter>
          <S.Button
            disabled={values.next === null}
            isNull={values.next === null}
            onClick={() => {
              onNext()
            }}
          >
            <KeyboardArrowRight size={48} />
          </S.Button>
        </S.ShowMoreWrapper>

        {values.results?.map((item) => (
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
