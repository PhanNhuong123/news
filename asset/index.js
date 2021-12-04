$(document).ready(function () {
  var postAPI = "https://gnews.io/api/v4/top-headlines?&";
  tokenAPI = "&token=f49ff9affe9696914834e64dc9cd0274";
  postAPI += tokenAPI;
  getAPI(postAPI);

  function getAPI(API) {
    $("#body_post").html();
    $(".modal__load").css("display", "flex");
    fetch(API)
      .then(function (response) {
        return response.json();
      })
      .then(postHtml)
      .catch("Có biến đại vương ơi");
  }

  function postHtml(posts) {
    $(".modal__load").css("display", "none");
    if (posts.totalArticles == 0) {
      $("#body__post").html(
        `<p><b>Not found from the key"${keywords}" :((</b></p>`
      );
    } else {
      var htmls = posts.articles.map(function (post) {
        $(".modal__load").css("display", "none");
        return `
                          <div class="post">
                           <div class="post__img col-4">
                               <img src="${post.image}" alt="image">
                           </div>
                           <div class="post__content col-8">
                               <a href="${post.url}" target="_blank" class="post__link">
                             <h2 class="post__title">${post.title}</h2>
      
                             </a>
                               <em class="post__time">${post.publishedAt}</em>
                                <p class="post__content">${post.content}</p>
                         </div>
                      </div>
                         `;
      });
      $("#body__post").html(htmls);
    }
  }

  $(".icon__search").click(function () {
    $(".seacrh__modal").toggle();
    $(".seacrh__modal").css("display", "flex");
  });
  $(".btn__close").click(function () {
    $(".seacrh__modal").fadeOut();
  });
  // search
  var ApiSearch = "";
  $(".btn__search").click(function () {
    $(".seacrh__modal").fadeOut();
    getKeySearch();
    getAPI(ApiSearch);
  });
  var ApiSearch = "";
  keywords = "";

  function getKeySearch() {
    keywords = $(".input__search").val();
    nonApiSearch = "https://gnews.io/api/v4/search?q=";
    if (keywords == "") {
      nonApiSearch += "hello";
    }
    ApiSearch = nonApiSearch + keywords +  getSearchSelection() + getPeriod() + tokenAPI;
  } 
  //hide and  show period
  $(".Period__title").click(function () {
    $(".Period_content").slideToggle();
  });
  //hihe and show  Language
  $(".language__title").click(function(){
      $(".language__content").slideToggle();
  })
  // selection search
  function getSearchSelection() {
    var SearchSelection = "";
    var checksSort = $(".btn_sortby");
    checksLang = document.getElementsByName("language_ra");
    for (checkLang of checksLang) {
      if (checkLang.checked === true) {
        SearchSelection += checkLang.value;
      }
    }
    for (checkSort of checksSort) {
      if (checkSort.checked === true) {
        SearchSelection += checkSort.value;
      }
    }

    return SearchSelection;
  }

  //get Period
 function getPeriod(){
    var year = new Date().getFullYear();
    period =""
    nonPeriod=""
    from__Period = $(".period_from");
    to__Period = $(".Period__to");
    fromApi = getTrueFr(from__Period)
    toApi =   getTrueT(to__Period)
    function getTrueFr(lists){
        let i = 0
        for( list of lists){
            if (list.value == ""){ i += 1 };console.log(i)
        }
        if ( i !== 3){
            if ( lists[0].value == ""){ lists[0].value =  year } 
            if ( lists[1].value == ""){ lists[1].value = "01"} 
            if ( lists[2].value == ""){ lists[2].value = "01"} 
            return  nonPeriod =  "&from=" + lists[0].value + "-" + lists[1].value + "-" + lists[2].value + "T" + "00:00:00Z";
        } else {
            return "";
        }
    };
     function getTrueT(lists){
        let i = 0
        for( list of lists){
            if (list.value == ""){ i += 1 };console.log(i)
        }
        if ( i !== 3){
            if ( lists[0].value == ""){ lists[0].value =  year } 
            if ( lists[1].value == ""){ lists[1].value = "01"} 
            if ( lists[2].value == ""){ lists[2].value = "01"} 
            return  nonPeriod =  "&to=" + lists[0].value + "-" + lists[1].value + "-" + lists[2].value + "T" + "00:00:00Z";
        } else {
            return "";
        }
    };
   return fromApi + toApi
 }
 
 
});
