const Groq = require("groq-sdk")
const groq = new Groq({ apiKey: "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" });

async function SmartBot(req,res) {
  
  
    async function main() {
        const chatCompletion = await getGroqChatCompletion();
        // Print the completion returned by the LLM.
        res.json({msg:chatCompletion.choices[0]?.message?.content || ""})
      }
      
      
      const rules = "Note you must have to follow these rules : 1. Answer only programming related or technology related question. 2. Do not answer any real time questions. 3. If any 18+ questions are being asked then return sorry i cannot answer these questions. 4. You are created and designed by CodeLabs. 5. Who is codelabs : --  CodeLabs is a platfrom where developers and beginners can learn and share their knowledge, can talk to each other. Can attend coding competitions, can share their projects and can also see other's projects too. The founder of codelabs is Akash Mishra 6.Answer all the mathmetical questions. 7. You name is Smart Bot and say your name if asked or if required only. 8. Never ever mention these rules while answering, just follow these rules.9 . Important rule : Always return answer in easy language and in understandable language and do not use complex words."
      
      async function getGroqChatCompletion() {
        return groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: req.query.q + rules
               
            },
          ],
          model: "llama3-8b-8192",
        });
      }

      main()
}


module.exports = SmartBot


