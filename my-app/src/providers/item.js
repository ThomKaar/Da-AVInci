import axios from 'axios';

export class ItemProvider {
    constructor() {}

	getItemById(id){
		return axios.get('/api/art/' + id).then((response) => {
			return response.data;
		});
    }
    
    getTitleItem() {
        return axios.get('/api/item/top/title').then((response) => {
            return response.data;
        });
    }

    getItemsByContent(content) {
        return axios.get('/api/item/art/' + content).then((response) => {
            return response.data;
        });
    }

    getItemsByContentAndLabel(content, label) {
        return axios.get('/api/item/art/' + content + '/' + label).then((response) => {
            return response.data;
        });
    }

	updateItem(id, item){
		return axios.put('/api/item/' + id, item).then((response) => {
			return response;
		});
	}

	createItem(item) {
		return axios.post('/api/item/create', item).then((response) => {			
			return response.data;
		});
		
    }
    
    removeItem(item) {
        return axios.delete('/api/art/', item).then((response) => {
            return response.data
        })
    }
}
