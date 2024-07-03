const request = require('supertest');
const { app } = require('../app'); // Assuming your Express app is defined in app.js
const Medicine = require('../models/MedicineSchema'); // Assuming this is your Medicine model

jest.mock('../models/MedicineSchema'); // Mocking the Medicine model

describe('GET /medicine/getMedicines', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return all medicines when request is successful', async () => {
        // Mock medicine data
        const mockMedicines = [{ name: 'Medicine1' }, { name: 'Medicine2' }];
        Medicine.find.mockResolvedValue(mockMedicines);

        // Send request to the route
        await request(app)
            .get('/medicine/getMedicines')
            .expect(200)
            .then((response) => {
                // Check if response contains the expected message and data
                expect(response.body).toEqual({
                    message: "Medicines Fetched Successfully",
                    data: mockMedicines
                });
                // Check if Medicine.find is called
                expect(Medicine.find).toHaveBeenCalled();
            });
    });

    it('should return 500 Internal Server Error when request fails', async () => {
        // Mock an error when fetching medicines
        const errorMessage = 'Internal Server Error';
        Medicine.find.mockRejectedValue(new Error(errorMessage));

        // Send request to the route
        await request(app)
            .get('/medicine/getMedicines')
            .expect(500)
            .then((response) => {
                // Check if response contains the expected error message
                expect(response.body).toEqual({ message: errorMessage });
            });
    });
});
