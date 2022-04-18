import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

export default function DegreesSelctor({toggleDegrees}) {
    const [show, setShow] = React.useState(false);
    return (
      <div className="animation-wrapper">
    <div className={`degrees-wrapper ${show ? 'show-degrees' : null}`}>
        {show
            ? <div 
                className="arrow-wrapper"
                onClick={() => setShow(false)}
            >
                <IoIosArrowForward 
                    className='arrow'
                    />
                    </div>
                    : <div 
                className="arrow-wrapper"
                onClick={() => setShow(true)}
            >
                <IoIosArrowBack 
                    className='arrow'
                />
            </div>
        }
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                m: 1,
                },
            }}
        >
            <ButtonGroup 
                // variant="text" 
                orientation="vertical"
                aria-label="text button group"
                sx={{
                    '& .MuiButton-root': {
                        color: '#fff',
                        borderColor: '#fff',
                        borderRadius: '50px'
                    },
                    "&:hover .MuiButton-root": {
                    borderColor: '#fff'
                },
                }}
            >
                <Button
                    onClick={() => toggleDegrees ('C')}
                >
                    C
                </Button>
                <Button
                    onClick={() => toggleDegrees ('F')}
                >
                    F
                </Button>
            </ButtonGroup>
        </Box>
    </div>
    </div>
  );
}