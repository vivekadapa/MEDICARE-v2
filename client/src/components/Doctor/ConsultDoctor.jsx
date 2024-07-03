import { useEffect, useState } from 'react'
import DoctorCard from './DoctorCard';
import Rating from 'react-rating-stars-component';



export const ConsultDoctor = () => {

    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/getallconsultdoctors?isApproved=approved`)
                const data = await response.json();
                console.log(data);
                setDoctors(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDoctors();
    }, [])

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSpecializationFilter = (e) => {
        setSelectedSpecialization(e.target.value);
    };

    const filteredDoctors = doctors.filter((doctor) => {
        const nameMatches = doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
        const specializationMatches =
            selectedSpecialization === '' ||
            doctor.specialization.toLowerCase() === selectedSpecialization.toLowerCase();
        return nameMatches && specializationMatches;
    });


    return (
        <>
            <div className='flex min-h-[86vh] gap-20 px-16  max-[1200px]:flex-col-reverse items-center justify-center'>
                <div className='w-[40%] max-[600px]:w-full max-[1200px]:w-[80%] flex flex-col gap-4'>
                    <h1 className='text-4xl'>Consult Your Doctor</h1>
                    <p>Discover expert healthcare at your fingertips. Connect with certified doctors for personalized consultations and medical guidance.Empower your well-being with convenient access to professional advice. Our platform ensures confidential and cost-effective healthcare solutions tailored to your needs.</p>
                    <div className='flex gap-4'>
                        {/* <a href='#doctors' className='bg-teal-700 px-4 py-2 rounded-md text-white w-32'>
                            <ScrollLink to='doctors' smooth={true} duration={500}>
                                Consult Now
                            </ScrollLink>
                        </a> */}
                    </div>

                </div>
                <div className='w-[50%] max-[600px]:w-full max-[1200px]:w-[80%]'>
                    <img src="/doctors.png" alt="" />
                </div>
            </div>
            <div className={`flex max-[1000px]:flex-wrap gap-4 max-[1000px]:gap-12 items-center px-12 py-12 bg-slate-600 text-white`}>
                <div className='w-1/4 max-[1000px]:w-full flex flex-col items-center gap-2'>
                    <img src="/protection.png" alt="" className='w-40' />
                    <h1 className='text-2xl'>100% Confidential</h1>
                    <p className='text-sm text-center'>All advice & consultations are completely confidential. You can also delete chats whenever you want.</p>
                </div>
                <div className='w-1/4 max-[1000px]:w-full flex flex-col items-center gap-2 '>
                    <img src="/badge.png" alt="" className='w-40' />
                    <h1 className='text-2xl'>Certified Doctors</h1>
                    <p className='text-sm text-center'>We offer quality healthcare through our network of certified and experienced doctors.</p>
                </div>
                <div className='w-1/4 max-[1000px]:w-full flex flex-col items-center gap-2'>
                    <img src="/24-hour-service.png" alt="" className='w-40' />
                    <h1 className='text-2xl'>Convenience</h1>
                    <p className='text-sm text-center'>Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.</p>
                </div>
                <div className='w-1/4 max-[1000px]:w-full flex flex-col items-center gap-2'>
                    <img src="/profits.png" alt="" className='w-40' />
                    <h1 className='text-2xl'>Cost Effective</h1>
                    <p className='text-sm text-center'>We provide medical assistance on non urgent queries for free. Fee starting at ₹50 for faster response to queries.</p>
                </div>
            </div>
            <div id='doctors' className='my-8 px-4 sm:px-16 mx-auto sm:mx-0'>
                <h1 className='text-2xl font-semibold my-4'>Find Doctors</h1>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex-col items-center sm:gap-4 sm:flex sm:flex-row">
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="px-3 w-full py-2 border border-gray-300 rounded"
                        />
                        <select
                            value={selectedSpecialization}
                            onChange={handleSpecializationFilter}
                            className="px-3 w-full mt-4 sm:mt-0 py-2 border border-gray-300 rounded"
                        >
                            <option value="">All Specializations</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Internal Medicine">Internal Medicine</option>
                            <option value="Obstetrics and Gynecology">
                                Obstetrics and Gynecology
                            </option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Radiology">Radiology</option>
                            <option value="General Surgery">General Surgery</option>
                            <option value="Ophthalmology">Ophthalmology</option>
                            <option value="Family Medicine">Family Medicine</option>
                            <option value="Chest Medicine">Chest Medicine</option>
                            <option value="Anesthesia">Anesthesia</option>
                            <option value="Pathology">Pathology</option>
                            <option value="ENT">ENT</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-center">
                    {filteredDoctors.length ? (
                        filteredDoctors.map((doctor, index) => (
                            <DoctorCard key={index} doctor={doctor} />
                        ))
                    ) : (
                        <p>No matching doctors found.</p>
                    )}
                </div>

            </div>
        </>
    )
}
