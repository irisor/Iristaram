import { useState } from "react"

export function useForm(initialState) {
    const [fields, setFields] = useState(initialState)

    function handleChange({ target }) {
        let { value, name: field, type, checked } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = checked
                break

            default: break
        }
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
        if (target?.classList?.contains('empty') && value) {
            target.classList.remove('empty')
        } else if (!value) {
            target.classList.add('empty')
        }
    }

    function resetForm(newInitialState = initialState) {
        setFields(newInitialState);
        Array.from(document.querySelectorAll('input')).forEach((input) => {
            if (!input.value) {
                input.classList.add('empty')
            }
        })
    }

    return [fields, setFields, handleChange, resetForm]


}