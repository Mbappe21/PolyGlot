import React from "react"
import Link from "next/link"
import Card from "./card"


const CardLink = (props) => {

    return (
        <Link href={props.href}>
            <div>
                <Card cardTitle={props.cardTitle}>
                    {props.children}
                </Card>
            </div>
        </Link>
    )
}

export default CardLink