import React from 'react'
import Header from '../../components/Header'
import { IoIosAddCircleOutline } from 'react-icons/io'

function SingleActiviy() {
    return (
        <>
            <Header title="Single Activity" actionButtonText="Activity" actionButtonClassName="bg-sky-500 text-white hover:bg-sky-600" actionButtonIcon={<IoIosAddCircleOutline />} onActionButtonClick={() => { }} />
            <p>page</p>
        </>
    )
}

export default SingleActiviy