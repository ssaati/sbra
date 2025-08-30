import { fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

export const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL + '/api/v1';
// Custom HTTP client to add Authorization header
const httpClient = (url: string, options: RequestInit = {}) => {
    options.headers = new Headers(options.headers || { Accept: "application/json" });

    const token = localStorage.getItem("token");
    if (token) {
        (options.headers as Headers).set("Authorization", `Bearer ${token}`);
    }

    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(API_BASE_URL, httpClient);

export default {
    ...dataProvider, // Spread the existing CRUD methods
    results: async (formId) => {
        const { json } = await httpClient(`${API_BASE_URL}/results/list?formId=${formId}`);
        return json;
        // return fetch(`${API_URL}/results/list?formId=${formId}`, {
        //     method: 'GET',
        // }).then(response => response.json());
    },
    resultItems: async (form, field, query) => {
        const { json } = await httpClient(`${API_BASE_URL}/result-items?form=${form}&field=${field}&query=${query}`);
        return json;
    },
    myForm: async (formId) => {
        const { json } = await httpClient(`${API_BASE_URL}/forms/my/${formId}`);
        return json;
        // return fetch(`${API_URL}/results/list?formId=${formId}`, {
        //     method: 'GET',
        // }).then(response => response.json());
    },
    up: async (formStepId) => {
        const { json } = await httpClient(`${API_BASE_URL}/formsteps/${formStepId}/up`);
        return json;
    },
    down: async (formStepId) => {
        const { json } = await httpClient(`${API_BASE_URL}/formsteps/${formStepId}/down`);
        return json;
    },
    // upload: async (params) => {
    //     const formData = new FormData();
    //     formData.append("file", params.data.file.rawFile); // rawFile is the actual File object
    //
    //     const token = localStorage.getItem("authToken"); // or however you store it
    //
    //     const response = await fetch(`${API_BASE_URL}/upload`, {
    //         method: "POST",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //         body: formData,
    //     });
    //
    //     const result = await response.json();
    //     return { data: result };
    // },
    baseInfos: async (categoryId, parentId, query) => {
        let filter = encodeURIComponent(`{"categoryId":${categoryId},"parentId":${parentId?parentId:null},"query":"${query}"}`);
        let sort = encodeURIComponent(`["name","DESC"]`);
        let range = encodeURIComponent(`[0,20]`);
        const { json } = await httpClient(`${API_BASE_URL}/baseinfo?filter=${filter}&sort=${sort}&range=${range}`);
        return json;
    },
    getBaseInfos: (categoryId, parentId, params) => {
        const url = parentId
            ? `/api/categories/${categoryId}/baseinfos?parentId=${parentId}`
            : `/api/categories/${categoryId}/baseinfos`;

        return httpClient(url).then(({ json }) => ({
            data: json.content,
            total: json.totalElements,
        }));
    },
    getChildBaseInfos: (parentId, params) => {
        const url = `/api/baseinfo/${parentId}/children`;
        return httpClient(url).then(({ json }) => ({
            data: json.content,
            total: json.totalElements,
        }));
    },
};
// export default dataProvider;
