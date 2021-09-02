import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    Collapse,
    Flex,
    Icon,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import {ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon,} from '@chakra-ui/icons';
import {Link as RouterLink} from "react-router-dom";
import {useService} from "../../core/decorators/service";
import {AuthService} from "../../services/AuthService";
import {observer} from "mobx-react";


export const WithSubnavigation = observer(function WithSubnavigation() {
    const {isOpen, onToggle} = useDisclosure();
    const auth = useService(AuthService)

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
                justify={'center'}
            >
                <Flex maxW={'container.xl'} align={'center'} grow={1}>
                    <Flex
                        flex={{base: 1, md: 'auto'}}
                        display={{base: 'flex', md: 'none'}}>
                        <IconButton
                            onClick={onToggle}
                            icon={
                                isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>
                            }
                            variant={'ghost'}
                            aria-label={'Toggle Navigation'}
                        />
                    </Flex>
                    <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}}>
                        <Text
                            textAlign={useBreakpointValue({base: 'center', md: 'left'})}
                            fontFamily={'heading'}
                            fontWeight={'bold'}
                            color={useColorModeValue('gray.800', 'white')}>
                            Social-Trading
                        </Text>

                        <Flex display={{base: 'none', md: 'flex'}} ml={10}>
                            <DesktopNav/>
                        </Flex>
                    </Flex>

                    {auth.status === 'authenticated'
                        ? (
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={
                                            'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                        }
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem as={RouterLink} to={'/profile'}>Profile</MenuItem>
                                    <MenuItem>Info</MenuItem>
                                    <MenuDivider/>
                                    <MenuItem onClick={() => auth.unauthenticate()}>Exit</MenuItem>
                                </MenuList>
                            </Menu>
                        )
                        : (
                            <Stack
                                flex={{base: 1, md: 0}}
                                justify={'flex-end'}
                                direction={'row'}
                                spacing={6}>
                                <Button
                                    fontSize={'sm'}
                                    fontWeight={400}
                                    variant={'link'}
                                    as={RouterLink}
                                    to={'/login'}>
                                    Sign In
                                </Button>

                                <Button
                                    display={{base: 'none', md: 'inline-flex'}}
                                    fontSize={'sm'}
                                    fontWeight={600}
                                    color={'white'}
                                    bg={'pink.400'}
                                    as={RouterLink}
                                    to={'/register'}
                                    _hover={{
                                        bg: 'pink.300',
                                    }}>
                                    Sign Up
                                </Button>
                            </Stack>
                        )

                    }


                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav/>
            </Collapse>
        </Box>
    );
})

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                to={navItem.href ?? '#'}
                                as={RouterLink}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({label, href, subLabel}: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{bg: useColorModeValue('pink.50', 'gray.900')}}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{color: 'pink.400'}}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{opacity: '100%', transform: 'translateX(0)'}}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon}/>
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{md: 'none'}}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({label, children, href}: NavItem) => {
    const {isOpen, onToggle} = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                to={href ?? '#'}
                as={RouterLink}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{marginTop: '0!important'}}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                    children.map((child) => (
                        <Link key={child.label} py={2} href={child.href}>
                            {child.label}
                        </Link>
                    ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Trades',
        href: '/dashboard',
    },
    {
        label: 'Info',
        href: '#',
    },
];