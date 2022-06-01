    //获取元素
    let box = document.querySelector('#box');
    let small = document.querySelector('#small');
    let mask = document.querySelector('#mask');
    let big = document.querySelector('#big');
    let img = document.querySelector('#img');
    
    //需求:
        //鼠标移入到small中mask和big展示
        small.onmouseenter = function(){
            mask.style.display = 'block';
            big.style.display = 'block';
        }
        //鼠标移出small,mask和big隐藏
        small.onmouseleave = function(){
            mask.style.display = 'none';
            big.style.display = 'none';
        }

            //small注册鼠标移动事件
            small.onmousemove = function(e){
            //在事件处理函数中,获取到鼠标在可视区的坐标
              let x = e.clientX;
              let y = e.clientY;
            //在事件处理函数中,获取相对于body的左,上偏移量
              let offLeft = box.offsetLeft;
              let offTop = box.offsetTop;
            //计算鼠标在small里面的坐标  可视区坐标 - box的偏移量
              let targetX = x - offLeft;
              let targetY = y - offTop;

            //让鼠标到mask中间(其实是mask在鼠标坐标的基础上,往左,往上,自己宽高的一半)
              targetX -= mask.offsetWidth/2;
              targetY -= mask.offsetHeight/2;
              
                //获取最大,最小距离
                let maxX = small.offsetWidth - mask.offsetWidth //small的宽 - mask的宽
                let maxY = small.offsetHeight - mask.offsetHeight //small的宽 - mask的宽
                //判断有没有超出最大/最小距离
                targetX = targetX < 0 ? 0 : targetX;
                targetX = targetX > maxX ? maxX : targetX;
                targetY = targetY < 0 ? 0 : targetY;
                targetY = targetY > maxY ? maxY : targetY;

                mask.style.left = targetX + 'px';
                mask.style.top = targetY + 'px';
              

                let imgMaxX = img.offsetWidth - big.offsetWidth;
                let imgMaxY = img.offsetHeight - big.offsetHeight;

                let imgX = targetX / maxX * imgMaxX;
                let imgY = targetY/ maxY * imgMaxY;

                img.style.left = -imgX + 'px';
                img.style.top = -imgY + 'px';              
          }