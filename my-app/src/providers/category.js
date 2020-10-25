import axios from 'axios';
import { baseUrl } from './index.js';

export class CategoryProvider {
    constructor() {
		axios.defaults.baseURL = baseUrl;
		axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	}

	getCategoryItems(){
		return axios.get('/category/all').then((responses) => {		
			return responses.data;
		})
		.catch((err) => {
			console.log(err); // eslint-disable-line
		});
	}

	updateCategory(category){
		return axios.put('/category', category).then((response) => {
			return response;
		});
	}
    
    deleteCategory(category) {
        return axios.delete('/category/' + category).then((response) => {
            return response.data;
        })
    }
}
