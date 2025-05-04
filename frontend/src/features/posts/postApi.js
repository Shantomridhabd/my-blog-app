import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://your-backend-url.com/api', // 🔁 Update this to your real backend
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // ⬅️ Optional: if using JWT
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Posts'],
  endpoints: builder => ({
    getAllPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),

    getPostById: builder.query({
      query: id => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),

    createPost: builder.mutation({
      query: newPost => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Posts'],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),

    deletePost: builder.mutation({
      query: id => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),

    likePost: builder.mutation({
      query: postId => ({
        url: `/posts/${postId}/like`,
        method: 'PUT',
      }),
      invalidatesTags: ['Posts'], // or specific post if you set up fine-grained tags
    }),

    dislikePost: builder.mutation({
      query: postId => ({
        url: `/posts/${postId}/dislike`,
        method: 'PUT',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
} = postApi;
