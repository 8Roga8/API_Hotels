const requets = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users debe crear un usuario', async () => {
    const newUser = {
        firstName: "Mannuel",
        lastName: "Salazar",
        email: "salazar11@gmail.com",
        password: "salazar123",
        gender: "other"
    };
    const res = await requets(app).post('/users').send(newUser);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newUser.firstName);
});

test('POST /users/login debe loggear al usuario', async () => {
    const credentials = {
        email: "salazar11@gmail.com",
        password: "salazar123"
    };
    const res = await requets(app).post('/users/login').send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(credentials.email);
});

test('POST /users/login con credenciales incorrectas debe dar error', async () => {
    const credentials = {
        email: "error@gmail.com",
        password: "error321"
    }
    const res = await requets(app).post('/users/login').send(credentials);
    expect(res.status).toBe(401);
});

test('GET /users debe mostrar todos los usuarios', async () => {
    const res = await requets(app).get('/users').set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('GET /users/:id debe traerme un usuario por su (id)', async () => {
    const res = await requets(app).get('/users/'+id).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
});

test('PUT /users/:id debe actualizar la informacion del usuario', async () => {
    const updateUser = {
        firstName: "Isabella",
    }
    const res = await requets(app).put(`/users/${id}`).send(updateUser).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updateUser.firstName);
});

test('DELETE /users/:id debe eliminar un usuario', async () => {
    const res = await requets(app).delete('/users/'+id).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});

