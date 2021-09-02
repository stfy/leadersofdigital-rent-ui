import * as React from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Heading,
    Link,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import {MobxForm, TextInput} from "../../core/form/ControlInput";
import {useService} from "../../core/decorators/service";
import {AuthService, CredentialsGrant} from "../../services/AuthService";

export function LoginForm() {
    const authService = useService(AuthService)

    const submitHandler = (form: { email: string, password: string }) => {
        authService.authenticate(new CredentialsGrant(form.email, form.password));
    }

    return (
        <MobxForm
            values={{email: 'test@test12.com', password: 'test@test12.com'}}
            onSubmit={submitHandler}>
            <Stack spacing={4}>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <TextInput name={'email'}/>
                </FormControl>
                <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <TextInput name={'password'}/>
                </FormControl>
                <Stack spacing={10}>
                    <Stack
                        direction={{base: 'column', sm: 'row'}}
                        align={'start'}
                        justify={'space-between'}>
                        <Checkbox>Remember me</Checkbox>
                        <Link color={'blue.400'}>Forgot password?</Link>
                    </Stack>
                    <Button
                        bg={'blue.400'}
                        type={'submit'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Sign in
                    </Button>
                </Stack>
            </Stack>
        </MobxForm>
    )
}


export function LoginPage() {
    return (
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

            <Box
                rounded={'lg'}
                borderRadius={'0'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack align={'left'} mb={10}>
                    <Heading fontSize={'4xl'}>Вход в систему</Heading>
                </Stack>

                <LoginForm/>
            </Box>
        </Stack>
    );
}