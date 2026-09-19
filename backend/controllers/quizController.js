import Question from "../models/Question.js";
import Pet from "../models/Pet.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching questions",
    });
  }
};

export const getBreeds = async (req, res) => {
  try {
    const { species } = req.query;

    const breeds = await Pet.distinct("breed", {
      species: species.toLowerCase(),
    });

    res.json(breeds);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching breeds",
    });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    const pets = await Pet.find({
      species: answers.species.toLowerCase(),
    });

    const recommendations = pets.map((pet) => {
      let score = 0;

      if (pet.breed === answers.breed) {
        score += 3;
      }

      if (pet.age === answers.age) {
        score += 2;
      }

      if (answers.gender === "No preference" || pet.gender === answers.gender) {
        score += 1;
      }

      return {
        pet,
        score,
      };
    });

    recommendations.sort((a, b) => b.score - a.score);

    const matchedPets = recommendations.filter(
      (recommendation) => recommendation.pet.breed === answers.breed,
    );

    res.json({
      message: "Quiz submitted successfully!",
      recommendations: matchedPets,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error processing quiz",
      error: error.message,
    });
  }
};
