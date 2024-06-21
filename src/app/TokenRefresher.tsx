"use client";
import axios from "axios";
import { useCallback, useEffect, useRef } from "react";

const TokenRefresher = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const interval = useRef<NodeJS.Timeout>();

    const getAccessToken = async () => {
        return await axios.get("/api/auth/accessToken");
    };

    const refreshAccessToken = async () => {
        console.log("Refreshing access token");
        return await axios.get("/api/auth/refreshToken");
    };

    const startRefresh = useCallback(async () => {
        if (interval.current) {
            clearInterval(interval.current);
        }



        interval.current = setInterval(async () => {
            const accessTokenResponse = await getAccessToken();
            console.log("accesstoken res:", accessTokenResponse?.data?.token)
            if (!accessTokenResponse?.data.token) {
                console.log("returned acc token")
                return;
            }

            const accessToken = accessTokenResponse.data.token.value;
            if (!accessToken) {
                console.log("returned acc token value")
                return;
            }
            const refreshAccessTokenResponse = await refreshAccessToken();
            console.log(refreshAccessTokenResponse.data);
        }, 290000);
    }, []);

    useEffect(() => {
        startRefresh();

        return () => {
            clearInterval(interval.current);
        };
    }, [startRefresh]);

    return <>{children}</>;
};

export default TokenRefresher;
