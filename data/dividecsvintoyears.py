import json
import csv
import pandas as pd

input = "70262ned_TypedDataSet_22052019_134459.csv"

def read_csv_write_json(file):
    csv_values_in_dict = []
    with open(input, "r") as csvfile:
        # first = []
        # second = []
        # third = []
        # fourth = []
        # fifth = []
        # sixth = []
        # seventh = []
        # eight = []
        # lists = []
        # row_in_csv = {}
        # dict_for_rowi = {}
        reader = csv.DictReader(csvfile)
        fieldnames = reader.fieldnames
        # field = []
        # for i in range(len(fieldnames)):
        #     field.append(fieldnames[i])
        # reader = pd.read_csv(csvfile, delimiter=';')
        for i in range(len(fieldnames)):
            print(fieldnames[i][0])
        print(fieldnames)
        for row in reader:
            rows_csv = {}
            for i in range(len(fieldnames)):
                rows_csv[fieldnames[i]] = row[reader[i]]
            # for i in range(len(fieldnames)):
            #     if len(values) < len(fieldnames):
            #         kjsgjn
            #     else:
            #         if row[i][2] == "1996JJ00":
            #
            #             row_dict = row.to_dict()
            #             first.append(row_dict)
            #         elif row["Perioden"] == "2000JJ00":
            #             row_dict = row.to_dict()
            #             second.append(row_dict)
            #         elif row["Perioden"] == "2003JJ00":
            #             row_dict = row.to_dict()
            #             third.append(row_dict)
            #         elif row["Perioden"] == "2006JJ00":
            #             row_dict = row.to_dict()
            #             fourth.append(row_dict)
            #         elif row["Perioden"] == "2008JJ00":
            #             row_dict = row.to_dict()
            #             fifth.append(row_dict)
            #         elif row["Perioden"] == "2010JJ00":
            #             row_dict = row.to_dict()
            #             sixth.append(row_dict)
            #         elif row["Perioden"] == "2012JJ00":
            #             row_dict = row.to_dict()
            #             seventh.append(row_dict)
            #         else:
            #             row_dict = row.to_dict()
            #             eight.append(row_dict)
            # make jsonfile
            # number = row[i][2].slice(0, 4)
            # with open(f"dataindustriesNL{number}", "w") as jsonfile:
            #     json.dumps(data, sort_keys=False, indent=4, separators=(',', ': '))
            #     json.dump(csv_values_in_dict, sort_keys=False, indent=4, jsonfile)

        # lists = [first, second, third, fourth, fifth, sixth, seventh, eight]
        # lists.append(first)
        # lists.append(second)
        # lists.append(third)
        print(csv_values_in_dict)
        # print("-----------------")
        # print(lists[0][0])
        # print(type(lists[0][0]))
        # print("-----")
        # print(list[0][0][0])
        # print("-----")v

        # print(list[0][0][0][0])
        # return lists

if __name__ == "__main__":
    read_csv_write_json(input)
    # make_json(read_csv(input))

# def read_csv(input):
#     with open('test.csv') as f:
#         reader = csv.DictReader(f)
#         rows = list(reader)
#         return rows
#
# def write_json(output):
#     with open('test.json', 'w') as f
#         json.dump(rows, f)
#
#
# if __name__ == "__main__":
#     output = read_csv(input)
#     write_json(output)

# def write_json(file):
#     with open(output, "w") as jsonfile:
#         for list in lists:
#             for province in list:
#
#         json.dump(df_dict, jsonfile)

#
# def write_json(file):
#
#
#         df = reader[["LOCATION", "TIME", "Value"]]
#         df_dict = df.to_dict(orient="split")
#         with open(output, "w") as jsonfile:
#             json.dump(df_dict, jsonfile)
#
#
# def read_csv(INPUT_CSV):
#     with open(input, "r") as csvfile:
#         for index, row in df.iterrows():
#             if row["Perioden"] == "1996JJ00":
#                 eerste = []
#             elif row["Perioden"] == "2000JJ00"
#                 dffgdffg
#
#         var eerste = []
#         sdv

# import csv
# import json
#
# file = 'csv_file_name.csv'
# json_file = 'output_file_name.json'
#
# #Read CSV File
# def read_CSV(file, json_file):
#     csv_rows = []
#     with open(file) as csvfile:
#         reader = csv.DictReader(csvfile)
#         field = reader.fieldnames
#         for row in reader:
#             csv_rows.extend([{field[i]:row[field[i]] for i in range(len(field))}])
#         convert_write_json(csv_rows, json_file)
#
# #Convert csv data into json
# def convert_write_json(data, json_file):
#     with open(json_file, "w") as f:
#         f.write(json.dumps(data, sort_keys=False, indent=4, separators=(',', ': '))) #for pretty
#         f.write(json.dumps(data))
#
#
# read_CSV(file,json_file)

input = "KNMI_20190101.csv"
output = "KNMI_20190101.json"
data_list = []

def read_csv(filename):
    """
    Read CSV and append a dict to a list
    """
    csv_values_in_dict = []
    with open(input, "r") as csvfile:
        reader = csv.Dictreader(csvfile)
        for row in reader:
            dict_values = {}
            
            if row[0] is "ID":
                for i in range(len(reader)):
                    fieldnames.append(reader[i])
            else:
                wind = row[2].strip()
                wind_cleaned = wind.strip(';')
                data_list.append({"Datum" : int(row[1]), "Windstoot" : int(wind_cleaned)})
    return(data_list)

def make_json(filename):
    """
    Make a JSON file
    """
    with open(output, "w") as jsonfile:
        json.dump(data_list, jsonfile)

if __name__ == "__main__":
    read_csv(input)
    make_json(data_list)
