import { useRouter } from 'next/router'
import AdminLayout from './AdminLayout'
import GroupLayout from './GroupLayout'
import PublicLayout from './PublicLayout'
import ProfileLayout from './ProfileLayout'

const config = {
  admin_layout: ['/admin'],
  group_layout: ['/group'],
  profile_layout: ['/profile']
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

  // /profile/
  if(pathname.includes(config.profile_layout)) {
    return (
      <PublicLayout>
        <ProfileLayout>
          { children }
        </ProfileLayout>
      </PublicLayout>
    )
  }
  
  return <PublicLayout>{ children }</PublicLayout>
}

export default Layout
