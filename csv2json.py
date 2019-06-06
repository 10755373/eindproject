import json
import csv
import pandas

#
# csvfile = open('70262ned_TypedDataSet_22052019_134459.csv', 'r')
# jsonfile = open('file.json', 'w')
#
# fieldnames = ("ID", "RegioS", "Perioden", "TotaleOppervlakte_1", "TotaalVerkeersterrein_2", "TotaalBebouwdTerrein_6", "TotaalSemiBebouwdTerrein_12", "TotaalRecreatieterrein_19", "TotaalAgrarischTerrein_25", "TotaalBosEnOpenNatuurlijkTerrein_28", "TotaalBinnenwater_32", "TotaalBuitenwater_42")
# reader = csv.DictReader(csvfile, fieldnames)
# for row in reader:
#     json.dump(row, jsonfile)


# csv_file = pd.DataFrame(pd.read_csv("70262ned_TypedDataSet_22052019_134459.csv", sep = ",", header = 0, index_col = False))
# csv_file.to_json("file.json", orient = "records", date_format = "epoch", double_precision = 10, force_ascii = True, date_unit = "ms", default_handler = None)
#


def csv_to_json(file):
    '''
    Converts data from a csv file to a json file
    '''

    reader = pandas.read_csv(file, delimiter=';')
    data = pandas.DataFrame(data=reader)

    # Output as json
    data.to_json('bodem.json', orient='records', force_ascii=True)

if __name__ == '__main__':
    csv_to_json('70262ned_TypedDataSet_22052019_134459.csv')
