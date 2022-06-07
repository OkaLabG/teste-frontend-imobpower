import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const SectionWrapper = styled.div`
  ${({ theme }) => css`
    ${media.greaterThan('medium')`
      margin-top: ${theme.spacings.xxlarge};
    `}
  `}
`

export const Section = styled.section`
  width: fit-content;
  margin: 0 auto;
  display: flex;
`

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
  }
`

export const InfoWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin-bottom: ${theme.spacings.small};
  `}
`

export const BadgeWrapper = styled.div`
  ${({ theme }) => css`
    margin-right: ${theme.spacings.medium};

    ${media.greaterThan('medium')`
      &:last-child {
        margin-right: 0;
      }
    `}
  `}
`

export const Badge = styled.div`
  ${({ theme }) => css`
    display: inline-flex;
    margin-top: ${theme.spacings.xxsmall};
    background-color: ${theme.colors.secondary};
    border-radius: ${theme.border.radius};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.small};
    margin-right: ${theme.spacings.xsmall};

    ${media.greaterThan('medium')`
      &:last-child {
        margin-right: 0;
      `}
    }
  `}
`
