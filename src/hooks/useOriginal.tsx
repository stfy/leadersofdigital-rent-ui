import {useService} from "../core/decorators/service";
import {IRent, RentList} from "../services/RentList";


export function useOriginal(rent: IRent): [any, any] {
    const list = useService(RentList)

    return [list.originalList.find(r => r.id === rent.id) || rent, ChangeContext]
}


function ChangeContext(props: IRent & { children: (r: IRent) => any }) {
    const {children, ...rent} = props;

    return children(rent)
}