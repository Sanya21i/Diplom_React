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