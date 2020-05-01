import React from 'react';
import styled from 'styled-components';
import SubHeader from '../components/SubHeader';
import ListItem from '../components/ListItem';

const ListItemWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	margin: 2% 5%;
`;

const Alert = styled.span`
	width: 100%;
	text-align: center;
`;

const List = ({ items, loading, error, lists, getItemsRequest,
	match, history }) =>
{	
	const list = lists && lists.find(list => list.id ===
		parseInt(match.params.id));

	React.useEffect(() => {
		if (!items.length > 0) {
			getItemsRequest(match.params.id);
		}
	}, [items, match.params.id, getItemsRequest]);


	return !loading && !error ? (
		<>
			{
				history && list && 
					<SubHeader goBack={() => history.goBack()}
					openForm={() => history.push(`${match.url}/new`)}
					title={list.title} />
			}
			<ListItemWrapper>
				{
					items && items.map(item => 
						<ListItem key={item.id} data={item}/>)
				}
			</ListItemWrapper>
		</>		
	) : (<Alert>{loading ? 'Loading...' : error}</Alert>);
};

export default List;	
