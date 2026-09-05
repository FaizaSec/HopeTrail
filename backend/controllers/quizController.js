const questions = [
  {
    question: "I would like to adopt",
    options: ["Dog", "Cat", "Bird", "Others"]
  },
  {
    question: "I am looking to adopt for",
    options: ["Myself", "My family"]
  },
  {
    question: "Age preference",
    options: [
      "A puppy",
      "A young dog",
      "An adult dog",
      "A senior dog"
    ]
  },
  {
    question: "I would like to adopt a",
    options: ["Female", "Male", "No preference"]
  },
  {
    question: "A breed that I really like",
    options: ["Golden Retriever", "Doberman"]
  }
];

export const getQuestions = (req, res) => {
  res.json(questions);
};

export const submitQuiz = (req, res) => {
  const answers = req.body;

  console.log("Quiz answers:", answers);
   res.json({ 
    message: "Quiz submitted successfully!",
    answers: answers});
}