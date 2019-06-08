import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches

class Rocket():
    def __init__(self, spacecraft, nation, payload_mass, payload_volume, mass, base_cost, fuel_to_weight, initial_average_density, average_density, items, filled_weight, filled_volume, id):
        """
        Initialize a Rocket
        """
        self.spacecraft = spacecraft
        self.nation = nation
        self.payload_mass = payload_mass
        self.payload_volume = payload_volume
        self.mass = mass
        self.base_cost = base_cost
        self.fuel_to_weight = fuel_to_weight
        self.initial_average_density = initial_average_density
        self.average_density = average_density
        self.items = items
        self.filled_weight = filled_weight
        self.filled_volume = filled_volume
        self.id = id

class Item():
    def __init__(self, parcel_ID, mass, volume, density):
        """
        Initialize an Item
        """
        self.parcel_ID = parcel_ID
        self.mass = mass
        self.volume = volume
        self.density = density
        self.destination = 0

    def __str__(self):
        return self.parcel_ID


Cygnus = [
'CL1#55',
'CL1#71',
'CL1#60',
'CL1#65',
'CL1#47',
'CL1#3',
'CL1#5',
'CL1#46',
'CL1#44',
'CL1#24',
'CL1#75',
'CL1#82',
'CL1#15',
'CL1#54',
'CL1#67',
'CL1#37',
'CL1#98',
'CL1#63',
'CL1#94',
'CL1#70',
'CL1#92',
'CL1#7',
'CL1#99'
]

Cygnus2 = [
'CL1#59',
'CL1#1',
'CL1#5',
'CL1#17',
'CL1#15',
'CL1#53',
'CL1#33',
'CL1#36',
'CL1#72',
'CL1#29',
'CL1#44'
]

progress = [
'CL1#22',
'CL1#97',
'CL1#12',
'CL1#52',
'CL1#69',
'CL1#87',
'CL1#36',
'CL1#20',
'CL1#72',
'CL1#2',
'CL1#39',
'CL1#4',
'CL1#56',
'CL1#61',
'CL1#38',
'CL1#80',
'CL1#43'
]

kounotori = [
'CL1#30',
'CL1#51',
'CL1#86',
'CL1#58',
'CL1#13',
'CL1#11',
'CL1#42',
'CL1#9',
'CL1#10',
'CL1#79',
'CL1#78',
'CL1#40',
'CL1#1',
'CL1#33',
'CL1#81',
'CL1#16',
'CL1#50',
'CL1#62',
'CL1#84',
'CL1#45',
'CL1#34',
'CL1#91',
'CL1#59',
'CL1#17',
'CL1#100',
'CL1#35'
]

dragon = [
'CL1#73',
'CL1#27',
'CL1#88',
'CL1#64',
'CL1#68',
'CL1#66',
'CL1#76',
'CL1#23',
'CL1#31',
'CL1#85',
'CL1#49',
'CL1#26',
'CL1#32',
'CL1#14',
'CL1#8',
'CL1#90',
'CL1#19',
'CL1#28',
'CL1#95',
'CL1#83',
'CL1#48',
'CL1#57',
'CL1#41',
'CL1#18',
'CL1#93',
'CL1#21',
'CL1#29',
'CL1#74',
'CL1#25',
'CL1#77',
'CL1#6'
]

all = Cygnus + progress + kounotori + dragon

print(len(set(all)))

# read in the cargolist from csv
def ReadCargo(INPUT_CSV):
    cargolist = []
    df = pd.read_csv(INPUT_CSV)
    for index, row in df.iterrows():
        item = Item(row['parcel_ID'], row['mass (kg)'], row['volume (m^3)'], row['mass (kg)']/row['volume (m^3)'])
        cargolist.append(item)
    return cargolist

cargolist = ReadCargo('CargoLists/CargoList1.csv')

def ReadRockets(INPUT_CSV):
    rockets = []
    df = pd.read_csv(INPUT_CSV)
    for index, row in df.iterrows():
        rocket = Rocket(row["Spacecraft"], row["Nation"], row['Payload Mass (kgs)'], row['Payload Volume (m3)'],row['Mass (kgs)'], row['Base Cost($)'], row['Fuel-to-Weight'], row['Payload Mass (kgs)']/row['Payload Volume (m3)'], row['Payload Mass (kgs)']/row['Payload Volume (m3)'], [], 0, 0, row['id'])
        rockets.append(rocket)
        #print(rocket.initial_average_density)
    return rockets

rockets = ReadRockets('rockets.csv')

payload_volume = 18.9
payload_mass = 2000

def check_mass_and_volume(rocket):

    fig = plt.figure()
    ax = fig.add_subplot(111)
    slope = payload_mass/payload_volume
    x = np.linspace(0,payload_volume)
    y = slope*x
    plt.plot(x,y, 'r', label='Rocket density (kg/m3)')
    plt.title('Cygnus packing')
    plt.xlabel('Volume (m3)')
    plt.ylabel('Mass (kg)')
    plt.legend()


    # plt.axhline(y=slope, color='r', linestyle='-')
    # plt.axhline(y=slope+(slope*0.1), color='b', linestyle='--')
    # plt.axhline(y=slope+(slope*(-0.1)), color='b', linestyle='--')
    # plt.text(102, 105.82010582010582, 'Cygnus', fontsize=7, va='center', ha='center', backgroundcolor='w')

    total_mass = 0
    total_volume = 0
    for item1 in rocket:
        for item2 in cargolist:
            if item1 == item2.parcel_ID:
                width = total_volume + item2.volume
                height = total_mass + item2.mass
                ax.add_patch(patches.Rectangle((total_volume, total_mass), item2.volume, item2.mass, color='b', fill=True))

                total_mass += item2.mass
                total_volume += item2.volume

                # plt.scatter(item2.parcel_ID, item2.density, s=10)
                # plt.pause(0.2)

                ax.scatter(total_volume, total_mass, s=0)
                plt.axis((0,payload_volume,0,payload_mass))
                plt.pause(0.2)

    # for i in rockets:
    #     if rocket == i.spacecraft:
    #         print(i.spacecraft)
    #         mass = i.payload_mass
    #         volume = i.payload_volume
    #         print(mass)
    #         print(volume)

    plt.show()

def check_mass_and_volume2(rocket):

    slope = payload_mass/payload_volume

    plt.axhline(y=slope, color='r', linestyle='-')
    plt.axhline(y=slope+(slope*0.1), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*(-0.1)), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*0.2), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*(-0.2)), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*0.3), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*(-0.3)), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*0.4), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*(-0.4)), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*0.5), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*(-0.5)), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*0.6), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*(-0.6)), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*0.7), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*(-0.7)), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*0.8), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*(-0.8)), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*0.9), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*(-0.9)), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*1), color='b', linestyle='--')
    plt.axhline(y=slope+(slope*(-1)), color='b', linestyle='--')
    plt.ylim((30, 200))

    # plt.text(102, 105.82010582010582, 'Cygnus', fontsize=7, va='center', ha='center', backgroundcolor='w')

    for item1 in rocket:
        for item2 in cargolist:
            if item1 == item2.parcel_ID:
                # if item2.density < (slope+(slope*0.1)) and item2.density > (slope+(slope* -0.1)):
                    plt.scatter(item2.parcel_ID, item2.density, s=15)
                    plt.pause(0.2)
                # if item2.density > (slope+(slope*0.1)) and item2.density > (slope+(slope* -0.2)):
                #     plt.figure(2)
                #     plt.axhline(y=slope, color='r', linestyle='-')
                #     plt.axhline(y=slope+(slope*0.2), color='b', linestyle='--')
                #     plt.axhline(y=slope+(slope*(-0.2)), color='b', linestyle='--')
                #     plt.scatter(item2.parcel_ID, item2.density, s=15)
                #     plt.pause(0.2)
                #     plt.ylim((30, 200))
    plt.show()


if __name__ == "__main__":
    # print(len(set(cygnus)))
    # print(len(set(progress)))
    # print(len(set(kounotori)))
    # print(len(set(dragon)))
    # check_mass_and_volume(Cygnus2)
    check_mass_and_volume(Cygnus)
    # check_mass_and_volume2(Cygnus)
    # check_mass_and_volume(progress)
    # check_mass_and_volume(kounotori)
    # check_mass_and_volume(dragon)
