import { useState } from "react";

export const useFrom = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm)

    const onInputChange = ({target}) => {
        //desestructuro {target}
        const {name, value} = target

        setFormState({
            ...formState,
            [name] : value
        })
    }
   //reseteo por defecto
    const onResetForm = () => {
        setFormState(initialForm)
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,  
    }
}