import Mock from 'mockjs'

 
// 设置拦截ajax请求的响应时间
Mock.setup({
    timeout: '100-500'
});
 //自行扩展占位符
 Mock.Random.extend({
    ctype(){
        return this.pick([
            '通知公告',
            '分校咨讯',
            
        ])
    }
})
const userList = {  //定义用户数据
    data: {
        total: 6,
        //前两个用户数据分别固定设为管理员和普通用户，为后续权限设置做准备
        userinfo: [{  
            username: 'admin',
            password: '123456',
            roles: 0,//0是管理员
            name: '张三',
            id: '100',
            email:"111@qq.com",
            phone:"13987456565"
          //token: '000111222333444555666',
            
        }, {
            username: 'editor',
            password: '123456',
            roles: 1,//1为报送账号
            name: '测试1',
            id: '101', 
            email:"121@qq.com",
            phone:"13987432333"
        },  {
            username: 'polly',
            password: '123456',
            roles: 1,//1为报送账号
            name: '测试2',
            id: '102', 
            email:"112@qq.com",
            phone:"13987423232"
        }, {  
            username: 'admin222',
            password: '123456',
            roles: 0,//0是管理员
            name: '李梅梅',
            id: '103',
            email:"111@qq.com",
            phone:"13987456565"
          //token: '000111222333444555666',
            
        }, {
            username: 'editor222',
            password: '123456',
            roles: 1,//1为报送账号
            name: '张小泉',
            id: '104', 
            email:"121@qq.com",
            phone:"13887672333"
        },  {
            username: 'jimmy',
            password: '123456',
            roles: 1,//1为报送账号
            name: '孙二',
            id: '105', 
            email:"112@qq.com",
            phone:"18987234323"
        }],
        meta: {
            status: 200,
            message: 'success',
        }
    },
};

//根据id获取用户信息
Mock.mock('/user/login','post',req=>{//请求的路径和方式
    const{username,password} = JSON.parse(req.body);//将传递进来的数据保存
    for(let i=0;i<userList.data.userinfo.length;i++){
        //判断userlist中是否存在该用户并且密码正确
        if(username===userList.data.userinfo[i].username&&password===userList.data.userinfo[i].password){
            return{
                meta:{
                    msg:"登录成功",
                    status:200
                },
                user:{
                    username:userList.data.userinfo[i].username,
                    roles:userList.data.userinfo[i].roles,
                    email:userList.data.userinfo[i].email,
                    phone:userList.data.userinfo[i].phone,
                    truename:userList.data.userinfo[i].name
                }
            }
        }
    }
    return{
        meta:{
            msg:"用户不存在或者密码错误",
            status:201
        }
    }
})
//删除用户

Mock.mock('/user/delete','post',req=>{//请求的路径和方式
    const{uids} = JSON.parse(req.body);//将传递进来的数据保存
    
var arr = uids.split(',');
    console.log(arr);
    const newarr=[]
    for(var i=0;i<arr.length;i++){
        for(let j=0;j<userList.data.userinfo.length;j++){
            if(arr[i]===userList.data.userinfo[j].id){
                console.log(arr[i]);
                userList.data.userinfo.splice(j,1)
            }
        }
        
        
    }
    
    console.log(newarr);
    return {
        status:200,
        data:userList
    }
})


//用户注册接口
Mock.mock('/user/register','post',req=>{
    var data = JSON.parse(req.body);
    console.log(JSON.parse(req.body));
    if(data.region==""||data.city==""){
        return{
            status:201,
            msg:"注册失败"
        }
    }else{
        return{
            status:200,
            msg:"注册成功"
        }
    }
    
})
//退出登录
Mock.mock('/user/logout','get',req=>{
    return {
        status:200,
        msg:"退出成功"
    }
})

//首页列表
const dataList = [] // 用于接受生成数据的数组

const datalength=Mock.mock("@integer(30,100)")

for (let i = 0; i < datalength; i++) { // 可自定义生成的个数

  const template = {

        'id':i+1,
        'noticetitle':Mock.mock("@ctitle(10,30)"),
        'docreltime':Mock.mock("@date('yyyy-MM-dd')"),
        'isdelay':Mock.mock('@ctype'),
        'type':Mock.mock('@cname'),
     


  }

  dataList.push(template)

}

Mock.mock('/api/list', 'post', (params) => {

   
  var info = JSON.parse(params.body)
//全部
  var [index, size, total] = [info.pageIndex, info.pageSize, dataList.length]

  var len = total / size

  var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len

  var newDataList = dataList.slice(index * size, (index + 1) * size)

    return {

        'code': '0',
    
        'message': 'success',
    
        'data': {
    
          'pageIndex': index,
    
          'pageSize': size,
    
          'rows': newDataList,
    
          'total': total,
    
          'totalPages': totalPages
    
        }
    
      }

  

})


//首页详情
const detailData= Mock.mock({
            'title':'@ctitle',
            'htmlcontent':'@cparagraph( 5,20 )',
            'docreltime':"@date('yyyy-MM-dd')",
            'cruser':"@cname"
        })
Mock.mock('/api/detail','get',req=>{
    
    return {
        status:200,
        data:detailData
    }
})

//报送列表

const dataList2 = [] // 用于接受生成数据的数组

const datalength2=Mock.mock("@integer(1,20)")

for (let i = 0; i < datalength2; i++) { // 可自定义生成的个数

  const template2 = {

        'id':i+1,
        'noticetitle':Mock.mock("@ctitle(10,30)"),
        'docreltime':Mock.mock("@date('yyyy-MM-dd')"),
        'isdelay':Mock.mock('@ctype'),
        'type':"",
     


  }

  dataList2.push(template2)

}

Mock.mock('/api/sendList', 'post', (params) => {
    
   
  var info = JSON.parse(params.body)
//全部
  var [index, size, total] = [info.pageIndex, info.pageSize, dataList2.length]

  var len = total / size

  var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len

  var newDataList = dataList2.slice(index * size, (index + 1) * size)

    return {

        'code': '0',
    
        'message': 'success',
    
        'data': {
    
          'pageIndex': index,
    
          'pageSize': size,
    
          'rows': newDataList,
    
          'total': total,
    
          'totalPages': totalPages
    
        }
    
      }

  

})

//用户列表
Mock.mock('/api/users','get',req=>{
    
    return {
        status:200,
        data:userList
    }
})


//根据id获取用户信息
Mock.mock('/user/getById','post',req=>{//请求的路径和方式
    const{uid} = JSON.parse(req.body);//将传递进来的数据保存
    for(let i=0;i<userList.data.userinfo.length;i++){
        //判断userlist中是否存在该用户并且密码正确
        if(uid===userList.data.userinfo[i].id){
            return{
                meta:{
                    msg:"获取成功",
                    status:200
                },
                user:{
                    username:userList.data.userinfo[i].username,
                    roles:userList.data.userinfo[i].roles,
                    email:userList.data.userinfo[i].email,
                    phone:userList.data.userinfo[i].phone,
                    truename:userList.data.userinfo[i].name
                  
                }
            }
        }
    }
    return{
        meta:{
            msg:"用户不存在或者密码错误",
            status:201
        }
    }
})

// Mock.mock('/user/logout','get',{
//     'list|5-10':[{
//         'id|+1':1,
//         'username':'@cname',
//         'email':'@email',
//         'gender':'@cgender',
//         'price|1-100.1-2':1
//     }]
// })