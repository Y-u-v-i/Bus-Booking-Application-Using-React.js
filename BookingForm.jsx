/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { locations } from "../utils";

export default function BookingForm({ SearchState, setSearchState, selectedSeats, setSelectedSeats }) {
    const navigate = useNavigate();

    return (
        <div className="text-center">
            <h5>{SearchState.from} to {SearchState.to}</h5>
            <h5>Date: {SearchState.date}</h5>
            <br />
            <h5>Please fill in the details below</h5>
            {
                selectedSeats.map((data, index) => (
                    <div key={index}>
                        <div className="my-3">Seat No: {data}</div>
                        <Form.Group className="d-flex justify-content-center">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control className="ms-2 mb-3" id="width-300" placeholder="Name" type="text" />
                        </Form.Group>
                        <Form.Group className="d-flex justify-content-center">
                            <Form.Label>Age:</Form.Label>
                            <Form.Control className="ms-2 mb-3" id="width-300" placeholder="Age" type="number" />
                        </Form.Group>
                    </div>
                ))
            }
            <Button 
                onClick={() => {
                    alert('Your Ticket booked Successfully'); 
                    setSearchState({
                        from: locations[0],
                        to: locations[2],
                        date: '',
                    });
                    setSelectedSeats([]); 
                    navigate("/");
                }} 
                id="pink" 
                disabled={selectedSeats.length === 0} 
            >
                Pay Now
            </Button>
        </div>
    );
}