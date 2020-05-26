var adminDaemonCtrl = [ '$scope', '$http', '$timeout', 'poll', function($scope, $http, $timeout, poll) {
	var updateList = function(res) {
		if (res.data) {
			$scope.list = [];
			for (var i in res.data) {
				$scope.list.push({
					jid: i,
                    ip: res.data[i].ip,
					time: res.data[i].lastRespond,
                    runId: res.data[i].runId,
                    count: res.data[i].count,
                    status: res.data[i].status
				});
			}
		}
		$scope.lastUpdateTime = Date.now();
	};
	$scope.list = [];
	($scope.updateList = function() {
		for (var i in $scope.filter) {
			if ($scope.filter[i] === '') {
				$scope.filter[i] = undefined;
			}
		}
		$http.post('/api/admin/judgers').then(updateList).catch(function(error) {
		});
	})();
	poll.push(function() {
		$scope.updateList();
	}, 2, 'autoRefDaemon');
} ]; 


var adminDocCtrl = [ '$scope', '$rootScope', '$state', '$stateParams','$http', function($scope, $rootScope, $state, $stateParams, $http) {
	MathJax.Hub.Config({ 
		tex2jax: { 
			inlineMath: [ ['$','$'], ["\\(","\\)"] ], 
			processEscapes: true 
		},
		processSectionDelay: 0
	});
	$scope.generatePreview = function() {
		$('#preview').html($scope.descriptionText);
		MathJax.Callback.Queue([ 'Typeset', MathJax.Hub, 'preview' ], function() {
			var text = $('#preview').html();
			var newText = marked(text);
			$('#preview').html(newText);
		});
	};
	$scope.downloadDoc = function() {
		$http.get('/staticdata/' + $scope.docId + '.doc.static').then(function(data) {
			$scope.descriptionText = data.data;
			$scope.generatePreview();
		}).catch(function(error) {
			$scope.descriptionText = '未编辑';
		});
	};
	$scope.writeDoc = function() {
		if ($scope.docId.length < 1) {
			alert('无效的ID');
			return;
		}
		$http.post('/api/admin/docupdate', {
			id: $scope.docId,
			text: $scope.descriptionText
		}).then(function(data) { 
			$scope.downloadDoc();
		}).catch(function(error) {
			alert(error.data);
		});
	};
} ];


var adminNavCtrl = [ '$scope', '$rootScope', '$state', '$stateParams','$http', function($scope, $rootScope, $state, $stateParams, $http) {
} ];

var adminProblemCtrl = [
  '$scope', '$rootScope', '$state', '$stateParams', '$http', 'mjLoader',
  function ($scope, $rootScope, $state, $stateParams, $http, mjLoader) {
    mjLoader.init();
    $scope.problemId = $stateParams.problemId;
    $scope.contestId = $stateParams.contestId;
    $scope.problem = {
      langs: [],
      cases: [],
      subtasks: [],
      additionalFiles: []
    };
    $scope.removeLang = function (i) {
      $scope.problem.langs = $scope.problem.langs.slice(0, i).concat(
        $scope.problem.langs.slice(i + 1));
    };
    $scope.removeCase = function (i) {
      $scope.problem.cases = $scope.problem.cases.slice(0, i).concat(
        $scope.problem.cases.slice(i + 1));
    };
    $scope.removeSubtask = function (i) {
      $scope.problem.subtasks = $scope.problem.subtasks.slice(0, i).concat(
        $scope.problem.subtasks.slice(i + 1));
    };
    $scope.removeAdditionalFile = function (i) {
      $scope.problem.additionalFiles =
        $scope.problem.additionalFiles.slice(0, i).concat(
          $scope.problem.additionalFiles.slice(i + 1));
    };
    ($scope.getKey = function () {
      $http.post('/api/admin/publickey', {})
        .then(function (data) {
          $scope.publickey = data.data;
        })
        .catch(function (error) {});
    })();
    $scope.addCase = {
      ansId: '0',
      score: '10',
      inputFile: 'data<i+1>.in',
      outputFile: 'data<i+1>.out',
      time_limit: '1000',
      mem_limit: '512',
      len_limit: '64',
      spjPath: ''
    };
    $scope.addSubtask = {
      subtaskId: '<i+1>',
      score: '10',
      containedCaseId: '[1]',
      isPretest: false
    };
    $scope.addAdditionalFile = {
      remark: 'Key',
      fileName: 'Value'
    };
    $scope.defLangs = {
      answer: [{
        name: 'answer',
        exec: 'cp',
        args: '',
        maxlen: '1048576',
        editor: 'plain_text',
      }],
      original: [{
          name: 'g++ with std11',
          exec: 'g++',
          args: '-std=c++11 -DONLINE_JUDGE',
          maxlen: '65536',
          editor: 'c_cpp',
        }, {
          name: 'g++',
          exec: 'g++',
          args: '-DONLINE_JUDGE',
          maxlen: '65536',
          editor: 'c_cpp',
        },
        {
          name: 'gcc with std11',
          exec: 'gcc',
          args: '-std=c11 -DONLINE_JUDGE',
          maxlen: '65536',
          editor: 'c_cpp',
        },
        {
          name: 'gcc',
          exec: 'gcc',
          args: '-DONLINE_JUDGE',
          maxlen: '65536',
          editor: 'c_cpp',
        },
        {
          name: 'java',
          exec: 'javac',
          args: '',
          maxlen: '65536',
          editor: 'java',
        },
        {
          name: 'python',
          exec: 'python',
          args: '',
          maxlen: '65536',
          editor: 'python',
        },
        {
          name: 'python3',
          exec: 'python3',
          args: '',
          maxlen: '65536',
          editor: 'python',
        },
      ],
      originalO2: [{
          name: 'g++ with std11',
          exec: 'g++',
          args: '-O2 -std=c++11 -DONLINE_JUDGE',
          maxlen: '65536',
          editor: 'c_cpp',
        }, {
          name: 'g++',
          exec: 'g++',
          args: '-O2 -DONLINE_JUDGE',
          maxlen: '65536',
          editor: 'c_cpp',
        },
        {
          name: 'gcc with std11',
          exec: 'gcc',
          args: '-O2 -std=c11 -DONLINE_JUDGE',
          maxlen: '65536',
          editor: 'c_cpp',
        },
        {
          name: 'gcc',
          exec: 'gcc',
          args: '-O2 -DONLINE_JUDGE',
          maxlen: '65536',
          editor: 'c_cpp',
        },
        {
          name: 'java',
          exec: 'javac',
          args: '',
          maxlen: '65536',
          editor: 'java',
        },
        {
          name: 'python',
          exec: 'python',
          args: '',
          maxlen: '65536',
          editor: 'python',
        },
        {
          name: 'python3',
          exec: 'python3',
          args: '',
          maxlen: '65536',
          editor: 'python',
        },
      ]
    };
    $scope.addRuledCase = function () {
      var newCase = {};
      var id = $scope.problem.cases.length;
      for (var i in $scope.addCase) {
        if (typeof ($scope.addCase[i]) === 'string') {
          var regex = $scope.addCase[i].match(/\<\S*\>/);
          var tid = id;
          if (regex) {
            var fstr = regex[0];
            var f =
              new Function('i', 'return ' + fstr.substr(1, fstr.length - 2));
            tid = f(id);
          }
          newCase[i] = $scope.addCase[i].replace(/\<\S*\>/g, tid);
        } else {
          newCase[i] = $scope.addCase[i];
        }
      }
      $scope.problem.cases.push(newCase);
    };
    $scope.addRuledSubtask = function () {
      var newSubtask = {};
      var id = $scope.problem.subtasks.length;
      // console.log($scope.problem.subtasks);
      for (var i in $scope.addSubtask) {
        // console.log($scope.addSubtask);
        if (typeof ($scope.addSubtask[i]) === 'string') {
          var regex = $scope.addSubtask[i].match(/\<\S*\>/);
          var tid = id;
          if (regex) {
            var fstr = regex[0];
            var f =
              new Function('i', 'return ' + fstr.substr(1, fstr.length - 2));
            tid = f(id);
          }
          newSubtask[i] = $scope.addSubtask[i].replace(/\<\S*\>/g, tid);
        } else {
          newSubtask[i] = $scope.addSubtask[i];
        }
      }
      $scope.problem.subtasks.push(newSubtask);
    };
    $scope.addRuledAdditionalFile = function () {
      var newAdditionalFile = {};
      var id = $scope.problem.additionalFiles.length;
      for (var i in $scope.addAdditionalFile) {
        if (typeof ($scope.addAdditionalFile[i]) === 'string') {
          var regex = $scope.addAdditionalFile[i].match(/\<\S*\>/);
          var tid = id;
          if (regex) {
            var fstr = regex[0];
            var f =
              new Function('i', 'return ' + fstr.substr(1, fstr.length - 2));
            tid = f(id);
          }
          newAdditionalFile[i] =
            $scope.addAdditionalFile[i].replace(/\<\S*\>/g, tid);
        } else {
          newAdditionalFile[i] = $scope.addAdditionalFile[i];
        }
      }
      $scope.problem.additionalFiles.push(newAdditionalFile);
    };
    $scope.fillCase = function () {
      for (var j in $scope.problem.cases) {
        for (var i in $scope.addCase) {
          if (typeof ($scope.addCase[i]) === 'string') {
            if ($scope.addCase[i] === '') {
              continue;
            }
            $scope.problem.cases[j][i] = $scope.addCase[i].replace(/\<i\>/g, j);
          } else if ($scope.addCase[i] != null) {
            $scope.problem.cases[j][i] = $scope.addCase[i];
          }
        }
      }
    };
    $scope.fillSubtask = function () {
      for (var j in $scope.problem.subtasks) {
        for (var i in $scope.addSubtask) {
          if (typeof ($scope.addSubtask[i]) === 'string') {
            if ($scope.addSubtask[i] === '') {
              continue;
            }
            $scope.problem.subtasks[j][i] =
              $scope.addSubtask[i].replace(/\<i\>/g, j);
          } else if ($scope.addSubtask[i] != null) {
            $scope.problem.subtasks[j][i] = $scope.addSubtask[i];
          }
        }
      }
    };
    $scope.fillAdditionalFile = function () {
      for (var j in $scope.problem.additionalFiles) {
        for (var i in $scope.addAdditionalFile) {
          if (typeof ($scope.addAdditionalFile[i]) === 'string') {
            if ($scope.addAdditionalFile[i] === '') {
              continue;
            }
            $scope.problem.additionalFiles[j][i] =
              $scope.addAdditionalFile[i].replace(/\<i\>/g, j);
          } else if ($scope.addAdditionalFile[i] != null) {
            $scope.problem.additionalFiles[j][i] = $scope.addAdditionalFile[i];
          }
        }
      }
    };
    ($scope.fetchConfig = function () {
      $http
        .post(
          '/api/admin/problemgetConfig', {
            problemId: $scope.problemId,
            contestId: $scope.contestId
          })
        .then(function (data) {
          $scope.problem._id = data.data._id;
          $scope.problem.title = data.data.title;
          $scope.problem.local = data.data.local;
          $scope.problem.cases = data.data.cases || [];
          $scope.problem.langs = data.data.langs || [];
          $scope.problem.subtasks = data.data.subtasks || [];
          $scope.problem.additionalFiles = data.data.additionalFiles || [];
          $scope.data = data.data.data;
          $scope.description = data.data.description;
          $scope.submittable = data.data.submittable;
          $scope.isOfSubtask = data.data.isOfSubtask;
          $scope.scoreScript = data.data.scoreScript;

          $http.get('/staticdata/' + $scope.description + '.description')
            .then(function (data) {
              $scope.descriptionText = data.data;
            })
            .catch(function (error) {
              $scope.descriptionText = '未生成或未同步';
            });
        })
        .catch(function (error) {
          alert(error.data);
        });
    })();
    $scope.syncGit = function () {
      $scope.syncing = 'Syncing';
      $http
        .post('/api/admin/problemsyncGit', {
          problemId: $scope.problemId,
          contestId: $scope.contestId,
          url: $scope.problem.gitURL
        })
        .then(function (data) {
          $scope.syncing = false;
          $scope.fetchConfig();
        })
        .catch(function (error) {
          $scope.syncing = false;
          alert(error.data);
        });
    };
    $scope.syncLocal = function () {
      $scope.syncing = 'Syncing';
      $http
        .post('/api/admin/problemsyncLocal', {
          problemId: $scope.problemId,
          contestId: $scope.contestId,
          local: $scope.problem.local
        })
        .then(function (data) {
          $scope.syncing = false;
          $scope.fetchConfig();
        })
        .catch(function (error) {
          $scope.syncing = false;
          alert(error.data);
        });
    };
    var clean = function (a) {
      var ret = {};
      for (var i in a) {
        if (i.match(/\$/) === null) {
          ret[i] = a[i];
        }
      }
      return ret;
    };
    var purify = function (a) {
      var ret = [];
      for (var i in a) {
        if (typeof (i) === 'number' ||
          (typeof (i) === 'string' && i.match(/^\d*$/) !== null)) {
          ret.push(clean(a[i]));
        }
      }
      return ret;
    };
    $scope.writeConfig = function () {
      // console.log(JSON.stringify(purify($scope.problem.subtasks)));
      $http
        .post('/api/admin/problemconfig', {
          problemId: $scope.problemId,
          contestId: $scope.contestId,
          title: $scope.problem.title,
          local: $scope.problem.local,
          submittable: $scope.submittable,
          isOfSubtask: $scope.isOfSubtask,
          scoreScript: $scope.scoreScript,
          cases: JSON.stringify(purify($scope.problem.cases)),
          langs: JSON.stringify(purify($scope.problem.langs)),
          subtasks: JSON.stringify(purify($scope.problem.subtasks)),
          additionalFiles: JSON.stringify(purify($scope.problem.additionalFiles))
        })
        .then(function (data) {
          if (data.data == "Succeeded")
            alert("配置成功")
          $scope.fetchConfig();
        })
        .catch(function (error) {
          alert(error.data);
        });
    };
    $scope.generatePreview = function () {
      mjLoader.render($scope.descriptionText, '#preview');
    };
    $scope.writeDoc = function () {
      $http
        .post('/api/admin/problemupdateDescription', {
          problemId: $scope.problemId,
          contestId: $scope.contestId,
          descriptionText: $scope.descriptionText
        })
        .then(function (data) {
          $scope.fetchConfig();
        })
        .catch(function (error) {
          alert(error.data);
        });
    };
    $scope.viewLocal = function () {
      $http
        .post('/api/admin/problemviewLocal', {
          problemId: $scope.problemId,
          contestId: $scope.contestId,
        })
        .then(function (data) {
          $scope.dirFiles = data.data;
        });
    };
    $scope.publicFiles = [];
    $scope.uploadingFiles = [];
    $scope.addFile = function (file, type) {
      if (typeof (file) !== 'object') {
        return;
      }
      var reader = new FileReader;
      reader.onload = function () {
        var ret = {
          problemId: $scope.problemId,
          contestId: $scope.contestId,
          code: btoa(this.result),
          filename: file.name,
          size: file.size
        };
        var url = '/api/admin/problemaddFile';
        if (type === 'public') {
          url = '/api/admin/problemaddPublicFile';
        }
        ret.id = $scope.uploadingFiles.length;
        $scope.uploadingFiles.push({
          filename: file.name,
          status: 'uploading',
          size: file.size
        });
        $http.post(url, ret)
          .then(function (data) {
            if (type === 'public') {
              $scope.publicFiles.push(data.data);
            }
            $scope.uploadingFiles[ret.id].status = 'succeeded';
          })
          .catch(function (error) {
            $scope.uploadingFiles[ret.id].status = 'error';
            console.error(error);
          });
      };
      reader.readAsBinaryString(file);
    };
    $scope.uploadFiles = function () {
      var ele = document.getElementById('answer').files;
      for (var i in ele) {
        var file = ele[i];
        $scope.addFile(file, 'private');
      }
    };
    $scope.uploadPublicFiles = function () {
      var ele = document.getElementById('answer').files;
      for (var i in ele) {
        var file = ele[i];
        $scope.addFile(file, 'public');
      }
    };
  }
];
var adminProblemsCtrl = [ '$scope', '$rootScope', '$state', '$stateParams','$http', function($scope, $rootScope, $state, $stateParams, $http) {
	($scope.updateList = function() {
		$http.post('/api/admin/problemlist').then(function(data) {
			$scope.problems = data.data.reverse();
			$scope.problems.sort(function(a, b) {
				return b._id - a._id;
			});
		});
	})();
	$scope.showCustests = false;
	$scope.addProblem = function() {
		$http.post('/api/admin/problemcreate').then(function(data) {
			$scope.updateList();
		}).catch(function(error) {
			alert(error);
		});
	};
} ];


var adminStatusCtrl = [ '$scope', '$http', '$timeout', 'poll', function($scope, $http, $timeout, poll) {
	var emptyFilter = function() {
		var res = undefined;
		for (var i in $scope.filter) {
			res = res || $scope.filter[i];
		}
		return res === undefined;
	};
	var updateList = function(res) {
		if (res.data) {
			$scope.list = res.data;
		}
		$scope.lastUpdateTime = Date.now();
		$scope.list.sort(function(x,y){return x._id<y._id});
	};
	$scope.filter = {};
	$scope.list = [];
	$scope.getFilter = function() {
		var filter = {};
		for (var i in $scope.filter) {
			if ($scope.filter[i] !== '') {
				filter[i] = $scope.filter[i];
			}
		}
		return filter;
	};
	($scope.updateList = function() {
		$http.post('/api/admin/status', { queryAttr: JSON.stringify($scope.getFilter()) }).then(updateList);
	})();
	$scope.rejudgeList = function() {
		if (confirm('可能会爆炸. 确定?')) {
			$http.post('/api/admin/rejudge', $scope.filter);
		}
	};
	$scope.rejudge = function(_id) {
		$http.post('/api/admin/rejudge', { _id: _id });
		$scope.updateList();
	};
	poll.push(function() {
		if ($scope.autoref) {
			$scope.updateList();
		}
	}, 2, 'autoRef');
	$scope.loadMore = function() {
		if ($scope.list.length === 0) {
			$scope.nomore = true;
			return;
		}
		var lastId = $scope.list[$scope.list.length - 1]._id;
		var filter = $scope.getFilter();
		filter._id = {
			$lt: lastId
		};
		$http.post('/api/admin/status', { queryAttr: JSON.stringify(filter) }).then(function(data) {
			if (data.data.length) {
				$scope.list = $scope.list.concat(data.data);
				$scope.list.sort(function(x,y){return x._id<y._id});
			} else {
				$scope.nomore = true;
			}
		});
	};
} ]; 


var adminSuCtrl = [ '$scope', '$http', '$timeout', 'poll', function($scope, $http, $timeout, poll) {
	$scope.su = function() {
		$http.post('/api/admin/su', {
			token: $scope.token
		}).then(function(data) {
			window.location.href = '/';
		}).catch(function(error) {
			console.error(error);
			if (typeof(error.data) === 'string') {
				alert('Error: ' + error.data);
			} else {
				alert('Unknown error');
			}
		});
	};
	$scope.findRoles = function(){
		$scope.allInfo = [];
		for(var i = 0; i < $scope.users.length; i++)
		{
			$http.post('/api/admin/findRole', {
				user: $scope.users[i]
			}).then(function(data) {
				//$scope.role = data.data;
				$scope.allInfo.push(data.data);
			}).catch(function(error) {
				console.error(error);
				if (typeof(error.data) === 'string') {
					alert('Error: ' + error.data);
				} else {
					alert('Unknown error');
				}
			});		
		}
	}
	$scope.findUsersById = function(){
		$http.post('/api/admin/findUsersById', {
			token: $scope.tokenId
		}).then(function(data) {
			$scope.users = data.data;
			$scope.findRoles();
		}).catch(function(error) {
			console.error(error);
			if (typeof(error.data) === 'string') {
				alert('Error: ' + error.data);
			} else {
				alert('Unknown error');
			}
		});
	};
	$scope.findUsersByUsername = function(){
		$http.post('/api/admin/findUsersByUsername', {
			token: $scope.tokenUsername
		}).then(function(data) {
			var tmpUsers = data.data;
			tmpUsers.sort(function(a,b){
				return a._id - b._id;
			})
			$scope.users = tmpUsers;
			$scope.findRoles();
		}).catch(function(error) {
			console.error(error);
			if (typeof(error.data) === 'string') {
				alert('Error: ' + error.data);
			} else {
				alert('Unknown error');
			}
		});
	};
	$scope.findModifyUser = function(){
		$http.post('/api/admin/findModifyUser', {
			token: $scope.tokenInfo
		}).then(function(data) {
			$scope.modifyUser = data.data;
		}).catch(function(error) {
			console.error(error);
			if (typeof(error.data) === 'string') {
				alert('Error: ' + error.data);
			} else {
				alert('Unknown error');
			}
		});
	};
	$scope.changePassword = function(){
		if($scope.modifyUser === undefined)
		{
			alert("请先选择一个要修改的用户");
			return;
		}
		if ($scope.newpassword !== $scope.repassword){
			alert("Re-entered password does not match.");
			return;
		}
		$http.post('/api/admin/changePassword', {
			newpassword: $scope.newpassword,
			username: $scope.modifyUser.username
		}).then(function(data) {
			alert("修改密码成功");
		}).catch(function(error) {
			console.error(error);
			if (typeof(error.data) === 'string') {
				alert('Error: ' + error.data);
			} else {
				alert('Unknown error');
			}
		});
	};
	$scope.changeUsername = function(){
		if($scope.modifyUser === undefined)
		{
			alert("请先选择一个要修改的用户");
			return;
		}
		$http.post('/api/admin/changeUsername', {
			newUsername: $scope.newUsername,
			id: $scope.modifyUser._id
		}).then(function(data) {
			alert("修改用户名成功");
		}).catch(function(error) {
			console.error(error);
			if (typeof(error.data) === 'string') {
				alert('Error: ' + error.data);
			} else {
				alert('Unknown error');
			}
		});
	};

	$scope.removeUser = function(){
		if($scope.modifyUser === undefined)
		{
			alert("请先选择一个要修改的用户");
			return;
		}
		
		if(!confirm("删除后将无法恢复，确认删除该用户吗？"))
			return;

		$http.post('/api/admin/removeUser', {
			id: $scope.modifyUser._id
		}).then(function(data) {
			alert("删除用户成功");
		}).catch(function(error) {
			console.error(error);
			if (typeof(error.data) === 'string') {
				alert('Error: ' + error.data);
			} else {
				alert('Unknown error');
			}
		});
	};
} ];

var adminUserCtrl = [ '$scope', '$rootScope', '$state', '$stateParams','$http', function($scope, $rootScope, $state, $stateParams, $http) {
	$scope.generate = function() {
		$http.post('/api/admin/useradd', {
			raw: $scope.raw,
			startno: $scope.startno,
			prefix: $scope.prefix
		}).then(function(data) {
			$scope.res = data.data;
		}).catch(function(error) {
			alert(error.data);
		});
	};
	$scope.logoutAll = function() {
		$http.post('/api/admin/userlogoutAll');
	};
} ];


var mainCtrl = ['$scope', '$rootScope', '$http', '$timeout', 'poll', function ($scope, $rootScope, $http, $timeout, poll) {
  window.WebSocket = window.WebSocket || window.MozWebSocket;
  $rootScope.login = {
    username: '',
    password: '',
    type: 'Team',
    remarks: '[{},{}]',
  };
  $rootScope.finishTodo = async (todo) => {
    if (todo.obj == 'alert') {
      await $http.post('/api/work/finish', {
        task: todo._id
      });
    }

  }
  $rootScope.isTeam = 0;
  $rootScope.activeContests = {};
  $rootScope.user = {};
  $rootScope.isError = function (str) {
    if (typeof (str) === 'string' && str.match(/ \(rejected\)$/)) {
      return 'alert-danger has-error';
    }
    return false;
  };
  $rootScope.codeplus_oauth = {};
  $http.post('/api/user/codeplus_login_info').then(function (data) {
    $rootScope.codeplus_oauth = data.data;
  });
  $http.post('/api/user/ojname').then(function (data) {
    $rootScope.OJNAME = data.data;
  });
  $rootScope.authLogin = function () {
    $http.post('/api/user/login', $rootScope.login).then(function (data) {
      $rootScope.username = $rootScope.login.username;
      $rootScope.loadUserInfo();
    }).catch(function (error) {
      alert(error.data);
    });
  };
  $rootScope.loadUserInfo = function () {
    $http.post('/api/user/lookup').then(function (data) {
      if (typeof (data.data) === 'object') {
        $rootScope.currentUser = data.data;
        $rootScope.isTeam = ($rootScope.currentUser.type === 'Team');
      } else {
        $rootScope.currentUser = null;
      }
    }).catch(function (error) {
      $rootScope.currentUser = null;
    });
    $http.post('/api/user/isroot').then(function (data) {
      $rootScope.isRoot = data.data.isRoot;
    }).catch(function (error) {
      $rootScope.isRoot = false;
    });
  };
  $rootScope.loadUserInfo();
  $rootScope.authLogout = function () {
    $http.post('/api/user/logout').then(function (data) {
      $rootScope.loadUserInfo();
    }).catch(function (error) {
      $rootScope.loadUserInfo();
    });
  };
  poll.push(function () {
      $rootScope.servertime = $rootScope.servertime*1 +1000;
      
  }, 1, 'incTime');
}];

var mjLoaderSrv = [ '$interval', '$timeout', function($interval, $timeout) {
	var ret = {};
	ret.loading = false;
	ret.loaded = false;
	ret.init = function() {
		if (ret.loaded === false) {
			if (typeof(MathJax) !== 'object' || typeof(MathJax.Hub) !== 'object') {
				ret.loading = true;
				$timeout(function() {
					ret.init();
				}, 300);
			} else {
				ret.loaded = true;
			}
		}
	};
	ret.render = function(content, elementId) {
		MathJax.Hub.Register.StartupHook("End", function() { 
			MathJax.Hub.Config({ 
				tex2jax: { 
					inlineMath: [ ['$','$'], ["\\(","\\)"] ], 
					processEscapes: true 
				},
				processSectionDelay: 0,
				processUpdateDelay: 0
			});
			var newText = marked(content);
			$(elementId).hide();
			$(elementId).html(newText);
			MathJax.Callback.Queue([ 'Typeset', MathJax.Hub, elementId.substr(1) ], function() {
				// var text = $(elementId).html();
				// var text = content;
				// $(elementId).html(newText);
				$(elementId).find('table').addClass('table table-bordered');
				$(elementId).show();
			});
		});
	};
	ret.waitHighlight = function(id) {
		if (typeof(hljs) !== 'object' || document.getElementById(id) === null) {
			$timeout(function() {
				ret.waitHighlight(id);
			}, 100);
		} else {
			hljs.highlightBlock(document.getElementById(id));
		}
	};
	ret.waitId = function(id, exec) {
		if (document.getElementById(id) === null) {
			$timeout(function() {
				ret.waitId(id, exec);
			}, 100);
		} else {
			exec();
		}
	};
	return ret;
} ];

var pollSrv = [ '$interval', '$timeout', function($interval, $timeout) {
	var events = {};
	var ret = {};
	ret.push = function(exec, len, id) {
		events[id] = {
			exec: exec,
			len: len,
			cur: 1
		};
	};
	ret.pull = function(id) {
		events[id] = 0;
	};
	ret.delay = function(id) {
		if (events[id]) {
			++ events[id].len;
		}
	};
	$interval(function() {
		for (var i in events) {
			-- events[i].cur;
			if (events[i].cur <= 0) {
				events[i].cur = events[i].len;
				$timeout(events[i].exec, 0);
			}
		}
	}, 1000);
	return ret;
} ];

var contestAcmrankCtrl = [ '$scope', '$state', '$stateParams', '$http', '$timeout', function($scope, $state, $stateParams, $http, $timeout) {
	const Minute = 1000 * 60;

	$scope.contestId = $stateParams.contestId;
	$scope.initAcmrank = function() {
		$http.post('/api/contest/initacm', {
			contestId: $scope.contestId
		}).then(function() {
			alert('Success');
		}).catch(function(err) {
			alert(err.data);
			console.log(err);
		});
	};
	
	$scope.fetch = function() {
		const classMap = {
			'None': '',
			'Accepted': 'accepted',
			'Wrong': 'rejected',
			'Unknown': 'unknown',
		};
		$http.post('/api/contest/acmrank', {
			contestId: $scope.contestId
		}).then(function(data) {
			$scope.problems = data.data.problems;
			$scope.res = data.data.data;
			$scope.fbTime = data.data.fbTime;
			for (var i in $scope.res) {
				$scope.res[i].weight = $scope.res[i].time + $scope.res[i].penalty * 20 * 60 * 1000;
				for (var j = 0; j < $scope.problems.length; ++ j) {
					if ($scope.fbTime[j] > 0 && $scope.res[i].rec[j].time === $scope.fbTime[j]) {
						$scope.res[i].rec[j].fb = true;
						$scope.res[i].rec[j].sub_status = 'firstblood';
					} else {
						$scope.res[i].rec[j].sub_status = classMap[$scope.res[i].rec[j].status];
					}
				}
			}
			$scope.res.sort(function(a, b) {
				if (a.count !== b.count) {
					return b.count - a.count;
				} else {
					return a.weight - b.weight;
				}
			});
			for (var i = 0; i < $scope.res.length; ++ i) {
				$scope.res[i].rank = i + 1;
			}
		}).catch(function(err) {
			console.log(err);
		});
	}
	$scope.fetch();
} ];

var contestAdminCtrl = ['$scope', '$state', '$stateParams', '$http', '$timeout', function ($scope, $state, $stateParams, $http, $timeout) {
  $scope.contestId = $stateParams.contestId;
  $scope.contest = {};
  $scope.form = {};
  $scope.titles = {};
  $scope.opts = {};
  $scope.allOpts = ['normalBoard', 'icpcBoard', 'codeplusBoard', 'unfreezeBoard', 'printable', 'custest', 'limitSubmit'];
  (
    $scope.updateInfo = function () {
      $http.post('/api/contest/info', {
        contestId: $scope.contestId
      }).then(function (data) {
        // console.log(data);
        $scope.contest = data.data;
        for (var i in $scope.contest.opts) {
          $scope.opts[$scope.contest.opts[i]] = true;
        }
      }).catch(function (error) {
        $scope.contest = {
          title: error.data
        };
      });
      $http.post('/api/contest/content', {
        contestId: $scope.contestId
      }).then(function (data) {
        $scope.problems = [];
        for (var i in data.data) {
          $scope.problems.push(data.data[i]._id);
          $scope.titles[data.data[i]._id] = data.data[i].title;
        }
      });
    })();
  $scope.removeProblem = function (i) {
    $scope.problems = $scope.problems.slice(0, i).concat($scope.problems.slice(i + 1));
  };
  $scope.swapProblem = function (i, j) {
    if ($scope.problems[i] != null && $scope.problems[j] != null) {
      var tmp = $scope.problems[i];
      $scope.problems[i] = $scope.problems[j];
      $scope.problems[j] = tmp;
    }
  };
  $scope.addProblem = function () {
    var problemId = $scope.addId || '0';
    $scope.problems.push(problemId);
    if (!$scope.titles[problemId]) {
      $http.post('/api/contest/problemTitle', {
        contestId: $scope.contestId,
        problemId: problemId
      }).then(function (data) {
        $scope.titles[problemId] = data.data.title || '题目不存在';
      });
    }
  };
  $scope.applyConfig = function () {
    var opts = [];
    for (var i in $scope.opts) {
      if ($scope.opts[i]) {
        opts.push(i);
      }
    }
    // console.log($scope.contest.countLastSubmit);
    $http.post('/api/contest/config', {
      available_ip: $scope.contest.available_ip,
      contestId: $scope.contestId,
      start_time: $scope.contest.start_time._d.getTime(),
      end_time: $scope.contest.end_time._d.getTime(),
      title: $scope.contest.title,
      dashboard: $scope.contest.dashboard,
      hidden: $scope.contest.hidden || false,
      countLastSubmit: $scope.contest.countLastSubmit || false,
      released: $scope.contest.released || false,
      published: $scope.contest.published || false,
      problems: JSON.stringify($scope.problems),
      tos: $scope.contest.tos,
      opts: JSON.stringify(opts)
    }).then($scope.updateInfo);
  };
  $scope.initAcmrank = function () {
    $http.post('/api/contest/initacm', {
      contestId: $scope.contestId
    }).then(function () {
      alert('Success');
    }).catch(function (err) {
      alert(err.data);
      console.log(err);
    });
  };
  $scope.publicFiles = [];
  $scope.uploadingFiles = [];
  $scope.addFile = function (file, type) {
    if (typeof (file) !== 'object') {
      return;
    }
    var reader = new FileReader;
    reader.onload = function () {
      var ret = {
        problemId: -1,
        contestId: $scope.contestId,
        code: btoa(this.result),
        filename: file.name,
        size: file.size
      };
      var url = '/api/register/uploadFile';
      ret.id = $scope.uploadingFiles.length;
      $scope.uploadingFiles.push({
        filename: file.name,
        status: 'uploading',
        size: file.size
      });
      $http.post(url, ret).then(function (data) {
        $scope.publicFiles.push(data.data);
        $scope.uploadingFiles[ret.id].status = 'succeeded';
      }).catch(function (error) {
        $scope.uploadingFiles[ret.id].status = 'error';
        console.error(error);
      });
    };
    reader.readAsBinaryString(file);
  };
  $scope.uploadPublicFiles = function () {
    var ele = document.getElementById('answer').files;
    for (var i in ele) {
      var file = ele[i];
      $scope.addFile(file, 'public');
    }
  };
}];

var contestBalloonCtrl = [ '$scope', '$state', '$stateParams', '$http', '$timeout', function($scope, $state, $stateParams, $http, $timeout) {
	$scope.contestId = $stateParams.contestId;
	$scope.fetch = function() {
		$http.post('/api/contest/listballoon', {
			contestId: $scope.contestId
		}).then(function(data) {
            const priority = [ 'Pending', 'Mailing', 'Sent' ];
			$scope.judges = data.data;
            $scope.judges.sort(function(a, b) {
                return priority.indexOf(a.status) - priority.indexOf(b.status);
            });
		}).catch(function(err) {
			console.log(err);
		});
	};
    $scope.statusText = {
        'Pending': '等待中',
        'Mailing': '派送中',
        'Sent': '已发送'
    };
    $scope.statusClass = {
        'Pending': 'info',
        'Mailing': 'warning',
        'Sent': 'success'
    };
	$scope.fetch();
	$scope.getBalloon = function(id) {
		$http.post('/api/contest/getballoon', {
			contestId : $scope.contestId,
		}).then(function(data) {
            if (data.data == 'Got') {
                alert("抢单成功，请萌萌哒志愿者尽快送到对应队伍的位置哦！");
                $scope.fetch();
            } else {
                alert('可惜现在没有新的单子哦. QwQ');
            }
		}).catch(function(err) {
			alert("抢单失败，可能是被别人抢了或者服务器挂了 :(");
		});
	};
    $scope.resolveBalloon = function(balloon) {
        $http.post('/api/contest/resolveballoon', {
			contestId: $scope.contestId,
            toId: balloon.to._id,
            shape: balloon.shape
        }).then(function(data) {
            $scope.fetch();
        }).catch(function(error) {
            console.error(error);
            $scope.fetch();
        });
    };
} ];

var contestCastCtrl = ['$scope', '$rootScope', '$state', '$stateParams', '$http', '$timeout', 'poll', function ($scope, $rootScope, $state, $stateParams, $http, $timeout, poll) {
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [
        ['$', '$'],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ['$$', '$$'],
        ["\\[", "\\]"]
      ],
      processEscapes: true
    },
    processSectionDelay: 0
  });
  $scope.generatePreview = async function () {

    $('#preview').html(marked($scope.words));
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'preview']);
    await $scope.update();
  };
  $scope.user = $rootScope.currentUser;
  $scope.contestId = $stateParams.contestId;
  $scope.words = ""
  $scope.update = async () => {
    $http.post('/api/contest/role', {
      contestId: $scope.contestId
    }).then(function (data) {
      $scope.myRole = data.data.role;
    });
    let casts = (await $http.post('/api/boardcast/getall', {
      contestId: $scope.contestId
    })).data.reverse();
    for (i in casts) {
      casts[i].html = await marked(casts[i].msg);
    }
    $scope.casts = casts;
  }
  $scope.$on('ngRepeatFinished', async function (ngRepeatFinishedEvent) {
    await MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'msg']);
  });
  $scope.update();
  $scope.submit = async () => {
    if ($scope.words.length < 1) {
      return;
    }
    await $http.post('/api/boardcast/submit', {
      msg: $scope.words,
      contestId: $scope.contestId
    })
    await $scope.update();
  };
  $scope.checkKey = function (e) {
    var keycode = window.event ? e.keyCode : e.which;
    if (keycode == 13) {
      $scope.send();
    }
  };
}];
var contestClarificationCtrl = ['$scope', '$rootScope', '$state', '$stateParams', '$http', '$timeout', 'poll', function ($scope, $rootScope, $state, $stateParams, $http, $timeout, poll) {
  $scope.contestId = $stateParams.contestId;
  $scope.to = [];
  if ($rootScope.to) {
    $scope.to.push($rootScope.to);
    delete $rootScope.to;
  }
  $scope.removeTo = function (i) {
    $scope.to = $scope.to.slice(0, i).concat($scope.to.slice(i + 1));
  };
  $scope.send = function () {
    var tasks = [];
    if ($scope.words.length < 1) {
      return;
    }
    if ($scope.sending) {
      return;
    }
    $scope.sending = true;
    if ($scope.to.length) {
      for (var i in $scope.to) {
        $scope.connection.send(JSON.stringify({
          contestId: $scope.contestId,
          from: $scope.currentUser._id,
          fromname: $scope.currentUser.realname,
          text: $scope.words,
          to: $scope.to[i]._id
        }));
      }
    } else {
      $scope.connection.send(JSON.stringify({
        contestId: $scope.contestId,
        from: $scope.currentUser._id,
        fromname: $scope.currentUser.realname,
        text: $scope.words
      }));
    }
    $scope.words = '';
    $scope.to = [];
    $scope.sending = false;
  };
  $scope.checkKey = function (e) {
    var keycode = window.event ? e.keyCode : e.which;
    if (keycode == 13) {
      $scope.send();
    }
  };
}];
var contestCodeplusCtrl = [ '$scope', '$state', '$stateParams', '$http', '$timeout', function($scope, $state, $stateParams, $http, $timeout) {
    $scope.contestId = $stateParams.contestId;
    console.log("codeplus_0");
    ($scope.fetch = function() {
	console.log("codeplus");
	
	$http.post('/api/contest/codeplusrank', {
	    contestId: $scope.contestId
	}).then(function(data) {

	    $scope.problems = data.data.problems;
	    $scope.res = data.data.data;

	    $scope.users = data.data.data;

	    for(var uid in $scope.users){
		for(var pid in $scope.users[uid].rec){
		    // $scope.users[uid].totalscore = $scope.users[uid].totalscore + $scope.users[uid].rec[pid].score;
		    date = new Date(parseInt($scope.users[uid].rec[pid].time));
		    var HH = parseInt($scope.users[uid].rec[pid].time/(1000*60*60));
		    var MM = parseInt(($scope.users[uid].rec[pid].time-HH*1000*60*60)/(1000*60))
		    var SS = parseInt(($scope.users[uid].rec[pid].time-HH*1000*60*60-MM*1000*60)/(1000))
		    // console.log(HH,MM,SS);
		    $scope.users[uid].rec[pid].time = String(HH)+":"+String(MM)+":"+SS;
		}
	    }

	    
	    function compare(a, b) {
		if(a.totalscore === 0 && b.totalscore === 0) return 0;
		if(a.totalscore < b.totalscore) return 1;
		if(b.totalscore < a.totalscore) return -1;
	    }

	    $scope.users.sort(compare);
	    
	    if ($scope.users.length > 0) {
		$scope.users[0].rank = 1;
		for (var i = 1; i < $scope.users.length; ++ i) {
		    if (compare($scope.users[i], $scope.users[i - 1]) == 0) {
			$scope.users[i].rank = $scope.users[i - 1].rank;
		    } else {
			$scope.users[i].rank = i + 1;
		    }
		}
	    }
	    console.log($scope.users);
			
	    /*
			if ($scope.users.length > 0) {
				$scope.users[0].rank = 1;
				for (var i = 1; i < $scope.users.length; ++ i) {
					if (compare($scope.users[i], $scope.users[i - 1]) == 0) {
						$scope.users[i].rank = $scope.users[i - 1].rank;
					} else {
						$scope.users[i].rank = i + 1;
					}
				}
			}
	    */
	}).catch(function(error) {
	    console.log(error);
	});
    })();
} ];

var contestCustestCtrl = [ '$scope', '$rootScope', '$state', '$stateParams', '$http', '$timeout', 'mjLoader', function($scope, $rootScope, $state, $stateParams, $http, $timeout, mjLoader) {
	$scope.contestId = $stateParams.contestId;
	$scope.submit = {};
	$scope.answers = [];
	$scope.problem = {
		maxAns: 3
	};
	$scope.addAnswer = function(file) {
		if (typeof(file) !== 'object') {
			return;
		}
		var reader = new FileReader;
		reader.onload = function() {
			var ret = {
				code: this.result,
				filename: file.name,
				size: file.size
			};
			$scope.applyAnswer(ret);
		};
		reader.readAsBinaryString(file);
	
	};
	$scope.removeAns = function(i) {
		$scope.answers = $scope.answers.slice(0, i).concat($scope.answers.slice(i + 1));
	};
	$scope.addAnswers = function() {
		var ele = document.getElementById('answer').files;
		for (var i in ele) {
			var file = ele[i];
			$scope.addAnswer(file);
		}
	};
	$scope.applyAnswer = function(ans) {
		if (typeof(ans) === 'object') {
			ans.num = $scope.answers.length;
			$scope.answers.size=ans.size;
			if (ans.filename.match(/\d*\.out/)) {
				ans.num = parseInt(ans.filename.split('.')[0]);
			}
			if ($scope.answers.length === $scope.problem.maxAns) {
				$scope.answers.shift();
			}
			$scope.answers.push(ans);
			$timeout(function() {
				$scope.answers = $scope.answers;
			}, 200);
		}
	};
	($scope.updateInfo = function() {
		$http.get('/staticdata/cus.config.default').then(function(data) {
			$scope.langs = data.data.langs;
			$scope.cases = data.data.cases;
			$scope.submit.lang = $scope.langs[0];
		});
		$http.post('/api/contest/submittable', {
			contestId: $scope.contestId,
		}).then(function(data) {
			$scope.submittable = true;
			mjLoader.waitId('answer', function() {
				document.getElementById('answer').onchange = $scope.addAnswers;
			});
		});
	})();
	($scope.fetch = function() {
		$http.post('/api/contest/custeststatus', {
			contestId: $scope.contestId,
			requestOwn: true,
			type: 'cus'
		}).then(function(data) {
			$scope.historys = data.data;
			$scope.historys.sort(function(a, b) {
				return b.submitted_time - a.submitted_time;
			});
		}).catch(function(error) {
			console.log(error);
		});
		$http.post('/api/contest/custestinque', {
			contestId: $scope.contestId,
		}).then(function(data) {
			$scope.submitMsg = '当前等待队列长度: ' + data.data;
		});
	})();
	$scope.submitCode = function() {
		if ($scope.answers.length === 0) {
			return alert('你没有选择答案文件');
		}
		var frm = {
			contestId: $scope.contestId,
			problemId: $scope.problemId,
			lang: $scope.submit.lang.name
		};
		for (var i in $scope.answers) {
			var ans = $scope.answers[i];
			frm['answer' + ans.num] = btoa(ans.code);
		}
		$http.post('/api/contest/custestcreate', frm).then(function(data) {
			$scope.fetch();
		}).catch(function(error) {
			console.log(error);
			alert(error.data);
		});
	};
} ];

var contestDetailCtrl = ['$scope', '$state', '$stateParams', '$http', '$timeout', 'mjLoader', 'poll', function ($scope, $state, $stateParams, $http, $timeout, mjLoader, poll) {
  $scope.contestId = $stateParams.contestId;
  $scope.runId = $stateParams.runId;
  $timeout(hljs.initHighlighting, 100);
  $scope.fetchAnswers = function () {
    $scope.answers = [];
    for (var i in $scope.rec.source_file) {
      (function (i) {
        $http.get('/staticdata/' + $scope.rec.source_file[i]).then(function (code) {
          $scope.answers.push({
            lang: $scope.rec.lang,
            code: code.data,
            num: i
          });
          (function (id) {
            mjLoader.waitHighlight(id);
          })('code' + i);
        });
      })(i);
    }
  };
  ($scope.fetch = function () {
    $http.post('/api/contest/status', {
      contestId: $scope.contestId,
      runId: $scope.runId,
      requestAnswer: true
    }).then(function (data) {
      $scope.rec = data.data[0];
      $scope.subtasks = data.data[0].subtasks;
      $scope.isOfSubtask = data.data[0].isOfSubtask;
      if (!$scope.rec.status) {
        $scope.rec.status = 'Invisible';
      }
      if ($scope.rec.status === 'Waiting' || $scope.rec.status.match(/^Running/) !== null) {
        poll.push($scope.fetch, 1, 'fetch');
      } else {
        poll.pull('fetch');
      }
      if (!$scope.answers) {
        $scope.fetchAnswers();
      }
    }).catch(function (error) {
      console.log(error);
    });
    $http.post('/api/contest/cases', {
      contestId: $scope.contestId,
      runId: $scope.runId,
    }).then(function (data) {
      $scope.cases = data.data;
      $scope.cases.sort(function (a, b) {
        return a.caseId - b.caseId;
      });
    }).catch(function (error) {
      console.log(error);
    });
  })();
  $scope.rejudge = function (_id) {
    $http.post('/api/contest/rejudge', {
      contestId: $scope.contestId,
      runId: _id
    }).then(function () {
      $scope.fetch();
    }).catch(function (error) {
      console.error(error);
    });
  };
}];
var contestHomeCtrl = ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'poll', function ($scope, $rootScope, $state, $stateParams, $http, poll) {
  $scope.contestId = $stateParams.contestId;
  ($scope.updateIsSetter = function () {
    $http.post('/api/contest/role', {
      contestId: $scope.contestId
    }).then(function (data) {
      if (data.data.role === 'setter' || data.data.role === 'master') $scope.isSetter = 1;
    });
  })();
  ($scope.updateInfo = function () {
    $http.post('/api/contest/info', {
      contestId: $scope.contestId
    }).then(function (data) {
      $scope.contest = data.data;
      $rootScope.activeContests[data.data._id] = data.data;
    }).catch(function (error) {
      $scope.contest = {
        title: error.data
      };
    });
  })();
  ($scope.updateProblems = function () {
    $http.post('/api/contest/content', {
      contestId: $scope.contestId
    }).then(function (data) {
      $scope.problems = data.data;
    }).catch(function (error) {
      $scope.problems = [{
        title: 'Invisible'
      }];
    });
  })();
}];

var contestIssueCtrl = ['$scope', '$rootScope', '$state', '$stateParams', '$http', '$timeout', 'poll', function ($scope, $rootScope, $state, $stateParams, $http, $timeout, poll) {
  //console.log($scope, $rootScope, $state, $stateParams, $http, $timeout, poll);
  $scope.user = $rootScope.currentUser;
  $scope.contestId = $stateParams.contestId;
 $scope.fastre = [
    ["请您仔细阅读题面", "题面"],
    ["请您仔细阅读公告", "公告"],
    ["请您仔细阅读题面和公告", "题面和公告"],
    ["您好，是的", "是"],
    ["您好，不是的", "不是"],
    ["抱歉，我不能理解您的问题", "不能理解"],
    ["请您说下您的评测编号", "评测"],
    ["您问的是哪道题", "问题"],
    ["很抱歉，我不能回答您","无可奉告"]
  ];
  $scope.update = async () => {
    
    $http.post('/api/contest/role', {
      contestId: $scope.contestId
    }).then(function (data) {
      $scope.myRole = data.data.role;
    });
    $scope.issues = (await $http.post('/api/issue/getall', {
      contestId: $scope.contestId
    })).data;
    $scope.issues.forEach(b => {
      b.last = b.messages[0].time;
      b.tagopen = b.open;
    });
    $scope.issues.sort((a, b) => {
      return (b.open - a.open) ? (b.open - a.open) : (b.last - a.last);
    })
  }
  $scope.update();
  $scope.close = async (issue) => {
    if ((await prompt("请确认该问题已经解决或者无法更深一步地解释，若是请输入yes")) == 'yes') {
      await $http.post('/api/issue/close', {
        issue: issue._id
      });
      await $scope.update();
    }
  };
  $scope.reply = async (issue) => {
    await $http.post('/api/issue/reply', {
      issue: issue._id,
      msg: issue.newmsg
    })
    await $scope.update();
  }
  $scope.submit = async () => {
    if ($scope.words.length < 1) {
      return;
    }
    await $http.post('/api/issue/submit', {
      msg: $scope.words,
      contestId: $scope.contestId
    })
    await $scope.update();
  };
  $scope.checkKey = function (e) {
    var keycode = window.event ? e.keyCode : e.which;
    if (keycode == 13) {
      $scope.send();
    }
  };
  $scope.checksecKey = function (e, issue) {
    var keycode = window.event ? e.keyCode : e.which;
    if (keycode == 13) {
      $scope.send();
    }
  };
}];

var contestNavCtrl = ['$scope', '$rootScope', '$state', '$stateParams', '$http', '$timeout', 'poll', function ($scope, $rootScope, $state, $stateParams, $http, $timeout, poll) {
  $scope.contestId = $stateParams.contestId;
  ($scope.updateIsSetter = function () {
    $http.post('/api/contest/role', {
      contestId: $scope.contestId
    }).then(function (data) {
      if (data.data.role === 'setter') {
        $scope.isSetter = 1;
      }
    });
  })();
  ($scope.fetchInfo = function () {
    $http.post('/api/contest/info', {
      contestId: $scope.contestId
    }).then(function (data) {
      $scope.contestInfo = data.data;
      if ($scope.contestInfo.func === 'register') {
        $state.go('register', {
          contestId: $scope.contestId
        });
      }
    }).catch(function (error) {
      console.error(error);
    });
  })();
  $http.post('/api/contest/role', {
    contestId: $scope.contestId
  }).then(function (data) {
    $scope.myRole = data.data.role;
  });
}];
var contestPlayerCtrl = [ '$scope', '$state', '$stateParams', '$http', '$timeout', function($scope, $state, $stateParams, $http, $timeout) {
	$scope.contestId = $stateParams.contestId;
	($scope.loadUsers = function() {
		$http.post('/api/contest/players', {
			contestId: $scope.contestId
		}).then(function(data) {
		    $scope.players = data.data;
		    $scope.player_count = 0;
		    for(var i in $scope.players) {
			console.log(i);
			console.log($scope.players[i]);
			if ($scope.players[i].role == "player"){
			    $scope.player_count += 1;
			}
		    }
		}).catch(function(error) {
			console.log(error);
		});
		$http.post('/api/contest/delays', {
			contestId: $scope.contestId
		}).then(function(data) {
			$scope.delays = data.data;
		}).catch(function(error) {
			console.log(error);
		});
	})();
	$scope.applyQuery = function(username, userId, role) {
		$http.post('/api/contest/modifyRole', {
			contestId: $scope.contestId,
			username: username, 
			userId: userId,
			role: role
		}).catch(function(error) {
			alert('Error modifing ' + username + ':\n' + error.data);
		});
	};
	$scope.addPlayer = function() {
		$scope.applyQuery($scope.addUserId, undefined, 'player');
		$timeout($scope.loadUsers, 100);
	};
	$scope.changeRole = function(player) {
		$scope.applyQuery(undefined, player.user._id, player.role);
		$timeout($scope.loadUsers, 100);
	};
	$scope.removeRole = function(player) {
		$scope.applyQuery(undefined, player.user._id, 'none');
		$timeout($scope.loadUsers, 100);
	};
	$scope.batchAdd = function() {
		var users = $scope.batchInput.split('\n');
		for (var i in users) {
			var username = users[i];
			if (typeof(username) === 'string' && username.match(/^\S+$/) !== null) {
				$scope.applyQuery(username, undefined, 'player');
			}
		}
		$timeout($scope.loadUsers, 100);
	}
	$scope.addDelay = function() {
		$http.post('/api/contest/delayupdate', {
			contestId: $scope.contestId,
			value: $scope.addDelayVal,
			username: $scope.addDelayUsername
		}).then(function() {
			$scope.loadUsers();
		}).catch(function(error) {
			alert(error.data);
		});
	};
	$scope.changeDelay = function(d) {
		$http.post('/api/contest/delayupdate', {
			contestId: $scope.contestId,
			value: d.value,
			userId: d.user._id
		}).then(function() {
			$scope.loadUsers();
		}).catch(function(error) {
			alert(error.data);
		});
	};
} ];



var contestPrintCtrl = [ '$scope', '$rootScope', '$state', '$stateParams', '$http', '$timeout', 'mjLoader', function($scope, $rootScope, $state, $stateParams, $http, $timeout, mjLoader) {
	mjLoader.init();
	$scope.preview = function() {
		mjLoader.render($scope.descriptionText, '#preview');
	};
	$scope.print = function() {
		var frm={
			conTent:$scope.descriptionText
		};
		$http.post('/api/print/print', frm).then(function(data) {
			console.log(data);
			alert('提交成功，志愿者君会尽快为您送到喵>_<');
		}).catch(function(error) {
			console.log(error);
			alert(error.data);
		});
	};
}];

// From http://www.webtoolkit.info/
var Base64 = {
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    // public method for encoding
    encode : function (input) {
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;
	input = Base64._utf8_encode(input);
	while (i < input.length) {
	    chr1 = input.charCodeAt(i++);
	    chr2 = input.charCodeAt(i++);
	    chr3 = input.charCodeAt(i++);
	    enc1 = chr1 >> 2;
	    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	    enc4 = chr3 & 63;
	    if (isNaN(chr2)) {
		enc3 = enc4 = 64;
	    } else if (isNaN(chr3)) {
		enc4 = 64;
	    }
	    output = output +
		this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
		this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
	}
	return output;
    },
    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
	string = string.replace(/\r\n/g,"\n");
	var utftext = "";
	for (var n = 0; n < string.length; n++) {
	    var c = string.charCodeAt(n);
	    if (c < 128) {
		utftext += String.fromCharCode(c);
	    }
	    else if((c > 127) && (c < 2048)) {
		utftext += String.fromCharCode((c >> 6) | 192);
		utftext += String.fromCharCode((c & 63) | 128);
	    }
	    else {
		utftext += String.fromCharCode((c >> 12) | 224);
		utftext += String.fromCharCode(((c >> 6) & 63) | 128);
		utftext += String.fromCharCode((c & 63) | 128);
	    }
	}
	return utftext;
    },
}


var contestProblemCtrl = [ '$scope', '$rootScope', '$state', '$stateParams', '$http', '$timeout', 'mjLoader', function($scope, $rootScope, $state, $stateParams, $http, $timeout, mjLoader) {
    mjLoader.init();
    $scope.contestId = $stateParams.contestId;
    $scope.problemId = $stateParams.problemId;
    if ($scope.problemId == '-1') {
	return $state.go('contest.custest', {
	    contestId: $scope.contestId
	});
    }
    $scope.ansProblem = 1;
    $scope.lastSubmitTime = -1;
    $scope.problem = {
	maxAns: 1
    };
    $scope.renderDescription = function(content) {
	mjLoader.render(content, '#problemtext');
    };
    $scope.fetchData = function() {
	$http.get('/staticdata/' + $scope.problem.token + '.description').then(function(data) {
	    $scope.renderDescription(data.data);
	    $scope.needReload = false;
	}).catch(function(data) {
	    $scope.needReload = true;
	});
	$http.get('/staticdata/' + $scope.problem.token + '.config').then(function(data) {
	    
	    $scope.langs = data.data.langs;
	    $scope.submit.lang = $scope.langs[0];
	    
	    $scope.cases = data.data.cases;
	    $scope.subtasks = data.data.subtasks;
	    $scope.submit.level = $scope.subtasks[0];

	    // console.log($scope.submit.level);
	    $scope.problem.maxAns = 0;
	    $scope.ansProblem = false;
	    if ($scope.langs[0].name === 'answer'){
		$scope.ansProblem = true;
	    }
	    for (var i in $scope.cases) {
		var tId = parseInt($scope.cases[i].ansId) + 1;
		if ($scope.problem.maxAns < tId) {
		    $scope.problem.maxAns = tId;
		}
	    }
	}).catch(function(data) {
	});
    };
    ($scope.updateProblem = function() {
	$http.post('/api/contest/problemconf', {
	    contestId: $scope.contestId,
	    problemId: $scope.problemId
	}).then(function(data) {
	    $scope.problem.title = data.data.title;
	    $scope.problem.token = data.data.description;
	    $scope.fetchData();
	}).catch(function(error) {
	    $scope.needReload = true;
	});
	$http.post('/api/contest/submittable', {
	    contestId: $scope.contestId,
	}).then(function(data) {
	    $scope.submittable = true;
	});
	$http.post('/api/contest/submitleft', {
	    contestId: $scope.contestId,
	    problemId: $scope.problemId,
	}).then(function(data) {
	    $scope.submitLeft = data.data.count;
	});
    })();
    ($scope.fetchHistory = function() {
	$http.post('/api/contest/status', {
	    contestId: $scope.contestId,
	    problem_id: $scope.problemId,
	    requestOwn: true
	}).then(function(data) {
	    $scope.historys = data.data;
	    var fv = -1;
	    for (var i in $scope.historys) {
		if ($scope.historys[i].status === undefined) {
		    $scope.historys[i].status = 'Invisible';
		}
		const ignoreList = [ 'Compilation Error', 'Creating' ];
		if (ignoreList.indexOf($scope.historys[i].status) === -1 && (fv === -1 || $scope.historys[fv].submitted_time < $scope.historys[i].submitted_time)) {
		    fv = i;
		}
	    }
	    if (fv !== -1) {
		$scope.historys[fv].isFinal = true;
	    }
	    $scope.historys.sort(function(a, b) {
		return a.submitted_time - b.submitted_time;
	    });
	    $.extend( true, $.fn.dataTable.defaults, {
		"bLengthChange": false,
		"bFilter": false,
		"bInfo": false,
		"bAutoWidth": false,
		"searching": false,
		"ordering": true
	    } );
	    $timeout(function() {
		$('#abcd').dataTable({"pagingType": "numbers","order": [[ 0, "desc" ]]});
	    },100);
	}).catch(function(error) {
	    console.log(error);
	});
    })();
    // Setup editor
    $scope.submit = { };
    $scope.setupEditor = function() {
	var editor = ace.edit('editor');
	editor.setTheme('ace/theme/eclipse');
	$scope.$watch('submit.lang', function() {
	    if($scope.submit.lang && $scope.submit.lang.editor)
		editor.getSession().setMode('ace/mode/' + $scope.submit.lang.editor);
	    else
		editor.getSession().setMode('ace/mode/plain_text');
	});

	var wrapper = document.getElementById('editor-wrapper');
	wrapper.addEventListener('dragover', function(e) {
	    if(e.dataTransfer.types.length === 1 && e.dataTransfer.types[0] === 'Files')
		e.preventDefault();
	});

	wrapper.addEventListener('dragenter', function(e) {
	    if(e.dataTransfer.types.length === 1 && e.dataTransfer.types[0] === 'Files')
		$scope.waitingDrop = true;
	});

	wrapper.addEventListener('dragleave', function(e) {
	    if(e.target.id === 'editor-drop-indicator')
		$scope.waitingDrop = false;
	});

	wrapper.addEventListener('drop', function(e) {
	    var dt = e.dataTransfer;
	    var flag = false;
	    $scope.waitingDrop = false;
	    if(dt.items) {
		for(var i = 0; i<dt.items.length; i++)
		    if(dt.items[i].kind === 'file') {
			var reader = new FileReader();

			reader.onload = function(e) {
			    $scope.editor.setValue(e.target.result, 1);
			};

			reader.readAsText(dt.items[i].getAsFile());

			flag = true;
			break;
		    }
	    } else {
		if(dt.files.length > 0) {
		    var reader = new FileReader();

		    reader.onload = function(e) {
			$scope.editor.setValue(e.target.result, 1);
		    };

		    reader.readAsText(dt.files[0].getAsFile());

		    flag = true;
		}
	    }

	    if(flag)
		e.preventDefault();
	});

	$scope.editor = editor;
    };
    $scope.uploadAnswer = function() {
	document.getElementById('answer-reader').click();
    }
    $scope.readAnswer = function() {
	var elem = document.getElementById('answer-reader');
	var reader = new FileReader();
	var file = elem.files[0];
	reader.onload = function(e) {
	    $scope.editor.setValue(e.target.result, 1);
	};
	reader.readAsText(file);

	// Reset
	document.getElementById('answer-reader-form').reset();
    }
    $scope.submitCode = function() {
	// Only a single file is supported now
	var timestamp = Date.parse(new Date());
	if($scope.lastSubmitTime + 10 > timestamp){
	    return alert("time between two submits is too short(at least 10s)");
	}
	$scope.lastSubmitTime = timestamp;
	var frm = {
	    contestId: $scope.contestId,
	    problemId: $scope.problemId,
	    lang: $scope.submit.lang.name,
	    level: 0,
	    answer0: Base64.encode($scope.editor.getValue()),
	};
	//console.log($scope.contestInfo);
	if ($scope.submit.level && $scope.contestInfo.opts.indexOf("codeplusBoard") !== -1 ) {
	    frm.level = $scope.submit.level.subtaskId;
	}
	//console.log(frm);
	$http.post('/api/contest/submit', frm).then(function(data) {
	    $state.go('contest.status', {
		contestId: $scope.contestId,
	    });
	}).catch(function(error) {
	    console.log(error);
	    alert(error.data);
	});
    };
    $scope.removeAns = function(i) {
	$scope.answers = $scope.answers.slice(0, i).concat($scope.answers.slice(i + 1));
    };

    // for submit Answers Problem

    $scope.A_contestId = $stateParams.contestId;
    $scope.A_answers = [];
    $scope.A_problem = {
	maxAns: 50
    };
    $scope.A_addAnswer = function(file) {
	if (typeof(file) !== 'object') {
	    return;
	}
	var A_reader = new FileReader;
	A_reader.onload = function() {
	    var ret = {
		code: this.result,
		filename: file.name,
		size: file.size
	    };
	    $scope.A_applyAnswer(ret);
	};
	A_reader.readAsBinaryString(file);

    };
    $scope.A_removeAns = function(i) {
	$scope.A_answers = $scope.A_answers.slice(0, i).concat($scope.A_answers.slice(i + 1));
    };
    $scope.A_addAnswers = function() {
	var ele = document.getElementById('A_answer').files;
	for (var i in ele) {
	    var file = ele[i];
	    $scope.A_addAnswer(file);
	}
    };
    $scope.A_applyAnswer = function(ans) {
	if (typeof(ans) === 'object') {
	    ans.num = $scope.A_answers.length;
	    $scope.A_answers.size=ans.size;
	    if (ans.filename.match(/\d*\.out/)) {
		ans.num = parseInt(ans.filename.split('.')[0]);
	    }
	    if ($scope.A_answers.length === $scope.A_problem.maxAns) {
		$scope.A_answers.shift();
	    }
	    $scope.A_answers.push(ans);
	    $timeout(function() {
		$scope.A_answers = $scope.A_answers;
	    }, 200);
	}
    };

    $scope.A_submitCode = function() {
	if ($scope.A_answers.length === 0) {
	    return alert('你没有选择答案文件');
	}
	var frm = {
	    contestId: $scope.contestId,
	    problemId: $scope.problemId,
	    lang: $scope.submit.lang.name,
	};

	for (var i in $scope.A_answers) {
	    var ans = $scope.A_answers[i];
	    frm['answer' + ans.num] = btoa(ans.code);
	}
	$http.post('/api/contest/submit', frm).then(function(data) {
	    $state.go('contest.status', {
		contestId: $scope.contestId,
	    });
	}).catch(function(error) {
	    console.log(error);
	    alert(error.data);
	});

    };

} ];


var contestRanklistCtrl = ['$scope', '$state', '$stateParams', '$http', '$timeout', function ($scope, $state, $stateParams, $http, $timeout) {
  $scope.contestId = $stateParams.contestId;
  ($scope.fetch = function () {
    $http.post('/api/contest/ranklist', {
      contestId: $scope.contestId
    }).then(function (data) {
      $scope.problems = data.data.problems;
      $scope.double_problems = ([...Array((data.data.problems.length) * 2).keys()]);
      $scope.users = data.data.list;
      $scope.users.sort(function (a, b) {
        return b.total_score - a.total_score;
      });
      if ($scope.users.length > 0) {
        $scope.users[0].rank = 1;
        for (var i = 1; i < $scope.users.length; ++i) {
          if ($scope.users[i].total_score === $scope.users[i - 1].total_score) {
            $scope.users[i].rank = $scope.users[i - 1].rank;
          } else {
            $scope.users[i].rank = i + 1;
          }
        }
      }
    }).catch(function (error) {
      console.log(error);
    });
  })();
}];
var contestStatusCtrl = [ '$scope', '$state', '$stateParams', '$http', '$timeout', 'poll', function($scope, $state, $stateParams, $http, $timeout, poll) {
	$scope.contestId = $stateParams.contestId;
	($scope.fetch = function(idLimit, append) {
		$scope.nomore = false;
		var attr = {
			contestId: $scope.contestId,
			type: 'formal'
		};
		if (idLimit !== undefined) {
			attr.runId = JSON.stringify({
				$lt: idLimit
			});
		}
		if ($scope.myRole === 'player') {
			attr.requestOwn = true;
		}
		$http.post('/api/contest/status', attr).then(function(data) {
			if (data.data.length === 0) {
				$scope.nomore = true;
			}
			if (append) {
				$scope.historys = $scope.historys.concat(data.data);
			} else {
				$scope.historys = data.data;
			}
            var hasRunning = false;
			for (var i in $scope.historys) {
				if ($scope.historys[i].status === undefined) {
					$scope.historys[i].status = 'Invisible';
				}
                if ($scope.historys[i].status === 'Waiting' || $scope.historys[i].status.match(/^Running/)) {
                    hasRunning = true;
                }
			}
            if (hasRunning) {
                poll.push($scope.fetch, 1, 'fetch');
            } else {
                poll.pull('fetch');
            }
			$scope.historys.sort(function(a, b) {
				return b.submitted_time - a.submitted_time;
			});
		}).catch(function(error) {
			console.log(error);
		});
	})();
	$scope.rejudge = function(_id) {
		$http.post('/api/contest/rejudge', {
			runId: _id,
			contestId: $scope.contestId,
		}).then(function() {
			$scope.fetch();
			poll.pull('fetch');
		}).catch(function(error) {
			console.error(error);
		});
	};
	$scope.loadMore = function() {
		var lastId = undefined;
		if ($scope.historys.length) {
			lastId = $scope.historys[$scope.historys.length - 1]._id;
		}
		$scope.fetch(lastId, true);
	};
} ];


var contestListCtrl = [ '$scope', '$state', '$http', '$timeout', function($scope, $state, $http, $timeout) {
	$scope.list = [];
	$scope.type = $state.current.name;
    $scope.obj = ($scope.type === 'contestlist.register') ? 'register' : 'contest';
	($scope.updateList = function() {
		$http.post('/api/' + $scope.obj + '/list').then(function(data) {
			$scope.list = data.data;
			$scope.list.sort(function(a, b) {
				return b.start_time - a.start_time;
			});
		}).catch(function(error) {
		});
	})();

	$scope.addContest = function() {
		$http.post('/api/' + $scope.obj + '/create').then(function(data) {
			$scope.updateList();
		}).catch(function(error) {
			alert(error.data);
		});
	};
} ];

var docViewCtrl = [ '$scope', '$rootScope', '$state', '$stateParams','$http', function($scope, $rootScope, $state, $stateParams, $http) {
	$scope.docId = $stateParams.docId;
	MathJax.Hub.Config({ 
		tex2jax: { 
			inlineMath: [ ['$','$'], ["\\(","\\)"] ], 
			processEscapes: true 
		},
		processSectionDelay: 0
	});
	$scope.generatePreview = function() {
		$('#preview').html($scope.descriptionText);
		MathJax.Callback.Queue([ 'Typeset', MathJax.Hub, 'preview' ], function() {
			var text = $('#preview').html();
			var newText = marked(text);
			$('#preview').html(newText);
		});
	};
	($scope.downloadDoc = function() {
		$http.get('/staticdata/' + $scope.docId + '.doc.static').then(function(data) {
			$scope.descriptionText = data.data;
			$scope.generatePreview();
		}).catch(function(error) {
			$scope.descriptionText = '没有此文档';
		});
	})();
} ];


var homeCtrl = [ '$scope', '$rootScope', '$state', '$stateParams', '$http', 'poll', function($scope, $rootScope, $state, $stateParams, $http, poll) {
	($scope.downloadDoc = function() {
		$http.get('/staticdata/homepage.doc.static').then(function(data) {
			$('#preview').html(marked(data.data));
		}).catch(function(error) {
			$('#preview').html('missing');
		});
	})();
} ];


var registerGrantCtrl = [ '$scope', '$rootScope', '$state', '$stateParams', '$http', 'poll', function($scope, $rootScope, $state, $stateParams, $http, poll) {
	$scope.contestId = $stateParams.contestId;
    $scope.priority = [ 'applying', 'pending', 'outstander', 'playerd' ];
    $scope.counts = {};
	var incCounter = function(obj, key) {
		if (obj[key] === undefined) {
			obj[key] = 1;
		} else {
			++ obj[key];
		}
	};
	const displayedRoles = [ 'playerd', 'applying', 'pending', 'outstander' ];
    ($scope.loadUsers = function() {
		$http.post('/api/register/players', {
			contestId: $scope.contestId
		}).then(function(data) {
			$scope.players = [];
			$scope.sglplayers = [];
            $scope.counts = {};
            $scope.school = {};
            $scope.gender = {};
            for (var j in data.data) {
                if (data.data[j].hint) {
                    var i = $scope.players.length;
                    $scope.players.push(JSON.parse(data.data[j].hint));
                    $scope.players[i].role = data.data[j].role;
                    if (data.data[j].role === 'player') {
                        $scope.players[i].role = 'playerd';
                    }
					if (displayedRoles.indexOf($scope.players[i].role) === -1) {
						continue;
					}
					incCounter($scope.counts, $scope.players[i].role);
					incCounter($scope.school, $scope.players[i].school);
                    if ($scope.players[i].remarks) {
						try {
							$scope.players[i].members = JSON.parse($scope.players[i].remarks);
						} catch(error) {
							$scope.players[i].members = [];
						}
                        var tmpML = [];
                        for (var k in $scope.players[i].members) {
                            tmpML.push($scope.players[i].members[k].realname);
							incCounter($scope.gender, $scope.players[i].members[k].gender);
                            $scope.players[i].members[k].teamname = $scope.players[i].realname + ' (' + $scope.players[i].nickname + ')';
                            $scope.players[i].members[k].honorr = $scope.players[i].members[k].honor.replace(/\n/g, '; ');
                            $scope.players[i].members[k].isFinal = $scope.players[i].isFinal;;
                            $scope.sglplayers.push($scope.players[i].members[k]);
						}
                        $scope.players[i].memberNames = tmpML.join(',');
                    } else {
                        $scope.players[i].members = [];
                    }
                }
            }
            $scope.players.sort(function(a, b) {
				if ($scope.priority.indexOf(a.role) !== $scope.priority.indexOf(b.role)) {
					return $scope.priority.indexOf(a.role) - $scope.priority.indexOf(b.role);
				} else if ((a.lastSend === undefined) !== (b.lastSend === undefined)) {
					if (a.lastSend === undefined) {
						return -1;
					} else {
						return 1;
					}
				} else if (a.isFinal !== b.isFinal) {
					if (a.isFinal) {
						return -1;
					} else {
                        return 1;
                    }
				} else if (a.school !== b.school) {
                    if (a.school < b.school) {
						return -1;
                    } else {
                        return 1;
                    }
				} else {
                    return a._id - b._id;
                }
			});
		}).catch(function(error) {
			console.log(error);
		});
    })();
	$scope.updating = {};
	$scope.sendMail = function(username, userId, user) {
		$scope.updating[userId] = true;
		$http.post('/api/register/sendMail', {
			contestId: $scope.contestId,
            userId: userId,
        }).then(function() {
			user.lastSend = Date.now();
			$scope.commitChange(user);
			$scope.updating[userId] = false;
		}).catch(function(error) {
			alert('Error sending email to ' + userId + ':\n' + error.data);
			$scope.updating[userId] = false;
        });
	};
    $scope.changeRole = function(username, userId, role) {
		$scope.updating[userId] = true;
        $http.post('/api/register/modifyRole', {
            contestId: $scope.contestId,
            userId: userId,
            role: role
        }).then(function() {
            $scope.loadUsers();
			$scope.updating[userId] = false;
		}).catch(function(error) {
			alert('Error modifing ' + userId + ':\n' + error.data);
			$scope.updating[userId] = false;
        });
    };
    $scope.commitChange = function(player) {
        var uploadForm = {
            _id: player._id,
            username: player.username,
            realname: player.realname,
            nickname: player.nickname,
            school: player.school,
            type: player.type,
            isFinal: player.isFinal,
            remarks: JSON.stringify(player.members),
			lastSend: player.lastSend
        };
        $http.post('/api/register/changeHint', {
            contestId: $scope.contestId,
            userId: player._id,
            hint: JSON.stringify(uploadForm)
        }).then(function(data) {
        }).catch(function(error) {
            alert('Error changing team ' + player._id);
            $scope.loadUsers();
        });
    };
	$scope.changeError = function(player, attr) {
        if ($rootScope.isError(player[attr])) {
            player[attr] = player[attr].replace(/ \(rejected\)$/, '');
        } else {
            player[attr] += ' (rejected)';
        }
        $scope.commitChange(player);
	};
    $scope.changeMemberError = function(player, member, attr) {
        if ($rootScope.isError(member[attr])) {
            member[attr] = member[attr].replace(/ \(rejected\)$/, '');
        } else {
            member[attr] += ' (rejected)';
        }
        $scope.commitChange(player);
    };
	$scope.sendMessage = function(player) {
		$rootScope.to = player;
		$state.go('register.clarification', {
			contestId: $scope.contestId
		});
	};
} ];

var registerNavCtrl = [ '$scope', '$rootScope', '$state', '$stateParams','$http', '$timeout', 'poll', function($scope, $rootScope, $state, $stateParams, $http, $timeout, poll) {
	$scope.contestId = $stateParams.contestId;
    ($scope.fetchInfo = function() {
        $http.post('/api/register/info', {
            contestId: $scope.contestId
        }).then(function(data) {
            $scope.contestInfo = data.data;
			if ($state.current.name === 'register.post') {
				$('#content').html(marked($scope.contestInfo.dashboard));
			}
			if ($scope.contestInfo.func === 'contest') {
				$state.go('contest', {
					contestId: contestId
				});
			}
        }).catch(function(error) {
            console.error(error);
        });
    })();
	($scope.fetchRole = function() { 
		$http.post('/api/register/role', {
			contestId: $scope.contestId
		}).then(function(data) {
			$scope.myRole = data.data;
		});
	})();
	poll.push(($scope.fetchClari = function() {
		$http.post('/api/contest/clarinew', {
			contestId: $scope.contestId
		}).then(function(data) {
			if (data.data.length > 0 && !$rootScope.isRoot) {
				var info = '新消息:\n';
				for (var i in data.data) {
					info += data.data[i].from.realname + ': ' + data.data[i].text + '\n';
				}
				alert(info);
				$scope.interval = 10;
			} else if ($scope.interval < 60) {
				++ $scope.interval;
				poll.delay('newClari');
			}
		}).catch(function(error) {
			console.log(error.data);
		});
	}), $scope.interval, 'newClari');
} ];


var registerPostCtrl = [ '$scope', '$rootScope', '$state', '$stateParams', '$http', 'poll', function($scope, $rootScope, $state, $stateParams, $http, poll) {
    $scope.contestId = $stateParams.contestId;
    poll.push(function() {
        if ($scope.contestInfo) {
            if ($('#content').html() === '') {
                $('#content').html(marked($scope.contestInfo.dashboard));
            }
            poll.pull('loaddash');
        }
    }, 1, 'loaddash');
} ];

var registerRegisterCtrl = [ '$scope', '$rootScope', '$state', '$stateParams', '$http', '$timeout', function($scope, $rootScope, $state, $stateParams, $http, $timeout) {
	$scope.contestId = $stateParams.contestId;
	$rootScope.jumpback = {
		stateName: $state.current.name,
		contestId: $scope.contestId
	};
	$timeout(($scope.fetchInfo = function() {
		if (!$rootScope.currentUser) {
			return;
		}
		$http.post('/api/register/teaminfo', {
			contestId: $scope.contestId,
		}).then(function(data) {
			$scope.info = data.data;
			if ($scope.info.remarks) {
				$scope.members = JSON.parse($scope.info.remarks);
			}
			$scope.disableEdit = true;
		}).catch(function(error) {
			console.error(error);
		});
	}), $rootScope.currentUser ? 0 : 300);
	$scope.enroll = function() {
		if ($rootScope.currentUser) {
			$http.post('/api/register/register', {
				contestId: $scope.contestId,
			}).then(function(data) {
				$scope.fetchRole();
				$scope.fetchInfo();
				alert("succeeded");
			}).catch(function(error) {
				alert(error.data);
			});
		} else {
			$state.go('user.registerteam');
		}
	};
} ];



var userEditinfoCtrl = [ '$scope', '$rootScope', '$http', '$timeout', 'poll', function($scope, $rootScope, $http, $timeout, poll) {
	$scope.info = {
		username: $rootScope.currentUser.username,
		realname: $rootScope.currentUser.realname,
		school: $rootScope.currentUser.school,
		nickname: $rootScope.currentUser.nickname,
		remarks: $rootScope.currentUser.remarks,
        isFinal: $rootScope.currentUser.isFinal
	};
/*	$rootScope.leftWid = 8;
	$rootScope.rightWid = 4;
	$rootScope.changeLR = function() {
		$rootScope.leftWid ^= (8 ^ 12);
		$rootScope.rightWid ^= (4 ^ 12);
	};
	$rootScope.activeContests = {};
	$rootScope.user = {};*/
	$scope.submit = function() {
		$http.post('/api/user/editinfo', $scope.info).then(function(data) {
			$rootScope.currentUser = $scope.info;
			alert("Succeeded");
			$rootScope.currentUser.nickname;
			$rootScope.currentUser.remarks;
		}).catch(function(error) {
			alert(error.data.error || error.data);
		});
		$rootScope.loadUserInfo();
	};
} ];


var userEditpasswordCtrl = [ '$scope', '$rootScope', '$http', '$timeout', 'poll', function($scope, $rootScope, $http, $timeout, poll) {
	$scope.info = {
		username: $rootScope.currentUser.username,
		password: '',
		newpassword: '',
		repassword: '',
	};
	$scope.submit = function() {
		if ($scope.info.newpassword !== $scope.info.repassword){
			alert("Re-entered password does not match.");
			return;
		}
		$http.post('/api/user/editpassword', $scope.info).then(function(data) {
			alert("Succeeded");
			$rootScope.authLogout();
		}).catch(function(error) {
//			alert('yjqakctsc');
/*			if (error.data === 'Old password does not match'){
				$scope.info.oldpassword += ' (rejected)';
				alert('旧密码错误！');
			}
			else*/
			if (error.data.error === 'User info error'){
				$scope.info.newpassword += ' (rejected)';
				alert('新密码不合法！');
			}
			else{
				alert(error.data);
				console.error(error.data);
			}
//			alert(error.data);
		});
	};
} ];


var userEditteamCtrl = [ '$scope', '$rootScope', '$state', '$stateParams', '$http', '$timeout', 'poll', function($scope, $rootScope, $state, $stateParams, $http, $timeout, poll) {
	$timeout(function() {
		$scope.info = {
			username: $rootScope.currentUser.username,
			realname: $rootScope.currentUser.realname,
			school: $rootScope.currentUser.school,
			nickname: $rootScope.currentUser.nickname,
			remarks: $rootScope.currentUser.remarks,
			isFinal: $rootScope.currentUser.isFinal,
			type: $rootScope.currentUser.type,
		};
		$scope.members = JSON.parse($scope.info.remarks);
	}, $rootScope.currentUser ? 0 : 100);
    $scope.syncSchool = function() {
        for (var i in $scope.members) {
            $scope.members[i].school = $scope.info.school;
        }
    };
	$scope.submit = function() {
		$scope.info.remarks = JSON.stringify($scope.members);
		$http.post('/api/user/editinfo', $scope.info).then(function(data) {
			$rootScope.currentUser = $scope.info;
			$rootScope.currentUser.nickname;
			$rootScope.currentUser.remarks;
			$rootScope.loadUserInfo();
            if ($rootScope.jumpback) {
				var t = $rootScope.jumpback;
				$rootScope.jumpback = null;
                $state.go('register.register', {
                    contestId: t.contestId
                }, {
                    reload: true
                });
            } else {
                $state.go('home');
            }
		}).catch(function(error) {
			if (error.data === 'Cn teamname exist'){
				$scope.info.realname += ' (rejected)';
				alert('中文队名重复！');
			}
			else if (error.data === 'En teamname exist'){
				$scope.info.nickname += ' (rejected)';
				alert('英文队名重复！');
			}
			else if (error.data.error === 'Team info error' || error.data.error === 'User info error') {
				for (var i in error.data.contents) {
					$scope.info[error.data.contents[i]] += ' (rejected)';
				}
				alert('请修改被标红的信息');
			} else if (error.data.error === 'Member info error') {
				for (var i in error.data.contents) {
					$scope.members[error.data.member][error.data.contents[i]] += ' (rejected)';
				}
				alert('请修改被标红的队伍成员信息');
			} else {
				console.error(error.data);
			}
		});
		$rootScope.loadUserInfo();
	};
} ];


var userRegisterCtrl = [ '$scope', '$rootScope', '$state', '$http', '$timeout', 'poll', function($scope, $rootScope, $state, $http, $timeout, poll) {
	$scope.init = function () {
			$scope.info = {
				username: '',
				password: '',
				repassword: '',
				realname: '',
				school: '',
				nickname: '',
				remarks: '',
				type: 'SinglePlayer',
			};
			$scope.invitecode = '';
	};
	$scope.init();
	$scope.submit = function() {
		$scope.info.invitecode = $scope.invitecode;
		if ($scope.info.username.length === 0){
			alert("Please enter your username.");
			return;
		}
		if ($scope.info.password.length < 6){
			alert("Password should contain at least 6 characters.");
			return;
		}
		if ($scope.info.password !== $scope.info.repassword){
//			alert($scope.info.password+' | '+$scope.info.repassword);
			alert("Re-entered password does not match.");
			return;
		}
		$http.post('/api/user/register', $scope.info).then(function(data) {
			$scope.init();
            $state.go('home');
		}).catch(function(error) {
			if (typeof(error.data) === 'string') {
				alert(error.data);
			} else if (error.data.error === 'Team info error' || error.data.error === 'User info error') {
				for (var i in error.data.contents) {
					$scope.info[error.data.contents[i]] += ' (rejected)';
				}
				alert('请修改被标红的信息');
			} else {
				console.error(error.data);
			}

		});
	};
} ];


var userRegisterteamCtrl = [ '$scope', '$rootScope', '$state', '$http', '$timeout', 'poll', function($scope, $rootScope, $state, $http, $timeout, poll) {
	$scope.init = function() {
		$scope.info = {
			username: '',
			password: '',
			repassword: '',
			realname: '',
			school: '',
			nickname: '',
			remarks: '[{},{},{}]',
			type: 'Team',
            isFinal: ''
        };
		$scope.members = [{},{},{}];
	};
	$scope.init();
    $scope.syncSchool = function() {
        for (var i in $scope.members) {
            $scope.members[i].school = $scope.info.school;
        }
    };
	$scope.submit = function() {
		if ($scope.info.username.length === 0){
			alert("Please enter your username.");
			return;
		}
		if ($scope.info.password.length < 6){
			alert("Password should contain at least 6 characters.");
			return;
		}
		if ($scope.info.password !== $scope.info.repassword){
			alert("Re-entered password does not match.");
			return;
		}
		if ($scope.members.length < 2){
			alert("One team should contain at least 2 members.");
			return;
		}
		if ($scope.members.length > 3){
			alert("One team could contain at most 3 members.");
			return;
		}
		$scope.info.remarks = JSON.stringify($scope.members);
		$http.post('/api/user/register', $scope.info).then(function(data) {
			var login = {
				username: $scope.info.username,
				password: $scope.info.password
			};
			$scope.init();
			if ($rootScope.jumpback) {
				var t = $rootScope.jumpback;
				$rootScope.jumpback = null;
				$http.post('/api/user/login', login).then(function(data) {
					$rootScope.username = $rootScope.login.username;
					$rootScope.loadUserInfo();
					$state.go('register.register', {
						contestId: t.contestId
					}, {
						reload: true
					});
				}).catch(function(error) {
					alert(error.data);
				});
			} else {
				$state.go('home');
			}
		}).catch(function(error) {
			if (error.data === 'User exists'){
				$scope.info.username += ' (rejected)';
				alert('用户名重复！');
			}
			else if (error.data === 'Cn teamname exist'){
				$scope.info.realname += ' (rejected)';
				alert('中文队名重复！');
			}
			else if (error.data === 'En teamname exist'){
				$scope.info.nickname += ' (rejected)';
				alert('英文队名重复！');
			}
			else if (error.data.error === 'Team info error' || error.data.error === 'User info error') {
				for (var i in error.data.contents) {
					$scope.info[error.data.contents[i]] += ' (rejected)';
				}
				alert('请修改被标红的信息');
			} else if (error.data.error === 'Member info error') {
				for (var i in error.data.contents) {
					$scope.members[error.data.member][error.data.contents[i]] += ' (rejected)';
				}
				alert('请修改被标红的队伍成员信息');
			} else {
				console.error(error.data);
			}
		});
	};
} ];

