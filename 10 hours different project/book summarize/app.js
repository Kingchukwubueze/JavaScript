const summarizeBtn = document.getElementById("summarizeBtn");
const summaryText = document.getElementById("summaryText");
const speakBtn = document.getElementById("speakBtn");

summarizeBtn.addEventListener("click", async () => {
  const input = document.getElementById("bookText").value;
  if (!input.trim()) return alert("Please paste some text!");

  summaryText.textContent = "Summarizing...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer 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`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that summarizes books." },
          { role: "user", content: `Summarize the following book text:\n\n${input}` }
        ],
        temperature: 0.5,
        max_tokens: 300
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      summaryText.textContent = `Error: ${error.error.message}`;
      return;
    }
    
    const data = await response.json();
    const summary = data.choices[0].message.content.trim();
    summaryText.textContent = summary;
    

  } catch (error) {
    console.error(error);
    summaryText.textContent = "Something went wrong. Please try again.";
  }
});

speakBtn.addEventListener("click", () => {
  const summary = summaryText.textContent;
  if (!summary) return;

  const speech = new SpeechSynthesisUtterance(summary);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
});
