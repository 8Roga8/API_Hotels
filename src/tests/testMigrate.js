const sequelize = require('../utils/connection');
const requets = require('supertest');
const app = require('../app');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        const testUser = {
            firstName: "Abrahan",
            lastName: "Molina",
            email: "molina@gmail.com",
            password: "molina123",
            gender: "male"
        }
        
        await requets(app).post('/users').send(testUser);
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();