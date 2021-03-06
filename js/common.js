// Header 검색 부분
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

// Footer 날짜 입력
const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear();