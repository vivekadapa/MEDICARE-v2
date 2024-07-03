import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { PiUserCircleLight } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { BiPurchaseTag } from "react-icons/bi";
import { FaUsersGear } from "react-icons/fa6";
import { GrDocumentVerified } from "react-icons/gr";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";

export const AccountSidebar = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const location = useLocation();

    console.log(user)

    const handleLogout = () => {
        cookies.remove("TOKEN");
        setUser(null);
        navigate("/", { replace: true });
    };

    return (
        <div>
            <div className="fixed">
                <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto border-r rtl:border-r-0 rtl:border-l bg-teal-800 dark:border-gray-700">
                    <Link to="/">
                        {/* <h1 className="text-white text-3xl font-bold">MEDICARE</h1> */}
                        <img className="w-48" src="MEDICARE-logos_white.png" />
                    </Link>

                    <div className="flex flex-col justify-between flex-1 mt-6">

                        <nav className="flex-1 -mx-3 space-y-3 ">
                            {user && user?.role === "doctor" && (
                                <>
                                    <Link className={`flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  ${location.pathname === ""}  hover:bg-gray-100  hover:text-gray-700`} to="/doctordashboard">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                                        </svg>
                                        <span className="mx-2 text-sm font-medium">Dashboard</span>
                                    </Link>

                                    <Link
                                        className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
                                        to="/newappointments"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                                            />
                                        </svg>
                                        <span className="mx-2 text-sm font-medium">
                                            New Appointments
                                        </span>
                                    </Link>

                                    <Link
                                        className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
                                        to="/approvedappointments"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                                            />
                                        </svg>
                                        <span className="mx-2 text-sm font-medium">
                                            Accepted Appointments
                                        </span>
                                    </Link>

                                    <Link className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700" to="/manageslots">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="mx-2 text-sm font-medium">Manage Slots</span>
                                    </Link>

                                    <Link
                                        className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
                                        to="/doctorprofile"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span className="mx-2 text-sm font-medium">
                                            Profile Setting
                                        </span>
                                    </Link>
                                </>
                            )}


                            {user && user?.role === "patient" && (
                                <>
                                    <Link className={`flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  ${location.pathname === ""}  hover:bg-gray-100  hover:text-gray-700`} to="/userdashboard">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                                        </svg>
                                        <span className="mx-2 text-sm font-medium">Dashboard</span>
                                    </Link>
                                    <Link className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700" to="/appointment-history">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                                            />
                                        </svg>
                                        <span className="mx-2 text-sm font-medium">Appointment History</span>
                                    </Link>

                                    <Link
                                        className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
                                        to="/medicine-history"
                                    >
                                        <BiPurchaseTag className="text-[1.25rem]" />
                                        <span className="mx-2 text-sm font-medium">
                                            Medicine Purchase History
                                        </span>
                                    </Link>

                                    {/* <Link
                                        className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
                                        to="/feedback-history"
                                    >
                                        <VscFeedback className="text-[1.25rem] mx-1" />
                                        <span className="mx-2 text-sm font-medium">
                                            Given Feedbacks
                                        </span>
                                    </Link> */}

                                    <Link
                                        className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
                                        to="/profile"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span className="mx-2 text-sm font-medium">
                                            Profile Settings
                                        </span>
                                    </Link>
                                </>
                            )}

                            {user && user?.role === "admin" && (
                                <>
                                    <Link
                                        className={`flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  ${location.pathname === ""
                                            }  hover:bg-gray-100  hover:text-gray-700`}
                                        to="/admin-dashboard"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                                            />
                                        </svg>
                                        <span className="mx-2 text-sm font-medium">Dashboard</span>
                                    </Link>

                                    <Link
                                        className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
                                        to="/users"
                                    >
                                        <FaUsersGear className="text-xl" />
                                        <span className="mx-2 text-sm font-medium">
                                            Manage Users
                                        </span>
                                    </Link>

                                    <Link
                                        className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
                                        to="/admin-verification"
                                    >
                                        <GrDocumentVerified className="text-lg" />
                                        <span className="mx-2 text-sm font-medium">
                                            Verification Requests
                                        </span>
                                    </Link>

                                    <Link
                                        className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
                                        to="/medicine-delivery-status"
                                    >
                                        <AiOutlineMedicineBox className="text-lg" />
                                        <span className="mx-2 text-sm font-medium">
                                            Medicine Delivery
                                        </span>
                                    </Link>

                                    <Link
                                        className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
                                        to="/post-announcement"
                                    >
                                        <TfiAnnouncement className="text-lg" />
                                        <span className="mx-2 text-sm font-medium">
                                            Post Announcements
                                        </span>
                                    </Link>



                                    <Link
                                        className="flex items-center px-3 py-2 text-gray-300 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
                                        to="/profile"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span className="mx-2 text-sm font-medium">
                                            Profile Settings
                                        </span>
                                    </Link>
                                </>
                            )}

                        </nav>
                        <div className="mt-6">
                            <div className="flex items-center justify-between mt-6">
                                <a to="#" className="flex items-center gap-x-2">
                                    {user && user?.role === 'patient' || user?.role === 'doctor' ? (
                                        <img src={user.photo} className='rounded-full border-white border-2 w-11 h-11' alt='profile-pic' />
                                    ) : (
                                        <PiUserCircleLight className='w-10 h-10 text-white' />
                                    )}
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user ? user.name : ""}</span>
                                </a>

                                <button
                                    className="text-xl px-2 py-2 font-semibold rounded shadow transition duration-300 ease-in-out transform hover:scale-105"
                                    style={{ backgroundColor: "#008080", color: "white" }}
                                    onClick={handleLogout}
                                >
                                    <FiLogOut />
                                </button>
                            </div>
                        </div>

                    </div>
                </aside>
            </div>
            <div className="ml-72 mr-10 my-12">
                <Outlet />
            </div>
        </div>
    );
};
