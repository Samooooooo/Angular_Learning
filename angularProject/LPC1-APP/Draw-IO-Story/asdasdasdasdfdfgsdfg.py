import re
import json
from enum import Enum

# Define the QuestionType enum
class QuestionType(Enum):
    SINGLE_CHOICE = "single-choice"
    MULTIPLE_CHOICE = "multiple-choice"
    FILL_IN = "fill-in"

# Read the input text file
with open('questions.txt', 'r') as file:
    content = file.read()

# Split the content into individual questions
questions = re.split(r'QUESTION \d+:', content)
questions = [q.strip() for q in questions if q.strip()]

# Initialize an empty list to store parsed questions
parsed_questions = []

# Parse each question and create a dictionary for JSON
for question_text in questions:
    lines = question_text.splitlines()

    question_data = {
        "questionType": "",
        "question": "",
        "options": [],
        "correctAnswer": []
    }

    options_started = False
    for line in lines:
        if line.startswith("Answer:"):
            answer_text = line.split()[-1]
            if len(answer_text) > 1:
                question_data["questionType"] = QuestionType.MULTIPLE_CHOICE.value
                question_data["correctAnswer"] = [ans for ans in answer_text]
            else:
                question_data["questionType"] = QuestionType.SINGLE_CHOICE.value
                question_data["correctAnswer"] = [ans for ans in answer_text]
            break
        elif line.startswith(('A.', 'B.', 'C.', 'D.', 'E.')):
            options_started = True
            question_data["options"].append(line.strip())
        elif not options_started:
            question_data["question"] += line.strip() + " "

    question_data["question"] = question_data["question"].strip()

    if len(question_data["options"]) == 0:
        question_data["questionType"] = QuestionType.FILL_IN.value
        # Join the fill-in answers into a single string and store as
