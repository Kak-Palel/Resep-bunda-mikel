db.createUser({
  user: "root",
  pwd: "root",
  roles: [
    {
      role: "readWrite",
      db: "bunda_mikel",
    },
  ],
});
db.createCollection("test"); //MongoDB creates the database when you first store data in that database
