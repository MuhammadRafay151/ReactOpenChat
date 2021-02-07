import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid"
import { io } from 'socket.io-client';
import { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import { AddMsg } from "../Redux/Actions/Message"
const socket = io("ws://certifis.cf:8000", {
    reconnectionDelayMax: 10000,
});
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(20)
    },
    chbox: {
        height: "30rem"
    },
    maxchat: {
        height: "50px",
        overflowX: "hidden",
        overflowY: "scroll",
    }
}))
//const temp = [{ msg: "asd", name: "Rafay" }, { msg: "Working with redux may be quite intimidating with fancy terminologies like actions, reducers, middleware, store, etc. But Redux DevTools extension can help you a lot in visualizing all the complex events that are happening in a redux application under the hood. We are going to look at the simple yet mystified task of setting up a store with Redux DevTools with 2 working examples. This tutorial assumes that you have an understanding of setting up stores, middleware, and actions in redux.", name: "Raf" }]
const Chat = (props) => {
    const classes = useStyle()
    const [Name, SetName] = useState("")
    const [init, SetInit] = useState(false)
    const [msg, SetMsg] = useState("")
    const Start = () => {
        if (Name.length >= 5) {
            socket.on("msg", data => {
                props.AddMsg(data)

            })
            socket.on("connect", () => {
                console.log(socket.id, "connected")
            })
            SetInit(true)
        } else {
            alert("Name should be greater than 5 charters")
        }
    }
    const SendMsg = () => {
        if (msg.length > 0) {
            socket.emit("msg", { name: Name, msg })
            props.AddMsg({ name: Name, msg })
            SetMsg("")
        }
    }
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        console.log("change")
        scrollToBottom()
    },[props.temp])
    return (
        <Container maxWidth="lg" >
            {/* justify="center" alignItems="center" style={{ minHeight: '100vh', maxWidth: '100%' }} */}
            {!init ?
                <Box display="flex" justifyContent="center" className={classes.root} >
                    <Paper style={{ width: "50%", padding: "4%" }} >
                        <h1>Start chat</h1>
                        <form noValidate autoComplete="off">
                            <TextField onChange={(evt) => { SetName(evt.target.value) }} value={Name} id="outlined-basic" fullWidth label="Enter Name" variant="outlined" />
                            <Button onClick={Start} variant="contained" color="primary" style={{ marginTop: "2%" }} fullWidth >Start</Button>
                        </form>
                    </Paper>
                </Box>
                :
                <Grid container className={classes.root} >
                    <Grid item xl={12} sm={12} >
                        <Paper elevation={8} >
                            <Box display="flex" alignItems="flex-start" justifyContent="center" >
                                <Box >
                                    <Typography variant="h3" align="center" >Welcome {Name}</Typography>
                                    <hr></hr>
                                </Box>


                            </Box>
                            <Box style={{ height: "400px" }} overflow="auto">
                                {props.temp.map((val, index) => {
                                    return (
                                        <Box key={index} display="flex" justifyContent={val.name !== Name ? "flex-start" : "flex-end"} p={5}>
                                            <Paper style={{ padding: "2%" }}>
                                                <Typography variant="body2" style={{ textDecoration: "underline" }} >{val.name}</Typography>
                                                <Typography variant="body2"  >{val.msg}</Typography>
                                            </Paper>
                                        </Box>)
                                })}
                                <div ref={messagesEndRef} />
                            </Box>
                            <Box display="flex" alignItems="flex-start" justifyContent="center">
                                <Box marginBottom={2} padding={2} css={{ width: "100%" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} xl={11} md={11}>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Enter your message here..."
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                fullWidth
                                                onChange={(evt) => { SetMsg(evt.target.value) }}
                                                value={msg}
                                            />
                                        </Grid>
                                        <Grid container item xs={12} xl={1} md={1} alignItems="center" >
                                            <Button onClick={SendMsg} color="primary" variant="contained" fullWidth>Send</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Paper>


                    </Grid>
                </Grid>
            }

        </Container>

    )
}
const mapStateToProps = (state) => {
    return {
        temp: state.Messages
    }
}

const mapDispatchToProps = {
    AddMsg
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat)