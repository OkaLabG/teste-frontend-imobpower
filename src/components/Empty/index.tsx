import * as S from './styles'

export type EmptyProps = {
  title: string
  description: string
}

const Empty = ({ title, description }: EmptyProps) => (
  <S.Wrapper>
    <S.Image src="/img/empty.png" alt="A image writting pokemon" role="image" />

    <S.Title>{title}</S.Title>
    <S.Description>{description}</S.Description>
  </S.Wrapper>
)

export default Empty
