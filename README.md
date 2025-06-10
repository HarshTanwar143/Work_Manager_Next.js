# 🚀 Work Manager - Next.js Task Management Application

<div align="center">
  
  ![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![Cloudinary](https://img.shields.io/badge/Cloudinary-1f4f9f?style=for-the-badge&logo=cloudinary&logoColor=white)

  **A powerful, secure, and user-friendly task management application built with modern web technologies**<br/><br/><br/>
  ![image](https://github.com/user-attachments/assets/4f8defae-e7f2-4f38-9dc4-22bb40e2b5da) <br/><br/><br/><br/>
  ![image](https://github.com/user-attachments/assets/cd846451-066e-468d-9e70-63afa65dc8f1) <br/><br/><br/><br/>
  ![image](https://github.com/user-attachments/assets/1a720480-ae4c-423c-811a-1fbe38fe878d) <br/><br/><br/><br/>
  ![image](https://github.com/user-attachments/assets/2fe27571-6800-4e8d-9da3-5a0e88462f22) <br/><br/><br/><br/>
  ![image](https://github.com/user-attachments/assets/ca374c45-afa4-47f7-a911-513de63b6add) <br/><br/><br/><br/>
  ![image](https://github.com/user-attachments/assets/dbeca616-a648-4402-8715-8f50f27030bc) <br/><br/><br/><br/>

</div>

---

## 📖 Overview

Work Manager is a comprehensive task management application that empowers users to organize, track, and manage their daily tasks efficiently. Built with Next.js and powered by MongoDB, it offers a seamless experience with robust authentication, cloud storage integration, and intelligent account recovery mechanisms.

### 🎯 Why Work Manager?

- **🔐 Secure Authentication**: JWT-based authentication system
- **⏰ Smart Account Recovery**: 1-hour grace period for account deletion
- **☁️ Cloud Integration**: Cloudinary for profile picture storage  
- **📱 Responsive Design**: Works perfectly on all devices
- **🔄 Real-time Updates**: Instant task status synchronization
- **🛡️ Data Security**: Encrypted user data with secure REST APIs

---

## ✨ Features

### 🔑 **Authentication & Security**
- **JWT Token Authentication** - Secure login/logout system
- **Protected Routes** - Route-level security implementation
- **Session Management** - Automatic token refresh and validation
- **Password Encryption** - Bcrypt hashing for password security

### 📋 **Task Management**
- **Create Tasks** - Add new tasks with detailed descriptions
- **Update Tasks** - Edit task content and priorities
- **Delete Tasks** - Remove completed or unwanted tasks
- **Status Tracking** - Mark tasks as pending or completed
- **Task Filtering** - Filter by status, date, or priority
- **Search Functionality** - Quick task search and retrieval

### 👤 **User Profile Management**
- **Profile Pictures** - Upload and manage profile images via Cloudinary
- **User Settings** - Customize account preferences
- **Account Information** - Update personal details

### 🕐 **Smart Account Deletion**
- **Grace Period** - 1-hour window before permanent deletion
- **Cron Job Implementation** - Automated background processes
- **Account Recovery** - Re-login to cancel deletion process
- **Data Backup** - Temporary data preservation during grace period

### 🌐 **API & Integration**
- **RESTful APIs** - Complete CRUD operations
- **MongoDB Integration** - Efficient data storage and retrieval
- **Cloudinary Integration** - Seamless image upload and management
- **Error Handling** - Comprehensive error management system

---

## 🛠️ Tech Stack

### **Frontend**
```
Next.js 13+     - React framework with App Router
React 18        - Component-based UI library
Tailwind CSS    - Utility-first CSS framework
JavaScript/JSX  - Modern JavaScript with JSX
```

### **Backend**
```
Next.js API     - Serverless API routes
Node.js         - JavaScript runtime
JWT             - JSON Web Tokens for authentication
Bcrypt          - Password hashing
```

### **Database & Storage**
```
MongoDB         - NoSQL database
Mongoose        - MongoDB object modeling
Cloudinary      - Cloud image storage
```

### **DevOps & Utilities**
```
Cron Jobs       - Scheduled background tasks
Vercel          - Deployment platform
Git             - Version control
```

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 16.0 or higher
MongoDB Atlas account or local MongoDB
Cloudinary account
Git
```

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/HarshTanwar143/Work_Manager_Next.js.git
   cd Work_Manager_Next.js
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # App Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
Work_Manager_Next.js/
├── 📁 app/                    # Next.js 13+ App Router
│   ├── 📁 api/               # API routes
│   │   ├── 📁 auth/          # Authentication endpoints
│   │   ├── 📁 tasks/         # Task management endpoints
│   │   └── 📁 users/         # User management endpoints
│   ├── 📁 components/        # Reusable React components
│   ├── 📁 lib/              # Utility functions and configurations
│   └── 📁 styles/           # Global styles and Tailwind config
├── 📁 models/               # MongoDB schemas
├── 📁 middleware/           # Custom middleware functions
├── 📁 utils/               # Helper functions
├── 📁 public/              # Static assets
├── 📄 package.json         # Dependencies and scripts
├── 📄 tailwind.config.js   # Tailwind CSS configuration
├── 📄 next.config.js       # Next.js configuration
└── 📄 README.md           # Project documentation
```

---

## 📋 API Documentation

### Authentication Endpoints

#### **POST** `/api/auth/register`
Register a new user account
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### **POST** `/api/auth/login`
Authenticate user and return JWT token
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### **POST** `/api/auth/logout`
Logout user and invalidate token

### Task Management Endpoints

#### **GET** `/api/tasks`
Retrieve all tasks for authenticated user

#### **POST** `/api/tasks`
Create a new task
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

#### **PUT** `/api/tasks/[id]`
Update existing task

#### **DELETE** `/api/tasks/[id]`
Delete a specific task

#### **PATCH** `/api/tasks/[id]/status`
Update task status (pending/completed)

### User Management Endpoints

#### **GET** `/api/users/profile`
Get user profile information

#### **PUT** `/api/users/profile`
Update user profile

#### **DELETE** `/api/users/account`
Initiate account deletion (with 1-hour grace period)

#### **POST** `/api/users/recover`
Cancel account deletion during grace period

---

## 🔧 Configuration

### MongoDB Setup
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Add it to your `.env.local` file

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Add them to your `.env.local` file

### JWT Configuration
Generate a secure random string for your JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🚦 Usage

### Creating Your First Task
1. Register for an account or login
2. Navigate to the dashboard
3. Click "Add New Task"
4. Fill in task details
5. Click "Create Task"

### Managing Task Status
- Click the checkbox to mark tasks as completed
- Use the status filter to view pending/completed tasks
- Edit tasks by clicking the edit icon

### Profile Management
- Upload your profile picture
- Update your personal information
- Manage account settings

### Account Deletion Recovery
If you accidentally delete your account:
1. Try logging in within 1 hour
2. Your account will be automatically recovered
3. All your data will be restored

---

## 🎨 Customization

### Theme Configuration
Modify `tailwind.config.js` to customize colors, fonts, and spacing:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color',
      }
    }
  }
}
```

### Adding New Features
1. Create new API routes in `app/api/`
2. Add corresponding frontend components
3. Update the database schema if needed
4. Test thoroughly before deployment

---

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment
```bash
npm run build
npm start
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Contributing Guidelines
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Style
- Follow JavaScript/React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure responsive design

### Bug Reports
If you find a bug, please create an issue with:
- Clear bug description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

---

## 👨‍💻 Author

**Harsh Tanwar**
- GitHub: [@HarshTanwar143](https://github.com/HarshTanwar143)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/harsh-tanwar-04315b247/)
- Email: harshtanwar14122003@gmail.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework that powers this app
- [MongoDB](https://www.mongodb.com/) - Database solution
- [Cloudinary](https://cloudinary.com/) - Image management platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vercel](https://vercel.com/) - Deployment platform

---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

![GitHub stars](https://img.shields.io/github/stars/HarshTanwar143/Work_Manager_Next.js?style=social)
![GitHub forks](https://img.shields.io/github/forks/HarshTanwar143/Work_Manager_Next.js?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/HarshTanwar143/Work_Manager_Next.js?style=social)

**Made with ❤️ by [Harsh Tanwar](https://github.com/HarshTanwar143)**

</div>
