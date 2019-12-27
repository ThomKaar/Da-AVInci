import axios from 'axios';

export class ItemProvider {
    constructor() {
        axios.defaults.baseURL = 'http://3.93.231.178:5000';
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    }

	getItemById(id){
		return axios.get('/art/' + id).then((response) => {
			return response.data;
		});
    }
    
    getTitleItem() {
        return axios.get('/item/top/title').then((response) => {
            return response.data;
        });
    }

    getItemsByContent(content) {
        return axios.get('/item/art/' + content).then((response) => {
            return response.data;
        });
    }

    getItemsByContentAndLabel(content, label) {
        return axios.get('/item/art/' + content + '/' + label).then((response) => {
            return response.data;
        });
    }

	updateItem(id, item){
		return axios.put('/item/' + id, item).then((response) => {
			return response;
		});
	}

	createItem(item) {
		return axios.post('/item/create', item).then((response) => {			
			return response.data;
		});
		
    }
    
    deleteItem(id) {
        return axios.delete('/item/' + id).then((response) => {
            return response.data;
        })
    }
    
    findNewId() {
        return axios.get('/item/newId/newId').then((response) => {
            return response.data;
        })
    }
}
