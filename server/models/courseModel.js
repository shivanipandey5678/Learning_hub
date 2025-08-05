import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'quiz', 'text'], required: true },
  content: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  isFree: { type: Boolean, default: false }
}, { timestamps: true });

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true },
  lessons: [lessonSchema]
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  thumbnail: { type: String },
  previewVideo: { type: String },
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'], 
    default: 'draft' 
  },
  instructor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  modules: [moduleSchema],
  enrollments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    enrolledAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;