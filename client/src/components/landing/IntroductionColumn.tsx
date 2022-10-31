import { Typography } from "@mui/material"
import { translate } from "counterpart"
import { Column } from "../common/Flexbox"

export const IntroductionColumn = () => {
  return (
    <Column width='100%'>
      <Typography variant='subtitle1' color='primary'>{ translate('landingPage.welcomeText1') }</Typography>
      <Typography style={{paddingTop:'10px'}} variant='subtitle2' color='primary'>{'landingPage.welcomeText2'}</Typography>
    </Column>    
  )
}
