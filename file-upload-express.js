
const express = require('express')

const app = express()

var multer = require('multer')

var fs = require('fs');
var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

var uploadFolder = './upload/';

createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.originalname + '-' + Date.now());  
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

app.get('/',(req, res) => res.send('Hello World'))

app.post('/aa', upload.array('file'), function(req, res, next){
	var files = req.files
	res.send({ret_code: '0'})
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
