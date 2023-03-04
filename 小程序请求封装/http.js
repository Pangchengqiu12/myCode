import {
	IP,
	TIMEOUT
} from "@/common/util/config.js"
import {
	showToast
} from "@/common/util/index.js"
let count = 0;
const request = ({
	method,
	url,
	param
}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: IP + url,
			method,
			data: param,
			header: {
				"Authorization": `Bearer ${uni.getStorageSync("token")}` || ''
			},
			timeout: TIMEOUT,
			success: (res) => {
				if (res.statusCode != 200) {

				};
				let {
					data,
					data: {
						code,
						msg
					}
				} = res;
				if (code === 200) {
					resolve(data);
				} else if (code === 401) {
					uni.hideLoading();
					//需要登陆
					if(count === 0){
						count++;
						uni.showModal({
							title: "提示",
							content: "当前用户未授权登陆，请前往授权页进行登陆",
							success: (res) => {
								if (res.confirm) {
									//跳转至授权页面
									count = 0
									uni.reLaunch({
										url: "/pages/authorization/index"
									})
								} else {
									count = 0
									uni.reLaunch({
										url: "/pages/index/index"
									})
								}
							}
						});
					}
				} else if (code === 500) {
					uni.hideLoading();
					//业务错误
					showToast("error", msg);
					reject(data);
				}
			},
			fail: (error) => {
				let {
					errMsg
				} = error;
				uni.hideLoading();
				if (errMsg === "request:fail 超时") {
					showToast("error", "网络请求超时");
					reject("timeout");
				} else if (errMsg === "request:fail HTTP错误") {
					showToast("error", "请检查网络");
					reject("newwork");
				}
			}
		});
	});
};

export function $post(url, param) {
	return request({
		method: "POST",
		url,
		param
	});
};

export function $get(url, param) {
	return request({
		method: "GET",
		url,
		param
	});
};
