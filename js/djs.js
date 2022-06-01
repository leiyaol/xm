let hour=document.querySelector('.hour');
let minute=document.querySelector('.minute');
let second=document.querySelector('.second');
let inputTime=+new Date('2022-6-31 24:00:00');
countDown();//先调用一次 防止第一次刷新有空白
window.setInterval(countDown,1000);
function countDown(){
    let nowTime=+new Date();
    let times=(inputTime-nowTime)/1000;
    let h=parseInt(times/60/60%24);
    h=h<10 ? '0'+h:h;
    hour.innerHTML=h;
    let m=parseInt(times/60%60);
    m=m<10 ? '0'+m:m;
    minute.innerHTML=m;
    let s=parseInt(times%60);
    s=s<10 ? '0'+s:s;
    second.innerHTML=s;
}