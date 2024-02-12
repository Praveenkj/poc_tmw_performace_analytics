import os
import requests
import json
import time

v1_directory = os.path.join(os.path.dirname(__file__), '..', 'v2', 'html_pages_formatted')
response_json_directory = os.path.join(os.path.dirname(__file__), '..', 'v2', 'response_json')

api_url = "http://localhost:3001/analyze?version=v2&fileName="

def generate_file_name_array(directory):
    return [filename for filename in os.listdir(directory) if os.path.isfile(os.path.join(directory, filename))]

# Create the 'response_json' directory if it doesn't exist
if not os.path.exists(response_json_directory):
    os.makedirs(response_json_directory)


def call_api_and_save_response(session, file_name):
    try:
        url = f"{api_url}{file_name}"
        print("Calling...: ", url)
        response = requests.get(url)
        response.raise_for_status()
        json_response = response.json()

        response_file_path = os.path.join(response_json_directory, f"{file_name[:-5]}.json")
        with open(response_file_path, 'w') as json_file:
            json.dump(json_response, json_file, indent=2)

        print(f"JSON response saved for {file_name} in {response_file_path}")

        time.sleep(5)


    except requests.RequestException as e:
        print(f"Error calling API for {file_name}: {e}")

def process_files():
    file_name_array = generate_file_name_array(v1_directory)

    print("file_name_array: ", file_name_array)

    with requests.Session() as session:
        for file_name in file_name_array:
            call_api_and_save_response(session, file_name)

def main():
    process_files()

# Example usage
if __name__ == "__main__":
    main()
