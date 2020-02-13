import axios from 'axios';

export class ArtEntityProvider {
    constructor() {
		axios.defaults.baseURL = 'http://18.188.95.224:5000';
		axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	}
    
	getArtEntityById(id){
		return axios.get('/art/' + id).then((response) => {
			return response.data;
		});
	}

	updateArtEntity(id, artEntity){
		return axios.put('/art/' + id, artEntity).then((response) => {
			return response;
		});
	}

	createGeneral(artEntity) {
		return axios.post('/art/', artEntity).then((response) => {			
			return response.data;
		});
		
    }
    
    removeArtEntity(artEntity) {
        return axios.delete('/art/', artEntity).then((response) => {
            return response.data
        })
    }

    getArtEntityByCategory(category) {
        return axios.get('/art/category/' + category).then((response) => {
            return response.data;
        });
    }
}
