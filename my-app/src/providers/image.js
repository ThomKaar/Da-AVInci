import axios from 'axios';

export class ImageProvider {
    constructor() {}
    
    // Returns an array of image urls, their id, and title associated with the image
	getImagesByCollection(ids){
		return axios.get('/api/image/collection/' + ids).then((response) => {
			return response.data.Responses.Image;
		});
	}
  
	// Returns all image urls, ids, and titles.
	getAllImages() {
		return axios.get('/api/image/all').then((response) => {
			return response.data;
		});
	}

	getDefaultImages() {
		return axios.get('/api/image/default/').then((response) => {
			return response.data.Responses.Image;
		});
	}

	uploadImage(file) {
		return axios.post('/api/image/upload', file).then((response) => {
			return response.data;
		});
	}
}