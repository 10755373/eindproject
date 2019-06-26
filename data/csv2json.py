import json
import csv
import pandas

input = "output.csv"

def read_csv(filename):
    """
    Read CSV and transform it into a JSON-file
    """
    with open(input, "r") as csvfile:
        reader = pandas.read_csv(csvfile, delimiter=';')
        df = pandas.DataFrame(data=reader)
        df.to_json('dataproject.json', orient='index', force_ascii=True)

if __name__ == "__m
    read_csv(input)
