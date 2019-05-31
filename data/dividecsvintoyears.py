import json
import csv
import pandas as pd

# def read_CSV(file, json_file):
# 	csv_rows_total = []
# 	with open(file) as csvfile:
#
# 		reader = csv.DictReader(csvfile)
# 		fields = reader.fieldnames
# 		fieldnames = []
# 		fieldlists = []
#
# 		# Split topics and subtopics on /
# 		for i in range(len(fields)):
# 			fieldlist = (fields[i].split("/"))
#
# 			# Create list with lists of topic + subtopic
# 			fieldlists.append(fieldlist)
#
# 			# Create list with the fieldnames
# 			if fieldlist[0] not in fieldnames:
# 				fieldnames.append(fieldlist[0])

def read_csv(filename):
    """
    Read CSV and append a dict to a list
    """
    with open(input, "r") as csvfile:
        first = []
        second = []
        third = []
        fourth = []
        fifth = []
        sixth = []
        seventh = []
        eight = []
        reader = pd.read_csv(csvfile, delimiter=';')
        for index, row in reader.iterrows():
            if row["Perioden"] == "1996JJ00":
                first.append(row)
            elif row["Perioden"] == "2000JJ00":
                second.append(row)
            elif row["Perioden"] == "2003JJ00":
                third.append(row)
            elif row["Perioden"] == "2006JJ00":
                fourth.append(row)
            elif row["Perioden"] == "2008JJ00":
                fifth.append(row)
            elif row["Perioden"] == "2010JJ00":
                sixth.append(row)
            elif row["Perioden"] == "2012JJ00":
                seventh.append(row)
            else:
                eight.append(row)



def write_json(file):


        df = reader[["LOCATION", "TIME", "Value"]]
        df_dict = df.to_dict(orient="split")
        with open(output, "w") as jsonfile:
            json.dump(df_dict, jsonfile)


def read_csv(INPUT_CSV):
    with open(input, "r") as csvfile:
        for index, row in df.iterrows():
            if row["Perioden"] == "1996JJ00":
                eerste = []
            elif row["Perioden"] == "2000JJ00"
                dffgdffg

        var eerste = []
        sdv

if __name__ == "__main__":
    read_csv("70262ned_TypedDataSet_22052019_134459.csv")
