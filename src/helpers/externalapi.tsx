import axios from 'axios';
import { API_URL, ENVIRONMENT } from '../config/Settings';

//const baseUrl = "https://koymc3jix0.execute-api.us-east-1.amazonaws.com/devtest/";
//const baseUrl = "https://mfxlp3dt4h.execute-api.us-east-1.amazonaws.com/prd/";
//const baseUrl = "https://w801d6bl-7229.inc1.devtunnels.ms/api/"
//const baseUrl = "https://localhost:7229/api/";
//const baseUrl = "https://cvj386tw-7229.inc1.devtunnels.ms/api/";

const baseUrl = `${API_URL}/${ENVIRONMENT}/`;

const fetchDataWithBody = async (urlPath, axiosBody) => {
    try {
        const config = {
            method: "POST",
            url: baseUrl + urlPath,
            Headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            data: axiosBody
        }
          console.log('axios', axiosBody);
        // console.log('url', urlPath);
        const response = await axios(config);
        return response.data;

    } catch (error) {
        console.log('Error while fetching data ', error);
        return;
    }

}

const fetchUpdateData = async (urlPath, axiosBody) => {
    try {
        const config = {
            method: "PUT",
            url: baseUrl + urlPath,
            Headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            data: axiosBody
        }
        const response = await axios(config);
        return response.data;

    } catch (error) {
        console.log('Error while fetching data ', error);
        return;
    }

}

const fetchAllData = async (urlPath) => {
    try {
        const config = {
            method: "GET",
            url: baseUrl + urlPath,
            Headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
        // console.log('url', urlPath);
        const response = await axios.get(baseUrl + urlPath);
        //const response = await axios(config);
        return response.data;

    } catch (error) {
        console.log('Error while fetching data ', urlPath);
        return;
    }

}

const fetchDeleteData = async (urlPath) => {
    try {
        const config = {
            method: "DELETE",
            url: baseUrl + urlPath,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log('Error while deleting data', urlPath, error);
        return;
    }
}

const uploadImageToServer = async (type, base64String) => {
    console.log(base64String)
    try {
        const response = await fetch('Member/imageupload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                base64String,
                type
            }),
        });
        const data = await response.json();
        console.log('Image uploaded:', data);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};


export { fetchDataWithBody, fetchAllData, fetchUpdateData, uploadImageToServer, fetchDeleteData };