import { request } from "./main"

const signup = async function(payload: {
    fname: string,
    lname: string,
    email: string,
    password: string
}): Promise<{
    message: string
}> {
    const response = await request<{
        message: string
    }>("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            fname: payload.fname,
            lname: payload.lname,
            email: payload.email,
            password: payload.password
        })
    });

    return {
        message: response.message
    }
}

const login = async function(payload: { email: string, password: string}) {
    const response = await request<{
        user: any,
        token: string,
        message: string
    }>(
        "/auth/login",
        {
            body: JSON.stringify({
                email: payload.email,
                password: payload.password
            }),
            method: "POST"
        }
    );

    return {
        user: response.user,
        message: response.message,
        token: response.token
    }
}

export {
    signup,
    login
}