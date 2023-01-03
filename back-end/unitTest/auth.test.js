const supertest = require('supertest')
const app = require('../server')

// test unit for register
describe("------------------test for register function--------------------", () => {
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

// test unit for login
describe("------------------test for login function--------------------", () => {

    describe("when email and password is missing", () => {

        test('should reponde with a status code 400', async () => {
            const response = await supertest(app).post("/api/auth/login").send({
                email: "chaimaetoumy5@gmail.com",
                password: ""
            })
            expect(response.statusCode).toBe(400)
        })

    })
    describe("given a valid email and password", () => {

        test('should reponde with a 200 status code', async () => {
            const response = await supertest(app).post("/api/auth/login").send({
                email: "chaimaetoumy5@gmail.com",
                password: "admin"
            })
            expect(response.statusCode).toBe(200)
        })
    })
    describe("not verify account", () => {

        test('should reponde with a 401 status code (not verify)', async () => {
            const response = await supertest(app).post("/api/auth/login").send({
                email: "admin@gmail.com",
                password: "chaimaa"
            })
            expect(response.statusCode).toBe(401)
        })

    })
    describe("given incorrect password", () => {

        test('should reponde with a 400 status code', async () => {
            const response = await supertest(app).post("/api/auth/login").send({
                email: "chaimaetoumy5@gmail.com",
                password: "code"
            })
            expect(response.statusCode).toBe(400)
        })

    })
    describe("user not found", () => {

        test('should reponde with a 404 status code', async () => {
            const response = await supertest(app).post("/api/auth/login").send({
                email: "syndique@gmail.com",
                password: "syndique"
            })
            expect(response.statusCode).toBe(404)
        })

    })

})

// test unit for forgetPassword
describe("---------------test for forgot password ---------------", () => {
    describe("when email is missing", () => {
        test("should reponde with a 400 status code", async () => {
            const response = await supertest(app).post("/api/auth/forgotpassword").send({
                email: ""
            })
            expect(response.statusCode).toBe(400)
        })
    })
    describe("when user is not found", () => {
        test("sould reponde with a 404 status code", async () => {
            const response = await supertest(app).post("/api/auth/forgotpassword").send({
                email: "youcoders@gmail.com"
            })
            expect(response.statusCode).toBe(404)
        })
    })
    describe("when email is correct", () => {
        test("sould reponde with a 200 status code", async () => {
            const response = await supertest(app).post("/api/auth/forgotpassword").send({
                email: "chaimaetoumy5@gmail.com"
            })
            expect(response.statusCode).toBe(200)
        })
    })

})

//test unit for reset password
describe("-------------------test for reset password -------------", () => {
    describe("when token is missing", () => {
        test("should reponde with a 404 status code", async () => {
            const response = await supertest(app).post("/api/auth/resetpassword").send({
                password: "admin"
            })
            expect(response.statusCode).toBe(404)
        })
    })
    describe("when password is missing", () => {
        test("should reponde with a 400 status code", async () => {
            const response = await supertest(app).post("/api/auth/resetpassword/test").send({
                password: ""
            })
            expect(response.statusCode).toBe(400)
        })
    })
})

