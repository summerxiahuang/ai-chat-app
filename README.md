# 🤖 AI Chat Application

A modern, full-stack chat application powered by OpenAI's GPT-3.5-turbo with a beautiful React frontend and Node.js backend.

## ✨ Features

- 💬 Real-time chat with AI assistant
- 🎨 Modern, responsive UI with glass morphism design
- 💾 Conversation history storage with MongoDB
- 🔄 Auto-scroll to latest messages
- ⚡ Loading states and typing indicators
- 📱 Mobile-responsive design
- 🛡️ Error handling and validation

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- OpenAI API key

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-chat-app.git
cd ai-chat-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
MONGO_URI=mongodb://localhost:27017/ai-chat-app
PORT=5050
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
ai-chat-app/
├── backend/
│   ├── models/
│   │   └── Conversation.js
│   ├── routes/
│   │   ├── chat.js
│   │   └── conversations.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Chat.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── package.json
└── README.md
```

## 🔧 API Endpoints

### Chat
- `POST /api/chat` - Send a message to the AI

### Conversations
- `GET /api/conversations` - Get all conversations
- `GET /api/conversations/:id` - Get a specific conversation
- `POST /api/conversations` - Save a new conversation
- `PUT /api/conversations/:id` - Update a conversation
- `DELETE /api/conversations/:id` - Delete a conversation

### Health Check
- `GET /health` - Server health status

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **OpenAI API** - AI chat completions
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

## 🎨 Design Features

- **Glass morphism** effect with backdrop blur
- **Gradient backgrounds** and modern shadows
- **Smooth animations** and transitions
- **Responsive design** for all devices
- **Custom scrollbars** and hover effects

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `PORT` | Server port (default: 5050) | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify your environment variables are set correctly
3. Ensure MongoDB is running
4. Check your OpenAI API key is valid

---

Made with ❤️ using React and Node.js
