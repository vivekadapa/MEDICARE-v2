import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';

const AnnouncementsDisplay = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/display-announcements`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch announcements. Status: ${response.status}`);
                }
                const data = await response.json();
                setAnnouncements(data.announcements);
                console.log('Announcements fetched successfully:', data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };


        fetchAnnouncements();
    }, []);

    const formatTimestamp = (timestamp) => {
        if (!timestamp) {
            return "Invalid Date";
        }

        const date = new Date(timestamp);

        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }

        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        return formattedDate;
    };

    return (
        <>
            {/* <HomeLayout/> */}
            <div className="min-h-screen bg-teal-50 p-8 text-center announcements-page">
                {/* <Link to="/" className="text-teal-800 mb-4 block text-xl absolute top-0 left-0 p-4 font-semibold ml-10">
                Back to Home
            </Link> */}

                <h1 className="text-4xl font-bold mb-6 text-teal-800">
                    <FaBell className="text-5xl inline-block mr-2" />
                    Announcements
                </h1>

                {loading && <p className="text-teal-700">Loading announcements...</p>}
                {error && <p className="text-red-700">{error}</p>}
                {!loading && !error && announcements.length === 0 && (
                    <p className="text-teal-700">No announcements available.</p>
                )}
                {!loading && !error && announcements.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {announcements.map((announcement) => (
                            <div key={announcement.id} className="bg-white rounded-md shadow-md p-6 announcement-card">
                                <h2 className="text-xl font-bold mb-4 text-teal-800">{announcement.title}</h2>
                                <p className="text-teal-700 mb-4">{announcement.content}</p>
                                <p className="text-teal-600">{formatTimestamp(announcement.date)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default AnnouncementsDisplay;
