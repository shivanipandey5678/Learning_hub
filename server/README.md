## 🧠 Project: Team Learning\_hub – Authentication System (v2.0)

### 🔐 Features Implemented

#### ✅ **User Registration**

* Accepts `name`, `email`, and `password`.
* Hashes the password using `bcrypt`.
* Stores the user securely in MongoDB.
* Automatically logs in the user by setting a **JWT token** in an **HTTP-only cookie**.
* Sends a welcome email using **SMTP via Brevo** (or configured service).

#### ✅ **User Login**

* Accepts `email` and `password`.
* Validates password using `bcrypt.compare()`.
* Generates new JWT access token on successful login.
* Sends token via **HTTP-only cookie**.

#### ✅ **User Logout**

* Clears the cookie and ends session.

#### ✅ **Email Verification with OTP**

* Authenticated users can request OTP.
* 6-digit OTP sent via email (expires in 24 hrs).
* User verifies OTP to mark `isAccountVerified = true`.

#### ✅ **Password Reset (with OTP)**

* Only for verified accounts.
* Sends 6-digit OTP via email.
* Allows reset of password after OTP validation.
* Sends confirmation email on successful password change.

#### ✅ **JWT Authentication Middleware**

* Middleware `Auth.js` verifies token from either:

  * `req.cookies.token`
  * OR (if set) `req.headers.token`
* Adds `req.user = { userId }` on successful decode.

#### ✅ **Email Templates**

* All emails use clean HTML templates:

  * `Welcome`
  * `Verification OTP`
  * `Password Reset OTP`
  * `Password Changed Confirmation`

---

### 🗂️ Folder Structure Overview

```
├── config/
│   ├── db.js               # MongoDB connection
│   ├── nodemailer.js       # Email transporter setup
│   └── emailTemplate.js    # HTML templates
│
├── controllers/
│   └── authController.js   # All core auth logic
│
├── middleware/
│   └── Auth.js             # JWT verify middleware
│
├── models/
│   └── userModels.js       # User Schema (with OTPs, etc.)
│
├── routes/
│   └── authRouter.js       # All auth-related endpoints
│
├── .env                    # Environment variables (ignored)
├── .gitignore
├── package.json
└── index.js                # Entry point (Express setup)
```

---

### 📦 Tech Stack Used

* **Backend**: Node.js, Express
* **Database**: MongoDB + Mongoose
* **Auth**: JWT + bcrypt
* **Email**: Nodemailer + Brevo SMTP
* **Validation**: Custom + Mongoose checks
* **Security**:

  * HTTP-only cookies
  * .env secrets
  * OTP expiry logic

---

### 🚧 Endpoints Summary

| Method | Endpoint                     | Description                 |
| ------ | ---------------------------- | --------------------------- |
| `POST` | `/api/auth/register`         | Register a new user         |
| `POST` | `/api/auth/login`            | Login with credentials      |
| `POST` | `/api/auth/logout`           | Logout user                 |
| `POST` | `/api/auth/verification-otp` | Send email verification OTP |
| `POST` | `/api/auth/verify-email`     | Verify email via OTP        |
| `POST` | `/api/auth/reset-otp`        | Send password reset OTP     |
| `POST` | `/api/auth/reset-password`   | Reset password after OTP    |
| `POST` | `/api/auth/is-authenticated` | Check if token is valid     |

---
//shivani register mei hi phle rakhna hoga verify email fir success hoga registration

🛠️ Recent Updates
✅ Admin Login Route Added
Created a dedicated route for admin login:
POST /api/v1/auth/admin-login

Authenticates using credentials stored in environment variables.

On success, generates a secure atoken cookie for admin session.

✅ Fixed req.body Undefined Issue
Confirmed express.json() is loaded early in server.js.

All routes now correctly receive JSON payloads in the request body.

✅ User Profile Update Endpoint
Added support to update authenticated user's profile via:
PATCH /api/v1/users/update

Supports updating name, bio, and profilePicture.

✅ User Deletion Endpoint
Authenticated users can now delete their accounts via:
DELETE /api/v1/users/delete

## ✅ Phase 2 Updates

### 🧩 MongoDB & Postman Team Collaboration
- MongoDB Atlas configured for multi-developer use.
- Connection string shared securely via `.env`.
- Postman team workspace created for API collaboration.
- Enabled network access and created DB users for teammates.

### 👤 User Model Updated
- Added fields: `profilePicture`, `bio`, `role`, `enrolledCourses`, `completedCourses`.
- Enhanced schema to support course interactions and profile info.

### 📦 Multer Configured for File Uploads
- Configured `multer` for handling profile picture uploads.
- Setup middleware to store files with unique naming.

### 🛡️ Admin Middleware Setup
- Created `adminAuth.js` to protect admin-specific routes.
- Uses environment credentials for secure admin login.

### 🧑‍💻 User Routes (CRUD)
- Created `userRouter.js` for user-related functionality:
  - `GET /me` → Fetch current user
  - `PATCH /update` → Update user profile
  - `DELETE /delete` → Delete user account

> 💡 All new routes are protected with token-based `Auth` middleware.
