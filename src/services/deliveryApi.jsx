import { api } from "./api";

export const deliveryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addDeliveryRecord: builder.mutation({
      query: (data) => ({
        url: "/delivery/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tracker"],
    }),

    deliveryData: builder.query({
      query: (filters) => ({
        url: "/delivery/data",
        params: filters,
      }),
      providesTags: ["tracker"],
    }),

    deleteTrip: builder.mutation({
      query: (id) => ({
        url: `/delivery/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tracker"],
    }),

    updateTrip: builder.mutation({
      query: ({ id, data }) => ({
        url: `/delivery/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["tracker"],
    }),

    getTodayPerformance: builder.query({
      query: () => ({
        url: "/delivery/today-progress",
      }),
      providesTags: ["tracker"],
    }),

    getDeliveryAnalytics: builder.query({
      query: ({ days }) => ({
        url: `/delivery/analytics?days=${days}`,
        method: "GET",
      }),
      providesTags: ["tracker"],
    }),

  }),
});

export const {
  useAddDeliveryRecordMutation,
  useDeliveryDataQuery,
  useDeleteTripMutation,
  useUpdateTripMutation,
  useGetTodayPerformanceQuery,
  useGetDeliveryAnalyticsQuery,
} = deliveryApi;
