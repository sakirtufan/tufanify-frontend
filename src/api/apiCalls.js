import Axios from "axios";

export const signup = (body) => {
    Axios.post("/api/1.0/users", body)
}