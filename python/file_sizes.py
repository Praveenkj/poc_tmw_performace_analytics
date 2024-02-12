import os
from tabulate import tabulate

directory_path = os.path.join(os.path.dirname(__file__), '..', 'v2', 'html_pages_formatted')

def get_file_size(file_path):
    return f"{os.path.getsize(file_path) / (1024 * 1024):.2f} MB" # Convert to kilobytes

def list_files_with_sizes(directory):
    files_info = []

    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        if os.path.isfile(file_path):
            file_size = get_file_size(file_path)
            files_info.append({"File": filename, "Size (MB)": file_size})

    return files_info

def print_files_table(files_info):
    headers = "keys"
    table = tabulate(files_info, headers=headers, tablefmt="grid")
    print(table)


if __name__ == "__main__":
    files_info = list_files_with_sizes(directory_path)
    print_files_table(files_info)