import { ChoresPage } from '@/components/chores-page'
import { MainLayout } from '@/components/main-layout'

export default function ChoresRoute({
  searchParams,
}: {
  searchParams?: { page?: string }
}) {
  const page = Number.parseInt(searchParams?.page ?? '1')

  return (
    <MainLayout>
      <ChoresPage initialPage={page} />
    </MainLayout>
  )
}
