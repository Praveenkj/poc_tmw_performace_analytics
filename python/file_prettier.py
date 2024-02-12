import os
from bs4 import BeautifulSoup

input_dir = os.path.join(os.path.dirname(__file__), '..', "v2", "html_pages")
output_dir = os.path.join(os.path.dirname(__file__), '..', "v2", "html_pages_formatted")

def process_html_files():
    for filename in os.listdir(input_dir):
        if filename.endswith(".html"):
            input_filepath = os.path.join(input_dir, filename)
            output_filepath = os.path.join(output_dir, filename)

            with open(input_filepath, "r") as input_file:
                html_content = input_file.read()

            soup = BeautifulSoup(html_content, "html.parser")
            pretty_html = soup.prettify()

            with open(output_filepath, "w") as output_file:
                output_file.write(pretty_html)

            print(f"Formatted {input_filepath} and saved to {output_filepath}")

    print("All HTML files have been formatted and saved.")

process_html_files()