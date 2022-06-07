import {
  Close,
  FilterList,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@styled-icons/material-outlined'
import Heading from 'components/Heading'
import { useSidebar } from 'hooks/use-sidebar'
import Link from 'next/link'
import { upperCaseFirstLetter } from 'utils'
import * as S from './styles'

const Sidebar = () => {
  const {
    values,
    currentPage,
    totalPages,
    isOpen,
    onNext,
    onPrevious,
    handleToggleMenu
  } = useSidebar()

  return (
    <S.Wrapper isOpen={isOpen}>
      <S.Overlay aria-hidden={isOpen} />
      <S.IconWrapper>
        <FilterList aria-label="open filters" onClick={handleToggleMenu} />
        <Close aria-label="close filters" onClick={handleToggleMenu} />
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
              <S.Item onClick={handleToggleMenu}>
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
