import json
import csv
import pandas as pd

input = "output.csv"
output = "1.json"

def read_csv(filename):
    """
    Read CSV and append a dict to a list
    """
    with open(input, "r") as csvfile:
        data_dict = {}
        reader = pd.read_csv(csvfile, delimiter=';')
        df = reader.to_dict()
        with open(output, "w") as jsonfile:
            json.dump(df, jsonfile)

if __name__ == "__main__":
    read_csv(input)
