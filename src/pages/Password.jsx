import React, { useEffect, useState } from "react";
import {Footer, Navbar, Telegram} from "../components";
import {setToken} from "../components/Auth";
import {NavLink} from "react-router-dom";


const Password = () => {

    let queryParamsString;
    let origin = window.location.origin;

    useEffect(() => {
        queryParamsString = window.location.search;
        console.log('Query Parameters:', queryParamsString);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const headers = new Headers();
        headers.append('tg-referer', origin + "/password" + queryParamsString);
        const formData = new FormData(event.target);
        const password = formData.get('password');
        const response = fetch('http://localhost:8080/tg_auth/password', {
            method: 'POST',
            body: JSON.stringify({ password }),
            headers: headers,
        }).then((response) => response.json())
            .then((responseBody) => {
                let token = responseBody['access_token']
                setToken(token)
            })
    };





    return (
        <>
            <div className="container my-3 py-3" >
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form action="http://localhost:8080/tg_auth/password" method="POST" onSubmit={handleSubmit}>
                            <div className="my-3">
                                <label htmlFor="floatingPassword display-4">Your Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    name="password"
                                />
                            </div>
                            <div className="text-center">
                                <NavLink to="/">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Send
                                </button>
                                </NavLink>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Password;
