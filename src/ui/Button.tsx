import {Button as BaseButton, chakra} from "@chakra-ui/react";

export const Button = chakra(BaseButton, {
    baseStyle: {
        outline: 0,
        bg: "orange-bg",
        color: "black",
        borderRadius: 0,
        height: 46,
        fontSize: 18,
        _hover: {
            bg: "orange-bg",
            color: "black",
            boxShadow: `3px 3px black`
        },
        _focus: {
            bg: '#DE751C'
        }
    }
})