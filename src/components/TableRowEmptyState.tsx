import { TableCell, TableRow } from '@mui/material';

interface Props {
    show: boolean,
    message: string,
    colSpan?: number
}

const TableRowEmptyState = (props: Props) => {
    const { message, show, colSpan } = props;
    
    return (
        <> 
            {show ?
                (<TableRow>
                    <TableCell colSpan={colSpan}>
                        {message}
                    </TableCell>
                </TableRow>) : null
            }
        </>
    )
}

export default TableRowEmptyState;
