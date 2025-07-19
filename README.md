# EduAI - AI-Powered Educational Platform

EduAI is an educational platform that uses AI to generate video summaries, quizzes, and learning roadmaps from YouTube content.

## Project Structure

```
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express + TypeScript backend
│   ├── src/
│   ├── dist/
│   └── package.json
```

## Features

- Video summarization
- Quiz generation
- Learning roadmap creation
- Interactive 3D AI avatar
- Study timer

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Three.js
- Framer Motion

### Backend
- Express.js
- TypeScript
- @xenova/transformers (AI model)
- YouTube Transcript API

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/eduai.git
cd eduai
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Create environment files:
```bash
# In root directory
cp .env.example .env

# In backend directory
cp .env.example .env
```

5. Start development servers:

Frontend:
```bash
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy

### Backend (Render)
1. Push your code to GitHub
2. Create a new Web Service in Render
3. Connect your repository
4. Configure environment variables
5. Deploy

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000 # Development
VITE_API_URL=https://your-render-api.onrender.com # Production
```

### Backend (.env)
```
PORT=3000
NODE_ENV=development
```

## License

MIT