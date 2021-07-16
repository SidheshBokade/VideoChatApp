import React, { useContext } from 'react';//trasfer the data from big components to smalll component 
import { Grid,Typography} from '@material-ui/core';//grid for container and typography better text 
import Paper from '@material-ui/core/Paper'//papper for screens 
import { makeStyles } from '@material-ui/core/styles';//styles 


import { SocketContext } from '../SocketContext'; //including socketcontet file to use the logics 
//styles 
const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));


const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext); //importing all the logic from SocketContext.js file 

    const classes = useStyles();
    return (
        <Grid container className = {classes.gridContainer}>

           {/*our own video*/}
{/**as soon as the call started and the stream starts */}
           {stream && (  
             <Paper className={classes.paper}>
        <Grid item xs={12} md={6}>
    <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography> 
        <video playsInline muted ref={myVideo} autoPlay className={classes.video}></video>
        </Grid>
        </Paper>
        )}
      

           {/*users video*/}
{/** if call is accepted and calll didint ended make the dunctionlaity  */}
           {callAccepted && !callEnded && (   
             <Paper className={classes.paper}>
        <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
        <video playsInline muted ref={userVideo} autoPlay className={classes.video}></video>
        </Grid>
        </Paper>
        )}
    </Grid>
    
    );
}

export default VideoPlayer;
