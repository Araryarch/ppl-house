import { MembersPage } from '@/components/members-page'
import { MainLayout } from '@/components/main-layout'

export default function MembersRoute({
  searchParams,
}: {
  searchParams?: { page?: string }
}) {
  const page = Number.parseInt(searchParams?.page ?? '1')

  return (
    <MainLayout>
      <MembersPage initialPage={page} />
    </MainLayout>
  )
}
