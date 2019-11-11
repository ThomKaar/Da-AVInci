import axios from 'axios';

export class ImageProvider {
    constructor() {}
    
    // Returns an array of image urls, their id, and title associated with the image
	getImagesByCollection(ids){
		return axios.get('/api/image/collection/' + ids).then((response) => {
			return response.data.Responses.Image;
		});
	}
}