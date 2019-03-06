/**
 * 基金数据接口: https://www.showapi.com/api/view/902/2, 注册后可免费获取
 * 运行需要angular环境
 */

angular.
module('fundApp').
component('fundCalculate', {
	templateUrl: 'fund-calculate/fund-calculate.template.html',
	controller: function($scope, $http) {
		alert('start');

		function formatterDateTime() {
			var today = new Date();
			today.toLocaleDateString();
			var date = today;
			var month = date.getMonth() + 1;
			var datetime = date.getFullYear() +
				'' // '年'
				+
				(month >= 10 ? month : '0' + month) +
				'' // '月'
				+
				(date.getDate() < 10 ? '0' + date.getDate() : date
					.getDate()) +
				'' +
				(date.getHours() < 10 ? '0' + date.getHours() : date
					.getHours()) +
				'' +
				(date.getMinutes() < 10 ? '0' + date.getMinutes() : date
					.getMinutes()) +
				'' +
				(date.getSeconds() < 10 ? '0' + date.getSeconds() : date
					.getSeconds());
			return datetime;
		}
		formatterDateTime();

		var array0 = new Array();    // 基金名称
		var array1 = new Array();    // 基金代码
		var array2 = new Array();    // 基金份额
 		array0[0] = '易方达消费行业股票';
 		array1[0] = '110022';
 		array2[0] = 4231.64;
		var i = 0;
		var cnt = 0;

		$scope.getData = function() {
			var time = formatterDateTime();
			if(time.substring(8) < '145500') {		// 设置允许查询的时间
				alert('不要早于14.50');
				return;
			}
			if (i >= array0.length) {
				console.log(cnt.toFixed(2));
				alert(cnt.toFixed(2));
				return;
			}
			$http({
				method: 'post',
				url: 'http://route.showapi.com/902-2',
				params: ({
					'showapi_timestamp': time,
					'showapi_appid': 1234, //这里需要改成自己的appid
					'showapi_sign': 'abcd', //这里需要改成自己的应用的密钥secret
					'fundCode': array1[i]
				})
			}).then(function success(response) {
				var result = response.data.showapi_res_body.data;
				//console.log(result);
				var startPrice = result[0].value;
				var endPrice = result[result.length - 1].value;
				var increase = (endPrice - startPrice) / (startPrice);
				console.log(array0[i]);
				console.log('今日涨幅' + (increase * 100).toFixed(2) + '%');
				var earnings = array2[i] * (endPrice - startPrice);
				console.log('今日收益' + earnings.toFixed(2));
				cnt += earnings;
				i++;
				$scope.getData();
			}, function error() {
				alert('error');
				i++;
				$scope.getData();
			});
		}
		$scope.getData();
	}
});
