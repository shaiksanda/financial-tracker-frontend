import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';
export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            const token = Cookies.get("jwt_token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }

    }),
    tagTypes: ["tracker"],
    endpoints: (builder) => ({
        signupUser: builder.mutation(
            {
                query: (userData) => ({
                    url: "/users/register",
                    method: "POST",
                    body: userData
                }),
                invalidatesTags: ['tracker']
            }
        ),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/users/login",
                method: "POST",
                body: userData
            }),
            invalidatesTags: ['tracker']
        }),
        getExpenses: builder.query({
            query: (filters) => ({
                url: "/expense/expenses",
                params: filters
            }),
            providesTags: ["tracker"]
        }),
        addExpense: builder.mutation({
            query: (expenseData) => ({
                url: "/expense/add-expense",
                method: "POST",
                body: expenseData
            }),
            invalidatesTags: ['tracker']
        }),
        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `/expense/expense/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['tracker']
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: "/users/profile",
                method: "GET"
            }),
            providesTags: ['tracker']
        }),
        editUserProfile: builder.mutation({
            query: (data) => ({
                url: "/users/update-profile",
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['tracker']
        }),
        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `/users/profile/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['tracker']
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: "POST",
            }),
            invalidatesTags:['tracker']
        }),

        addDeliveryRecord:builder.mutation({
            query:(data)=>({
                url:"/delivery/add",
                method:"POST",
                body:data
            }),
            invalidatesTags:['tracker']
        }),
        deliveryData:builder.query({
            query:(filters)=>({
                url:"/delivery/data",
                params:filters
            }),
            providesTags:['tracker']
        }),
        deleteTrip:builder.mutation({
            query:(id)=>({
                url:`/delivery/delete/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:['tracker']
        })

    })
})

export const { useSignupUserMutation, useLoginUserMutation, useGetExpensesQuery, useAddExpenseMutation, useDeleteExpenseMutation, useGetUserProfileQuery, useEditUserProfileMutation,useLogoutUserMutation,useDeleteAccountMutation,useAddDeliveryRecordMutation,useDeliveryDataQuery,useDeleteTripMutation } = api