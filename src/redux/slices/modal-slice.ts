import { createSlice } from "@reduxjs/toolkit";

type typeModal = "one" | "two" | "three";

interface IModalState {
    modal: boolean;
    typeModal: typeModal;
}

const initialState: IModalState = {
    modal: false,
    typeModal: "signIn",
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        closeModal: () => initialState,
        openModal: (state) => {
            state.modal = true;
        },
        setTypeModal: (state, action) => {
            state.typeModal = action.payload;
        },
    },
});

export const { closeModal, openModal, setTypeModal } = modalSlice.actions;

export default modalSlice.reducer;
