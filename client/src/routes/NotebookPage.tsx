import { CardMedia, Typography } from '@mui/material';
import { Column, Row } from '../components/common/Flexbox';
import { Notebook } from '../components/notebook/Notebook';
import useDeviceDetect from '../hooks/useDeviceDetect';
import treePict from './ressources/tree.jpg';

export const NotebookPage = () => {

  const { isMobile } = useDeviceDetect();

  return(
      <Column width='100%' horizontal='center'>
        {!isMobile &&
        <Row height='100px' width='1000px' vertical='center' horizontal='space-between'>
          <Typography 
            style={{fontWeight : 'bold'}}
            color='secondary'
            variant='h3'
            noWrap={!isMobile}
            >
            { 'Carnet de Noël' }
          </Typography>
          <CardMedia 
            style={{ 
              height: '80px',
              width: '80px',
            }}
            image={treePict}
          />
        </Row>}
        <Notebook isMobile={isMobile} />
      </Column>
    );
}