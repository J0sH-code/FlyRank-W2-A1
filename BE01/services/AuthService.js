import { NotFoundError, ValidationError } from "../errors.js";
import { createClient } from "@supabase/supabase-js";
import 'dotenv/config'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default class AuthService {
    async signUp(payload){
        const {email, password} = this.#validatePayload(payload)

        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) {
            console.error(error);
            return;
        }

        return data
    }

    async login(payload) {
        const {email, password} = this.#validatePayload(payload)

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            console.error(error);
            return;
        }

        return data.session
    }

    #validatePayload(payload){
        if (payload == null) throw ValidationError("Invalid/missing request body")

        const {email, password} = payload

        if (email == null) throw ValidationError("Invalid/missing email")
        if (password == null) throw ValidationError("Invalid/missing password")

        return {email, password}
    }
}