import './styles/global.css'
import './styles/responsive.css'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'

const App = () => (
  <div className='app-shell'>
    <Sidebar />
    <div className='main-panel'>
      <Navbar />
      <main className='page'>
        <h1>Movie Series Club</h1>
        <p>Welcome to the community hub for discovering movies, clubs, and conversations.</p>
      </main>
      <Footer />
    </div>
  </div>
)

export default App
