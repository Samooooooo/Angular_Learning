import os

def copy_files_content_to_txt(source_dir, output_file_1, output_file_2):
    total_content = []
    
    for root, _, files in os.walk(source_dir):
        for file in files:
            if file.endswith(".ts") or file.endswith(".html"):
                file_path = os.path.join(root, file)
                with open(file_path, "r") as input_file:
                    total_content.append(f"===== {file_path} =====\n")
                    total_content.append(input_file.read())
                    total_content.append("\n\n")

    split_index = len(total_content) // 2

    with open(output_file_1, "w") as output_1:
        output_1.writelines(total_content[:split_index])

    with open(output_file_2, "w") as output_2:
        output_2.writelines(total_content[split_index:])

source_directory = "/home/osama_thabit/Angular/Angular_Learning/angularProject/LPC1-APP/LLCE-App/src/app"
output_file_path_1 = "combined_code_1.txt"
output_file_path_2 = "combined_code_2.txt"

copy_files_content_to_txt(source_directory, output_file_path_1, output_file_path_2)
print(f"Content of .ts and .html files split and copied to {output_file_path_1} and {output_file_path_2}")
