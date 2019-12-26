# nodejs-
自己学习nodejs的简单例子
/**
1.npm install mongodb --save-dev / cnpm install mongodb --save-dev

2.var MongoClient = require('mongodb').MongoClient;

 var url = 'mongodb://localhost:27017/';   连接数据库的地址

 3.连接数据库

 MongoClient.connect(url, function(err, db) {

});

 4.实现增加修改删除

 MongoClient.connect(url, function(err, db) {

    db.collection('user').insertOne({'name':'zhangsan'},function(error,data){




    })

});
