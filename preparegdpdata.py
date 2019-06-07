import json
import csv
import pandas

def csv_to_json(file):
    '''
    Converts data from a csv file to a json file
    '''

    reader = pandas.read_csv(file, delimiter=';')
    data = pandas.DataFrame(data=reader)
    for index, row in data:
        

    # Output as json
    data.to_json('preparedgdp.json', orient='records', force_ascii=True)

if __name__ == '__main__':
    csv_to_json('data.csv')
