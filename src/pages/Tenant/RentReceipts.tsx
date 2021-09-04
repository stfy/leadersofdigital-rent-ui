import * as React from 'react'
import {observer} from "mobx-react";
import {Box, chakra, Flex, Grid, Progress, Stack, Text, useToken} from "@chakra-ui/react";
import {Select} from "../../ui/Select";
import {IRent} from "../../services/RentList";


const ProgressBlack = chakra(Progress, {
    baseStyle: {
        track: {bg: 'black'},
        filledTrack: {bg: '#FFAC02'}
    },
})


export const RentReceipts: React.FC<IRent> = observer(function RentReceipts(rent) {
    console.log(rent)

    return (
        <Box bg={'#F5F4F2'} padding={4}>
            <Stack width={'100%'} spacing={'24px'}>


                <Flex>
                    <Text as={'h3'} fontSize={32} fontWeight={700}>Период:</Text>

                    <Flex>
                        <Select placeholder="Не выбран" size="lg" marginLeft={4}>
                            <option value="Сентябрь 2021">Сентябрь 2021</option>
                            <option value="Октябрь 2021">Октябрь 2021</option>
                        </Select>
                    </Flex>
                </Flex>


                <Grid templateColumns={`repeat(3, 1fr)`}>
                    <Stack width={'100%'} padding={1}>
                        <Text fontWeight={700}>До погашения арендной платы:</Text>

                        <Progress
                            value={((rent.conditions.paymentAmount - rent.totalDebt) / rent.conditions.paymentAmount) * 100}
                            variant={'black'}
                            colorScheme={'orange'}
                            height={2}/>

                        <Flex justify={'space-between'}>
                            <Text>{Math.round(rent.conditions.paymentAmount - rent.totalDebt)} ₽</Text>
                            <Text>{Math.round(rent.conditions.paymentAmount)} ₽</Text>
                        </Flex>
                    </Stack>

                    <Stack width={'100%'} padding={1}>
                        <Text fontWeight={700}>До МГП:</Text>

                        <Progress
                            value={((rent.conditions.minGuaranteedConcession - rent.concessionDebt) / rent.conditions.minGuaranteedConcession) * 100}
                            variant={'black'}
                            colorScheme={'orange'}
                            height={2}/>

                        <Flex justify={'space-between'}>
                            <Text>{Math.round(rent.concessionDebt)} ₽</Text>
                            <Text>{Math.round(rent.conditions.minGuaranteedConcession)} ₽</Text>
                        </Flex>
                    </Stack>

                    <Stack width={'100%'} padding={1}>
                        <Text fontWeight={700}>Использование кредитных средств:</Text>

                        <Progress value={(rent.creditDebt/ rent.conditions.limit) * 100} variant={'black'}
                                  colorScheme={'orange'}
                                  height={2}/>

                        <Flex justify={'space-between'}>
                            <Text>{Math.round(rent.creditDebt)} ₽</Text>
                            <Text>{Math.round(rent.conditions.limit)} ₽</Text>
                        </Flex>
                    </Stack>


                </Grid>

                {/*<Progress value={(rent.totalEarnings / rent.conditions.paymentAmount) * 100 }>*/}
                {/*    <Box __css={{*/}
                {/*        position: 'absolute',*/}
                {/*        height: '12px',*/}
                {/*        left: ((rent.totalEarnings / rent.conditions.paymentAmount) * 100) + '%',*/}
                {/*        top: 0,*/}
                {/*        width: ((rent.creditDebt / rent.conditions.paymentAmount) * 100) + '%'*/}
                {/*    }} position={'absolute'}*/}
                {/*    ><ProgressBlack variant={'black'}/></Box>*/}
                {/*</Progress>*/}

                {/*<Flex>*/}
                {/*    <Stack>*/}
                {/*        <Flex alignItems={'center'}>*/}
                {/*            <LegendItem bg={'orange-bg'}/>*/}
                {/*            <Text fontSize={18} fontWeight={700} marginLeft={4}>От выручки</Text>*/}
                {/*        </Flex>*/}

                {/*        <Text as={'h4'} fontSize={32} fontWeight={700}>{Math.round(rent.totalEarnings)} ₽</Text>*/}
                {/*    </Stack>*/}

                {/*    <Stack marginLeft={20}>*/}
                {/*        <Flex alignItems={'center'}>*/}
                {/*            <LegendItem bg={'black'}/>*/}
                {/*            <Text fontSize={18} fontWeight={700} marginLeft={4}>От предоставления заемных средств</Text>*/}
                {/*        </Flex>*/}

                {/*        <Text as={'h4'} fontSize={32} fontWeight={700}>{rent.creditDebt} ₽</Text>*/}
                {/*    </Stack>*/}
                {/*</Flex>*/}
            </Stack>
        </Box>
    )
})


function LegendItem({bg}: { bg: string }) {
    const [bgColor] = useToken(
        // the key within the theme, in this case `theme.colors`
        "colors",
        // the subkey(s), resolving to `theme.colors.red.100`
        [bg],
        // a single fallback or fallback array matching the length of the previous arg
    )

    const itemStyles = {
        height: '14px',
        width: '14px',
        bg: bgColor
    }

    return <chakra.div __css={itemStyles}/>
}