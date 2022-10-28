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
import { Typography } from '@mui/material';
import { LoginTabs } from '../auth/LoginTabs';
import { LoadingButton } from '../common/Buttons';
import { Column, Row } from '../common/Flexbox';
import { IntroductionColumn } from './IntroductionColumn';

type WelcomeSectionType = {
  onLogin: (username: string, password: string) => Promise<void>, 
  onSignin: (username: string, password: string) => Promise<void>,
  tabNumber: number,
  changeTabNumber: (num: number) => void,
  position?: 'absolute' | 'relative'
}

export const WelcomeSection = ({ 
  onLogin,
  onSignin,
  tabNumber,
  changeTabNumber,
  position = 'relative'
} : WelcomeSectionType) => {

  const isMobile = useDeviceDetect();

  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  function handleUserNameChange(value: string){
    setUsername(value);
  }

  // function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setPassword(event.target.value);
  }
  
  const onSigninClick = async() => {
    const usError = !username;
    const pError =  !password;

    setUsernameError(usError);
    setPasswordError(pError);

    if (!(usError || pError))
    {
      await onSignin(username, password);
      navigate('/notebook/gifts')
    }
  };

  const onLoginClick = async() => {
    const pError =  !password;
    const usError = !username;
    setUsernameError(usError);
    setPasswordError(pError);

    if (!(pError || usError)) {
    {
      await onLogin(username, password);
      navigate('/notebook/gifts');}
    }
  };

  function handleTabChange(_event: any, newValue: number){
    setUsernameError(false);
    setPasswordError(false);
    changeTabNumber(newValue);
  }

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
                <LoginTabs
                  tabNumber={tabNumber}
                  handleTabChange={handleTabChange} 
                  handlePasswordChange={handlePasswordChange}
                  passwordError={passwordError} 
                  usernameError={usernameError}
                  handleUserNameChange={handleUserNameChange}
                  visitorOption
                  orientation='vertical'
                  style={{marginLeft: '-20px'}}
                >
                  <Row horizontal='space-around' style={{width: '100%', paddingTop: '10px'}}>
                    {tabNumber === 0 && 
                    <LoadingButton className='whiteButton' variant='outlined' type='submit' onClick={onSigninClick}> {'connection.signin'}</LoadingButton>}
                    {tabNumber === 1 && 
                    <LoadingButton className='whiteButton' variant='outlined' type='submit' onClick={onLoginClick}> {'connection.login'}</LoadingButton>}
                  </Row>
                </LoginTabs>
              </Column>
            </Row>
          </form>
        </Column>
      </Column>
    </Column>
  );
}
