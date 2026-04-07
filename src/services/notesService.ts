import { use } from "react";
import type { Token } from "../models/Token";
import type { UserLogin } from "../models/User";
import type { CreateNoteRequest } from "../models/CreateNoteRequest";
import type { CreateNoteResponse } from "../models/CreateNoteResponse";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const API_BASE_URL = "http://localhost:8080/";

export type ApiRequestError = {
  status: number;
  message: string;
};


function setAccesToken(token: string){
  localStorage.setItem("access_token", token);
}

export async function login(user: UserLogin) {
  const response = await fetch(`${API_BASE_URL}api/v1/auth/login`, {      //url + options{...}
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
// let token = "";

  const response = await fetch(`${API_BASE_URL}api/v1/notes`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json; charset=utf-8",
      "X-Requested-With" : "XMLHttpRequest",
      Authorization: `Bearer ${token}`,
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

export async function createNote(note: CreateNoteRequest): Promise<CreateNoteResponse>{

  let token = localStorage.getItem("acess_token");
  const response = await fetch(`${API_BASE_URL}api/v1/notes`, {
  method: "POST",
  headers: {"Content-Type" : "application/json; charset=utf-8",
      "X-Requested-With" : "XMLHttpRequest",
      Authorization: `Bearer ${token}`
    }
  });

  if(!response.ok){
    let data = await response.text();

    let error: ApiRequestError={
      status: response.status,
      message: data,
    }
    throw error;
  }

  return await response.json();
}