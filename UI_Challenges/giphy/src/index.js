import httpService from './app/http-client';
import Store from './app/store';
import ViewportObserver from './app/viewport-observer';
import View from './app/views';
import './styles.scss';

function loadApp() {
  const http = new httpService();
  const viewService = new View();
  const storeService = new Store();
  const viewportObserver = new ViewportObserver();
  let searchQuery = '';
  let searchCount = 0;

  const resetView = () => {
    storeService.clearStore();
    viewService.clearSearch();
    viewService.clearResults();
    viewService.hideLoadMoreBtn();
    viewService.hideLoader();
    searchCount = 0;
  };

  const fetchResult = async (offset = 0, limit = 900) => {
    viewService.showLoader();
    try {
      let searchResult = await http.getSearchResults(searchQuery, offset, limit);
      searchCount = searchResult.pagination.total_count;

      searchResult = storeService.transformData(searchResult.data);

      if (storeService.getStoreCount() < searchCount) {
        viewService.showLoadMoreBtn();
      } else {
        viewService.hideLoadMoreBtn();
      }

      storeService.setStore(searchResult);
      viewService.addResult(searchResult);
      setTimeout(() => {
        viewService.hideLoader();
      }, 2000);
    } catch (error) {
      console.log(error);
      alert('Failed To Fetch Result!');
    }
  };

  viewService.getSearchResult(async (searchedString) => {
    if (searchQuery) {
      storeService.clearStore();
      viewService.clearResults();
    }
    searchQuery = searchedString?.trim();
    if (searchQuery) {
      fetchResult();
    } else {
      resetView();
    }
  });

  viewportObserver.initObserver(viewService.loadMoreBtn, (e) => {
    if (e.some((el) => el.isIntersecting)) {
      storeService.getStoreCount() && fetchResult(storeService.getStoreCount());
    }
  });

  viewService.initLoadMoreListener(
    () => storeService.getStoreCount() && fetchResult(storeService.getStoreCount())
  );
}

loadApp();
