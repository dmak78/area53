/*jslint browser: true, indent: 2, maxlen: 80, nomen: true, plusplus: true */
/*global define */

/*
Story block collection.

See ./models/storyBlockModel.js
*/
define([
// Libs
    'jquery',
  'underscore',
  'backbone',

  'models/Post',
  'collections/Comments'
], function ($, _, Backbone, PostModel, CommentsCollection) {
    'use strict';

    return Backbone.Collection.extend({

        model: PostModel,

        url: '/area53/_design/area53/_view/posts',

        parse: function (data){
            console.log(data.rows[0].value);
            var newData = data.rows[0].value;
            //data.author.avatar_url = data.author.avatar_url || "/lib/img/hp/avatars/150/opt-out-user.jpg";
            return newData;
        },


        initialize: function (){
            this.on('reset', this.getComments, this);
        },
        update: function (){
            this.fetch({add:true});
        },
        getComments: function (){
            this.each(function (post){
                post.comments = new CommentsCollection([], { post: post});
                if(post.get('comment_count') > 0){
                    post.comments.fetch();
                }
                
            });
        }
    });
});