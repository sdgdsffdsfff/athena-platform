'use strict';

/**
 * 组件模型
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lastMod = require('../utils/mongoose-lastMod');

var WidgetSchema = new Schema({
  name: String,
  createTime: {type: Date, default: Date.now},
  author: String, //暂时没有用户模块
  //author: {type: Schema.Types.ObjectId, ref: 'User'},
  app: {type: String, ref: 'App'},
  module: {type: String, ref: 'Mod'},
  loadedBy: [{type: Schema.Types.ObjectId, ref: 'Page'}], //被哪些页面引用
  preview: {type: String, default: ''} // 预览地址
});

WidgetSchema.plugin(lastMod);

WidgetSchema.pre('save', function(next) {
  this.loadedBy = this.loadedBy.filter(function(page, index) {
    return this.loadedBy.indexOf(page) === index;
  }.bind(this));

  next();
});

module.exports = mongoose.model('Widget', WidgetSchema);
