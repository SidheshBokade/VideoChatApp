  
import React from 'react';
import { Typography, AppBar } from '@material-ui/core'; //typogrsphy for better text and AppBar is used as container 
import { makeStyles } from '@material-ui/core/styles';//inbuild styles in the material-ui library
//COMPONENTS 
import VideoPlayer from './Components/VideoPlayer.jsx';
import Options from './Components/Options.jsx';
import Notifications from './Components/Notifications.jsx';
//Styles for MATERIAL-UI
const useStyles = makeStyles((theme) => ({ //take styles form theme 
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}> 
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBar>

      <VideoPlayer /> {/*SCREEN*/}
      <Options>    {/*Options like react-copy-to-clipboard*/}
        <Notifications /> {/*Notifications like hey avdhesh is calling*/}
      </Options>
    </div>
  );
};

export default App;

// {/* DEPDENDENCIES USED --> 
// 1)@MATERIAL-UI/CORE        => IT IS A REACTJS LIBRARY USE FOR BUILDING BETTER UI AND RESPONSIVE IN MOBILE AND OTHER DEVICES && TO REDUCE CSS
// 2)@MATERIAL-UI/ICONS       => FOR BETTER ICONS 
// 3)SIMPLE-PEERJS            => TO GET ANOTHER FRIEND
// 4)REACT-COPY-TO-CLIPBOARD  => TO COPY THE ID AFTER THE USER WILL WRITE THE NAME AND CLICK ON COPYTOCLIPBORD THE ID OF THAT NAME WILL BE GENRATED AND WILL SND TAHT ID TO ANOTHER TO JOIN ON VC 
// 5)SOCKET.IO                => FOR TRANSMISSION OF DATA IN THE FOR VIDEO && AUDIO */}