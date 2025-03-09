export function Left({children}) {
    return <div className="px-4 mr-12 pt-9 md:pt-0 md:px-0 md:mr-0">{children}</div>
}

export function Right({children}) {
    return <div className="px-4 md:px-0">{children}</div>
}

export function Grid(props) {
    return <div className="grid md:grid-cols-2 md:py-9 md:pl-9 gap-9 overflow-hidden">{props.children}</div>
}

Grid.Left = Left;
Grid.Right = Right;