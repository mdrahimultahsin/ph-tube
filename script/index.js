/**
 * Load Data
 */
const loadCatergories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
      .then((res) => res.json())
      .then((data) => {
        displayVideos(data.videos);
      });
  };


/**
 * Display Data 
 * */

//Display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((cat) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button class="btn btn-md px-4 bg-[#25252520] hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
    categoriesContainer.appendChild(div);
  });
};


//Display videos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card bg-base-100">
                    <figure>
                      <img class="w-full h-42 object-cover"
                        src="${video.thumbnail}"
                        alt="Shoes" />
                    </figure>
                    <div class="py-5 flex gap-3">
                        <div>
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                              <img src="${video.authors[0].profile_picture}" />
                            </div>
                          </div>
                        </div>
                          <!-- Intro -->
                          <div>
                            <h2 class="font-bold">${video.title}</h2>
                            <p class="flex items-center gap-1 mt-1 text-gray-500">${video.authors[0].profile_name} <img class="w-6" src="img/verified.png" alt=""></p>
                            <p class="text-gray-500">${video.others.views} views</p>
                          </div>
                    </div>
                  </div>
        `;
        videosContainer.appendChild(div)
  }
};



//call data
loadVideos();
loadCatergories();
