'use client'

import { AdminLayout as AdminLayoutComponent } from '@/components/admin/AdminLayout'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  
  const getPageInfo = () => {
    if (pathname === '/admin/dashboard' ) {
      return { title: 'Dashboard', subtitle: 'Welcome to Alpha World Education Admin Panel' }
    }
    if (pathname === '/admin/countries') {
      return { title: 'Countries Management', subtitle: 'Manage countries for education destinations' }
    }
    if (pathname === '/admin/colleges') {
      return { title: 'Colleges Management', subtitle: 'Manage educational institutions' }
    }
    if (pathname === '/admin/blogs') {
      return { title: 'Blogs Management', subtitle: 'Manage blog posts and content' }
    }
    if (pathname === '/admin/exams') {
      return { title: 'Exams Management', subtitle: 'Manage standardized tests and examinations' }
    }
    return { title: 'Admin', subtitle: 'Alpha World Education Admin Panel' }
  }

  const { title, subtitle } = getPageInfo()

  return (
    <AdminLayoutComponent title={title} subtitle={subtitle}>
      {children}
    </AdminLayoutComponent>
  );
}
