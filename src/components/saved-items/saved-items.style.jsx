import BookmarksIcon from '@material-ui/icons/Bookmarks';
import styled from 'styled-components';

export const SavedItemsContainer = styled.div`
	flex-basis: 15%;
	width: 45px;
	height: 45px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

export const SavedItemsIcon = styled(BookmarksIcon)`
	width: 35px;
	height: 35px;
	color: white;
`;

export const ItemCountContainer = styled.span`
	color: #333;
	position: absolute;
	font-size: 15px;
	font-weight: bold;
	bottom: 12px;
	left: 20px;
`;
