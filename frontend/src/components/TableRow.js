import { IconButton, TableCell, TableRow as Row } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function TableRow({ id, data, onEdit, onDelete }) {
	const itemCells = data.map((item, index) => (
		<TableCell key={index}>{item}</TableCell>
	));
	return (
		<Row>
			{itemCells}

			{onEdit && (
				<TableCell>
					<IconButton onClick={() => onEdit(id)}>
						<EditRoundedIcon />
					</IconButton>
				</TableCell>
			)}

			{onDelete && (
				<TableCell>
					<IconButton onClick={() => onDelete(id)}>
						<DeleteRoundedIcon />
					</IconButton>
				</TableCell>
			)}
		</Row>
	);
}
