export type Eventprops = {
    category: string;
    title: string;
    address: string;
    address_title: string;
    startdate: string;
    starttime: string;
}

export type eventdataprops = {
    eventdata: Eventprops[];
}