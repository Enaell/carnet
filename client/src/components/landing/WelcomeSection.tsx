import React, { useState } from 'react';
import { 
  welcomeSection,
  backgroundImg,
  connectionDiv,
  connectionDivMobile,
  backgroundImgMobile
} from './styles';
import { useNavigate } from 'react-router-dom';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import { Column, Row } from '../common/Flexbox';
import { IntroductionColumn } from './IntroductionColumn';
import { family } from '../../utils/utils';

type WelcomeSectionType = {
  position?: 'absolute' | 'relative';
}

export const WelcomeSection = ({ 
  position = 'relative',
} : WelcomeSectionType) => {

  const { isMobile } = useDeviceDetect();

  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
    
  function handleUserNameChange(value: string){
    setUsername(value);
  }

  const onLoginClick = async() => {
    const usError = !username;
    setUsernameError(usError);

    if (!usError) {
      navigate(`/notebook/${username}`);
    }
  };

  return (
    <Column horizontal='start' vertical={'center'} className='welcomeSection' style={{ ...welcomeSection, position: position}}>
      <div style={isMobile ? backgroundImgMobile : backgroundImg}/>
      <Column horizontal={isMobile ? 'center' : 'end'} width={ isMobile ? '100%' : '45%'}>
        <Column horizontal={'start'} style={ isMobile ? connectionDivMobile : connectionDiv }>
          <Typography  style={{fontWeight : 'bold'}} align={ isMobile ? 'center': 'inherit' } color="red" variant='h2' noWrap={!isMobile}>
            { 'Carnet de Noël' }
          </Typography>
          <form style={{width: '100%', height: '100%', paddingTop: '20px'}}>
            <Row width='100%' height='100%' vertical={'center'}>
              <Column height='100%' width='100%' vertical={'space-around'}>
                { !isMobile && <IntroductionColumn /> }
                <Autocomplete
                  fullWidth
                  options={family}
                  getOptionLabel={(member: string) => member}
                  filterSelectedOptions
                  onChange={(_event, value) => handleUserNameChange(value || '')}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      error = {usernameError}
                      variant="standard"
                      label={ 'Nom' }
                      placeholder={ 'Veuillez selectionner un nom' }
                    />
                  )}
                />
                <Row horizontal='space-around' style={{width: '100%', paddingTop: '10px'}}>
                  <Button className='whiteButton' variant='contained' type='submit' onClick={ onLoginClick }>
                    { 'Se connecter' }
                  </Button>
                </Row>
              </Column>
            </Row>
          </form>
        </Column>
      </Column>
    </Column>
  );
}
