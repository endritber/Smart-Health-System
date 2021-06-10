import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Image, Label, Message } from 'semantic-ui-react';
import MyTextInput from '../../app/form/MyTextInput';
import { useStore } from '../../app/stores/store';

export default observer (function LoginForm() {

    const {userStore} = useStore();

    return (
        <Formik
        initialValues={{email:'', password:'', error:null}}
        onSubmit={(values, {setErrors})=> userStore.login(values).catch(error=>
            setErrors({error:'Invalid Email or Password'}))}
        >

        {({handleSubmit, isSubmitting, errors})=>(
            <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
                <Header as='h2' color='blue' textAlign='center'>
                <Image src='/logoHealth.png' style={{"border-radius":"50px"}} />Log-in to your account
                </Header>
                <MyTextInput name ="email" placeholder="Email Address"/> 
                <MyTextInput name ="password" placeholder="Password" type="password"/>
                <ErrorMessage
                name='error'
                render={()=> <Label style={{marginBottom:10}}basic color='red' content={errors.error}/>}
                />
                <Button primary loading={isSubmitting} content="Login" type="submit" fluid />
                <Message>
                    New to us? <a href='#'>Sign Up</a>
                </Message>
            </Form>
        )}
            
        </Formik>
    )
})