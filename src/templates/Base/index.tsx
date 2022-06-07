import Sidebar from 'components/Sidebar'
import Image from 'next/image'
import logo from '../../../public/img/logo.png'

import * as S from './styles'

type BaseTemplateProps = {
  children: React.ReactNode
}

const Base = ({ children }: BaseTemplateProps) => {
  return (
    <S.Wrapper>
      <S.Header>
        <Image src={logo} alt="" height={100} width={100} />
      </S.Header>

      <S.Main>
        <Sidebar />

        <S.Content>{children}</S.Content>
      </S.Main>
    </S.Wrapper>
  )
}

export default Base
