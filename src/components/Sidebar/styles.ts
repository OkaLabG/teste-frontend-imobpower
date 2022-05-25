import * as HeadingStyles from 'components/Heading/styles'
import { rgba } from 'polished'
import styled, { css, DefaultTheme } from 'styled-components'
import media from 'styled-media-query'

export const Item = styled.a`
  ${({ theme }) => css`
    text-decoration: none;
    color: ${theme.colors.white};
    display: block;
    width: 100%;
    transition: transform ${theme.transition.fast};

    &:hover {
      transform: translateX(1rem);
    }

    & > svg {
      color: ${theme.colors.primary};
    }
  `}
`

export const IconWrapper = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;

  ${media.greaterThan('medium')`
    display: none;
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.mainBg};
    flex: 1;
    overflow-y: auto;
    padding: 0 ${theme.spacings.small};
    margin-top: 3rem;
    margin-bottom: 2rem;
    transition: transform ${theme.transition.default};

    ${media.greaterThan('medium')`
      overflow-y: initial;
      padding: 0;
      margin-top: 0;
      margin-bottom: 0;
    `}
  `}
`

export const Overlay = styled.div`
  ${({ theme }) => css`
    transition: opacity ${theme.transition.default};
    opacity: 0;
    position: absolute;
  `}
`

export const Items = styled.div`
  ${({ theme }) => css`
    & > div:not(:last-of-type) {
      margin-bottom: ${theme.spacings.xxsmall};
    }

    & + div {
      border-top: 0.1rem solid ${rgba(theme.colors.gray, 0.2)};
      margin-top: ${theme.spacings.xxsmall};
      padding-top: ${theme.spacings.xxsmall};
    }
  `}
`

const wrapperModifiers = {
  open: (theme: DefaultTheme) => css`
    z-index: ${theme.layers.modal};
    position: fixed;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;

    ${Overlay} {
      z-index: ${theme.layers.modal};
      background-color: ${theme.colors.mainBg};
      top: 0;
      left: 0;
      position: fixed;
      width: 100%;
      height: 100vh;
      opacity: 1;
    }

    ${Content} {
      margin-top: ${theme.spacings.medium};
      transform: translateY(0);
      overflow-y: scroll;
    }

    ${Content}, ${IconWrapper},  ${HeadingStyles.Wrapper} {
      z-index: ${theme.layers.modal};
    }

    ${IconWrapper} {
      color: ${theme.colors.white};

      > svg {
        position: absolute;
        width: 30px;
        right: 0.8rem;
        top: 0.8rem;

        &:first-child {
          display: none;
        }
      }
    }

    ${HeadingStyles.Wrapper} {
      ${({ theme }) => css`
        margin: 0 ${theme.spacings.xsmall};
      `}
    }
  `,

  close: (theme: DefaultTheme) => css`
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;

    ${IconWrapper} {
      color: ${theme.colors.white};

      > svg:last-child {
        display: none;
      }
    }

    ${Content} {
      transform: translateY(3rem);
      height: 0;
      visibility: hidden;
      position: absolute;
      left: 0;
    }
  `
}

type WrapperProps = {
  isOpen: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, isOpen }) => css`
    ${HeadingStyles.Wrapper} {
      ${({ theme }) => css`
        margin-bottom: ${theme.spacings.medium};
      `}
    }

    ${media.lessThan('medium')`
      ${!!isOpen && wrapperModifiers.open(theme)}
      ${!isOpen && wrapperModifiers.close(theme)}
    `}
  `}
`
