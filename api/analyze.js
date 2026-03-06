export default async function handler(req, res) {
  try {
    const { lecture } = req.body;

    const prompt = `
Extract from this medical lecture:

1. High yield exam points
2. 5 MCQ questions
3. Simple explanation

Lecture:
${lecture}
`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt
        })
      }
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      error: "AI error"
    });
  }
}
