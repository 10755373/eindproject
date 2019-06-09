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

    # df[(df.year == 2000) & (df.sex == "female") & (df.age == "15-24 years")]
    #
    right_df = []

    for index, row in df.iterrows():
        # print(row["country"])
        code = pycountry.countries.get(name=row["country"]).alpha_3
        # print(code)
        print(index)
        df.iloc[index,0] = code
        # right_df.append(code)
        # print(type(code))
        # print(row)
    df.set_index("alpha_code")
    print(df.head())

        #
        #     print(row)
        # print(code)
        # right_df.append(code)
    #         # row["alpha_code"] = code
    # print(row)
    # print(right_df)
    # print(right_df[0])
    # print(right_df[0].age)
    # Output as json
    df.to_json('correctdata.json', orient='index', force_ascii=True)
# df.to_json(orient='index')
# '{"row 1":{"col 1":"a","col 2":"b"},"row 2":{"col 1":"c","col 2":"d"}}'

if __name__ == '__main__':
    csv_to_json('data.csv')
#
# df.replace(to_replace ="Boston Celtics",
#                  value ="Omega Warrior")


#     input_countries = ['American Samoa', 'Canada', 'France']
#
# countries = {}
# for country in pycountry.countries:
#     countries[country.name] = country.alpha_3
#
# codes = [countries.get(country, 'Unknown code') for country in input_countries]
#
# print(codes)  # prints ['AS', 'CA', 'FR']
