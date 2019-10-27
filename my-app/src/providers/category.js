import axios from 'axios';

export class CateoryProvider {
    constructor() {}

	getCateoryById(id){
		return axios.get('/api/art/' + id).then((response) => {
			return response.data;
		});
	}

	getAllCategories(){
		return axios.get('/api/art/all').then((responses) => {
			return responses.data;
		});
	}

	updateCateory(id, cateory){
		return axios.put('/api/art/' + id, cateory).then((response) => {
			return response;
		});
	}

	createGeneral(cateory) {
		return axios.post('/api/art/', cateory).then((response) => {			
			return response.data;
		});
		
    }
    
    removeCateory(cateory) {
        return axios.delete('/api/art/', cateory).then((response) => {
            return response.data
        })
    }
}
