import os 
dir_path = os.path.dirname(os.path.realpath(__file__))
filepath = os.path.join(dir_path,'files/photos.csv')
print(filepath)

data = []
with open(filepath) as fp:
   line = fp.readline()
   while line:
        #print(line)
        data.append(line)
        line = fp.readline()

print(len(data))