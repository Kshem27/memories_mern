import axios from 'axios';
// const API = axios.create({ baseURL: 'https://memories-mern27.herokuapp.com/' });
const API = axios.create({
	baseURL: 'https://memories-mern27.herokuapp.com'
	// baseURL: 'http://localhost:5000/'
});
API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
	}
	return req;
});
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) =>
	API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.post(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (val, id) => API.post(`/posts/${id}/commentPost`, { val });
export const showPost = (id) => API.get(`/${id}`);
export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);
export const fetchPostsByUser = (id) => API.get(`/posts/users/${id}`);
