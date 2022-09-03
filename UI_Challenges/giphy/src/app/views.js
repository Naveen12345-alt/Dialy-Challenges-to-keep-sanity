export default class View {
  constructor() {
    this.searchRef = document.getElementById('search');
    this.resultWrapper = document.getElementsByClassName('search-results')[0];
    this.baseNode = document.getElementById('result');
    this.loadMoreBtn = document.getElementById('load-more');
    this.loader = document.getElementById('loader');
  }

  addResult(searchItems) {
    const documentFragment = new DocumentFragment();
    searchItems.forEach((data) => {
      const node = this.baseNode.content.cloneNode(true);
      node.querySelector('img').src = data.url;
      node.querySelector('img').alt = data.title;
      node.querySelector('img').title = data.title;
      node.querySelector('.result').id = data.id;
      node.querySelector('.result').href = data.link;
      documentFragment.appendChild(node);
    });
    this.loadMoreBtn.classList.remove('hidden');

    this.resultWrapper.appendChild(documentFragment);
  }

  getSearchResult(callback) {
    const debouncedCallback = this.debounceSearch(callback, 1000);
    this.searchRef.addEventListener('keyup', (e) => debouncedCallback(e.target.value));
    this.searchRef.addEventListener('search', (e) => debouncedCallback(e.target.value));
  }

  debounceSearch(callback, wait) {
    let timer = null;
    return function (...args) {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        callback.apply(this, args);
      }, wait);
    };
  }

  initLoadMoreListener(cb) {
    this.loadMoreBtn.addEventListener('click', () => cb());
  }

  clearResults() {
    this.resultWrapper.innerHTML = '';
    this.loadMoreBtn.classList.add('hidden');
  }

  clearSearch() {
    this.searchRef.value = '';
  }

  showLoadMoreBtn() {
    this.loadMoreBtn.classList.remove('hidden');
  }

  hideLoadMoreBtn() {
    this.loadMoreBtn.classList.add('hidden');
  }

  showLoader() {
    this.loader.classList.remove('hidden');
  }

  hideLoader() {
    this.loader.classList.add('hidden');
  }
}
