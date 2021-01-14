import styled from 'styled-components';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const PageContainer = styled.div`
	position: relative;
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;

const HeadText = styled.p`
	margin-bottom: 15px;
`;

const TableHeadTextMain = styled.p`
	font-size: 130%;
`;
const TableContentMain = styled.p`
	font-size: 130%;
	color: #000;
`;

const TableHeadSubText = styled.p`
	font-size: 130%;
`;
const TableSubContent = styled.p`
	font-size: 130%;
	color: #000;
`;

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
	row: {
		paddingTop: '0',
	},
});

export default function Catagories(props) {
	const classes = useRowStyles();

	const createRow = (name, id) => {
		return {
			name,
			id,
			SubCatagories: [
				{ name: 'subCat', id: 'subId' },
				{ name: 'subCat', id: 'subId' },
			],
		};
	};

	const rows = [createRow('Clothes', '1'), createRow('Medicines', '2'), createRow('Food', '3')];

	const SubCatagories = (props) => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<TableRow className={classes.root}>
					<TableCell colSpan={1} style={{ width: '5%' }}>
						<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
							{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</TableCell>
					<TableCell colSpan={6}>
						<TableContentMain>{props.row.name}</TableContentMain>
					</TableCell>
					<TableCell colSpan={1} align="right">
						<IconButton aria-label="Edit" size="small">
							<CreateIcon />
						</IconButton>
						<IconButton aria-label="Delete" size="small">
							<DeleteOutlineIcon />
						</IconButton>
					</TableCell>
				</TableRow>

				<TableRow>
					<TableCell style={{ paddingTop: '0px' }} colSpan={8}>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell style={{ width: '90%' }}>
											<TableHeadSubText>Sub Category</TableHeadSubText>
										</TableCell>
										<TableCell>
											<TableHeadSubText>Actions</TableHeadSubText>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{props.row.SubCatagories.map((item) => (
										<TableRow>
											<TableCell style={{ width: '90%' }}>
												<TableSubContent>{item.name}</TableSubContent>
											</TableCell>
											<TableCell>
												<IconButton aria-label="Edit" size="small">
													<CreateIcon />
												</IconButton>
												<IconButton aria-label="Delete" size="small">
													<DeleteOutlineIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Collapse>
					</TableCell>
				</TableRow>
			</>
		);
	};
	return (
		<PageContainer>
			<HeadText className="pageHeaders blackFont">Catagories</HeadText>

			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableBody>
						{rows.map((row) => (
							<SubCatagories key={row.name} row={row} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</PageContainer>
	);
}

/**
 * <TableHead>
						<TableRow>
							<TableCell style={{ width: '10%' }} colSpan={1} />
							<TableCell colSpan={6}>
								<TableHeadTextMain>Catagories</TableHeadTextMain>
							</TableCell>

							<TableCell colSpan={1} align="right">
								<TableHeadTextMain>Actions</TableHeadTextMain>
							</TableCell>
						</TableRow>
					</TableHead>
 */
