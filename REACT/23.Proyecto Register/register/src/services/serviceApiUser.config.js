import axios from "axios";

const APIHeaders = {
    Accept: "application/json",
    "Content-type": "application/json",
    "Acces-Control-Allow-Origin": "*",
    Authorization: `Bearer ${""}`,
};

export const APIuser = axios.create({
    baseURL: `http://localhost:8080/api/v1`,
    headers: APIHeaders,
    timeout: 600000,
});