declare module __Formsy {
    interface FormSubmitHandler {
        (model?: any, resetForm?: any, invalidateForm?: any): void
    }

    interface FormChangeHandler {
        (currentValues?: any, isChanged?: boolean): void
    }

    interface FormProps {
        onValidSubmit?: FormSubmitHandler
        onInvalidSubmit?: FormSubmitHandler
        onValid?: Function
        onInvalid?: Function
        onChange?: FormChangeHandler
    }

    class Form extends __React.Component<FormProps, any> {
        reset(values?: any): void
        getModel(): any
    }

    class Mixin extends Object {

    }
}

declare module 'formsy' {
    interface FormProps {
        onValidSubmit: () => void
    }

    class Form extends __React.Component<FormProps, any> {

    }
}

declare module 'formsy-react' {
    import Formsy = __Formsy

    import Form = __Formsy.Form
    import Mixin = __Formsy.Mixin

    export {
        Form,
        Mixin
    }

    export default Formsy
}