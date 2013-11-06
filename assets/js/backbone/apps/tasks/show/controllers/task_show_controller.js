// Here I  will attempt to keep all the logic for tags in the controller
// and not in the view layer.  If this works then we can move
// the project view tag methods out to the controller as it should be.

define([
  'bootstrap',
  'underscore',
  'backbone',
  'base_view',
  'comment_list_controller',
  'task_item_view',
  'tag_show_view'
], function (Bootstrap, _, Backbone, BaseView, CommentListController, TaskItemView, TagShowView) {

  var TaskShowController = BaseView.extend({

    el: "#container",

    events: {
      'click .edit-task': 'edit'
    },

    initialize: function () {
      this.initializeTaskItemView();
      this.initializeChildren();
    },

    initializeChildren: function () {
      var self = this;

      if (this.commentListController) this.commentListController.cleanup();
      this.commentListController = new CommentListController({
        task: true,
        taskId: this.model.id
      });

      if (this.tagView) this.tagView.cleanup();
      this.tagView = new TagShowView({
        model: self.model,
        el: '.tag-wrapper',
        target: 'task',
        targetId: 'taskId',
        edit: true,
        url: '/api/tag/findAllByTaskId/'
      }).render();
    },

    initializeTaskItemView: function () {
      var self = this;

      if (this.taskItemView) this.taskItemView.cleanup();
      this.taskItemView = new TaskItemView({
        model: self.model,
        router: self.router
      });
    },

    edit: function (e) {
      if (e.preventDefault) e.preventDefault();
      var self = this;

      if (this.taskEditFormView) this.taskEditFormView.cleanup();
      this.taskEditFormView = new TaskEditFormView({
        el: '.edit-section',
        model: self.model
      }).render();
    },

    cleanup: function () {
      this.commentListController.cleanup();
      removeView(this);
    }

  });

  return TaskShowController;
})