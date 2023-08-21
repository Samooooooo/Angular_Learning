import re
import json
from enum import Enum
import os

# Define the QuestionType enum
class QuestionType(Enum):
    SINGLE_CHOICE = "single-choice"
    MULTIPLE_CHOICE = "multiple-choice"
    FILL_IN = "fill-in"

input_file_path = 'angularProject/LPC1-APP/Draw-IO-Story/questions.txt'
output_file_path = os.path.join(os.path.dirname(input_file_path), 'output.json')

# Read the input text file
with open(input_file_path, 'r') as file:
    content = file.read()

# Split the content into individual questions
questions = re.split(r'QUESTION \d+:', content)
questions = [q.strip() for q in questions if q.strip()]

# Initialize an empty list to store parsed questions
parsed_questions = []

# Parse each question and create a dictionary for JSON
for index, question_text in enumerate(questions):
    lines = question_text.splitlines()

    question_data = {
        "index": index,
        "questionType": "",
        "question": "",
        "options": [],
        "correctAnswer": []
    }

    options_started = False
    correct_answer_option = None
    for line in lines:
        if line.startswith("Answer:"):
            answer_letter = line.split()[-1]
            correct_answer_option = next((opt for opt in question_data["options"] if opt.startswith(answer_letter + ".")), None)
            if correct_answer_option:
                question_data["correctAnswer"] = [correct_answer_option.split(".", 1)[1].strip()]  # Extract the answer text
            break
        elif line.startswith(('A.', 'B.', 'C.', 'D.', 'E.')):
            options_started = True
            question_data["options"].append(line.strip())
        elif not options_started:
            question_data["question"] += line.strip() + " "

    question_data["question"] = question_data["question"].strip()

    if len(question_data["options"]) == 0:
        question_data["questionType"] = QuestionType.FILL_IN.value

    parsed_questions.append(question_data)

# Write the parsed questions to the output JSON file in the same folder as the input file
with open(output_file_path, 'w') as json_file:
    json.dump(parsed_questions, json_file, indent=2)
