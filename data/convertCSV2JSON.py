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
        df = reader[["ID", "RegioS", "Perioden", "TotaleOppervlakte_1", "TotaalVerkeersterrein_2", "TotaalBebouwdTerrein_6", "TotaalSemiBebouwdTerrein_12", "TotaalRecreatieterrein_19", "TotaalAgrarischTerrein_25", "TotaalBosEnOpenNatuurlijkTerrein_28", "TotaalBinnenwater_32", "TotaalBuitenwater_42"]]
        df_dict = df.to_dict(orient="split")
        with open(output, "w") as jsonfile:
            json.dump(df_dict, jsonfile)

if __name__ == "__main__":
    read_csv(input)
