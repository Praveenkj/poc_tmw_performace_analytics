import os
from tabulate import tabulate

v1 = os.path.join(os.path.dirname(__file__), '..', 'v1', 'html_pages_formatted')
v2 = os.path.join(os.path.dirname(__file__), '..', 'v2', 'html_pages_formatted')

def get_file_size_difference(file_path_v1, file_path_v2):
    try:
        size_v1 = os.path.getsize(file_path_v1)
        size_v2 = os.path.getsize(file_path_v2)
        difference = size_v2 - size_v1
        return difference
    except Exception as e:
        print(f"Error getting file size difference for {file_path_v1} and {file_path_v2}: {e}")
        return None

def generate_file_size_difference_table(directory_v1, directory_v2):
    table = []
    for filename_v1 in os.listdir(directory_v1):
        file_path_v1 = os.path.join(directory_v1, filename_v1)
        file_path_v2 = os.path.join(directory_v2, filename_v1)

        if os.path.isfile(file_path_v2):
            difference = get_file_size_difference(file_path_v1, file_path_v2)
            if difference is not None:
                table.append([filename_v1, f"{difference / (1024 * 1024):.2f} MB"])

    return table

# Example usage
difference_table = generate_file_size_difference_table(v1, v2)

# Print the beautified table
headers = ['Filename', 'Difference (MB)']
print(tabulate(difference_table, headers=headers, tablefmt='fancy_grid'))
