# SkillSwap 💼🎯

**SkillSwap** is a full-stack skill-matching platform that enables users to showcase, search, and connect with others based on real, practical skills — not just resumes.  
Built with **React (Vite)** on the frontend and **Django REST Framework** on the backend, SkillSwap is designed to promote collaborative learning and growth in a skill-first world.

---

## 🚀 Live Demo  
🟢 Coming Soon: Hosted on [Render / Vercel / Railway]  
🔑 Demo Login:  
```
Email: demo@skillswap.com  
Password: skillswap@123
```

---

## ✨ Core Features

- ✅ User Authentication (Signup/Login/Logout)
- ✅ Protected Routes for Dashboard & Profile
- ✅ Profile Editing with Skill Listing
- ✅ Skill Matching System (Phase 2 planned)
- ✅ Responsive UI (Desktop & Mobile Ready)
- ✅ Firebase Auth + Django REST Backend Integration
- ✅ Error Handling, Routing, and Clean Navigation

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js (Vite)  
- React Router  
- Firebase Authentication  
- React Bootstrap

**Backend:**  
- Django REST Framework  
- PostgreSQL / SQLite  
- CORS Headers  
- dotenv for config management

**Deployment:**  
- Frontend: Vercel / Netlify  
- Backend: Render / Railway  
- Database: PostgreSQL / Firebase (Auth)

---

## 📁 Folder Structure (Simplified)

```
SkillSwap/
├── backend/
│   ├── manage.py
│   ├── SkillSwapApp/
│   ├── users/, matches/
├── frontend/
│   ├── src/
│   ├── public/
├── docs/
│   ├── (Project docs, logs – in progress)
├── README.md
```

---

## 🧪 How to Run Locally

### 📦 1. Backend (Django)

```bash
cd backend/
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

🛑 Don't forget to create a `.env` file:
```
SECRET_KEY=your_secret_key
DEBUG=True
```

---

### 💻 2. Frontend (React)

```bash
cd frontend/
npm install
npm run dev
```

🛑 Don't forget to add `.env`:
```
VITE_FIREBASE_API_KEY=your_key
```

---

## 👤 Demo Credentials (for recruiters)

```
(for 1st time, signup with:)
Email: demo@skillswap.com  
Password: skillswap123
```

You can log in and explore the dashboard and profile edit features.

---

## 📈 Future Enhancements (v2.0 Roadmap)

- 🔥 XP system with gamification (Levels, Badges, Progress)
- 🔁 Real-time chat for skill exchange
- 🤖 AI-based skill recommendations
- 🧠 Verified endorsements from peers
- 🧩 Group skill learning modules (SkillPods)

---

## 👨‍💻 Author

Built with ❤️ by AnkitKumar
Connect: https://www.linkedin.com/in/ankit-kumar-a72590269/ • [Portfolio URL(coming soon)] • https://github.com/Anku-OO7

---

## 📄 License

This project is licensed under the MIT License — see `LICENSE.md` for details.
