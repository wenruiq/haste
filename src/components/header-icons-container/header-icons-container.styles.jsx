import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const IconsContainer = styled.div`
	flex-basis: 30%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;



export const NameContainer = styled.div`
	text-align: center;
	text-transform: uppercase;
	font-size: 18px;
	flex-basis: 50%;
	color: white;
`;

export const OptionsDivider = styled.div`
	flex-basis: 5%;
	display: flex;
	font-size: 20px;
	align-items: center;
	justify-content: center;
	color: white;
	padding-bottom: 5px;
`;

export const OptionLink = styled(Link)`
	text-align: right;
	flex-basis: 30%;
	color: white;
	font-size: 18px;
	text-decoration: none;
	font-weight: 400;
	cursor: pointer;
`;
