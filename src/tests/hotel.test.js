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

test('POST /hotels debe crear un hotel', async () => {
    const newHotel = {
        name: "Prueba",
        description: "descripcion de prueba",
        price: "500",
        address: "direccion de prueba",
        lat: "48.87",
        lon: "2.300"
    }
    const res = await requets(app).post('/hotels').send(newHotel).set("Authorization", `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newHotel.name);    
}); 


test('GET /hotels debe traer todos los hoteles', async () => {
    const res = await requets(app).get('/hotels');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('GET /hotels/:id debe traerme un hotel por su (id)', async () => {
    const res = await requets(app).get('/hotels/'+id);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
});

test('PUT /hotels/:id debe actualizar un hotel', async () => {
    const updateHotel = {
        name: "Hotel Budapes"
    }
    const res = await requets(app).put(`/hotels/${id}`).send(updateHotel).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateHotel.name);
});

test('DELETE /hotels/:id debe eliminar un hotel', async () => {
    const res = await requets(app).delete('/hotels/'+id).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});