import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:import.meta.env.VITE_BASE_URL}),
    tagTypes:["tracker"],
    endpoints:(builder)=>({
        signupUser:builder.mutation(
            {
                query:(userData)=>({
                    url:"/users/register",
                    method:"POST",
                    body:userData
                }),
                invalidatesTags:['tracker']
            }
        ),
        loginUser:builder.mutation({
            query:(userData)=>({
                url:"/users/login",
                method:"POST",
                body:userData
            }),
            invalidatesTags:['tracker']
        })
    })
})

export const {useSignupUserMutation,useLoginUserMutation}=api