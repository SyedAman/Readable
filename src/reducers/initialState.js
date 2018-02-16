const initialState = {
	posts: {
		byId: {
			post1: {
				id: 'post1',
				title: 'The Benjamin Franklin method...',
				author: 'syedaman',
				body: 'this is my post body...',
				points: 198,
				isDeleted: false,
				timestamp: Date.now(),
				comments: ['comment1', 'comment2'],
			},
			post2: {
				id: 'post2',
				title: 'JEYAH!!!!',
				author: 'jamaicanman',
				body: 'rasta man...',
				points: 25,
				isDeleted: false,
				timestamp: Date.now(),
				comments: ['comment2'],
			},
		},
	},
	comments: [
		{
			author: 'tabtilachowdhury',
			timestamp: Date.now(),
			id: 'comment1',
			body: 'this is my comment body...',
			points: 50,
			isDeleted: false,
			timestamp: Date.now(),
		},
		{
			author: 'asdads',
			timestamp: Date.now(),
			id: 'comment2',
			body: 'this is my another comment body...',
			points: 61,
			isDeleted: false,
			timestamp: Date.now(),
		},
	],
};

export default initialState;
