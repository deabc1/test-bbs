const _=require('../utils/util')

exports.test=function(req,res){
    console.log('test*****');
    _.db.collection('test').save({name:'test',desc:'20200729'},(err,doc)=>{
        //console.log(doc)
        res.json('成功');
    })
}

exports.saveUser=function(req,res){
    var saveObj={
        userId: 168,
        email: '72@qq.com',
        phone: 18812345678,
        profileId: 1000
    }

    _.db.collection('User').save(saveObj,(err,doc)=>{
        //console.log(doc)
        res.json('成功');
    })
}

exports.saveProfile=function(req,res){
    var saveObj={
        profileId: 1000,
        alias: '小明',
        commentIds: [],
        replyIds: [],
        postIds: [],
        favoriteIds: []
    }

    _.db.collection('Profile').save(saveObj,(err,doc)=>{
        //console.log(doc)
        res.json('成功');
    })
}

exports.adsad=function(req,res){
    var saveObj={
        profileId: 1000,
        alias: '小明',
        commentIds: [],
        replyIds: [],
        postIds: [],
        favoriteIds: []
    }

    _.db.collection('Profile').save({name:'test',desc:'20200729'},(err,doc)=>{
        //console.log(doc)
        res.json('成功');
    })
}