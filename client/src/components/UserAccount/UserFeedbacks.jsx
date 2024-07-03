import Rating from "react-rating-stars-component";

const UserFeedbacks = () => {
  const doctorFeedbackData = [
    { id: 1, doctor: "Dr. Smith", feedback: "Great experience! Dr. Smith was very knowledgeable and helpful.", rating: 5 },
    { id: 2, doctor: "Dr. Johnson", feedback: "Friendly and professional. Highly recommended.", rating: 3 },
    { id: 3, doctor: "Dr. Brown", feedback: "Excellent service. Dr. Brown took the time to address all my concerns.", rating: 4.5 },
    { id: 4, doctor: "Dr. White", feedback: "Very satisfied with the consultation. Dr. White explained everything thoroughly.", rating: 2 },
    { id: 5, doctor: "Dr. Davis", feedback: "Professional and caring. Dr. Davis made me feel at ease.", rating: 3.8 },
  ];

  return (
    <div className="mx-8">
      <h1 className="text-2xl font-bold mb-4">Doctor Feedback</h1>

      <div className="bg-white p-4 rounded shadow mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feedback
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctorFeedbackData.map((feedback) => (
              <tr key={feedback.id}>
                <td className="px-6 py-4 whitespace-nowrap">{feedback.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{feedback.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{feedback.feedback}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Rating
                    count={5}
                    value={feedback.rating}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                    isHalf={true}  
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserFeedbacks;
