import Comment from './comment';

export default class Store {
  constructor() {
    this._store = [];
    this.getLocalStore();
  }

  getComments() {
    return this._store;
  }

  saveComment(comment, id = 0) {
    const parent = this.findComment(id);
    const commentLevel = parent?.level + 1 || 1;
    const commentParent = parent?.id || '';
    let newComment = new Comment(comment, commentLevel, commentParent);
    if (parent) {
      parent.replies.push(newComment);
    } else {
      this._store.push(newComment);
    }
    this.setLocalStore();
    return newComment;
  }

  deleteComment(id) {
    const comment = this.findComment(id);
    const parentId = comment.parent;
    if (parentId) {
      const parentComment = this.findComment(parentId);
      parentComment.replies.splice(
        parentComment.replies.findIndex((reply) => reply.id === comment.id),
        1
      );
    } else {
      this._store.splice(
        this._store.findIndex((reply) => reply.id === comment.id),
        1
      );
    }

    this.setLocalStore();
  }

  findComment(id, comments = this._store) {
    for (let comment of comments) {
      if (comment.replies.length) {
        const result = this.findComment(id, comment.replies);
        if (result) return result;
      }
      if (comment.id === id) return comment;
    }
    return null;
  }

  getLocalStore() {
    if (window.localStorage.comments) {
      this._store = JSON.parse(window.localStorage.getItem('comments'));
    } else {
      this._store = [];
    }
  }

  setLocalStore() {
    if (this._store) {
      window.localStorage.setItem('comments', JSON.stringify(this._store));
    }
  }
}
