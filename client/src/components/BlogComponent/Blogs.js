import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Label, FormGroup, Input } from 'reactstrap';
import ReactMarkdown from 'react-markdown';
import { getBlogs } from '../../actions/blogActions';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
	darcula,
	materialDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getAllCss } from '../../actions/cssActions';
import { getAllJs } from '../../actions/jsActions';
import { getAllMongo } from '../../actions/mongoActions';
import Loader from '../../utils/Loader';

const Blogs = () => {
	const dispatch = useDispatch();
	const [category, setCategory] = useState('blog');
	const [currentBlog, setCurrentBlog] = useState('');
	const [changeCategory, setChangeCategory] = useState(false);

	useEffect(() => {
		if (category === 'Javascript') {
			dispatch(getAllJs());
		} else if (category === 'Mongo') {
			dispatch(getAllMongo());
		} else if (category === 'CSS') {
			dispatch(getAllCss());
		} else {
			dispatch(getBlogs());
		}
	}, [category]);

	const blogs = useSelector((state) => state.blogR.blogs);
	const css = useSelector((state) => state.cssR.blogs);
	const javascript = useSelector((state) => state.jsR.blogs);
	const mongo = useSelector((state) => state.mongoR.blogs);

	useEffect(() => {
		if (category === 'Javascript') {
			setCurrentBlog(javascript);
		} else if (category === 'Mongo') {
			setCurrentBlog(mongo);
		} else if (category === 'CSS') {
			setCurrentBlog(css);
		} else {
			setCurrentBlog(blogs);
		}
	}, [category, blogs, css, javascript, mongo]);

	const changeCate = (e) => {
		setChangeCategory(true);
		setCategory(e.target.value);
	};

	const cats = ['Javascript', 'CSS', 'Mongo'];

	const renderers = {
		code: ({ language, value }) => {
			return (
				<SyntaxHighlighter
					style={materialDark}
					language={'javascript'}
					children={value}
				/>
			);
		},
	};

	return (
		<Container className='mt-3 mb-5'>
			<FormGroup style={{ width: '50%' }}>
				<Label for='name'>Category </Label>
				<Input
					type='select'
					name='category'
					id='category'
					value={category}
					onChange={(e) => changeCate(e)}>
					<option value=''></option>
					{cats.map((e, i) => {
						return <option key={i}>{e} </option>;
					})}
				</Input>
			</FormGroup>
			{currentBlog &&
				currentBlog.map((blog, index) => {
					return (
						<div
							key={index}
							style={{
								border: '1px solid #F0F0F0',
								borderRadius: '5px',
								marginBottom: '2rem',
								padding: '1.5rem',
								boxShadow: '5px 5px 5px #888888',
							}}>
							<h3
								className='text-center text-capitalize'
								style={{
									backgroundColor: '#eee',
									padding: '0.5rem',
									borderRadius: '5px',
								}}>
								{blog.title}
							</h3>
							<div className='mt-3'>
								<ReactMarkdown renderers={renderers} children={blog.content} />
							</div>
						</div>
					);
				})}
		</Container>
	);
};

export default Blogs;
