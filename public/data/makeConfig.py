import csv
import json

def csv_to_json(input_csv_file, output_json_file):
    # Initialize an empty dictionary to store the JSON data
    json_data = {}

    # Read the CSV file
    with open(input_csv_file, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        # Iterate through the columns in the CSV file
        for column_name in csv_reader.fieldnames:
            json_data[f'{column_name}'] = {
                "name": column_name,
                "unit": "",
                "description": f"a_written_description for {column_name}",
                "majorTicks": 4,
                "minorTicks": 1,
                "places": 2
            }

    # Write the JSON data to the output file
    with open(output_json_file, 'w') as json_file:
        json.dump(json_data, json_file, indent=4)


# # Example usage:
# input_csv_file = 'your_input.csv'
# output_json_file = 'output.json'
# csv_to_json(input_csv_file, output_json_file)


csv_to_json("datasetAll.csv", "datasetAll.json")
