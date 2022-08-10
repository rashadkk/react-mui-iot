import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

type Order = 'asc' | 'desc';

type HeadCell = {
    key: string,
    title: string,
    align?: 'right' | 'left'
}

interface EnhancedTableProps {
    headCells: Array<HeadCell>;
    numSelected: number;
    rowCount: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    // order: Order;
    // orderBy: string;
  }

const EnhancedTableHead = (props: EnhancedTableProps) => {

    const { onSelectAllClick, numSelected, rowCount, headCells } = props;
    
    // const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    //     onRequestSort(event, property);
    // };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.key}
            align={headCell.align}
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {

            }
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead