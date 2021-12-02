const app = new (class {
  htmlElements = {
    postsContainer: <HTMLDivElement>document.getElementById("posts-container"),
    loading: <HTMLDivElement>document.querySelector(".loader"),
    filter: <HTMLInputElement>document.getElementById("filter"),
  };
  limit: number = 3;
  page: number = 1;

  constructor() {
    this.showPosts();

    window.addEventListener("scroll", () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        this.showLoading();
      }
    });

    this.htmlElements.filter.addEventListener("input", this.filterPosts);
  }

  filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll(".post");

    posts.forEach((post: HTMLElement) => {
      const title = (<HTMLElement>(
        post.querySelector(".post-title")
      )).innerText.toUpperCase();
      const body = (<HTMLElement>(
        post.querySelector(".post-body")
      )).innerText.toUpperCase();

      if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
        post.style.display = "flex";
      } else {
        post.style.display = "none";
      }
    });
  }

  async getPosts(): Promise<JsonPlaceholderPostList> {
    const res = await fetch(
      `http://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`
    );

    return await res.json();
  }

  async showPosts() {
    const posts = await this.getPosts();

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
              <div class="number">${post.id}</div>
              <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
              </div>
            `;
      this.htmlElements.postsContainer.appendChild(postElement);
    });
  }

  showLoading() {
    this.htmlElements.loading.classList.add("show");
    setTimeout(() => {
      this.htmlElements.loading.classList.remove("show");
      setTimeout(() => {
        this.page++;
        this.showPosts();
      }, 300);
    }, 1000);
  }
})();
