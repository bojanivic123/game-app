import HttpService from "./httpService";

export default class WordsService {
    static async getWord(word) {
        return await HttpService.request({
            url: "/word",
            method: "GET",
            params: { word }
        });
    }
}

