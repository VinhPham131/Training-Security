import { Outlet} from 'react-router-dom'

export default function AppShell() {

  return (
    <div className="min-h-svh grid grid-rows-[auto,1fr]">
      <header className="h-16 px-4 sm:px-[18px] py-[14px] flex items-center justify-between">
        <div className="flex ml-auto gap-4 mt-10">
          <img src="/logo.png" alt="logo" className="w-[200px] h-[70px]" />
        </div>
      </header>

      <main className="grid place-items-center">
          <div className="relative z-10 h-full">
            <Outlet />
          </div>
      </main>
    </div>
  )
}

