const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', ()=>{
  searchInputEl.focus();
});
searchInputEl.addEventListener('focus', ()=>{
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});
searchInputEl.addEventListener('blur', ()=>{
  searchEl.classList.remove('focused');
  searchInputEl.removeAttribute('placeholder');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector("#to-top");
// loadash에서 제공하는 기능을 사용하여 스크롤 함수에 딜레이를 줌
// ._throttle(함수, 시간);
// gsap에서 제공하는 기능을 사용하여 스크롤시 에니메이션 추가
// gasp.to(요소, 지속시간, 옵션(객체));
window.addEventListener('scroll', _.throttle(()=>{
  if(window.scrollY>500){
    //배지 숨기기
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none',
    });
    //버튼 보이기
    gsap.to(toTopEl, .2,{
      x: -100
    });
  } else{
    //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block',
    });
    //버튼 숨기기
    gsap.to(toTopEl, .2,{
      x: 0
    });
  }
}, 200));

toTopEl.addEventListener('click', ()=>{
  gsap.to(window, .6, {   //화면자체인 window객체를 넘김
    scrollTo: 0   //이 옵션을 쓰기 위해 gsap의 scrollToPlugin을 추가로 가져온 것
  })   
});

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach((fadeEl, index)=>{
  // gasp.to(요소, 지속시간, 옵션(객체));
  gsap.to(fadeEl, 1, {
    opacity: 1,
    delay: .7 * (index+1),
  });
})

//슬라이드를 만들기위해 swiper이용
new Swiper('.notice-line .swiper-container', {
   direction: "vertical",
   autoplay: true,
   loop:true
});
new Swiper(".promotion .swiper-container", {
  slidesPerView:3,      //한번에 보여줄 슬라이드 개수
  spaceBetween:10,      //슬라이드 사이 여백
  centeredSlides:true,  //1번 슬라이드가 가운데 보이기
  autoplay: {
    delay: 5000,   //ms 단위 5000=5초
  },
  loop:true,
  pagination: {
    el: ".promotion .swiper-pagination",   //페이지 번호 요소 선택자
    clickable:true    //사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: ".promotion .swiper-prev",
    nextEl: ".promotion .swiper-next"
  }
});
new Swiper('.awards .swiper-container', {
  loop: true,
  autoplay:true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation:{
    prevEl: ".awards .swiper-prev",
    nextEl: ".awards .swiper-next"
  }
});


const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', ()=>{
  isHidePromotion = !isHidePromotion;
  if(isHidePromotion){
    promotionEl.classList.add('hide');  //숨김처리
  } else{
    promotionEl.classList.remove('hide'); //보임처리
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size){
  //gsap.to(요소, 동작시간, 옵션);
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    repeat: -1, //-1은 무한
    yoyo: true, //yoyo로 다시 거꾸로 돌아오도록
    ease: Power1.easeInOut,   //gsap easing검색
    delay: random(0, delay)
  })
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach(spyEl => {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl,   // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8   // viewport가 시작하는 가장 윗부분이 0이고 가장 아래부분이 1. 0.8지점에 triggerHook을 걺 ->밑의 setClassToggle 메소드를 실행시킴
    })
    .setClassToggle(spyEl, 'show')    // (클래스를 토글할 요소, 넣었다 뺐다(토글)할 클래스이름)
    .addTo(new ScrollMagic.Controller());   //ScrollMagic에서 우리가 추가한 옵션들을 내부의 컨트롤러에 내용을 할당해서 실제로 동작할 수 있는 구조를 만들어 주는 용도
});

const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear();