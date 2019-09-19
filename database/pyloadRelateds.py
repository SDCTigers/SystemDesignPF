import os 
dir_path = os.path.dirname(os.path.realpath(__file__))
filepathR = os.path.join(dir_path,'files/test.csv')
filepathW = os.path.join(dir_path,'transforms/testNew.csv')
#print(filepathR)


def stringifyArr(arr):
    string = "{"
    for val in arr:
        string = string + val + ","
    string = string[:-1]
    string = string + "}"
    return string

currentData = []
currentId = "1"
with open(filepathR) as fpR, open(filepathW, "w") as fpW: #open the file to read and file to write to
    line = fpR.readline()
    fpW.write("product_id,relatedItems\n")
    print("product_id,relatedItems")
    line = fpR.readline()
    while line: #loop line by line
        #print(line)
        split = line.split(",")
        if split[1] != currentId: #check if it's a new main product id
            fpW.write(currentId + ",\"" + stringifyArr(currentData) + "\"" + "\n")
            print(currentId + ",\"" + stringifyArr(currentData) + "\"")
            currentId = split[1]
            currentData = []
        else:
            related = split[2].rstrip('\n') #remove \n
            currentData.append(related) 
        line = fpR.readline()
    fpW.write(currentId + ",\"" + stringifyArr(currentData) + "\"")
    print(currentId + ",\"" + stringifyArr(currentData) + "\"")


#print((data))
