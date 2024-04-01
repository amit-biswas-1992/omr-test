const BASE_URL = "https://api.hobbycamplearn.com/api/v1/";

export const apiEndPoints = {
  sendOtp: `${BASE_URL}auth/sentOtp`,
  verifyOtp: `${BASE_URL}auth/verifyOtp`,
  homedata: `${BASE_URL}getAllCourses`,
  courseDetail: `${BASE_URL}course/getUserSpecificCourseDetails/`,
  courseDetailTokenFree: `${BASE_URL}getCourseDetails/`,
  bkashPayment: `${BASE_URL}payment/bkash/create-payment`,
  enrolledCourse: `${BASE_URL}user/getPurchasedCourses`,
  popularCourse: `${BASE_URL}getPopularCourses`,
  category: `${BASE_URL}getCategory`,
  categoryList: `${BASE_URL}getCoursesByCategoryID/`,
  profile: `${BASE_URL}user/profile`,
  updateProfile: `${BASE_URL}user/updateProfile`,
};
