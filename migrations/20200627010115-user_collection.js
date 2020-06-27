const crypt = require("../lib/crypt");

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    new_password = await crypt.encryptPassword("test12");
    await db.collection("users").insertOne({
      name: "Seller",
      email: "seller@gmail.com",
      password: new_password,
      isSeller: true,
    });

    await db.collection("users").insertOne({
      name: "Customer",
      email: "customer@gmail.com",
      password: new_password,
      isSeller: false,
    });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection("users").remove({ name: "Seller" });
    await db.collection("users").remove({ name: "Customer" });
  },
};
