import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useAuth } from '../../AuthContext';
import { useLocation } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';


const SlotManager = () => {
    const { user, setUser } = useAuth();
    const location = useLocation();
    console.log(location.state);

    const initialDaySlots = user && user.timeSlots ? user.timeSlots : [];

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [daySlots, setDaySlots] = useState(initialDaySlots);
    const cookies = new Cookies();
    const token = cookies.get('TOKEN');
    console.log(token);

    const handleAddSlot = () => {
        if (startTime && endTime) {
            const newSlot = {
                startTime,
                endTime,
            };
            const slotExists = daySlots.some(
                (slot) => slot.startTime === newSlot.startTime && slot.endTime === newSlot.endTime
            );

            if (!slotExists) {
                setDaySlots([...daySlots, newSlot]);
            }

            setStartTime('');
            setEndTime('');
        }
    };

    const handleRemoveSlot = (index) => {
        const updatedSlots = [...daySlots];
        updatedSlots.splice(index, 1);
        setDaySlots(updatedSlots);
    };

    const [bio, setbio] = useState("");
    const [ticketPrice, setTicketPrice] = useState(user?.ticketPrice);


    const handleBioAndPrice = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/addbio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ bio, ticketPrice })
            })
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                // setUser(data.doctor);
                console.log(data);
            }
            else {
                const errorData = await response.json();
                toast.error(errorData.message);
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log(error);
        }
        console.log("Submitted form");
    }

    useEffect(() => {
        const initialDaySlots = user && user.timeSlots ? user.timeSlots : [];
        setDaySlots(initialDaySlots);
    }, [user]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/manageslots`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ daySlots }),
            });

            console.log(response);

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                setUser(data.doctor)
                console.log(data);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message);
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='flex flex-col min-h-[90vh] w-[75vw] items-center justify-center'>
            <h1 className='text-xl'>Additional Settings</h1>
            <div className='flex p-16 shadow-lg gap-8'>
                <div className='flex flex-col gap-2 px-8 py-4 max-w-lg shadow-md rounded-md '>
                    <h1 className='text-xl font-semibold text-center'>Manage Slots</h1>
                    {daySlots.length > 0 && (
                        <div>
                            <p className="my-2">Your Current Time Slots:</p>
                            <ul className="flex flex-wrap gap-4">
                                {daySlots.map((slot, index) => (
                                    <li key={index} className="flex text-center flex-wrap items-stretch gap-2 border border-green-300 shadow-md rounded-md">
                                        <p className='text-center flex items-center justify-center px-2'>{slot.startTime} - {slot.endTime}</p>
                                        <button onClick={() => handleRemoveSlot(index)} className="px-2 py-2 border-l-2 text-red-500 hover:text-white hover:bg-red-500 transition-colors duration-300">
                                            <MdDelete className='text-lg' />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="mt-4 flex flex-col gap-2">
                        <label className="block text-gray-700">Add New Time Slots:</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="border border-gray-300 p-2 rounded-md"
                            />
                            <span>-</span>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="border border-gray-300 p-2 rounded-md"
                            />
                        </div>
                        <button onClick={handleAddSlot} className="bg-blue-500 text-white p-2 rounded-md">
                            Add Slot
                        </button>
                        <button onClick={handleSubmit} className="bg-teal-700 text-white p-2 rounded-md">
                            Set Slots
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-2 shadow-lg p-4 min-h-[22rem] w-[350px]'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="ticketPrice" className='text-lg'>Enter token Price:</label>
                        <input type="number" min={10} max={5000} value={ticketPrice} name='ticketPrice' className='rounded-md placeholder:text-sm focus:border-teal-700 focus:border-1 outline-none border-none' placeholder='Enter your price for the appointment' onChange={(e) => {
                            setTicketPrice(e.target.value)
                        }} />
                    </div>
                    <h1 className='text-xl'>Set Your Bio:</h1>
                    <div className="relative w-72">
                        <textarea id="id-textarea" onChange={(e) => {
                            setbio(e.target.value)
                        }} name="id-textarea" placeholder="Write your bio" className="resize-none relative w-full h-[15rem] px-4 py-2 text-sm placeholder-transparent transition-all border-b outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white  focus:border-green-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400">
                        </textarea>
                        <label htmlFor="id-textarea" className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['00a0*']  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">Write your Bio</label>
                        <button className='bg-blue-500 px-4 py-2 text-white rounded-md block mx-auto' onClick={handleBioAndPrice}>Submit</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SlotManager;
