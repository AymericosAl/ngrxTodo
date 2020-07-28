db.createUser(
    {
        user: "dryad",
        pwd: "pourlanature",
        roles: [
            {
                role: "root",
                db: "admin"
            },
            {
                role: "dbOwner",
                db: "avalancheMongodb"
            }
        ]
    }
);
