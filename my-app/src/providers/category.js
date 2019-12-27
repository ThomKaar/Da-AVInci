import axios from 'axios';

export class CategoryProvider {
    constructor() {
		axios.defaults.baseURL = 'http://3.93.231.178:5000';
		axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	}

	getCateoryById(id){
		return axios.get('/art/' + id).then((response) => {
			return response.data;
		});
	}

	getAllCategories(){
		return axios.get('/art/all').then((responses) => {
			return responses.data;
		});
	}

	getCategoryItems(){
		return axios.get('/category/all').then((responses) => {		
			return responses.data;
		});
	}

	updateCateory(category){
		return axios.put('/category', category).then((response) => {
			return response;
		});
	}

	createGeneral(cateory) {
		return axios.post('/art/', cateory).then((response) => {			
			return response.data;
		});
		
    }
    
    deleteCategory(category) {
        return axios.delete('/category/' + category).then((response) => {
            return response.data;
        })
    }
}
