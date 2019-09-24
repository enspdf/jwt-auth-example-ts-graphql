import React from "react";
import { Link } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from "./generated/graphql";
import { booleanLiteral } from "@babel/types";
import { setAccessToken } from "./accessToken";

interface Props {

}

export const Header: React.FC<Props> = () => {
    const { data, loading } = useMeQuery();
    const [logout, { client }] = useLogoutMutation();

    let body: any = null;

    if (loading) {
        body = null;
    } else if (data && data.me) {
        body = <div>you are logged in as: {data.me.email}</div>;
    } else {
        body = <div>not logged int</div>;
    }

    return (
        <header>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/register">Register</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/bye">Bye</Link>
            </div>
            <div>
                {
                    !loading && data && data.me ? (
                        <button onClick={async () => {
                            await logout();
                            setAccessToken("");
                            await client!.resetStore();
                        }}>Logout</button>
                    ) : null
                }
            </div>
            {
                body
            }
        </header>
    );
};