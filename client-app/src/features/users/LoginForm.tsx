import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
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
                <Header as='h2' content='Log In!' color='blue' textAlign='center'/>
                <MyTextInput name ="email" placeholder="Email"/> 
                <MyTextInput name ="password" placeholder="Pasword" type="password"/>
                <ErrorMessage
                name='error'
                render={()=> <Label style={{marginBottom:10}}basic color='red' content={errors.error}/>}
                />
                <Button primary loading={isSubmitting} content="Log in" type="submit" fluid />
            </Form>
        )}
            
        </Formik>
    )
})