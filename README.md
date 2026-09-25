# MoodPulse 🎓
**Anonymous Classroom Mood Tracker**

FA2 Skill-Based Activity — Agile Software Development
Pimpri Chinchwad College of Engineering | B.Tech IT, Final Year

**Team:**
- Sharvani Marne — PRN 123B1F061
- Siddharth Kakade — PRN 123B1F040

## What it does
Students anonymously tap an emoji (😄🙂😐😕😢) to record how they feel about a lecture/session,
with an optional comment. Teachers open a live dashboard to see aggregated sentiment and
anonymous comments in real time — useful for getting honest, low-friction classroom feedback.

## Tech stack
- Node.js + Express (REST API)
- Vanilla HTML/CSS/JS frontend (no framework needed — keeps it simple)
- Jest + Supertest (automated tests)
- ESLint (code quality)
- Docker + GitHub Actions (CI/CD)

## Run locally
```bash
npm install
npm start
# open http://localhost:3000        -> student mood submission page
# open http://localhost:3000/dashboard.html  -> teacher dashboard
```

## Run tests / lint
```bash
npm test    # Jest unit + integration tests
npm run lint  # ESLint code quality check
```

## API
| Method | Route                  | Description                          |
|--------|-------------------------|---------------------------------------|
| POST   | /api/mood               | Submit an anonymous mood + comment    |
| GET    | /api/moods/:sessionId   | Get aggregated counts + comments      |
| GET    | /health                 | Health check                          |

## CI/CD Pipeline (GitHub Actions)
File: `.github/workflows/ci-cd.yml`

```
GitHub push/PR → Build → Automated Testing → Code Quality Check → Deployment
```

1. **Build** — checks out code, installs dependencies (`npm ci`)
2. **Automated Testing** — runs the full Jest test suite
3. **Code Quality Check** — runs ESLint across the codebase
4. **Deployment** — (only on push to `main`, only if tests + lint pass) builds a Docker
   image and pushes it to GitHub Container Registry (`ghcr.io/<owner>/moodpulse:latest`)

This uses GHCR + `GITHUB_TOKEN` so the pipeline runs end-to-end with **zero external
accounts or secrets to configure** — ideal for a classroom demo.

## How to set this up on GitHub (for the demo)
1. Create a new **public** GitHub repo, e.g. `moodpulse-cicd-demo`.
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: MoodPulse app + CI/CD pipeline"
   git branch -M main
   git remote add origin https://github.com/<your-username>/moodpulse-cicd-demo.git
   git push -u origin main
   ```
3. Go to the **Actions** tab on GitHub — the pipeline runs automatically and you'll see
   all 4 stages (Build, Automated Testing, Code Quality Check, Deployment) execute live.
4. Go to your GitHub profile → **Packages** to see the deployed Docker image once the
   pipeline finishes.

## Recording the demo video (1–2 minutes)
Suggested flow, narrated in your own voice:
1. (0:00–0:15) Briefly state the project idea and the Agile artifacts you prepared
   (user stories, sprint plan, DoD, acceptance criteria — see `AGILE-PLAN.md`).
2. (0:15–0:35) Show the app running locally: submit a mood on the main page, then show
   it appear on the dashboard.
3. (0:35–1:00) Make a small code change (or just show the existing code) and push to
   GitHub, or show a previous commit.
4. (1:00–1:45) Switch to the GitHub **Actions** tab and show the pipeline running through
   Build → Test → Lint → Deploy, and open one job log to show it actually executing.
5. (1:45–2:00) Show the deployed image under GitHub Packages and wrap up.

## Definition of Done
See `AGILE-PLAN.md` for the full Agile plan (user stories, sprint planning, DoD, and
acceptance criteria).
