/*jslint browser: true, indent: 2, nomen: true */
/*global require, define */

/*
  Newsfeed view.
*/
define([
// Libs
  'jquery',
  'underscore',
  'backbone',

// Base views.
  'baseviews/hpBaseView',

// Templates
  'text!templates/comment.html'

], function ($, _, Backbone, HpBaseView, CommentTemplateText) {
    'use strict';

    return HpBaseView.extend({

        tagName: "li",
        className: "status-update",

        events: {
            'click .comment.delete': 'clear',
            'click .view-all-comment': 'showFullMessage'
        },

        commentTemplate: _.template(CommentTemplateText),

        /**
        * Initialize.
        */
        initialize: function (options) {
            this.model.bind('destroy', this.remove, this);
        },

        /**
        * Render.
        *
        * Returns this.
        */
        render: function () {
            this.$el.html(this.commentTemplate(this.model.toJSON())).hide();
            this.$el.find("abbr.timeago").timeago();
            this.$el.slideDown('fast');
            return this;
        },
        clear: function (event) {
            event.preventDefault();
            this.model.destroy({wait:true});
        },
        remove: function () {
            this.$el.slideUp('fast', function () { $(this).remove(); });
        },
        showFullMessage: function (event) {
            event.preventDefault();
            this.$el.find('.snip-comment').hide(); ;
            this.$el.find('.full-comment').show();
            this.$el.find('.view-all-comment').hide();
        }
    });
});