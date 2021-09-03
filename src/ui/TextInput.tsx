import {Button as BaseButton, Input as BaseInput, chakra} from "@chakra-ui/react";


export const Input = chakra(BaseInput, {
    baseStyle: {
        bg: "input-bg",
        color: "grey",
        borderRadius: 0,
        height: 62,
        fontSize: 18,
        padding: 18,
    }
})