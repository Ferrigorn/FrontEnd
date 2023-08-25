
import { Outlet } from 'react-router-dom'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Register } from './pages/Register/Register'
import { AuthContextProvider } from './context/authContext'

const App = () => {
 

  return (
    <>
    <AuthContextProvider>
     <Header/>
     <main>
      <Outlet/>
      
     </main>
     <Footer/>
     </AuthContextProvider>
    </>
  )
}

export default App
