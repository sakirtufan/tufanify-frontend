import Axios from "axios";

export const signup = (body) => {
    return Axios.post("/api/1.0/users", body)
}