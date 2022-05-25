import Empty from 'components/Empty'
import { SidebarProps } from 'components/Sidebar'
import Base from 'templates/Base'

export type HomeTemplateProps = {
  sidebarItems: SidebarProps['items']
}

const Home = ({ sidebarItems }: HomeTemplateProps) => (
  <Base sidebarItems={sidebarItems}>
    <Empty
      title=":)"
      description="Selecione um pokemon para ver suas informações"
    />
  </Base>
)

export default Home
