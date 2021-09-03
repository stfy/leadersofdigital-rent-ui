import * as React from 'react'
import {observer} from "mobx-react";
import {useSortBy, useTable} from "react-table"
import {chakra, Stack, Table, Tbody, Td as BaseTd, Tr} from "@chakra-ui/react"

const data = [
    {
        date: "12.09.2021",
        action: "Начисления от выручки",
        value: '20 000 ₽',
        comment: '',
        role: 'Аэропорт'
    },
    {
        date: "11.09.2021",
        action: "Начисления от выручки",
        value: 'В связи с окончанием договора.',
        role: 'Арендатор'
    },
]

const columns = [
    {
        Header: "To convert",
        accessor: "date",
    },
    {
        Header: "Role",
        accessor: "role",
    },
    {
        Header: "Into",
        accessor: "action",
    },
    {
        Header: "Multiply by",
        accessor: "coment",
    },
]

const Td = chakra(BaseTd, {
    baseStyle: {
        borderColor: 'black'
    }
})

export const RentActionHistory = observer(function RentActionHistory() {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data}, useSortBy)

    return (
        <Stack width={'100%'} maxH={'265px'} overflow={'auto'}>
            <Table {...getTableProps()} overflow={'auto'}>
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