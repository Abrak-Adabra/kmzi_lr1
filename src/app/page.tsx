'use client'
import ErrorModal from '@/components/ErrorModal/ErrorModal'
import Header from '@/components/Header/Header'
import Operations from '@/pages/Operations/Operations'

export default function Home() {
    return (
        <>
            <Header />
            <Operations />
            <ErrorModal />
        </>
    )
}
