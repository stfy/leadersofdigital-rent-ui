import {IRent} from "../services/RentList";

export function useRentStatus(rent: IRent) {
    if (!rent) return;

    const res: Record<IRent['status'], any> = {
        NEW: {
            text: 'На рассмотрении банком',
            statusName: 'pending'
        },
        BANK_PROPOSED: {
            text: 'На рассмотрении',
            statusName: 'pending'
        },
        ACCEPTED: {
            text: 'Подтвержден',
            statusName: 'confirmed'
        },
    }

    const def = {
        text: 'На рассмотрении',
        statusName: 'pending'
    }

    return res[rent.status] || def;
}