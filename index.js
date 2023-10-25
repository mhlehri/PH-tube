const handleBtn = async () => {
  const responsive = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await responsive.json();
  const videos = data.data;
  showCategoriesBtn(videos);
};

const bar = document.getElementById("bar");
const showCategoriesBtn = (categories) => {
  categories.forEach((video) => {
    const btn = document.createElement("div");
    btn.innerHTML = `<button onclick="handleCard('${video.category_id}')" class="btn font-medium text-xs md:text-base py-2 px-5 normal-case">${video.category}</button>`;
    bar.appendChild(btn);
  });
};

const sort = () => {
  let againVideoSetion = document.getElementById("cardItem");
  let arrayInput = [];
  const arrayInputNew = againVideoSetion.childNodes.forEach((data) => {
    ru = data.childNodes[0].childNodes[3].children[2].children[0].innerText;
    su = parseFloat(ru.replace("K", 0));
    data.childNodes[0].childNodes[3].children[2].children[0]?.setAttribute(
      "data",
      su
    );
    arrayInput.push(data);
  });

  arrayInput.sort(function (a, b) {
    binput = b.childNodes[0].childNodes[3].children[2].children[0].innerText;
    bValue = parseFloat(binput);
    ainput = a.childNodes[0].childNodes[3].children[2].children[0].innerText;
    aValue = parseFloat(ainput);
    return bValue - aValue;
  });

  console.log(arrayInput);
  for (arr of arrayInput) {
    againVideoSetion.appendChild(arr);
  }
};

const handleCard = async (Id) => {
  const responsive = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${Id}`
  );
  const data = await responsive.json();
  const allVideosData = data.data;

  console.log(allVideosData);

  const videosSection = document.getElementById("cardItem");
  videosSection.innerHTML = "";

  const verifyIcon = document.createElement("img");
  verifyIcon.setAttribute("src", "./img/verify.png");

  if (allVideosData.length == 0) {
    videosSection.innerHTML = `<div class="col-span-4 text-center mt-16">
      <img class="mx-auto" src="./img/Icon.png" /> <br>
      <h2 class="text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h2>
    </div>
    `;
  }

  allVideosData.forEach((video) => {
    // console.log(video);

    const div = document.createElement("div");
    const sec = video.others.posted_date;
    const hour = Math.floor(sec / 3600);
    const min = Math.floor((sec % 3600) / 60);
    let posted_date = "";
    if (sec === "") {
      posted_date = "";
    } else {
      posted_date = `${hour} hrs ${min} min ago`;
    }

    div.innerHTML = `<div class=" card w-full shadow-xl">
        <div class="relative">
          <img src="${
            video.thumbnail
          }" class="rounded w-full h-[200px]" alt="img" />
          <p class="absolute bottom-2 right-4 py-1 px-2 text-white ${
            posted_date !== "" ? "bg-black" : " "
          } rounded-lg text-xs">${posted_date}</p>
        </div>
        <div class="card-body">

            <h1 class="text-base font-bold flex gap-4 items-center"><img class="w-[40px] h-[40px] rounded-full" src="${
              video.authors[0].profile_picture
            }"><span>${video.title}</span></h1>
              <h2 class="text-sm">${video.authors[0].profile_name} ${
      video.authors[0].verified === true
        ? "<img class='w-5 inline' src='./img/v.png'/>"
        : ""
    }</h2> 
              <h3 class="text-sm"><span>${
                video?.others.views
              }</span> <span>views</span></h3>
                  </div>

       
    </div>`;
    videosSection.appendChild(div);
  });
};

handleCard("1000");
handleBtn();
