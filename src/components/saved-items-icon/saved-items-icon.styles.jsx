import BookmarksIcon from '@material-ui/icons/Bookmarks';
import styled from 'styled-components';

export const SavedItemsContainer = styled.div`
	flex-basis: 5%;
	width: 45px;
	height: 45px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

export const SavedItemsIcon = styled(BookmarksIcon)`
	width: 41px;
	height: 41px;
	color: white;
`;

export const ItemCountContainer = styled.span`
	color: #3579ea;
	position: absolute;
	font-size: 15px;
	font-weight: bold;
	bottom: 11.5px;
	left: 13px;
`;
