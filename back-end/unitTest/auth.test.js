const supertest = require('supertest')
const app = require('../server')

// test unit for register
describe("test for register function", () => {
    describe("when email already exist", () => {
        test('when email already exist', async () => {
            const response = await supertest(app).post('/api/auth/register').send({
                fullname: "test",
                email: "chaimaetoumy5@gmail.com",
                password: "admin"
            })
            expect(response.statusCode).toBe(400)
        })
    })
    describe("when data is correct", () => {
        test('when data is correct', async () => {
            const response = await supertest(app).post('/api/auth/register').send({
                fullname: "jest",
                email: "jest@gmail.com",
                password: "jest"
            })
            expect(response.statusCode).toBe(201)
        })
    })
    describe("when data is missing", () => {
        test('when data is missing', async () => {
            const response = await supertest(app).post('/api/auth/register').send({
                fullname: "chaimaa",
                email: "",
                password: ""

            })
            expect(response.statusCode).toBe(404)
        })
    })
})
