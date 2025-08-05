import Course from '../models/courseModel.js';
import User from '../models/userModels.js';
import Auth from '../middleware/Auth.js';

// Admin Course Management
export const getAllCourses = async (req, res) => {
  try {
    const { status } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const filter = {};
    if (status) filter.status = status;
    
    const courses = await Course.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);
      
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, description, category, price, thumbnail, status } = req.body;
    
    const course = new Course({
      title,
      description,
      category,
      price,
      thumbnail,
      status,
      instructor: userId
    });
    
    await course.save();
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { title, description, category, price, status } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, category, price, status },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadThumbnail = async (req, res) => {
  try {
    const { thumbnail } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { thumbnail },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const setPreviewVideo = async (req, res) => {
  try {
    const { previewVideo } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { previewVideo },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Module Management
export const addModule = async (req, res) => {
  try {
    const { title, description, order } = req.body;
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    course.modules.push({ title, description, order });
    await course.save();
    
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateModule = async (req, res) => {
  try {
    const { title, description, order } = req.body;
    const course = await Course.findOneAndUpdate(
      { 
        _id: req.params.id,
        'modules._id': req.params.moduleId 
      },
      {
        $set: {
          'modules.$.title': title,
          'modules.$.description': description,
          'modules.$.order': order
        }
      },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course or module not found' });
    }
    
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteModule = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $pull: { modules: { _id: req.params.moduleId } } },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lesson Management
export const addLesson = async (req, res) => {
  try {
    const { title, type, content, duration, isFree } = req.body;
    const course = await Course.findOneAndUpdate(
      { 
        _id: req.params.id,
        'modules._id': req.params.moduleId 
      },
      {
        $push: {
          'modules.$.lessons': {
            title,
            type,
            content,
            duration,
            isFree
          }
        }
      },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course or module not found' });
    }
    
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const { title, type, content, duration, isFree } = req.body;
    
    const course = await Course.findOneAndUpdate(
      { 
        _id: req.params.id,
        'modules.lessons._id': req.params.lessonId 
      },
      {
        $set: {
          'modules.$[].lessons.$[lesson].title': title,
          'modules.$[].lessons.$[lesson].type': type,
          'modules.$[].lessons.$[lesson].content': content,
          'modules.$[].lessons.$[lesson].duration': duration,
          'modules.$[].lessons.$[lesson].isFree': isFree
        }
      },
      {
        arrayFilters: [{ 'lesson._id': req.params.lessonId }],
        new: true
      }
    );
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course or lesson not found' });
    }
    
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id },
      { 
        $pull: { 
          'modules.$[].lessons': { _id: req.params.lessonId } 
        } 
      },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Analytics
export const getCourseEnrollments = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('enrollments.user', 'name email');
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    res.json({ success: true, data: course.enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminAnalytics = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalUsers = await User.countDocuments();
    const publishedCourses = await Course.countDocuments({ status: 'published' });
    
    res.json({
      success: true,
      data: {
        totalCourses,
        totalUsers,
        publishedCourses,
        // Add more analytics as needed
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = {};
    if (role) filter.role = role;
    
    const users = await User.find(filter).select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// User Routes
export const getPublishedCourses = async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = { status: 'published' };
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    
    const courses = await Course.find(filter);
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseDetail = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      status: 'published'
    });
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchCourses = async (req, res) => {
  try {
    const { q, sort } = req.query;
    let query = { status: 'published' };
    
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
    
    let sortOption = {};
    if (sort === 'rating') sortOption.rating = -1;
    if (sort === 'newest') sortOption.createdAt = -1;
    
    const courses = await Course.find(query).sort(sortOption);
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Course.distinct('category');
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPopularCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: 'published' })
      .sort({ enrollments: -1 })
      .limit(10);
      
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const { userId } = req.user;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { enrollments: { user: userId } } },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    res.json({ success: true, message: 'Enrolled successfully', data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserCourses = async (req, res) => {
  try {
    const { userId } = req.user;
    const courses = await Course.find({
      'enrollments.user': userId,
      status: 'published'
    });
    
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseProgress = async (req, res) => {
  try {
    const { userId } = req.user;
    const course = await Course.findOne({
      _id: req.params.id,
      'enrollments.user': userId
    });
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found or not enrolled' });
    }
    
    // Add progress tracking logic here
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { userId } = req.user;
    const { lessonId, completed } = req.body;
    
    // Add progress update logic here
    res.json({ success: true, message: 'Progress updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseCurriculum = async (req, res) => {
  try {
    const { userId } = req.user;
    const course = await Course.findOne({
      _id: req.params.id,
      'enrollments.user': userId
    }).select('modules');
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found or not enrolled' });
    }
    
    res.json({ success: true, data: course.modules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addCourseReview = async (req, res) => {
  try {
    const { userId } = req.user;
    const { rating, comment } = req.body;
    
    // Add review logic here
    res.json({ success: true, message: 'Review added' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseReviews = async (req, res) => {
  try {
    // Add get reviews logic here
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};