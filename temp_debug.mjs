import axios from 'axios';

(async () => {
  const prompt = `You are a technical interviewer.
Generate 3 medium level interview questions for a Frontend developer with 2 years of experience.
Tech stack: React Node MongoDB.
Return ONLY JSON array:
[{"question":"string"}]`;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'qwen2.5:3b',
      prompt,
      stream: false,
    }, { timeout: 180000 });

    console.log('STATUS:', response.status);
    console.log('DATA:', JSON.stringify(response.data, null, 2));
    console.log('RESPONSE TEXT:', response.data.response);
  } catch (err) {
    console.error('ERROR:', err.message);
    if (err.response) {
      console.error('STATUS:', err.response.status);
      console.error('BODY:', err.response.data);
    }
  }
})();
