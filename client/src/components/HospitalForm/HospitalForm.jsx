import { useState } from 'react';
import { IoMdCheckmark, IoIosPin, IoIosCall, IoMdMail, IoIosKey, IoIosShareAlt, IoIosPeople } from 'react-icons/io';
import { GiHospital } from 'react-icons/gi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HospitalForm = () => {
    const [errors, setErrors] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        doctors: '',
        patients: '',
        pinCode: '',
        socials: [],
    });


    const showToast = (message, type) => {
        toast[type](message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const [hospitalName, setHospitalName] = useState('');
    const [location, setLocation] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [doctors, setDoctors] = useState('');
    const [patients, setPatients] = useState('');
    const [email, setEmail] = useState('');
    const [pinCode, setPincode] = useState('');
    const [socials, setSocials] = useState([{ name: '', url: '' }]);

    const handleNameChange = (e) => {
        setHospitalName(e.target.value);
    };

    const locationChange = (e) => {
        setLocation(e.target.value);
    };

    const contactChange = (e) => {
        setContactNumber(e.target.value);
    };

    const emailChange = (e) => {
        setEmail(e.target.value);
    };



    const pinCodeChange = (e) => {
        setPincode(e.target.value);
    };

    const handleDoctorsCountChange = (e) => {
        setDoctors(e.target.value);
    };

    const handlePatientsCountChange = (e) => {
        setPatients(e.target.value);
    };


    const handleSocialNameChange = (index, value) => {
        const updatedSocials = [...socials];
        updatedSocials[index].name = value;
        setSocials(updatedSocials);
    };

    const handleSocialURLChange = (index, value) => {
        const updatedSocials = [...socials];
        updatedSocials[index].url = value;
        setSocials(updatedSocials);
    };


    const validate = (data) => {
        const newErrors = {};

        for (const item in data) {
            const value = Array.isArray(data[item]) ? data[item] : String(data[item]);

            if (Array.isArray(value)) {
                if (value.length === 0) {
                    newErrors[item] = `${item.charAt(0).toUpperCase() + item.slice(1)} can't be empty`;
                }
            } else {
                if (item === 'socials') {
                    // Handle "socials" as an array of objects
                    const socialErrors = value.map((social, index) => {
                        if (!social.name || !social.url) {
                            return `Social Media ${index + 1}: Both name and URL are required`;
                        }
                        return null;
                    });
                    newErrors[item] = socialErrors.filter((error) => error !== null);
                } else if (value.trim().length === 0) {
                    newErrors[item] = `${item.charAt(0).toUpperCase() + item.slice(1)} can't be empty`;
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };






    const handleSubmit = (e) => {
        e.preventDefault();

        const details = {
            name: hospitalName,
            address: location,
            phoneNumber: contactNumber,
            email: email,
            pinCode: pinCode,
            doctors: doctors,
            patients: patients,
            socials: socials,
            timestamp: Date.now(),
            status: 'pending',
        };

        if (validate(details)) {
            fetch(`${import.meta.env.VITE_API_BASE_URL}/hospital/createHospital`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Data submitted successfully:', data);

                    if (data.success) {
                        showToast('Hospital registration request successful, wait for approval!', 'success');
                        setHospitalName('');
                        setLocation('');
                        setContactNumber('');
                        setEmail('');
                        setPincode('');
                        setDoctors(''),
                            setPatients(''),
                            setSocials([{ name: '', url: '' }]);
                    } else {
                        console.log('Failed to register hospital:', data.message);
                        showToast('Failed to register hospital', 'error');
                    }
                })
                .catch((err) => {
                    console.log('Error', err);
                    showToast('Error submitting data', 'error');
                });
        }
    };

    return (
        <div className="flex items-center min-h-[82vh] ">
            <div className="flex-1 h-full max-w-4xl mx-auto bg-zinc-100 rounded-lg shadow-xl">
                <div className="flex items-center justify-center p-6 sm:p-12">
                    <div className="w-full">
                        <h3 className="mb-4 text-2xl font-bold text-teal-600">Hospital Registration</h3>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Section 1: Hospital Information */}
                            <div className="">

                                <div className="flex items-center  border-b-2 border-teal-500 py-2">
                                    <GiHospital className="text-teal-500 mr-2" />
                                    <input
                                        className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${errors.name ? "border-red-500" : ""}`}
                                        placeholder="Enter Hospital Name"
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={hospitalName}
                                        onChange={handleNameChange}
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* Section 2: PIN Code */}
                            <div className="">

                                <div className="flex items-center border-b-2 border-teal-500 py-2">
                                    <IoIosKey className="text-teal-500 mr-2" />
                                    <input
                                        className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${errors.pinCode ? "border-red-500" : ""}`}
                                        placeholder="Enter PIN Code"
                                        type="number"
                                        id="pinCode"
                                        name="pinCode"
                                        required
                                        value={pinCode}
                                        onChange={pinCodeChange}
                                    />
                                </div>
                                {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode}</p>}
                            </div>

                            {/* Section 3: Address */}
                            <div className="">

                                <div className="flex items-center border-b-2 border-teal-500 py-2">
                                    <IoIosPin className="text-teal-500 mr-2" />
                                    <input
                                        className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${errors.address ? "border-red-500" : ""}`}
                                        placeholder="Enter Address"
                                        type="text"
                                        id="address"
                                        name="address"
                                        required
                                        value={location}
                                        onChange={locationChange}
                                    />
                                </div>
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>

                            {/* Section 4: Email */}
                            <div className="">

                                <div className="flex items-center border-b-2 border-teal-500 py-2">
                                    <IoMdMail className="text-teal-500 mr-2" />
                                    <input
                                        className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${errors.email ? "border-red-500" : ""}`}
                                        placeholder="Enter Email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={email}
                                        onChange={emailChange}
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            {/* Section 5: Contact Number */}
                            <div className="">

                                <div className="flex items-center border-b-2 border-teal-500 py-2">
                                    <IoIosCall className="text-teal-500 mr-2" />
                                    <input
                                        className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${errors.phoneNumber ? "border-red-500" : ""}`}
                                        placeholder="Enter Contact Number"
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        pattern="[0-9]{10}"
                                        title="Please enter a valid 10-digit phone number"
                                        required
                                        value={contactNumber}
                                        onChange={contactChange}
                                    />
                                </div>
                                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                            </div>

                            {/* Section 9: Doctors */}
                            <div className="">
                                <div className="flex items-center border-b-2 border-teal-500 py-2">
                                    <IoIosPeople className="text-teal-500 mr-2" />
                                    <input
                                        type="number"
                                        id="numDoctors"
                                        name="numDoctors"
                                        required
                                        value={doctors}
                                        placeholder="Number of doctors"
                                        onChange={handleDoctorsCountChange}
                                        className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${errors.doctors ? "border-red-500" : ""}`}
                                    />
                                </div>
                                {errors.doctors && errors.doctors.map((doctorError, index) => (
                                    doctorError && <p key={index} className="text-red-500 text-sm mt-1">{doctorError}</p>
                                ))}
                            </div>

                            {/* Section 10: Patients */}
                            <div className="">
                                <div className="flex items-center border-b-2 border-teal-500 py-2">
                                    <IoIosPeople className="text-teal-500 mr-2" />
                                    <input
                                        type="number"
                                        value={patients}
                                        onChange={handlePatientsCountChange}
                                        id="numPatients"
                                        name="numPatients"
                                        required
                                        placeholder="Number of Patients"
                                        className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${errors.patients ? "border-red-500" : ""}`}
                                    />
                                </div>
                                {errors.patients && errors.patients.map((patientError, index) => (
                                    patientError && <p key={index} className="text-red-500 text-sm mt-1">{patientError}</p>
                                ))}
                            </div>


                            {/* Section 7: Social Media Link */}
                            <div className="flex items-center border-b-2 border-teal-500 py-2">
                                <IoIosShareAlt className="text-teal-500 mr-2" />
                                <div className="flex gap-3">
                                    <input
                                        className={`px-4 py-2 focus:border-teal-400 focus:outline-none border-none focus:ring-1 focus:ring-teal-600 rounded-md ${errors.socials ? "border-red-500" : ""}`}
                                        placeholder="Social Media Name"
                                        type="text"
                                        id={`socialName${0}`}  // Use a unique ID for each input
                                        name={`socialName${0}`}  // Use a unique name for each input
                                        required
                                        onChange={(e) => handleSocialNameChange(0, e.target.value)}
                                    />
                                    <input
                                        className={` py-2 focus:border-teal-400 focus:outline-none border-none focus:ring-1 focus:ring-teal-600 rounded-md ${errors.socials ? "border-red-500" : ""}`}
                                        placeholder="Social Media URL"
                                        type="text"
                                        id={`socialURL${0}`}  // Use a unique ID for each input
                                        name={`socialURL${0}`}  // Use a unique name for each input
                                        required
                                        onChange={(e) => handleSocialURLChange(0, e.target.value)}
                                    />
                                </div>
                            </div>
                            {errors.socials && errors.socials.map((socialError, index) => (
                                <p key={index} className="text-red-500 text-sm mt-1">{socialError}</p>
                            ))}



                            {/* Section 8: Submit Button */}
                            <div className="flex justify-center">
                                <button
                                    className="flex px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Register <IoMdCheckmark className="ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default HospitalForm;
