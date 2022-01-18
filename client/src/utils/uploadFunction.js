import axios from 'axios';

export const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export const uploadImage = async (file) => {
	const base64File = await toBase64(file);
	var photoUpload = {
		key: 'nnnlwe19219n1b2--u0qjasca',
		photo: base64File,
		fileName: file.name,
	};

	const data2 = await axios.post(
		'https://script.google.com/macros/s/AKfycbyzY1D0-hz5i_F6UidfAaOyuPFlcLo_ndqkZ2ZtpUHvlC_4dJDeZgTIrt4IE36J7E2NgA/exec',
		// 'https://script.google.com/macros/s/AKfycbxX0wPsvWPxKn7TVTochThi88-a6BauZllct7NHWA/exec',
		// 'https://script.google.com/macros/s/AKfycbwVoGJC9G_QnxEQV27VaUC1DY5jlCoUTrEqhbFNHfZBr9ufOl9SLOviFIXdwIuBzgr2/exec',
		JSON.stringify(photoUpload)
	);

	return data2;
};
