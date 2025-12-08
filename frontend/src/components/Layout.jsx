import Sidebar from './Sidebar'
import Footer from './Footer'
import CustomCursor from './CustomCursor'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="fixed inset-0 z-0 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 opacity-20" 
             style={{
               background: 'radial-gradient(ellipse at top, rgba(217, 119, 6, 0.1), transparent)'
             }} />
      </div>

      <CustomCursor />
      <Sidebar />

      <main className="relative z-10 flex flex-col items-center w-full px-4 custom-scrollbar overflow-y-auto min-h-screen sm:pl-20 md:pl-24 lg:pl-28">
        <div className="w-full max-w-7xl pt-8 pb-8">
          {children}
        </div>
        <div className="w-full max-w-7xl sm:pl-0">
          <Footer />
        </div>
      </main>
    </div>
  )
}
