# PostSearch_bc is a Rest API.

**This is a nodeJS server with the aim to connect databases mongoDB and neo4j, and to serve data asked in graph query langage (graphQL).**

In here, BackCountry stands for Back-end.

# Ressources:

1. **NodeJS 11, Npm, Babel.** https://nodejs.org/en/, https://www.npmjs.com/, https://babeljs.io/,
2. **Apollo GraphQL**: https://www.apollographql.com/
3. **Cypher Query Langage** https://neo4j.com/developer/cypher-query-language/
4. **MongoDB** https://www.mongodb.com/ AND/OR **Mongoose** https://mongoosejs.com/docs/guide.html
5. **Neo4j**: https://neo4j.com/
6. **Mongo-Connector**: https://github.com/yougov/mongo-connector AND **Neo4j Doc Manager**:to connect and synchronise data of both databases (https://neo4j.com/developer/neo4j-doc-manager/)

# API How it works:

**Queries are sent in graph langage. The API thanks to GraphQL Apollo server understands and through standards and project-made resolvers calls a respective controller.**

**There are four kinds of controller:**

- MongoDB: set of mongo driver's and project-made functions.
- Mongoose schema: usage of mongoose layer for indexing, querying and treating complex document (noSQL) data.
- Neo4j driver (inserted directly into Apollo Server instance) - (translate graphQL query in cypher query langage)
- Home-made neo4j controller with cypher query langage content.

**The server uses database in regard to data particularities:**

- MongDB: a undetermined document content with no extensive usage of data relation. Our example is a story.
- Mongoose: NoSQL data that still require a degree dependency and needs flexility in its content. Our example is a post or a comment in a story.
- Neo4j driver: Simple storage of relatinal data. No data treatment programs are required to be programmed. Our example is a Question _"Le questionnement est-il une langue, un savoir, une science?"_ sent by the user James.
- Home-made neo4j controller for complex query that require programmers to write in cypher query langage.

# To Query the server:

the running: http://51.68.82.190/7503 the local: http://0.0.0.0:7503

For instance, You can use this request to create a Question:
`mutation { CreateQuestion(content: "Le questionnement est-il une langue, un savoir, une science?", person: {name: 'James'}){ content } }`
and you can use this request to fetch Question
`{Question(content: "Le questionnement est-il une langue, un savoir, une science?", person: {name: 'James'}) { content, id } }`

Considered the graphQL schema. Each type (entity) can be manipulate with CRUD Function (CreateEntity, UpdateEntity...)

# How to run the server:

_Note Databases has changed directory: it is now aymericosal/postsearch_dbs. Commands remains the same_
There are 3 environments:

1. DEVELOP
2. LOCAL
3. PRODUCTION

_how to run the node server PostSe-backcountry:_

**DEVELOP (option1):** using remote hosted DBs and building server with the local machine.
!Warning: There is only one develop environment shared for the team, there are only one instance of Mongo and Neo4j.
`NODE_ENV=.develop npm run dev`
(make sure to type '.' in NODE_ENV=.develop)

**LOCAL (option2):** local database runned with docker and building server with the local machine.

1. Open three shell in this directory, at root.
2. In 1st shell, run the command:
   `docker-compose -f dbs.compose.yml up`
   Wait until you have notification that MongoDB and Neo4j are running.
3. In a 2nd shell, run the command:
   `mongo`
   OR
   `docker exec -it <ContainerID> mongo`

   Finally:
   `use postsearch`

5. Now, you can run the server in DEV MODE by using the following:
   `npm run dev`

**PRODUCTION (option3)** running docker hosted DBs and building server in a docker container with access to 'dbsnetwork'
To run the node server use:
`NODE_ENV=.docker.production docker-compose up`

**NOTE: for running a docker container only**
To run directly a container, you can specify the environment endpoint:
`docker run --env-file ./environements/.env.docker.production <imageID>`

**NOTE: DEBUGGING MODE**:
`NODE_ENV=.develop DEBUGGER_CHROME=-DEBUGGER_CHROME docker-compose up`

**NOTE: Environments**
Environments are passed from this directory. You must start a nodeJS server from the root.

@Warning: --- Server may be down ---
......

# How to set OVH instance, the remote, with Neo4J MongoDB and the Mongo Connector.

In the server OVH:

1. Do **LOCAL (option2):** without step 5.
2. To run the node server use:
   `NODE_ENV=.production docker-compose -f backcountry.compose.yml up`
   (careful to include the .)

The server already contains the docker-compose files and plugins.
(note: Images push on docker hubs are the one used by the server, tag: latest).

# Tutoriel and help for beginner:

The server is connected to a neo4j database server.

Ressources from GRAND stack has been used.
https://grandstack.io/

Official Doc Apollo:
https://www.apollographql.com

Tutoriel from hacknoon:
https://hackernoon.com/building-trending-activity-feeds-using-graphql-and-neo4j-e62ee790238e

Helpful GraphQL Apollo Server et Neo4j
https://github.com/neo4j-graphql/neo4j-graphql-js/tree/master/example/apollo-server

#Note:
Dependencies Fix:
`babel-plugin-transform-runtime` is used to fix a graphql javascript run-time and neo4j driver compatibility.
This should be remove from the README.ME as soon as the issue is documented on github.

You may face issue in JSON.parse or JSON.Stringify with Stream Object
example Query:
`mutation{ CreateStream( content: "{\"blocks\": \"test\"} " ) { id content } }`
