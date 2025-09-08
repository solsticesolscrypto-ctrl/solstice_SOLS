const request = require('supertest');
const express = require('express');
const solsRouter = require('../routes/sols.js');

const app = express();
app.use(express.json());
app.use('/', solsRouter.default || solsRouter);

describe('POST /send-sols', () => {
  it('debe rechazar datos inválidos', async () => {
    const res = await request(app)
      .post('/send-sols')
      .send({ solanaAddress: 'INVALID', amount: -1 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Datos inválidos');
  });

  it('debe rechazar si faltan datos', async () => {
    const res = await request(app)
      .post('/send-sols')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Datos inválidos');
  });

  // Puedes agregar más tests para casos válidos usando mocks
});
