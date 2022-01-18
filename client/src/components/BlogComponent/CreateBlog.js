import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MDEditor from '@uiw/react-md-editor';
import { useDispatch, useSelector } from 'react-redux';

import {
	FormGroup,
	Col,
	Label,
	Input,
	Form,
	Alert,
	Container,
	Button,
	Row,
} from 'reactstrap';
import { addBlog } from '../../actions/blogActions';
import { addJs } from '../../actions/jsActions';
import { addMongo } from '../../actions/mongoActions';
import { uploadImage } from '../../utils/uploadFunction';
import { addCss } from '../../actions/cssActions';

const CreateBlog = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const [title, setTitle] = useState('');
	const [file, setFile] = useState('');
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState('');
	const [submit, setSubmit] = useState(false);
	const user = useSelector((state) => state.authR.user);
	const cats = ['Javascript', 'CSS', 'Mongo'];

	const onSubmit = (e) => {
		e.preventDefault();
		const newBlog = {
			title,
			category,
			content: value,
			user_id: user.id,
			status: 'active',
		};

		if (category === 'Javascript') {
			dispatch(addJs(newBlog));
		} else if (category === 'Mongo') {
			dispatch(addMongo(newBlog));
		} else if (category === 'CSS') {
			dispatch(addCss(newBlog));
		} else {
			return;
		}
		setSubmit(true);
	};

	useEffect(() => {
		setTimeout(() => {
			setValue('');
			setTitle('');
			setFile('');
			setCategory('');
		}, 3000);
	}, [submit]);

	const uploadFile = async (e) => {
		const file = e.target.files[0];
		if (file) {
			setLoading(true);
		}
		const fileData = await uploadImage(file);
		console.log('fileData', fileData);
		if (fileData.data) {
			setFile(fileData.data);
			setLoading(false);
		}
	};

	return (
		<Container>
			<Form onSubmit={(e) => onSubmit(e)}>
				<div className=' mt-3'>
					{submit ? (
						<Alert
							style={{ cursor: 'pointer' }}
							onClick={() => setSubmit(!submit)}
							color='success'>
							Yay, Created Successfully!
						</Alert>
					) : null}
					<FormGroup>
						<Label for='name'>Title </Label>
						<Input
							type='text'
							name='title'
							id='title'
							placeholder='Add Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label for='name'>Category </Label>
						<Input
							type='select'
							name='category'
							id='category'
							value={category}
							onChange={(e) => setCategory(e.target.value)}>
							<option value=''></option>
							{cats.map((e, i) => {
								return <option key={i}>{e} </option>;
							})}
						</Input>
					</FormGroup>
				</div>
				<div className=' mt-3'>
					<MDEditor height={700} value={value} onChange={setValue} />
				</div>
				{/* <div className='ml-n2 mt-3'>
					<Row>
						<Col>
							<FormGroup>
								<Input
									type='file'
									name='file'
									key={file || ''}
									accept='video/*,image/*, .pdf/*, .pptx'
									onChange={(e) => uploadFile(e)}
								/>
							</FormGroup>
						</Col>
						<Col>
							<Button onClick={() => setFile('')} color='warning'>
								Clear file
							</Button>
						</Col>
					</Row>
				</div>

				{file ? <div className='mb-5'>{file} </div> : null} */}

				<div className='mb-5'>
					<input
						type='submit'
						style={{ background: '#192a56', color: '#fff' }}
						className='btn mt-3 p-1 rounded'
						value='Upload'
					/>
				</div>
			</Form>
		</Container>
	);
};

export default CreateBlog;
