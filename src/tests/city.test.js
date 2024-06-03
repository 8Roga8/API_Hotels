const requets = require('supertest');
const app = require('../app');

let token;
let id;

beforeAll(async () => {
    const credentials ={
        email: "molina@gmail.com",
        password: "molina123"
    }

    const res = await requets(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('POST /cities debe crear una ciudad', async () => {
    const newCity = {
        name: "Bogota",
        country: "Colombia",
        countryId: "CO" 
    }
    const res = await requets(app).post('/cities').send(newCity).set("Authorization", `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newCity.name);    
});

test('GET /cities debe traer todas las ciudades', async () => {
    const res = await requets(app).get('/cities');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /cities/:id debe actualizar una ciudad', async () => {
    const updateCity = {
        name: "Ecuador"
    }
    const res = await requets(app).put(`/cities/${id}`).send(updateCity).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateCity.name);
});

test('DELETE /cities/:id debe eliminar una ciudad', async () => {
    const res = await requets(app).delete('/cities/'+id).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});