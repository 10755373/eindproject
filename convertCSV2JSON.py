import json
import csv
import pandas as pd

input = "70262ned_TypedDataSet_22052019_134459.csv"
output = "bodemgebruikNL.json"

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
