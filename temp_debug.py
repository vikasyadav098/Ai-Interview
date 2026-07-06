import requests, json
payload = {
    'model': 'qwen2.5:3b',
    'prompt': 'You are a technical interviewer. Generate 3 medium level interview questions for a Frontend developer with 2 years of experience. Tech stack: React Node MongoDB. Return ONLY JSON array:[{"question":"string"}]',
    'stream': False,
}
res = requests.post('http://localhost:11434/api/generate', json=payload, timeout=180)
print('STATUS:', res.status_code)
print(res.text)
