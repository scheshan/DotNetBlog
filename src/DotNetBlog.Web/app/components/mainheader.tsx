import React = require("react")

interface MainHeaderProps {
    title?: string
}

class MainHeader extends React.Component<MainHeaderProps, any>{
    render(): JSX.Element {
        return (
            <div className="main-header clearfix">
                <h2 className="page-title pull-left">{this.props.title}</h2>

                {this.props.children}
            </div>
            )
    }
}

export default MainHeader