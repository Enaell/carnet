import { Typography } from "@mui/material"
import { Column } from "../common/Flexbox"

export const IntroductionColumn = () => {
  return (
    <Column width='100%'>
      <Typography variant='subtitle1' color='primary'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
      </Typography>
      <Typography style={{paddingTop:'10px'}} variant='subtitle2' color='primary'>
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
      </Typography>
    </Column>    
  )
}
