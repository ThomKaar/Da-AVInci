import axios from 'axios';

export class ArtEntityProvider {
    constructor() {}
    
	getArtEntityById(id){
		return axios.get('/api/art/' + id).then((response) => {
			return response.data;
		});
	}

	updateArtEntity(id, artEntity){
		return axios.put('/api/art/' + id, artEntity).then((response) => {
			return response;
		});
	}

	createGeneral(artEntity) {
		return axios.post('/api/art/', artEntity).then((response) => {			
			return response.data;
		});
		
    }
    
    removeArtEntity(artEntity) {
        return axios.delete('/api/art/', artEntity).then((response) => {
            return response.data
        })
    }

    getArtEntityByCategory(category) {
        return axios.get('/api/art/category/' + category).then((response) => {
            return response.data;
        });
    }
}
