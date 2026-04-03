import { use } from "react";
import type { Token } from "../models/Token";
import type { UserLogin } from "../models/User";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const API_BASE_URL = "http://localhost:8080/swagger/index.html/";

export type ApiRequestError = {
  status: number;
  message: string;
};


function setAccesToken(token: string){
  localStorage.setItem("access_token", token);
}

export async function login(user: UserLogin) {
  const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {   //.ok implies the status [metadata], not the body of the response
    let data = await response.text();
   
    let error:ApiRequestError={
        status:response.status,     //isn't status coming as 'string' from the endpoint??? NO - this is the metadata (protocol-level)
        message:data,             //this is the response body
    }
    throw error;
  }


  // return await response.json(); //

  let data = await response.json();
  setAccesToken(data.token);

  console.log(data.token);
  
  return data;
}


export async function getNotes(){

let token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json; charset=utf-8",
      "X-Requested-With" : "XMLHttpRequest",
      Authorization: `Bearer${token}`,
    },
  });

  if (!response.ok){
    let data = await response.text();

    let error: ApiRequestError={
      status: response.status,
      message: data,
    }
    throw error;
  }
  

  return await response.json();
}