import axios from 'axios';

export class ImageProvider {
    constructor() {
		axios.defaults.baseURL = 'http://3.93.231.178:5000';
		axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	}
    
    // Returns an array of image urls, their id, and title associated with the image
	getImagesByCollection(ids){
		return axios.get('/image/collection/' + ids).then((response) => {
			return response.data.Responses.Image;
		});
	}
  
	// Returns all image urls, ids, and titles.
	getAllImages() {
		return axios.get('/image/all').then((response) => {
			return response.data;
		});
	}

	getDefaultImages() {
		return axios.get('/image/default/').then((response) => {
			return response.data.Responses.Image;
		});
	}

	uploadImage(file) {
		return axios.post('/image/upload', file).then((response) => {
			return response.data;
		});
	}
}