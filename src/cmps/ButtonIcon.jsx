import Icon from "@mdi/react"
import { mdiLeadPencil } from "@mdi/js"

function ButtonIcon(children,path, size=1, color = 'grey', ...props){
    return <div>
        <Icon
        path = {path}
        size = {size}
        color = {color}
        />
    </div>
}