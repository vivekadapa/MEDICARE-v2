import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const MedicineInfo = () => {
    const location = useLocation();
    const id = location.pathname.slice(19);
    const [medicine, setMedicine] = useState({});
    const [active, setActive] = useState('I');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/medicines.json');
                const data = await response.json();
                const med = data.find((med) => med.Id == id);
                setMedicine(med);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className='my-16 min-h-screen max-w-4xl mx-auto'>
            {medicine != null ? (
                <>
                    <h1 className='text-3xl font-bold mb-4'>{medicine.name}</h1>
                    <motion.div
                        initial={{ opacity: 0, x: '20%'}}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}>
                        <p className='px-2'>{medicine.description}</p>
                    </motion.div>
                    <div className='my-4 flex justify-around border-b-2'>
                        {['I', 'H', 'S', 'B'].map((section) => (
                            <motion.button
                                key={section}
                                onClick={() => setActive(section)}
                                whileHover={{ scale: 1.1, textShadow: '0px 0px 8px rgb(255, 255, 255)' }}
                                className={`px-4 py-2  duration-300 transition-all ${active === section ? 'bg-teal-500 text-white rounded font-semibold' : ''
                                    }`}
                            >
                                {section === 'I' && 'Introduction'}
                                {section === 'H' && 'How To Use'}
                                {section === 'S' && 'Safety Advice'}
                                {section === 'B' && 'Benefits'}
                            </motion.button>
                        ))}
                    </div>

                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className={`my-6 ${active !== 'S' ? 'hidden' : 'block'}`}>
                            <p>{medicine.safety_advise}</p>
                        </div>
                        <div className={`my-6 ${active !== 'B' ? 'hidden' : 'block'}`}>
                            <p>{medicine.benefits}</p>
                        </div>
                        <div className={`my-6 ${active !== 'H' ? 'hidden' : 'block'}`}>
                            <p>{medicine.how_to_use}</p>
                        </div>
                        <div className={`my-6 ${active !== 'I' ? 'hidden' : 'block'}`}>
                            <p>{medicine.introduction}</p>
                        </div>
                    </motion.div>
                </>
            ) : (
                <p className='text-xl'>Medicine not found</p>
            )}
        </div>
    );
};


