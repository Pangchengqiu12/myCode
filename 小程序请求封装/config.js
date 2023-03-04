export const IP = (() => {
	if (process.env.NODE_ENV === 'development') {
		// return "http://192.168.31.143:8080/";
		return 'http://192.168.31.211:8080/'
		// return 'https://feed.asrobot.cn/mobile/';
		// return 'https://weiji.weipeta.cn/'
		// return 'https://feed.weipeta.com/mobile/';
	} else {
		console.log('生产环境');
		// return 'https://feed.asrobot.cn/mobile/';
		// return 'https://feed.weipeta.com/mobile/';
	}
})();

export const WSSIP = (() => {
	if (process.env.NODE_ENV === 'development') {
		return 'ws://192.168.31.211:8080/'
		// return "ws://192.168.31.143:8080/";
		// return 'wss://feed.asrobot.cn/';
		// return 'wss://feed.weipeta.com/';
	} else {
		console.log('生产环境');
		return 'wss://feed.asrobot.cn/';
		// return 'wss://feed.weipeta.com/';
	}
})();

export const TIMEOUT = 5000;

export const IMGIP = 'https://feed20221206.oss-cn-hangzhou.aliyuncs.com/'; //图片ip
