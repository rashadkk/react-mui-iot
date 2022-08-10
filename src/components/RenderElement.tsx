import { FC, ReactNode } from "react";

interface Props {
    show: boolean | undefined,
    children: ReactNode
}

const RenderElement: FC<Props> = (props: Props) => {

    const { show, children } = props;

    return (
        <>
        {  show ? children : null }
        </>
    )
}

export default RenderElement;
