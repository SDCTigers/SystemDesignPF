import os 
dir_path = os.path.dirname(os.path.realpath(__file__))
filepathR = os.path.join(dir_path,'files/test.csv')
filepathW = os.path.join(dir_path,'transforms/testNew.csv')
print(filepathR)

currentData = []
currentId = "0"
with open(filepathR) as fpR, open(filepathW, "w") as fpW: #open the file to read and file to write to
    line = fpR.readline()
    while line: #loop line by line
        #print(line)
        split = line.split(",")
        if split[1] != currentId: #check if it's a new main product id
            print(currentId + ":")
            print(currentData)
            currentId = split[1]
            currentData = []
        else:
            related = split[2].rstrip('\n') #remove \n
            currentData.append(related) 
        fpW.write(line)
        line = fpR.readline()
    print(currentId + ":")
    print(currentData)

#print((data))
