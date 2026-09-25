const request = require('supertest');
const { app, resetStore } = require('../server');

beforeEach(() => {
  resetStore();
});

describe('GET /health', () => {
  it('returns ok status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('POST /api/mood', () => {
  it('records a valid mood submission', async () => {
    const res = await request(app)
      .post('/api/mood')
      .send({ sessionId: 'lecture-1', mood: 'good', comment: 'Clear explanation' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/recorded/i);
  });

  it('rejects an invalid mood value', async () => {
    const res = await request(app)
      .post('/api/mood')
      .send({ sessionId: 'lecture-1', mood: 'ecstatic' });

    expect(res.statusCode).toBe(400);
  });

  it('rejects a missing sessionId', async () => {
    const res = await request(app).post('/api/mood').send({ mood: 'good' });
    expect(res.statusCode).toBe(400);
  });
});

describe('GET /api/moods/:sessionId', () => {
  it('aggregates counts and comments correctly', async () => {
    await request(app).post('/api/mood').send({ sessionId: 's1', mood: 'great' });
    await request(app).post('/api/mood').send({ sessionId: 's1', mood: 'great' });
    await request(app)
      .post('/api/mood')
      .send({ sessionId: 's1', mood: 'confused', comment: 'Lost after slide 10' });

    const res = await request(app).get('/api/moods/s1');

    expect(res.statusCode).toBe(200);
    expect(res.body.totalResponses).toBe(3);
    expect(res.body.counts.great).toBe(2);
    expect(res.body.counts.confused).toBe(1);
    expect(res.body.comments).toHaveLength(1);
    expect(res.body.comments[0].comment).toBe('Lost after slide 10');
  });

  it('returns zeroed counts for an unknown session', async () => {
    const res = await request(app).get('/api/moods/unknown-session');
    expect(res.statusCode).toBe(200);
    expect(res.body.totalResponses).toBe(0);
  });
});
