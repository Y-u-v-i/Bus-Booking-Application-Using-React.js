import Header from './components/header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import BusSearch from './components/BusSearch'
import 'bootstrap/dist/css/bootstrap.min.css'
import { locations } from './utils'
import BusLayout from './components/BusLayout'
import BookingForm from './components/BookingForm'
function App() {
  const [SearchState, setSearchState] = useState({
    from: locations[0],
    to: locations[2],
    date: '',
  })
  const[selectedSeats,setSelectedSeats]=useState([])
  return (
    <>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<BusSearch SearchState={SearchState} setSearchState={setSearchState} />} />
          <Route path='/bus/:id' element={<BusLayout selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>}/>
          <Route path='/bus/book' element={<BookingForm selectedSeats={selectedSeats} SearchState={SearchState} setSelectedSeats={setSelectedSeats} setSearchState={setSearchState}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
