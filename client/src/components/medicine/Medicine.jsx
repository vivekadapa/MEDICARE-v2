import { useState, useEffect } from 'react';
import MedicineCard from './MedicineCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/MedicineSlice';
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
export const Medicines = () => {
    const [medicines, setMedicines] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedMedicines, setSearchedMedicines] = useState([]);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const handleAddToCart = (medicine) => {
        dispatch(addToCart(medicine));
    };

    function handleSearch(e) {
        const input = e.target.value;
        setSearchInput(input);
        if (input.trim() !== '') {
            searchMedicines(input);
        } else {
            setSearchedMedicines([]);
        }
    }

    function searchMedicines(input) {
        const searchedMedicines = medicines.filter((medicine) => {
            return medicine.name.toLowerCase().includes(input.toLowerCase());
        });
        setSearchedMedicines(searchedMedicines);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/medicine/getMedicines`)
                setLoading(true)
                console.log(response)
                setMedicines(response.data.data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='my-8 py-4 px-8 max-[480px]:px-1 -z-10'>
                <div className='text-center relative w-96 mx-auto max-[400px]:w-64'>
                    <IoSearchOutline className='text-xl absolute top-[50%] left-4 -translate-y-1/2' />
                    <input type="text" placeholder='Search For Medicines....' className='px-12 py-2 border-2 border-teal-700 rounded-md w-96 outline-none max-[400px]:w-64' onChange={(e) => handleSearch(e)} />
                </div>

                {
                    loading ? (
                        <div className='flex items-center min-h-[75vh] justify-center my-4'>
                            <div className='grid grid-cols-3 max-[1435px]:grid-cols-2 max-[1435px]:place-items-center items-center max-[1000px]:grid-cols-1 gap-x-16 gap-y-8'>
                                {[...Array(15)].map((_, index) => ( // Repeat loading component 15 times
                                    <div className='flex w-[450px] flex-col justify-around rounded-[0.25rem] shadow-xl h-[24rem] max-[400px]:h-auto max-[400px]:gap-4 hover:scale-105 duration-300 transition-all'>
                                        {/* Skeleton Animation */}
                                        <div className="w-full h-[6rem] px-4 py-2 bg-gray-300 animate-pulse rounded-t-[0.5rem]"></div>

                                        <div className='px-4 flex flex-wrap justify-between items-center'>
                                            <div className="w-1/3 h-[3rem] bg-gray-300 animate-pulse"></div>
                                            <div className='flex items-center gap-1'>
                                                {/* <div className="w-6 h-6 bg-gray-300 animate-pulse"></div> */}
                                                <div className="w-28 h-[2rem] bg-gray-300 animate-pulse"></div>
                                            </div>
                                        </div>

                                        <div className='px-4'>
                                            <div className="w-full h-[2rem] bg-gray-300 animate-pulse rounded-md"></div>
                                        </div>

                                        <div className='flex px-4 flex-wrap justify-between items-center'>
                                            <div className="w-1/3 h-[2rem] bg-gray-300 animate-pulse rounded-md"></div>
                                            <div className="flex items-center">
                                                {/* <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div> */}
                                                <div className="w-12 h-[2rem] bg-gray-300 animate-pulse rounded-md"></div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className="w-full h-[4rem] bg-gray-300 animate-pulse rounded-md"></div>
                                            <div className='flex py-2 flex-wrap justify-center gap-8'>
                                                <div className="w-[8rem] h-10 bg-gray-500 animate-pulse rounded-md"></div>
                                                <div className={`w-[8rem] h-10 bg-gray-500 animate-pulse rounded-md`}></div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>

                        </div>
                    ) : (
                        <div className={searchedMedicines.length === 0 ? 'flex items-center min-h-[75vh] justify-center my-4' : 'my-4'}>
                            {
                                searchInput === '' ? (
                                    <div className="grid grid-cols-3 max-[1435px]:grid-cols-2 max-[1435px]:place-items-center items-center max-[1000px]:grid-cols-1 gap-x-16 gap-y-8">
                                        {medicines.map((medicine, index) => (
                                            <MedicineCard key={index} medicineData={medicine} onAddToCart={() => handleAddToCart(medicine)} isAddedToCart={isAddedToCart} setIsAddedToCart={setIsAddedToCart} />
                                        ))}
                                    </div>
                                ) : (
                                    searchedMedicines.length > 0 ? (
                                        <div className="grid grid-cols-3 max-[1435px]:grid-cols-2 max-[1435px]:place-items-center items-center max-[1000px]:grid-cols-1 gap-x-16 gap-y-8">
                                            {searchedMedicines.map((medicine, index) => (
                                                <MedicineCard key={index} medicineData={medicine} onAddToCart={() => handleAddToCart(medicine)} isAddedToCart={isAddedToCart} setIsAddedToCart={setIsAddedToCart} />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className='text-xl'>No matching medicines found</p>
                                    )
                                )
                            }
                        </div>)
                }


            </div>

        </>
    );
};
