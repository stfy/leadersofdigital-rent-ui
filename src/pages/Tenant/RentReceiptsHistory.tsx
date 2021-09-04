import * as React from 'react'
import {observer} from "mobx-react";
import {useSortBy, useTable} from "react-table"
import {chakra, Stack, Table, Tbody, Td as BaseTd, Text, Th, Thead, Tr} from "@chakra-ui/react"
import {IRent} from "../../services/RentList";

function convertDate(date: Date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
}

const columns = [
    {
        Header: "Дата",
        accessor: (row: IRent['events'][0]) => {
            const date = new Date(row.date)
            return convertDate(date)
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        },
    },
    {
        Header: "Действие",
        accessor: (row: IRent['events'][0]) => {
            const res = {
                "PAYMENT": 'Начисления от выручки',
                "PAY_DEBT": 'Погашение задолженности по аренде',
                "PAY_CREDIT": 'Погашение задолженности по кредиту',
                "RENT": ' Начало нового расчетного периода'
            }

            return res[row.type] || row.type
        },
    },
    {
        Header: "Сумма операции",
        accessor: (row: IRent['events'][0]) => {
            return `${row.amount} ₽`
        },
        isNumeric: true,
    },
    {
        Header: "Отчисление",
        Cell: ({value}) => (<Text fontWeight={'700'}>{String(value)}</Text>),
        accessor: (row: IRent['events'][0]) => {
            return `${row.debtPart} ₽`
        },
        isNumeric: true
    },
]

const Td = chakra(BaseTd, {
    baseStyle: {
        borderColor: 'black'
    }
})

export const RentReceiptsHistory: React.FC<IRent> = observer(function RentReceiptsHistory(rent: IRent) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data: rent.events}, useSortBy)

    return (
        <Stack width={'100%'} maxH={'265px'} overflow={'auto'}>
            <Table {...getTableProps()} overflow={'auto'}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th  {...column.getHeaderProps((column as any).getSortByToggleProps())}
                                     isNumeric={(column as any).isNumeric}>
                                    {column.render("Header")}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>


                <Tbody {...getTableBodyProps()} >
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <Td {...cell.getCellProps()} isNumeric={(cell.column as any).isNumeric}>
                                        {cell.render("Cell")}
                                    </Td>
                                ))}
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </Stack>

    )
})