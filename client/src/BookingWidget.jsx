import { useContext, useEffect, useState } from "react"
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";


export default function BookingWidget({place}) {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(()=>{
        setName(user.name);
    }, [user]);

    let numberOfNight = 0;
    if( checkIn && checkOut) {
        numberOfNight = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace(){
        const response = await axios.post('/bookings', {
            place:place._id, checkIn, checkOut, 
            numberOfGuests, name, phone, 
            price: numberOfNight * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/booking/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <>
             <div className="bg-white shadow p-4 rounded-2xl">
                <div className="text-2xl text-center">
                    Price: ${place.price} / per night
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className="py-3 px-4">
                            <label>CHECK-IN:</label>
                            <input type="date" 
                            value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                        </div>
                        <div className="py-3 px-4 border-l">
                            <label>CHECK-OUT:</label>
                            <input type="date" 
                            value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                        </div>
                    </div>
                    <div className="py-3 px-4 border-t">
                            <label>GUESTS:</label>
                            <input type="number" 
                            value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)}/>
                    </div>
                    { numberOfNight > 0 && (
                        <div className="py-3 px-4 border-t">
                            <label>Your full name:</label>
                            <input type="text" 
                            value={name} onChange={ev => setName(ev.target.value)}/>
                            <label>Phone number:</label>
                            <input type="tel" 
                            value={phone} onChange={ev => setPhone(ev.target.value)}/>
                        </div>
                    )}
                </div>
                <button onClick={bookThisPlace} className="primary mt-4">
                    Book this place
                    { numberOfNight > 0 && (
                        <span> ${ numberOfNight * place.price}</span>
                    )}
                </button>
            </div>
        </>
    )
}