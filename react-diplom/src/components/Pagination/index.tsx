import React from 'react';
import classnames from 'classnames';
import './Pagination.scss';
import { IPaginationProps } from '../../types/blogsTypes';
import { usePagination } from '../../redux/hooks';

const Pagination = ({ onPageChange, pageCount, siblingCount = 1, currentPage, blogsPageLimit, className }: IPaginationProps) => {
	const DOTS = '...';	
	const paginationRange = usePagination({ pageCount, siblingCount,  currentPage, blogsPageLimit });	

	return (
		<ul className={ classnames('pagination-container', { [className]: className })}>
			<li className={ classnames('pagination-item', { disabled: currentPage <= 1 })} onClick={() => onPageChange(currentPage - 1)} key='Prev'>
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
						<li className={ classnames('pagination-item', { selected: pageNumber === currentPage })} key={pageNumber} onClick={() => onPageChange(pageNumber) }>
							{pageNumber}
						</li>
					);
				})}
			</div>
			<li
				className={classnames('pagination-item ', { disabled: currentPage >= pageCount })}
				onClick={() => onPageChange(currentPage + 1)} key='Next' >
				<div className='arrow right' />
			</li>
		</ul>
	);
};

export default React.memo(Pagination);
