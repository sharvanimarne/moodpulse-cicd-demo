# Agile Project Plan — MoodPulse
**FA2 Skill-Based Activity: Design and Demonstrate a Simple CI/CD Pipeline for an Agile Project**

**Subject:** Agile Software Development
**Department:** IT | **Year:** B.Tech Final Year | **Academic Year:** 2026–2027

**Team:**
| Name | PRN |
|---|---|
| Sharvani Marne | 123B1F061 |
| Siddharth Kakade | 123B1F040 |

**Project chosen:** MoodPulse — Anonymous Classroom Mood Tracker
*(Not from the sample list of Student/Library/Food/E-commerce systems, by design — a small,
demo-friendly app that still exercises a full CI/CD pipeline.)*

---

## 1. Problem Statement
Teachers rarely get honest, real-time feedback on how a lecture is landing. Students are
often reluctant to speak up if they're confused or disengaged. MoodPulse lets students
anonymously log their mood + an optional comment during a session, and gives the teacher
a live aggregated dashboard — no login, no friction, no attribution.

## 2. User Stories

| # | User Story | Priority |
|---|---|---|
| US1 | As a **student**, I want to submit my mood for a session anonymously, so that I can be honest without fear of judgment. | High |
| US2 | As a **student**, I want to add an optional short comment with my mood, so that I can give context beyond a single emoji. | Medium |
| US3 | As a **teacher**, I want to view aggregated mood counts for a session, so that I can gauge overall classroom sentiment at a glance. | High |
| US4 | As a **teacher**, I want to see the anonymous comments for a session, so that I can understand specific concerns. | Medium |
| US5 | As a **student**, I want confirmation after submitting, so that I know my response was recorded. | Low |

## 3. Sprint Planning

**Sprint duration:** 1 week (compressed for this activity)

| Sprint | Goal | Stories covered |
|---|---|---|
| Sprint 1 | Build and test the core mood API | US1, US2, US5 |
| Sprint 2 | Build the teacher dashboard, wire up CI/CD pipeline | US3, US4 |

**Sprint 1 tasks:**
- Design `POST /api/mood` and `GET /api/moods/:sessionId` endpoints
- Implement in-memory storage keyed by session ID
- Write Jest + Supertest unit/integration tests
- Add input validation (reject invalid mood values / missing session ID)

**Sprint 2 tasks:**
- Build student submission page (`index.html`)
- Build teacher dashboard page (`dashboard.html`) with auto-refresh
- Set up ESLint for code quality
- Write GitHub Actions workflow: Build → Test → Lint → Deploy
- Containerize the app with Docker and deploy the image to GitHub Container Registry

## 4. Definition of Done (DoD)
A user story is considered **Done** when:
1. Code is committed and merged into the `main` branch.
2. All automated Jest tests pass (`npm test`).
3. ESLint reports zero errors (`npm run lint`).
4. The feature has been manually verified against its acceptance criteria.
5. The CI/CD pipeline runs green end-to-end (Build → Test → Lint → Deploy) on GitHub Actions.
6. Relevant documentation (README) is updated.

## 5. Acceptance Criteria — US1 (Submit mood anonymously)

**User Story:** As a student, I want to submit my mood for a session anonymously, so that I
can be honest without fear of judgment.

- **Given** a valid `sessionId` and a `mood` from the allowed set (`great`, `good`, `okay`,
  `confused`, `bad`), **when** the student submits via `POST /api/mood`, **then** the API
  responds with `201 Created` and a confirmation message.
- **Given** the same request, **when** the submission succeeds, **then** the response
  contains no student-identifying information (fully anonymous).
- **Given** a `GET /api/moods/:sessionId` call afterward, **then** the new mood is reflected
  in the aggregated counts for that session.
- **Given** an invalid `mood` value (not in the allowed set), **when** submitted, **then**
  the API responds with `400 Bad Request` and does not store the entry.
- **Given** a missing `sessionId`, **when** submitted, **then** the API responds with
  `400 Bad Request`.

*(Acceptance criteria above are enforced by the automated test suite in
`__tests__/mood.test.js`, which is executed as part of the CI/CD pipeline's Automated
Testing stage.)*

## 6. CI/CD Pipeline Design

```
GitHub (push/PR) → Build → Automated Testing → Code Quality Check → Deployment
```

| Stage | Tool | What it does |
|---|---|---|
| Build | GitHub Actions + npm | Checks out code, installs dependencies |
| Automated Testing | Jest + Supertest | Runs unit/integration tests against the API |
| Code Quality Check | ESLint | Lints the codebase for errors and style issues |
| Deployment | Docker + GitHub Container Registry | Builds and pushes a container image (only on `main`, only if tests + lint pass) |

Full pipeline definition: `.github/workflows/ci-cd.yml`

## 7. Rubric self-mapping
| Rubric criterion | Where it's addressed |
|---|---|
| Agile Project Planning | Sections 2–4 of this document |
| CI/CD Pipeline Implementation | `.github/workflows/ci-cd.yml`, `Dockerfile` |
| Demonstration & Presentation | See "Recording the demo video" in `README.md` |
