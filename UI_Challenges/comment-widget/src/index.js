import Comment from './app/comment';
import Store from './app/store';
import Views from './app/views';
import './styles.scss';

function loadApp() {
  const storeService = new Store();
  const viewService = new Views();

  const comments = storeService.getComments();

  viewService.renderAllComments(comments);

  viewService.initCommentListener((comment, id) => {
    const newComment = storeService.saveComment(comment, id ?? 0);
    viewService.renderComment(newComment, id);
  });

  viewService.initDeleteListener((commentId) => {
    storeService.deleteComment(commentId);
  });
}

loadApp();
