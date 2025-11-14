"use client";
import { enrollments } from "@/app/(Kambaz)/Database";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState = {
  enrollments: enrollments,
};
/* eslint-disable @typescript-eslint/no-explicit-any */
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enrollCourse: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments.push(action.payload);
    },
    unenrollCourse: (
      state,
      action: PayloadAction<{ user: string; course: string }>
    ) => {
      state.enrollments = state.enrollments.filter(
        (e: any) =>
          !(
            e.user === action.payload.user && e.course === action.payload.course
          )
      );
    },
  },
});

export const { setEnrollments, enrollCourse, unenrollCourse } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
