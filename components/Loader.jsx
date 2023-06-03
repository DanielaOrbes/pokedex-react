import React from 'react';
import { Ripples } from '@uiball/loaders'

export const Loader = () => {
    return (
        <div className='container-loader'>
            <Ripples
            size={45}
            speed={2}
            color="black"
        />
        </div>
    )

}