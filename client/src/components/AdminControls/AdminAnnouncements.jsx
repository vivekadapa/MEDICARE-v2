import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../AuthContext";

const AdminAnnouncements = () => {
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const { token } = useAuth();

  const handleTitleChange = (e) => {
    setAnnouncementTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setAnnouncementContent(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (announcementTitle.trim() !== "" && announcementContent.trim() !== "") {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/post-announcement`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ announcementTitle, announcementContent }),
        });

        if (response.ok) {
          toast.success("Announcement posted successfully");
          setAnnouncementTitle("");
          setAnnouncementContent("");
        } else {
          console.log("Response status:", response.status);
          const errorText = await response.text();
          console.log("Error message:", errorText);
          toast.error(`Failed to post announcement: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error posting announcement:", error.message);
        toast.error(`Error posting announcement: ${error.message}`);
      }
    } else {
      toast.warn("Please fill in both title and content before submitting.");
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-[2rem] top-[28rem] -rotate-[30deg]">
        <img
          src="/admin-announcement.svg"
          alt="Admin Announcement"
          className="w-80 h-80 ml-4 -mt-20"
        />
      </div>
      <div className="flex min-h-[80vh] w-[50vw] items-center justify-center  ml-56">

        <div className="max-w-full  p-8 rounded-lg shadow-xl flex items-center justify-center bg-teal-50">
          {/* Left Section with SVG */}

          {/* Right Section with Form */}
          <div className="ml-6">
            <h1 className="text-3xl font-bold mb-4 text-teal-800">
              <FaBell className="text-4xl inline-block mr-2" />
              Post Announcement
            </h1>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Announcement Title"
                value={announcementTitle}
                onChange={handleTitleChange}
                className="border p-2 rounded focus:outline-none focus:border-teal-500 w-full"
              />

              <textarea
                rows={4}
                placeholder="Announcement Content"
                value={announcementContent}
                onChange={handleContentChange}
                className="border p-2 rounded focus:outline-none focus:border-teal-500 w-full"
              />

              <button
                type="submit"
                className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600 flex items-center w-full"
              >
                <IoMdSend className="mr-2 text-xl" />
                Post Announcement
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncements;
