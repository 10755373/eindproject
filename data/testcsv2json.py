import json
import csv
import pandas
import pycountry
import country_converter as coco


def csv_to_json(file):
    '''
    Converts data from a csv file to a json file
    '''
    # iso2_codes = coco.convert(names=iso3_codes, to='ISO2')
    #
    # countries = {}
    # for country in pycountry.countries:
    #     countries[country.name] = country.alpha_3
    # print(len(pycountry.countries))
    # listed = []
    # for country in pycountry.countries:
    #     listed.append(country)
    # print(listed)
    # print(pycountry.countries.get(alpha_2='DE'))
    # print(pycountry.countries.get(alpha_3='DEU'))
    # print(pycountry.countries.get(name='Germany').alpha_3)
    # for Country in listed:
    #     print(Country.alpha_3)

    reader = pandas.read_csv(file, delimiter=';')
    df = pandas.DataFrame(data=reader)
    test_list = []
    df.query('year == "2000" and sex == "female" and age == "15-24 years"')
    # print(
    # df.query('a < b and b < c')
    # )
    # for index, row in df.iterrows():
    #     if row["year"] == "2000" and row["sex"] == "female" and row["age"] == "15-24 years":
    #         print(row["country"])
    # #         test_dict = {}
    #         test_dict[row["country"]] = row["suicides_100k"]
    #         test_list.append(test_dict)
    # print(test_list)
    # df[(df.year == 2000) & (df.sex == "female") & (df.age == "15-24 years")]

    # for index, row in df.iterrows():
    #     if row["year"].index == "2000" and row["sex"].index == "female" and row["age"].index == "15-24 years":
    #         print(row["country"].index)
    # for Country in listed:
    #     print(Country.alpha_3)
    # for Country in listed:
    #     for index, row in df.iterrows():
    #         if Country.name == row.country:
    #             row.alpha_code = Country.alpha_3


    # for index, row in df.iterrows():
    #     if row["alpha_code"] == "iso":
    #         row["alpha_code"] = pycountry.countries.get(name=row["country"]).alpha_3

            # code = pycountry.countries.get(name='row.country').alpha_3
                # row["alpha_code"] = code
        # if row["alpha_code"] == "ISO":
        #     row["alpha_code"] = coco.convert(names=row["country"], to='ISO3')
    # Output as json
    # df.to_json('test_data.json', orient='records', force_ascii=True)

if __name__ == '__main__':
    csv_to_json('data.csv')
