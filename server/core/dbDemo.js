// npm install -S mysql
const db = require('./db.js');

// 插入数据
const insertCon=[];
insertCon.title="这是一个demo title";
insertCon.content="这是一个demo content";
db.Insert("demo",insertCon);

// 查找数据
const selectCon=[];
selectCon['1']=1;
selectCon.id=2;
db.Select("demo",selectCon,(err,res)=>{
  console.log(res);
});

// 修改数据
const datas=[];
const updateCon=[];
datas.title="123456";
datas.content="123456";
updateCon.id=2;
db.Update("demo",datas,updateCon);

// 删除数据
const delCon=[];
delCon.id=1;
db.Delete("demo",delCon);

// 执行Query
db.Query("select * from demo where id>10 order by id desc",(err,res)=>{
  console.log(res);
})