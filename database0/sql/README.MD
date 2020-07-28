**DOCKER MySQL DB:** local database runned with docker

run the command:
`docker-compose up`

Connexion to database UI:

1. on browser: localhost:8080 (url)
   (System: "mysql", server: "db", username: "dryad", database: "mnhn_db1")
   note: do not write inverted comma (guillemet)

2. WorkBrench as Dryad User

3. WorkBrench as Root (main admin)
- password: s1mpl3

For all options:
If the database hasn't been initialized:

- Import sql/mySQL_creationScript.sql from the ui.
- Run the script.

# Note:
Docker network 'dbsnetwork' is used by the back-end: postsearch_bc
