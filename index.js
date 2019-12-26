//引入expres

var express = require('express');

//引入MongoClient

var MongoClient = require('mongodb').MongoClient;

var DBurl = 'mongodb://localhost:27017/';   //连接数据库的地址

var DBname = 'itying'; //连接数据库的名称

var app = express();

app.listen(3000,'127.0.0.1')


app.get('/', (req, res) => {
 //查询数据列表 DBurl是目标数据库地址 DBname是对应的数据库 
    // console.log(res);
    MongoClient.connect(DBurl, (err, db) => {
        if (err) {
            console.log('数据库链接失败');
               //这里可以自行设置失败提示信息 以便查找错误
            return;
        }
        //查询数据 
        var list = []; //查询的数据列表
        var col = db.db(DBname).collection('user').find({});
        col.each(function (error, doc) {
            if (error) {
                console.log(error);
            } else {
                if (doc != null) {
                    list.push(doc);
                } else {
                    //doc == null 的时候表示数据遍历完成  
                    var result = {
                        status:200,
                        total:list.length,
                        data:{
                           list: list
                        }
                    }
                    res.json(result)
                }
            }
        })
    })
})

app.get('/add', (req, res) => {
    //增加数据
    MongoClient.connect(DBurl, function (err, client) {
        //连接数据库
        if (err) {
            console.log(err);
            console.log('数据库链接失败');
            //这里可以自行设置失败提示信息 以便查找错误
            return;
        }
        // console.log(client);
        const col = client.db(DBname).collection('user'); //增加到数据库哪个表下
        //增加数据 collection
        col.insertOne({
            "name": "xiaozhang5",
            "age": 23
        }, (error, result) => {
            if (error) {
                console.log('增加数据失败');
                var result = {
                    status:405,
                    errMsg:'增加数据失败',
                }
                res.json(result)
                return;
            }
            var result = {
                status:200,
                errMsg:'成功',
            }
            res.json(result)
            client.close();//关闭数据库
        })

    });

})


app.get('/delete',(req,res)=>{
    //删除数据 DBname是对应的数据库   根据传过来的参数删除
    // console.log(url.parse(req.url,true));
        console.log(req.query);
       var query = req.query.name;
    //    console.log(query);
       MongoClient.connect(DBurl,function(err,db){
        if(err){
            console.log(err);
            res.send('数据库链接失败');
         //这里可以自行设置失败提示信息 以便查找错误
         }
         const collection = db.db(DBname).collection('user'); //数据库哪个表
            // console.log(collection);
        //  res.send('数据库链接成功');
         collection.deleteOne({ "name" : query }, function(error, result) {
                if(error){
                    // console.log('删除数据失败');
                    // console.log(error);
                    var result = {
                        status:405,
                        errMsg:'失败',
                    }
                    res.json(result)
                    return;

                }
                // console.log('删除数据成功');
                var result = {
                    status:200,
                    errMsg:'成功',
                }
                res.json(result)
                db.close();//关闭数据库
          });
       })
    })