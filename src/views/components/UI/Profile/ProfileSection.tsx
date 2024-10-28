import React, { useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography
} from '@mui/material';
import {
    Logout as LogoutIcon,
    Search as SearchIcon,
    Settings as SettingsIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import { useAppSelector } from 'contexts/hooks';

const ProfileSection = () => {
    const theme = useTheme();

    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const userAvatar = useAppSelector((state) => state.user.data?.photoURL);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={userAvatar || ''}
                        sx={{
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<SettingsIcon fontSize="small" color="primary" />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={() => setOpen((prevOpen) => !prevOpen)}
                color="primary"
            />
            <Popper
                placement="bottom-start"
                open={open}
                anchorEl={anchorRef.current}
                transition
                modifiers={[
                    
                ]}
                className='relative right-0 w-max'
            >
                {({ TransitionProps }) => (
                    <Paper className='relative right-0' >
                        <ClickAwayListener onClickAway={() => setOpen(false)}>
                            <Card elevation={0} sx={{ boxShadow: 'none' }}>
                                    <List
                                        component="nav"
                                        sx={{
                                            width: '100%',
                                            maxWidth: 350,
                                            minWidth: 300,
                                            backgroundColor: theme.palette.background.paper,
                                            borderRadius: '10px',
                                            [theme.breakpoints.down('md')]: {
                                                minWidth: '100%'
                                            },
                                            '& .MuiListItemButton-root': {
                                                mt: 0.5
                                            }
                                        }}
                                    >
                                        <ListItemButton
                                            sx={{
                                                borderRadius: `${theme.shape.borderRadius}px`
                                            }}
                                            selected={selectedIndex === 0}
                                            onClick={(event) => setSelectedIndex(0)}
                                        >
                                            <ListItemIcon>
                                                <SettingsIcon fontSize="small" color="action" />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                                        </ListItemButton>
                                        <ListItemButton
                                            sx={{
                                                borderRadius: `${theme.shape.borderRadius}px`
                                            }}
                                            selected={selectedIndex === 1}
                                            onClick={(event) => setSelectedIndex(1)}
                                        >
                                            <ListItemIcon>
                                                <PersonIcon fontSize="small" color="action" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Grid container spacing={1} justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="body2">Social Profile</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Chip
                                                                label="02"
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: theme.palette.warning.dark,
                                                                    color: theme.palette.background.default
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                }
                                            />
                                        </ListItemButton>
                                        <ListItemButton
                                            sx={{
                                                borderRadius: `${theme.shape.borderRadius}px`
                                            }}
                                            selected={selectedIndex === 4}
                                            onClick={() => console.log('Logout')}
                                        >
                                            <ListItemIcon>
                                                <LogoutIcon fontSize="small" color="action" />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                        </ListItemButton>
                                    </List>
                              
                            </Card>
                        </ClickAwayListener>
                    </Paper>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
