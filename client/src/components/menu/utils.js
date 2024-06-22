export const validateApiKey = async (API_KEY) => {
    const body = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Give me five subcategories of jazz?"
            }
          ]
        }
      ]
    };
  
    const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
      },
      body: JSON.stringify(body)
    })
    console.log(response.status)
    if(response.status === 200){
      return 
    }else{
      throw new Error('Invalid Api Key')
    }
  }