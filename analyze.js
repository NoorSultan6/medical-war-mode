export default async function handler(req, res) {

const lecture = req.body.lecture;

const prompt = `
Extract from this medical lecture:

1. High yield exam points
2. 5 MCQ questions
3. Simple explanation

Lecture:
${lecture}
`;

try {

const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-large", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
inputs: prompt
})
});

const data = await response.json();

const result = data[0]?.generated_text || "AI failed";

res.status(200).json({
high: result,
mcq: result,
exp: result
});

} catch (error) {

res.status(500).json({
high: "Error connecting AI",
mcq: "Error connecting AI",
exp: "Error connecting AI"
});

}

}
