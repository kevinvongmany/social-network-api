const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtsCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

  // Create empty array to hold the users
  const users = [
    { username: "kevinvongmany", email: "kevin@email.com" },
    { username: "kevinvongmany1", email: "kevin1@email.com" },
    { username: "kevinvongmany2", email: "kevin2@email.com" },
    { username: "kevinvongmany3", email: "kevin3@email.com" },
  ];

  // Add users to the collection and await the results
  await User.create(users);

  sampleThought = {
    thoughtText: "This is an interesting thought",
    username: "kevinvongmany",
  };
  // Add thoughts to the collection and await the results
  const thoughtData = await Thought.create(sampleThought);

  await User.findOneAndUpdate(
    {
      username: sampleThought.username,
    },
    {
      $addToSet: { thoughts: thoughtData._id },
    }
  );

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
