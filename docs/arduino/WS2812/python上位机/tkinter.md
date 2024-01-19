## tkinter canvas 获取元素



生成画布
```py
canvas = tk.Canvas(
    app,
    width=600,
    height=300,
    bg="#000"
)
```

生成元素
```py
text1 =canvas.create_text(
    30,15,
    text="hello",
    fill="#fff",
    font=('Helvetica 15 bold'),
    tags="text1-1"
)

text2 =canvas.create_text(
    80,15,
    text="world",
    fill="#fff",
    font=('Helvetica 15 bold'),
    tags="text1-2"
)
```

绑定元素点击事件 
```py
def text1_canvas_event(event):
    print(event.x,event.y)
    print("hello is ")
    print("pressed")
    n = canvas.find_closest(x = event.x,y=event.y) #查找坐标上的元素
    tag = n[0] #返回第一个
    d = canvas.gettags(tag)[0] #获取元素tags
    #编辑元素配置
    canvas.itemconfig(
        tag,
        fill="#f00"
    )

#<Button-1>鼠标左键
#<Button-2>鼠标中键
#<Button-3>鼠标右键

canvas.tag_bind(
    tagOrId='text1-1',
    sequence='<Button>',#<Button>此为鼠标点击
    func=text1_canvas_event
    
)


canvas.tag_bind(
    tagOrId='text1-2',
    sequence='<Button>',
    func=text1_canvas_event
    
)
```

place 画布

```py
canvas.place(
    x=4,
    y=4,
    
)
```