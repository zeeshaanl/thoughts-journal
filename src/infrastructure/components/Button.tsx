import * as React from 'react';
import MaterialUiButton from "@material-ui/core/Button/Button";
import styled from "styled-components";
import {ReactNode} from "react";


interface IPropsButton {
    onClick: () => void,
    children: ReactNode,
    color: 'primary' | 'secondary'
}

const StyledMaterialButton = styled(MaterialUiButton)`
  width: 15em;
  font-size: 0.8em !important;
`;

const Button = (props: IPropsButton) => {
    const {onClick, children, color} = props;
    return (
        <StyledMaterialButton onClick={onClick} variant='raised' color={color}>
            {children}
        </StyledMaterialButton>

    );
};

export default Button;
