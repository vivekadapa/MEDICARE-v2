import React from 'react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MedicineCard = ({ medicineData, onAddToCart, isAddedToCart, setIsAddedToCart }) => {
    const {
        Id,
        name,
        description,
        primary_use,
        safety_advise,
        prescription_required,
        manufactures,
        medicine_type,
        stock,
        MRP,
        Packaging,
        ProductForm,
        benefits,
        bought,
        how_to_use,
        introduction,
        Column16,
        Column15,
        salt_composition,
    } = medicineData;

    console.log(bought)
    const [open, setOpen] = useState(false)
    const isOutOfStock = stock !== 'In Stock';
    const truncatedPrimaryUse = typeof primary_use === 'string' ? primary_use.slice(0, 50) : '';

    const handleAddToCart = () => {
        onAddToCart();
        setIsAddedToCart(true);

        setTimeout(() => {
            setIsAddedToCart(false);
        }, 2000);
        toast.success("Added to Cart", { autoClose: 1000 });
    };

    return (
        <> {
            name !== 'name' ? (
                <div className='flex flex-col justify-around rounded-[0.25rem] shadow-xl max-[1435px]:w-full h-[24rem] max-[400px]:h-auto max-[400px]:gap-4 hover:scale-[1.01] duration-300 transition-all'>
                    <div className='p-4 flex flex-col gap-4 bg-teal-700 rounded-t-[0.5rem]'>
                        <div className='flex justify-between text-white items-center'>
                            <h1 className='text-xl'>{name}</h1>
                            <img src={isOutOfStock ? "/sold-out.png" : "/stock.png"} alt="" className='w-8' />
                        </div>
                        <p className='text-normal text-white font-semibold'>{truncatedPrimaryUse}
                            <span>{(primary_use ?? '').length > 50 && '...'}</span>
                        </p>
                    </div>

                    <div className='px-4 flex flex-wrap justify-between items-center'>
                        <p>In {ProductForm} Form</p>
                        <div className='flex items-center gap-1'>
                            <img src="/prescription.svg" alt="" className='w-6' />
                            <p>{prescription_required === 'Prescription Required' ? 'Prescription Required' : 'Can use Without prescription'}</p>
                        </div>
                    </div>

                    <div className='px-4'>
                        <p>Contains {Packaging}</p>
                    </div>
                    <div className='flex px-4 flex-wrap justify-between items-center'>
                        <p className='text-sm'> © {manufactures}</p>
                        <div>
                            <span className='text-xl'>₹</span>
                            <span className='text-2xl'>{MRP}</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>


                        <div className='flex justify-center items-center'>
                            <img src="/boughtby.png" alt="" className='w-6' />
                            <p className='text-sm'>{medicine_type}</p>
                        </div>


                        <div className='flex py-2 flex-wrap justify-center gap-8'>
                            <Link to={`info/${Id}`} className='px-4 py-2 bg-yellow-500 rounded text-white hover:bg-yellow-600 duration-300 transition-all hover:scale-105'>More Info</Link>
                            <button
                                onClick={() => {
                                    handleAddToCart()
                                }}
                                className={`px-4 py-2 bg-teal-500 rounded text-white ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-400 duration-300 transition-all hover:scale-105'}`}
                                disabled={isOutOfStock}
                            >
                                Add to Cart
                            </button>
                        </div>

                    </div>
                </div>
            ) : ("")
        }
        </>
    );
};

export default MedicineCard;
