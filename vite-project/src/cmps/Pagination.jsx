import { Button, Box } from '@mui/material';

export function PaginationButtons({toys, pageIdx, setPageIdx, toysLength }) {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" className="pagination">
        <Button 
            variant="contained" 
            onClick={() => setPageIdx(pageIdx - 1)} 
            disabled={pageIdx === 0}
            style={{ marginRight: '8px' }} 
        >
            Previous
        </Button>
        <span style={{ margin: '0 8px' }}>{pageIdx + 1}</span>
        <Button 
            variant="contained" 
            onClick={() => setPageIdx(pageIdx + 1)} 
            disabled={toysLength < 5}
            style={{ marginLeft: '8px' }} 
        >
            Next
        </Button>
    </Box>
    )
}