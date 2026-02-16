res=[]
def repeat(path,arr):
    if len(arr)==len(path):
        res.append(path)
        return
    for i in range(len(arr)):
        repeat(path+[arr[i]],arr)

repeat([],[1,2,3])
print(res)