const sequelize = require('../utils/database');
const Entry = require('../models/Entry');
const Topic = require('../models/Topic');

exports.getEntry = (req, res) => {
    if (req.params.id !== 'favicon.ico') {
        Entry.findByPk(req.params.id,{include:Topic})
            .then((entry) => {
                var liked = false;
                var disliked = false;
                    liked = entry.like.includes(res.locals.currentUser.username);
                    disliked = entry.dislike.includes(res.locals.currentUser.username);
                return res.render('entry', { entry,liked,disliked });
            }).catch((error) => console.log(error));
    }
};

exports.addEntry=(req,res)=>{
    Entry.create({
        text:req.body.text,
        UserUsername:res.locals.currentUser.username,
        TopicId:req.body.topic
    })
    .then(()=>{
        return res.redirect('back');
    }).catch((error)=>console.log(error));
};

exports.updateEntry = (req, res) => {
    if(req.params.id !== 'favicon.ico'){
        Entry.update({text:req.body.text},{where:{id:req.params.id}})
        .then(()=>{
            return res.redirect('back');
        }).catch((error)=>console.log(error));
    }
};

exports.deleteEntry = (req, res) => {
    if (req.params.id !== 'favicon.ico') {
        Entry.destroy({ where: { id: req.params.id } })
            .then(() => {
                res.redirect('back');
            }).catch(error => console.log(error));
    }
};

exports.onClickLike = (req, res) => {
    if (req.params.id !== 'favicon.ico' && req.params.username !== 'favicon.ico') {
        Entry.findByPk(req.params.id)
            .then((entry) => {
                var liked = false;
                var disliked = false;
                entry.dislike !== null && entry.dislike.forEach((user) => {
                    if (user == req.params.username) {
                        disliked = true;
                    }
                });
                entry.like !== null && entry.like.forEach((user) => {
                    if (user == req.params.username) {
                        liked = true;
                    }
                });
                if (disliked) {
                    Entry.update({ 'dislike': sequelize.fn('array_remove', sequelize.col('dislike'), req.params.username) }, { where: { id: req.params.id } })
                        .then(() => {
                            Entry.update({ 'like': sequelize.fn('array_append', sequelize.col('like'), req.params.username) },
                                { where: { id: req.params.id } })
                                .then(() => {
                                    return res.redirect('back');
                                }).catch((error) => console.log(error));
                        }).catch((error) => console.log(error));
                } else if (liked) {
                    Entry.update({ 'like': sequelize.fn('array_remove', sequelize.col('like'), req.params.username) }, { where: { id: req.params.id } })
                        .then(() => {
                            return res.redirect('back');
                        }).catch((error) => { console.log(error) });
                } else {
                    Entry.update({ 'like': sequelize.fn('array_append', sequelize.col('like'), req.params.username) }, { where: { id: req.params.id } })
                        .then(() => {
                            return res.redirect('back');
                        }).catch((error) => console.log(error));
                }
            }).catch((error) => console.log(error));
    }
};

exports.onClickDislike = (req, res) => {
    if (req.params.id !== 'favicon.ico' && req.params.username !== 'favicon.ico') {
        Entry.findByPk(req.params.id)
            .then((entry) => {
                var liked = false;
                var disliked = false;
                entry.like !== null && entry.like.forEach((user) => {
                    if (user == req.params.username) {
                        liked = true;
                    }
                });
                entry.dislike !== null && entry.dislike.forEach((user) => {
                    if (user == req.params.username) {
                        disliked = true;
                    }
                });

                if (liked) {
                    Entry.update({ 'like': sequelize.fn('array_remove', sequelize.col('like'), req.params.username) }, { where: { id: req.params.id } })
                        .then(() => {
                            Entry.update({ 'dislike': sequelize.fn('array_append', sequelize.col('dislike'), req.params.username) }, { where: { id: req.params.id } })
                                .then(() => {
                                    return res.redirect('back');
                                }).catch(error => console.log(error));
                        }).catch(error => console.log(error));
                } else if (disliked) {
                    Entry.update({ 'dislike': sequelize.fn('array_remove', sequelize.col('dislike'), req.params.username) }, { where: { id: req.params.id } })
                        .then(() => {
                            return res.redirect('back');
                        }).catch(error => console.log(error));
                } else {
                    Entry.update({ 'dislike': sequelize.fn('array_append', sequelize.col('dislike'), req.params.username) }, { where: { id: req.params.id } })
                        .then(() => {
                            return res.redirect('back');
                        }).catch(error => console.log(error));
                }
            }).catch(error => console.log(error));
    }
};