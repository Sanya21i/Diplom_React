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

export type IBlogsResponsePagesCount = number;
export interface IPaginationProps extends React.ComponentProps<'button'> {
	currentPage: number;
	pageCount: number;
	blogsPageLimit: number;
	siblingCount: number;
	className: string;
	onPageChange: (page: string | number) => void;
};

export interface IUsePaginationProps {
	currentPage: number;
	pageCount: number;
	siblingCount: number;
	blogsPageLimit: number;
};
