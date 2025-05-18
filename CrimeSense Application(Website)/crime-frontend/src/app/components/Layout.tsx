import dynamic from 'next/dynamic'

// Dynamic imports for Header and Footer components
const Header = dynamic(() => import('./Header'), {
  ssr: true, // Set to false if the component should only render on the client// Fallback UI while loading
})


const LayoutComponent = ({ children }: any) => {
  return (
    <div>
      <Header />
      <div style={{ height: 'calc(100vh - 50px)', overflow: 'auto' }}>
        {children}
      </div>
    </div>
  )
}

export default LayoutComponent
