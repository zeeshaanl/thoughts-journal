import * as React from 'react';
import Moment from "react-moment";
import styled from "styled-components";

interface IProps {
    dateTime: Date
}

const TimeContainer = styled.div`
margin-right: 2em;
display: inline-block;
font-weight: 500;
font-size: 1.2em;
`;

const Time = ({dateTime}: IProps) => {
    return (
        <TimeContainer>
            <Moment date={dateTime} format='hh:mm:ss A' />
        </TimeContainer>
    );
};

export default Time;
