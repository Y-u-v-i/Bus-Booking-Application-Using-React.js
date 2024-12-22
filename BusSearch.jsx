/* eslint-disable react/prop-types */
import styled from 'styled-components'
import { Button, Form } from 'react-bootstrap'
import '../App.css'
import '../App.jsx'
import '../utils/index.js'
import { Buses, locations } from '../utils/index.js'
import { useState } from 'react'
import BusList from './BusList.jsx'
const Container = styled.div`
background-color:white;
padding:1rem;
border-radius:5px;
box-shadow:0px 4px 8px rgba(0,0,0,0.2);
font-family:'Franklin Gothic Medium';
text-align:center;`
export default function BusSearch({ SearchState, setSearchState }) {
    const [filteredBus, setfilteredBus] = useState(null)
    const handleSearch = () => {
        setfilteredBus(Buses.filter((data) => data.source == SearchState.from && data.destination == SearchState.to &&
            data.availableDates.includes(SearchState.date)))
    }
    return (
        <Container>
            <h2 className='mb-3'>Search for Buses</h2>
            <div className='d-flex flex-column align-items-center'>
                <Form.Select className="mb-3" id='width-300' value={SearchState.from} onChange={(e) => setSearchState((prevState) => ({
                    ...prevState,
                    from: e.target.value
                }))}>
                    {locations.map((data) => (
                        <option key={`${data}-source`} value={data}>
                            {data}
                        </option>
                    ))}
                </Form.Select>
                <Form.Select className="mb-3" id='width-300' value={SearchState.to} onChange={(e) => setSearchState((prevState) => ({
                    ...prevState,
                    to: e.target.value
                }))}>
                    {locations.map((data) => (
                        <option key={`${data}-destination`} value={data}>
                            {data}
                        </option>
                    ))}
                </Form.Select>
                <input className='form-control mb-3' id='width-300' type='date' value={SearchState.date} onChange={(e) => setSearchState((prevState) => ({
                    ...prevState, date: e.target.value
                }))} />
            </div>
            <Button id='custom-btn' className='mb-3' onClick={handleSearch}>Search</Button>
            {filteredBus && filteredBus?.length > 0 && <BusList buses={filteredBus} />}
            {filteredBus && filteredBus.length<1 && <h3> Oops! No Buses Founded 🥲</h3>}
        </Container>
    )
}
