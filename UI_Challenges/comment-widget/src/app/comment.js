export default class Comment {
  constructor(title, level, parent) {
    this.title = title;
    this.parent = parent;
    this.level = level;
    this.replies = [];
    this.id = new Date().getTime().toString();
  }
}
