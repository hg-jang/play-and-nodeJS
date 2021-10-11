import { useRouter } from 'next/router'
import AdminLayout from './AdminLayout'
import GroupLayout from './GroupLayout'
import PublicLayout from './PublicLayout'

const config = {
  admin_layout: ['/admin'],
  group_layout: ['/group'],
}

const Layout = ({ children }) => {
  const { pathname } = useRouter()

  // /admin/
  if(pathname.includes(config.admin_layout)) {
    return <AdminLayout>{ children }</AdminLayout>
  }
  // /group/
  if(pathname.includes(config.group_layout)) {
    return <GroupLayout>{ children }</GroupLayout>
  }
  
  return <PublicLayout>{ children }</PublicLayout>
}

export default Layout
