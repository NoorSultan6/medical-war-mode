export default async function handler(req, res) {

const lecture = req.body.lecture

const prompt = `
Extract from this medical lecture:

1. High yield exam points
2. 5 MCQ questions
3. Simple explanation

Lecture:
${lecture}
`

try{

const response = await fetch(
"https://router.huggingface.co/hf-inference/models/google/flan-t5-large",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
inputs: prompt
})
}
)

const data = await response.json()

res.status(200).json(data)

}catch(err){

res.status(500).json({
error:err.message
})

}

}
