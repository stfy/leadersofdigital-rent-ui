import * as React from "react";

import {action, makeAutoObservable, observable, reaction, toJS} from "mobx";
import {Input} from "@chakra-ui/react";
import {observer} from "mobx-react";

type IValidator = () => void

type IControlState = 'valid' | 'invalid';

interface IControlInput<V> {
    state: IControlState;
    value: any;
    parent?: IControlInput<any>;

    writeValue(value: V): void;
}

export class MobxControlInput<V = any> implements IControlInput<V> {
    @observable value: any;
    @observable state: IControlState = 'valid';

    parent?: IControlInput<any>;

    constructor(
        initialValue: V,
        public validators: IValidator[]
    ) {
        this.value = initialValue

        makeAutoObservable(this)
    }

    @action
    writeValue(value: V) {
        this.value = value;
    }

    @action
    patchValue(value: V) {
        this.value = {...this.value, ...value}
    }
}

type InputOnChange = React.InputHTMLAttributes<HTMLInputElement>['onChange']
type InputProps = {
    component: React.ComponentType<{ onChange: InputOnChange, value: any; }>,
    inputControl: IControlInput<any>
};

const MobxInput = observer((props: InputProps) => {
    const {component: Component, inputControl} = props;

    return (
        <Component
            onChange={(ev) => {
                const nextValue = ev.target.value

                inputControl.writeValue(nextValue)
            }}
            value={inputControl.value}
        />
    )
})

const MobxFormContext = React.createContext<MobxControlInput>(new MobxControlInput(null, []));

type MobxFormProps<T> = React.PropsWithChildren<{
    values: T;
    validators?: IValidator[],
    onSubmit?: (values: T) => void;
}>

export function MobxForm<P>(props: MobxFormProps<P>) {
    const {values, validators = [], children, onSubmit} = props;

    const [formControl] = React.useState(new MobxControlInput(values, validators))

    const Provider = MobxFormContext.Provider

    const submitHandler = (ev: React.SyntheticEvent) => {
        ev.preventDefault();

        onSubmit && onSubmit(toJS(formControl.value) as P)
    }

    const formRender = (
        <form onSubmit={submitHandler}>
            {children}
        </form>
    )

    return (
        <Provider
            value={formControl}
            children={formRender}
        />
    )
}


/// Input Bindings

export function TextInput(props: { name: string }) {
    const parentControl = React.useContext(MobxFormContext)

    const [inputControl] = React.useState(new MobxControlInput(parentControl.value[props.name], []));

    React.useEffect(() => {
        inputControl.parent = parentControl

        return reaction(() => inputControl.value, (value) => {
            parentControl.writeValue({
                ...parentControl.value,
                [props.name]: value
            })
        })
    }, [])


    return (
        <MobxInput
            component={Input}
            inputControl={inputControl}
        />
    )
}
