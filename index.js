require("dotenv").config();
const axios = require("axios");
const sendMessage = require("./telegram");

const config = {
    method: process.env.METHOD,
    maxBodyLength: process.env.MAX_BODY_LENGTH,
    url: process.env.URL,
    headers: {
        accept: process.env.ACCEPT,
        "accept-language": process.env.ACCEPT_LANGUAGE,
        base_url: process.env.BASE_URL,
        frontend: process.env.FRONTEND,
        priority: process.env.PRIORITY,
        referer: process.env.REFERER,
        "sec-ch-ua": process.env.SEC_CH_UA,
        "sec-ch-ua-mobile": process.env.SEC_CH_UA_MOBILE,
        "sec-ch-ua-platform": process.env.SEC_CH_UA_PLATFORM,
        "sec-fetch-dest": process.env.SEC_FETCH_DEST,
        "sec-fetch-mode": process.env.SEC_FETCH_MODE,
        "sec-fetch-site": process.env.SEC_FETCH_SITE,
        tid: Date.now() + process.env.TID,
        "user-agent": process.env.USER_AGENT,
        Cookie: process.env.COOKIE,
    },
};

const storeResponse = {
    msg: "",
    inStock: false,
};

async function checkStore() {
    try {
        const response = await axios.request(config);
        const inventory_low_stock_quantity = parseInt(
            response.data.data[0].inventory_low_stock_quantity
        );
        const inventory_quantity = parseInt(
            response.data.data[0].inventory_quantity
        );
        if (inventory_quantity > inventory_low_stock_quantity) {
            storeResponse.msg = "In Stock";
            storeResponse.inStock = true;
            await sendMessage("Amul Whey Protein is now in stock. Hurry Up!");
            return storeResponse;
        } else {
            storeResponse.msg = "Out of Stock";
            return storeResponse;
        }
    } catch (e) {
        await sendMessage("There is some error. Please check.");
        storeResponse.msg = `Error in fetching data: ${e.msg}`;
        return storeResponse;
    }
}

async function main() {
    await checkStore();
    console.log(storeResponse);
}

main();
