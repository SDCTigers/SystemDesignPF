import os 
dir_path = os.path.dirname(os.path.realpath(__file__))
filepathRSt = os.path.join(dir_path,'files/styles.csv')
filepathRSk = os.path.join(dir_path,'files/skus.csv')
filepathRP = os.path.join(dir_path,'files/photos.csv')
filepathW = os.path.join(dir_path,'transforms/stylesTransformed.csv')

def stringifyArr(arr):
    if len(arr) == 0:
        return "{}"
    string = "{"
    for val in arr:
        string = string + val + ","
    string = string[:-1]
    string = string + "}"
    return string

def checkStyle(line):
    line = line[:-1]
    line = line.replace("null","-1")
    return line

currentSKUS = []
currentPhotos = []
currentId = "1"

with open(filepathRSt) as fpRSt, open(filepathRSk) as fpRSk, open(filepathRP) as fpRP, open(filepathW, "w") as fpW: #open the files to read and file to write to
    lineSt = fpRSt.readline() #styles
    lineSk = fpRSk.readline() #skus
    lineP = fpRP.readline() #photos
    fpW.write("id,productId,name,sale_price,original_price,default_style,skus,photos\n")
    lineSt = fpRSt.readline() #styles
    lineSk = fpRSk.readline() #skus
    lineP = fpRP.readline() #photod
    # print(lineSt)
    # print(lineSk)
    # print(lineP)
    splitSk = lineSk.split(",")
    splitP = lineP.split(",")
    while lineSt:
        splitSt = lineSt.split(",")
        currentId = splitSt[0]
        while len(splitSk) > 1 and splitSk[1] == currentId: #process the sku parts
            currentSKUS.append(splitSk[0])
            lineSk = fpRSk.readline() #skus
            splitSk = lineSk.split(",")
        strSk = stringifyArr(currentSKUS)
        currentSKUS = []
        while len(splitP) > 1 and splitP[1] == currentId: #process the photos parts
            currentPhotos.append(splitP[0])
            lineP = fpRP.readline() #photos
            splitP = lineP.split(",")
        strP = stringifyArr(currentPhotos)
        currentPhotos = []
        finalLine = checkStyle(lineSt) + ",\"" + strSk + "\",\"" + strP + "\"\n"
        fpW.write(finalLine)
        #print(finalLine)
        lineSt = fpRSt.readline() #styles

