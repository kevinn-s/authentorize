/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { ReactNode, useContext, useEffect, useLayoutEffect, useState } from "react";
import { createContext } from "react";
import axios, { AxiosInstance } from "axios";
import { Cookies, useCookies } from "react-cookie";
import { error } from "console";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";

interface AuthContextType {
    retrieveTokens: (accessToken: string, refreshToken: string) => void | Error;
    api : AxiosInstance
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children : ReactNode}) => {

    const api = axios.create({baseURL: 'http://localhost:3000/api/'})
    
    const [cookies, setCookie, removeCookie] = useCookies(["refresh-token", "access-token"]);

    const {mutate, error} = useMutation({mutationFn : ()=>{
        return axios.post('/api/refresh', {
            body : {access_token : cookies["access-token"]} })}, 
            onSuccess : (res)=>{
                setCookie("refresh-token", res.data.refresh_token)
            } , 
            onError : (error) =>{
                removeCookie("refresh-token")
                removeCookie('access-token')
                redirect('/login')
            },

    })
    
    useLayoutEffect(()=>{

        api.interceptors.request.use((config)=>{
            if (cookies['refresh-token'])
            {
                
                config.data = {
                ...config.data,
                refresh_token : cookies['refresh-token']
                }
            }
            return config
        })

        api.interceptors.response.use((response) => response, (error)=>{
            if(error)
            {
                if(error.response.data.message === "Unauthorized"){
                    mutate()
                }

                return error
            }
        })
        
    }, [api, cookies, mutate])
    // useLayoutEffect(()=>{

    //     const a = new Cookies()
    //     a.set("cookie-test", "989d7edod", {domain : ""})
        
    //     const recieveToken = async () => {
    //         console.log("recieve token")
    //         api.interceptors.response.use(
    //             function (response) {
    //               // Any status code within the range of 2xx will trigger this function
    //               // Here, you can modify the response before passing it to `then`
    //               if(response){
    //               console.log(response.data);
    //                // You must return the response to continue
    //             } return response;},
    //             (error) => {
    //                 console.log(error)
    //             }
    //         )
    //     }
    //     recieveToken()
    // })

    function retrieveTokens(accessToken : string, refreshToken : string) : void | Error {
        if(accessToken === '' || refreshToken === '') return new Error("Token Empty !");
        setCookie('refresh-token', refreshToken);
        setCookie('access-token', accessToken);
    }

    return(
        <AuthContext.Provider value={{retrieveTokens, api}}>
            {children}
        </AuthContext.Provider>
    )
}

