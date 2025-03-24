import { http } from "../../utils/Http";

export default class Logout {
    /*로그아웃*/
    static async webLogout() {
        return await http.post(`/flobby/logout`);
    }
}