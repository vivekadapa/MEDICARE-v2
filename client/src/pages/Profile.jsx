import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { PiUserCircleLight } from "react-icons/pi";
import { toast } from 'react-toastify';

export const Profile = () => {
  const { user, token, setUser } = useAuth();
  console.log(user);
  console.log(token);

  const [newUser, setNewUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    bloodType: user?.bloodType || "",
  });

  useEffect(() => {
    setNewUser({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      bloodType: user?.bloodType || "",
    });
  }, [user, token]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/updateprofile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newUser }),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setUser((prevUser) => ({ ...prevUser, ...newUser }));
        toast.success("Updated Profile Details")
      } else {
        toast.error("Failed to update profile details")
        console.log("User Update Failed");
      }
    } catch (error) {
      console.log(error);
      console.log("User Update Failed");
    }
  };

  return (
    <div>
      <h1 className="text-center mt-4 text-3xl font-semibold">User Profile</h1>
      {user ? (
        <div className="mt-8 w-[75vw] min-h-[75vh] flex justify-center items-center">
          <div className="p-4 sm:w-[480px] w-full flex items-center flex-col gap-4 shadow-2xl">
            <span className="text-5xl mx-auto">
              {user.photo ? (
                <img
                  src={user.photo}
                  className="rounded-full w-24 h-24"
                  alt="profile-pic"
                />
              ) : (
                <PiUserCircleLight className="w-24 h-24" />
              )}
            </span>
            <div className="flex gap-4 items-center">
              <label htmlFor="name" className="text-lg">
                Username:
              </label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                className="px-4 py-2 border-1 rounded-md  w-64"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="flex gap-[3.35rem] items-center">
              <label htmlFor="email" className="text-lg">
                Email:
              </label>
              <input
                type="text"
                name="email"
                value={newUser.email}
                className="px-4 py-2 border-1 rounded-md  w-64"
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="flex gap-[2.9rem] items-center">
              <label htmlFor="phone" className="text-lg ">
                Phone:
              </label>
              <input
                type="text"
                name="phone"
                value={newUser.phone}
                placeholder="Enter Your Phone Number"
                className="px-4 py-2 border-1 rounded-md  w-64"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="flex gap-[2.5rem] items-center">
              <label htmlFor="gender" className="text-lg">
                Gender:
              </label>
              <select
                name="gender"
                value={newUser.gender}
                className="px-4 py-2 border-1 rounded-md  w-64"
                onChange={(e) => handleInputChange(e)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex gap-[3.3rem] items-center">
              <label htmlFor="bloodType" className="text-lg">
                Blood:
              </label>
              <select
                name="bloodType"
                value={newUser.bloodType}
                className="px-4 py-2 border-1 rounded-md  w-64"
                onChange={(e) => handleInputChange(e)}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <button
              className="my-4 bg-teal-500 text-white px-4 py-2 rounded-md"
              onClick={handleUpdateProfile}
            >
              Update Details
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
