import * as React from 'react';
import {Box, Heading, Stack, useColorModeValue,} from '@chakra-ui/react';
import {MobxForm} from "../../core/form/ControlInput";
import {useService} from "../../core/decorators/service";
import {AuthService, CredentialsGrant} from "../../services/AuthService";
import {Button} from "../../ui/Button";
import {observer} from "mobx-react";

export const LoginForm = observer(function LoginForm() {
    const authService = useService(AuthService)

    const submitHandler = (form: { email: string, password: string }) => {
        authService.authenticate(new CredentialsGrant(form.email, form.password));
    }


    function asTenant(e) {
        e.preventDefault();
        authService.authenticate(new CredentialsGrant('kofehaus', 'kofehaus'));
    }

    function asLandlord(e: React.SyntheticEvent) {
        e.preventDefault();

        authService.authenticate(new CredentialsGrant('sheremetevo', 'sheremetevo'));
    }

    function asBank(e: React.SyntheticEvent) {
        e.preventDefault();

        authService.authenticate(new CredentialsGrant('alfabank', 'alfabank'));
    }

    return (
        <MobxForm
            values={{email: 'kofehaus', password: 'kofehaus'}}
            onSubmit={submitHandler}>
            <Stack spacing={4}>
                {/*<FormControl id="email">*/}
                {/*    <TextInput placeholder={'Логин'} name={'email'}/>*/}
                {/*</FormControl>*/}

                {/*<FormControl id="password">*/}
                {/*    <TextInput placeholder={'Пароль'} type={'password'} name={'password'}/>*/}
                {/*</FormControl>*/}

                {/*<Flex width={'100%'} spacing={10}>*/}
                {/*    <Flex grow={1} shrink={1} align={'center'}>*/}
                {/*        <Link><Text fontWeight={'bold'}>Забыли пароль?</Text></Link>*/}
                {/*    </Flex>*/}

                {/*    <Flex grow={1} shrink={1}>*/}
                {/*        {authService.requestStatus === 'pending'*/}
                {/*            ? <Spinner/>*/}
                {/*            : (*/}
                {/*                <Button type={'submit'} width={'100%'}>*/}
                {/*                    Войти*/}
                {/*                </Button>*/}
                {/*            )*/}
                {/*        }*/}
                {/*    </Flex>*/}
                {/*</Flex>*/}

                <Stack>
                    <Button type={'submit'} onClick={asBank} width={'100%'}>
                        Войти как банк
                    </Button>

                    <Button type={'submit'} onClick={asLandlord} width={'100%'}>
                        Войти как аредододатель
                    </Button>

                    <Button type={'submit'} onClick={asTenant} width={'100%'}>
                        Войти как арендатор
                    </Button>
                </Stack>
            </Stack>
        </MobxForm>
    )
})

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