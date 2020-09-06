(function(window){
 /**
  * @brief Notifier
  *
  * @param type 1. 一直提示 2，更新提示内容  3， 控制显示上限。超过个数删除最早的  4，超时更新
  * @param param  本参数在type为3，4时才有效， type为3表示可以最多显示通知的个数  4， 表示多少秒后删除了
  *
  * @return
  */
    function Notifier() {};


    window.Notifier = Notifier;


    type = 1;
    queue = [];
    t = 5;
    c = 3;
    _notifier = undefined ;

    if(undefined !==  window.webkitNotifications) {
      _notifier = window.webkitNotifications;

    }else if (undefined !== window.Notification)  {
      _notifier = window.Notification;
    } else {
      // console.log('error not found notification!')
    }

    window.Notifier.ModelAll = function() {
        type = 1;
    }

    window.Notifier.ModelUpdate =  function() {
        type = 2;
    }

    window.Notifier.ModelCount = function(ct) {
        if(ct !== undefined) c = ct;
        type = 3;
    }

    window.Notifier.ModelTimeout = function(timeout) {
        if(timeout !== undefined) t = timeout;
        type = 4;
    }



    window.Notifier.HasSupport = function() {
       if(undefined === _notifier) {
          return false;
       }

       return true;
    }

    window.Notifier.GetPermission = function() {
        return _notifier.checkPermission();
    }

    window.Notifier.IsGetPermission = function() {
        return (_notifier === 0);
    }

    window.Notifier.Disable = function() {
        return (_notifier.checkPermission === 2);
    }

    window.Notifier.RequestPermission = function(cb) {
      _notifier.requestPermission(function() {
            if(cb) {cb(_notifier.checkPermission() == 0)}
        });
    }



    //type = 1;关闭上一个
    window.Notifier.Close = function(type) {
        if(type = 1) {
            tmp = queue.pop();
        } else {
          tmp = queue.shift();
        }
        _closeItem(tmp);
    }

    window.Notifier.ClosePre = function () {
      tmp = queue.pop();
      _closeItem(tmp);
    }

    window.Notifier.CloseLast = function () {
      tmp = queue.shift();
      _closeItem(tmp);
    }

    window.Notifier.CloseAll = function() {
        while(queue.length > 0) {
          var tmp =  queue.shift();
          _closeItem(tmp);
        }
    }


    window.Notifier.Notify = function(icon, title, body) {
      if (this.IsGetPermission() == 0) {


        var popup = _createNotificationAndShow(icon, title, body);
        if(undefined == popup) {
          return false;
        }

        switch(type) {
          case 2:
            if(queue.length > 0) {
              tmp = queue.pop();
              _closeItem(tmp);
            }
            break;
          case 3:
            while(queue.length >= c) {
              tmp = queue.shift();
              _closeItem(tmp);
            }
            break;
          case 4:
            setTimeout(function(){_closeItem(popup);},  t*1000);
            break;
        }

        var q = queue;
        popup.onclose = function(){
            var cur = q.indexOf(popup);
            if(cur >= 0) {
                q.splice(cur, 1);
            }
        };


        popup.onclick = function(){};

        queue.push(popup);
        return true;
      } else {
		    RequestPermission();

	    }

      return false;
    }

    function _createNotificationAndShow(icon, title, body) {
      if(undefined != window.webkitNotifications && _notifier.name ===  window.webkitNotifications.name) {
        var n =  _notifier.createNotification(icon, title, body);
        n.show();
        return n;

      }else if (undefined !== window.Notification && _notifier.name ===  window.Notification.name)  {
        return  new _notifier(title, {icon:icon, body: body});
      } else {
        // console.log('error not found notification!')
        // alert(title +"\n\n"+body);
        return undefined;
      }
    }

    function _closeItem(n) {
      if(undefined == n) {
        return
      }
      if(n.cancel) {
        n.cancel();
      } else {
        n.close();
      }
    }




})(window);

'use strict';
(function(){
  const applicationServerPublicKey = 'BCYaMwiS92AJlv9Eg2YXSFwuI3ppbydkz31gOI5NS7YtOp05n7qUHEyb_iijzQcjgWqrsGSj2K18F21G9DYL4-U';
  let isSubscribed = false;
  let swRegistration = null;
  var linkUrl = ''

  function getBrowserInfo() {
    var agent = navigator.userAgent.toLowerCase();
    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
    var isIE = agent.indexOf("compatible") > -1 && agent.indexOf("msie" > -1); //判断是否IE<11浏览器
    var isEdge = agent.indexOf("edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = agent.indexOf('trident') > -1 && agent.indexOf("rv:11.0") > -1;
    if (isIE) {
      var reIE = new RegExp("msie (\\d+\\.\\d+);");
      reIE.test(agent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        return "IE/7";
      } else if (fIEVersion == 8) {
        return "IE/8";
      } else if (fIEVersion == 9) {
        return "IE/9";
      } else if (fIEVersion == 10) {
        return "IE/10";
      }
    } //isIE end
    if (isIE11) {
      return "IE/11";
    }
    //firefox
    if (agent.indexOf("firefox") > 0) {
      return agent.match(regStr_ff);
    }
    //Safari
    if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
      return agent.match(regStr_saf);
    }
    //Chrome
    if (agent.indexOf("chrome") > 0) {
      return agent.match(regStr_chrome);
    }
  }

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    var _hmt = window._hmt || [];
    var hasSub = getCookie('hasSub')
    // 判断域名的操作 如果域名是blog 和download
    var flagBox1 = window.location.host.indexOf('blog')>=0 ?'true':'false'
    var flagBox2 = window.location.host.indexOf('download')>=0 ?'true':'false'
    var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
    if (!fs) {
      console.log("check failed");
      handleRight()
    } else {
      fs(window.TEMPORARY,100,function(){
        //console.log('非隐身模式');
        handleRight()
      },function(){
        //console.log('隐身模式');
        return false
      });
    }
    navigator.serviceWorker.addEventListener('message', function (event) {
      console.log('收到sw的消息event====',event)
      if (event.data === 'showBox') {
        _hmt.push(['_trackEvent', '推送消息弹框', '消息', '', '展示推送弹框'])
      }
      if (event.data === 'openLink') {
        _hmt.push(['_trackEvent', '打开消息链接', '消息', '', '打开消息链接'])
      }
    });
  } else {
    //火狐浏览器隐身模式下 serviceWorker属性都不支持 safari不支持 可以全站推送 走此逻辑
    var flagBox1 = window.location.host.indexOf('blog')>=0 ?'true':'false'
    var flagBox2 = window.location.host.indexOf('download')>=0 ?'true':'false'
    if(flagBox1 === 'true' || flagBox2 === 'true' ){
      if ('serviceWorker' in navigator) {
        // 注册service worker
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
          return askPermission();
        }).then(function () {
          console.log('safari授权成功了====')
          var subscription = '-'
          handleAjax(subscription)
          // workOrderSync()
        })

        navigator.serviceWorker.addEventListener('message', function (event) {
          console.log('收到sw的消息event11====',event)
          if (event.data === 'showBox') {
            _hmt.push(['_trackEvent', '推送消息弹框', '消息', '', '展示推送弹框'])
          }
          if (event.data === 'openLink') {
            _hmt.push(['_trackEvent', '打开消息链接', '消息', '', '打开消息链接'])
          }
        });
      }
    }
  }
  //
  function askPermission() {
    return new Promise(function (resolve, reject) {
      var permissionResult = Notification.requestPermission(function (result) {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then(function (permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }
    });
  }
// 操作权限
  function handleRight() {
     if((hasSub!=='true'&&flagBox1 === 'true')||(hasSub!=='true'&&flagBox2 === 'true')){
    // 没有授权的操作
    // if((hasSub!=='true')||(hasSub!=='true')){
      var Notification = window.Notification || window.mozNotification || window.webkitNotification;
      navigator.serviceWorker.register('/sw.js')
        .then(function(swReg) {
          //console.log('注册成功了')
          swRegistration = swReg;
         workOrderSync(swRegistration)
          // sw注册后调用检查用户是否订阅通知的函数

          initialiseUI();
          Notification.requestPermission(function(status){
            if(status==='denied'&& getCookie('firstDie')!=='1'){
              // 隐身模式下不弹框 默认直接拒绝授权
              // && getCookie('firstDie')!=='1'
              //用户拒绝授权 再次选择 弹出授权框拒绝才能再次记录
              _hmt.push(['_trackEvent', '弹出框', '拒绝授权', '', 'rejectRightBox'])
              // console.log('执行rejectRightBox')
              setCookie('firstDie','1',1)
            } else if(status==='granted'){
              // 用户同意授权
              // 授权过的就不再进入这个里面了
              //执行了授权 只能清缓存 弹出授权框允许才能再次记录
              //debugger
              subscribeUser()
            }
          })
        })
        .catch(function(error) {
          //console.log('隐身模式下注册不成功')
          var browser = getBrowserInfo()[0] || '';
          //console.log('browser',browser)
          _hmt.push(['_trackEvent', 'serviceWorker', '报错', '', 'serviceWorker报错'])
          _hmt.push(['_trackEvent', '浏览器版本精确版本', browser, '', '真实不能注册的浏览器版本'])
          // $.get('https://statistic.csdn.net/notification/error?brower='+browser)
        });
      // 可以手动获取权限 但是否去选择弹出是不知道的
      // navigator.serviceWorker.ready.then(function(swRegistration) {
      //   console.log('workOrderSync执行了')
      //   return swRegistration.sync.register("workOrderSync");
      // });
    }else{
      navigator.serviceWorker.ready.then(function(swRegistration) {
        // //console.log('刷新走了else====进入了workSync')
        // return swRegistration.sync.register("workOrderSync");
        // var options = {
        //   body: 'heihei',
        //   icon: 'img/logo.png',
        //   badge: 'img/badge.png'
        // };
        // var title = 'haha666';
        // swRegistration.showNotification(title, options);
        workOrderSync(swRegistration)
      });
      // 注册过的和不是blog 或者 download 域名下如果接口数据有返回 的可以直接拿数据展示


    }
  }

  function workOrderSync(swRegistration) {
    var opts = {
      method:"POST",   //请求方法
      body:{},   //请求体
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include"

    }
    // setInterval(function () {
    //   // https://test-notification.csdn.net/notifiction/fe/getbyusername
    //   fetchData(opts,swRegistration)
    // }, 20000)
    fetchData(opts,swRegistration)
  }
  function fetchData(opts,swRegistration){
    // 测试环境地址 https://test-notify.csdn.net/notifiction/fe/getbyusername
    fetch("https://msg.csdn.net/v1/chrome/notification/view",opts).then(res=> {
      return res.json()
    }).then(res=> {
      //console.log('res1===',res);
      var jsonData = res.data
      //console.log('jsonData===',jsonData);
      var title = jsonData.title;
      linkUrl = jsonData.url || ''
      var username= jsonData.username || ''
      var options = {
        body: jsonData.message,
        icon: 'img/logo.png',
        badge: 'img/badge.png',
        data:linkUrl
        // actions: [{
        //   action: '',
        //   title: ''
        // }]
      };
      var browser = getBrowserInfo()[0] || '';
      console.log('浏览器信息输出browser',browser)
      if(JSON.stringify(jsonData)!=='{}'&&res.status){
        if(browser&&browser.indexOf('safari/')>-1){
          var notification = new Notification(title, options);
          console.log('走了safari逻辑里面====',notification)
          notification.addEventListener('click', function (e) {
            window.location.href = linkUrl
          });
        } else {
          swRegistration.showNotification(title, options)
        }
        _hmt.push(['_trackEvent', '展示推送消息弹框', '消息', username ])
      }
    }).catch(err=> {
      //console.log(err);
    })
  }
// 检查用户当前有没有订阅
  function initialiseUI() {
    swRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        isSubscribed = !(subscription === null);
        if (isSubscribed) {
        } else {
        }
        updateBtn();
      });
  }
// cookie
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires+";domain=csdn.net;path=/"
    // console.log(d)
  }


  //获取cookie
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while(c.charAt(0) == ' ') c = c.substring(1);
      if(c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  }
  function delCookie(name)
  {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
      document.cookie= name + "="+cval+";expires="+exp.toUTCString()+';domain=csdn.net;path=/';
  }
//启用我们的按钮，以及更改用户是否订阅的文本
  function updateBtn() {
    // 只执行一次 如何监听
    if (Notification.permission === 'denied') {
      return;
    }
    if(Notification.permission === 'default'){
      _hmt.push(['_trackEvent', '弹出框', '展示授权弹框', '', 'showRightBox'])
      //console.log('执行showRightBox')
      delCookie('firstDie')
      delCookie('hasSub')
    }
    if(Notification.permission === 'granted'){
    }
    if (isSubscribed) {
    } else {

    }
  }
  function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    // 传递公钥给sw服务器
    //debugger
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      // 默认允许订阅后发送通知
      applicationServerKey: applicationServerKey
    })
      .then(function(subscription) {
        // setCookie('firstEnter','1',1)
        handleAjax(subscription)
        _hmt.push(['_trackEvent', '弹出框', '允许授权', '', 'agreeRightBox'])
       // console.log('执行agreeRightBox2')
        isSubscribed = true
        //updateBtn()
      })
      .catch(function(err) {
        // updateBtn()
        _hmt.push(['_trackEvent', '请求接口', '失败', '', '接口报错'])
      });
  }
  function handleAjax(subscription){
    var xhr;
    if (window.XMLHttpRequest)
    {
      //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
      xhr = new XMLHttpRequest();
    }
    else
    {
      // IE6, IE5 浏览器执行代码
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
//设置请求的类型及url
    // application/x-www-form-urlencoded
    xhr.open('post', 'https://msg.csdn.net/chrome/v1/browse_info/save_browse_info' );
//发送请求
    // https://msg.csdn.net/chrome/v1/browse_info/save_browse_info
    // 变更请求地址之前： https://gw.csdn.net/cui-service/v1/browse_info/save_browse_info
    //post请求一定要添加请求头才行不然会报错 open后send前
    xhr.setRequestHeader("Content-type","application/json");
    var jsonData = ''
    if(typeof(subscription) === 'string'){
      jsonData ={'subscription':subscription}
    } else {
      jsonData ={'subscription':JSON.stringify(subscription)}
    }
    xhr.withCredentials = true;
    xhr.send(JSON.stringify(jsonData));
    xhr.onreadystatechange = function () {
      // 这步为判断服务器是否正确响应
      if (xhr.readyState == 4 && xhr.status == 200) {
        //console.log(xhr.responseText);
        setCookie('hasSub',true,1)
      }
    };
  }
}(window))
!function(i){var t,l='<svg><symbol id="sousuo" viewBox="0 0 1024 1024"><path d="M719.6779726 653.55865555l0.71080936 0.70145709 191.77828505 191.77828506c18.25658185 18.25658185 18.25658185 47.86273439 0 66.12399318-18.26593493 18.26125798-47.87208744 18.26125798-66.13334544 0l-191.77828505-191.77828506c-0.2338193-0.2338193-0.4676378-0.4676378-0.69678097-0.71081014-58.13206223 44.25257003-130.69075187 70.51978897-209.38952657 70.51978894C253.06424184 790.19776156 98.14049639 635.27869225 98.14049639 444.17380511S253.06424184 98.14049639 444.16912898 98.14049639c191.10488633 0 346.02863258 154.92374545 346.02863259 346.02863259 0 78.6987747-26.27189505 151.25746514-70.51978897 209.38952657z m-275.50884362 43.11621045c139.45428506 0 252.50573702-113.05145197 252.50573702-252.50573702s-113.05145197-252.50573702-252.50573702-252.50573783-252.50573702 113.05145197-252.50573783 252.50573783 113.05145197 252.50573702 252.50573783 252.50573702z"  ></path></symbol><symbol id="gonggong_csdnlogo_" viewBox="0 0 4096 1024"><path d="M1234.16069807 690.46341551c62.96962316 23.02318413 194.30703694 45.91141406 300.51598128 45.91141406 114.44114969 0 178.13952547-31.68724287 183.2407937-80.86454822 4.642424-44.8587714-42.21366937-50.93170978-171.44579784-81.53931916-178.57137886-43.77913792-292.49970264-111.55313011-281.32549604-219.86735976 12.9825927-125.75031047 181.27046257-220.78504823 439.49180199-220.78504822 125.88526465 0 247.93783044 8.87998544 311.17736197 29.60894839l-21.7006331 158.57116851c-41.05306337-14.27815288-198.1937175-34.11641822-304.48363435-34.11641822-107.7744129 0-163.56447339 33.90049151-167.42416309 71.06687432-4.85835069 47.04502922 51.14763648 49.23128703 191.14910897 86.50563321 189.58364043 48.09767188 272.47250144 115.81768239 261.6221849 220.81203906-12.71268432 123.51007099-164.13128096 228.53141851-466.48263918 228.53141851-125.85827383 0-234.33444849-22.96920244-294.09216204-45.93840492l19.730302-157.86940672zM3010.8325562 172.75216735c688.40130256-129.79893606 747.80813523 103.42888812 726.53935551 309.80082928l-40.08139323 381.78539207h-218.51781789l36.57258439-348.20879061c7.90831529-76.68096846 57.13960232-226.66905073-180.54170997-221.05495659-82.26807176 1.99732195-123.05122675 13.2794919-123.05122677 13.27949188s-7.15257186 92.65954408-15.81663059 161.13529804l-41.43093509 394.84895728h-214.3072473l42.53755943-389.15389062 28.09746151-302.43233073z m-869.48282929-18.05687008c49.12332368-5.34418577 124.58970448-10.76934404 228.45044598-10.76934405 173.38913812 0 313.57954648 30.17575597 400.38207891 93.63121421 77.94953781 59.16391512 129.82592689 154.95439631 115.4668015 293.74128117-13.25250106 129.15115596-80.405704 219.57046055-178.16651631 275.4954752-89.44763445 52.74009587-202.16137055 75.27744492-371.66382812 75.27744493-99.94707012 0-195.27870708-5.39816743-267.77609576-16.14052064L2141.37671774 154.69529727z m143.26736381 569.85754561c16.70732823 3.23890047 38.67786969 6.45081009 81.99816339 6.45081009 173.44311979 0 295.7386031-85.23706385 308.01943403-205.07638097 17.84094339-173.2271931-90.63523129-233.79463176-273.39018992-232.74198912-23.67096422 0-56.57279475 0-73.98188473 3.1849188l-42.6725136 428.15565036z" fill="#262626" ></path><path d="M1109.8678928 870.30336371c-41.10704503 14.25116203-126.26313639 23.96786342-245.23874671 23.96786342-342.13585224 0-526.8071603-160.59548129-504.97157302-372.90540663C385.78470347 268.40769434 659.36382925 126.08500985 958.9081404 126.08500985c116.00661824 0 184.32042718 9.33882968 248.31570215 24.99351522l-20.5400271 170.42014604c-42.56455024-14.33213455-142.32268451-27.50366309-223.07926938-27.50366311-176.25016686 0-325.94134993 52.49717834-343.10752238 218.57179958-15.30380469 148.50358623 89.7715245 219.48948804 288.04621451 219.48948804 69.0155707 0 170.77102691-9.8786464 217.81605614-24.15679928l-16.49140154 162.40386737z" fill="#CA0C16" ></path></symbol><symbol id="gonggong_csdnlogodanse_" viewBox="0 0 4096 1024"><path d="M1229.41995733 690.46341551c62.96962316 23.02318413 194.30703694 45.91141406 300.51598128 45.91141406 114.44114969 0 178.13952547-31.68724287 183.2407937-80.86454822 4.642424-44.8587714-42.21366937-50.93170978-171.44579784-81.53931916-178.57137886-43.77913792-292.49970264-111.55313011-281.32549604-219.86735976 12.9825927-125.75031047 181.27046257-220.78504823 439.49180199-220.78504822 125.88526465 0 247.93783044 8.87998544 311.17736197 29.60894839l-21.7006331 158.57116851c-41.05306337-14.27815288-198.1937175-34.11641822-304.48363435-34.11641822-107.7744129 0-163.56447339 33.90049151-167.42416309 71.06687432-4.85835069 47.04502922 51.14763648 49.23128703 191.14910897 86.50563321 189.58364043 48.09767188 272.47250144 115.81768239 261.6221849 220.81203906-12.71268432 123.51007099-164.13128096 228.53141851-466.48263918 228.53141851-125.85827383 0-234.33444849-22.96920244-294.09216204-45.93840492l19.730302-157.86940672zM3006.09181546 172.75216735c688.40130256-129.79893606 747.80813523 103.42888812 726.53935551 309.80082928l-40.08139323 381.78539207h-218.51781789l36.57258439-348.20879061c7.90831529-76.68096846 57.13960232-226.66905073-180.54170997-221.05495659-82.26807176 1.99732195-123.05122675 13.2794919-123.05122677 13.27949188s-7.15257186 92.65954408-15.81663059 161.13529804l-41.43093509 394.84895728h-214.3072473l42.53755943-389.15389062 28.09746151-302.43233073z m-869.48282929-18.05687008c49.12332368-5.34418577 124.58970448-10.76934404 228.45044598-10.76934405 173.38913812 0 313.57954648 30.17575597 400.38207891 93.63121421 77.94953781 59.16391512 129.82592689 154.95439631 115.4668015 293.74128117-13.25250106 129.15115596-80.405704 219.57046055-178.16651631 275.4954752-89.44763445 52.74009587-202.16137055 75.27744492-371.66382812 75.27744493-99.94707012 0-195.27870708-5.39816743-267.77609576-16.14052064L2136.635977 154.69529727z m143.26736381 569.85754561c16.70732823 3.23890047 38.67786969 6.45081009 81.99816339 6.45081009 173.44311979 0 295.7386031-85.23706385 308.01943403-205.07638097 17.84094339-173.2271931-90.63523129-233.79463176-273.39018992-232.74198912-23.67096422 0-56.57279475 0-73.98188473 3.1849188l-42.6725136 428.15565036z m-1174.74919792 145.75052083c-41.10704503 14.25116203-126.26313639 23.96786342-245.23874671 23.96786342-342.13585224 0-526.8071603-160.59548129-504.97157303-372.90540663C381.04396273 268.40769434 654.62308851 126.08500985 954.16739966 126.08500985c116.00661824 0 184.32042718 9.33882968 248.31570215 24.99351522l-20.5400271 170.42014604c-42.56455024-14.33213455-142.32268451-27.50366309-223.07926938-27.50366311-176.25016686 0-325.94134993 52.49717834-343.10752238 218.57179958-15.30380469 148.50358623 89.7715245 219.48948804 288.04621451 219.48948804 69.0155707 0 170.77102691-9.8786464 217.81605614-24.15679928l-16.49140154 162.40386737z"  ></path></symbol><symbol id="xieboke1" viewBox="0 0 1024 1024"><path d="M204.70021457 751.89799169h657.99199211a33.6932867 33.6932867 0 0 1 0 67.33536736H163.68452703a33.53966977 33.53966977 0 0 1-18.74125054-5.68382181c-18.63883902-9.4218307-18.17798882-29.44322156-15.20806401-39.17228615C199.0675982 570.27171976 309.41567149 409.58853908 435.38145354 290.12586836A243.22661203 243.22661203 0 0 1 536.97336934 234.20935065c138.10150976-33.79569759 228.3257813-29.95527721 318.60125827-28.52152054-17.15387692 20.48224105-36.20236071 41.6301547-57.29906892 62.93168529-3.1747472 3.22595323-164.67721739 19.91897936-187.97576692 47.05794871-23.29854894 27.13896932 129.60138005 7.37360691 125.19769798 11.11161576-21.6599699 18.33160576-44.90731339 36.4071831-69.94685287 53.8682939-4.50609297 3.1747472-149.52035944-0.35843931-174.61110436 27.85584737-25.19315641 28.16308124 101.89914903 18.12678338 96.0617103 21.40394206-67.43777825 37.63611797-125.96578207 64.62147036-212.70807253 93.8086635-57.65750823 19.4069231-121.8181284 133.13456658-146.5504346 179.06599187a435.75967738 435.75967738 0 0 0-23.04252112 49.10617311z" fill="#CA0C16" ></path></symbol><symbol id="gitchat" viewBox="0 0 1024 1024"><path d="M892.08971773 729.08552746h-108.597062v-162.89559374H403.40293801v-108.59706198h488.68677972v271.49265572z m-651.58237345 54.298531V783.49265572h488.68678045v108.59706201H131.91028227V131.91028227h760.17943546v217.19412473h-108.597062V240.50734428H240.50734428v542.87671418z m542.98531145 0h108.597062v108.59706199h-108.597062v-108.59706199z" fill="#FF9100" ></path></symbol><symbol id="toolbar-memberhead" viewBox="0 0 1303 1024"><path d="M1061.51168438 433.79527648A78.51879902 78.51879902 0 1 1 1129.35192643 472.74060007h-1.80593246l-48.05350474 403.97922198c-4.55409058 38.16013652-39.41643684 67.133573-80.79584389 67.13357302H319.35199503c-41.30088817 0-76.00619753-28.81639958-80.717325-66.97653526L189.01078861 472.74060007H187.12633728a78.51879902 78.51879902 0 1 1 67.76172401-38.86680556l193.31328323 119.81968805 158.13686148-336.06046024A78.5973179 78.5973179 0 0 1 658.23913228 80.14660493a78.51879902 78.51879902 0 0 1 51.58685077 137.721974l158.13686147 335.82490362 193.54883986-119.89820607z" fill="#FDD840" ></path><path d="M1050.8331274 394.22180104a78.51879902 78.51879902 0 1 1 78.51879903 78.51879903h-1.80593246l-48.05350474 403.97922198c-4.55409058 38.16013652-39.41643684 67.133573-80.79584389 67.13357302H659.02432018C658.47468805 793.25433807 658.23913228 505.32590231 658.23913228 80.14660493a78.51879902 78.51879902 0 0 1 51.58685077 137.721974l158.13686147 335.82490362 193.54883986-119.89820607A78.51879902 78.51879902 0 0 1 1050.8331274 394.22180104z" fill="#FFBE00" ></path></symbol><symbol id="toolbar-m-memberhead" viewBox="0 0 1303 1024"><path d="M1062.74839935 433.79527648A78.51879902 78.51879902 0 1 1 1130.58864141 472.74060007h-1.80593246l-48.05350474 403.97922198c-4.55409058 38.16013652-39.41643685 67.133573-80.79584389 67.13357302H320.58871c-41.30088817 0-76.00619753-28.81639958-80.71732499-66.97653526L190.24750358 472.74060007H188.36305226a78.51879902 78.51879902 0 1 1 67.761724-38.86680556l193.31328324 119.81968805 158.13686147-336.06046024A78.5973179 78.5973179 0 0 1 659.47584726 80.14660493a78.51879902 78.51879902 0 0 1 51.58685076 137.721974l158.13686148 335.82490362 193.54883985-119.89820607z" fill="#D6D6D6" ></path><path d="M1052.06984238 394.22180104a78.51879902 78.51879902 0 1 1 78.51879903 78.51879903h-1.80593246l-48.05350474 403.97922198c-4.55409058 38.16013652-39.41643685 67.133573-80.79584389 67.13357302H660.26103515C659.71140302 793.25433807 659.47584726 505.32590231 659.47584726 80.14660493a78.51879902 78.51879902 0 0 1 51.58685076 137.721974l158.13686148 335.82490362 193.54883985-119.89820607A78.51879902 78.51879902 0 0 1 1052.06984238 394.22180104z" fill="#C1C1C1" ></path></symbol><symbol id="csdnc-upload" viewBox="0 0 1024 1024"><path d="M216.37466416 723.16095396v84.46438188h591.25067168v-84.46438188c0-23.32483876 18.90735218-42.23219094 42.23219093-42.23219021s42.23219094 18.90735218 42.23219096 42.23219021v84.46438188c0 46.64967827-37.81470362 84.46438188-84.46438189 84.46438189H216.37466416c-46.64967827 0-84.46438188-37.81470362-84.46438189-84.4643819v-84.46438187c0-23.32483876 18.90735218-42.23219094 42.23219096-42.23219021s42.23219094 18.90735218 42.23219094 42.23219021zM469.76780906 275.55040991L246.55378774 499.53305726a42.30820888 42.30820888 0 0 1-59.99082735 0c-16.56346508-16.62259056-16.56346508-43.57095155 0-60.19354139L480.51167818 144.38144832A42.21952103 42.21952103 0 0 1 512 131.93984464a42.20262858 42.20262858 0 0 1 31.48409853 12.44160369l293.95294108 294.95806754c16.56346508 16.62259056 16.56346508 43.57095155 0 60.19354139a42.30820888 42.30820888 0 0 1-59.99082735 0L554.23219094 275.55040991V680.92876375c0 23.32483876-18.90735218 42.23219094-42.23219094 42.23219021s-42.23219094-18.90735218-42.23219094-42.23219021V275.55040991z"  ></path></symbol></svg>',e=(t=document.getElementsByTagName("script"))[t.length-1].getAttribute("data-injectcss");if(e&&!i.__iconfont__svg__cssinject__){i.__iconfont__svg__cssinject__=!0;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(t){console&&console.log(t)}}!function(t){if(document.addEventListener)if(~["complete","loaded","interactive"].indexOf(document.readyState))setTimeout(t,0);else{var e=function(){document.removeEventListener("DOMContentLoaded",e,!1),t()};document.addEventListener("DOMContentLoaded",e,!1)}else document.attachEvent&&(o=t,c=i.document,n=!1,(a=function(){try{c.documentElement.doScroll("left")}catch(t){return void setTimeout(a,50)}l()})(),c.onreadystatechange=function(){"complete"==c.readyState&&(c.onreadystatechange=null,l())});function l(){n||(n=!0,o())}var o,c,n,a}(function(){var t,e;(t=document.createElement("div")).innerHTML=l,l=null,(e=t.getElementsByTagName("svg")[0])&&(e.setAttribute("aria-hidden","true"),e.style.position="absolute",e.style.width=0,e.style.height=0,e.style.overflow="hidden",function(t,e){e.firstChild?function(t,e){e.parentNode.insertBefore(t,e)}(t,e.firstChild):e.appendChild(t)}(e,document.body))})}(window);