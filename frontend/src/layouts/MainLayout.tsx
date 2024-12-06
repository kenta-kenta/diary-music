import React from 'react'
import Header from './Header'
import Footer from './Footer'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // const [isLogin, setIsLogin] = useState(true)
  // setIsLogin(true)

  return (
    <div>
      <Header isLogin={true} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
