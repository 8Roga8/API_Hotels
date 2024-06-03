const requets = require('supertest');
const app = require('../app');

let id;
let token;

beforeAll(async () => {
    const credentials ={
        email: "molina@gmail.com",
        password: "molina123"
    }

    const res = await requets(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('GET /reviews debe mostrar todas las reviews', async () => {
    const res = await requets(app).get('/reviews');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /reviews debe crear una review', async () => {
    const newReview = {
        rating: "5",
        comment: "hola"
    }
    const res = await requets(app).post('/reviews').send(newReview).set("Authorization", `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.rating).toBe(newReview.rating);
});

test('PUT /reviews/:id debe actualizar una review', async () => {
    const updateReview = {
       rating: "4"
    }
    const res = await requets(app).put(`/reviews/${id}`).send(updateReview).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(updateReview.rating);
});

test('DELETE /reviews/:id debe eliminar una review', async () => {
    const res = await requets(app).delete('/reviews/'+id).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});