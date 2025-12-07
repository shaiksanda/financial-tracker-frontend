import { api } from "./api";

export const expenseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: (filters) => ({
        url: "/expense/expenses",
        params: filters,
      }),
      providesTags: ["tracker"],
    }),

    addExpense: builder.mutation({
      query: (data) => ({
        url: "/expense/add-expense",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tracker"],
    }),

    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expense/expense/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tracker"],
    }),

    getHeaderSummary: builder.query({
      query: () => ({
        url: "/expense/header-summary",
      }),
      providesTags: ["tracker"],
    }),
    getDashboard:builder.query({
      query:(days)=>({
        url:`/expense/dashboard?days=${days}`,
        method:"GET"
      }),
      providesTags:['tracker']
    })
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetHeaderSummaryQuery,
  useGetDashboardQuery
} = expenseApi;
