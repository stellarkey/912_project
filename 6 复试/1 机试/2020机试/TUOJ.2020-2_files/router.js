angular.module('tuoj-web', [
    'ui.router',
    'oc.lazyLoad',
    'ae-datetimepicker',
    'ngSanitize'
]).factory('eventInterceptor',
  ['$q', '$rootScope',  function ($q, $rootScope) {
    var interceptor = {
      'request': function (config) {
        //成功的请求方法
        return config;
      },
      'response': function (response) {
        //响应成功
        $rootScope.servertime = response.headers("TIME");
        $rootScope.todos = atob(response.headers("JOB"))
        //console.log($q);
        return response;
      },
      'requestError': function (rejection) {
        //请求发生了错误，如果能从错误中恢复，可以返回一个请求或promise。
        return response;
        //或者，可以通过返回一个rejection来阻止下一步
        //return $q.reject(rejection);
      },
      'responseError': function (rejection) {
        //请求发生了错误，如果能从错误中恢复，可以返回一个请求或promise。
        return response;
        //或者，可以通过返回一个rejection来阻止下一步
        //return $q.reject(rejection);
      }
    };
    return interceptor;
  }]
).run(
  [
    '$rootScope',
    '$state',
    '$stateParams',
    function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]
).config(
  [
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
      $httpProvider.interceptors.push('eventInterceptor');
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('home', {
        url: '/',
        templateUrl: '/modules/home/home.html',
        controller: homeCtrl,
        resolve: {
          onLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'marked',
              files: ['/node_modules/marked/lib/marked.js']
            }]);
          }]
        }
      }).state('contestlist', {
        url: '/contestlist',
        controller: contestListCtrl,
        templateUrl: '/modules/contestlist/list.html',
        abstract: true
      }).state('contestlist.my', {
        url: '/my',
        templateUrl: '/modules/contestlist/list.html',
        controller: contestListCtrl,
      }).state('contestlist.register', {
        url: '/register',
        templateUrl: '/modules/contestlist/list.html',
        controller: contestListCtrl,
      }).state('contest', {
        url: '/contest/:contestId',
        templateUrl: '/modules/contest/nav.html',
        controller: contestNavCtrl,
        abstract: true
      }).state('contest.home', {
        url: '/home',
        templateUrl: '/modules/contest/home.html',
        controller: contestHomeCtrl
      }).state('contest.custest', {
        url: '/custest',
        templateUrl: '/modules/contest/custest.html',
        controller: contestCustestCtrl
      }).state('contest.problem', {
        url: '/problem/:problemId',
        templateUrl: '/modules/contest/problem.html',
        controller: contestProblemCtrl,
        resolve: {
          onLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'MathJax',
              files: ['/node_modules/mathjax/MathJax.js?config=default']
            }, {
              name: 'marked',
              files: ['/node_modules/marked/lib/marked.js']
            }, {
              name: 'highlightjs',
              files: ['/node_modules/highlightjs/highlight.pack.min.js']
            }]);
          }]
        }
      }).state('contest.status', {
        url: '/status',
        templateUrl: '/modules/contest/status.html',
        controller: contestStatusCtrl,
      }).state('contest.acmrank', {
        url: '/acmrank',
        templateUrl: '/modules/contest/acmrank.html',
        controller: contestAcmrankCtrl,
      }).state('contest.codeplusrank', {
        url: '/codeplusrank',
        templateUrl: '/modules/contest/codeplusrank.html',
        controller: contestCodeplusCtrl,
      }).state('contest.balloon', {
        url: '/balloon',
        templateUrl: '/modules/contest/balloon.html',
        controller: contestBalloonCtrl,
      }).state('contest.ranklist', {
        url: '/ranklist',
        templateUrl: '/modules/contest/ranklist.html',
        controller: contestRanklistCtrl,
      }).state('contest.detail', {
        url: '/detail/:runId',
        templateUrl: '/modules/contest/detail.html',
        controller: contestDetailCtrl,
        resolve: {
          onLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'highlightjs',
              files: ['/node_modules/highlightjs/highlight.pack.min.js']
            }]);
          }]
        }
      }).
      /*state('contest.clarification', {
            url: '/clarification',
            templateUrl: '/modules/contest/clarification.html',
            controller: contestClarificationCtrl,
          }).*/
      state('contest.issue', {
        url: '/issue',
        templateUrl: '/modules/contest/issue.html',
        controller: contestIssueCtrl,
      }).state('contest.cast', {
        url: '/cast',
        templateUrl: '/modules/contest/cast.html',
        controller: contestCastCtrl,
        resolve: {
          onLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'MathJax',
              files: ['/node_modules/mathjax/MathJax.js?config=TeX-AMS_HTML']
            }, {
              name: 'marked',
              files: ['/node_modules/mathjax/lib/marked.js']
            }]);
          }]
        }
      }).state('contest.admin', {
        url: '/admin',
        templateUrl: '/modules/contest/admin.html',
        controller: contestAdminCtrl,
      }).state('contest.player', {
        url: '/player',
        templateUrl: '/modules/contest/player.html',
        controller: contestPlayerCtrl,
      }).state('contest.print', {
        url: '/print',
        templateUrl: '/modules/contest/print.html',
        controller: contestPrintCtrl,
      }).state('contest.editproblem', {
        url: '/editproblem/:problemId',
        templateUrl: '/modules/admin/problem.html',
        controller: adminProblemCtrl,
        params: {
          contestId: undefined,
          problemId: undefined,
        },
        resolve: {
          onLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'MathJax',
              files: ['/node_modules/mathjax/MathJax.js?config=TeX-AMS_HTML']
            }, {
              name: 'marked',
              files: ['/node_modules/marked/lib/marked.js']
            }]);
          }]
        }
      }).state('register', {
        url: '/register/:contestId',
        templateUrl: '/modules/register/nav.html',
        controller: registerNavCtrl
      }).state('register.post', {
        url: '/post',
        templateUrl: '/modules/register/post.html',
        controller: registerPostCtrl,
        resolve: {
          onLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'marked',
              files: ['/node_modules/marked/lib/marked.js']
            }]);
          }]
        }
      }).state('register.register', {
        url: '/register',
        templateUrl: '/modules/register/register.html',
        controller: registerRegisterCtrl
      }).
      /*state('register.clarification', {
            url: '/clarification',
            templateUrl: '/modules/contest/clarification.html',
            controller: contestClarificationCtrl,
          }).*/
      state('register.issue', {
        url: '/issue',
        templateUrl: '/modules/contest/issue.html',
        controller: contestIssueCtrl,
      }).state('register.cast', {
        url: '/cast',
        templateUrl: '/modules/contest/cast.html',
        controller: contestCastCtrl,
        resolve: {
          onLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'MathJax',
              files: ['/node_modules/mathjax/MathJax.js?config=TeX-AMS_HTML']
            }, {
              name: 'marked',
              files: ['/node_modules/marked/lib/marked.js']
            }]);
          }]
        }
      }).state('register.admin', {
        url: '/admin',
        templateUrl: '/modules/contest/admin.html',
        controller: contestAdminCtrl,
        resolve: {
          onLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'marked',
              files: ['/node_modules/marked/lib/marked.js']
            }]);
          }]
        }
      }).state('register.player', {
        url: '/player',
        templateUrl: '/modules/contest/player.html',
        controller: contestPlayerCtrl,
      }).state('register.grant', {
        url: '/grant',
        templateUrl: '/modules/register/grant.html',
        controller: registerGrantCtrl,
      }).state('admin', {
        url: '/admin',
        templateUrl: '/modules/admin/nav.html',
        controller: adminNavCtrl,
      }).state('admin.problems', {
        url: '/problems',
        templateUrl: '/modules/admin/problems.html',
        controller: adminProblemsCtrl,
      }).state('admin.problem', {
        url: '/problem/:problemId',
        templateUrl: '/modules/admin/problem.html',
        controller: adminProblemCtrl,
        params: {
          contestId: undefined,
          problemId: undefined,
        },
        resolve: {
          onLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'MathJax',
              files: ['/node_modules/mathjax/MathJax.js?config=TeX-AMS_HTML']
            }, {
              name: 'marked',
              files: ['/node_modules/marked/lib/marked.js']
            }]);
          }]
        }
      }).state('admin.status', {
        url: '/status',
        templateUrl: '/modules/admin/status.html',
        controller: adminStatusCtrl,
      }).state('admin.daemon', {
        url: '/daemon',
        templateUrl: '/modules/admin/daemon.html',
        controller: adminDaemonCtrl,
      }).state('admin.user', {
        url: '/user',
        templateUrl: '/modules/admin/user.html',
        controller: adminUserCtrl,
      }).state('admin.doc', {
        url: '/doc',
        templateUrl: '/modules/admin/doc.html',
        controller: adminDocCtrl,
        resolve: {
          onLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'MathJax',
              files: ['/node_modules/mathjax/MathJax.js?config=TeX-AMS_HTML']
            }, {
              name: 'marked',
              files: ['/node_modules/marked/lib/marked.js']
            }]);
          }]
        }
      }).state('admin.su', {
        url: '/su',
        templateUrl: '/modules/admin/su.html',
        controller: adminSuCtrl
      }).state('doc', {
        url: '/doc/:docId',
        templateUrl: '/modules/doc/view.html',
        controller: docViewCtrl,
        resolve: {
          onLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'MathJax',
              files: ['/node_modules/mathjax/MathJax.js?config=TeX-AMS_HTML']
            }, {
              name: 'marked',
              files: ['/node_modules/marked/lib/marked.js']
            }]);
          }]
        }
      }).state('user', {
        url: '/user',
        templateUrl: '/modules/user/nav.html',
        controller: [function () {}],
        //abstract: true
      }).state('user.login', {
        url: '/login',
        template: '<p>login</p>'
      }).state('user.register', {
        url: '/register',
        templateUrl: '/modules/user/register.html',
        controller: userRegisterCtrl,
      }).state('user.registerteam', {
        url: '/registerteam',
        templateUrl: '/modules/user/registerteam.html',
        controller: userRegisterteamCtrl,
      }).state('user.editinfo', {
        url: '/editinfo',
        templateUrl: '/modules/user/editinfo.html',
        controller: userEditinfoCtrl,
      }).state('user.editteam', {
        url: '/editteam',
        templateUrl: '/modules/user/editteam.html',
        controller: userEditteamCtrl,
      }).state('user.editpassword', {
        url: '/editpassword',
        templateUrl: '/modules/user/editpassword.html',
        controller: userEditpasswordCtrl,
      }).state('404', {});
    }
  ]).controller('mainCtrl', mainCtrl).filter('statusClass', function () {
    return function (str) {
      var map = {
        "uploading": "info",
        "succeeded": "success",
        "error": "danger",
        "System Error": "danger",
        "Accepted": "success",
        "Wrong Answer": "danger",
        "Time Limit Exceeded": "warning",
        "Memory Limit Exceeded": "warning",
        "Runtime Error": "warning",
        "Compilation Error": "primary",
        "No Source": "primary",
        "Dangerous Program": "danger",
        "Waiting": "info",
        "Running": "info",
        "Compilation Success": "info",
        "Running success": "success",
        "Compile error": "primary",
        "Running timeout": "warning",
        "Running error": "warning",
        "Invisible": "info",
        "unstarted": "warning",
        "in_progress": "success",
        "ended": "info",
        "playerd": "primary",
        "pending": "success",
        "outstander": "danger",
      };
      if (typeof (str) === 'string' && str.match(/^Running/) !== null) {
        return 'info';
      }
      if (typeof (str) === 'string' && str.match(/^Wrong Answer/) !== null) {
        return 'danger';
      }
      if (typeof (str) === 'string' && (str.match(/^Time Limit Exceeded/) !== null || str.match(/^Memory Limit Exceeded/) !== null || str.match(/^Runtime Error/) !== null)) {
        return 'warning';
      }
      return map[str] ? map[str] : 'warning';
    };
  }).filter('timeStr', function () {
    return function (time) {
      var checkLen = function (x) {
        var t = String(x);
        if (t.length == 1) {
          t = '0' + t;
        }
        return t;
      };
      var d = new Date();
      d.setTime(time);
      return d.getUTCHours() + ":" + checkLen(d.getUTCMinutes()) + ":" + checkLen(d.getUTCSeconds());
    };
  }).filter('ojTranslate', function () {
    return function (str) {
      var map = {
        "unstarted": "未开始",
        "in_progress": "进行中",
        "ended": "已结束",
        "master": "管理员",
        "viewer": "观察者",
        "playerd": "已参赛",
        "pending": "信息通过审核",
        "setter": "可爱的出题人",
        "home": "首页",
        "contestlist": "比赛列表",
        "contestlist.my": "我的比赛",
        "contestlist.register": "比赛报名",
        "contest": "比赛",
        "contest.home": "比赛信息",
        "contest.post": "比赛海报",
        "contest.register": "比赛报名",
        "contest.problem": "查看题目",
        "contest.status": "比赛记录",
        "contest.ranklist": "比赛排行榜",
        "contest.acmrank": "排行榜",
        "contest.codeplusrank": "排行榜",
        "contest.balloon": "送气球",
        "contest.detail": "答案详情",
        "contest.admin": "比赛设置",
        "contest.player": "选手设置",
        //"contest.clarification": "消息",
        "contest.issue": "提问",
        "contest.cast": "通知与广播",
        "contest.custest": "自定义测试",
        "contest.print": "打印",
        "contest.editproblem": "出题人编辑题目",
        "register": "比赛报名",
        "register.post": "比赛详情",
        "register.register": "比赛注册",
        "register.admin": "报名管理",
        //"register.clarification": "提问和通知",
        "register.issue": "提问",
        "register.cast": "通知与广播",
        "register.player": "职员管理",
        "register.grant": "审核",
        "admin": "全局配置",
        "admin.problems": "题目池",
        "admin.problem": "编辑题目",
        "admin.status": "评测队列",
        "admin.doc": "编辑文档",
        "admin.su": "su",
        "admin.daemon": "评测机监控",
        "admin.user": "用户管理",
        "user.register": "注册用户",
        "user.registerteam": "注册队伍",
        "user.editinfo": "编辑用户信息",
        "user.editteam": "编辑队伍信息",
        "user.editpassword": "修改密码",
        "doc": "文档",
        "uploading": "上传中",
        "succeeded": "成功",
        "error": "错误",
        "register": "报名",
        "applying": "审核中",
        "player": "选手",
        "outstander": "审核未通过",
        "normalBoard": "提供分数排行榜",
        "icpcBoard": "提供 ACM/ICPC 排行榜",
        "codeplusBoard": "提供 Codeplus 排行榜",
        "printable": "提供打印服务",
        "unfreezeBoard": "解除封榜",
        "custest": "提供自定义测试",
        "limitSubmit": "限制提交次数 (32次)",
      };
      return map[str] ? map[str] : '未知';
    };
  }).filter('langClass', function () {
    return function (input) {
      var str = input;
      if (typeof (str) !== 'string') {
        return 'plain';
      }
      if (str.match(/g\+\+/) !== null) {
        return 'cpp';
      } else if (str.match(/gcc/) !== null) {
        return 'c';
      } else if (str.match(/pascal/) !== null) {
        return 'pascal';
      }
      return 'plain';
    };
  }).filter('invisibleFilter', function () {
    return function (data) {
      if (data == null) {
        return 'Invisible';
      }
      return data;
    };
  }).filter('preview', function () {
    return function (data, filename) {
      if (typeof (filename) === 'string' && filename.match(/pas$|c$|cpp$/) !== null) {
        return data;
      } else {
        var rollLines = function (data) {
          var lines = data.split('\n');
          if (lines.length < 4) {
            return data;
          } else {
            var last = lines.length - 1;
            while (last > 3 && lines[last] === '') {
              --last;
            }
            return [lines[0], lines[1], lines[2], '...', lines[last]].join('\n');
          }
        };
        var rollLine = function (data) {
          var lines = data.split('\n');
          var res = [];
          for (var i in lines) {
            if (lines[i].length < 40) {
              res.push(lines[i]);
            } else {
              res.push(lines[i].substr(0, 16) + '...' + lines[i].substr(-16));
            }
          }
          return res.join('\n');
        };
        return rollLine(rollLines(data));
      }
    };
  }).filter('directHighlight', function () {
    return function (str, lang) {
      if (typeof (hljs) !== 'object') {
        return str
      } else {
        return hljs.highlightAuto(str, lang).value;
      }
    }
  }).factory('poll', pollSrv).factory('mjLoader', mjLoaderSrv)
  .directive('onFinishRenderFilters', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngRepeatFinished');
          });
        }
      }
    };
  });
