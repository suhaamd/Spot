from dotenv import load_dotenv
import os
import json
import time
import random
import pyttsx3  # 🔊 Text-to-speech
import speech_recognition as sr  # 🎤 Speech recognition for casual chat
from gpt4all import GPT4All  # Local GPT model
import threading
import queue
from datetime import datetime


# Load environment variables
load_dotenv()

# Path to your GPT4All model
model_path = r"C:\Users\ahmed\AppData\Local\nomic.ai\GPT4All\Llama-3.2-3B-Instruct-Q4_0.gguf"
gpt4all_model = GPT4All(model_path)

# Text-to-speech setup
engine = pyttsx3.init()
engine.setProperty('rate', 160)
engine.setProperty('volume', 1.0)

def speak(text):
    print(f"[Spot] {text}")
    engine.say(text)
    engine.runAndWait()

DATA_FILE = "spot_memory.json"

def load_memory():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            data = json.load(f)

            # Ensure "History" exists with all parts
            if "History" not in data:
                data["History"] = {part: [] for part in ["Arms", "Legs", "Chest", "Back", "Core", "Cardio"]}
            else:
                for part in ["Arms", "Legs", "Chest", "Back", "Core", "Cardio"]:
                    if part not in data["History"]:
                        data["History"][part] = []

            return data
    else:
        # Fresh template
        return {
            "Arms": {},
            "Legs": {},
            "Chest": {},
            "Back": {},
            "Core": {},
            "Cardio": {},
            "History": {
                "Arms": [],
                "Legs": [],
                "Chest": [],
                "Back": [],
                "Core": [],
                "Cardio": []
            }
        }

def save_memory(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

def startup():
    speak("Skin contact detected.")
    speak("Activated and ready!")

def ask_spot_gpt(prompt):
    try:
        with gpt4all_model.chat_session():
            response = gpt4all_model.generate(prompt)
            return response.strip()
    except Exception as e:
        print(f"[Error] GPT4All failed: {e}")
        return "Oops, I had a brain freeze. Try again?"

def casual_conversation():
    recognizer = sr.Recognizer()
    speak("I'm listening. Talk to me! Say 'start workout' when you're ready.")

    while True:
        with sr.Microphone() as source:
            try:
                print("\n🎤 Waiting for you to speak...")
                audio = recognizer.listen(source, timeout=5)
                query = recognizer.recognize_google(audio).lower()
                print(f"[You] {query}")

                if "start workout" in query:
                    speak("Alright, let's crush this session!")
                    break
                elif "have to go" in query:
                    speak("Okay! Catch you later.")
                    exit()
                else:
                    reply = ask_spot_gpt(query)
                    speak(reply)

            except sr.UnknownValueError:
                speak("Didn't catch that. Want to try again?")
            except sr.RequestError:
                speak("Hmm, I'm having trouble hearing you. Try again.")

def select_body_part(parts):
    speak("Which body part are we training today?")
    print("Which body part are we training today?")
    for i, part in enumerate(parts, 1):
        print(f"{i}. {part}")
    choice = input("Enter choice number: ")
    return parts[int(choice) - 1]

def auto_detect_workout():
    known = input("\n[Spot] Are you doing a workout I know? (yes/no): ").strip().lower()
    if known == "yes":
        return input("[Spot] Enter detected workout name: ").strip(), True
    else:
        return None, False

def ask_about_new_workout():
    speak("This is new. Tell me about it.")
    print("\n[Spot] This is new. Tell me about it.")
    name = input("👤 Workout name: ").strip()
    muscles = input("💪 Muscle groups it targets: ").strip()
    desc = input("📝 How does it help (short explanation): ").strip()
    tip = input("💡 Any tip for this workout?: ").strip()
    return name, {
        "muscle_groups": muscles,
        "description": desc,
        "times_done": 1,
        "tip": tip if tip else "Focus on controlled motion. Think about the muscles in your head to have mind-muscle connection."
    }

def update_progress(part, workout_name, memory):
    history = memory[part][workout_name].get("history", [])
    if len(history) < 2:
        return

    first = history[0]
    last = history[-1]

    if first["weight"] > 0:
        overload_pct = ((last["weight"] - first["weight"]) / first["weight"]) * 100
        overload_trend = f"{overload_pct:+.2f}%"
    else:
        overload_trend = "N/A"

    prev = history[-2]
    if last["weight"] > prev["weight"]:
        strength = "Improving"
    elif last["weight"] == prev["weight"] and last["reps"] > prev["reps"]:
        strength = "Holding steady"
    else:
        strength = "Needs push"

    memory[part][workout_name]["progress"] = {
        "overload_trend": overload_trend,
        "strength_status": strength
    }
    save_memory(memory)

def simulate_form_feedback(current_part, current_workout, memory):
    speak("Monitoring form. Green is good. Red is bad.")
    print("\n[Spot] Monitoring form (Green = Good, Red = Bad)...")

    red_streak = 0
    green_streak = 0
    start_time = time.time()
    heart_rate = 90
    calories = 0.0

    input_queue = queue.Queue()

    def input_listener():
        while True:
            user_input = input().strip().lower()
            input_queue.put(user_input)
            if user_input == "end workout":
                break

    listener_thread = threading.Thread(target=input_listener, daemon=True)
    listener_thread.start()

    while True:
        elapsed = int(time.time() - start_time)
        minutes = elapsed // 60
        seconds = elapsed % 60

        heart_rate += random.randint(-2, 3)
        heart_rate = max(60, min(heart_rate, 180))
        calories += round(random.uniform(0.1, 0.3), 2)

        color = random.choice(["GREEN", "YELLOW", "RED"])

        print("\n--------------------------------------")
        print(f"🕒 Time: {minutes:02d}:{seconds:02d}")
        print(f"❤️ Heart Rate: {heart_rate} bpm")
        print(f"🔥 Calories Burned: {calories:.2f}")
        print(f"🟩🟨🟥 Feedback: {color}")
        print("--------------------------------------")

        if color == "RED":
            red_streak += 1
            green_streak = 0
            if red_streak == 3:
                speak("Form looks off. Need help?")
                ask = input("You’re struggling. Want a tip? (yes/no): ").strip().lower()
                if ask == "yes":
                    tip = memory[current_part][current_workout].get("tip", "Focus on controlled motion.")
                    speak(tip)
                red_streak = 0

        elif color == "GREEN":
            green_streak += 1
            red_streak = 0
            if green_streak == 3:
                print("[Spot] You're doing great! Keep it up.")
                green_streak = 0
        else:
            red_streak = 0
            green_streak = 0

        while not input_queue.empty():
            command = input_queue.get()
            if command == "end workout":
                speak("Workout ended. Great job today!")

                total_time = int(time.time() - start_time)
                minutes = total_time // 60
                seconds = total_time % 60

                summary = f"""
Workout Summary:
🕒 Total Time: {minutes:02d}:{seconds:02d}
❤️ Final Heart Rate: {heart_rate} bpm
🔥 Calories Burned: {calories:.2f}
"""
                print(summary)
                speak(f"Your total time was {minutes} minutes and {seconds} seconds. "
                      f"Final heart rate was {heart_rate} beats per minute, and you burned {calories:.0f} calories.")

                # ⏳📅 Save history log
                today = datetime.now().strftime("%Y-%m-%d")
                memory[current_part][current_workout].setdefault("history", []).append({
                    "date": today,
                    "weight": int(input("Weight used (kg): ")),
                    "reps": int(input("Reps per set: ")),
                    "sets": int(input("Number of sets: ")),
                    "duration": f"{minutes:02d}:{seconds:02d}",
                    "calories_burned": round(calories, 2)
                })

                update_progress(current_part, current_workout, memory)

                # 📊 Speak out progress update
                progress = memory[current_part][current_workout].get("progress", {})
                overload = progress.get("overload_trend", "N/A")
                strength = progress.get("strength_status", "Unknown")

                summary = f"""
📈 Progress Update:
➡️ Progressive Overload Trend: {overload}
💪 Strength Status: {strength}
"""
                print(summary)
                speak(f"Progress update. Your overload trend is {overload}. Strength status: {strength}.")

                return  # Exit workout loop

        time.sleep(2)


def run():
    startup()

    ask = input("Do you want to chat with me before starting your workout? (yes/no): ").strip().lower()
    if ask == "yes":
        casual_conversation()

    memory = load_memory()
    body_parts = list(memory.keys())

    part = select_body_part(body_parts)
    workout_detected, is_known = auto_detect_workout()

    if is_known:
        normalized_input = workout_detected.strip().lower()
        memory_keys = {k.strip().lower(): k for k in memory[part].keys()}

        if normalized_input in memory_keys:
            matched_key = memory_keys[normalized_input]
            workout_info = memory[part][matched_key]
            speak(f"Detected: {matched_key}")

            if workout_info["times_done"] == 0:
                speak(workout_info["description"])

            workout_info["times_done"] += 1
            save_memory(memory)

            simulate_form_feedback(part, matched_key, memory)

        else:
            speak("Hmm, I don’t seem to have that workout saved under this body part.")
            name, info = ask_about_new_workout()
            memory[part][name] = info
            save_memory(memory)
            speak(f"Got it. I’ve added {name} to my memory. I’ll guide you next time.")
    else:
        name, info = ask_about_new_workout()
        memory[part][name] = info
        save_memory(memory)
        speak(f"Got it. I’ve added {name} to my memory. I’ll guide you next time.")

if __name__ == "__main__":
    run()
