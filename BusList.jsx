import styled from "styled-components"
import { Buses } from "../utils"
import './BusSearch.jsx'
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const BuslistContainer = styled.div`
  background-color: #f0f0f0;
  padding:1rem;
  border-radius:5px;
  box-shadow:0px 4px 8px rgba(0,0,0,0.2)
`

const BusItem = styled.div`
  background-color:white;
  padding:1rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.1)
`


export default function BusList({buses}) {
  const navigate= useNavigate()
  return (
    <BuslistContainer>
      <h2>Available Buses</h2>
      {Buses.map((bus)=>(<BusItem className="d-flex align-items-center justify-content-between" key={bus.id}>
        <div>
          <h3>{bus.name}</h3>
          <p>
            <strong>Source:</strong> {bus.source}
          </p>
          <p>
            <strong>Destination:</strong> {bus.destination}
          </p>
          <p>
            <strong>Departure Time:</strong> {bus.departureTime}
          </p>
          <p>
            <strong>Arrival Time:</strong> {bus.arrivalTime}
          </p>
          <p>
            <strong>Price:</strong> {bus.price}
          </p>
          <p>
            <strong>Type:</strong> {bus.busType}
          </p>
        </div>
        <div>
          <Button className="mb-3" id="success" onClick={()=>navigate(`bus/${bus.id}`)}>
            Book Now
          </Button>
          <h5>Available seats: {bus.availableSeats.length}</h5>
        </div>
      </BusItem>))}
    </BuslistContainer>
  )
}
