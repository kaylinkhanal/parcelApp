var { ruruHTML } = require("ruru/server")
const User = require('./models/user')
var { GraphQLObjectType,GraphQLSchema, GraphQLBoolean,GraphQLList, GraphQLID, GraphQLString,  } = require("graphql")

const connection = require('./db/connection')
var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")

//defining types
const UserType = new GraphQLObjectType({
  name: 'user',
  fields:{
    id: {type:GraphQLID},
    phoneNumber: {type:GraphQLString}, 
    fullName:{type:GraphQLString}, 
    email:{type:GraphQLString}, 
    hasReadNotifications: {type:GraphQLBoolean}, 
  }
})



//defining queries
const query = new GraphQLObjectType({
  name: 'query',
  fields:{
    users: {
      type: new GraphQLList(UserType),
      resolve(){
        console.log("Test")
        return User.find()
      }
    },
    user: {
      type: UserType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(_, args){
        console.log(args.id)
        return User.findById(args.id)
      }
    },
  }
})

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields:{
    deleteUser: {
      type: UserType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(_, args){
        return User.findByIdAndDelete(args.id)
      }
    },
    createUser: {
      type: UserType,
      args: {
        phoneNumber: {type:GraphQLString}, 
        fullName:{type:GraphQLString}, 
        email:{type:GraphQLString}, 
      },
      resolve(_, args){
        return User.create(args)
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: {type: GraphQLID},
        phoneNumber: {type:GraphQLString}, 
        fullName:{type:GraphQLString}, 
        email:{type:GraphQLString}, 
      },
      resolve(_, args){
        const {id, ...otherFields} = args
        return User.findByIdAndUpdate(args.id, otherFields)
      }
    },
  }
})

connection()
var app = express()
const cors = require('cors')
app.use(cors())
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})



app.all(
  "/graphql",
  createHandler({
    schema: new GraphQLSchema({query,mutation}),
    // rootValue: root,
  })
)

app.listen(4000)


console.log("Running a GraphQL API server at localhost:4000/graphql")
// Serve the GraphiQL IDE.
