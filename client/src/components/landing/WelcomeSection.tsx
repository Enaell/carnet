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
import { translate } from 'counterpart';

type WelcomeSectionType = {
  onLogin: React.Dispatch<React.SetStateAction<string | undefined>>;
  position?: 'absolute' | 'relative';
}

export const WelcomeSection = ({ 
  position = 'relative',
  onLogin
} : WelcomeSectionType) => {

  const isMobile = useDeviceDetect();

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
    {
      onLogin(username);
      navigate('/notebook/gifts');}
    }
  };

  return (
    <Column horizontal='start' vertical={'center'} className='welcomeSection' style={{ ...welcomeSection, position: position}}>
      <div style={isMobile ? backgroundImgMobile : backgroundImg}/>
      <Column horizontal={isMobile ? 'center' : 'end'} width={ isMobile ? '100%' : '45%'}>
        <Column horizontal={'start'} style={ isMobile ? connectionDivMobile : connectionDiv }>
          <Typography  style={{fontWeight : 'bold'}} align={ isMobile ? 'center': 'inherit' } color="secondary" variant='h2' noWrap={!isMobile}>
            {'application-name'}
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
                  disableCloseOnSelect
                  onChange={(_event, value) => handleUserNameChange(value || '')}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      error = {usernameError}
                      variant="standard"
                      label={ translate('connection.username') }
                      placeholder={ translate('connection.usernameError') }
                    />
                  )}
                />
                <Row horizontal='space-around' style={{width: '100%', paddingTop: '10px'}}>
                  <Button className='whiteButton' variant='outlined' type='submit' onClick={ onLoginClick }>
                    { translate('connection.login') }
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
