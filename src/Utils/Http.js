import Config from './Config'

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from './NavigationService';
import { Alert } from 'react-native';


export const get = (url, data, header = "global" ) => {
	
	console.log('getMyHeader**************', getHeaders(header, url))
	return new Promise((resolve, reject) => {
		
		let apiBaseUrl = `${Config.baseURL}${url}`;
		axios.get(apiBaseUrl, {
			params: data,
			headers: getHeaders(header, url),
			// headers: header === "global" ? getHeaders(header, url) : header,
			//headers: { "Authorization": "Bearer eyJraWQiOiIrWXFnYm9cL1N3eFFTVkRNWTF0N3JNRTBkSkQzbWZmRjF6cktVb25zSHBSVT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NTNiN2Y4ZC01NTI3LTQxZWQtOTdmNC03MDJhYjVhMWNmOGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfRTdMMlBVbTlNIiwiY29nbml0bzp1c2VybmFtZSI6ImFkbWluQHZhbGlkLml0Iiwib3JpZ2luX2p0aSI6ImM3NzRiZjRmLTFmNTctNGIyNC1iNTY0LTQwODVhZTk5NDYyZiIsImF1ZCI6IjZxaDk4cXVydjczdXNrb2Uxa3RsMjZocmoyIiwiZXZlbnRfaWQiOiI3OGRmZmQwNy1mY2FjLTRhNTktYjBmNy01ZWRkMDMxYzVhZDMiLCJ0b2tlbl91c2UiOiJpZCIsImN1c3RvbTp1c2VyX2RldGFpbHMiOiJ7XCJ1c2VyX2lkXCI6IDF9IiwiYXV0aF90aW1lIjoxNjQ5MzM1NjY5LCJleHAiOjE2NDk0MjIwNjksImlhdCI6MTY0OTMzNTY2OSwianRpIjoiZjcwOTU5MGEtZDdjMS00MmUzLWJhMzAtZTM1ZTJiMmRkZTJkIiwiZW1haWwiOiJhZG1pbkB2YWxpZC5pdCJ9.Cqi_Vcq39phvCq_quaQ9vnx-173bqgixBVhLoJVR2M06D-DtAHDiZDFbxro3ZdXnUJ5gS5Jdm_yeOzDleaPgBU4SFmjQ6CSdXBb0TEEj8j5G0wPLcvM7dJsDHdY0ucx79QjPqCfY9y6aaPhpS_al-xYIANbZWoti9f2jHEBoSPCDJ_SHMVB9io5OoU90Db76LsWRFWs8C1w_7WKu7zlKGVvBph62wA04l-8dx2mQzKgsuQWCsr2Fm5p7Rmw7WSqElsmXL1G-hjBF7ipE7-Rm7_YuVnN8Kpq5wCn77KImPjImHBMQ6n1s0jlbotigv4CcFoYRIz4kk_A9sPm1fEJdsw" }
		}).then((response) => {
			//console.log("response====>111111111111111111111111",response)
			resolve(response);
		}).catch((error) => {
			// console.log("error====>get methods error",error)
			// errorHandlingBlock(error)
			if(error?.response?.data?.status === 406){
				NavigationService.navigate('Login')
			}
			// UserStore.removeToken()
			console.log("Alert!",error?.response?.data?.message)
			reject(error);
		})
	});
}
export const post = (url, data, header = "global" ) => {
	return new Promise((resolve, reject) => {
		let apiBaseUrl = `${Config.baseURL}${url}`;
		axios.post(apiBaseUrl, data, {headers: {'Content-Type': 'application/json'}}).then((response) => {
			resolve(response);
		}).catch((error) => {
			// errorHandlingBlock(error)
			reject(error);
		})
	});
}
export const patch = (url, data, header = "global") => {
	return new Promise((resolve, reject) => {
		let apiBaseUrl = `${Config.baseURL}${url}`;
		axios.patch(apiBaseUrl, data, { headers: getHeaders(header, url) }).then((response) => {
			resolve(response);
		}).catch((error) => {
			errorHandlingBlock(error)
			reject(error);
		})
	});
}
export const put = (url, data, header = "global") => {
	return new Promise((resolve, reject) => {
		let apiBaseUrl = `${Config.baseURL}${url}`;
		axios.put(apiBaseUrl, data, { headers: getHeaders(header, url) }).then((response) => {
			resolve(response);
		}).catch((error) => {
			errorHandlingBlock(error)
			reject(error);
		})
	});
}
export const del = (url, data, header = "global") => {

	//console.log("header===============del",header)

	return new Promise((resolve, reject) => {
		let apiBaseUrl = `${Config.baseURL}${url}`;
		axios.delete(apiBaseUrl, {
			data: data,
			// headers: getHeaders(header, url),
			// headers: getHeaders(header, url),
		}).then((response) => {
			resolve(response);
		}).catch((error) => {
			errorHandlingBlock(error)
			reject(error);
		})
	});
}

export const download = (url, data, header = "global") => {
	return new Promise((resolve, reject) => {
		let apiBaseUrl = `${Config.baseURL}${url}`;
		axios.get(apiBaseUrl, {
			params: data,
			headers: getHeaders(header, url),
			responseType: 'arraybuffer'
		}).then((response) => {
			resolve(response);
		}).catch((error) => {
			errorHandlingBlock(error)
			reject(error);
		})
	});
}

export const getTokenStorage = (value)=>{
	
	  return new Promise(async function(resolve, reject) {
		//console.log(user);
		var token;
		
		try {
			const jsonValue = await AsyncStorage.getItem(value)
			let tempToken =  jsonValue != null ? JSON.parse(jsonValue) : null
			token = tempToken.idToken;
			
		  } catch(e) {
			// read error
		  }
		resolve({token});
		});
}



export const getHeaders = (header, path = "") => {
	
	//console.log("localStorage.setItem('i18nextLng'",localStorage.getItem('i18nextLng'))
	// checkExpiryOfToken()
	let headers = {};
	// headers['language'] = localStorage.getItem('i18nextLng');
	if (header == null) {
		// headers['language'] = localStorage.getItem('i18nextLng');
	} else if (header == "global") {

		// var tempTokenData = UserStore.userToken
        // var tokenData = JSON.parse(tempTokenData)
		// // if token is Null
		// 	if(tokenData === null){
		// 		NavigationService.navigate('Login')
		// 	}
		// 	// checking Token is Expired
		// 	checkExpiryOfToken();
		// 	// console.log("Store.default.getState().LoginReducer.token===>", tokenData)
		// 	if(tokenData?.idToken === undefined){ NavigationService.navigate('Login'); return false; }

		// 	headers["Authorization"] = `${tokenData?.tokenType} ${tokenData?.idToken}`;
		
		//headers["Access-Control-Allow-Origin"] = "*"
	}
	//  else if (Object.keys(header).length > 0) {
	// 	if (path == `${Config.extendedUrl}users/userforcepasswordchange`) {
	// 		Object.keys(header).map((key, idx) => {
	// 			headers[key] = header[key];
	// 		})
	// 	} else if (path == `${Config.extendedUrlAuth}users/singout`) {
	// 		// localStorage.setItem('i18nextLng', 'en');
	// 		headers["Authorization"] = Store.default.getState().LoginReducer.token;
	// 		headers["Accesstoken"] = Store.default.getState().LoginReducer.accessToken;
	// 	} else if (path == `${Config.extendedUrlAuth}users/changepassword`) {
	// 		headers["Authorization"] = Store.default.getState().LoginReducer.token;
	// 		headers["Accesstoken"] = Store.default.getState().LoginReducer.accessToken;
	// 	}
	// }
	else{
		headers = header
	}
	// console.log('Token------', headers)

	return headers
};

export const checkExpiryOfToken = () => {
	let currentDateTime = new Date();
	//console.log("currentDateTimecurrentDateTime==>", currentDateTime)
	//console.log("expiryTimeexpiryTimeexpiryTime==>", Store.default.getState().LoginReducer)

	// Store.default.getState().LoginReducer.expiresIn.expiryInterval = 10
	// Store.default.getState().LoginReducer.expiresIn.expiryTime = moment(Store.default.getState().LoginReducer.expiresIn.loggedInTime).add(10, 'seconds').format('YYYY-MM-DDTHH:mm:ssZ')

	// const expiryTime = new Date(Store.default.getState().LoginReducer.expiresIn.expiryTime)
	// const loggedInTime = new Date(Store.default.getState().LoginReducer.expiresIn.loggedInTime)
	// const expiryInterval = Store.default.getState().LoginReducer.expiresIn.expiryInterval

	// /*console.log("currentDateTime===>", currentDateTime)
	// console.log("expiryTime===========>", expiryTime)
	// console.log("loggedInTime===========>", loggedInTime)
	// console.log("expiryInterval===========>", expiryInterval)*/
	// if (expiryTime != "") {
	// 	//console.log("Store.default.getState().LoginReducer==>", Store.default.getState().LoginReducer)
	// 	//let deltaDifference = ((expiryTime == "" ? 0 : expiryTime) - (loggedInTime == "" ? 0 : loggedInTime)) / 1000
	// 	let deltaDifference = ((currentDateTime == "" ? 0 : currentDateTime) - (loggedInTime == "" ? 0 : loggedInTime)) / 1000
	// 	//console.log("deltaDifference===>", deltaDifference)
	// 	if (currentDateTime >= expiryTime && (deltaDifference <= expiryInterval)) {
	// 		refershToken()
	// 	}
	// }
	// var tokenData = UserStore.userToken
	// var isLogin = UserStore.isLogin

	// if(tokenData === null || isLogin === null){ NavigationService.navigate('Login') }
	// var expiryNitTime = tokenData?.expiresIn
	// // remove 15 minutes
	// var expiryTime = (expiryNitTime - 900)
	// var loginDate = UserStore.isLogin?.loginDate
	// var expDate = Math.round(loginDate+expiryTime)
	// if(expDate > Math.round(Date.now()/1000)){
	// 	// refershToken();
	// 	console.log(expDate, Math.round(Date.now()/1000))
	// }
	// console.log('------'+expDate, Math.round(Date.now()/1000))

};
export const refershToken = async() => {
	//console.log("Call refershToken===============>>>")
	
	// var tempTokenData = await UserStore.userToken
    //     var tokenData = JSON.parse(tempTokenData)

	if(tokenData === null){ NavigationService.navigate('Login'); await AsyncStorage.removeItem('userToken')
	await AsyncStorage.removeItem('isLogin') }
	let res = new Promise((resolve, reject) => {
		let header = {};
		header["Authorization"] = tokenData?.idToken;
		let apiBaseUrl = `${Config.baseURL}${Config.extendedUrl}users/refreshtoken`;
		let data = {}
		data["refreshToken"] = tokenData?.refreshToken;
		//console.log("refreshToken=========data",refreshToken)
		axios.patch(apiBaseUrl, data, { headers: header }).then((response) => {
			resolve(response);
		}).catch(async(error) => {
			//console.log("error=============", error)
			// logoutApp()
			//reject(error);
			await AsyncStorage.removeItem('userToken')
            await AsyncStorage.removeItem('isLogin')
			NavigationService.navigate('Login')
		})
	});
	res.then((result) => {
		//console.log("result===>", result.data)
		let finalResponse = result.data
		if (finalResponse.success) {
			// const finalIdToken = finalResponse.data.tokenType + ' ' + finalResponse.data.idToken;
			// const accessToken = finalResponse.data.accessToken
			// const expiresIn = LoginUtility.getExpiryDetails(finalResponse.data.expiresIn)
			// Store.default.dispatch({
			// 	type: LoginActionTypes.SET_TOKEN,
			// 	payload: finalIdToken
			// });
			// Store.default.dispatch({
			// 	type: LoginActionTypes.SET_ACCESS_TOKEN,
			// 	payload: accessToken
			// });
			// Store.default.dispatch({
			// 	type: LoginActionTypes.SET_TOKEN_EXPIRE_TIME,
			// 	payload: expiresIn
			// });
			UserStore.setUserToken(finalResponse.data);
		} else {
			//Utility.toastNotifications(finalResponse.message, "Error", "error")
			// Utility.toastNotifications("Session Expired", "Error", "error")
			// logoutApp()
			NavigationService.navigate('Login')
		}
	})

};
export const logoutApp = async() => {
	//console.log("logout")
	// localStorage.setItem('i18nextLng', 'en');
	// const history = createHashHistory();
	var tempTokenData = await UserStore.userToken
        var tokenData = JSON.parse(tempTokenData)

	if(tokenData === null){ NavigationService.navigate('Login'); await AsyncStorage.removeItem('userToken')
	await AsyncStorage.removeItem('isLogin') }

	let logoutRes = new Promise((resolve, reject) => {
		let header = {};
		header["Authorization"] = tokenData?.idToken;
		header["Accesstoken"] = tokenData?.idToken;
		let apiBaseUrl = `${Config.baseURL}${Config.extendedUrlAuth}users/singout`;
		axios.delete(apiBaseUrl, {
			data: {},
			headers: header
		}).then((response) => {
			resolve(response);
		}).catch((error) => {
			//errorHandlingBlock(error)
			reject(error);
		})
	});
	// Store.default.dispatch({
	// 	type: LoginActionTypes.LOGOUT,
	// 	payload: { "token": "", "accessToken": "", "refreshToken": "", "expiresIn": { "loggedInTime": "", "expiryTime": "", "expiryInterval": "" }, "userCredentials": {}, "roleWisePermission": {} }
	// });
	// Store.default.dispatch({
	// 	type: AllActionTypes.CLEAR_DATA,
	// 	payload: { "loaderState": false, "leftbar": false, "activeLink": { 'accName': "", 'activeClass': "" }, "roleWisePermission": {} }
	// });

	// history.push("/")
	NavigationService.navigate('Login')
}
export const errorHandlingBlock = (error) => {
	/*console.log("error", error)
	console.log(error.message);
	console.log(error.status);*/

	if (error.response) {
		/*Store.default.dispatch({
		  type: AllActionTypes.LOADER_STATE_FALSE,
		  payload: false
		})*/
		// Request made and server responded
		/*console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.message);
		console.log(error.response.data.message);*/
		//console.log(error.response.headers);
		if (error.response.status == 401) {
			//Utility.toastNotifications(error.response.data.message, "Error", "error")
			//{"message":"The incoming token has expired"}
			if (error.response.data.message == "The incoming token has expired") {
				Utility.toastNotifications("Session Expired", "Error", "error")
			}
			logoutApp()
		} else if (error.response.data) {
			//Utility.toastNotifications(error.response.data.message, "Error", "error")
		}
	} else {
		Utility.toastNotifications(error.message, "Error", "error")
	}
}
export const setToken = (value) => {
	Store.default.dispatch({
		type: LoginActionTypes.SET_TOKEN,
		payload: value
	})
};
