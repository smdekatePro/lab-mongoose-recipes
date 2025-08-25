const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const data = require("./data.json"); // recipes array

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);

    // Iteration 2 - Create a recipe
    return Recipe.create({
      title: "Homemade Pizza",
      level: "Amateur Chef",
      ingredients: ["Flour", "Water", "Yeast", "Tomato Sauce", "Cheese"],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 45,
      creator: "Chef Swapnil"
    });
  })
  .then(recipe => {
    console.log(`Iteration 2: Recipe created → ${recipe.title}`);

    // Iteration 3 - Insert multiple recipes
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    console.log("Iteration 3: Inserted multiple recipes:");
    recipes.forEach(r => console.log(r.title));

    // Iteration 4 - Update recipe
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then(updatedRecipe => {
    console.log(
      `Iteration 4: Successfully updated → ${updatedRecipe.title} (duration: ${updatedRecipe.duration})`
    );

    // Iteration 5 - Remove recipe
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Iteration 5: Carrot Cake removed successfully!");

    // Iteration 6 - Close database
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Iteration 6: Database connection closed ✅");
  })
  .catch(err => {
    console.error("Error during iterations:", err);
    mongoose.connection.close();
  });
