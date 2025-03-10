# 📷 React 上传图片逻辑
::: info   
后端配置     
[/后端笔记/express处理图片上传](../../后端笔记/express处理图片上传.md)    
:::


> 📝 服务器要保存 `image_url` `image_alt` `image_name`

```js
const [imgName, setImgName] = (useState < string) | (null > null); // 图片名字
const [image, setImage] = useState(null); // 图片文件
```

## 🔄 `handleFileSelect` 处理 `input` -> `onChange`

方法

```js
const handleFileSelect = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 验证是否为图片类型
  if (!file.type.startsWith("image/")) {
    alert("请选择图片文件（jpg/png/gif 等）");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    setImgSrc(e.target?.result);
    setImgName(file.name);
  };
  reader.readAsDataURL(file);

  setImage(e.target.files[0]);
  setImgName(e.target.files[0].name);
};
```

📁 `input` 标签

```jsx
            <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"/>
          
```

## 🚀 上传图片到服务器
```js
async function handleUPLOAD(){
     if (!image) return;
     const formData = new FormData();
    formData.append("image", image);
    formData.append("image_alt", imgName);
    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      // 把图片插入到编辑器
      // ...
      setImgSrc(null);
      setImgName(null);
    } catch (err) {
      console.log(err);
    }
}

```

