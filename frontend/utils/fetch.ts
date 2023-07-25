import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_HOST || "localhost";
const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL || "http";

const fetch = axios.create({
    baseURL: `${PROTOCOL}://${HOST}`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
    },
});

const bankApi = async (method: string, endpoint: string, body = {}, localStorage: any): Promise<any> => {
    fetch.request({
        headers: {
            Authorization: JSON.parse(localStorage as string).token,
        },
        method,
        url: endpoint,
        data: body,
    }).then((response) => {
        return response;
    });
}

export default bankApi;