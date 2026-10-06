# CodeArena — Full-Stack Developer Assessment & Online Judge Platform

CodeArena is a full-stack online coding and developer assessment platform where users can solve programming problems, submit code, receive automated evaluation results, and track their coding progress.

The project is being built to explore real-world software engineering concepts including REST APIs, authentication, database design, asynchronous job processing, code execution, real-time communication, testing, Docker, and CI/CD.

## 🎯 Project Goal

The goal of CodeArena is to build a scalable coding platform that goes beyond a basic LeetCode clone.

The platform is designed around three main experiences:

- **Developers/Students:** Practice coding problems and track progress.
- **Contest Participants:** Participate in timed coding contests.
- **Companies:** Create coding assessments and evaluate candidates.

## 🚀 Current Features

> This section will be updated as features are implemented.

- [ ] User authentication
- [ ] User profile
- [ ] Coding problem browser
- [ ] Problem filtering
- [ ] Online code editor
- [ ] Code submission
- [ ] Automated code evaluation
- [ ] Submission history
- [ ] Coding progress
- [ ] Coding contests
- [ ] Company assessments

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Monaco Editor

### Backend
- Node.js
- Express.js
- TypeScript
- REST APIs
- WebSockets / Socket.IO

### Database
- PostgreSQL
- Prisma ORM

### Infrastructure
- Redis
- BullMQ
- Docker
- Docker Compose
- GitHub Actions

### Code Execution
- Judge0
- Docker-based sandboxing

### Testing
- Jest
- Supertest
- React Testing Library
- Playwright

## 🏗️ Planned Architecture

```text
Next.js Frontend
       │
       ▼
Node.js / Express API
       │
   ┌───┴────┐
   ▼        ▼
PostgreSQL Redis
            │
            ▼
       Redis Queue
            │
            ▼
      Background Worker
            │
            ▼
     Judge0 / Sandbox
            │
            ▼
      Submission Result
            │
       ┌────┴────┐
       ▼         ▼
  PostgreSQL  WebSocket
                  │
                  ▼
             Next.js UI
```

## 🗄️ Planned Database

Core entities will include:

- `users`
- `problems`
- `test_cases`
- `submissions`
- `languages`
- `tags`
- `contests`
- `contest_problems`
- `contest_participants`
- `assessments`
- `assessment_candidates`

## 🔮 Future Features

- AI-powered code hints
- AI code explanations
- AI-generated test cases
- Code plagiarism detection
- Advanced performance analytics
- Developer rating system
- Global leaderboard
- Company assessment reports
- Discussion forum
- Editorial solutions
- Docker-based isolated execution
- Horizontal worker scaling
- Kubernetes deployment
- Prometheus/Grafana monitoring

## 📈 Learning Objectives

Through this project, I aim to gain practical experience in:

- Full-stack development
- REST API design
- Authentication & authorization
- PostgreSQL database design
- Redis & job queues
- Asynchronous processing
- Real-time systems
- Code execution architecture
- System design
- Docker & containerization
- Automated testing
- CI/CD
- Cloud deployment
- Security & scalability

## 🎯 Project Vision

CodeArena aims to evolve from a coding practice platform into a complete **developer assessment ecosystem** connecting developers, competitive programmers, and companies through a single platform.

The focus is not only on building features, but also on understanding how modern software systems are **designed, developed, tested, deployed, and scaled**.
