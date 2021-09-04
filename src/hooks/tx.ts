import {Transactional} from "../services/ConditionsService";
import * as React from "react";
import {autorun} from "mobx";

export function useTransaction(fn: () => Transactional, {onDone}: { onDone: () => any }): Transactional {
    const transaction = React.useRef<any>()

    const tx: Transactional = React.useMemo(() => {
        return fn()
    }, []);

    React.useEffect(() => {

        const dispose = autorun(() => {
            if (tx.requestStatus === 'success') {
                onDone && onDone();
            }
        })


        return () => dispose();
    }, [])


    return tx
}