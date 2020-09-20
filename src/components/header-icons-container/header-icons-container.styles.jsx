import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const IconsContainer = styled.div`
	flex-basis: 30%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	${'' /*  To be improved: responsive header*/}
	@media (max-width: 1100px) {
		display: none;
	}
`;

export const NameContainer = styled.div`
	text-align: center;
	flex-basis: 60%;
	text-transform: uppercase;
	font-size: 18px;
	color: white;
	cursor: default;
`;

export const OptionsDivider = styled.div`
	flex-basis: 5%;
	display: flex;
	font-size: 20px;
	align-items: center;
	justify-content: flex-start;
	color: white;
	padding-bottom: 5px;
	cursor: default;
`;

export const OptionLink = styled(Link)`
	text-align: center;
	flex-basis: 25%;
	color: white;
	font-size: 18px;
	text-decoration: none;
	font-weight: 400;
	cursor: pointer;
`;
