import { IconButton, TableRow as MuiTableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.common.black,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 16,
	},
	'&': {
		padding: '18px 36px',
	},
}));

const StyledTableRow = styled(MuiTableRow)(({ theme }) => ({
	'&:nth-of-type(even)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	// '&:last-child td, &:last-child th': {
	// 	border: 0,
	// },
}));

export default function TableRow({
	id,
	name,
	rawData,
	data,
	onEdit,
	onDownload,
	onDelete,
}) {
	const itemCells = data.map((item, index) => (
		<StyledTableCell key={index}>{item}</StyledTableCell>
	));
	return (
		<StyledTableRow>
			{itemCells}

			{onEdit && (
				<StyledTableCell style={{ padding: 0 }}>
					<IconButton onClick={() => onEdit(rawData || id)}>
						<EditRoundedIcon />
					</IconButton>
				</StyledTableCell>
			)}

			{onDownload && (
				<StyledTableCell style={{ padding: 0 }}>
					<IconButton onClick={() => onDownload(name)}>
						<DownloadRoundedIcon />
					</IconButton>
				</StyledTableCell>
			)}

			{onDelete && (
				<StyledTableCell style={{ padding: 0 }}>
					<IconButton onClick={() => onDelete(id)}>
						<DeleteRoundedIcon />
					</IconButton>
				</StyledTableCell>
			)}
		</StyledTableRow>
	);
}
