/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Buses } from "../utils";
import { Button } from "react-bootstrap";

const Container = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const TicketContainer = styled.div`
  padding: 0.5rem;
`;

const TicketItem = styled.li`
  list-style-type: none;
  margin: 0.5rem;
  padding: 1px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  flex: 1 10 16%;
`;

export default function BusLayout({ selectedSeats, setSelectedSeats }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedBus = Buses.find((data) => data.id === parseInt(id));
    const isSleeper = selectedBus.busType === "Sleeper";
    const seatWidth = isSleeper ? "80px" : "25px";

    const isSeatAvailable = (seat) => selectedBus.availableSeats.includes(seat);
    const selectedSeat = (seat) => {
        if (selectedSeats.includes(seat)) {
            const seats = selectedSeats.filter(selectedSeat => selectedSeat !== seat);
            setSelectedSeats(seats);
            return;
        }
        setSelectedSeats(prevState => [...prevState, seat]); // Correctly add the seat
    };

    const isSeatSelected = (seat) => selectedSeats.includes(seat);

    const generateSeats = (array, key = "") =>
        array.map((seats) =>
            Array.isArray(seats) ? (
                <div className="d-flex" key={key}>
                    {seats.map((seat) => (
                        <TicketItem
                            style={{
                                width: seatWidth,
                                background: isSeatSelected(`${key}${seat}`) ? "#318beb" : isSeatAvailable(`${key}${seat}`) ? "#fff" : "#b6b4b4",
                                cursor: isSeatAvailable(`${key}${seat}`) ? "pointer" : "not-allowed"
                            }}
                            key={seat}
                            onClick={() => isSeatAvailable(`${key}${seat}`) && selectedSeat(`${key}${seat}`)} // Only call if available
                        >
                            {key} {seat}
                        </TicketItem>
                    ))}
                </div>
            ) : (
                <TicketItem
                    style={{
                        width: seatWidth,
                        background: isSeatSelected(`${key}${seats}`) ? "#318beb" : isSeatAvailable(`${key}${seats}`) ? "#fff" : "#b6b4b4",
                        cursor: isSeatAvailable(`${key}${seats}`) ? "pointer" : "not-allowed"
                    }}
                    key={key}
                    onClick={() => isSeatAvailable(`${key}${seats}`) && selectedSeat(`${key}${seats}`)} // Only call if available
                >
                    {key} {seats}
                </TicketItem>
            )
        );

    return (
        <Container>
            <h2>{selectedBus.name}</h2>
            <h4>Tickets</h4>
            <h5>{selectedBus.busType}</h5>
            <div className="d-flex">
                <div className="d-flex ms-2 align-items-center">
                    <h6>Available -</h6>
                    <TicketItem style={{ width: seatWidth, background: "#006400", color: "white" }}>
                        1
                    </TicketItem>
                </div>
                <div className="d-flex ms-2 align-items-center">
                    <h6>Booked -</h6>
                    <TicketItem style={{ width: seatWidth, background: "#DC143C", color: "white" }}>
                        1
                    </TicketItem>
                </div>
                <div className="d-flex ms-2 align-items-center">
                    <h6>Selected -</h6>
                    <TicketItem style={{ width: seatWidth, background: "#318beb", color: "white" }}>
                        1
                    </TicketItem>
                </div>
            </div>
            <ul className="d-flex flex-wrap">
                {isSleeper ? (
                    <>
                        <TicketContainer className="d-flex align-items-center">
                            <h6 className="p-3">Upper</h6>
                            <div className="d-flex flex-wrap">
                                {generateSeats(selectedBus.seatLayout.upper.first, "U")}
                                <div className="d-flex mt-4">
                                    {generateSeats(selectedBus.seatLayout.upper.second, "U")}
                                </div>
                            </div>
                        </TicketContainer>
                        <TicketContainer className="d-flex align-items-center">
                            <h6 className="p-3">Lower</h6>
                            <div className="d-flex flex-wrap">
                                {generateSeats(selectedBus.seatLayout.lower.first, "L")}
                                <div className="d-flex mt-4">
                                    {generateSeats(selectedBus.seatLayout.lower.second, "L")}
                                </div>
                            </div>
                        </TicketContainer>
                    </>
                ) : (
                    <TicketContainer className="d-flex align-items-center">
                        <div>Seater</div>
                        <div>
                            {generateSeats(selectedBus.seatLayout.first)}
                            <div className="mt-4">
                                {generateSeats(selectedBus.seatLayout.second)}
                            </div>
                        </div>
                    </TicketContainer>
                )}
            </ul>
            <div className="d-flex justify-content-center">
                {selectedSeats?.length > 0 && <h4>Selected Seats - {selectedSeats.join(",")}</h4>}
            </div>
            <div>
               <Button   id="blue" onClick={()=> navigate("/bus/book")} disabled={!(selectedSeats && selectedSeat?.length>0)}>Book Now</Button>
            </div>
        </Container>
    );
}