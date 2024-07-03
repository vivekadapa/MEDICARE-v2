import { createSlice } from "@reduxjs/toolkit";

const getStoredItems = () => {
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
};

const initialState = {
    items: getStoredItems(),
    status: null,
};

const findItemIndexById = (items, Id) => items.findIndex((item) => item.Id === Id);

const MedicineSlice = createSlice({
    name: "medicines",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { Id } = action.payload;
            const itemIndex = findItemIndexById(state.items, Id);

            if (itemIndex !== -1) {
                state.items[itemIndex].quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            storeItems(state.items);
        },
        increaseQuantity: (state, action) => {
            const itemIndex = state.items.findIndex((item) => item.Id === action.payload.Id);
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity += 1;
                storeItems(state.items);
            }
        },
        decreaseQuantity: (state, action) => {
            const itemIndex = state.items.findIndex((item) => item.Id === action.payload.Id);
            if (itemIndex !== -1) {
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity -= 1;
                    storeItems(state.items);
                } else {
                    state.items.splice(itemIndex, 1);
                    storeItems(state.items);
                }
            }
        },
        removeItem: (state, action) => {
            const filteredItems = state.items.filter((item) => item.Id !== action.payload.Id);
            state.items = filteredItems;
            storeItems(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            storeItems(state.items);
        }
    },

});

export const { addToCart, increaseQuantity, decreaseQuantity, removeItem, clearCart } =
    MedicineSlice.actions;

export default MedicineSlice.reducer;

const storeItems = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
};
