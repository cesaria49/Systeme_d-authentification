const request = require('supertest')
const UserModel = require ("../models/users")
const serve = require('../server')


/*describe('décrit la route user', () => { 
    test('doit renvoyer l\'objet Welcome to the Page', async() => { 
      const res = await request(server) 
         .get('/users/home') 
          expect(res.status).toBe(200)
          expect(res.body).toEqual({ 
           //text :"Welcome to the Page"    
      })
    }) 
  })*/
 /*describe("Décrit la route user",()=>{
  test ('renvoie Welcome to the Page',async()=>{
    const response = await request.agent(server).get('/users/home')
 })
 }) */
/*const validUser = {
  firstname : 'Julien',
  lastname : 'Dupont',
  email : 'juliendupont@gmail.com',
  password : 'password'
}
 describe('user',()=>{
    beforeEach(()=>{
      server
    })
    afterEach(()=>{
      server.close()
      UserModel.collection.deleteMany()
    })

    describe ('GET /users/home',()=>{
      it('should return a status 401 if J01 validation kicks',async()=>{
        const response = await request(server)
            .post('/api/users/signup')
            .send({})
            .set({Accept : 'Application/json'})
            expect(response.status).toBe(401)
    })
    it ('should create user and return status 201',async()=>{
      const response = await request(server)
      .post('/api/users/signup')
      .send({validUser})
      .set({Accept : 'Application/json'})
      expect(response.status).toBe(201)
      expect(response.body).toMatchObject({message : 'User Created!'})
    })
    })

    describe('Post /api/users/signin',()=>{
      it('should return a status 401 if J01 validation kicks',async()=>{
        const response = await request(server)
            .post('/api/users/signin')
            .send({})
            .set({Accept : 'Application/json'})
          expect(response.status).toBe(401)
    })
      it ('should return a status 401 with invalid email or password message if user with the given email it not found'),async()=>
        await request(server)
          .post('/api/users/signup')
          .send(validUser)
          .set({Accept : 'Application/json'})
        const response = await request(server)
          .post('/api/users/signin')
          .send({email : 'azerty@gmail.com',password : validUser.password})
    })
  })*/

    describe('users',()=>{
      beforeEach(()=>{
        serve
      })
      afterEach(()=>{
        serve.close()
        UserModel.collection.deleteMany()
      })
  
      describe ('GET /users/home',()=>{
        it('should return a status 200 if join validation kicks',async()=>{
          const response = await request(serve)
              .get('/users/home')
              .set({Accept : 'Application/json'})
              expect(response.status).toBe(200)
      })
      
      })

      describe ('POST users/add',()=>{
        it('should create with req.body an user status 201',async()=>{
          const response = await request (serve)
          .post('/users/add')
          .send({firstname : 'toni',
            lastname : 'Momo',
            email : 'momo@gmail.com',
            password : 'toto'})
          .set({Accept : 'Application/json'})
          expect(response.status).toBe(201)
          //expect(response.body).toMatchObject(sendData)
        })
        it ('should return 400 if !req.body',async()=>{
          const response = await request (serve)
          .post('/users/add')
          .send({firstname : 'toni',
            lastname : 'Momo',
            email : 'momo@gmail.com',})
          .set({Accept :'Application/json'})
          expect(response.status).toBe(400)
        })
        it ('should return 400 if !req.body',async ()=>{
          const response = await request(serve)
          .post('/users/add')
          .send({lastname : 'assiba',
                 email :'assiba@gmail.com'
          })
          .set({Accept :'Application/json'})
          expect(response.status).toBe(400)
          expect(response.body).toMatchObject({text:"Merci d'ajouter les informations"})

        })
      })
      describe('POST users/getD',()=>{
        it('should return a status 200',async()=>{
          const response = await request (serve)
          .get('/users/getD')
          .set({Accept : 'Application/json'})
          expect(response.status).toBe(200)

        })
      })
      /*describe('POST users/login',()=>{
        it('should return a token if email and password are corrects',async()=>{
          const response = await request (serve)
          .post('/users/login')
          .send({email : 'momo@gmail.com',
            password : 'toto'})
          .set({Accept : 'Application/json'})
          expect(response.status).toBe(200)
        })
      })*/
    })
 
 