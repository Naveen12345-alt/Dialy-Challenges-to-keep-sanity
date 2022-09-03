export default class Views {
  colors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#818CF8', '#A78BFA', '#F472B6'];

  constructor() {
    this.baseWrapper = document.getElementById('comments-wrapper');
    this.commentNode = document.getElementById('comment');
    this.input = document.getElementById('input');

    this.renderCommentInput();
    this.initReplyListener();
  }

  renderAllComments(comments, baseWrapper = this.baseWrapper) {
    for (let comment of comments) {
      const commentNode = this.createCommentNode(comment, baseWrapper);
      if (comment.replies.length) {
        this.renderAllComments(comment.replies, commentNode.querySelector('.nested-comments'));
        commentNode.querySelector('.nested-comments').classList.remove('hidden');
        commentNode.querySelector('.nested-comments').classList.add('flex');
      }
      baseWrapper.append(commentNode);
    }
  }

  createCommentNode(comment) {
    const node = this.commentNode.content.cloneNode(true);
    node.querySelector('.comment').id = comment.id;
    node.querySelector('.comment').classList.add(`level-${comment.level}`, 'w-11/12');
    node.querySelector('.content').style.backgroundColor =
      this.colors[Math.floor(Math.random() * 7)];
    node.querySelector('.content').textContent = comment.title;
    node.querySelector('delete');
    this.renderCommentInput(node.querySelector('.comment-box'));
    return node;
  }

  renderCommentInput(baseWrapper = this.baseWrapper) {
    const node = this.input.content.cloneNode(true);
    if (baseWrapper !== this.baseWrapper) {
      baseWrapper.classList.add('hidden');
    }
    baseWrapper.appendChild(node);
  }

  initCommentListener(cb) {
    document.body.addEventListener('keyup', (e) => {
      this.commentListenerCb(e, cb);
    });
  }

  commentListenerCb(e, cb) {
    if (e.target.classList.contains('comment-input') && e.code === 'Enter') {
      const id = e.target.parentNode.parentNode.id;
      cb(e.target.value.trim(), id);
      e.target.value = '';
      if (!e.target.parentNode.classList.contains('comments-wrapper')) {
        e.target.parentNode.classList.add('hidden');
      }
    }
  }

  renderComment(comment, parentId = 0) {
    const node = this.createCommentNode(comment);
    if (comment.level === 1) {
      this.baseWrapper.append(node);
    } else {
      document.getElementById(parentId).querySelector('.nested-comments').classList.add('flex');
      document.getElementById(parentId).querySelector('.nested-comments').appendChild(node);
      document
        .getElementById(parentId)
        .querySelector('.nested-comments')
        .classList.remove('hidden');
    }
  }

  initReplyListener() {
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('reply')) {
        const commentBox = e.target.parentNode.parentNode.querySelector('.comment-box');
        commentBox.classList.contains('hidden')
          ? commentBox.classList.remove('hidden')
          : commentBox.classList.add('hidden');
      }
    });
  }

  initDeleteListener(cb) {
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        cb(e.target.parentNode.parentNode.id);
        e.target.parentNode.parentNode.remove();
      }
    });
  }
}
