import express from 'express';
import {
  getAllCourses, createCourse, getCourseDetails, updateCourse, deleteCourse,
  uploadThumbnail, setPreviewVideo, addModule, updateModule, deleteModule,
  addLesson, updateLesson, deleteLesson, getCourseEnrollments,
  getAdminAnalytics, getAllUsers, getPublishedCourses, getCourseDetail,
  searchCourses, getCategories, getPopularCourses, enrollCourse,
  getUserCourses, getCourseProgress, updateProgress, getCourseCurriculum,
  addCourseReview, getCourseReviews
} from '../controllers/courseController.js';
import Auth from '../middleware/Auth.js';
import AdminCheck from '../middleware/AdminCheck.js';

const router = express.Router();

// Admin Routes
router.get('/admin/courses', Auth, AdminCheck, getAllCourses);
router.post('/admin/courses', Auth, AdminCheck, createCourse);
router.get('/admin/courses/:id', Auth, AdminCheck, getCourseDetails);
router.put('/admin/courses/:id', Auth, AdminCheck, updateCourse);
router.delete('/admin/courses/:id', Auth, AdminCheck, deleteCourse);
router.post('/admin/courses/:id/thumbnail', Auth, AdminCheck, uploadThumbnail);
router.post('/admin/courses/:id/preview', Auth, AdminCheck, setPreviewVideo);

// Module Management
router.post('/admin/courses/:id/modules', Auth, AdminCheck, addModule);
router.put('/admin/courses/:id/modules/:moduleId', Auth, AdminCheck, updateModule);
router.delete('/admin/courses/:id/modules/:moduleId', Auth, AdminCheck, deleteModule);

// Lesson Management
router.post('/admin/courses/:id/modules/:moduleId/lessons', Auth, AdminCheck, addLesson);
router.put('/admin/courses/:id/lessons/:lessonId', Auth, AdminCheck, updateLesson);
router.delete('/admin/courses/:id/lessons/:lessonId', Auth, AdminCheck, deleteLesson);

// Admin Analytics
router.get('/admin/courses/:id/enrollments', Auth, AdminCheck, getCourseEnrollments);
router.get('/admin/analytics', Auth, AdminCheck, getAdminAnalytics);
router.get('/admin/users', Auth, AdminCheck, getAllUsers);

// User Routes
router.get('/courses', getPublishedCourses);
router.get('/courses/:id', getCourseDetail);
router.get('/search/courses', searchCourses);
router.get('/categories', getCategories);
router.get('/courses/popular', getPopularCourses);

// Enrollment & Learning
router.post('/courses/:id/enroll', Auth, enrollCourse);
router.get('/users/me/courses', Auth, getUserCourses);
router.get('/courses/:id/progress', Auth, getCourseProgress);
router.post('/courses/:id/progress', Auth, updateProgress);
router.get('/courses/:id/curriculum', Auth, getCourseCurriculum);

// Reviews
router.post('/courses/:id/reviews', Auth, addCourseReview);
router.get('/courses/:id/reviews', getCourseReviews);

export default router;