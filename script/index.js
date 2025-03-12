//loading spinner
const showLoader =() =>{
  document.getElementById('loading-spinner').classList.remove('hidden');
  document.getElementById('videos-container').classList.add('hidden');
}
const hideLoader =() =>{
  document.getElementById('loading-spinner').classList.add('hidden');
  document.getElementById('videos-container').classList.remove('hidden');
}

const removeActive = ()=>{
  const activebtns = document.querySelectorAll('.active');
  activebtns.forEach(btn =>{
    btn.classList.remove('active')
  })
}

const hideModal =() => {
  document.getElementById('video_details').close();
}
/**
 * Load Data
 */
const loadCatergories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
const loadVideos = (searchText ='') => {
  showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        removeActive();
        document.getElementById('btn-all').classList.add('active')
        displayVideos(data.videos);
      });
  };

const loadCategoryVideo = (id) =>{
  showLoader()
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    removeActive();
    const clickedBtn = document.getElementById(`btn-${id}`);
      clickedBtn.classList.add('active')
    displayVideos(data.category);  
  })
}

const loadVideoDetails =(videoId)=>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
  .then(res => res.json())
  .then(data => showVideoDetails(data.video))
}

const showVideoDetails =(video) =>{
  console.log(video);
  document.getElementById('video_details').showModal();
  document.getElementById('video_details').innerHTML=`
  <div class="bg-transparent modal-box flex items-center rounded-lg p-4">

        <div class="w-full card image-full">
            <figure>
              <img
                src="${video.thumbnail}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
                <div>
                    <h2 class="font-bold text-xl">${video.title}</h2>
                    <p class="mt-2 text-gray-300">${video.description}</p>
                    <div class="flex gap-3 items-center mt-3">
                    <div>
                    <div class="avatar">
                        
                        <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                      </div>
                      <div>
                      <p class="flex items-center gap-1 mt-1">${video.authors[0].profile_name}
                    ${video.authors[0].verified===true?`<img class="w-6" src="img/verified.png" alt="">`:``}
                    </p>
                                               
                    <p class="text-gray-500">${video.others.views} views</p></div>
                    
                </div> 

                    <div class="modal-action">
                        <form method="dialog">
                          <!-- if there is a button in form, it will close the modal -->
                          <button class="btn btn-block">Close</button>
                        </form>
                      </div>
                  </div>
              
              
            </div>
          </div>

    
  </div>
  `;
  
}

/**
 * Display Data 
 * */

//Display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  
  categories.forEach((cat) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideo(${cat.category_id})" class="btn btn-md px-4 bg-[#25252520] hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
    categoriesContainer.appendChild(div);
    
  });

};


//Display videos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML=``;
  if(videos.length ===0){
    videosContainer.innerHTML=`
    <div class="flex items-center justify-center flex-col gap-2 py-15 text-center col-span-full">
                
    <img class="w-30" src="img/Icon.png" alt="">
    <h2 class="font-bold text-3xl">Oops!! Sorry, There is no<br> content here</h2>
    </div>
    `;  
    hideLoader()  
    return;
  }
  
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card bg-base-100">
                    <figure class="relative">
                      <img class="w-full h-42 object-cover"
                        src="${video.thumbnail}"
                        alt="Shoes" />
                        <span class="absolute bg-black text-white px-2 text-sm rounded right-4 bottom-4">3hrs 56 min ago</span>
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
                            <p class="flex items-center gap-1 mt-1 text-gray-500">${video.authors[0].profile_name}
                            ${video.authors[0].verified===true?`<img class="w-6" src="img/verified.png" alt="">`:``}
                            </p>
                                                       
                            <p class="text-gray-500">${video.others.views} views</p>
                            
                          </div>
                          </div>

                          <button onclick=loadVideoDetails("${video.video_id}") id="showModalBtn" class="btn btn-block">See Details</button>
                  </div>
        `;
        
        videosContainer.appendChild(div)
        hideLoader();        
  }
};


//search input
document.getElementById('searchInput').addEventListener('keyup',(e)=>{
  loadVideos(e.target.value)
})

loadCatergories();
