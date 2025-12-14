from gpt4all import GPT4All

model_path = r"C:\Users\ahmed\AppData\Local\nomic.ai\GPT4All\Llama-3.2-3B-Instruct-Q4_0.gguf"

model = GPT4All(model_path)

with model.chat_session():
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            break
        response = model.generate(user_input)
        print("Spot:", response)
