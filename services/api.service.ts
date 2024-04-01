import Cookies from "js-cookie";
import { apiEndPoints } from "./api-endpoints";

export const sendOtp = async (msisdn: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const url = apiEndPoints.sendOtp;
  const raw = JSON.stringify({
    Phone: `88${msisdn}`,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(url, requestOptions);
    return response.json();
  } catch (err) {
    return false;
  }
};

export const verifyOtp = async (otp: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const url = apiEndPoints.verifyOtp;
  const raw = JSON.stringify({
    Phone: `88${Cookies.get("msisdn")}`,
    Otp: otp,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(url, requestOptions);
    return response.json();
  } catch (err) {
    return false;
  }
};

export const bkashPaymentApi = async (id: any, amount: any) => {
  const myHeaders = new Headers();
  const userToken = Cookies.get("accessToken");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const url = `${apiEndPoints.bkashPayment}`;

  var raw = JSON.stringify({
    amount: parseInt(amount),
    course_id: parseInt(id),
    promo_code: "WEEWEE",
    source: "aPP",
    description: "QQQQQQQQQQQQQQQQQQQQQQ",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  try {
    const response = await fetch(url, requestOptions);
    return response.json();
  } catch (err) {
    return false;
  }
};

export const updateProfile = async (payloadData: any) => {
  const myHeaders = new Headers();
  const userToken = Cookies.get("accessToken");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${userToken}`);

  const url = apiEndPoints.updateProfile;

  var raw = JSON.stringify({
    name: payloadData.name,
    email: payloadData.email,
    address: payloadData.address,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(url, requestOptions);
    return response.json();
  } catch (err) {
    return false;
  }
};

// export const subscriptionPack = async (id: any) => {
//   const defaultToken =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjgyMCIsInJvbGUiOjEsImlhdCI6MTY2NTc0NjIyNX0.dSY47sipaGTI_OtsysFWw_kaKZKWHWRtp4vklstVgVc";
//   const userToken = Cookies.get("token")
//     ? Cookies.get("token")
//     : defaultToken;

//   const myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = `${apiEndPoints.packDetailsApi}${id}`;
//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const unSubscribeUserApi = async (subscription_id: any) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = `${apiEndPoints.unSubscribeApi}?userId=${Cookies.get(
//     "id"
//   )}&subscriptionid=${subscription_id}`;

//   const requestOptions = {
//     method: "DELETE",
//     headers: myHeaders,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const postFavoritesApi = async (id: any) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = apiEndPoints.favPostApi;
//   const raw = JSON.stringify({
//     user_id: Cookies.get("id"),
//     audiobook_id: id,
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const deleteFavoritesApi = async (id: any) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = `${
//     apiEndPoints.favDeleteApi
//   }?audiobook_id=${id}&user_id=${Cookies.get("id")}`;

//   const requestOptions = {
//     method: "DELETE",
//     headers: myHeaders,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const postVerifyOtp = async (otp: any) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = apiEndPoints.verifyOtp;
//   const raw = JSON.stringify({
//     msisdn: `88${Cookies.get("msisdn")}`,
//     password: otp,
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const postSendOtp = async (msisdn: any) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = apiEndPoints.sendOtp;
//   const currentTimeLong = Date.now();
//   const raw = JSON.stringify({
//     msisdn: `88${msisdn}`,
//     currentTimeLong: currentTimeLong,
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const postLoginApi = async () => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = apiEndPoints.loginApi;
//   const raw = JSON.stringify({
//     user_name: `88${Cookies.get("msisdn")}`,
//     full_name: "user",
//     auth_src: "phone",
//     image_url: null,
//     channel: "web",
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const postReview = async (id: any, rating_num: any, review: any) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = `${apiEndPoints.addReview}${id}/analytics/ratings`;
//   const raw = JSON.stringify({
//     rating: rating_num,
//     review: review,
//     user_id: Cookies.get("id"),
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const postSearch = async (search_text: any) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = apiEndPoints.searchApi;
//   const raw = JSON.stringify({
//     text: search_text,
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const postBookRequest = async (
//   user_name: any,
//   bookname: any,
//   writer: any,
//   language: any,
//   category: any
// ) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = apiEndPoints.bookRequestPostApi;
//   const raw = JSON.stringify({
//     name: user_name,
//     bookname: bookname,
//     writer: writer,
//     language: language,
//     category: category,
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const updateProfile = async (payloadData: any) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = `${apiEndPoints.updateProfile}${Cookies.get("id")}`;

//   var raw = JSON.stringify({
//     full_name: payloadData.full_name,
//     phone_email: `88${Cookies.get("msisdn")}`,
//     city_name: payloadData.city_name,
//     address: payloadData.address,
//     post_code: payloadData.post_code,
//   });
//   const requestOptions = {
//     method: "PUT",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const bkashPostApi = async (payloadData: any) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = `${apiEndPoints.bkashPaymentApi}`;
//   let eDate = new Date().setDate(new Date().getDate() + 730);
//   let firstPrice =
//     payloadData.rawPrice -
//     (payloadData?.reduce_price ? payloadData.reduce_price : 0);
//   var raw = JSON.stringify({
//     AMOUNT: payloadData.rawPrice?.toString(),
//     FIRSTPAYMENTAMOUNT: firstPrice.toString(),
//     CURRENCY: "BDT",
//     FREQUENCY: payloadData.frequency,
//     STARTDATE: new Date().toISOString().slice(0, 10),
//     EXPIRYDATE: new Date(eDate).toISOString().slice(0, 10),
//     USERID: Cookies.get("id"),
//     PACKAGEID: payloadData.subscriptionItemId,
//     subscripRequestFrom: "web",
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const nagadPostApi = async (payloadData: any) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = `${apiEndPoints.nagadPaymentApi}`;
//   let firstPrice =
//     payloadData?.rawPrice -
//     (payloadData?.reduce_price ? payloadData.reduce_price : 0);
//   var raw = JSON.stringify({
//     amount: firstPrice.toString(),
//     userId: Cookies.get("id"),
//     packageId: payloadData?.subscriptionItemId,
//     from_channel: "web",
//     from_source: "web",
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const upayPostApi = async (payloadData: any) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = `${apiEndPoints.upayPaymentApi}`;
//   let firstPrice =
//     payloadData?.rawPrice -
//     (payloadData?.reduce_price ? payloadData.reduce_price : 0);
//   var raw = JSON.stringify({
//     amount: firstPrice.toString(),
//     userId: Cookies.get("id"),
//     packageId: payloadData?.subscriptionItemId,
//     from_channel: "web",
//     from_source: "web",
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const postEpisodePlayCountApi = async (id: any) => {
//   const myHeaders = new Headers();
//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = `${apiEndPoints.episodePlayCount}${id}/analytics/play-counts-episode?id=${id}`;

//   const raw = JSON.stringify({
//     userId: Cookies.get("id"),
//     fromChannel: "web",
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const postAudiobookPlayCountApi = async (id: any) => {
//   const myHeaders = new Headers();
//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = `${apiEndPoints.audioBookPlayCount}${id}/analytics/play-counts?id=${id}`;

//   const raw = JSON.stringify({
//     userId: Cookies.get("id"),
//     fromChannel: "web",
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const getPromoCodeApi = async (pack_id: any, promo_id: any) => {
//   const myHeaders = new Headers();

//   const userToken = Cookies.get("token");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   myHeaders.append("Content-Type", "application/json");

//   const url = `${
//     apiEndPoints.promoCodeGet
//   }for_package=${pack_id}&user_id=${Cookies.get("id")}&promocode=${promo_id}`;

//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const redeemCodePostApi = async (redeemCode: any) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const userToken = Cookies.get("token");
//   const userId = Cookies.get("id");

//   myHeaders.append("Authorization", `Bearer ${userToken}`);
//   const url = apiEndPoints.redeemCodeApi;
//   var raw = JSON.stringify({
//     code: redeemCode,
//     userId: userId,
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const postGoogleLogin = async (token_id: any) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const url = apiEndPoints.postGooglAuth;
//   var raw = JSON.stringify({
//     token: token_id,
//     channel: "web",
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };

// export const accountDeletion = async (
//   userName: any,
//   phoneNo: any,
//   userEmail: any,
//   reason: any
// ) => {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const url = apiEndPoints.accountDelete;

//   const raw = JSON.stringify({
//     name: userName,
//     phone: phoneNo,
//     email: userEmail,
//     reason: reason,
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     return response.json();
//   } catch (err) {
//     return false;
//   }
// };
