import json
import csv
import pandas
import pycountry
import country_converter as coco


def csv_to_json(file):
    '''
    Converts data from a csv file to a json file
    '''

    reader = pandas.read_csv(file, delimiter=';')
    df = pandas.DataFrame(data=reader)
    j = df.set_index("alpha_code").to_json(orient='index')
    with open("outputted.json", "w") as jsonfile:
        json.dump(j, jsonfile)

if __name__ == '__main__':
    csv_to_json('ouput.csv')
