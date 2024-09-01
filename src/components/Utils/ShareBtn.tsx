import React from 'react'
import { InlineShareButtons } from 'sharethis-reactjs'

type Props = {
    url: string;
    title: string;
    description: string;
}

const ShareBtn = (props: Props) => {
    return (
        <InlineShareButtons
            config={{
                alignment: 'center',
                color: 'social',
                enabled: true,
                font_size: 16,
                labels: null,
                language: 'en',
                networks: [
                    'whatsapp',
                    'linkedin',
                    'facebook',
                    'twitter'
                ],
                padding: 12,
                radius: 4,
                show_total: false,
                size: 40,

                // OPTIONAL PARAMETERS
                url: props.url,
                description: props.description,
                title: props.title,
                message: 'custom email text',
                subject: 'custom email subject',
                username: 'Bharat1056'
            }}
        />
    )
}

export default ShareBtn