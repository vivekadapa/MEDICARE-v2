const request = require('supertest');
const { app } = require('../app'); // Assuming your Express app is defined in app.js
const Doctor = require('../models/DoctorSchema'); // Assuming this is your Doctor model

jest.mock('../models/DoctorSchema'); // Mocking the Doctor model

describe('GET /doctor/getdoc/:id', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return doctor details when a valid id is provided', async () => {
        // Mock doctor data
        const mockDoctor = {
            _id: 'validId',
            name: 'John Doe',
            email: 'john@example.com',
            // Add other properties as needed
        };
        Doctor.findById.mockResolvedValue(mockDoctor);

        // Send request to the route
        await request(app)
            .get('/doctor/getdoc/validId') // Use a valid doctor id here
            .expect(200) // Expecting 200 for success
            .then((response) => {
                // Check if response contains the expected doctor details
                expect(response.body.success).toBe(true);
                expect(response.body.data).toEqual(mockDoctor);
            });
    });

    it('should return 404 error when doctor is not found', async () => {
        // Mock Doctor.findById to return null, indicating doctor not found
        Doctor.findById.mockResolvedValue(null);

        // Send request to the route with an invalid id
        await request(app)
            .get('/doctor/getdoc/invalidId') // Use an invalid doctor id here
            .expect(404) // Expecting 404 when doctor not found
            .then((response) => {
                // Check if response contains the expected error message
                expect(response.body.success).toBe(false);
                expect(response.body.message).toBe('Doctor not found');
            });
    });

    // Add more test cases for other scenarios...
});
