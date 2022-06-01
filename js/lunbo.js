// 1 获取节点对象
let ulLisObj = document.querySelectorAll('.grid-col2-t ul li');
let olLisObj = document.querySelectorAll('.grid-col2-t ol li');
//console.log(olLisObj);
let left = document.querySelector('.arrow-l');
//console.log(left);
let right = document.querySelector('.arrow-r');

let lastIndex = 0;

let index = 0;
olLisObj.forEach((li, key) => {
  // console.log(li);
  li.onclick = function () {
    lastIndex = index;
    index = key;
    change();
  }
});
// 实现右边按钮
right.onclick = function () {
  // console.log(111);
  lastIndex = index;
  index++;
  // 判断索引是否超过最大值
  if (index > ulLisObj.length - 1) {
    index = 0;
  }
  change();
}

// 实现左边按钮,上一张
left.onclick = function () {
  lastIndex = index;
  index--;
  // 判断超过最小索引,则直接赋值最大索引
  if (index < 0) {
    index = ulLisObj.length - 1;
  }
  change();
}

let times = '';
function autoPlay() {
  times = setInterval(function () {
    right.onclick();
  }, 3000)
}
autoPlay();

right.parentNode.onmouseover = function () {
  clearInterval(times)
}
right.parentNode.onmouseout = function () {
  autoPlay();
}
function change() {

  ulLisObj[lastIndex].className = '';
  olLisObj[lastIndex].className = '';

  ulLisObj[index].className = 'ac';
  olLisObj[index].className = 'ac';
}