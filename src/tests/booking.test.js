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


test('GET /booking debe mostrar todas las bookings', async () => {
    const res = await requets(app).get('/bookings').set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POSt /bookings debe crear una booking', async () => {
    newBooking = {
        checkIn: "2024-05-10",
        checkOut: "2024-06-11"
    }
    const res = await requets(app).post('/bookings').send(newBooking).set("Authorization", `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.checkIn).toBe(newBooking.checkIn);
});

test('PUT /bookings/:id debe actualizar una booking', async () => {
    const updateBooking = {
       checkOut: "2024-06-30"
    }
    const res = await requets(app).put(`/bookings/${id}`).send(updateBooking).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.checkOut).toBe(updateBooking.checkOut);
});

test('DELETE /bookings/:id debe eliminar una booking', async () => {
    const res = await requets(app).delete('/bookings/'+id).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});