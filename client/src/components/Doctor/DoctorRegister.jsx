import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DoctorRegister = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    qualification: "",
    phone: "",
    photo: null,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateName = (value) => {
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!nameRegex.test(value)) {
      setUserNameError("Name should only contain alphabets and spaces.");
      return false;
    } else {
      setUserNameError("");
      return true;
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address (e.g  jonh@gmail.com)");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (value) => {
    const isValidPassword =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value);

    if (!isValidPassword) {
      setPasswordError(
        "Password must contain at least 6 characters with one uppercase letter, one number, and one special character."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(value)) {
      setPhoneNumberError("Please enter a valid 10-digit phone number");
      return false;
    } else {
      setPhoneNumberError("");
      return true;
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value)
      validateName(value);
    }
    if (name === "email") {
      setEmail(value);
      validateEmail(value);
    }
    if (name === "password") {
      setPassword(value);
      validatePassword(value);
    }
    if (name == "confirmPassword") {
      setConfirmPassword(value);
      validateConfirmPassword(value);
    }
    if (name === "phoneNumber") {
      setPhoneNumber(value);
      validatePhoneNumber(value);
    }

    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      photo: file,
    }));
  };

  const registerDoctor = async () => {
    try {


      const isNameValid = validateName(name);
      const isEmailValid = validateEmail(email);
      const isPasswordValid = validatePassword(password);
      const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
      const isPhoneNumberValid = validatePhoneNumber(phoneNumber);

      if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isPhoneNumberValid) {
        toast.error("Please fix the validation errors before submitting.");
        return;
      }



      const formData = new FormData();
      formData.append("name", doctor.name);
      formData.append("email", doctor.email);
      formData.append("password", doctor.password);
      formData.append("role", "doctor");
      formData.append("specialization", doctor.specialization);
      formData.append("qualification", doctor.qualification);
      formData.append("phone", doctor.phone);
      formData.append("photo", doctor.photo);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex items-center min-h-[86vh] ">
      <div className="flex-1 h-full max-w-2xl mx-auto bg-zinc-100 rounded-lg shadow-xl ">
        <div className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full">
            <h3 className="mb-4 text-2xl font-bold text-teal-600">Sign up</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <label className="block text-sm my-2">Username</label>

                <input
                  type="text"
                  name="name"
                  value={doctor.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${userNameError ? "border-red-500" : ""
                    }`}
                  placeholder="Enter Username"
                />
                {userNameError && (
                  <p className="text-red-500 text-sm mt-1">{userNameError}</p>
                )}
              </div>
              <div className="">
                <label className="block text-sm my-2">Email</label>
                <input
                  type="text"
                  name="email"
                  value={doctor.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${emailError ? "border-red-500" : ""
                    }`}
                  placeholder="Enter Email"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <div className="">
                <label htmlFor="specialization" className="text-sm">
                  Specialization
                </label>
                <select
                  className="px-4 py-2 rounded-md w-full mt-2 max-[600px]:w-full outline-none"
                  onChange={handleChange}
                  name="specialization"
                  required
                >
                  <option value="" defaultValue>
                    Specialization
                  </option>
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
              <div className="">
                <label htmlFor="qualifications" className="text-sm">
                  Qualification
                </label>
                <select
                  className="px-4 py-2 rounded-md w-full mt-2 max-[600px]:w-full outline-none"
                  onChange={handleChange}
                  name="qualification"
                  required
                >
                  <option value="" defaultValue>
                    Qualification
                  </option>
                  <option value="RMP">RMP</option>
                  <option value="MBBS">MBBS</option>
                  <option value="MS">MS</option>
                  <option value="MD">MD</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="">
                <label className="block text-sm my-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={doctor.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${passwordError ? "border-red-500" : ""
                    }`}
                  placeholder="Enter Password"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              <div className="">
                <label className="block text-sm my-2"> Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={doctor.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${confirmPasswordError ? "border-red-500" : ""
                    }`}
                  placeholder="Confirm Password"
                />

                {confirmPasswordError && (
                  <p className="text-red-500 text-sm mt-1">
                    {confirmPasswordError}
                  </p>
                )}

              </div>
              <div className="">
                <label className="block text-sm my-2">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={doctor.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${phoneNumberError ? "border-red-500" : ""
                    }`}
                  placeholder="Enter Phone Number"
                />
                {phoneNumberError && (
                  <p className="text-red-500 text-sm mt-1">
                    {phoneNumberError}
                  </p>
                )}
              </div>

              <div className="">
                <label className="block text-sm my-2">Profile Picture</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center">
              <button
                className="px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none"
                onClick={registerDoctor}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
