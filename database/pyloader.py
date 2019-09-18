import os 
dir_path = os.path.dirname(os.path.realpath(__file__))
filepathR = os.path.join(dir_path,'files/test.csv')
filepathW = os.path.join(dir_path,'transforms/testNew.csv')
print(filepathR)

data = []
with open(filepathR) as fpR, open(filepathW, "w") as fpW:
    line = fpR.readline()
    while line:
        #print(line)
        split = line.split(",")
        data.append(split)
        fpW.write(line)
        line = fpR.readline()

#print((data))
