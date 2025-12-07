import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({ url: "/users/profile" }),
      providesTags: ["tracker"],
    }),

    editUserProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["tracker"],
    }),

    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `/users/profile/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tracker"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useEditUserProfileMutation,
  useDeleteAccountMutation,
} = userApi;
