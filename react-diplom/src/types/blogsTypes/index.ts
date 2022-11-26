export interface IBlogPost {
	id: number,
	title: string,
	url: string,
	imageUrl: string,
	newsSite: string,
	summary: string,
	publishedAt: string,
	launches: [
		{
			id: string,
			provider: string
		}
	],
	events:
	[{
		id: string,
		provider: string
	}]
};