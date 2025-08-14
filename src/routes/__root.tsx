import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { MainLayout } from '@/layout/MainLayout'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return <div>This is the global not found component</div>
  },
})

function RootComponent() {
  return (
    <MainLayout>
      <Outlet />
      <TanStackRouterDevtools />
    </MainLayout>
  )
}
