import React from 'react';
import classnames from 'classnames';
import './Pagination.scss';
import { IPaginationProps } from '../../types/blogsTypes';
import { usePagination } from '../../redux/hooks';

const Pagination = ({ onPageChange, pageCount, siblingCount = 1, currentPage, blogsPageLimit, className }: IPaginationProps) => {
	let lastPage: number | string;
	const DOTS = '...';
	
	const paginationRange = usePagination({ pageCount, siblingCount,  currentPage, blogsPageLimit });
	
	const onNext = () => {
		onPageChange(currentPage + 1);
	};
		
	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};
	
	if (paginationRange) {
		lastPage = paginationRange[paginationRange.length - 1];
	}

	return (
		<ul
			className={classnames('pagination-container', { [className]: className })}
		>
			<li className={classnames('pagination-item pagination-item-arrow-start', { disabled: currentPage === 1, })} onClick={onPrevious} key='Prev'
			>
				<div className='arrow left' />
			</li>
			<div className='pagination-item-pages'>
				{paginationRange?.map((pageNumber) => {
					if (pageNumber === DOTS) {
						return (
							<li className='pagination-item dots' key={pageNumber} >&#8230;</li>
						);
					}
					return (
						<li className={ classnames('pagination-item', { selected: pageNumber === currentPage })} key={pageNumber} onClick={() => onPageChange(pageNumber) } >
							{pageNumber}
						</li>
					);
				})}
			</div>
			<li
				className={classnames('pagination-item ', { disabled: currentPage === lastPage! })}
				onClick={onNext} key='Next' >
				<div className='arrow right' />
			</li>
		</ul>
	);
};

export default Pagination;
