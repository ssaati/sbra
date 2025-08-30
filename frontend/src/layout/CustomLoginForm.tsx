import React from 'react';
import { Login, LoginForm } from 'react-admin';
import { styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';

// Styled components
const LoginPageRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(../../assets/fabco-background.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const LoginCard = styled(Card)(({ theme }) => ({
    minWidth: 300,
    maxWidth: 450,
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
}));

const LoginTitle = styled('h1')(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.grey[800],
    fontSize: '24px',
    fontWeight: 'bold',
}));

const LoginLogo = styled('img')(({ theme }) => ({
    width: '100%',
//    maxWidth: '200px',
    margin: '0 auto 20px',
    display: 'block',
}));

const LoginFormContainer = styled('div')(({ theme }) => ({
    padding: '0 20px 20px 20px',
}));

const CustomLoginPage = () => {
    return (
        <LoginPageRoot>
            <LoginCard>

                <CardContent>
                    <LoginFormContainer>
                        <LoginLogo
                            src="../../assets/fabco-logo.svg"
                        />
                        <LoginForm/>
                    </LoginFormContainer>
                </CardContent>
            </LoginCard>
        </LoginPageRoot>
    );
};

export default CustomLoginPage;