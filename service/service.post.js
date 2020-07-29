const _=require('../utils/util')
const moment = require('moment')

exports.addPost=addPost;
exports.addComment=addComments;
exports.addReplyToUser=addReplyToUser;

//模拟发帖方法
function addPost(req,res){
 
    let obj={};
    obj.postId=10000;
    obj.title='test post';
    obj.text='today is very good';
    obj.publishedAt=moment().format('YYYY-MM-DD HH:mm:ss');
    obj.replyIds=[];
    

    let findObj={
        profileId:1000
    };

    let updateObj={postId:obj.postId};

    _.db.collection('Post').save(obj,(err,doc)=>{
        //console.log(doc)
        updateProfile(findObj,updateObj,(result)=>{
            console.log('result',result);
            res.json('成功');
        });
        
    });



}

//更新postId到Profile
function updateProfile(queryObj,updateObj,fn){

    _.db.collection('Profile').find(queryObj).toArray((err,doc)=>{
        console.log('get Profile doc',doc);
        let data=doc[0];
        data.postIds.push(updateObj.postId);
        console.log('new data',data);

        _.db.collection("Profile").update(queryObj, { $set: data }, function(e, o) {
            if(e){
              console.log('update mongo have err',e);
              fn(e)
            }
            else{
              fn(null)
            }
        });

    });

    
}

//模拟回帖
function addComments(req,res){

    let reObj={
        commentsId: 10000,
        postId: 10000,
        publishedAt:moment().format('YYYY-MM-DD HH:mm:ss'),
        text: '我是小白'

    }

    let findObj={postId:reObj.postId};
    let updateObj={commentsId:reObj.commentsId};

    _.db.collection('comments').save(reObj,(err,doc)=>{
        //console.log(doc)
        saveReplyIdToPost(findObj,updateObj,(result)=>{
            console.log('result',result);
            res.json('成功');
        });
        
    });
}

//保存 回帖id到post
function saveReplyIdToPost(postobj,updateObj){

    _.db.collection('Post').find(postobj).toArray((err,doc)=>{
        console.log('get Post doc',doc);
        let data=doc[0];
        data.replyIds=[];
        
        data.replyIds.push(updateObj.commentsId);
        let updateData={replyIds:data.replyIds};
        console.log('new data',data);

        _.db.collection("Post").update(queryObj, { $set: updateData }, function(e, o) {
            if(e){
              console.log('update mongo have err',e);
              fn(e)
            }
            else{
              fn(null)
            }
        });

    });

}

//模拟回复用户
function addReplyToUser(req,res){

    let reObj={
        commentsId: 10001,
        postId: 10000,
        publishedAt:moment().format('YYYY-MM-DD HH:mm:ss'),
        text: '我是小黄',
        reply: 10001

    }

    let findObj={postId:reObj.postId};
    let updateObj={commentsId:reObj.commentsId};

    _.db.collection('comments').save(reObj,(err,doc)=>{
        //console.log(doc)
        saveReplyIdToPost(findObj,updateObj,(result)=>{
            console.log('result',result);
            res.json('成功');
        });
        
    });
}