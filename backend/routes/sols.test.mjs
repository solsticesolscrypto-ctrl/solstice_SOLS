// Eliminar archivo innecesario de test .mjs para evitar errores y duplicidad
// El archivo completo se elimina
// import request from 'supertest';
// import express from 'express';
// import solsRouter from '../routes/sols.js';
//
// const app = express();
// app.use(express.json());
// app.use('/', solsRouter);
//
// describe('POST /send-sols', () => {
//   it('debe rechazar datos inválidos', async () => {
//     const res = await request(app)
//       .post('/send-sols')
//       .send({ solanaAddress: 'INVALID', amount: -1 });
//     expect(res.statusCode).toBe(400);
//     expect(res.body.error).toBe('Datos inválidos');
//   });
//
//   it('debe rechazar si faltan datos', async () => {
//     const res = await request(app)
//       .post('/send-sols')
//       .send({});
//     expect(res.statusCode).toBe(400);
//     expect(res.body.error).toBe('Datos inválidos');
//   });
//
//   // Puedes agregar más tests para casos válidos usando mocks
// });
