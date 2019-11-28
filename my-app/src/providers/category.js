import axios from 'axios';

export class CategoryProvider {
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

	getCategoryItems(){
		return axios.get('/api/category/all').then((responses) => {		
			return responses.data;
		});
	}

	updateCateory(category){
		return axios.put('/api/category', category).then((response) => {
			return response;
		});
	}

	createGeneral(cateory) {
		return axios.post('/api/art/', cateory).then((response) => {			
			return response.data;
		});
		
    }
    
    deleteCategory(category) {
        return axios.delete('/api/category/' + category).then((response) => {
            return response.data;
        })
    }
}
