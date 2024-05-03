import { useState } from 'react';

type DialogActionReturnType = {
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    toggleDialog: () => void;
    openAlertDialog: boolean;
    setOpenAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
    toggleAlertDialog: () => void;
    toggleAllDialog: () => void;
};

export const useToggleDialog = (initialState: boolean = false): DialogActionReturnType => {
    const [openDialog, setOpenDialog] = useState<boolean>(initialState);
    const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(initialState);

    const toggleDialog = (): void => setOpenDialog((prevState: boolean) => !prevState);
    const toggleAlertDialog = (): void => setOpenAlertDialog((prevState: boolean) => !prevState);

    const toggleAllDialog = (): void => {
        setOpenDialog((prevState: boolean) => !prevState);
        setOpenAlertDialog((prevState: boolean) => !prevState);
    };

    return {
        openDialog,
        setOpenDialog,
        toggleDialog,
        openAlertDialog,
        setOpenAlertDialog,
        toggleAlertDialog,
        toggleAllDialog,
    };
};
