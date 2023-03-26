import React from 'react'
import { Audio } from 'react-loader-spinner'
import { Backdrop } from './Loader.styled'

export function Loader() {
    return (
        <Backdrop>
            <Audio
                height="80"
                width="80"
                radius="9"
                color="white"
                ariaLabel="loading"
            />
        </Backdrop>
    )
}
