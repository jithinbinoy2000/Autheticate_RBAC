import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: 'text',
  initialState: {
    text: []
  },
  reducers: {
    addText: (state, action) => {
      
      state.text.push(action.payload);
    },
    updateText: (state, action) => {
     
      const { id, newData } = action.payload;
      const index = state.text.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.text[index] = { ...state.text[index], ...newData };
      }
    },
    deleteText: (state, action) => {
      state.text = state.text.filter((item) => item.id !== action.payload);
    }
  }
});

export const { addText, updateText, deleteText } = textSlice.actions;
export default textSlice.reducer;
