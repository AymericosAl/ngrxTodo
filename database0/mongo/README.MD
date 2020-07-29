README.MD to update.

**DOCKER (option1):** local database runned with docker

run the command:
   `docker-compose up`
database name: avalancheMongodb

run the command:
`mongo`
`use avalancheMongodb`
check the picture for auth

# Note:
1 - The back-end will try to connect with Drayd user.
2 - `db.Todo.find()` to get the collection of Todo.
3 - Docker network 'dbsnetwork' is used by the back-end: avalanche_node
