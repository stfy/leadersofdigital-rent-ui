import * as React from 'react'
import {observer} from "mobx-react";
import {useSortBy, useTable} from "react-table"
import {chakra, Stack, Table, Tbody, Td as BaseTd, Tr} from "@chakra-ui/react"

const data = [
    {
        date: "12.09.2021",
        action: "Начисления от выручки",
        value: '20 000 ₽',
    },
    {
        date: "11.09.2021",
        action: "Начисления от выручки",
        value: '12 000 ₽',
    },
    {
        date: "12.09.2021",
        action: "Начисления от выручки",
        value: '20 000 ₽',
    },
    {
        date: "11.09.2021",
        action: "Начисления от выручки",
        value: '12 000 ₽',
    },
    {
        date: "12.09.2021",
        action: "Начисления от выручки",
        value: '20 000 ₽',
    },
    {
        date: "11.09.2021",
        action: "Начисления от выручки",
        value: '12 000 ₽',
    },
    {
        date: "12.09.2021",
        action: "Начисления от выручки",
        value: '20 000 ₽',
    },
    {
        date: "11.09.2021",
        action: "Начисления от выручки",
        value: '12 000 ₽',
    },


]
const columns = [
    {
        Header: "To convert",
        accessor: "date",
    },
    {
        Header: "Into",
        accessor: "action",
    },
    {
        Header: "Multiply by",
        accessor: "value",
        isNumeric: true,
    },
]

const Td = chakra(BaseTd, {
    baseStyle: {
        borderColor: 'black'
    }
})

export const RentReceiptsHistory = observer(function RentReceiptsHistory() {
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