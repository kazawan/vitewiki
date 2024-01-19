# PYTHON PILLOW 转 hex
可能会变色
```python
from PIL import Image

input = input("请输入图片名称：")
img = Image.open(input)
imgWidth, imgHeight = img.size
img = img.convert("RGB")
print(imgWidth, imgHeight)
d = {}
d_index = -1

def RGB_to_Hex(rgb):
    RGB = rgb.split(',')
    color = '0x'
    for i in RGB:
        num = int(i)
        color += str(hex(num))[-2:].replace('x', '0').upper()
#     print(color)
    return color


for h in range(imgHeight):
    for w in range(imgWidth):
        d_index += 1
        colors = img.getpixel((w, h))
        d[d_index] = RGB_to_Hex(str(colors).strip('()'))

#! 写文件操作
filename = input.split('.')[0] + '.h'
dict = open(filename, 'a')
dict.write('/** \n')
dict.write(' * @file ' + filename + '\n')
dict.write(' * @brief ' + input + '的RGB565格式数据 \n')
dict.write(' * @version 0.1 \n')
dict.write(' * @width' + str(imgWidth) + '\n')
dict.write(' * @height' + str(imgHeight) + '\n')
dict.write(' * \n')
dict.write(' */ \n')
dict.write('\n')

dict.write('const long' + ' ' + filename.split('.')[0] + '[] = {' + '\n')



for i in range(len(d)):
    dict.write(d[i]) #写入数据
    dict.write(',') 
    print(d[i], end=',')

    if i % imgWidth == imgWidth - 1:
        print() # 换行

dict.write('};')



```