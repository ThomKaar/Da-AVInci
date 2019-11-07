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
	updateItem(id, item){
		return axios.put('/api/art/' + id, item).then((response) => {
			return response;
		});
	}

	createGeneral(item) {
		return axios.post('/api/art/', item).then((response) => {			
			return response.data;
		});
		
    }
    
    removeItem(item) {
        return axios.delete('/api/art/', item).then((response) => {
            return response.data
        })
    }
}
