import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;
export const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
/* eslint-disable @typescript-eslint/no-explicit-any */

// ============================================
// USER API FUNCTIONS
// ============================================

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axios.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

// ============================================
// QUIZ API FUNCTIONS
// ============================================

// Get all quizzes for a course
export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes`
  );
  return response.data;
};

// Get a single quiz by ID
export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

// Create a new quiz for a course
export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

// Update an existing quiz
export const updateQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return response.data;
};

// Delete a quiz
export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

// Publish/Unpublish a quiz
export const publishQuiz = async (quizId: string, published: boolean) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/publish`,
    { published }
  );
  return response.data;
};

// ============================================
// QUIZ ATTEMPT API FUNCTIONS
// ============================================

// Submit a quiz attempt
export const submitQuizAttempt = async (
  quizId: string,
  userId: string,
  answers: any[]
) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/attempts`,
    { userId, answers }
  );
  return response.data;
};

// Get all attempts for a quiz by a specific user
export const getQuizAttempts = async (quizId: string, userId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts/${userId}`
  );
  return response.data;
};

// Get a specific attempt
export const getQuizAttempt = async (
  quizId: string,
  userId: string,
  attemptId: string
) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts/${userId}/${attemptId}`
  );
  return response.data;
};

// Get latest attempt for a user
export const getLatestQuizAttempt = async (quizId: string, userId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts/${userId}/latest`
  );
  return response.data;
};
