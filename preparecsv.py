import json
import csv
import pandas


def csv_to_json(file):
    '''
    Converts data from a csv file to a json file
    '''

    reader = pandas.read_csv(file, delimiter=';')
    df = pandas.read_csv('countries_codes_and_coordinates.csv', delimiter=';')
    # df = df.Alpha.strip(0, 3)

    for index, row in reader.iterrows():
        for indexes, rows in df.iterrows():
            if row.country == rows.Country:
                row.alpha_code = df.Alpha

    df.to_csv('dataprepared.csv')

if __name__ == '__main__':
    csv_to_json('data.csv')
