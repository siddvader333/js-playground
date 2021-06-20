import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import AddCellBar from '../AddCellBar/AddCellBar';
import CellListItem from '../CellListItem/CellListItem';
import './CellList.css';
import { useParams } from 'react-router-dom';

const CellList: React.FC = () => {
	let { playgroundId } = useParams<{ playgroundId: string }>();

	const cells = useTypedSelector((state) => {
		const { order, data } = state.cells!;
		return order.map((id) => data[id]);
	});

	const cellsDisplay = cells.map((cell) => (
		<React.Fragment key={cell.id}>
			<CellListItem id={cell.id} key={cell.id} cell={cell} />
			<AddCellBar previousCellId={cell.id} />
		</React.Fragment>
	));

	return (
		<div className="cell-list">
			<AddCellBar forceVisible={cells.length === 0} previousCellId={null} />
			{cellsDisplay}
		</div>
	);
};

export default CellList;
