import { apiEndPoints } from "./api-endpoints";
import { cookies } from "next/headers";

export async function homeListData() {
  try {
    const response = await fetch(apiEndPoints.homedata, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (err) {
    return false;
  }
}

export const courseDetails = async (id: any) => {
  const userToken = cookies().get("accessToken")?.value
    ? cookies().get("accessToken")?.value
    : "";

  try {
    const response = await fetch(apiEndPoints.courseDetail + `${id}`, {
      cache: "no-store",
      headers: {
        method: "GET",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (err) {
    return false;
  }
};

export const courseDetailsWithOutLogin = async (id: any) => {
  const userToken = cookies().get("accessToken")?.value
    ? cookies().get("accessToken")?.value
    : "";

  try {
    const response = await fetch(apiEndPoints.courseDetailTokenFree + `${id}`, {
      cache: "no-store",
      headers: {
        method: "GET",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (err) {
    return false;
  }
};

export const enrolledCourseApi = async () => {
  const userToken = cookies().get("accessToken")?.value;

  try {
    const response = await fetch(apiEndPoints.enrolledCourse, {
      cache: "no-store",
      headers: {
        method: "GET",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (err) {
    return false;
  }
};

export async function popularApi() {
  try {
    const response = await fetch(apiEndPoints.popularCourse, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (err) {
    return false;
  }
}

export async function categoryApi() {
  try {
    const response = await fetch(apiEndPoints.category, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (err) {
    return false;
  }
}

export const categroyListApi = async (id: any) => {
  try {
    const response = await fetch(apiEndPoints.categoryList + `${id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (err) {
    return false;
  }
};

export const profileApi = async () => {
  const userToken = cookies().get("accessToken")?.value;
  try {
    const response = await fetch(apiEndPoints.profile, {
      cache: "no-store",
      headers: {
        method: "GET",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (err) {
    return false;
  }
};