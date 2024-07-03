import { createSlice, nanoid } from "@reduxjs/toolkit";



const getStoredDoctors = () => {
    const storedDoctors = localStorage.getItem("doctors");
    return storedDoctors ? JSON.parse(storedDoctors) : []
}

const storeDoctor = (doctors) => {
    localStorage.setItem("doctors", JSON.stringify(doctors))
}


const initialState = {
    doctors: getStoredDoctors()
}


const DoctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        register: (state, action) => {
            const id = nanoid();
            const { username, gender, email,
                specialisation, Qualification, password,
                cnfPassword
            } = action.payload
            const docWId = {
                id, username, gender, email,
                specialisation, Qualification, password,
                cnfPassword
            }
            state.doctors.push(docWId)
            storeDoctor(state.doctors)
        },
    }
})

export const { register } = DoctorSlice.actions;

export default DoctorSlice.reducer;