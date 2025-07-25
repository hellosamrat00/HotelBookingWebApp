# Hotel Booking System

A full-stack hotel booking web application that allows users to search, book, and manage hotel rooms, while hotel owners can manage their listings, track bookings, and analyze revenue.

## Features

### User Side
- Browse and search for hotels and rooms
- View room details and amenities
- Book rooms and manage bookings
- User authentication and profile management

### Hotel Owner Side
- Dashboard with real-time insights (bookings, revenue, recent activity)
- Add, edit, and manage hotel rooms
- View and manage bookings

### Admin/Backend
- RESTful API for all operations
- Secure authentication and authorization
- Cloudinary integration for image uploads

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Clerk
- **Image Uploads:** Cloudinary

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hellosamrat00/HotelBookingWebApp.git
   cd HotelBookingWebApp
   ```

2. **Install dependencies:**
   - For the frontend:
     ```bash
     cd client-frontend
     npm install
     ```
   - For the backend:
     ```bash
     cd ../server
     npm install
     ```

3. **Set up environment variables:**
   - Create a `.env` file in the `server/` directory with the following variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     CLERK_SECRET_KEY=your_clerk_secret_key
     ```

4. **Run the backend server:**
   ```bash
   npm start
   ```

5. **Run the frontend app:**
   ```bash
   cd ../client-frontend
   npm run dev
   ```

6. **Open the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## Folder Structure

```
client-frontend/   # React frontend
server/            # Node.js/Express backend
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.
