import { Routes, Route } from 'react-router-dom';
import { Register, Login } from '../constant'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App