import React, { useState } from 'react';
import Form from './Form';
import Posts from './Posts';
import Pagination from './Pagination/Pagination';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPostBySearch } from '../actions/posts';
function useQuery() {
	return new URLSearchParams(useLocation().search);
}
const Home = () => {
	const [ currentId, setCurrentId ] = useState(null);
	const dispatch = useDispatch();
	const query = useQuery();
	const history = useHistory();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');
	const [ search, setSearch ] = useState('');
	const [ tags, setTags ] = useState([]);
	// console.log(page);
	// useEffect(
	// 	() => {
	// 		dispatch(getPosts());
	// 	},
	// 	[ dispatch, currentId ]
	// );
	const handleKeyPress = (e) => {
		// console.log('key pressed');
		// console.log(e.code);
		if (e.code === 'Enter') {
			// console.log(' enter key pressed');
			searchPost();
		}
	};
	const handleAdd = (tag) => setTags([ ...tags, tag.toLowerCase() ]);
	const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
	const searchPost = () => {
		// console.log(tags);
		if (search.trim() || tags) {
			dispatch(getPostBySearch({ search, tags: tags.join(',') }));
			history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
		} else {
			history.push('/');
		}
	};
	return (
		<div className='row'>
			<div className='col-sm-12 col-md-8 col-xl-9 order-1 order-md-0'>
				<Posts setCurrentId={setCurrentId} />
			</div>
			<div className='col-sm-8 col-md-4 mt-2 col-xl-3 order-0 order-md-1 mx-auto'>
				<div className='search form mb-2'>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							name='search'
							id='search'
							placeholder='E.g. USA'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
						<label htmlFor='search'>Search Memories</label>
					</div>
					<ChipInput
						style={{
							margin: '10px 0',
							borderRadius: 4,
							width: '100%',
							background: 'white',
							color: '#4ecdc4ff',
							textDecorationColor: '#4ecdc4ff',
							textEmphasisColor: '#4ecdc4ff',
							fontFamily: 'sans-serif'
						}}
						value={tags}
						label=' &nbsp; Search Tags'
						onAdd={handleAdd}
						onDelete={handleDelete}
						// variant='outlined'
						className='chip'
					/>
					<button onClick={searchPost} className='btn btn-sm accent'>
						Enter
					</button>
				</div>
				<Form currentId={currentId} setCurrentId={setCurrentId} />
				{!searchQuery && !tags.length && <Pagination page={page} />}
			</div>
		</div>
	);
};

export default Home;
