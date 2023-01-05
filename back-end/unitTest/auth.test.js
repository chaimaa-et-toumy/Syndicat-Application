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

//test unit for client
describe("-------------------test for client -------------", () => {

    describe("when data is missing", () => {
        test("should reponde with a 400 status code", async () => {
            const response = await supertest(app).post("/api/client/addClient").send({
                fullname: "client",
                cin: "BAAAAA",
                tel: ""
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("when client already exist", () => {
        test("should reponde with a 400 status code", async () => {
            const response = await supertest(app).post("/api/client/addClient").send({
                fullname: "client",
                cin: "BA17245",
                tel: "12345678"
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("when data is updated", () => {
        test("should reponde with a 200 status code", async () => {
            const response = await supertest(app).post("/api/client/updateClient/63b451ec92ba4646f7728f5a").send({
                tel: '670334490'
            })
            expect(response.statusCode).toBe(400)
        })

    })

    // describe("when client is added", () => {
    //     test("should reponde with a 201 status code", async () => {
    //         const response = await supertest(app).post("/api/client/addClient").send({
    //             fullname: "addClient",
    //             cin: "HA4353",
    //             tel: "0654378296"
    //         })
    //         expect(response.statusCode).toBe(201)
    //     })

    // })

    describe("when client is deleted", () => {
        test("should reponde with a 200 status code", async () => {
            const response = await supertest(app).delete("/api/client/deleteClient/63b698207495")
            expect(response.statusCode).toBe(200)
        })
    })
})

//test unit for appartment
describe("-------------------test for appartment -------------", () => {
    describe("when data is missing", () => {
        test("should reponde with a 400 status code", async () => {
            const response = await supertest(app).post("/api/appartement/addAppartement").send({
                adresse: "adresse",
                isRented: false,
                prix: 1000,
                surface: ""

            })
            expect(response.statusCode).toBe(400)
        })
    })
    describe("when appartment already exist", () => {
        test("should reponde with a 400 status code", async () => {
            const response = await supertest(app).post("/api/appartement/addAppartement").send({
                adresse: "App 1, youssef ben tachfine",
                isRented: false,
                prix: 1000,
                surface: 100
            })
            expect(response.statusCode).toBe(400)
        })
    })
    // describe("when appartment is added", () => {
    //     test("should reponde with a 201 status code", async () => {
    //         const response = await supertest(app).post("/api/appartement/addAppartement").send({
    //             adresse: "addedApp",
    //             isRented: false,
    //             prix: 1000,
    //             surface: "100"
    //         })
    //         expect(response.statusCode).toBe(201)
    //     })
    // })
    describe("when data is updated", () => {
        test("should reponde with a 200 status code", async () => {
            const response = await supertest(app).post("/api/appartement/updateAppartement/63b55dd37522703b9b69a6bb").send({
                adresse: "test3"
            })
            expect(response.statusCode).toBe(400)
        })
    })
    describe("when appartement is deleted", () => {
        test("should reponde with a 200 status code", async () => {
            const response = await supertest(app).delete("/api/appartement/deleteAppartement/63b698207494")
            expect(response.statusCode).toBe(200)
        })
    })

})

//test unit for paiment
describe("-------------------test for paiment -------------", () => {
    describe("when data is missing", () => {
        test("should reponde with a 400 status code", async () => {
            const response = await supertest(app).post("/api/paiment/addPaiment").send({
                prix: 4000,
                date_paiment: "2021-01-01",
                id_appartement: ""
            })
            expect(response.statusCode).toBe(400)
        })
    })
    describe("when appartment not found", () => {
        test("should reponde with a 400 status code", async () => {
            const response = await supertest(app).post("/api/paiment/addPaiment").send({
                prix: 4000,
                date_paiment: "2021-01-01",
                id_appartement: "63b55e0a980b80ca111b8ccd"
            })
            expect(response.statusCode).toBe(400)
        })
    })
    describe("when data is updated", () => {
        test("should reponde with a 200 status code", async () => {
            const response = await supertest(app).post("/api/paiment/updatePaiment/63b55e0a980b80ca111b8ccf").send({
                date_paiment: "2021-01-01"
            })
            expect(response.statusCode).toBe(200)
        })
    })
    describe("when paiment is deleted", () => {
        test("should reponde with a 200 status code", async () => {
            const response = await supertest(app).delete("/api/paiment/deletePaiment/63b698207494")
            expect(response.statusCode).toBe(200)
        })
    })
})

