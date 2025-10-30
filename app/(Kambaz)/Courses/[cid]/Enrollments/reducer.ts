"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "../../../Database";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments.push(action.payload);
    },
    unenrollCourse: (
      state,
      action: PayloadAction<{ user: string; course: string }>
    ) => {
      state.enrollments = state.enrollments.filter(
        (e) =>
          !(
            e.user === action.payload.user && e.course === action.payload.course
          )
      );
    },
  },
});

export const { enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
