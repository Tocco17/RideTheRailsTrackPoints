import HeadComponentInterface from "@/interfaces/HeadComponentInterface";
import Head from "next/head";

export default function HeadComponent({
    title,
    description
}: HeadComponentInterface){
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}></meta>
            <meta charSet='utf-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='author' content='Tocco17' />
            {/* <link rel='icon' href='/images/favicon.png' type='image/png' /> */}
        </Head>
    )
}