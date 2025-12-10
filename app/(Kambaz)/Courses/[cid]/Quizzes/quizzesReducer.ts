import { createSlice } from "@reduxjs/toolkit";

/* eslint-disable @typescript-eslint/no-explicit-any */

const initialState = {
  quizzes: [],
  currentQuiz: null,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [...state.quizzes, action.payload] as any;
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz: any) =>
        quiz._id === action.payload._id ? action.payload : quiz
      ) as any;
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz: any) => quiz._id !== action.payload
      ) as any;
    },
    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },
    publishQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz: any) =>
        quiz._id === action.payload.quizId
          ? { ...quiz, published: action.payload.published }
          : quiz
      ) as any;
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  setCurrentQuiz,
  publishQuiz,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
