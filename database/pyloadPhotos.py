import os 
dir_path = os.path.dirname(os.path.realpath(__file__))
filepathR = os.path.join(dir_path,'files/photos.csv')
filepathW = os.path.join(dir_path,'tests/testPhotos.csv')
#print(filepathR)

currentData = []
currentId = "1"
with open(filepathR) as fpR, open(filepathW, "w") as fpW: #open the file to read and file to write to
    line = fpR.readline()
    fpW.write("id,styleId,url,thumbnail_url\n")
    line = fpR.readline()
    while currentId != "201":
        fpW.write(line)
        line = fpR.readline()
        split = line.split(",")
        currentId = split[1]


    # fpW.write("product_id,relatedItems\n")
    # #print("product_id,relatedItems")
    # line = fpR.readline()
    # while currentId != "201": #loop line by line
    #     #print(line)
    #     split = line.split(",")
    #     if split[1] != currentId: #check if it's a new main product id
    #         fpW.write(currentId)
    #         #print(currentId + ",\"" + stringifyArr(currentData) + "\"")
    #         currentId = split[1]
    #         currentData = []
    #     else:
    #         related = split[2].rstrip('\n') #remove \n
    #         currentData.append(related) 
    #     line = fpR.readline()
    # fpW.write(currentId)
    #print(currentId + ",\"" + stringifyArr(currentData) + "\"")


#print((data))
