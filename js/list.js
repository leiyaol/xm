class List {
    constructor() {
      this.getData();
      this.bindEve();
      // 默认页码
      this.currentPage = 1;
      // 使用锁
      this.lock = false;
    }
    // 绑定事件的方法
    bindEve() {
      // 给 ul 绑定点击事件
      // this.addCart 是ul的事件回调方法,故内部this默认指向当前节点
      this.$('.sk_bd ul').addEventListener('click', this.checkLogin.bind(this));
      // 滚动条事件
      window.addEventListener('scroll', this.lazyLoader)
    }
  
    /*****获取数据****/
    async getData(page = 1) {
  
  
      // console.log(222);
      //发送ajax请求获取数据
      let { status, data } = await axios.get('http://localhost:8888/goods/list?current=' + page);
      console.log(data);
      // console.log(status, data);
  
      // 判断请求的状态是否成功
      if (status != 200 && data.code != 1) throw new Error('获取数据失败...');
  
      // 循环渲染数据,追加到页面中
  
      let html = '';
      data.list.forEach(goods => {
        // console.log(goods);
        html += `<li class="sk_goods" data-id="${goods.goods_id}">
        <a href="#none">
            <img src="${goods.img_big_logo}" alt="">
        </a>
        <h5 class="sk_goods_title">${goods.title}</h5>
        <p class="sk_goods_price">
            <em>¥${goods.current_price}</em>
            <del>￥${goods.price}</del>
        </p>
        <div class="sk_goods_progress">
            已售
            <i>${goods.sale_type}</i>
            <div class="bar">
                <div class="bar_in"></div>
            </div>
            剩余
            <em>29</em>件
        </div>
        <a href="#none" class="sk_goods_buy">立即抢购</a>
    </li>`;
      });
  
      this.$('.sk_bd ul').innerHTML += html;
  
    }
    /********加入购物车*******/
    checkLogin(eve) {
      // console.log(eve.target.classList);
      if (eve.target.nodeName != 'A' || eve.target.className != 'sk_goods_buy') return;
  
      // console.log(eve.target);
  
      let token = localStorage.getItem('token');
      // console.log(token);

      if (!token) location.assign('./login.html?ReturnUrl=./list.html')
  
      // 获取商品id和用户id
      let goodsId = eve.target.parentNode.dataset.id;
      // console.log(goodsId);
      let userId = localStorage.getItem('user_id');
  
      this.addCartGoods(goodsId, userId);
    }
    addCartGoods(gId, uId) {
      // console.log(gId, uId);

      const AUTH_TOKEN = localStorage.getItem('token')
      axios.defaults.headers.common['authorization'] = AUTH_TOKEN;


      axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      // axios.defaults.headers.Content-Type='application/x-www-form-urlencoded'
      let param = `id=${uId}&goodsId=${gId}`;
      axios.post('http://localhost:8888/cart/add', param).then(({ data, status }) => {
        // console.log(data, status);
        // 判断 添加购物车是否成功
        if (status == 200 && data.code == 1) {
          layer.open({
            title: '商品添加成功'
            , content: '是否进购物车看看?'
            , btn: ['留下', '去吧']
            , btn2: function (index, layero) {
              // console.log('去购物车了...');
              location.assign('./cart.html')
  
            }
          });
        } else if (status == 200 && data.code == 401) {  // 如果登录过期,则重新登录
          // 清除 local中存的token和userid
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          // 跳转到登录页面
          location.assign('./login.html?ReturnUrl=./list.html')
        } else {
          layer.open({
            title: '失败提示框'
            , content: '没有成功'
            , time: 3000
          }
          );
        }
  
  
      })
  
    }
    /******懒加载**** */
  
    lazyLoader = () => {
      // 需要滚动条高度,可视区高度,实际内容高度
      let top = document.documentElement.scrollTop;
      // console.log(top, 't');
      let cliH = document.documentElement.clientHeight;
      // console.log(cliH, 'c');
      let conH = this.$('.sk_container').offsetHeight;
      // console.log(conH);
      // 但滚动条高度+可视区的高度> 实际内容高度时,就加载新数据
      if (top + cliH > (conH + 450)) {
        // 一瞬间就满足条件,会不停的触发数据加载,使用节流和防抖
  
        // 如果是锁着的,就结束代码执行
        if (this.lock) return;
        this.lock = true;
        // 指定时间开锁,才能进行下次数据清除
        setTimeout(() => {
          this.lock = false;
        }, 1000)
        // console.log(1111);
        this.getData(++this.currentPage)
      }  
    }
  
    // 封装获取节点的方法
    $(ele) {
      let res = document.querySelectorAll(ele);
      // 如果获取到的是,当个节点集合,就返回单个节点,如果是多个节点集合,就返回整个集合.
      return res.length == 1 ? res[0] : res;
    }
  }
  
  new List;