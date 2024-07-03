const request = require('supertest');
const { app } = require('../app'); // Assuming your Express app is defined in app.js
const User = require('../models/UserSchema'); // Assuming this is your User model
const Doctor = require('../models/DoctorSchema'); // Assuming this is your Doctor model

jest.mock('../models/UserSchema'); // Mocking the User model
jest.mock('../models/DoctorSchema'); // Mocking the Doctor model

describe('getAllUsers route', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should fetch all users except admin with no query parameters', async () => {
        // Mock user data
        const mockUsers = [{ username: 'user1', role: 'patient' }, { username: 'user2', role: 'patient' }];
        User.find.mockResolvedValue(mockUsers);

        // Send request to the route
        await request(app)
            .get('/user/getAllUsers')
            .expect(200)
            .then((response) => {
                // Check if response contains the expected users
                expect(response.body.users).toEqual(mockUsers);
                // Check if User.find is called with the correct query
                expect(User.find).toHaveBeenCalledWith({ role: { $ne: 'admin' } });
            });
    });

    it('should fetch all active users', async () => {
        // Mock user data
        const mockActiveUsers = [{ username: 'activeUser1', role: 'user', isActive: 'active' }];
        User.find.mockResolvedValue(mockActiveUsers);

        // Send request to the route with isActive query parameter
        await request(app)
            .get('/user/getAllUsers?isActive=active')
            .expect(200)
            .then((response) => {
                // Check if response contains the expected active users
                expect(response.body.users).toEqual(mockActiveUsers);
                // Check if User.find is called with the correct query
                expect(User.find).toHaveBeenCalledWith({ role: { $ne: 'admin' }, isActive: 'active' });
            });
    });

    // Add more test cases for other scenarios...

    it('should handle errors when fetching users', async () => {
        // Mock an error when fetching users
        const errorMessage = 'Failed to fetch users';
        User.find.mockRejectedValue(new Error(errorMessage));

        // Send request to the route
        await request(app)
            .get('/user/getAllUsers')
            .expect(500)
            .then((response) => {
                // Check if response contains the expected error message
                expect(response.body).toEqual({ success: false, message: errorMessage });
            });
    });
});
