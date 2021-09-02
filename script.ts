const app = new (class {
  htmlElements = {
    postsContainer: <HTMLDivElement>document.getElementById("posts-container"),
    loading: <HTMLDivElement>document.querySelector(".loader"),
    filter: <HTMLInputElement>document.getElementById("filter"),
  };
})();
