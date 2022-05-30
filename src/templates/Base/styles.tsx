import { Container } from 'components/Container'
import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const Header = styled(Container)`
  ${({ theme }) => css`
    padding: ${theme.spacings.small};
    display: none;
    height: 14rem;
    background: url('/img/header-background.png') no-repeat left fixed;

    ${media.greaterThan('medium')`
      display: block;
    `}
  `}
`

export const Main = styled(Container)`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.small};

    ${media.greaterThan('medium')`
    display: grid;
    grid-template-columns: 26rem 1fr;
    gap: ${theme.grid.gutter};
    `}
  `}
`

export const Content = styled.div`
  flex: 1 0 auto;
`
