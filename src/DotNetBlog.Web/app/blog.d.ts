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
        [key: string]: any
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

declare module Blog {
    module Store {
        interface BlogState {
            menu?: string
            subMenu?: string
        }
    }

    module Action {
        interface ActionBase {
            type: string
        }

        interface ChangeMenuAction extends ActionBase {
            menu?: string
            subMenu?: string
        }
    }

    module Views {
        interface MenuItem {
            key?: string
            text?: string
            selected?: boolean
            url?: string
            icon?: string
            children?: MenuItem[]
        }
    }

    module Api {
        interface ApiResponse {
            success?: boolean
            errorMessage?: string
        }

        interface GenericApiResponse<T> extends ApiResponse {
            data?: T
        }

        interface GetBasicConfigCallback {
            (data: GenericApiResponse<Entity.BasicConfig>): void
        }
    }

    module Entity {
        interface BasicConfig {
            title?: string
            description?: string
            topicPerPage?: number
            onlyShowSummary?: boolean
        }
    }
}