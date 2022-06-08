// dropdown menu animation
$(document).ready(function () {
  $(".dropdown").click(function () {
    $(this).find(".dropdown-child").slideToggle("fast");
  });
});
$(document).on("click", function (event) {
  var $trigger = $(".dropdown");
  if ($trigger !== event.target && !$trigger.has(event.target).length) {
    $(".dropdown-child").slideUp("fast");
  }
});

// header animation
const header = document.querySelector(".header");

window.onscroll = () => {
  if (window.scrollY > 50) {
    header.classList.add("header-active");
  } else {
    header.classList.remove("header-active");
  }
};

// scroll full page animation
$(document).scroll(function () {
  howdiv = document.getElementById("how");
  randomdiv = document.getElementById("random");
  const myScrollFunc = function () {
    const y = window.scrollY;
    if (y >= 700) {
      howdiv.className = "how show";
    }
    if (y >= 1400) {
      randomdiv.className = "latest show";
    }
  };
  window.addEventListener("scroll", myScrollFunc);
});

$(document).ready(function () {
  $("button").click(function () {
    $(".content").slideUp(500).delay(5000).slideDown(500);
  });
});

// Tabs animation in the book page
(function ($, document) {
  // get tallest tab__content element
  let height = -1;

  $(".tab__content").each(function () {
    height = height > $(this).outerHeight() ? height : $(this).outerHeight();
    $(this).css("position", "absolute");
  });

  // set height of tabs + top offset
  $("[data-tabs]").css("min-height", height + 40 + "px");
})(jQuery, document);

// Caroussel animation in the book page
const gap = 16;

const carousel = document.getElementById("carousel"),
  content = document.getElementById("content"),
  next = document.getElementById("next"),
  prev = document.getElementById("prev");

next.addEventListener("click", (e) => {
  carousel.scrollBy(width + gap, 0);
  if (carousel.scrollWidth !== 0) {
    prev.style.display = "flex";
  }
  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "none";
  }
});
prev.addEventListener("click", (e) => {
  carousel.scrollBy(-(width + gap), 0);
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.display = "none";
  }
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "flex";
  }
});

let width = carousel.offsetWidth;
window.addEventListener("resize", (e) => (width = carousel.offsetWidth));

// pagination system
var obj = [
  { number: "Number 1" },
  { number: "Number 2" },
  { number: "Number 3" },
  { number: "Number 4" },
  { number: "Number 5" },
  { number: "Number 6" },
  { number: "Number 7" },
  { number: "Number 8" },
  { number: "Number 9" },
  { number: "Number 10" },
  { number: "Number 11" },
  { number: "Number 12" },
  { number: "Number 13" },
  { number: "Number 14" },
  { number: "Number 15" },
];
var current_page = 1;
var obj_per_page = 3;
function totNumPages() {
  return Math.ceil(obj.length / obj_per_page);
}

function prevPage() {
  if (current_page > 1) {
    current_page--;
    change(current_page);
  }
}
function nextPage() {
  if (current_page < totNumPages()) {
    current_page++;
    change(current_page);
  }
}
function change(page) {
  var btn_next = document.getElementById("btn_next");
  var btn_prev = document.getElementById("btn_prev");
  var listing_table = document.getElementById("TableList");
  var page_span = document.getElementById("page");
  if (page < 1) page = 1;
  if (page > totNumPages()) page = totNumPages();
  listing_table.innerHTML = "";
  for (var i = (page - 1) * obj_per_page; i < page * obj_per_page; i++) {
    listing_table.innerHTML += obj[i].number + "<br>";
  }
  page_span.innerHTML = page;
  if (page == 1) {
    btn_prev.style.visibility = "hidden";
  } else {
    btn_prev.style.visibility = "visible";
  }
  if (page == totNumPages()) {
    btn_next.style.visibility = "hidden";
  } else {
    btn_next.style.visibility = "visible";
  }
}
window.onload = function () {
  change(1);
};
